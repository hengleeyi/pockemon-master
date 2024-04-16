import { z } from "zod";

const responseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

const typeSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

export const typesResponseSchema = responseSchema.extend({
  results: z.array(typeSchema),
});
