
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import LiveOrderNotification from '@/components/live-order-notification';
import BodyWrapper from '@/components/layout/body-wrapper';

export const metadata: Metadata = {
  title: 'Ovisure Gold Official Navigator',
  description: 'Susu terbaik untuk sendi & lutut di Indonesia',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // or 'no'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <BodyWrapper className="font-body antialiased">
        <LiveOrderNotification />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </BodyWrapper>
    </html>
  );
}
