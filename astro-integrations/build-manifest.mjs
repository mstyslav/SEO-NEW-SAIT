import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildManifest, MANIFEST_PATH } from '../scripts/lib/indexnow-core.mjs';

// Writes dist/build-manifest.json: the commit this build was made from plus a content hash for every sitemap URL.
// The post-deploy IndexNow workflow (scripts/indexnow-auto.mjs) reads it from production to (1) confirm that the
// site really serves the new commit and (2) work out which URLs are new, changed or gone since the last run.

const commitSha = () => {
  const fromEnv = process.env.WORKERS_CI_COMMIT_SHA || process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA;
  if (fromEnv) return fromEnv;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'unknown';
  }
};

export default function buildManifestIntegration() {
  return {
    name: 'build-manifest',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        if (!fs.existsSync(path.join(outDir, 'sitemap.xml'))) {
          logger.warn('sitemap.xml missing: build-manifest.json not written');
          return;
        }
        const manifest = buildManifest(outDir, commitSha());
        fs.writeFileSync(path.join(outDir, MANIFEST_PATH.slice(1)), JSON.stringify(manifest));
        logger.info(`${MANIFEST_PATH}: ${Object.keys(manifest.pages).length} URLs @ ${manifest.commit.slice(0, 7)}`);
      }
    }
  };
}
