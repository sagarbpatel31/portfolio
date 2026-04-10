import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  metadataBase: new URL("https://sagar-portfolio.vercel.app"),
  title: {
    default: "Sagar Patel — Embedded Software Systems Engineer",
    template: "%s | Sagar Patel",
  },
  description:
    "Building high-performance Linux, networking, edge AI, and physical AI systems.",
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
    title: "Sagar Patel — Embedded Software Systems Engineer",
    description:
      "Building high-performance Linux, networking, edge AI, and physical AI systems.",
    type: "website",
    siteName: "Sagar Patel",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Patel — Embedded Software Systems Engineer",
    description:
      "Building high-performance Linux, networking, edge AI, and physical AI systems.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background bg-grid font-sans text-foreground antialiased">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
