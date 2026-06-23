import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { objectId, siteKey } from '@/lib/admin/data';
import { navLinkSchema } from '@/lib/admin/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request, props: RouteContext<'/api/admin/nav-links/[id]'>) {
  await requireAdmin();
  const { id } = await props.params;
  const form = await request.formData();
  const intent = String(form.get('_intent') ?? 'update');
  const collections = await adminCollections();

  if (intent === 'delete') {
    await collections.navLinks.deleteOne({ _id: objectId(id), siteKey });
    return NextResponse.redirect(new URL('/admin/nav?deleted=1', request.url), 303);
  }

  const parsed = navLinkSchema.parse({ ...Object.fromEntries(form), isActive: form.get('isActive') === 'on' });
  await collections.navLinks.updateOne(
    { _id: objectId(id), siteKey },
    { $set: { ...parsed, updatedAt: new Date() } },
  );

  return NextResponse.redirect(new URL('/admin/nav?saved=1', request.url), 303);
}
