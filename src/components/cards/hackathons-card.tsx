"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, ChevronDown } from "lucide-react";
import { awards } from "@/content/awards";

interface HackathonGroup {
  event: string;
  year: string;
  wins: typeof awards;
  projectSlug: string;
}

// Map award title keywords to project slugs for navigation
function getProjectSlug(awardTitle: string): string {
  const lower = awardTitle.toLowerCase();
  if (lower.includes("deeplake") || lower.includes("hydraswarm"))
    return "hydraswarm";
  if (lower.includes("physical ai") || lower.includes("nomadicml"))
    return "hydraswarm"; // G1 work is in hydraswarm-adjacent context
  if (lower.includes("cyberwave") || lower.includes("toolhouse"))
    return "medassist";
  return "";
}

export function HackathonsCard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Group awards by event
  const grouped = awards.reduce<Record<string, HackathonGroup>>((acc, award) => {
    if (!acc[award.event]) {
      acc[award.event] = {
        event: award.event,
        year: award.year,
        wins: [],
        projectSlug: getProjectSlug(award.title),
      };
    }
    acc[award.event].wins.push(award);
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>hackathons</span>
        <span className="text-accent-amber">{groups.length} events · {awards.length} wins</span>
      </div>
      <div className="dash-card-body space-y-2">
        {groups.map((group) => {
          const isOpen = expanded === group.event;
          return (
            <div
              key={group.event}
              className="rounded border border-border/50 bg-surface/30 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : group.event)}
                className="w-full flex items-center gap-2 px-3 py-2 font-mono text-xs hover:bg-accent/5 transition-colors text-left"
              >
                <Trophy size={12} className="text-accent-amber shrink-0" />
                <span className="flex-1 min-w-0 truncate text-foreground">
                  {group.event}
                </span>
                <span className="text-accent-amber shrink-0">
                  {group.wins.length}×
                </span>
                <ChevronDown
                  size={12}
                  className={`text-muted shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-3 py-2 space-y-2 border-t border-border/50 bg-background/40">
                  {group.wins.map((win) => {
                    const slug = getProjectSlug(win.title);
                    return (
                      <div
                        key={win.title}
                        className="space-y-1 font-mono text-[11px]"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-accent-amber shrink-0">★</span>
                          <span className="text-accent flex-1">
                            {win.title}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-4">
                          {win.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pl-4 pt-1">
                          {slug && (
                            <Link
                              href={`/projects/${slug}`}
                              className="inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent hover:bg-accent/20 transition-colors"
                            >
                              project →
                            </Link>
                          )}
                          {win.links?.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded border border-border bg-surface/50 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-accent transition-colors"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
