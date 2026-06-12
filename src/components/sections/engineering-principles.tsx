"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { engineeringPrinciples } from "@/content/hiring";

export function EngineeringPrinciples() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="principles" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <motion.div variants={fadeIn("up", 0)} className="dash-card">
            <div className="dash-card-header">
              <span>core principle</span>
              <span className="text-accent-green">how I think</span>
            </div>
            <div className="dash-card-body">
              <blockquote className="max-w-xl text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
                “I build systems that stay observable, recoverable, and fast under real-world
                constraints.”
              </blockquote>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", 0)} className="grid gap-3 sm:grid-cols-3">
            {engineeringPrinciples.map((item) => (
              <div key={item.title} className="dash-card h-full">
                <div className="dash-card-body space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
