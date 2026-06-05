"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/content/hiring";

interface CaseStudyPanelProps {
  study: CaseStudy;
  compact?: boolean;
  href?: string;
}

export function CaseStudyPanel({ study, compact = false, href }: CaseStudyPanelProps) {
  const titleClass = compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl";
  const bodyClass = compact ? "text-xs sm:text-sm" : "text-sm";
  const gridClass = compact ? "grid gap-3 lg:grid-cols-[0.95fr_1.05fr]" : "grid gap-3 lg:grid-cols-[0.85fr_1.15fr]";

  const content = (
    <article className="dash-card group h-full transition-colors hover:border-accent/30">
      <div className="dash-card-header">
        <span>{study.category}</span>
        <span className="text-accent-green">{study.metric}</span>
      </div>
      <div className="dash-card-body space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
            <Workflow size={12} className="text-accent" aria-hidden="true" />
            Case study
          </div>
          <h3 className={`font-bold tracking-tight text-foreground group-hover:text-accent ${titleClass}`}>
            {study.title}
          </h3>
          <p className={`leading-relaxed text-muted-foreground ${bodyClass}`}>{study.problem}</p>
        </div>

        <div className={gridClass}>
          <div className="rounded-lg border border-border bg-surface/50 p-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Constraints</p>
            <ul className="mt-2 space-y-1.5">
              {study.constraints.map((item) => (
                <li key={item} className={`leading-relaxed text-foreground ${bodyClass}`}>
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent/80 align-middle" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Architecture
              </p>
              <span className="rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-[10px] text-accent">
                flow
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {study.architecture.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 font-mono text-[10px] text-accent">
                    {String(index + 1)}
                  </div>
                  <div className="flex-1 rounded-lg border border-accent/15 bg-accent/5 px-3 py-2">
                    <p className={`leading-snug text-foreground ${bodyClass}`}>{step}</p>
                  </div>
                  {index < study.architecture.length - 1 && (
                    <ArrowRight size={14} className="hidden flex-shrink-0 text-accent/70 md:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/40 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Tech stack</p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {study.techStack.length} layers
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {study.techStack.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-accent/15 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Outcome</p>
          <p className={`mt-2 leading-relaxed text-foreground ${bodyClass}`}>{study.outcome}</p>
        </div>

        {href ? (
          <span className="inline-flex items-center gap-1 text-sm text-accent transition-colors group-hover:text-accent-light">
            Open case study
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        ) : null}
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
