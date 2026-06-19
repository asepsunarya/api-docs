import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { settingsSchema } from '@/lib/admin/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const parsed = settingsSchema.parse(Object.fromEntries(form));

  await (await adminCollections()).settings.updateOne(
    { siteKey },
    {
      $set: {
        ...parsed,
        logoUrl: parsed.logoUrl || '',
        primaryColor: parsed.primaryColor || '#0f172a',
        updatedAt: new Date(),
      },
      $setOnInsert: { siteKey },
    },
    { upsert: true },
  );

  return NextResponse.redirect(new URL('/admin/settings?saved=1', request.url), 303);
}
