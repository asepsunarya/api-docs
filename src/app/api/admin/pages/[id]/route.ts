import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { objectId, siteKey } from '@/lib/admin/data';
import { docPageSchema } from '@/lib/admin/validation';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request, props: RouteContext<'/api/admin/pages/[id]'>) {
  await requireAdmin();
  const { id } = await props.params;
  const form = await request.formData();
  const intent = String(form.get('_intent') ?? 'update');
  const collections = await adminCollections();

  if (intent === 'delete') {
    await collections.pages.deleteOne({ _id: objectId(id), siteKey });
    return adminRedirect(request, '/admin/pages?deleted=1');
  }

  const parsed = docPageSchema.parse(Object.fromEntries(form));
  await collections.pages.updateOne(
    { _id: objectId(id), siteKey },
    { $set: { ...parsed, updatedAt: new Date() } },
  );

  return adminRedirect(request, '/admin/pages?saved=1');
}
