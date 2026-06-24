import { createAdminToken, isValidAdminSecret, setAdminSession } from '@/lib/admin/auth';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request) {
  const form = await request.formData();
  const secret = String(form.get('secret') ?? '');

  if (!isValidAdminSecret(secret)) {
    return adminRedirect(request, '/admin/login?error=invalid');
  }

  await setAdminSession(await createAdminToken());
  return adminRedirect(request, '/admin');
}
