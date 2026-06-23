export const dynamic = 'force-dynamic';

import { requireAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/admin/data';
import { AdminShell, buttonClass, Card, Field, inputClass } from '../_components';

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl font-semibold">Settings</h1>
      <Card>
        <form action="/api/admin/settings" method="post" className="grid gap-5">
          <Field label="Title"><input className={inputClass} name="title" defaultValue={settings.title} required /></Field>
          <Field label="Description"><textarea className={inputClass} name="description" defaultValue={settings.description} rows={4} /></Field>
          <Field label="Logo URL"><input className={inputClass} name="logoUrl" defaultValue={settings.logoUrl} placeholder="https://..." /></Field>
          <Field label="Primary Color"><input className={inputClass} name="primaryColor" defaultValue={settings.primaryColor} placeholder="#0f172a" /></Field>
          <button className={buttonClass}>Simpan settings</button>
        </form>
      </Card>
    </AdminShell>
  );
}
