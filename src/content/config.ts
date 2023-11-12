// Import utilities from `astro:content`
import {defineCollection, z} from "astro:content";
// Define a schema for each collection you'd like to validate.
const articleCollection = defineCollection({
  schema: ({image}) => z.object({
    title: z.string(),
    updated: z.date().optional(),
    summary: z.string(),
    draft: z.boolean().optional(),
    img: image().refine(() => true).optional(),
  })
});

export const collections = {
  articles: articleCollection
};
