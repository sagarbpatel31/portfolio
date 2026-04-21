"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/content/skills";

const skillLevels: Record<string, number> = {
  "Languages": 90,
  "Embedded & Systems": 95,
  "Networking & Data Plane": 85,
  "AI/ML & Edge": 80,
  "Web & Full Stack": 70,
  "Tools & Infrastructure": 85,
};

export function SkillsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="dash-card">
      <div className="dash-card-header">
        <span>system capabilities</span>
      </div>
      <div className="dash-card-body space-y-4">
        {skills.map((cat, i) => {
          const level = skillLevels[cat.category] || 70;
          return (
            <div key={cat.category}>
              <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground uppercase tracking-wider">
                  {cat.category}
                </span>
                <span className="text-accent">{level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {cat.items.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="inline-block rounded bg-border/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
                {cat.items.length > 5 && (
                  <span className="inline-block px-1.5 py-0.5 font-mono text-[10px] text-muted">
                    +{cat.items.length - 5}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
