import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Kitaek Lim - Web3 Product Builder',
  description: 'Personal website and portfolio of Kitaek Lim',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.variable}>
        <body className="min-h-screen flex flex-col antialiased selection:bg-[hsl(var(--primary))]/20 selection:text-[hsl(var(--primary))]">
          <BackgroundGradient />
          <Navigation />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" theme="system" />
        </body>
      </html>
    </ClerkProvider>
  );
}
