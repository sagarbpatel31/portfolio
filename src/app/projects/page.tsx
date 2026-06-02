import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Trophy } from "lucide-react";
import { Projects } from "@/components/sections/projects";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated archive of embedded systems, robotics, edge AI, and multi-agent projects from SAGAR_OS.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Projects | SAGAR_OS",
    description:
      "A curated archive of embedded systems, robotics, edge AI, and multi-agent projects.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const categoryCounts = new Map<string, number>();
  projects.forEach((project) => {
    categoryCounts.set(project.category, (categoryCounts.get(project.category) ?? 0) + 1);
  });
  const topCategories = [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#dashboard"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} />
          cd ~/dashboard
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/projects — {projects.length} entries
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-foreground">Projects archive</span>{" "}
            <span className="text-gradient-cyan">and showcase</span>
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Embedded systems, robotics, edge AI, and multi-agent systems.
          </p>
        </div>

        <section className="mb-8 grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
          <Link
            href={`/projects/${featuredProject.slug}`}
            className="dash-card group flex h-full flex-col transition-colors hover:border-accent/30"
          >
            <div className="dash-card-body flex h-full flex-col gap-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent">
                  Featured project
                </span>
                <span>{featuredProject.year}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                  {featuredProject.title}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {featuredProject.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} aria-hidden="true" />
                  {featuredProject.year}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Trophy size={12} aria-hidden="true" />
                  {featuredProject.featured ? "Featured" : "Archive"}
                </span>
              </div>
              {featuredProject.metrics && featuredProject.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {featuredProject.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-[11px] text-accent"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {featuredProject.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-accent">
                Open project detail
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="dash-card">
            <div className="dash-card-header">
              <span>archive signals</span>
              <span>{projects.length} total</span>
            </div>
            <div className="dash-card-body space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Top categories
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topCategories.map(([category, count]) => (
                    <span
                      key={category}
                      className="rounded border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {category} · {count}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Reading map
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Start with the featured project, then filter the archive by category to compare
                  robotics, embedded systems, and AI systems work.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Projects compact />
    </div>
  );
}
