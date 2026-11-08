#!/usr/bin/env node
// Read-only evidence collector for agents 07, 09 and 24.
// Usage: node agents/tools/audit-evidence/collect.mjs <url> <outDir> [runId]
// Loads public pages in headless Chromium. No clicks, no typing, no form submission, no login.
// Writes only inside <outDir>. Anything it cannot measure is recorded as "Not Measured".
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as A from "./analyze.mjs";

const [url, outDir, runIdArg] = process.argv.slice(2);
if (!url || !outDir) { console.error("usage: collect.mjs <url> <outDir> [runId]"); process.exit(2); }
const runId = runIdArg || `run-${new Date().toISOString().replace(/[:.]/g, "-")}`;
mkdirSync(join(outDir, "evidence"), { recursive: true });

const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const MAX_ATTEMPTS = 3; // bounded retry: the only self-heal this tool performs

async function load(page, attempt = 1) {
  try { return await page.goto(url, { waitUntil: "load", timeout: 60000 }); }
  catch (e) { if (attempt >= MAX_ATTEMPTS) throw e; await page.waitForTimeout(1000 * attempt); return load(page, attempt + 1); }
}

const probe = () => {
  const top = (e) => Math.round(e.getBoundingClientRect().top + scrollY);
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0"; };
  const rgb = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(",").map(Number); return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
  const isFixed = (e) => { for (let n = e; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === "fixed" || p === "sticky") return true; } return false; };
  const inHeader = (e) => !!e.closest("header, nav");
  const ctaEls = [...document.querySelectorAll("a,button")].filter(vis).map((e) => ({ text: (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 60), href: e.getAttribute("href") || "", top: top(e), height: Math.round(e.getBoundingClientRect().height), inHeader: inHeader(e), fixed: isFixed(e) })).filter((x) => x.text);
  const deep = (root) => [...root.querySelectorAll("*")].flatMap((e) => (e.shadowRoot ? [e, ...deep(e.shadowRoot)] : [e]));
  const fixedRects = deep(document.body).filter((e) => vis(e) && getComputedStyle(e).position === "fixed" && e.getBoundingClientRect().width * e.getBoundingClientRect().height > 400 && !e.closest("header,nav")).map((e) => { const r = e.getBoundingClientRect(); return { name: (e.id || (typeof e.className === "string" ? e.className : "") || e.tagName).toString().slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }).filter((r) => r.y < innerHeight && r.y + r.h > 0);
  const textRects = [...document.querySelectorAll("h1,h2,p,li")].filter((e) => vis(e) && !isFixed(e) && (e.innerText || "").trim()).map((e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), text: e.innerText.trim() }; }).filter((r) => r.y < innerHeight && r.y + r.h > 0);
  const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== "none") return { kind: "image", color: null }; const b = rgb(s.backgroundColor); if (b && b.a > 0.99) return { kind: "solid", color: b.c }; } return { kind: "solid", color: [255, 255, 255] }; };
  const contrastTargets = [...document.querySelectorAll("h1,p")].filter((e) => vis(e) && !isFixed(e) && e.getBoundingClientRect().top < innerHeight && (e.innerText || "").trim()).slice(0, 4).map((e) => { const s = getComputedStyle(e); const fg = rgb(s.color); const bg = bgOf(e); const size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 700; return { tag: e.tagName, text: e.innerText.trim().slice(0, 40), fg: fg ? fg.c : null, bg: bg.color, bgKind: bg.kind, large: size >= 24 || (size >= 18.66 && bold) }; });
  const stepEls = (re) => [...document.querySelectorAll("h1,h2,h3,h4,div,span,p,a")].filter((e) => e.children.length < 3 && vis(e) && re.test((e.innerText || "").trim()) && (e.innerText || "").trim().length < 40).map((e) => ({ text: e.innerText.trim(), top: top(e) }));
  const links = [...document.querySelectorAll("a[href]")];
  const sameHost = links.filter((a) => a.host === location.host).map((a) => a.href);
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return (j["@graph"] || [j]).flatMap((x) => (Array.isArray(x["@type"]) ? x["@type"] : [x["@type"]])).filter(Boolean); } catch { return []; } });
  return {
    pageH: document.documentElement.scrollHeight, title: document.title, h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()),
    ctaEls, fixedRects, textRects, contrastTargets, step1: stepEls(/^step\s*1$/i)[0] || null, step2: stepEls(/^step\s*2$/i)[0] || null, step3: stepEls(/^step\s*3$/i)[0] || null,
    howItWorks: stepEls(/how it works|our process|admissions process/i).slice(0, 3),
    telHrefs: links.map((a) => a.getAttribute("href")).filter((h) => /^tel:/i.test(h)), visibleText: document.body.innerText,
    jsonLd: ld, sameHostUrls: [...new Set(sameHost)].filter((u) => !u.includes("#")),
    cwv: window.__cwv || {}, fontFamilies: [...new Set([...document.querySelectorAll("body *")].filter((e) => vis(e) && (e.innerText || "").trim()).map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g, "").trim()))],
  };
};

const initCwv = () => {
  window.__cwv = { lcpMs: null, cls: 0 };
  new PerformanceObserver((l) => { const e = l.getEntries().pop(); window.__cwv.lcpMs = Math.round(e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cwv.cls = Math.round((window.__cwv.cls + e.value) * 1000) / 1000; }).observe({ type: "layout-shift", buffered: true });
};

const started = Date.now();
const browser = await chromium.launch();
const out = { tool: "audit-evidence/collect.mjs v1.0", runId, url, startedAt: new Date(started).toISOString(), browser: browser.version(), attemptsMax: MAX_ATTEMPTS, viewports: {} };
for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const t0 = Date.now();
  const ctx = await browser.newContext({ viewport: vp, isMobile: name === "mobile" });
  const page = await ctx.newPage();
  try {
    await page.addInitScript(initCwv);
    const resp = await load(page);
    await page.waitForTimeout(2500);
    const raw = await page.evaluate(probe);
    await page.screenshot({ path: join(outDir, "evidence", `${name}-fold.png`) });
    const fold = A.foldCtas(raw.ctaEls, vp.height);
    out.viewports[name] = {
      status: resp.status(), viewport: vp, wallMs: Date.now() - t0, pageH: raw.pageH, h1: raw.h1,
      heroCta: fold, labels: A.labelChecks(raw.ctaEls), phones: A.phoneTargets(raw.telHrefs, raw.visibleText),
      overlays: A.overlays(raw.fixedRects, raw.textRects),
      contrast: raw.contrastTargets.map((t) => ({ tag: t.tag, text: t.text, ...(t.fg ? A.contrastVerdict(t.fg, t.bg, t.bgKind, t.large) : { ratio: A.NOT_MEASURED, pass: A.NOT_MEASURED }) })),
      step1: raw.step1 && A.position(raw.step1.top, raw.pageH, vp.height), step2: raw.step2 && A.position(raw.step2.top, raw.pageH, vp.height), step3Present: !!raw.step3, howItWorksText: raw.howItWorks.length,
      jsonLd: A.jsonLdDuplicates(raw.jsonLd), urlPatterns: A.urlPatterns(raw.sameHostUrls.filter((u) => /treatment|mental-health|substance/.test(u))),
      lab: { ...raw.cwv, note: "Lab values, unthrottled, single run. Not field data. INP Not Measured." }, inp: A.NOT_MEASURED, fontFamilies: raw.fontFamilies,
    };
  } catch (e) {
    out.viewports[name] = { error: String(e.message).slice(0, 200), wallMs: Date.now() - t0, note: A.NOT_MEASURED };
  } finally { await ctx.close(); }
}
await browser.close();
out.totalMs = Date.now() - started;

// Feedback records, one per agent, built from what this run measured.
const d = out.viewports.desktop || {}, m = out.viewports.mobile || {};
const common = { version: "1.1", runId, inputs: `${url} desktop 1440x900, mobile 390x844`, evidenceLinks: ["evidence.json", "evidence/desktop-fold.png", "evidence/mobile-fold.png"] };
const f = (id, ok, hi = "high") => ({ id, confidence: ok ? hi : "low", uncertainty: ok ? A.NOT_MEASURED : "viewport failed to load" });
const records = {
  "07": A.buildFeedbackRecord({ ...common, agent: "07-apple-design", findings: [f("07-3", !!d.overlays), f("07-4", !!m.overlays), f("07-5", !!d.contrast, "medium")], pattern: "overlays and unmeasurable contrast over images" }),
  "09": A.buildFeedbackRecord({ ...common, agent: "09-conversion", findings: [f("09-1", !!d.heroCta), f("09-2", !!m.heroCta), f("09-3", !!d.phones, "medium"), f("09-4", !!d.step1), f("09-5", !!d.labels)], pattern: "hero CTA fold position and label/destination" }),
  "24": A.buildFeedbackRecord({ ...common, agent: "24-seo-growth-engineering", findings: [f("24-2", !!d.jsonLd), f("24-3", !!d.urlPatterns), f("24-4", !!d.phones, "medium")], pattern: "structured data duplication, URL patterns, phone consistency" }),
};
const problems = Object.entries(records).flatMap(([k, r]) => A.validateFeedbackRecord(r).map((p) => `${k}: ${p}`));
out.feedbackValidation = problems.length ? problems : "valid";
writeFileSync(join(outDir, "evidence.json"), JSON.stringify(out, null, 2));
for (const [k, r] of Object.entries(records)) writeFileSync(join(outDir, `feedback-${k}.json`), JSON.stringify(r, null, 2));
console.log(`wrote ${outDir} in ${out.totalMs}ms; feedback ${out.feedbackValidation}`);
process.exit(problems.length ? 1 : 0);
