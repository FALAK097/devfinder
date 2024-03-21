import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Head from 'next/head';

import './globals.css';
import { Providers } from './provider';
import { Header } from './header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dev Finder',
  description:
    'An application to help pair programming with other developers around the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <NextTopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
