import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

interface ProjectsProps {
  compact?: boolean;
}

export function Projects({ compact = false }: ProjectsProps) {
  return (
    <section
      id="projects"
      className={compact ? "pb-12 sm:pb-16" : "py-16 sm:py-20"}
    >
      <Container>
        {!compact && (
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              projects
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Systems built from prototype to production.
            </h2>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/30">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {project.year} · {project.category}
                      </p>
                      <h3 className="mt-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                    </div>
                    {project.featured && (
                      <span
                        className="shrink-0 rounded border border-accent/20 bg-accent/5 p-1.5 text-accent"
                        aria-label="Featured project"
                      >
                        <Trophy size={12} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <Badge key={metric}>{metric}</Badge>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="inline-flex items-center gap-1 text-sm text-accent">
                    View details
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
