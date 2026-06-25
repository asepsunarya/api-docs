import { normalizeOpenApiDocument } from '../openapi-normalize';
import { validateOpenApiDocument } from './validation';

export function serializeOpenApiSchemaForMongo(schema: unknown) {
  return JSON.stringify(schema);
}

export function parseStoredOpenApiSchema(value: unknown) {
  if (!value) return undefined;

  const parsed = typeof value === 'string' ? JSON.parse(value) : value;
  return normalizeOpenApiDocument(validateOpenApiDocument(parsed));
}
