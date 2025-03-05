'use server';

import { hashPassword, comparePassword } from '@/lib/password'; // new import

import * as z from 'zod';

import { db } from '@/lib/db';
import { update } from '@/auth';
import { getUserById } from '@/data/user';
import { UpdatePasswordSchema } from '@/schemas';
import { currentUser } from '@/lib/authentication';

export async function updatePassword(
  values: z.infer<typeof UpdatePasswordSchema>
) {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  if (user.isOAuth) {
    return { error: 'Unauthorized.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || !dbUser.password) {
    return { error: 'Unauthorized.' };
  }

  const passwordsMatch = await comparePassword(values.currentPassword, dbUser.password);

  if (!passwordsMatch) {
    return { error: 'Incorrect password.' };
  }

  const hashedPassword = await hashPassword(values.newPassword);

  const updatedUser = await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    }
  });

  return { success: 'Password updated.' };
}
