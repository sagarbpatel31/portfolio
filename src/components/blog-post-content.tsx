"use client";

import Link from "next/link";
import { MarkdownContent } from "@/components/markdown-content";

export function BlogPostContent({ content }: { content: string }) {
  return (
    <>
      <MarkdownContent content={content} />
      <div className="mt-12 border-t border-border pt-6">
        <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
          All engineering notes
        </Link>
      </div>
    </>
  );
}
