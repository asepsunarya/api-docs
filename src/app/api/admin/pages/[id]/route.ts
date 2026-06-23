import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { objectId, siteKey } from '@/lib/admin/data';
import { docPageSchema } from '@/lib/admin/validation';
import { NextResponse } from 'next/server';

export async function POST(request: Request, props: RouteContext<'/api/admin/pages/[id]'>) {
  await requireAdmin();
  const { id } = await props.params;
  const form = await request.formData();
  const intent = String(form.get('_intent') ?? 'update');
  const collections = await adminCollections();

  if (intent === 'delete') {
    await collections.pages.deleteOne({ _id: objectId(id), siteKey });
    return NextResponse.redirect(new URL('/admin/pages?deleted=1', request.url), 303);
  }

  const parsed = docPageSchema.parse(Object.fromEntries(form));
  await collections.pages.updateOne(
    { _id: objectId(id), siteKey },
    { $set: { ...parsed, updatedAt: new Date() } },
  );

  return NextResponse.redirect(new URL('/admin/pages?saved=1', request.url), 303);
}
