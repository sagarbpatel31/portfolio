"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";

export function ProcessCard() {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>proc monitor</span>
        <span className="text-accent-green">{projects.length} processes</span>
      </div>
      <div className="overflow-x-hidden">
        {/* Header row */}
        <div className="process-row process-header">
          <span>PID</span>
          <span>PROCESS</span>
          <span className="hidden sm:block">YEAR</span>
          <span className="hidden sm:block">CAT</span>
          <span className="text-right">STATUS</span>
        </div>
        {/* Process rows */}
        {projects.map((project, i) => {
          const name = project.title.split("—")[0].trim();
          const shortCat = project.category.split(" ")[0];
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="process-row group cursor-pointer"
            >
              <span className="text-muted">
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="flex items-center gap-2 text-foreground group-hover:text-accent transition-colors min-w-0 truncate">
                {name}
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent flex-shrink-0" />
              </span>
              <span className="hidden sm:block text-muted">{project.year}</span>
              <span className="hidden sm:block text-muted">{shortCat}</span>
              <span className="text-right">
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 text-accent-green">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
                    </span>
                    <span className="hidden sm:inline font-semibold">ACTIVE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-accent-amber/70">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-amber/70" />
                    <span className="hidden sm:inline">IDLE</span>
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
