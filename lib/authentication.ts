import { auth } from '@/auth';
import { db } from '@/lib/db'; // Adjust the import path as needed

export async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Fetch the user from the database using the session's user id
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });
  return user;
}
