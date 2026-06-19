import { ObjectId } from 'mongodb';
import { adminCollections, ensureAdminIndexes } from './collections';
import type { ApiDocsSettings } from './types';

export const siteKey = 'default';

export function objectId(id: string) {
  if (!ObjectId.isValid(id)) throw new Error('Invalid id');
  return new ObjectId(id);
}

export async function getSettings() {
  await ensureAdminIndexes();
  const collections = await adminCollections();
  const current = await collections.settings.findOne({ siteKey });
  if (current) return current;

  const fallback: ApiDocsSettings = {
    siteKey,
    title: 'API Docs',
    description: 'Customizable API documentation',
    logoUrl: '',
    primaryColor: '#0f172a',
    updatedAt: new Date(),
  };

  await collections.settings.updateOne({ siteKey }, { $setOnInsert: fallback }, { upsert: true });
  return (await collections.settings.findOne({ siteKey })) ?? fallback;
}

export async function getAdminOverview() {
  await ensureAdminIndexes();
  const collections = await adminCollections();
  const [settings, openapiSources, pages, navLinks] = await Promise.all([
    getSettings(),
    collections.openapiSources.find({ siteKey }).sort({ updatedAt: -1 }).toArray(),
    collections.pages.find({ siteKey }).sort({ sortOrder: 1, title: 1 }).toArray(),
    collections.navLinks.find({ siteKey }).sort({ sortOrder: 1, label: 1 }).toArray(),
  ]);

  return { settings, openapiSources, pages, navLinks };
}
