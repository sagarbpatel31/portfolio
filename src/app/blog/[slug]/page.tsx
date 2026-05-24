import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { BlogPostContent } from "@/components/blog-post-content";
import { SITE_URL } from "@/lib/site";
import { profile } from "@/content/profile";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
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

  const url = `${SITE_URL}/blog/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
  };

  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Container className="max-w-4xl">
        <nav aria-label="Back to dashboard">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            cd ~/dashboard
          </Link>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5">
            <span className="text-foreground">{post.title}</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="dash-card">
          <div className="dash-card-body">
            <BlogPostContent content={post.content} />
          </div>
        </div>
      </Container>
    </section>
  );
}
