import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

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
      <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
        <body className="min-h-screen flex flex-col antialiased selection:bg-[hsl(var(--primary))]/20 selection:text-[hsl(var(--primary))]">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Skip to content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[hsl(var(--primary))] focus:text-white focus:rounded-lg"
            >
              Skip to content
            </a>
            <BackgroundGradient />
            <Navigation />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" theme="system" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
