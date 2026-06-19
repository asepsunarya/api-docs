import { createAdminToken, isValidAdminSecret, setAdminSession } from '@/lib/admin/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const secret = String(form.get('secret') ?? '');

  if (!isValidAdminSecret(secret)) {
    return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url), 303);
  }

  await setAdminSession(await createAdminToken());
  return NextResponse.redirect(new URL('/admin', request.url), 303);
}
