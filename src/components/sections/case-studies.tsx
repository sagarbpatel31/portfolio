import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/hiring";

export function CaseStudies() {
  return (
    <section id="selected-work" className="py-10 sm:py-14">
      <Container>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              selected_work
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
              Three projects. Clear constraints. Measurable outcomes.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-accent-light"
          >
            View all projects
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/projects/${study.slug}`}
              className="dash-card group flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="dash-card-header">
                <span>{study.category}</span>
                <span className="text-accent-green">{study.metric}</span>
              </div>
              <article className="dash-card-body flex flex-1 flex-col">
                <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {study.problem}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.techStack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <p className="line-clamp-2 border-t border-border pt-4 text-sm leading-relaxed text-foreground">
                    {study.outcome}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                    Read case study
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
