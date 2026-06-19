import { z } from 'zod';

export const settingsSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(300).default(''),
  logoUrl: z.string().url().or(z.literal('')).optional(),
  primaryColor: z.string().max(40).optional(),
});

export const openApiSourceSchema = z.object({
  name: z.string().min(1).max(120),
  sourceUrl: z.string().url(),
  isActive: z.coerce.boolean().default(false),
});

export const docPageSchema = z.object({
  title: z.string().min(1).max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9][a-z0-9-\/]*$/),
  content: z.string().default(''),
  status: z.enum(['draft', 'published']).default('draft'),
  sortOrder: z.coerce.number().int().default(0),
});

export const navLinkSchema = z.object({
  label: z.string().min(1).max(80),
  url: z.string().min(1).max(300),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(true),
});

export function validateOpenApiDocument(value: unknown) {
  const result = z.object({
    openapi: z.string().min(1),
    info: z.object({ title: z.string().optional(), version: z.string().optional() }).passthrough(),
    paths: z.record(z.string(), z.unknown()),
  }).passthrough().safeParse(value);

  if (!result.success) throw new Error('Fetched document is not a valid OpenAPI JSON document');
  return result.data;
}
