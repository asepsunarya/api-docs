import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { objectId, siteKey } from '@/lib/admin/data';
import { openApiSourceSchema } from '@/lib/admin/validation';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request, props: RouteContext<'/api/admin/openapi-sources/[id]'>) {
  await requireAdmin();
  const { id } = await props.params;
  const form = await request.formData();
  const intent = String(form.get('_intent') ?? 'update');
  const collections = await adminCollections();
  const now = new Date();

  if (intent === 'delete') {
    await collections.openapiSources.deleteOne({ _id: objectId(id), siteKey });
    return adminRedirect(request, '/admin/openapi?deleted=1');
  }

  const parsed = openApiSourceSchema.parse({
    ...Object.fromEntries(form),
    isActive: form.get('isActive') === 'on',
  });

  if (parsed.isActive) {
    await collections.openapiSources.updateMany({ siteKey }, { $set: { isActive: false, updatedAt: now } });
  }

  await collections.openapiSources.updateOne(
    { _id: objectId(id), siteKey },
    { $set: { ...parsed, updatedAt: now } },
  );

  return adminRedirect(request, '/admin/openapi?saved=1');
}
