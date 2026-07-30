import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Projects } from "@/components/sections/projects";
import { Container } from "@/components/ui/container";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected embedded systems, robotics, edge AI, networking, and multi-agent projects by Sagar Patel.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Selected Work | SAGAR_OS",
    description:
      "A curated archive of embedded systems, robotics, edge AI, and multi-agent projects.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="py-8">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} />
          cd ~/home
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/work — {projects.length} projects
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-foreground">Selected </span>
            <span className="text-gradient-cyan">work</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Production systems and focused prototypes across embedded Linux,
            networking, edge AI, robotics, and applied AI.
          </p>
        </div>
      </Container>

      <Projects compact />
    </div>
  );
}
