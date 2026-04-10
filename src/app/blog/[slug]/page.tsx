import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BlogPostContent } from "@/components/blog-post-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — Sagar Patel` };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <nav aria-label="Back to blog">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to all posts
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <BlogPostContent content={post.content} />
      </Container>
    </section>
  );
}
