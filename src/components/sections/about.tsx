"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/content/profile";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="mb-4 h-0.5 w-12 rounded-full bg-accent" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              about_me
            </h2>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Bio */}
            <motion.div variants={fadeIn("up", 0)} className="lg:col-span-3">
              <p className="text-lg leading-relaxed text-muted">
                {profile.bio}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                I thrive where hardware meets software — in the gap between &quot;it works on my
                laptop&quot; and &quot;it runs on a robot at 3AM in a warehouse.&quot; Whether
                it&apos;s writing a custom DPDK data plane, deploying TensorRT models on a Jetson,
                or building firmware for a safety-critical motor controller, I care about getting
                the last 10% right — because in embedded, the last 10% is everything.
              </p>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={fadeIn("up", 0)} className="space-y-8 lg:col-span-2">
              <div>
                <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  focus_areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.focusAreas.map((area) => (
                    <Badge key={area}>{area}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  open_to
                </h3>
                <ul className="space-y-2">
                  {profile.openTo.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
