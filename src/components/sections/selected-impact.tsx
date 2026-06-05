"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { selectedImpact } from "@/content/hiring";

export function SelectedImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="impact" ref={ref} className="relative py-8 sm:py-10">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-5">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              selected_impact
            </h2>
            <p className="mt-2 max-w-3xl text-xl font-bold tracking-tight sm:text-2xl">
              Proof points recruiters can scan in under ten seconds.
            </p>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-3">
            {selectedImpact.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeIn("up", 0)}
                className="dash-card h-full overflow-hidden"
              >
                <div className="dash-card-body relative space-y-4 bg-gradient-to-br from-accent/10 via-transparent to-transparent">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                      {item.value}
                    </p>
                    <span className="rounded-full border border-accent/20 bg-accent/5 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                      signal
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="max-w-xs text-sm font-semibold leading-snug text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
