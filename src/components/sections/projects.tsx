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

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              projects
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Things I&apos;ve built from prototype to production.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeIn("up", 0)} className="mt-8 flex flex-wrap gap-2">
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
