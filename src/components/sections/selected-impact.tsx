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
    <section id="impact" ref={ref} className="py-8 sm:py-10">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-4">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              selected_impact
            </h2>
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              Proof points recruiters can scan in under ten seconds.
            </p>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-3">
            {selectedImpact.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeIn("up", 0)}
                className="dash-card h-full"
              >
                <div className="dash-card-body space-y-3">
                  <p className="font-mono text-4xl font-bold tracking-tight text-accent">
                    {item.value}
                  </p>
                  <div>
                    <p className="text-sm font-semibold leading-snug text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
