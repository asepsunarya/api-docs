import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { adminCollections } from '../src/lib/admin/collections';
import { siteKey } from '../src/lib/admin/data';
import { validateOpenApiDocument } from '../src/lib/admin/validation';

async function main() {
  const collections = await adminCollections();
  const source = await collections.openapiSources.findOne({ siteKey, isActive: true });

  if (!source) throw new Error('No active OpenAPI source found in MongoDB');
  if (!source.schemaJson) throw new Error(`Active source "${source.name}" has no synced schemaJson yet`);

  const schema = validateOpenApiDocument(source.schemaJson);
  const output = resolve(process.cwd(), 'openapi.json');
  await writeFile(output, `${JSON.stringify(schema, null, 2)}\n`, 'utf8');

  console.log(`Exported ${Object.keys(schema.paths).length} paths from "${source.name}" to ${output}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
