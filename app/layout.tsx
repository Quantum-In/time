import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TIME.AF - ساعت و تقویم افغانستان',
  description: 'وب سایت ساعت و تقویم افغانستان - Afghanistan Calendar and Time',
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