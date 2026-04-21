"use client";

import { useEffect, useState } from "react";

const bootLines = [
  { text: "[kernel]    Loading firmware modules...", delay: 0 },
  { text: "[system]    Initializing embedded runtime v4.2.1...", delay: 400 },
  { text: "[nvidia]    CUDA runtime: ready (Jetson Orin)", delay: 800 },
  { text: "[network]   DPDK data plane: online", delay: 1200 },
  { text: "[ai]        Neural network inference: loaded", delay: 1600 },
  { text: "[ros2]      Robotics middleware: connected", delay: 2000 },
  { text: "", delay: 2400 },
  { text: "> SAGAR_OS v1.0 — All systems nominal.", delay: 2500, accent: true },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Skip if already booted this session
    if (sessionStorage.getItem("booted")) {
      onComplete();
      return;
    }

    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    // Start fade out
    setTimeout(() => {
      setFading(true);
      sessionStorage.setItem("booted", "1");
    }, 3200);

    // Complete
    setTimeout(() => onComplete(), 3700);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xl px-6 font-mono text-sm">
        {bootLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`boot-line ${
              line.accent
                ? "mt-2 text-accent font-bold glow-text"
                : "text-accent-green/70"
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {line.text}
          </div>
        ))}
        {visibleLines < bootLines.length && (
          <span className="inline-block h-4 w-2 animate-blink bg-accent-green/70" />
        )}
      </div>
    </div>
  );
}
