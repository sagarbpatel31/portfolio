import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/content/hiring";

export function CaseStudies() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="scroll-mt-14 py-9 sm:py-12">
      <Container>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="selected-work-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Selected work</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            All projects
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.slug} className="flex flex-col rounded-xl border border-border bg-card/85 p-5">
              <p className="font-mono text-xs text-accent">{study.category}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">{study.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.outcome}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {study.techStack.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border bg-surface/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <Link
                  href={`/projects/${study.slug}#work-sample`}
                  className="flex min-h-9 items-center justify-between gap-2 border-t border-border pt-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
                >
                  {study.workSample.action}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
