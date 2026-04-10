"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { highlights } from "@/content/highlights";

export function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="highlights" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={fadeIn("up", 0)} className="mb-12">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              work_i&apos;m_proud_of
            </h2>
            <p className="mt-3 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
              Selected highlights from building systems that ship.
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeIn("up", 0)}
                className="card-shine gradient-border group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card-hover sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-grow">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-semibold leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="ml-11 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <div className="ml-11 mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {item.metric && (
                    <div className="flex shrink-0 items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 sm:ml-6">
                      <Zap size={14} className="text-accent" aria-hidden="true" />
                      <span className="whitespace-nowrap font-mono text-sm font-bold text-accent">
                        {item.metric}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
