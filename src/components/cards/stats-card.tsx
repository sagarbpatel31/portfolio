"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatsCardProps {
  metric: string;
  label: string;
  source: string;
  color?: "cyan" | "green" | "amber";
}

const colorMap = {
  cyan: "text-accent",
  green: "text-accent-green",
  amber: "text-accent-amber",
};

export function StatsCard({ metric, label, source, color = "cyan" }: StatsCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="dash-card">
      <div className="dash-card-body flex flex-col items-start gap-1">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={`font-mono text-3xl font-bold ${colorMap[color]}`}
        >
          {metric}
        </motion.span>
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted">@ {source}</span>
      </div>
    </div>
  );
}
