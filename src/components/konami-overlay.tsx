"use client";

import { useState, useCallback } from "react";
import { useKonami } from "@/lib/use-konami";

export function KonamiOverlay() {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 4000);
  }, []);

  useKonami(activate);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm font-mono cursor-pointer"
      onClick={() => setActive(false)}
    >
      <div className="text-center space-y-4 px-4">
        <p className="text-accent text-4xl font-bold animate-pulse tracking-widest">
          ↑↑↓↓←→←→BA
        </p>
        <p className="text-2xl text-foreground font-bold">CHEAT CODE ACTIVATED</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="text-accent-green">✓ god_mode = true</p>
          <p className="text-accent-green">✓ extra_life += 1</p>
          <p className="text-accent-green">✓ resume.pdf unlocked</p>
          <p className="text-accent-amber">⚡ sudo hire sagar — access granted</p>
        </div>
        <p className="text-xs text-muted pt-4">
          Actually just email me:{" "}
          <a
            href="mailto:sagarp220376@gmail.com"
            className="text-accent underline"
            onClick={(e) => e.stopPropagation()}
          >
            sagarp220376@gmail.com
          </a>
        </p>
        <p className="text-[10px] text-muted opacity-60">[click anywhere to dismiss]</p>
      </div>
    </div>
  );
}
