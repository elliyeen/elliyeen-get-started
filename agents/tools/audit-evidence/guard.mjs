// Security guards for the evidence collector: URL allowlist, private-address blocking, request guard, output confinement.
// Pure functions with injectable DNS so every rule has a negative test. No browser code here.
import dns from "node:dns/promises";
import net from "node:net";
import fs from "node:fs";
import path from "node:path";

export class GuardError extends Error { constructor(code, msg) { super(`${code}: ${msg}`); this.code = code; } }

/* ---------- IP classification ---------- */
const v4 = (ip) => ip.split(".").map(Number);
const inV4 = (n, cidr) => { const [base, bits] = cidr.split("/"); const b = v4(base), m = Number(bits); const toInt = (a) => ((a[0] << 24) | (a[1] << 16) | (a[2] << 8) | a[3]) >>> 0; const mask = m === 0 ? 0 : (~0 << (32 - m)) >>> 0; return (toInt(n) & mask) === (toInt(b) & mask); };
const BLOCKED_V4 = ["0.0.0.0/8", "10.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8", "169.254.0.0/16", "172.16.0.0/12", "192.0.0.0/24", "192.0.2.0/24", "192.88.99.0/24", "192.168.0.0/16", "198.18.0.0/15", "198.51.100.0/24", "203.0.113.0/24", "224.0.0.0/4", "240.0.0.0/4"];

function parseV6(ip) {
  let s = ip.toLowerCase().replace(/^\[|\]$/g, "").split("%")[0];
  let tail = null;
  const m = s.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (m) { const p = v4(m[1]); tail = [((p[0] << 8) | p[1]), ((p[2] << 8) | p[3])]; s = s.slice(0, -m[1].length) + "0:0"; }
  const [head, rest] = s.split("::");
  const h = head ? head.split(":") : [];
  const r = rest !== undefined ? (rest ? rest.split(":") : []) : null;
  let groups;
  if (r === null) groups = h; else groups = [...h, ...Array(8 - h.length - r.length).fill("0"), ...r];
  if (groups.length !== 8) return null;
  const n = groups.map((g) => parseInt(g || "0", 16));
  if (n.some((x) => Number.isNaN(x) || x < 0 || x > 0xffff)) return null;
  if (tail) { n[6] = tail[0]; n[7] = tail[1]; }
  return n;
}

/** True when the address must never be fetched: private, loopback, link-local, metadata, multicast, reserved, or embeds one. */
export function isBlockedIp(ip) {
  const kind = net.isIP(ip.replace(/^\[|\]$/g, ""));
  if (kind === 4) return BLOCKED_V4.some((c) => inV4(v4(ip), c));
  if (kind === 6 || ip.includes(":")) {
    const g = parseV6(ip);
    if (!g) return true; // unparseable: fail closed
    const embedded = (a, b) => [a >> 8, a & 255, b >> 8, b & 255].join(".");
    if (g.every((x) => x === 0)) return true;                                   // ::
    if (g.slice(0, 7).every((x) => x === 0) && g[7] === 1) return true;       // ::1
    if (g.slice(0, 5).every((x) => x === 0) && g[5] === 0xffff) return isBlockedIp(embedded(g[6], g[7])); // ::ffff:a.b.c.d
    if (g.slice(0, 6).every((x) => x === 0)) return true;                      // ::a.b.c.d (deprecated compat)
    if (g[0] === 0x64 && g[1] === 0xff9b) return isBlockedIp(embedded(g[6], g[7])); // NAT64
    if (g[0] === 0x2002) return isBlockedIp(embedded(g[1], g[2]));             // 6to4
    if ((g[0] & 0xffc0) === 0xfe80) return true;                               // fe80::/10 link-local
    if ((g[0] & 0xfe00) === 0xfc00) return true;                               // fc00::/7 unique local
    if ((g[0] & 0xff00) === 0xff00) return true;                               // multicast
    if (g[0] === 0x2001 && g[1] === 0x0db8) return true;                       // documentation
    if (g[0] === 0x2001 && g[1] === 0) return true;                            // Teredo
    return false;
  }
  return true; // not an IP: caller must resolve first
}

/* ---------- URL rules ---------- */
export function loadAllowedHosts(file) {
  const j = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(j.hosts) || j.hosts.length === 0) throw new GuardError("allowlist-empty", "allowed-hosts.json has no hosts");
  return j.hosts.map((h) => String(h).toLowerCase().replace(/\.$/, ""));
}
export const hostAllowed = (host, allowed) => allowed.some((a) => host === a || host.endsWith("." + a));

/** Validate the user-supplied target URL. Throws GuardError. Returns a URL. */
export function parseTarget(input, allowed) {
  let u;
  try { u = new URL(input); } catch { throw new GuardError("bad-url", "not a valid URL"); }
  if (u.protocol !== "https:") throw new GuardError("scheme", `only https is allowed, got ${u.protocol}`);
  if (u.username || u.password) throw new GuardError("userinfo", "credentials in URL are not allowed");
  if (u.port && u.port !== "443") throw new GuardError("port", `port ${u.port} is not allowed`);
  const host = u.hostname.toLowerCase().replace(/\.$/, "");
  if (net.isIP(host.replace(/^\[|\]$/g, "")) || host.startsWith("[")) throw new GuardError("ip-literal", "IP literals are not allowed");
  if (/^(localhost|.*\.localhost|.*\.local|.*\.internal|.*\.lan|.*\.home\.arpa)$/.test(host)) throw new GuardError("local-name", "local hostnames are not allowed");
  if (!hostAllowed(host, allowed)) throw new GuardError("not-allowlisted", `${host} is not in allowed-hosts.json`);
  return u;
}

/** Resolve a hostname and require every address to be public. Returns the addresses. */
export async function assertPublicHost(host, resolver = (h) => dns.lookup(h, { all: true, verbatim: true })) {
  let addrs;
  try { addrs = await resolver(host); } catch (e) { throw new GuardError("dns-failed", `${host}: ${e.code || e.message}`); }
  const list = (addrs || []).map((a) => (typeof a === "string" ? a : a.address));
  if (!list.length) throw new GuardError("dns-empty", `${host} did not resolve`);
  const bad = list.filter(isBlockedIp);
  if (bad.length) throw new GuardError("private-address", `${host} resolves to blocked address ${bad[0]}`);
  return list;
}

/**
 * Connection-level decision, applied by proxy.mjs to EVERY connection the browser opens
 * (page loads, redirect hops, subresources, workers, frames). Redirects cannot bypass it because it does not
 * depend on the browser reporting them. The address returned is the vetted one; the proxy connects to it directly,
 * so a second DNS answer (rebinding) is never used.
 */
export function makeRequestGuard({ allowed, resolver, maxThirdParty = 400 }) {
  const cache = new Map();
  const log = { allowed: 0, thirdPartyHosts: {}, blocked: [] };
  let thirdParty = 0;
  const block = (target, reason) => { log.blocked.push({ target: String(target).slice(0, 120), reason }); return { allow: false, reason }; };
  async function check({ host: rawHost, port }) {
    const host = String(rawHost || "").toLowerCase().replace(/\.$/, "");
    if (!host) return block(rawHost, "empty-host");
    if (Number(port) !== 443) return block(`${host}:${port}`, `port ${port}`);
    if (net.isIP(host.replace(/^\[|\]$/g, "")) || host.startsWith("[")) return block(host, "ip-literal");
    if (/^(localhost|.*\.localhost|.*\.local|.*\.internal|.*\.lan|.*\.home\.arpa)$/.test(host)) return block(host, "local-name");
    if (/(^|\.)(0x[0-9a-f]*|\d+)$/i.test(host)) return block(host, "numeric-host"); // decimal/octal/hex IP spellings
    let addrs;
    try {
      if (!cache.has(host)) cache.set(host, assertPublicHost(host, resolver));
      addrs = await cache.get(host);
    } catch (e) { return block(host, e.code || "dns"); }
    const first = hostAllowed(host, allowed);
    if (!first) {
      if (thirdParty >= maxThirdParty) return block(host, "third-party request cap");
      thirdParty++; log.thirdPartyHosts[host] = (log.thirdPartyHosts[host] || 0) + 1;
    }
    log.allowed++;
    return { allow: true, address: addrs[0], firstParty: first };
  }
  return { check, log };
}

/** Main-frame URLs that left the allowlist or the https scheme (detects redirects to another public site). */
export function navigationViolations(urls, allowed) {
  const bad = [];
  for (const u of urls) {
    let x; try { x = new URL(u); } catch { bad.push({ url: u, reason: "bad-url" }); continue; }
    if (x.protocol === "about:" || x.protocol === "data:" || x.protocol === "blob:") continue;
    if (x.protocol !== "https:") bad.push({ url: u, reason: `scheme ${x.protocol}` });
    else if (!hostAllowed(x.hostname.toLowerCase().replace(/\.$/, ""), allowed)) bad.push({ url: u, reason: "host not allowlisted (redirect pivot)" });
  }
  return bad;
}

/* ---------- Output confinement ---------- */
export const RUN_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
export function assertRunId(id) { if (!RUN_ID_RE.test(id) || id.includes("..")) throw new GuardError("run-id", "run id must match [A-Za-z0-9._-]{1,64} and not contain .."); return id; }

const inside = (root, p) => p === root || p.startsWith(root + path.sep);

/** Create (never reuse non-empty) a directory strictly inside root. No symlink traversal. Returns the real path. */
export function resolveOutputDir(root, name) {
  if (typeof name !== "string" || !name || name.includes("\0")) throw new GuardError("out-name", "output name is required");
  if (path.isAbsolute(name)) throw new GuardError("out-absolute", "output must be a relative name under the artifacts root");
  const norm = path.normalize(name);
  if (norm === "." || norm.split(path.sep).includes("..")) throw new GuardError("out-traversal", "path traversal is not allowed");
  fs.mkdirSync(root, { recursive: true });
  const rootReal = fs.realpathSync(root);
  let cur = rootReal;
  for (const part of norm.split(path.sep).filter(Boolean)) {
    cur = path.join(cur, part);
    if (!inside(rootReal, cur)) throw new GuardError("out-escape", "resolved path leaves the artifacts root");
    let st = null;
    try { st = fs.lstatSync(cur); } catch (e) { if (e.code !== "ENOENT") throw e; }
    if (st) {
      if (st.isSymbolicLink()) throw new GuardError("out-symlink", `symlink in output path: ${part}`);
      if (!st.isDirectory()) throw new GuardError("out-not-dir", `${part} exists and is not a directory`);
    } else fs.mkdirSync(cur);
  }
  const real = fs.realpathSync(cur);
  if (!inside(rootReal, real)) throw new GuardError("out-escape", "resolved path leaves the artifacts root");
  if (fs.readdirSync(real).length) throw new GuardError("out-not-empty", "output directory is not empty; refusing to overwrite");
  return real;
}

/** Exclusive create inside dir. Fails if the file or a symlink already exists. */
export function safeWrite(dir, rel, data) {
  const target = path.join(dir, rel);
  if (!inside(dir, path.resolve(target))) throw new GuardError("write-escape", rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data, { flag: "wx" });
  return target;
}
