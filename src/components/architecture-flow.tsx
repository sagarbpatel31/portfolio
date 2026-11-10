import { Fragment } from "react";
import { ArrowDown, ArrowRight, CircuitBoard } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureFlowProps {
  steps: readonly string[];
  compact?: boolean;
}

export function ArchitectureFlow({ steps, compact = false }: ArchitectureFlowProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-accent/15 bg-background/45 p-3"
      aria-label="Architecture flow"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div className="relative flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-1.5">
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div className="group/node min-w-0 flex-1 rounded-lg border border-accent/20 bg-card/95 p-3 shadow-[0_0_22px_rgba(0,255,245,0.04)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  stage {String(index + 1).padStart(2, "0")}
                </span>
                <CircuitBoard
                  size={12}
                  className="text-accent/70 transition-colors group-hover/node:text-accent"
                  aria-hidden="true"
                />
              </div>
              <p
                className={cn(
                  "mt-3 font-medium leading-snug text-foreground",
                  compact ? "text-xs" : "text-sm",
                )}
              >
                {step}
              </p>
              <div className="mt-3 h-px bg-gradient-to-r from-accent/70 via-accent/20 to-transparent" />
            </div>
            {index < steps.length - 1 ? (
              <div className="flex shrink-0 items-center justify-center text-accent/70" aria-hidden="true">
                <ArrowDown size={14} className="lg:hidden" />
                <ArrowRight size={14} className="hidden lg:block" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
