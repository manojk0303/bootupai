import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Fetch the user from the database using the session's user id
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  // Add isOAuth check
  return user ? {
    ...user,
    isOAuth: session.user.email !== user.email // This is a simple example, adjust as needed
  } : null;
}