'use server';

import { hashPassword } from '@/lib/password'; // new import


// actions/reset-password.ts

import * as z from 'zod';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { ResetPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';

export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null
) {
  if (!token) {
    return { error: 'Missing token.' };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist.' };
  }

  const hashedPassword = await hashPassword(password);

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return { success: 'Password successfully reset.' };
}
