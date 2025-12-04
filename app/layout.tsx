import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from "next";
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

const siteName = "Kitaek Lim";
const title = "Kitaek Lim — Web3 Product Builder";
const description =
  "Portfolio of Kitaek Lim — building Web3 products with strong UX, smart contracts, and practical, shippable engineering.";
const siteUrl = "https://ktlimweb3.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: `%s — ${siteName}`,
  },
  description,

  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,

  keywords: [
    "Kitaek Lim",
    "Web3",
    "Blockchain",
    "cryptocurrency",
    "crypto",
    "Product",
    "Product Builder",
    "Smart Contracts",
    "Ethereum",
    "Base",
    "Solidity",
    "Next.js",
    "TypeScript",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — Portfolio`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#00C7E6", // Brand cyan color
  colorScheme: "dark light",
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
