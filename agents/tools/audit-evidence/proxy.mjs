// Filtering HTTP CONNECT proxy. The browser is forced through it, so every outbound connection is checked:
// https/443 only, hostname (never an IP literal), DNS resolved HERE, every answer public, connect to the vetted address.
// Plain http through the proxy is refused. Listens on loopback only.
import http from "node:http";
import net from "node:net";

const refuse = (sock, code = 403) => { try { sock.end(`HTTP/1.1 ${code} Forbidden\r\nConnection: close\r\n\r\n`); } catch { /* socket gone */ } };

export function startProxy({ guard, connect = (ip, port) => net.connect({ host: ip, port }), maxConnections = 300, idleMs = 30000 }) {
  let open = 0; const stats = { connects: 0, refused: 0 };
  const server = http.createServer((req, res) => { guard.log.blocked.push({ target: String(req.url).slice(0, 120), reason: "plain http through proxy" }); stats.refused++; res.writeHead(403); res.end("blocked"); });
  server.on("connect", async (req, client, head) => {
    const m = String(req.url).match(/^(\[[^\]]+\]|[^:]+):(\d+)$/);
    if (!m) { stats.refused++; return refuse(client, 400); }
    if (open >= maxConnections) { guard.log.blocked.push({ target: req.url, reason: "connection cap" }); stats.refused++; return refuse(client, 503); }
    let d;
    try { d = await guard.check({ host: m[1], port: Number(m[2]) }); } catch { d = { allow: false }; }
    if (!d.allow) { stats.refused++; return refuse(client); }
    open++; stats.connects++;
    const up = connect(d.address, Number(m[2]));
    const done = () => { if (up.__done) return; up.__done = true; open--; up.destroy(); client.destroy(); };
    up.setTimeout(idleMs, done); client.setTimeout(idleMs, done);
    up.once("connect", () => { client.write("HTTP/1.1 200 Connection Established\r\n\r\n"); if (head?.length) up.write(head); up.pipe(client); client.pipe(up); });
    up.on("error", done); client.on("error", done); up.on("close", done); client.on("close", done);
  });
  return new Promise((ok, no) => {
    server.once("error", no);
    server.listen(0, "127.0.0.1", () => ok({ port: server.address().port, stats, close: () => new Promise((r) => { server.closeAllConnections?.(); server.close(r); }) }));
  });
}
