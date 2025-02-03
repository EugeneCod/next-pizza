import { getServerSession } from 'next-auth';

import { AUTH_OPTIONS } from '../constants/auth-options';

export async function getUserSession() {
  const session = await getServerSession(AUTH_OPTIONS);

  return session?.user ?? null;
}
