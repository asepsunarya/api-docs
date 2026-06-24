import { NextResponse } from 'next/server';

function forwardedOrigin(request: Request) {
  const headers = request.headers;
  const forwardedHost = headers.get('x-forwarded-host') ?? headers.get('host');
  const forwardedProto = headers.get('x-forwarded-proto') ?? new URL(request.url).protocol.replace(':', '');

  if (!forwardedHost) return new URL(request.url).origin;

  const host = forwardedHost.split(',')[0]?.trim();
  const proto = forwardedProto.split(',')[0]?.trim() || 'https';

  return `${proto}://${host}`;
}

export function adminRedirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, forwardedOrigin(request)), 303);
}
