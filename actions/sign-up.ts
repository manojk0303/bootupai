'use server';

import { hashPassword } from '@/lib/password'; // new import
import { AuthError } from 'next-auth';

// actions/sign-up.ts
import { signIn as authSignIn } from '@/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import * as z from 'zod';

import { db } from '@/lib/db';
import { SignUpSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
// import { sendVerificationEmail } from '@/lib/mail';
// import { generateVerificationToken } from '@/lib/tokens';

export async function signUp(values: z.infer<typeof SignUpSchema>,  callbackUrl?: string | null) {
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
      password: hashedPassword,
      emailVerified: new Date()
    }
  });

  if (!newUser || !newUser.email) {
    return { error: 'Oops! Something went wrong.' };
  }

  // const verificationToken = await generateVerificationToken(newUser.id);

  // await sendVerificationEmail(
  //   newUser.name,
  //   newUser.email,
  //   verificationToken.token
  // );

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_SIGNIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Incorrect email or password.' };
        default:
          return { error: 'Oops! Something went wrong.' };
      }
    }

    throw error;
  }
}
