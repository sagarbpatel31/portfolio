import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { StatusBar } from "@/components/layout/status-bar";
import { KonamiOverlay } from "@/components/konami-overlay";
import { SITE_URL } from "@/lib/site";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SAGAR_OS — Systems & AI Engineer",
    template: "%s | SAGAR_OS",
  },
  description:
    "Building high-performance embedded Linux, networking, edge AI, and physical AI systems.",
  keywords: [
    "Embedded Systems",
    "Linux",
    "C",
    "C++",
    "Python",
    "NVIDIA Jetson",
    "Edge AI",
    "CUDA",
    "TensorRT",
    "Networking",
    "DPDK",
    "Robotics",
    "Physical AI",
  ],
  authors: [{ name: "Sagar Patel" }],
  creator: "Sagar Patel",
  openGraph: {
    title: "SAGAR_OS — Systems & AI Engineer",
    description:
      "Building high-performance embedded Linux, networking, edge AI, and physical AI systems.",
    type: "website",
    siteName: "SAGAR_OS",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "SAGAR_OS — Systems & AI Engineer",
    description:
      "Building high-performance embedded Linux, networking, edge AI, and physical AI systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.shortBio,
  url: SITE_URL,
  image: `${SITE_URL}${profile.avatarUrl}`,
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  knowsAbout: profile.focusAreas,
  sameAs: socials
    .filter((s) => !s.url.startsWith("mailto:"))
    .map((s) => s.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background bg-grid font-sans text-foreground antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="scanline-overlay" aria-hidden="true" />
        <Navbar />
        <main className="flex-grow pt-14 pb-8">{children}</main>
        <StatusBar />
        <KonamiOverlay />
        <Analytics />
      </body>
    </html>
  );
}
