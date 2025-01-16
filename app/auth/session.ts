import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  (await cookies()).set('session', userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}