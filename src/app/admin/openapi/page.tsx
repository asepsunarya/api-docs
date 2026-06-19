export const dynamic = 'force-dynamic';

import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { dateString, idString } from '@/lib/admin/ui';
import { AdminShell, buttonClass, Card, dangerButtonClass, Field, inputClass, secondaryButtonClass } from '../_components';

export default async function OpenApiAdminPage(props: PageProps<'/admin/openapi'>) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const sources = await (await adminCollections()).openapiSources.find({ siteKey }).sort({ updatedAt: -1 }).toArray();
  const defaultUrl = process.env.DEFAULT_OPENAPI_SOURCE_URL ?? 'https://staging-api.socialchat.id/partner/explorer-json';

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">OpenAPI Sources</h1>
        {searchParams.error ? <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{String(searchParams.error)}</p> : null}
        {searchParams.synced ? <p className="mt-3 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">Schema berhasil disync ke MongoDB.</p> : null}
      </div>

      <Card className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Tambah source</h2>
        <form action="/api/admin/openapi-sources" method="post" className="grid gap-4 md:grid-cols-[1fr_2fr_auto] md:items-end">
          <Field label="Name"><input className={inputClass} name="name" defaultValue="Socialchat Staging" required /></Field>
          <Field label="Source URL"><input className={inputClass} name="sourceUrl" defaultValue={defaultUrl} required /></Field>
          <label className="flex items-center gap-2 text-sm text-zinc-300 md:pb-3"><input type="checkbox" name="isActive" defaultChecked /> Active</label>
          <button className={`${buttonClass} md:col-span-3`}>Tambah source</button>
        </form>
      </Card>

      <div className="grid gap-4">
        {sources.map((source) => {
          const id = idString(source._id);
          const schema = source.schemaJson as { paths?: Record<string, unknown>; info?: { title?: string; version?: string } } | undefined;
          return (
            <Card key={id}>
              <form action={`/api/admin/openapi-sources/${id}`} method="post" className="grid gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{source.name} {source.isActive ? <span className="text-sm text-cyan-200">• active</span> : null}</p>
                    <p className="text-sm text-zinc-400">Last sync: {dateString(source.lastSyncedAt)} • Paths: {schema?.paths ? Object.keys(schema.paths).length : '-'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button formAction={`/api/admin/openapi-sources/${id}/sync`} className={secondaryButtonClass}>Sync</button>
                    <button name="_intent" value="delete" className={dangerButtonClass}>Delete</button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto] md:items-end">
                  <Field label="Name"><input className={inputClass} name="name" defaultValue={source.name} required /></Field>
                  <Field label="Source URL"><input className={inputClass} name="sourceUrl" defaultValue={source.sourceUrl} required /></Field>
                  <label className="flex items-center gap-2 text-sm text-zinc-300 md:pb-3"><input type="checkbox" name="isActive" defaultChecked={source.isActive} /> Active</label>
                </div>
                <button className={buttonClass}>Simpan</button>
              </form>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}
