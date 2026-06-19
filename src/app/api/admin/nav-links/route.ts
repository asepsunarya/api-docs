import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { navLinkSchema } from '@/lib/admin/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const parsed = navLinkSchema.parse({ ...Object.fromEntries(form), isActive: form.get('isActive') === 'on' });
  const now = new Date();

  await (await adminCollections()).navLinks.insertOne({ siteKey, ...parsed, createdAt: now, updatedAt: now });

  return NextResponse.redirect(new URL('/admin/nav?created=1', request.url), 303);
}
