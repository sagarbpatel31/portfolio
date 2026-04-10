"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { skills } from "@/content/skills";

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" ref={ref} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-transparent to-transparent" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              tech_stack
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Tools and technologies I reach for.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <motion.div
                key={skill.category}
                variants={fadeIn("up", 0)}
                className="rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-accent/20"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="outline" className="transition-colors hover:border-accent/40 hover:text-foreground">
                      {item}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
