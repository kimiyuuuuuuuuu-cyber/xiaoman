import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '小満｜短編映画',
  description:
    '六年ぶりに再会した母と娘の、短い帰郷を描く映画「小満」の作品サイト。',
  openGraph: {
    title: '小満｜短編映画',
    description:
      '六年ぶりに再会した母と娘の、短い帰郷を描く映画「小満」の作品サイト。',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: '小満｜短編映画' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '小満｜短編映画',
    description:
      '六年ぶりに再会した母と娘の、短い帰郷を描く映画「小満」の作品サイト。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
