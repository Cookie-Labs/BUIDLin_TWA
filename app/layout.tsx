import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Starter Kit",
  description: "next starter kit",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <h1>
          <Image
            src="/next.svg"
            alt="test image"
            width={100}
            height={30}
            priority
          />
          <Link href="/">HOME</Link>
        </h1>
        {children}
      </body>
    </html>
  );
}
