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
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { projects as allProjects } from "@/content/projects";
import { caseStudies } from "@/content/hiring";
import type { Project } from "@/types";
import { CaseStudyPanel } from "@/components/case-study-panel";

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
  const [leadParagraph, ...restParagraphs] = project.longDescription
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
              <span className={`h-1.5 w-1.5 rounded-full ${project.featured ? "bg-accent-green" : "bg-accent-amber"}`} />
              <span className={project.featured ? "text-accent-green" : "text-accent-amber"}>
                {project.featured ? "ACTIVE" : "IDLE"}
              </span>
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

          {caseStudy ? (
            <AnimatedSection className="mt-8">
              <CaseStudyPanel study={caseStudy} />
            </AnimatedSection>
          ) : (
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

        {/* Description */}
        <AnimatedSection className="mt-10">
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">README.md</span>
            </div>
            <div className="dash-card-body">
              <div className="space-y-4">
                {[leadParagraph, ...restParagraphs].map((paragraph, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
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

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <AnimatedSection className="mt-6">
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Links</span>
              </div>
              <div className="dash-card-body">
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent hover:border-accent/30"
                    >
                      {link.label}
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

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
