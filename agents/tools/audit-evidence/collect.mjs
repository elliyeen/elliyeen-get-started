#!/usr/bin/env node
// Read-only evidence collector for agents 07, 09 and 24.
// Usage: node agents/tools/audit-evidence/collect.mjs <url> <outName> [runId]
//   url      must be https and on a host listed in allowed-hosts.json (a reviewed file)
//   outName  relative name created under the artifacts root (env AUDIT_ARTIFACTS_ROOT, default ./agents/artifacts)
// No clicks, no typing, no form submission, no login. Third-party requests the page makes on its own are
// limited to public https hosts on port 443, capped, and logged in evidence.json. See README.md for residual risk.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as A from "./analyze.mjs";
import * as G from "./guard.mjs";
import { startProxy } from "./proxy.mjs";
import { VIEWPORTS, initCwv, measurePage } from "./core.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const MAX_ATTEMPTS = 3; // bounded retry: the only self-heal this tool performs
const PASSES = 2;       // independent loads per viewport, used for evidence-based confidence

async function main() {
  const [urlArg, outName, runIdArg] = process.argv.slice(2);
  if (!urlArg || !outName) throw new G.GuardError("usage", "collect.mjs <url> <outName> [runId]");
  const allowed = G.loadAllowedHosts(path.join(here, "allowed-hosts.json"));
  const target = G.parseTarget(urlArg, allowed);
  const host = target.hostname.toLowerCase().replace(/\.$/, "");
  const runId = G.assertRunId(runIdArg || `run-${new Date().toISOString().replace(/[:.]/g, "-")}`);
  const root = path.resolve(process.env.AUDIT_ARTIFACTS_ROOT || path.join(process.cwd(), "agents", "artifacts"));
  const outDir = G.resolveOutputDir(root, outName);
  await G.assertPublicHost(host); // pre-flight; the proxy re-resolves and connects to the vetted address itself

  const started = Date.now();
  const guard = G.makeRequestGuard({ allowed });
  const proxy = await startProxy({ guard });
  // Every connection the browser opens goes through the proxy (including loopback, which Chromium otherwise bypasses).
  const browser = await chromium.launch({ proxy: { server: `http://127.0.0.1:${proxy.port}`, bypass: "<-loopback>" }, args: ["--force-webrtc-ip-handling-policy=disable_non_proxied_udp", "--disable-quic"] });
  const out = { tool: "audit-evidence/collect.mjs v1.2", runId, url: target.href, startedAt: new Date(started).toISOString(), browser: browser.version(), attemptsMax: MAX_ATTEMPTS, passes: PASSES, viewports: {} };
  const shots = [];

  async function onePass(name, vp, first) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: name === "mobile", serviceWorkers: "block" });
    const page = await ctx.newPage();
    const hops = [];
    page.on("framenavigated", (f) => { if (f === page.mainFrame()) hops.push(f.url()); });
    try {
      await page.addInitScript(initCwv);
      let resp, last;
      for (let a = 1; a <= MAX_ATTEMPTS; a++) {
        try { resp = await page.goto(target.href, { waitUntil: "load", timeout: 60000 }); break; } catch (e) { last = e; await page.waitForTimeout(1000 * a); }
      }
      if (!resp) throw last;
      await page.waitForTimeout(2500);
      const bad = G.navigationViolations(hops, allowed);
      if (bad.length) throw new G.GuardError("redirect-pivot", `main frame left the allowlist: ${bad.map((b) => b.url).join(", ").slice(0, 160)}`);
      const m = await measurePage(page, vp, host);
      if (first) shots.push([`evidence/${name}-fold.png`, await page.screenshot()]);
      return { status: resp.status(), ...m };
    } finally { await ctx.close(); }
  }

  const derived = {};
  const sig = (d) => JSON.stringify(d.map((x) => [x.detector, x.flagged, x.notMeasured]));
  for (const [name, vp] of Object.entries(VIEWPORTS)) {
    const t0 = Date.now();
    try {
      const a = await onePass(name, vp, true);
      const b = await onePass(name, vp, false);
      const agree = sig(A.deriveViewport(a)) === sig(A.deriveViewport(b)) ? 2 : 1;
      derived[name] = A.deriveViewport(a, { runsAgreeing: agree });
      out.viewports[name] = { ...a, runsAgreeing: agree, wallMs: Date.now() - t0, detectors: derived[name] };
    } catch (e) { out.viewports[name] = { error: String(e.message).slice(0, 200), wallMs: Date.now() - t0, note: A.NOT_MEASURED }; if (e instanceof G.GuardError) out.integrity = `INVALID: ${e.message}`; }
  }
  await browser.close();
  await proxy.close();
  out.network = { allowedRequests: guard.log.allowed, thirdPartyConnections: Object.values(guard.log.thirdPartyHosts).reduce((a, b) => a + b, 0), thirdPartyHosts: guard.log.thirdPartyHosts, blocked: guard.log.blocked.slice(0, 50), blockedCount: guard.log.blocked.length, proxy: { connects: proxy.stats.connects, refused: proxy.stats.refused }, note: "All browser connections pass a local filtering proxy: https/443 only, DNS resolved by the proxy, public addresses only." };
  out.totalMs = Date.now() - started;

  const ok = Object.keys(derived);
  const agreeAll = ok.length ? Math.min(...ok.map((k) => out.viewports[k].runsAgreeing)) : 1;
  const common = { version: "1.2", runId, inputs: `${target.href} ${ok.map((k) => `${k} ${VIEWPORTS[k].width}x${VIEWPORTS[k].height}`).join(", ")}`, evidenceLinks: ["evidence.json", ...shots.map((s) => s[0])], runsAgreeing: agreeAll };
  const rec = (nn, agent) => A.buildFeedbackRecord({ ...common, agent, findings: ok.flatMap((k) => A.feedbackFindings(derived[k], nn).map((f) => ({ ...f, id: `${f.id}@${k}` }))), pattern: "see evidence.json detectors" });
  const records = { "07": rec("07", "07-apple-design"), "09": rec("09", "09-conversion"), "24": rec("24", "24-seo-growth-engineering") };
  if (out.integrity) { console.error(`REFUSED ${out.integrity}`); }
  const problems = Object.entries(records).flatMap(([k, r]) => A.validateFeedbackRecord(r).map((p) => `${k}: ${p}`));
  out.feedbackValidation = problems.length ? problems : "valid";
  G.safeWrite(outDir, "evidence.json", JSON.stringify(out, null, 2));
  for (const [rel, buf] of shots) G.safeWrite(outDir, rel, buf);
  for (const [k, r] of Object.entries(records)) G.safeWrite(outDir, `feedback-${k}.json`, JSON.stringify(r, null, 2));
  console.log(`wrote ${outDir} in ${out.totalMs}ms; feedback ${problems.length ? "INVALID" : "valid"}; third-party connections ${out.network.thirdPartyConnections}; blocked ${out.network.blockedCount}`);
  return out.integrity ? 3 : problems.length ? 1 : 0;
}
main().then((c) => process.exit(c), (e) => { console.error(e instanceof G.GuardError ? `REFUSED ${e.message}` : `ERROR ${e.message}`); process.exit(e instanceof G.GuardError ? 3 : 1); });
