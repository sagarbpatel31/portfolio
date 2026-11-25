"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { projects as allProjects } from "@/content/projects";
import { caseStudies } from "@/content/hiring";
import type { Project } from "@/types";
import { CaseStudyPanel } from "@/components/case-study-panel";
import { MarkdownContent } from "@/components/markdown-content";

interface ProjectDetailProps {
  project: Project;
}

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const [headline, subheadline] = project.title.includes(" — ")
    ? project.title.split(" — ", 2)
    : [project.title, ""];
  const [leadParagraph] = project.longDescription
    .split("\n\n")
    .filter((p) => p.trim());
  const relatedProjects = allProjects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => project.tags.includes(tag));
      const score = sharedTags.length + (candidate.category === project.category ? 2 : 0);
      return { candidate, score, sharedTags };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const caseStudy = caseStudies.find((study) => study.slug === project.slug);
  const maturityStyle = {
    green: {
      dot: "bg-accent-green",
      text: "text-accent-green",
      border: "border-accent-green/20 bg-accent-green/5",
    },
    cyan: {
      dot: "bg-accent",
      text: "text-accent",
      border: "border-accent/20 bg-accent/5",
    },
    amber: {
      dot: "bg-accent-amber",
      text: "text-accent-amber",
      border: "border-accent-amber/20 bg-accent-amber/5",
    },
  }[project.maturity.tone];

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        {/* Header */}
        <motion.div
          ref={heroRef}
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          {/* Back link */}
          <motion.div variants={fadeIn("up", 0)}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              <span>cd ~/projects</span>
            </Link>
          </motion.div>

          {/* Category + Year + Status */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="flex items-center gap-3 mb-4 font-mono text-xs"
          >
            <Badge>{project.category}</Badge>
            <span className="text-muted-foreground">{project.year}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${maturityStyle.dot}`} />
              <span className={maturityStyle.text}>{project.maturity.label.toUpperCase()}</span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn("up", 0)}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            <span className="text-foreground">{headline}</span>
            {subheadline ? (
              <>
                <span className="text-foreground"> — </span>
                <span className="text-gradient-cyan">{subheadline}</span>
              </>
            ) : null}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeIn("up", 0)}
            className="text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl"
          >
            {project.tagline}
          </motion.p>

          {project.links && project.links.length > 0 && (
            <motion.div variants={fadeIn("up", 0)} className="mt-5 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-accent/25 bg-accent/5 px-3 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          )}

          {!caseStudy && (
            <motion.div variants={fadeIn("up", 0)} className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Problem
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{leadParagraph}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Build
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {project.description}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Evidence
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {project.metrics?.join(" · ") || project.highlights.slice(0, 2).join(" · ")}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {caseStudy && (
          <>
            <section
              id="work-sample"
              tabIndex={-1}
              aria-labelledby="work-sample-title"
              className="mt-8 scroll-mt-20 rounded-xl border border-accent/25 bg-card p-5 sm:p-7"
            >
              <h2 id="work-sample-title" className="text-2xl font-bold tracking-tight">
                {caseStudy.workSample.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{caseStudy.workSample.context}</p>
              <dl className="my-5 divide-y divide-border border-y border-border">
                {caseStudy.workSample.observations.map(({ label, detail }) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="font-mono text-sm font-semibold text-accent">{label}</dt>
                    <dd className="leading-relaxed text-foreground">{detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="leading-relaxed text-foreground">{caseStudy.workSample.finding}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {caseStudy.workSample.sources.map(({ label, href }) => (
                  <a key={href} href={href} className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-light">
                    {label}
                  </a>
                ))}
              </div>
            </section>
            <div className="mt-6">
              <CaseStudyPanel study={caseStudy} />
            </div>
          </>
        )}

        {project.evidence && project.evidence.length > 0 ? (
          <AnimatedSection className="mt-6">
            <aside className="dash-card" aria-labelledby="evidence-ledger-title">
              <div className="dash-card-header">
                <span
                  id="evidence-ledger-title"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  <ShieldCheck size={14} className="text-accent-green" aria-hidden="true" />
                  Evidence ledger
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${maturityStyle.border} ${maturityStyle.text}`}
                >
                  {project.maturity.label}
                </span>
              </div>
              <div className="dash-card-body">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {project.maturity.summary}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {project.evidence.map((item) => {
                    const content = (
                      <>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-snug text-foreground">
                          {item.value}
                        </p>
                        {item.href ? (
                          <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] text-accent">
                            Inspect proof
                            <ArrowUpRight size={11} aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border bg-surface/50 p-4 transition-colors hover:border-accent/30"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label} className="rounded-lg border border-border bg-surface/50 p-4">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </AnimatedSection>
        ) : null}

        {/* Description */}
        <AnimatedSection className="mt-10">
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">README.md</span>
            </div>
            <div className="dash-card-body">
              <MarkdownContent content={project.longDescription} />
            </div>
          </div>
        </AnimatedSection>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <AnimatedSection className="mt-6">
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Terminal size={14} className="text-accent" />
                  Highlights
                </span>
              </div>
              <div className="dash-card-body">
                <ul className="space-y-3">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-accent-green flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <AnimatedSection className="mt-6">
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 size={14} className="text-accent-amber" />
                  Key Metrics
                </span>
              </div>
              <div className="dash-card-body">
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-accent/10 bg-accent/5 px-4 py-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm font-mono text-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Tech Stack */}
        <AnimatedSection className="mt-6">
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Tech Stack</span>
              <span className="font-mono text-xs text-muted">{project.tags.length} DEPS</span>
            </div>
            <div className="dash-card-body">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {relatedProjects.length > 0 && (
          <AnimatedSection className="mt-6">
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Related Projects
                </span>
                <span className="font-mono text-xs text-muted">
                  {relatedProjects.length} recommended
                </span>
              </div>
              <div className="dash-card-body">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map(({ candidate, sharedTags }) => (
                    <Link
                      key={candidate.slug}
                      href={`/projects/${candidate.slug}`}
                      className="group rounded-lg border border-border bg-surface/40 p-4 transition-colors hover:border-accent/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                          {candidate.year}
                        </p>
                        {candidate.featured && (
                          <span className="rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-[10px] text-accent">
                            featured
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {candidate.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {candidate.tagline}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {sharedTags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}
      </Container>
    </div>
  );
}
