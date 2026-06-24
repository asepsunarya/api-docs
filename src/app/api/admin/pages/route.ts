import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { docPageSchema } from '@/lib/admin/validation';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const parsed = docPageSchema.parse(Object.fromEntries(form));
  const now = new Date();

  await (await adminCollections()).pages.insertOne({
    siteKey,
    ...parsed,
    createdAt: now,
    updatedAt: now,
  });

  return adminRedirect(request, '/admin/pages?created=1');
}
