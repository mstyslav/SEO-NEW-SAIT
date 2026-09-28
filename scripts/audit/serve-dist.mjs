// Minimal production-like static server for dist/ used by the audit scripts.
// Mirrors what Cloudflare Workers Static Assets does for this site:
//   • /path/ → /path/index.html, 404.html for misses (status 404)
//   • dist/_redirects (static "from to status" lines)
//   • dist/_headers (path patterns with a trailing * wildcard)
//   • gzip for text responses (Cloudflare compresses at the edge)
// Usage: node scripts/audit/serve-dist.mjs [port=4499]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve('dist');
const port = Number(process.argv[2] || process.env.PORT || 4499);

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.mp4': 'video/mp4'
};
const compressible = /^(text\/|application\/(json|xml|javascript)|image\/svg)/;

function readRules(file) {
  const p = path.join(root, file);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').split('\n') : [];
}

const redirects = new Map();
for (const line of readRules('_redirects')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [from, to, status = '301'] = t.split(/\s+/);
  if (from && to) redirects.set(from, { to, status: Number(status) });
}

// _headers: a line starting at column 0 is a path pattern, indented lines are "Name: value".
const headerRules = [];
for (const line of readRules('_headers')) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  if (!/^\s/.test(line)) headerRules.push({ pattern: line.trim(), headers: [] });
  else if (headerRules.length) {
    const i = line.indexOf(':');
    headerRules.at(-1).headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
  }
}
const matches = (pattern, p) => pattern.endsWith('*') ? p.startsWith(pattern.slice(0, -1)) : pattern === p;

function send(req, res, status, file, pathname) {
  const ext = path.extname(file).toLowerCase();
  const type = types[ext] || 'application/octet-stream';
  const headers = { 'Content-Type': type, 'Cache-Control': 'public, max-age=0, must-revalidate' };
  for (const rule of headerRules) if (matches(rule.pattern, pathname)) for (const [k, v] of rule.headers) headers[k] = v;
  let body = fs.readFileSync(file);
  if (compressible.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    body = zlib.gzipSync(body, { level: 6 });
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
  }
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);
  const r = redirects.get(pathname);
  if (r) { res.writeHead(r.status, { Location: r.to + url.search }); return res.end(); }
  let file = path.join(root, pathname);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) { res.writeHead(307, { Location: pathname + '/' + url.search }); return res.end(); }
    file = path.join(file, 'index.html');
  }
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return send(req, res, 200, file, pathname);
  if (req.method === 'POST' && pathname.startsWith('/api/')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"ok":true}'); }
  return send(req, res, 404, path.join(root, '404.html'), pathname);
}).listen(port, () => console.log(`dist served on http://localhost:${port}`));
