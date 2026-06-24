import { clearAdminSession } from '@/lib/admin/auth';
import { adminRedirect } from '@/lib/admin/redirect';

export async function POST(request: Request) {
  await clearAdminSession();
  return adminRedirect(request, '/admin/login');
}
