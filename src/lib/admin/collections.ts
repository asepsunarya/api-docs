import { getMongoDb } from './mongodb';
import type { ApiDocsSettings, DocPageRecord, NavLinkRecord, OpenApiSource } from './types';

export async function adminCollections() {
  const db = await getMongoDb();

  return {
    settings: db.collection<ApiDocsSettings>('api_docs_settings'),
    openapiSources: db.collection<OpenApiSource>('api_docs_openapi_sources'),
    pages: db.collection<DocPageRecord>('api_docs_pages'),
    navLinks: db.collection<NavLinkRecord>('api_docs_nav_links'),
  };
}

export async function ensureAdminIndexes() {
  const collections = await adminCollections();

  await Promise.all([
    collections.settings.createIndex({ siteKey: 1 }, { unique: true }),
    collections.openapiSources.createIndex({ siteKey: 1, isActive: 1 }),
    collections.pages.createIndex({ siteKey: 1, slug: 1 }, { unique: true }),
    collections.pages.createIndex({ siteKey: 1, status: 1, sortOrder: 1 }),
    collections.navLinks.createIndex({ siteKey: 1, sortOrder: 1 }),
  ]);
}
