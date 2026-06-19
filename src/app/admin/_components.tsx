import Link from 'next/link';
import type { ReactNode } from 'react';

export function AdminShell({ children }: { children: ReactNode }) {
  const links = [
    ['Dashboard', '/admin'],
    ['Settings', '/admin/settings'],
    ['OpenAPI', '/admin/openapi'],
    ['Pages', '/admin/pages'],
    ['Nav', '/admin/nav'],
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-6 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="px-3 py-2 text-lg font-semibold">API Docs</p>
            <nav className="mt-4 grid gap-1">
              {links.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
            <form action="/api/admin/auth/logout" method="post" className="mt-4">
              <button className="w-full rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white">
                Logout
              </button>
            </form>
          </div>
        </aside>
        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </main>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 ${className}`}>{children}</div>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm text-zinc-300">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass = 'w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300';
export const buttonClass = 'rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-cyan-200';
export const secondaryButtonClass = 'rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10';
export const dangerButtonClass = 'rounded-xl border border-red-400/40 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10';
