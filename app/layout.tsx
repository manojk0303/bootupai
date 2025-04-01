import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script'
import './globals.css';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: 'Bootup AI',
  description:
    'Bootup AI helps users maximize referral earnings by simplifying link sharing and automating account creation. It ensures referral codes are used efficiently, turning missed opportunities into rewards.',
  icons: {
      icon: '/favicon.ico', // Ensure favicon.ico is in the `public/` folder
    },
  openGraph: {
    url: '/',
    title: 'Bootup AI',
    description:
      'Bootup AI helps users maximize referral earnings by simplifying link sharing and automating account creation. It ensures referral codes are used efficiently, turning missed opportunities into rewards.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bootup AI',
    description:
      'Bootup AI helps users maximize referral earnings by simplifying link sharing and automating account creation. It ensures referral codes are used efficiently, turning missed opportunities into rewards.'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en' suppressHydrationWarning>
        <head>
        <Script
          defer
          data-domain="bootupai.tech"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        </head>
        <body className={cn('relative', inter.className)}>
            <div className='w-full flex justify-end pt-4 pr-4'>
            </div>
            {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
