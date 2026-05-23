import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),

  short_description: z.string().min(10),

  full_description: z.string().min(20),

  image_url: z.string(),

  seo_title: z.string(),

  seo_description: z.string(),

  featured: z.boolean(),
});