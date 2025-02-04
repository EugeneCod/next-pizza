import { getServerSession } from 'next-auth';

import { AUTH_OPTIONS } from '../constants/auth-options';

// Нельзя реэкспортировать, так как используется в серверном экшене
export async function getUserSession() {
  const session = await getServerSession(AUTH_OPTIONS);

  return session?.user ?? null;
}
