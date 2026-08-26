import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectCategoryIds } from './data/project-taxonomy';

const projectImage = z.object({
  src: z.string().regex(/^\/images\/projects\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(20),
  caption: z.string().optional()
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    locale: z.literal('uk'),
    status: z.enum(['draft', 'published']).default('draft'),
    featured: z.boolean().default(false),
    sortOrder: z.number().int().nonnegative(),
    seo: z.object({
      title: z.string().min(30).max(70),
      description: z.string().min(80).max(170)
    }),
    h1: z.string().min(20),
    cardTitle: z.string().min(10),
    // RU display overlay for carousel/card text only — the project entity itself
    // stays uk-only (see `locale` above); no separate ru entity, no slug/URL change.
    cardTitleRu: z.string().min(10).optional(),
    city: z.enum(['Київ', 'Львів', 'Одеса']),
    cityRu: z.enum(['Киев', 'Одесса', 'Львов']).optional(),
    category: z.enum(projectCategoryIds),
    constructionType: z.string().min(3),
    constructionTypeRu: z.string().min(3).optional(),
    objectType: z.string().min(3),
    shortDescription: z.string().min(40),
    shortDescriptionRu: z.string().min(40).optional(),
    clientTask: z.object({ title: z.string(), text: z.string().min(60) }),
    solution: z.object({ title: z.string(), text: z.string().min(60) }),
    characteristics: z.array(z.object({ label: z.string(), value: z.string() })).min(3),
    materials: z.array(z.string().min(3)).min(2),
    installation: z.object({ title: z.string(), text: z.string().min(40) }),
    result: z.object({ title: z.string(), text: z.string().min(40) }),
    cover: projectImage,
    gallery: z.array(projectImage).min(1),
    faq: z.array(z.object({ question: z.string(), answer: z.string().min(30) })).min(3),
    serviceLink: z.object({ label: z.string(), href: z.string().startsWith('/') }),
    relatedProjectSlugs: z.array(z.string()).default([]),
    // Optional real project facts. Only rendered when present — never invented,
    // never defaulted to placeholder text like "не вказано".
    year: z.number().int().positive().optional(),
    district: z.string().min(1).optional(),
    residentialComplex: z.string().min(1).optional(),
    dimensions: z.string().min(1).optional(),
    area: z.string().min(1).optional(),
    glassThickness: z.string().min(1).optional(),
    glassType: z.string().min(1).optional(),
    profile: z.string().min(1).optional(),
    profileColor: z.string().min(1).optional(),
    openingType: z.string().min(1).optional(),
    panelsCount: z.number().int().positive().optional(),
    productionTime: z.string().min(1).optional(),
    installationTime: z.string().min(1).optional(),
    hardware: z.string().min(1).optional(),
    priceFromPerM2: z.number().positive().optional(),
    priceNote: z.string().min(1).optional()
  })
});

export const collections = { projects };
