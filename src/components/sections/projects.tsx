import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/hiring";

const selectedSlugs = caseStudies.map((study) => study.slug);
const orderedProjects = [
  ...selectedSlugs.flatMap((slug) => projects.filter((project) => project.slug === slug)),
  ...projects.filter((project) => !selectedSlugs.some((slug) => project.slug === slug)),
];

interface ProjectsProps {
  compact?: boolean;
}

export function Projects({ compact = false }: ProjectsProps) {
  const ProjectTitle = compact ? "h2" : "h3";

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
          {orderedProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/30">
                <CardHeader>
                  <p className="font-mono text-xs text-muted-foreground">
                    {project.category} · {project.year}
                  </p>
                  <ProjectTitle className="mt-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {project.title}
                  </ProjectTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <Badge>{project.maturity.label}</Badge>
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
