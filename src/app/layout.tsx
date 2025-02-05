import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from "@/components/layout/menu";
import { headers } from 'next/headers';

const SuisseIntlMono = localFont({
  src: "./fonts/SuisseIntlMono.woff2",
  variable: "--font-suisse-intl-mono",
  weight: "100 900",
});

const SuisseIntl = localFont({
  src: [
    {
      path: "./fonts/SuisseIntlMedium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "./fonts/SuisseIntlRegular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: './fonts/SuisseIntlBook.woff2',
      weight: '450',
      style: 'normal'
    }
  ],
  variable: "--font-suisse-intl"
});

export const metadata: Metadata = {
  title: "Zuke",
  description: "Large Language Powered Trench Feed",
  metadataBase: new URL('https://zuke.gg'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zuke.gg',
    siteName: 'Zuke',
    title: 'Zuke',
    description: 'Large Language Powered Trench Feed',
    images: [
      {
        url: '/twitter-og.jpg',
        width: 1200,
        height: 675,
        alt: 'Zuke',
        type: 'image/jpeg',
        secureUrl: 'https://zuke.gg/twitter-og.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuke',
    description: 'Large Language Powered Trench Feed',
    images: ['/twitter-og.jpg'],
    creator: '@zuke',
    site: '@zuke',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
  },
};

function isMobileUserAgent(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"
          defer
        />
        <script
          src="https://unpkg.com/@project-serum/sol-wallet-adapter@latest/dist/index.umd.js"
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                console.log("🌟 Window loaded");
                console.log("🦊 Phantom availability:", window.phantom?.solana);
              }
            `
          }}
        />
      </head>
      <body
        className={`${SuisseIntl.variable} ${SuisseIntlMono.variable} antialiased`}
      >
        <div className="mobile-warning">
          <img src="/logo.svg" alt="Zuke" />
          <p>Zuke was designed for desktop users. Please use desktop.</p>
        </div>
        <Menu />
        {children}
      </body>
    </html>
  );
}
