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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/lib/motion";
import type { Project } from "@/types";

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

  const paragraphs = project.longDescription
    .split("\n\n")
    .filter((p) => p.trim());

  return (
    <div className="py-20 sm:py-28">
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
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2">
              <Link href="/#projects">
                <ArrowLeft size={16} className="mr-1.5" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>

          {/* Category + Year */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="flex items-center gap-3 mb-4"
          >
            <Badge>{project.category}</Badge>
            <span className="text-sm text-muted">{project.year}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn("up", 0)}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            {project.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeIn("up", 0)}
            className="text-xl text-muted mt-4 leading-relaxed"
          >
            {project.tagline}
          </motion.p>
        </motion.div>

        {/* Description */}
        <AnimatedSection className="mt-12">
          <div className="space-y-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <AnimatedSection className="mt-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-accent" />
              Highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <span className="text-muted leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <AnimatedSection className="mt-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-accent" />
              Key Metrics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.metrics.map((metric, i) => (
                <Card key={i} className="border-accent/20 bg-accent/5">
                  <CardContent className="p-5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-medium text-foreground">
                      {metric}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Tech Stack */}
        <AnimatedSection className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </AnimatedSection>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <AnimatedSection className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Links</h2>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Button key={link.label} asChild variant="outline">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight size={14} className="ml-1.5" />
                  </a>
                </Button>
              ))}
            </div>
          </AnimatedSection>
        )}
      </Container>
    </div>
  );
}
