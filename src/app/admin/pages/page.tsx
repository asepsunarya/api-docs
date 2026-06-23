export const dynamic = 'force-dynamic';

import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { idString } from '@/lib/admin/ui';
import { AdminShell, buttonClass, Card, dangerButtonClass, Field, inputClass } from '../_components';

export default async function PagesAdminPage() {
  await requireAdmin();
  const pages = await (await adminCollections()).pages.find({ siteKey }).sort({ sortOrder: 1, title: 1 }).toArray();

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl font-semibold">Custom Pages</h1>
      <Card className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Tambah page</h2>
        <form action="/api/admin/pages" method="post" className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Title"><input className={inputClass} name="title" required /></Field>
            <Field label="Slug"><input className={inputClass} name="slug" placeholder="getting-started" required /></Field>
            <Field label="Sort"><input className={inputClass} name="sortOrder" type="number" defaultValue={0} /></Field>
          </div>
          <Field label="Status"><select className={inputClass} name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></Field>
          <Field label="Content"><textarea className={`${inputClass} font-mono`} name="content" rows={8} placeholder="Markdown content..." /></Field>
          <button className={buttonClass}>Tambah page</button>
        </form>
      </Card>

      <div className="grid gap-4">
        {pages.map((page) => {
          const id = idString(page._id);
          return (
            <Card key={id}>
              <form action={`/api/admin/pages/${id}`} method="post" className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold">{page.title} <span className="text-sm text-zinc-400">/{page.slug} • {page.status}</span></p>
                  <button name="_intent" value="delete" className={dangerButtonClass}>Delete</button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Title"><input className={inputClass} name="title" defaultValue={page.title} required /></Field>
                  <Field label="Slug"><input className={inputClass} name="slug" defaultValue={page.slug} required /></Field>
                  <Field label="Sort"><input className={inputClass} name="sortOrder" type="number" defaultValue={page.sortOrder} /></Field>
                </div>
                <Field label="Status"><select className={inputClass} name="status" defaultValue={page.status}><option value="draft">Draft</option><option value="published">Published</option></select></Field>
                <Field label="Content"><textarea className={`${inputClass} font-mono`} name="content" rows={8} defaultValue={page.content} /></Field>
                <button className={buttonClass}>Simpan page</button>
              </form>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}
