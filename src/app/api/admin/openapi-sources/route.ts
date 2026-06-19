import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { openApiSourceSchema } from '@/lib/admin/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const parsed = openApiSourceSchema.parse({
    ...Object.fromEntries(form),
    isActive: form.get('isActive') === 'on',
  });
  const collections = await adminCollections();
  const now = new Date();

  if (parsed.isActive) {
    await collections.openapiSources.updateMany({ siteKey }, { $set: { isActive: false, updatedAt: now } });
  }

  await collections.openapiSources.insertOne({
    siteKey,
    ...parsed,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.redirect(new URL('/admin/openapi?created=1', request.url), 303);
}
