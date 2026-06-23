export const dynamic = 'force-dynamic';

import { requireAdmin } from '@/lib/admin/auth';
import { adminCollections } from '@/lib/admin/collections';
import { siteKey } from '@/lib/admin/data';
import { idString } from '@/lib/admin/ui';
import { AdminShell, buttonClass, Card, dangerButtonClass, Field, inputClass } from '../_components';

export default async function NavAdminPage() {
  await requireAdmin();
  const links = await (await adminCollections()).navLinks.find({ siteKey }).sort({ sortOrder: 1, label: 1 }).toArray();

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl font-semibold">Navigation Links</h1>
      <Card className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Tambah link</h2>
        <form action="/api/admin/nav-links" method="post" className="grid gap-4 md:grid-cols-[1fr_2fr_120px_auto] md:items-end">
          <Field label="Label"><input className={inputClass} name="label" required /></Field>
          <Field label="URL"><input className={inputClass} name="url" placeholder="/docs/openapi" required /></Field>
          <Field label="Sort"><input className={inputClass} name="sortOrder" type="number" defaultValue={0} /></Field>
          <label className="flex items-center gap-2 text-sm text-zinc-300 md:pb-3"><input type="checkbox" name="isActive" defaultChecked /> Active</label>
          <button className={`${buttonClass} md:col-span-4`}>Tambah link</button>
        </form>
      </Card>
      <div className="grid gap-4">
        {links.map((link) => {
          const id = idString(link._id);
          return (
            <Card key={id}>
              <form action={`/api/admin/nav-links/${id}`} method="post" className="grid gap-4 md:grid-cols-[1fr_2fr_120px_auto_auto] md:items-end">
                <Field label="Label"><input className={inputClass} name="label" defaultValue={link.label} required /></Field>
                <Field label="URL"><input className={inputClass} name="url" defaultValue={link.url} required /></Field>
                <Field label="Sort"><input className={inputClass} name="sortOrder" type="number" defaultValue={link.sortOrder} /></Field>
                <label className="flex items-center gap-2 text-sm text-zinc-300 md:pb-3"><input type="checkbox" name="isActive" defaultChecked={link.isActive} /> Active</label>
                <div className="flex gap-2">
                  <button className={buttonClass}>Save</button>
                  <button name="_intent" value="delete" className={dangerButtonClass}>Delete</button>
                </div>
              </form>
            </Card>
          );
        })}
      </div>
    </AdminShell>
  );
}
