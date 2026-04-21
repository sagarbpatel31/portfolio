"use client";

import Link from "next/link";
import { awards } from "@/content/awards";

interface BlogEntry {
  slug: string;
  title: string;
  date: string;
}

export function ActivityCard({ blogEntries }: { blogEntries: BlogEntry[] }) {
  // Merge awards and posts into a single feed, sorted by date
  const feed: { date: string; icon: string; label: string; href?: string; color: string }[] = [];

  awards.forEach((award) => {
    feed.push({
      date: `${award.year}-01`,
      icon: "\u2605",
      label: `WON: ${award.title}`,
      color: "text-accent-amber",
    });
  });

  blogEntries.forEach((post) => {
    feed.push({
      date: post.date,
      icon: "\u270E",
      label: `POST: ${post.title}`,
      href: `/blog/${post.slug}`,
      color: "text-accent",
    });
  });

  // Sort descending
  feed.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>system log</span>
        <span className="text-muted">{feed.length} entries</span>
      </div>
      <div className="dash-card-body space-y-2 max-h-[280px] overflow-y-auto">
        {feed.map((entry, i) => {
          const inner = (
            <div
              className={`flex items-start gap-2 font-mono text-xs leading-relaxed ${
                entry.href ? "cursor-pointer hover:text-accent transition-colors" : ""
              }`}
            >
              <span className="text-muted whitespace-nowrap">
                [{entry.date}]
              </span>
              <span className={entry.color}>{entry.icon}</span>
              <span className="text-muted-foreground">{entry.label}</span>
            </div>
          );

          return entry.href ? (
            <Link key={i} href={entry.href}>
              {inner}
            </Link>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
