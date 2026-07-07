import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getSiteTitle, siteConfig } from "@/config/site";

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
  title: {
    default: getSiteTitle(),
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} is an ${siteConfig.title} in ${siteConfig.department} at ${siteConfig.institution}. Research in machine learning, deep learning, computer vision, IoT, and pattern recognition. 37 publications, 386+ citations.`,
  keywords: [
    "Prasenjit Dey", "NIT Rourkela", "Machine Learning", "Deep Learning",
    "Computer Vision", "Neural Networks", "Pattern Recognition", "IoT",
    "CSE", "NIT Rourkela faculty", "Academic portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: siteConfig.facultyPageUrl,
    siteName: siteConfig.name,
    title: getSiteTitle(),
    description: `${siteConfig.name} — ${siteConfig.title}, ${siteConfig.department}, ${siteConfig.institution}. Research in ML, deep learning, and intelligent computing.`,
    images: [
      {
        url: "/images/professor.jpg",
        width: 400,
        height: 400,
        alt: `${siteConfig.name} — ${siteConfig.institution}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: getSiteTitle(),
    description: `${siteConfig.name} — ${siteConfig.title}, ${siteConfig.institution}. ML, Deep Learning, IoT research.`,
    images: ["/images/professor.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
