// @vitest-environment node
import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-ignore plain ESM helper

const CLI = path.join(__dirname, "collect.mjs");
const run = (args: string[], root: string) => spawnSync(process.execPath, [CLI, ...args], { env: { ...process.env, AUDIT_ARTIFACTS_ROOT: root }, encoding: "utf8", timeout: 20000 });
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "cli-"));

describe("collect.mjs refuses unsafe input before any browser starts (exit 3, nothing written)", () => {
  it.each([
    ["http scheme", "http://compassionrecoverycenters.com/", "scheme"],
    ["loopback IP", "https://127.0.0.1/", "ip-literal"],
    ["metadata IP", "https://169.254.169.254/latest/meta-data/", "ip-literal"],
    ["IPv6 loopback", "https://[::1]/", "ip-literal"],
    ["localhost", "https://localhost/", "local-name"],
    ["not allowlisted", "https://example.org/", "not-allowlisted"],
    ["suffix trick", "https://compassionrecoverycenters.com.evil.test/", "not-allowlisted"],
    ["userinfo", "https://user:pw@compassionrecoverycenters.com/", "userinfo"],
    ["odd port", "https://compassionrecoverycenters.com:8443/", "port"],
    ["file scheme", "file:///etc/passwd", "scheme"],
  ])("%s", (_n, url, code) => {
    const root = tmp(); const r = run([url, "out"], root);
    expect(r.status).toBe(3); expect(r.stderr).toContain(`REFUSED ${code}`);
    expect(fs.readdirSync(root)).toEqual([]);
  });

  it("refuses to scan a live loopback HTTP server", async () => {
    let hits = 0;
    const srv = http.createServer((_q, s) => { hits++; s.end("secret"); });
    await new Promise<void>((ok) => srv.listen(0, "127.0.0.1", ok));
    const port = (srv.address() as any).port;
    const root = tmp(); const r = run([`http://127.0.0.1:${port}/`, "out"], root);
    srv.close();
    expect(r.status).toBe(3); expect(hits).toBe(0);
  });

  it.each([
    ["traversal", "../escape", "out-traversal"],
    ["absolute", "/tmp/x", "out-absolute"],
  ])("refuses output %s", (_n, out, code) => {
    const root = tmp(); const r = run(["https://compassionrecoverycenters.com/", out], root);
    expect(r.status).toBe(3); expect(r.stderr).toContain(code);
  });

  it("refuses an output path that is a symlink out of the root, and writes nothing there", () => {
    const root = tmp(), outside = tmp(); fs.symlinkSync(outside, path.join(root, "link"));
    const r = run(["https://compassionrecoverycenters.com/", "link"], root);
    expect(r.status).toBe(3); expect(r.stderr).toContain("out-symlink"); expect(fs.readdirSync(outside)).toEqual([]);
  });

  it("refuses a bad run id", () => {
    const r = run(["https://compassionrecoverycenters.com/", "out", "../x"], tmp());
    expect(r.status).toBe(3); expect(r.stderr).toContain("run-id");
  });
});
