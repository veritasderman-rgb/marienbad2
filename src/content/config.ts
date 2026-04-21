import { defineCollection, z } from 'astro:content'

const localeEnum = z.enum(['de', 'en', 'cs', 'ru'])

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    locale: localeEnum,
    status: z.enum(['draft', 'published']).default('draft'),
    coverImage: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    date: z.string().optional(),
    readingTime: z.number().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
})

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    locale: localeEnum,
    status: z.enum(['draft', 'published']).default('draft'),
    personName: z.string().optional(),
    location: z.string().optional(),
    visitLabel: z.string().optional(),
    quote: z.string().optional(),
    portrait: z.string().optional(),
  }),
})

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    locale: localeEnum,
    section: z.string().optional(),
    featuredImage: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    excerpt: z.string().optional(),
  }),
})

export const collections = { articles, stories, pages }
