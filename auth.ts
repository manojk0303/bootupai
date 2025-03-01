import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from '@/data/account';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Skip email verification check for OAuth
      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // Prevent unverified email sign in
      if (!existingUser?.emailVerified) {
        return false;
      }


      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.tempEmail = token.tempEmail as string | null;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.tempEmail = existingUser.tempEmail;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
});
