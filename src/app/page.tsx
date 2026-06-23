import Link from 'next/link';

const apiShortcuts = [
  {
    title: 'Partner API',
    description: 'Informasi partner, OAuth, Zapier, dan konfigurasi callback.',
    href: '/docs/openapi/partner-api',
  },
  {
    title: 'Channel API',
    description: 'Kelola channel yang terhubung ke Socialchat.',
    href: '/docs/openapi/channel-api',
  },
  {
    title: 'Conversation API',
    description: 'Akses daftar percakapan, detail percakapan, dan assignment.',
    href: '/docs/openapi/conversation-controller',
  },
  {
    title: 'Message API',
    description: 'Kirim pesan dan gunakan template WhatsApp.',
    href: '/docs/openapi/message-api',
  },
  {
    title: 'Webhook API',
    description: 'Atur webhook untuk menerima event dari Socialchat.',
    href: '/docs/openapi/webhook-api',
  },
  {
    title: 'WhatsApp Official',
    description: 'Koneksi akun, template message, dan upload media.',
    href: '/docs/openapi/channel-whatsapp-official-api',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-fd-background text-fd-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-fd-border px-4 py-1 text-sm text-fd-muted-foreground">
            Socialchat Partner API
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Dokumentasi API untuk integrasi Socialchat.
          </h1>
          <p className="mt-5 text-lg leading-8 text-fd-muted-foreground">
            Mulai dari panduan autentikasi, lalu buka referensi endpoint sesuai kebutuhan integrasi kamu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground"
            >
              Mulai dari Getting Started
            </Link>
            <Link
              href="/docs/openapi"
              className="rounded-full border border-fd-border px-5 py-3 text-sm font-medium"
            >
              Buka OpenAPI Reference
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Shortcut API</h2>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                Pilih kategori endpoint yang paling sering dipakai.
              </p>
            </div>
            <Link href="/docs/authentication" className="text-sm font-medium text-fd-primary">
              Authentication →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apiShortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-fd-border bg-fd-card p-5 text-left transition-colors hover:bg-fd-accent"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
