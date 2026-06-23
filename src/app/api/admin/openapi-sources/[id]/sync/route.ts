import { requireAdmin } from '@/lib/admin/auth';
import { syncOpenApiSource } from '@/lib/admin/openapi-sync';
import { NextResponse } from 'next/server';

export async function POST(request: Request, props: RouteContext<'/api/admin/openapi-sources/[id]/sync'>) {
  await requireAdmin();
  const { id } = await props.params;

  try {
    await syncOpenApiSource(id);
    return NextResponse.redirect(new URL('/admin/openapi?synced=1', request.url), 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    return NextResponse.redirect(new URL(`/admin/openapi?error=${encodeURIComponent(message)}`, request.url), 303);
  }
}
