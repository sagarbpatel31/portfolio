import { Hero } from "@/components/sections/hero";
import { SelectedImpact } from "@/components/sections/selected-impact";
import { StackMap } from "@/components/sections/stack-map";
import { HiringSignal } from "@/components/sections/hiring-signal";
import { CaseStudies } from "@/components/sections/case-studies";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { Dashboard } from "@/components/dashboard";
import { BootWrapper } from "@/components/boot-wrapper";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  // Extract blog data for the activity card (serializable)
  const blogEntries = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
  }));
  const latestPosts = posts.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
    excerpt: post.excerpt,
  }));

  return (
    <BootWrapper>
      <Hero />
      <SelectedImpact />
      <StackMap />
      <HiringSignal />
      <CaseStudies />
      <LatestBlogs posts={latestPosts} />
      <Dashboard blogEntries={blogEntries} />
    </BootWrapper>
  );
}
