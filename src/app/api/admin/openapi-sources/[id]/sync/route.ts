import { requireAdmin } from '@/lib/admin/auth';
import { syncOpenApiSource } from '@/lib/admin/openapi-sync';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request, props: RouteContext<'/api/admin/openapi-sources/[id]/sync'>) {
  await requireAdmin();
  const { id } = await props.params;

  try {
    await syncOpenApiSource(id);
    return adminRedirect(request, '/admin/openapi?synced=1');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    return adminRedirect(request, `/admin/openapi?error=${encodeURIComponent(message)}`);
  }
}
