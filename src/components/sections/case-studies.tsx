"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { caseStudies } from "@/content/hiring";
import { CaseStudyPanel } from "@/components/case-study-panel";

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="case-studies" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              case_studies
            </h2>
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              Strongest projects, rewritten for hiring teams.
            </p>
          </motion.div>

          <div className="grid gap-3 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <motion.div key={study.slug} variants={fadeIn("up", 0)} className="h-full">
                <CaseStudyPanel
                  study={study}
                  compact
                  href={`/projects/${study.slug}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeIn("up", 0)} className="mt-4 flex justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-light"
            >
              Browse the full archive
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
