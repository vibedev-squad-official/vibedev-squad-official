import { ABTestProvider } from '@/components/ab-testing/ABTestProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/accessibility.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe DevSquad - AI Development Agency Replacement | Scale Your Team with AI Agents",
  description: "Replace expensive development teams with AI agents that work 24/7. Save $360K+ annually while shipping 10x faster. No hiring, no management, just results. Start free trial.",
  keywords: [
    "AI development team",
    "AI agents",
    "development agency replacement",
    "automated coding",
    "AI software development",
    "scale development team",
    "AI programming",
    "development automation",
    "AI developers",
    "software development AI"
  ],
  authors: [{ name: "Vibe DevSquad" }],
  creator: "Vibe DevSquad",
  publisher: "Vibe DevSquad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vibedevsquad.ai',
    title: 'Vibe DevSquad - AI Development Agency Replacement',
    description: 'Replace expensive development teams with AI agents that work 24/7. Save $360K+ annually while shipping 10x faster.',
    siteName: 'Vibe DevSquad',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibe DevSquad - AI Development Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe DevSquad - AI Development Agency Replacement',
    description: 'Replace expensive development teams with AI agents that work 24/7. Save $360K+ annually while shipping 10x faster.',
    images: ['/twitter-image.jpg'],
    creator: '@vibedevsquad',
  },
  alternates: {
    canonical: 'https://vibedevsquad.ai',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ABTestProvider>
          {children}
        </ABTestProvider>
        {/* SafeToolbar temporarily disabled to prevent WebSocket connection errors */}
        {/* <SafeToolbar /> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
