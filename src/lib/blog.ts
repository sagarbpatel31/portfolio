import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));

  return files
    .map(filename => {
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
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug);
}
