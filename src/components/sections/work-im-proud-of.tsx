"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { proudWork } from "@/content/hiring";

export function WorkImProudOf() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="proud-work" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              work_i&apos;m_proud_of
            </h2>
            <p className="mt-2 max-w-3xl text-xl font-bold tracking-tight sm:text-2xl">
              The work is strongest when the problem is ambiguous, the constraints are real,
              and the system still has to ship cleanly.
            </p>
          </motion.div>

          <div className="grid gap-3 lg:grid-cols-3">
            {proudWork.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn("up", 0)}
                className="dash-card h-full overflow-hidden"
              >
                <div className="dash-card-body flex h-full flex-col gap-4 bg-gradient-to-br from-surface/80 via-transparent to-transparent">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {item.label}
                    </p>
                    <span className="rounded-full border border-accent/20 bg-accent/5 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                      signal
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto rounded-lg border border-border bg-surface/50 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Proof
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {item.proof}
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
