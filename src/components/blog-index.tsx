"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, X } from "lucide-react";

const PAGE_SIZE = 12;

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showAllTags, setShowAllTags] = useState(false);

  // All unique tags sorted by frequency
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  const filtered = useMemo(() => {
    const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return posts.filter((p) => {
      // Tag filter: post must have ALL active tags
      if (activeTags.length > 0) {
        const lowered = p.tags.map((t) => t.toLowerCase());
        if (!activeTags.every((t) => lowered.includes(t.toLowerCase())))
          return false;
      }
      // Search: title, excerpt, tags
      if (queryTerms.length > 0) {
        const haystack = (
          p.title +
          " " +
          p.excerpt +
          " " +
          p.tags.join(" ")
        ).toLowerCase();
        if (!queryTerms.every((term) => haystack.includes(term))) return false;
      }
      return true;
    });
  }, [posts, query, activeTags]);

  const toggleTag = (tag: string) => {
    setVisibleCount(PAGE_SIZE);
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setQuery("");
    setActiveTags([]);
    setVisibleCount(PAGE_SIZE);
  };

  const hasFilters = query.trim().length > 0 || activeTags.length > 0;
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 10);
  const visiblePosts = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="dash-card">
        <div className="dash-card-body space-y-4">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by title, summary, or topic..."
              className="w-full rounded border border-border bg-surface py-2 pl-9 pr-9 font-mono text-sm text-foreground outline-none placeholder:text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              aria-label="Search blog posts"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setVisibleCount(PAGE_SIZE);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map(({ tag, count }) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] transition-all ${
                    active
                      ? "border-accent/60 bg-accent/15 text-accent"
                      : "border-border bg-surface/50 text-muted-foreground hover:border-accent/30 hover:text-accent"
                  }`}
                >
                  {tag}
                  <span className="ml-1 opacity-50">{count}</span>
                </button>
              );
            })}
            {allTags.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllTags((current) => !current)}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                {showAllTags ? "fewer topics" : `+${allTags.length - 10} topics`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>
          Showing {visiblePosts.length} of {filtered.length}{" "}
          {filtered.length === 1 ? "post" : "posts"}
          {hasFilters && ` (${posts.length} total)`}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-accent hover:text-accent-light transition-colors"
          >
            clear filters ✕
          </button>
        )}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="dash-card">
          <div className="dash-card-body py-12 text-center font-mono text-sm text-muted">
            No posts match your filters.
            <button
              type="button"
              onClick={clearAll}
              className="ml-2 text-accent hover:underline"
            >
              reset
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visiblePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="dash-card group flex flex-col transition-colors hover:border-accent/30"
            >
              <div className="dash-card-body flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-accent/20 bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {visiblePosts.length < filtered.length && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-md border border-border bg-card px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-accent/30 hover:text-accent"
          >
            Show {Math.min(PAGE_SIZE, filtered.length - visiblePosts.length)} more
          </button>
        </div>
      )}
    </div>
  );
}
