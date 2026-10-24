// Shared IndexNow logic: rendered-page manifest (hash per canonical URL), manifest diff and batch submission.
// Used by astro-integrations/build-manifest.mjs (writes dist/build-manifest.json), scripts/indexnow.mjs (manual
// submit) and scripts/indexnow-auto.mjs (post-deploy automation). Node built-ins only.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const HOST = 'space-glass.com.ua';
export const ORIGIN = `https://${HOST}`;
// The verified IndexNow key (public by design: the engines fetch it from KEY_LOCATION).
export const KEY = '24b7e88d34f656f929a681a60c6f719e';
export const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
export const API_URL = 'https://api.indexnow.org/IndexNow';
export const MANIFEST_PATH = '/build-manifest.json';
export const BATCH_SIZE = 10000;

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const meta = (html, re) => decode((html.match(re) || [])[1] || '').trim();

/**
 * Hash of what a search engine reads from a rendered page. Deliberately ignores everything that changes on
 * every build without changing the page: hashed /_astro/ asset names, inline scripts and styles, SVG paths,
 * comments, whitespace. A shared component edit (header/footer text or links) still changes every page that
 * renders it, because its text and links are part of the hash.
 */
export function hashPage(html) {
  const head = html.slice(0, html.search(/<\/head>/i) + 1 || html.length);
  const bodyStart = html.search(/<body[\s>]/i);
  let body = bodyStart >= 0 ? html.slice(bodyStart) : html;
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
  body = body.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style|svg|template)\b[\s\S]*?<\/\1>/gi, ' ');
  const links = [...body.matchAll(/<a\b[^>]*?\shref="([^"]*)"/gi)].map((m) => m[1]);
  const imgs = [...body.matchAll(/<img\b[^>]*?\ssrc="([^"]*)"/gi)].map((m) => m[1].split('?')[0]);
  const alts = [...body.matchAll(/<img\b[^>]*?\salt="([^"]*)"/gi)].map((m) => decode(m[1]));
  const text = decode(body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const payload = {
    title: meta(head, /<title>([^<]*)<\/title>/i),
    description: meta(head, /<meta name="description" content="([^"]*)"/i),
    canonical: meta(head, /<link rel="canonical" href="([^"]*)"/i),
    robots: meta(head, /<meta name="robots" content="([^"]*)"/i),
    hreflang: [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]*)"/gi)].map((m) => `${m[1]}>${m[2]}`).sort(),
    ogImage: meta(head, /<meta property="og:image" content="([^"]*)"/i).split('?')[0],
    ld,
    text,
    links,
    imgs,
    alts
  };
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
}

/** Canonical indexable URLs = the sitemap. Returns URL paths (query-free, https, production host only). */
export function sitemapPaths(sitemapXml) {
  const paths = new Set();
  for (const m of sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = new URL(decode(m[1]));
    if (u.origin === ORIGIN && !u.search) paths.add(u.pathname);
  }
  return [...paths].sort();
}

export function buildManifest(distDir, commit) {
  const pages = {};
  for (const p of sitemapPaths(fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8'))) {
    const file = path.join(distDir, p, p.endsWith('/') ? 'index.html' : '');
    if (fs.existsSync(file)) pages[p] = hashPage(fs.readFileSync(file, 'utf8'));
  }
  return { version: 1, host: HOST, commit, generatedAt: new Date().toISOString(), pages };
}

/** added = new canonical URL, updated = same URL with different content hash, removed = left the sitemap. */
export function diffManifests(prev, next) {
  const a = prev?.pages ?? {};
  const b = next?.pages ?? {};
  return {
    added: Object.keys(b).filter((p) => !(p in a)).sort(),
    updated: Object.keys(b).filter((p) => p in a && a[p] !== b[p]).sort(),
    removed: Object.keys(a).filter((p) => !(p in b)).sort()
  };
}

/**
 * POST batches to IndexNow. Temporary failures (429, 5xx, 403 "site verification not completed", network
 * errors) are retried with backoff; a 200/202 batch is never sent again. Returns what was accepted and what
 * is still pending, so the caller can store the rest for a later safe retry.
 */
export async function submitIndexNow(urls, { fetchImpl = fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), retries = 4, baseDelayMs = 30000 } = {}) {
  const unique = [...new Set(urls)];
  const accepted = [];
  const failed = [];
  const responses = [];
  for (let i = 0; i < unique.length; i += BATCH_SIZE) {
    const batch = unique.slice(i, i + BATCH_SIZE);
    let status = 0;
    let ok = false;
    for (let attempt = 0; attempt <= retries && !ok; attempt++) {
      if (attempt) await sleep(baseDelayMs * 2 ** (attempt - 1));
      try {
        const res = await fetchImpl(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch })
        });
        status = res.status;
        if (status === 200 || status === 202) ok = true;
        else if (status === 400 || status === 422) break; // malformed / invalid URLs: retrying cannot help
      } catch {
        status = 0;
      }
    }
    responses.push(status);
    (ok ? accepted : failed).push(...batch);
  }
  return { accepted, failed, responses };
}
