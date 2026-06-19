import { adminCollections } from './collections';
import { objectId, siteKey } from './data';
import { validateOpenApiDocument } from './validation';

export async function fetchOpenApiSchema(url: string) {
  const response = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'api-docs-admin/1.0' },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`OpenAPI fetch failed: ${response.status} ${response.statusText}`);

  const json = await response.json();
  return validateOpenApiDocument(json);
}

export async function syncOpenApiSource(id: string) {
  const collections = await adminCollections();
  const source = await collections.openapiSources.findOne({ _id: objectId(id), siteKey });
  if (!source) throw new Error('OpenAPI source not found');

  const schemaJson = await fetchOpenApiSchema(source.sourceUrl);
  const now = new Date();

  await collections.openapiSources.updateOne(
    { _id: source._id },
    {
      $set: {
        schemaJson,
        lastSyncedAt: now,
        updatedAt: now,
      },
    },
  );

  return schemaJson;
}
