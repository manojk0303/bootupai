import NextAuth from 'next-auth';
import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_SIGNIN_REDIRECT
} from '@/routes';
import authConfig from '@/auth.config';
import { verifyApiKey, getApiKeyType } from '@/lib/api-auth';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith('/api/');
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix) || nextUrl.pathname.startsWith('/api/create-account');

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // Add referral route check directly in middleware
  const isReferralRoute = nextUrl.pathname.startsWith('/r/');
  const isAboutRoute = nextUrl.pathname.startsWith('/about') || nextUrl.pathname.startsWith('/pricing') || nextUrl.pathname.startsWith('/contact');

    // Handle API routes with API key verification
    if (isApiRoute && !isApiAuthRoute) {
      // Get API key from request header
      const apiKey = req.headers.get('x-api-key');
      
      // If API key exists and is valid, allow the request
      if (apiKey && verifyApiKey(apiKey)) {
        // You could also attach the key type to the request for logging/permissions
        // req.apiKeyType = getApiKeyType(apiKey);
        return null; // Allow the request to proceed
      }
      
      // If no valid API key, check if user is signed in
      if (!isSignedIn) {
        // For API routes, return a JSON response instead of redirecting
        return new Response(
          JSON.stringify({ error: "Unauthorized", message: "Valid API key or authentication required" }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // If user is signed in, allow the request to proceed
      return null;
    }

  if (isApiAuthRoute || isAboutRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isSignedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Add referral route check to allow public access
  if (isReferralRoute) {
    return null;
  }

  if (!isSignedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};