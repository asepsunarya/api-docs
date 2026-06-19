export const dynamic = 'force-dynamic';

import { requireAdmin } from '@/lib/admin/auth';
import { getAdminOverview } from '@/lib/admin/data';
import { dateString } from '@/lib/admin/ui';
import Link from 'next/link';
import { AdminShell, Card } from './_components';

export default async function AdminPage() {
  await requireAdmin();
  const { settings, openapiSources, pages, navLinks } = await getAdminOverview();
  const active = openapiSources.find((item) => item.isActive);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm text-cyan-200">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">{settings.title}</h1>
        <p className="mt-2 text-zinc-400">{settings.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-zinc-400">OpenAPI Sources</p><p className="mt-2 text-3xl font-semibold">{openapiSources.length}</p></Card>
        <Card><p className="text-sm text-zinc-400">Custom Pages</p><p className="mt-2 text-3xl font-semibold">{pages.length}</p></Card>
        <Card><p className="text-sm text-zinc-400">Nav Links</p><p className="mt-2 text-3xl font-semibold">{navLinks.length}</p></Card>
        <Card><p className="text-sm text-zinc-400">Active Schema</p><p className="mt-2 truncate text-lg font-semibold">{active?.name ?? '-'}</p></Card>
      </div>
      <Card className="mt-6">
        <h2 className="text-xl font-semibold">Active OpenAPI</h2>
        <p className="mt-2 text-sm text-zinc-400">{active ? `${active.sourceUrl} • synced ${dateString(active.lastSyncedAt)}` : 'Belum ada source aktif.'}</p>
        <div className="mt-4 flex gap-3">
          <Link href="/admin/openapi" className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950">Kelola OpenAPI</Link>
          <Link href="/docs" className="rounded-xl border border-white/10 px-4 py-2 text-sm">Lihat Docs</Link>
        </div>
      </Card>
    </AdminShell>
  );
}
