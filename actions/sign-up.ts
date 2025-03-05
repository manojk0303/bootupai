'use server';

import { hashPassword } from '@/lib/password'; // new import

// actions/sign-up.ts

import * as z from 'zod';

import { db } from '@/lib/db';
import { SignUpSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await hashPassword(password);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already exist.' };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  if (!newUser || !newUser.email) {
    return { error: 'Oops! Something went wrong.' };
  }

  const verificationToken = await generateVerificationToken(newUser.id);

  await sendVerificationEmail(
    newUser.name,
    newUser.email,
    verificationToken.token
  );

  return {
    success: 'Sign up successful. Check your email to verify.(It might take a few minutes to arrive  check spam folder if not found)'
  };
}
