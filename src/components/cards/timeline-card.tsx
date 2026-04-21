"use client";

import { experiences } from "@/content/experience";

export function TimelineCard() {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>deployment log</span>
        <span className="text-muted">{experiences.length} deployments</span>
      </div>
      <div className="dash-card-body">
        <div className="relative space-y-4 pl-6">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />

          {experiences.map((exp) => {
            const isCurrent = exp.period.includes("Present");
            const startDate = exp.period.split("–")[0].trim().replace(" ", "-");
            return (
              <div key={exp.company} className="relative">
                {/* Dot */}
                <div
                  className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                    isCurrent
                      ? "border-accent bg-accent/20 animate-pulse-glow"
                      : "border-muted bg-card"
                  }`}
                />
                <div className="font-mono text-xs text-muted mb-0.5">
                  [{startDate}]
                </div>
                <div
                  className={`text-sm font-medium ${
                    isCurrent ? "text-accent" : "text-foreground"
                  }`}
                >
                  {isCurrent ? "● DEPLOYED →" : "○ DEPLOYED →"} {exp.company}
                </div>
                <div className="text-xs text-muted-foreground">
                  {exp.role}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {exp.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded bg-border/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
