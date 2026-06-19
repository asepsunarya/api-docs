import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-fd-background px-6 text-center text-fd-foreground">
      <p className="rounded-full border border-fd-border px-4 py-1 text-sm text-fd-muted-foreground">
        Next.js + Fumadocs + Scalar/OpenAPI
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
        Dokumentasi API yang rapi, cepat, dan interaktif.
      </h1>
      <p className="max-w-xl text-fd-muted-foreground">
        Starter ini sudah siap untuk MDX docs, search, dan halaman OpenAPI playground.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/docs"
          className="rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground"
        >
          Buka Docs
        </Link>
        <Link
          href="/docs/openapi"
          className="rounded-full border border-fd-border px-5 py-3 text-sm font-medium"
        >
          Lihat OpenAPI
        </Link>
      </div>
    </main>
  );
}
