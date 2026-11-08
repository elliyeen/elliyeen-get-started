import { describe, it, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-ignore plain ESM helper
import * as g from "./guard.mjs";

const ALLOWED = ["example-clinic.test"];
const pub = async () => [{ address: "93.184.216.34" }];

describe("isBlockedIp (negative tests)", () => {
  it.each([
    "127.0.0.1", "127.255.255.254", "10.0.0.5", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254", "100.64.0.1",
    "0.0.0.0", "224.0.0.1", "255.255.255.255", "198.18.0.1", "::", "::1", "fe80::1", "fd00::1", "fc00::1", "ff02::1",
    "::ffff:127.0.0.1", "::ffff:169.254.169.254", "::ffff:10.1.2.3", "64:ff9b::7f00:1", "2002:7f00:1::", "2001:db8::1", "not-an-ip-at-all:",
  ])("blocks %s", (ip) => { expect(g.isBlockedIp(ip)).toBe(true); });
  it.each(["93.184.216.34", "8.8.8.8", "172.32.0.1", "100.63.255.255", "2606:4700:4700::1111"])("allows public %s", (ip) => { expect(g.isBlockedIp(ip)).toBe(false); });
});

describe("parseTarget", () => {
  it("accepts an allowlisted https host and subdomains", () => {
    expect(g.parseTarget("https://example-clinic.test/", ALLOWED).hostname).toBe("example-clinic.test");
    expect(g.parseTarget("https://www.example-clinic.test/x", ALLOWED).hostname).toBe("www.example-clinic.test");
    expect(g.parseTarget("https://EXAMPLE-CLINIC.test.:443/", ALLOWED).hostname).toBe("example-clinic.test.");
  });
  it.each([
    ["http://example-clinic.test/", "scheme"], ["file:///etc/passwd", "scheme"], ["javascript:alert(1)", "scheme"], ["data:text/html,hi", "scheme"], ["ftp://example-clinic.test/", "scheme"],
    ["https://user:pw@example-clinic.test/", "userinfo"], ["https://example-clinic.test:8443/", "port"],
    ["https://127.0.0.1/", "ip-literal"], ["https://[::1]/", "ip-literal"], ["https://169.254.169.254/latest/meta-data/", "ip-literal"], ["https://2130706433/", "ip-literal"],
    ["https://localhost/", "local-name"], ["https://app.localhost/", "local-name"], ["https://printer.local/", "local-name"], ["https://db.internal/", "local-name"],
    ["https://other.test/", "not-allowlisted"], ["https://example-clinic.test.evil.test/", "not-allowlisted"], ["https://evilexample-clinic.test/", "not-allowlisted"],
    ["https://evil.test/?example-clinic.test", "not-allowlisted"], ["https://xn--exmple-clinic-q8b.test/", "not-allowlisted"], ["not a url", "bad-url"],
  ])("rejects %s", (url, code) => { expect(() => g.parseTarget(url, ALLOWED)).toThrowError(new RegExp("^" + code)); });
});

describe("assertPublicHost", () => {
  it("passes public addresses", async () => { expect(await g.assertPublicHost("a.test", pub)).toEqual(["93.184.216.34"]); });
  it("rejects a name that resolves to loopback, metadata, or private space", async () => {
    for (const ip of ["127.0.0.1", "169.254.169.254", "10.0.0.7", "::1", "::ffff:192.168.0.1"])
      await expect(g.assertPublicHost("a.test", async () => [{ address: ip }])).rejects.toThrow(/private-address/);
  });
  it("rejects when ANY address is private (mixed records)", async () => {
    await expect(g.assertPublicHost("a.test", async () => [{ address: "93.184.216.34" }, { address: "10.0.0.1" }])).rejects.toThrow(/private-address/);
  });
  it("fails closed on DNS failure and empty answers", async () => {
    await expect(g.assertPublicHost("a.test", async () => { throw Object.assign(new Error("x"), { code: "ENOTFOUND" }); })).rejects.toThrow(/dns-failed/);
    await expect(g.assertPublicHost("a.test", async () => [])).rejects.toThrow(/dns-empty/);
  });
});

describe("makeRequestGuard (connection level: redirects, DNS pivots, third parties)", () => {
  const mk = (resolver = pub, extra = {}) => g.makeRequestGuard({ allowed: ALLOWED, resolver, ...extra });
  it("allows a first-party host and returns the vetted address; logs third parties", async () => {
    const q = mk();
    const a = await q.check({ host: "example-clinic.test", port: 443 });
    expect(a).toMatchObject({ allow: true, address: "93.184.216.34", firstParty: true });
    expect((await q.check({ host: "fonts.cdn.test", port: 443 })).firstParty).toBe(false);
    expect(q.log.thirdPartyHosts).toEqual({ "fonts.cdn.test": 1 });
  });
  it.each([["169.254.169.254", 443, "ip-literal"], ["127.0.0.1", 443, "ip-literal"], ["[::1]", 443, "ip-literal"], ["2130706433", 443, "numeric-host"], ["0x7f.1", 443, "numeric-host"], ["017700000001", 443, "numeric-host"], ["localhost", 443, "local-name"], ["db.internal", 443, "local-name"], ["printer.local", 443, "local-name"],
    ["example-clinic.test", 80, "port 80"], ["example-clinic.test", 22, "port 22"], ["example-clinic.test", 8443, "port 8443"], ["", 443, "empty-host"]])(
    "blocks %s:%s", async (host, port, why) => { const r = await mk().check({ host, port }); expect(r.allow).toBe(false); expect(r.reason).toContain(why); });
  it("blocks a hostname that resolves to a private, loopback or metadata address (redirect/DNS pivot)", async () => {
    for (const ip of ["10.9.8.7", "127.0.0.1", "169.254.169.254", "::1", "::ffff:192.168.0.1", "100.64.0.9"]) {
      const q = mk(async () => [{ address: ip }]);
      const r = await q.check({ host: "cdn.test", port: 443 });
      expect(r.allow).toBe(false); expect(r.reason).toBe("private-address");
    }
  });
  it("blocks when any returned address is private", async () => {
    expect((await mk(async () => [{ address: "93.184.216.34" }, { address: "10.0.0.1" }]).check({ host: "x.test", port: 443 })).allow).toBe(false);
  });
  it("fails closed on DNS errors", async () => {
    expect((await mk(async () => { throw Object.assign(new Error("x"), { code: "ENOTFOUND" }); }).check({ host: "x.test", port: 443 })).reason).toBe("dns-failed");
  });
  it("caps third-party hosts", async () => {
    const q = mk(pub, { maxThirdParty: 2 }); const res = [];
    for (const h of ["a.test", "b.test", "c.test"]) res.push((await q.check({ host: h, port: 443 })).allow);
    expect(res).toEqual([true, true, false]); expect(q.log.blocked.at(-1).reason).toBe("third-party request cap");
  });
});

describe("navigationViolations (detects a redirect to another public site)", () => {
  it("passes allowlisted https pages", () => { expect(g.navigationViolations(["about:blank", "https://example-clinic.test/", "https://www.example-clinic.test/x"], ALLOWED)).toEqual([]); });
  it("reports a main-frame hop to another host or to http", () => {
    const v = g.navigationViolations(["https://example-clinic.test/", "https://evil.test/landing", "http://example-clinic.test/x"], ALLOWED);
    expect(v.map((x: any) => x.reason)).toEqual(["host not allowlisted (redirect pivot)", "scheme http:"]);
  });
});

describe("output confinement", () => {
  const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "guard-"));
  it("creates a fresh directory under the root", () => {
    const root = tmp(); const d = g.resolveOutputDir(root, "run-1");
    expect(d.startsWith(fs.realpathSync(root))).toBe(true);
  });
  it.each(["../escape", "a/../../escape", "/etc", "..", ".", "", "a\0b"])("rejects %j", (name) => { expect(() => g.resolveOutputDir(tmp(), name)).toThrow(); });
  it("rejects a symlink inside the path that points outside", () => {
    const root = tmp(), outside = tmp();
    fs.symlinkSync(outside, path.join(root, "link"));
    expect(() => g.resolveOutputDir(root, "link/run")).toThrow(/out-symlink/);
    expect(() => g.resolveOutputDir(root, "link")).toThrow(/out-symlink/);
    expect(fs.readdirSync(outside)).toEqual([]);
  });
  it("rejects a root that is itself reached through a symlink only if the target leaves the root", () => {
    const root = tmp(); fs.mkdirSync(path.join(root, "ok"));
    expect(g.resolveOutputDir(root, "ok/sub").endsWith(path.join("ok", "sub"))).toBe(true);
  });
  it("refuses a non-empty existing directory (no overwrite)", () => {
    const root = tmp(); const d = g.resolveOutputDir(root, "run-1"); fs.writeFileSync(path.join(d, "keep.txt"), "x");
    expect(() => g.resolveOutputDir(root, "run-1")).toThrow(/out-not-empty/);
    expect(fs.readFileSync(path.join(d, "keep.txt"), "utf8")).toBe("x");
  });
  it("refuses a file where a directory is expected", () => {
    const root = tmp(); fs.writeFileSync(path.join(root, "f"), "x");
    expect(() => g.resolveOutputDir(root, "f/sub")).toThrow(/out-not-dir/);
  });
  it("safeWrite is exclusive and will not follow a pre-planted symlink", () => {
    const root = tmp(), outside = tmp(); const d = g.resolveOutputDir(root, "r");
    g.safeWrite(d, "a.json", "1");
    expect(() => g.safeWrite(d, "a.json", "2")).toThrow(/EEXIST/);
    fs.symlinkSync(path.join(outside, "victim"), path.join(d, "b.json"));
    expect(() => g.safeWrite(d, "b.json", "pwn")).toThrow();
    expect(fs.existsSync(path.join(outside, "victim"))).toBe(false);
    expect(() => g.safeWrite(d, "../x", "1")).toThrow(/write-escape/);
  });
  it.each(["ok-1", "run_2026.11.08", "A1"])("accepts run id %s", (id) => { expect(g.assertRunId(id)).toBe(id); });
  it.each(["", "../x", "a/b", "a b", "-lead", "x..y", "a".repeat(65), "run;rm"])("rejects run id %j", (id) => { expect(() => g.assertRunId(id)).toThrow(); });
});

describe("allowed-hosts.json", () => {
  it("loads the committed allowlist", () => {
    const hosts = g.loadAllowedHosts(path.join(__dirname, "allowed-hosts.json"));
    expect(hosts).toEqual(["compassionrecoverycenters.com"]);
  });
  it("rejects an empty allowlist", () => {
    const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "al-")), "a.json"); fs.writeFileSync(f, '{"hosts":[]}');
    expect(() => g.loadAllowedHosts(f)).toThrow(/allowlist-empty/);
  });
});
