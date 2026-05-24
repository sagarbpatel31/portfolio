"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useKonami } from "@/lib/use-konami";
import { profile } from "@/content/profile";

export function KonamiOverlay() {
  const [active, setActive] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setActive(false), []);
  const activate = useCallback(() => setActive(true), []);

  useKonami(activate);

  useEffect(() => {
    if (!active) return;

    prevFocus.current = document.activeElement as HTMLElement | null;
    overlayRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const timer = setTimeout(close, 4000);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
      prevFocus.current?.focus?.();
    };
  }, [active, close]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Konami code activated"
      tabIndex={-1}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm font-mono cursor-pointer outline-none"
      onClick={close}
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
            href={`mailto:${profile.email}`}
            className="text-accent underline"
            onClick={(e) => e.stopPropagation()}
          >
            {profile.email}
          </a>
        </p>
        <p className="text-[10px] text-muted opacity-60">[press Esc or click anywhere to dismiss]</p>
      </div>
    </div>
  );
}
