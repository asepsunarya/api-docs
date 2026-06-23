import { isAdminAuthenticated } from '@/lib/admin/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage(props: PageProps<'/admin/login'>) {
  if (await isAdminAuthenticated()) redirect('/admin');
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === 'invalid';

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="mb-2 text-sm text-cyan-200">API Docs Admin</p>
        <h1 className="text-3xl font-semibold">Masuk Admin</h1>
        <p className="mt-2 text-sm text-zinc-300">Gunakan ADMIN_SECRET yang disimpan di environment.</p>
        {hasError ? <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-200">Secret salah.</p> : null}
        <form action="/api/admin/auth/login" method="post" className="mt-6 space-y-4">
          <label className="block text-sm">
            Secret
            <input
              name="secret"
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
            />
          </label>
          <button className="w-full rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-zinc-950 hover:bg-cyan-200">
            Masuk
          </button>
        </form>
        <Link href="/docs" className="mt-5 block text-center text-sm text-zinc-400 hover:text-white">
          Kembali ke docs
        </Link>
      </div>
    </main>
  );
}
