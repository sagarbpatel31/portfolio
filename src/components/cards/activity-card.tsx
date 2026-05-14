"use client";

import Link from "next/link";
import { awards } from "@/content/awards";

interface BlogEntry {
  slug: string;
  title: string;
  date: string;
}

type FeedEntry = {
  date: string;
  icon: string;
  label: string;
  href?: string;
  external: boolean;
  color: string;
};

export function ActivityCard({ blogEntries }: { blogEntries: BlogEntry[] }) {
  const feed: FeedEntry[] = [];

  awards.forEach((award) => {
    const link = award.links?.[0];
    feed.push({
      date: `${award.year}-01`,
      icon: "★",
      label: `WON: ${award.title}`,
      href: link?.url,
      external: true,
      color: "text-accent-amber",
    });
  });

  blogEntries.forEach((post) => {
    feed.push({
      date: post.date,
      icon: "✎",
      label: `POST: ${post.title}`,
      href: `/blog/${post.slug}`,
      external: false,
      color: "text-accent",
    });
  });

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
              <span className="text-muted whitespace-nowrap">[{entry.date}]</span>
              <span className={entry.color}>{entry.icon}</span>
              <span className="text-muted-foreground flex-1 min-w-0">
                {entry.label}
              </span>
              {entry.href && (
                <span className="text-accent opacity-60 shrink-0">↗</span>
              )}
            </div>
          );

          if (!entry.href) return <div key={i}>{inner}</div>;

          if (entry.external) {
            return (
              <a
                key={i}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            );
          }

          return (
            <Link key={i} href={entry.href}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
