import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono } from 'next/font/google';

import RecoilRootProvider from '@/providers/recoilRootProvider';
import ThemeProvider from '@/providers/themeProvider';
// import CommonLayout from '@/components/common-layout';

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
  title: 'BUIDLin',
  description: 'Event Platform for WEB3',
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
