import type { Metadata } from "next";
import { WinsIndex } from "@/components/wins-index";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hackathon Wins & Technical Recognition",
  description:
    "Hackathon wins, HydraDB bounty recognition, and technical contributions by Sagar Patel.",
  alternates: { canonical: `${SITE_URL}/wins` },
  openGraph: {
    title: "Hackathon Wins & Technical Recognition | SAGAR_OS",
    description:
      "Evidence-backed recognition across physical AI, multi-agent systems, reliability, and developer education.",
    url: `${SITE_URL}/wins`,
    type: "website",
  },
};

export default function WinsPage() {
  return <WinsIndex />;
}
