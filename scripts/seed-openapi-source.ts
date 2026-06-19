import { adminCollections, ensureAdminIndexes } from '../src/lib/admin/collections';
import { siteKey } from '../src/lib/admin/data';
import { fetchOpenApiSchema } from '../src/lib/admin/openapi-sync';

async function main() {
  const sourceUrl = process.env.DEFAULT_OPENAPI_SOURCE_URL ?? process.argv[2];
  if (!sourceUrl) throw new Error('Pass DEFAULT_OPENAPI_SOURCE_URL or URL argument');

  await ensureAdminIndexes();
  const collections = await adminCollections();
  const now = new Date();
  const schemaJson = await fetchOpenApiSchema(sourceUrl);

  await collections.openapiSources.updateMany({ siteKey }, { $set: { isActive: false, updatedAt: now } });
  await collections.openapiSources.updateOne(
    { siteKey, sourceUrl },
    {
      $set: {
        siteKey,
        name: 'Socialchat Staging',
        sourceUrl,
        schemaJson,
        isActive: true,
        lastSyncedAt: now,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  console.log(`Seeded active OpenAPI source (${Object.keys(schemaJson.paths).length} paths): ${sourceUrl}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
