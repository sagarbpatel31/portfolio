"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { projects } from "@/content/projects";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

interface ProjectsProps {
  compact?: boolean;
}

export function Projects({ compact = false }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const categoryCounts = new Map<string, number>();
  projects.forEach((project) => {
    categoryCounts.set(project.category, (categoryCounts.get(project.category) ?? 0) + 1);
  });
  const topCategories = [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={ref}
      className={compact ? "py-12 sm:py-16" : "py-24 sm:py-32"}
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {!compact && (
            <>
              <motion.div variants={fadeIn("up", 0)} className="mb-10">
                <div className="section-bar mb-4" />
                <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
                  projects
                </h2>
                <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  Things I&apos;ve built from prototype to production.
                </p>
              </motion.div>

              {/* Featured project + archive summary */}
              <div className="grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
                <motion.div variants={fadeIn("up", 0)} className="dash-card group">
                  <Link href={`/projects/${featuredProject.slug}`} className="block h-full">
                    <div className="dash-card-body flex h-full flex-col gap-4">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                        <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent">
                          Featured project
                        </span>
                        <span>{featuredProject.year}</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                          {featuredProject.title}
                        </h3>
                        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                          {featuredProject.tagline}
                        </p>
                      </div>
                      {featuredProject.metrics && featuredProject.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.metrics.map((metric) => (
                            <Badge key={metric}>{metric}</Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.tags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-accent">
                        Open project detail
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>

                <motion.div variants={fadeIn("up", 0)} className="dash-card">
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
                        Start with the featured project, then narrow by category to compare
                        systems, robotics, and AI work side by side.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Filter tabs */}
          <motion.div
            variants={fadeIn("up", 0)}
            className={compact ? "flex flex-wrap gap-2" : "mt-8 flex flex-wrap gap-2"}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-background shadow-lg shadow-accent/25"
                    : "border border-border text-muted hover:border-accent/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project grid */}
          <div className={compact ? "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block h-full">
                    <Card className="card-shine flex h-full flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-accent/5">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold transition-colors group-hover:text-accent">
                              {project.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {project.year} &middot; {project.category}
                            </p>
                          </div>
                          {project.featured && (
                            <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                              <Trophy size={12} aria-hidden="true" />
                              Featured
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm leading-relaxed text-muted line-clamp-3">{project.tagline}</p>
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.metrics.map((m) => (
                              <Badge key={m}>{m}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <span className="inline-flex items-center text-sm text-accent">
                          View details
                          <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                        {project.links && project.links.length > 0 && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.links![0].url, "_blank", "noopener,noreferrer");
                            }}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                            role="button"
                            tabIndex={0}
                          >
                            <ExternalLink size={12} />
                            GitHub
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
