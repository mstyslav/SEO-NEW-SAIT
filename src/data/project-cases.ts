/**
 * Projects rendered with the premium case template (ProjectCasePremium.astro) instead of the
 * standard ProjectDetail.astro. Explicit allowlist keyed by project slug: a project is switched
 * by adding its case here — nothing is inferred from URLs, titles or categories.
 * Every other project is untouched.
 *
 * A case holds only the editorial blocks. H1, lead, city/object, characteristics, cover,
 * gallery, FAQ items, SEO fields and JSON-LD always come from the project entry
 * (src/content/projects/*.json + the RU overlay in src/data/ru/projects.ru.ts).
 * Every block is optional: a block without data is not rendered at all.
 */
import { NOFILTERS_SLUG, nofiltersCase } from './project-cases/nofilters';

export type CaseContent = {
  /** Short caption shown on the hero photo. */
  heroCaption?: string;
  galleryTitle?: string;
  about?: { title: string; paragraphs: string[] };
  task?: { title: string; text: string };
  solution?: { title: string; paragraphs: string[] };
  /** Confirmed characteristics of THIS project only. */
  tech?: { title: string; note?: string; items: { label: string; value: string }[] };
  /** `fact` = what happened on this project; `general` = how Space Glass usually works (shown as general info). */
  process?: { title: string; fact?: string; general?: { label: string; steps: { title: string; text: string }[] } };
  result?: { title: string; text: string };
  /** General advantages of the solution type — rendered with a «general information» mark. */
  benefits?: { title: string; note?: string; items: { title: string; text: string }[] };
  service?: { title: string; text?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string }[] };
  cta: { title: string; text: string; button: string };
  /** Heading of the FAQ block. */
  faqTitle: string;
  /** true = show only the project's own FAQ (no category-wide questions); FAQPage follows. */
  faqOwnOnly?: boolean;
};

export type ProjectCase = Record<'uk' | 'ru', CaseContent>;

export const PROJECT_CASES: Record<string, ProjectCase> = {
  [NOFILTERS_SLUG]: nofiltersCase
};

export const projectCase = (slug: string, locale: 'uk' | 'ru'): CaseContent | undefined => PROJECT_CASES[slug]?.[locale];
