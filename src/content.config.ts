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
    city: z.enum(['Київ', 'Львів', 'Одеса']),
    category: z.enum(projectCategoryIds),
    constructionType: z.string().min(3),
    objectType: z.string().min(3),
    shortDescription: z.string().min(40),
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
    relatedProjectSlugs: z.array(z.string()).default([])
  })
});

export const collections = { projects };
