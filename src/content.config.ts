// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional().transform((val) => {
      if (typeof val === 'string') {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
      return val;
    })
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    layout: z.enum(['default', 'home']).optional().default('default')
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog, pages };