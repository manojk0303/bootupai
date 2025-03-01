'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import {
  generateVerificationToken
} from '@/lib/tokens';
import { db } from '@/lib/db';
import { SignInSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { signIn as authSignIn } from '@/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import {  sendVerificationEmail } from '@/lib/mail';

export async function signIn(
  values: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null
) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist.' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.id);

    await sendVerificationEmail(
      existingUser.name,
      existingUser.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent.' };
  }


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
