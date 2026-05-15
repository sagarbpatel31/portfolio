"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

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

const glowMap = {
  cyan: "shadow-[0_0_30px_-10px_rgba(0,255,245,0.4)]",
  green: "shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)]",
  amber: "shadow-[0_0_30px_-10px_rgba(245,158,11,0.4)]",
};

/**
 * Parse a metric string into:
 * - numericValue: animatable number (or null if no number found)
 * - prefix: text before number
 * - suffix: text after number (e.g. "%", "+", "x")
 */
function parseMetric(metric: string): { numeric: number | null; prefix: string; suffix: string } {
  const match = metric.match(/^(\D*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { numeric: null, prefix: metric, suffix: "" };
  return {
    numeric: parseFloat(match[2]),
    prefix: match[1],
    suffix: match[3],
  };
}

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    return Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(1);
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, motionValue, rounded]);

  return <span>{display}</span>;
}

export function StatsCard({ metric, label, source, color = "cyan" }: StatsCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { numeric, prefix, suffix } = parseMetric(metric);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`dash-card hover:${glowMap[color]} transition-shadow`}
    >
      <div className="dash-card-body flex flex-col items-start gap-1">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={`font-mono text-3xl font-bold tabular-nums ${colorMap[color]}`}
        >
          {numeric !== null ? (
            <>
              {prefix}
              <AnimatedNumber value={numeric} inView={isInView} />
              {suffix}
            </>
          ) : (
            metric
          )}
        </motion.span>
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted">@ {source}</span>
      </div>
    </motion.div>
  );
}
