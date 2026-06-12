"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { specializationSignals } from "@/content/hiring";

export function SpecializationStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="specializations" ref={ref} className="py-4 sm:py-6">
      <Container>
        <motion.div
          variants={staggerContainer(0.06, 0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="dash-card overflow-hidden"
        >
          <div className="dash-card-header">
            <span>specializations</span>
            <span className="text-accent">recruiter scan</span>
          </div>
          <div className="dash-card-body">
            <motion.div
              variants={fadeIn("up", 0)}
              className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5"
            >
              {specializationSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-border bg-surface/50 px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-foreground"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
