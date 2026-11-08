// @vitest-environment node
import { describe, it, expect, afterEach } from "vitest";
import net from "node:net";
import http from "node:http";
import https from "node:https";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
// @ts-ignore plain ESM helpers
import * as g from "./guard.mjs";
// @ts-ignore
import { startProxy } from "./proxy.mjs";

const pub = async () => [{ address: "93.184.216.34" }];
const closers: Array<() => any> = [];
afterEach(async () => { while (closers.length) await closers.pop()!(); });

async function echoServer() {
  const s = net.createServer((c) => c.on("data", (d) => c.write(`echo:${d}`)));
  await new Promise<void>((ok) => s.listen(0, "127.0.0.1", ok)); closers.push(() => s.close());
  return (s.address() as any).port as number;
}
/** Send a raw CONNECT and return the status line, plus optional echo. */
function connectVia(proxyPort: number, target: string, payload?: string): Promise<{ status: string; echoed?: string }> {
  return new Promise((ok) => {
    const c = net.connect(proxyPort, "127.0.0.1", () => c.write(`CONNECT ${target} HTTP/1.1\r\nHost: ${target}\r\n\r\n`));
    let buf = ""; let sent = false;
    c.on("data", (d) => {
      buf += d;
      if (/\r\n\r\n/.test(buf) && payload && !sent && buf.startsWith("HTTP/1.1 200")) { sent = true; buf = buf.split("\r\n\r\n")[0] + "\r\n\r\n"; c.write(payload); return; }
      if (sent && /echo:/.test(buf)) { ok({ status: buf.split("\r\n")[0], echoed: buf.split("\r\n\r\n")[1] }); c.destroy(); }
      else if (!payload && /\r\n\r\n/.test(buf)) { ok({ status: buf.split("\r\n")[0] }); c.destroy(); }
    });
    c.on("close", () => ok({ status: buf.split("\r\n")[0] || "closed" })); c.on("error", () => ok({ status: "error" }));
    setTimeout(() => { ok({ status: "timeout" }); c.destroy(); }, 4000);
  });
}

describe("filtering proxy (raw CONNECT)", () => {
  const boot = async (resolver = pub, extra: any = {}) => {
    const echo = await echoServer();
    const guard = g.makeRequestGuard({ allowed: ["allowed.test"], resolver });
    const p = await startProxy({ guard, connect: (_ip: string, _port: number) => net.connect({ host: "127.0.0.1", port: echo }), ...extra });
    closers.push(p.close); return { p, guard };
  };
  it("tunnels an allowed public host and relays data", async () => {
    const { p } = await boot();
    const r = await connectVia(p.port, "allowed.test:443", "hi");
    expect(r.status).toContain("200"); expect(r.echoed).toBe("echo:hi");
  });
  it.each(["127.0.0.1:443", "[::1]:443", "169.254.169.254:443", "localhost:443", "metadata.internal:443", "allowed.test:22", "allowed.test:80", "allowed.test:8443", "2130706433:443", "garbage"])("refuses CONNECT %s", async (t) => {
    const { p } = await boot();
    const r = await connectVia(p.port, t); expect(r.status).toMatch(/40[03]/);
  });
  it.each(["10.0.0.9", "127.0.0.1", "169.254.169.254", "192.168.1.1"])("refuses a public-looking name that resolves to %s", async (ip) => {
    const { p, guard } = await boot(async () => [{ address: ip }]);
    const r = await connectVia(p.port, "cdn.test:443"); expect(r.status).toContain("403");
    expect(guard.log.blocked.at(-1).reason).toBe("private-address");
  });
  it("connects to the vetted address, not a second DNS answer (rebinding)", async () => {
    const seen: string[] = []; let n = 0;
    const echo = await echoServer();
    const guard = g.makeRequestGuard({ allowed: ["allowed.test"], resolver: async () => [{ address: ++n === 1 ? "93.184.216.34" : "10.0.0.1" }] });
    const p = await startProxy({ guard, connect: (ip: string) => { seen.push(ip); return net.connect({ host: "127.0.0.1", port: echo }); } }); closers.push(p.close);
    await connectVia(p.port, "allowed.test:443", "a"); await connectVia(p.port, "allowed.test:443", "b");
    expect(seen).toEqual(["93.184.216.34", "93.184.216.34"]); // second lookup (private) never used
  });
  it("refuses plain http through the proxy", async () => {
    const { p, guard } = await boot();
    const status = await new Promise<number>((ok) => { const q = http.request({ host: "127.0.0.1", port: p.port, path: "http://allowed.test/", headers: { host: "allowed.test" } }, (res) => { ok(res.statusCode!); res.resume(); }); q.on("error", () => ok(0)); q.end(); });
    expect(status).toBe(403); expect(guard.log.blocked.at(-1).reason).toMatch(/plain http/);
  });
  it("enforces a connection cap", async () => {
    const { p } = await boot(pub, { maxConnections: 0 });
    expect((await connectVia(p.port, "allowed.test:443")).status).toContain("503");
  });
});

// ---- Chromium through the proxy against REAL local servers ----
let chromium: any; let chromiumOk = true;
try { ({ chromium } = await import("playwright-core")); const b = await chromium.launch(); await b.close(); } catch { chromiumOk = false; }
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "px-"));
const ssl = spawnSync("openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", path.join(dir, "k.pem"), "-out", path.join(dir, "c.pem"), "-subj", "/CN=allowed.test", "-days", "1"], { encoding: "utf8" });
const ready = chromiumOk && ssl.status === 0;

describe.skipIf(!ready)("browser through the proxy (real servers)", () => {
  async function rig(redirectTo: string | null) {
    const hits: string[] = [];
    const secure = https.createServer({ key: fs.readFileSync(path.join(dir, "k.pem")), cert: fs.readFileSync(path.join(dir, "c.pem")) }, (q, s) => {
      hits.push(`${q.headers.host}${q.url}`);
      if (redirectTo && q.url === "/") { s.writeHead(302, { location: redirectTo }); s.end(); } else { s.writeHead(200, { "content-type": "text/html" }); s.end("<p>reached</p>"); }
    });
    await new Promise<void>((ok) => secure.listen(0, "127.0.0.1", ok)); closers.push(() => secure.close());
    const sp = (secure.address() as any).port;
    const guard = g.makeRequestGuard({ allowed: ["allowed.test"], resolver: pub });
    const p = await startProxy({ guard, connect: () => net.connect({ host: "127.0.0.1", port: sp }) }); closers.push(p.close);
    const browser = await chromium.launch({ proxy: { server: `http://127.0.0.1:${p.port}`, bypass: "<-loopback>" } }); closers.push(() => browser.close());
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true, serviceWorkers: "block" }); const page = await ctx.newPage();
    const hops: string[] = []; page.on("framenavigated", (f: any) => { if (f === page.mainFrame()) hops.push(f.url()); });
    return { page, guard, hits, hops, p };
  }
  const go = async (page: any, url: string) => { try { await page.goto(url, { timeout: 12000 }); } catch { /* blocked loads throw */ } return page.content().catch(() => ""); };

  it("blocks a real server redirect to the cloud metadata IP (the case request interception cannot see)", async () => {
    const r = await rig("https://169.254.169.254/latest/meta-data/");
    const body = await go(r.page, "https://allowed.test/");
    expect(body).not.toContain("reached");
    expect(r.guard.log.blocked.map((b: any) => b.reason)).toContain("ip-literal");
    expect(r.page.url()).not.toContain("169.254");
  }, 40000);
  it("blocks a redirect to a name that resolves to a private address", async () => {
    const r = await rig("https://internal-service.test/admin");
    const guard = g.makeRequestGuard({ allowed: ["allowed.test"], resolver: async (h: string) => [{ address: h === "internal-service.test" ? "10.1.2.3" : "93.184.216.34" }] });
    r.guard.check = guard.check; r.guard.log.blocked = guard.log.blocked; // swap decision engine for this case
    const body = await go(r.page, "https://allowed.test/");
    expect(body).not.toContain("reached"); expect(guard.log.blocked.map((b: any) => b.reason)).toContain("private-address");
  }, 40000);
  it("lets a redirect to another PUBLIC host through the proxy, and navigationViolations catches it", async () => {
    const r = await rig("https://evil.test/landing");
    const body = await go(r.page, "https://allowed.test/");
    expect(body).toContain("reached");
    const v = g.navigationViolations(r.hops, ["allowed.test"]);
    expect(v.length).toBe(1); expect(v[0].reason).toMatch(/redirect pivot/);
  }, 40000);
  it("accepts a same-host redirect with no violations", async () => {
    const r = await rig("https://allowed.test/next");
    expect(await go(r.page, "https://allowed.test/")).toContain("reached");
    expect(g.navigationViolations(r.hops, ["allowed.test"])).toEqual([]); expect(r.guard.log.blocked).toEqual([]);
  }, 40000);
  it.each(["http://127.0.0.1", "http://localhost"])("never reaches a loopback server at %s even though Chromium normally bypasses proxies for it", async (base) => {
    let hits = 0; const lo = http.createServer((_q, s) => { hits++; s.end("secret"); });
    await new Promise<void>((ok) => lo.listen(0, "127.0.0.1", ok)); closers.push(() => lo.close());
    const r = await rig(null);
    await go(r.page, `${base}:${(lo.address() as any).port}/`);
    expect(hits).toBe(0); expect(r.p.stats.refused).toBeGreaterThan(0);
  }, 40000);
});
