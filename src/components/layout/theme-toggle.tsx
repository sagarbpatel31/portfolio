"use client";

import { Palette } from "lucide-react";
import { useTheme } from "@/lib/use-theme";
import { cycleTheme, THEME_LABELS } from "@/lib/theme";

export function ThemeToggle() {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => cycleTheme()}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
      aria-label={`Color theme: ${THEME_LABELS[theme]}. Activate to switch theme.`}
      title="Switch theme"
    >
      <Palette className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{THEME_LABELS[theme]}</span>
    </button>
  );
}
