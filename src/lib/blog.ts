import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));

  const posts = files
    .map(filename => {
      try {
        const slug = filename.replace(/\.mdx$/, "");
        const filePath = path.join(BLOG_DIR, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const stats = readingTime(content);

        return {
          slug,
          title: data.title,
          date: data.date,
          readingTime: stats.text,
          tags: data.tags || [],
          excerpt:
            data.excerpt ||
            content
              .slice(0, 160)
              .replace(/[#*`\n]/g, "")
              .trim() + "...",
          content,
        };
      } catch {
        console.warn(`Skipping malformed blog post: ${filename}`);
        return null;
      }
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cache = posts;
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug);
}
