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
      <div>
        {/* Header row */}
        <div className="process-row process-header">
          <span>PID</span>
          <span>PROCESS</span>
          <span>YEAR</span>
          <span>CAT</span>
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
              <span className="flex items-center gap-2 text-foreground group-hover:text-accent transition-colors">
                {name}
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
              </span>
              <span className="text-muted">{project.year}</span>
              <span className="text-muted">{shortCat}</span>
              <span className="text-right">
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 text-accent-green">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-accent-amber">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-amber" />
                    IDLE
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
