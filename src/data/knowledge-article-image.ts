import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Shared UA/RU illustration for a knowledge article: public/images/knowledge/articles/<slug>.webp.
 * Returns undefined until the file exists, so Article.image / og:image never point at a missing file
 * (the site-wide default hero is used for og:image meanwhile).
 */
export function knowledgeArticleImage(slug: string): string | undefined {
  const path = `/images/knowledge/articles/${slug}.webp`;
  return existsSync(join(process.cwd(), 'public', path)) ? path : undefined;
}
