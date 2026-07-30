import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Cpu,
  FileText,
  Folder,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

interface HomeDirectoryProps {
  postCount: number;
}

export function HomeDirectory({ postCount }: HomeDirectoryProps) {
  const routes = [
    {
      href: "/projects",
      label: "Work",
      count: `${projects.length} projects`,
      description: "Case studies, architecture, constraints, and outcomes.",
      icon: Folder,
    },
    {
      href: "/resume",
      label: "Resume",
      count: "3 production roles",
      description: "Experience, scope, impact bullets, skills, and education.",
      icon: FileText,
    },
    {
      href: "/blog",
      label: "Writing",
      count: `${postCount} notes`,
      description: "Practical thinking on systems, edge AI, and robotics.",
      icon: BookOpen,
    },
    {
      href: "/uses",
      label: "Stack",
      count: "Current toolkit",
      description: "Hardware, languages, tools, and what I am learning now.",
      icon: Cpu,
    },
  ];

  return (
    <section aria-labelledby="explore-title" className="border-y border-border/70 py-10 sm:py-12">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              explore_by_signal
            </p>
            <h2 id="explore-title" className="mt-2 text-2xl font-bold tracking-tight">
              Go deeper only where it matters.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The homepage stays brief. Each route answers one specific hiring question.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {routes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group rounded-lg border border-border bg-card/70 p-4 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-md border border-accent/20 bg-accent/5 p-2 text-accent">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold text-foreground group-hover:text-accent">
                      {route.label}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      {route.count}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {route.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
