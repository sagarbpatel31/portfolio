import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { StatusBar } from "@/components/layout/status-bar";
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
  alternates: {
    canonical: "/",
  },
  applicationName: "SAGAR_OS",
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
  publisher: "Sagar Patel",
  category: "technology",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "SAGAR_OS — Systems & AI Engineer",
    description:
      "Building high-performance embedded Linux, networking, edge AI, and physical AI systems.",
    type: "website",
    siteName: "SAGAR_OS",
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "SAGAR_OS — Systems & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAGAR_OS — Systems & AI Engineer",
    description:
      "Building high-performance embedded Linux, networking, edge AI, and physical AI systems.",
    creator: "@sagarp31",
    images: [`${SITE_URL}/opengraph-image`],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SAGAR_OS",
  alternateName: "Sagar Patel Portfolio",
  url: SITE_URL,
  description:
    "Portfolio and resume for Sagar Patel, a Systems & AI Engineer building embedded Linux, networking, edge AI, and robotics systems.",
  author: {
    "@type": "Person",
    name: profile.name,
  },
  inLanguage: "en-US",
};

// Set the persisted theme before paint to avoid a flash of the default palette.
const themeInitScript = `(function(){try{var t=localStorage.getItem('sagar-os-theme');var v=['cyan','amber','green','light'];document.documentElement.dataset.theme=(v.indexOf(t)>=0)?t:'cyan';}catch(e){document.documentElement.dataset.theme='cyan';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background bg-grid font-sans text-foreground antialiased overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="scanline-overlay" aria-hidden="true" />
        <Navbar />
        <main className="flex-grow pt-14 pb-8">{children}</main>
        <StatusBar />
        <Analytics />
      </body>
    </html>
  );
}
