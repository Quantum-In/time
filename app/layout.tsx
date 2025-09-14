import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TIME.IR - ساعت و تقویم ایران',
  description: 'وب سایت ساعت و تقویم ایران - Persian Calendar and Time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}