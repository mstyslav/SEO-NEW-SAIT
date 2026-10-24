import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildManifest, MANIFEST_PATH } from '../scripts/lib/indexnow-core.mjs';

// Writes two files into dist/:
//  - build-manifest.json: the commit plus a content hash for every sitemap URL. Used by the CI run of the post-deploy
//    IndexNow workflow (scripts/indexnow-auto.mjs) to find new / changed / removed URLs. It is NOT published:
//    public/.assetsignore keeps it out of the Cloudflare asset upload (Cloudflare challenges runner IPs anyway).
//  - deploy-version.txt: the bare commit SHA, a .txt file Cloudflare serves without a challenge, so the workflow can
//    confirm the live version when it is reachable.

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
        fs.writeFileSync(path.join(outDir, 'deploy-version.txt'), manifest.commit);
        logger.info(`${MANIFEST_PATH}: ${Object.keys(manifest.pages).length} URLs @ ${manifest.commit.slice(0, 7)}`);
      }
    }
  };
}
