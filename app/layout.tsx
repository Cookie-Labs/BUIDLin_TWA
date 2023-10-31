import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono } from 'next/font/google';

import RecoilRootProvider from '@/providers/recoilRootProvider';
import NextThemeProvider from '@/providers/themeProvider';

const openSans = Open_Sans({
  // default font
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  // variable font
  subsets: ['latin'],
  display: 'swap',
  variable: '--roboto',
});

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

export const metadata: Metadata = {
  title: 'Next StartKit',
  description: 'This is the next start kit',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cls(openSans.className, robotoMono.variable)}>
      <body>
        <RecoilRootProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
