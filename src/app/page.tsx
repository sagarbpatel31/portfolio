import { Hero } from "@/components/sections/hero";
import { SelectedImpact } from "@/components/sections/selected-impact";
import { HomeTerminal } from "@/components/sections/home-terminal";
import { CaseStudies } from "@/components/sections/case-studies";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { HomeDirectory } from "@/components/sections/home-directory";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 1).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
  }));

  return (
    <>
      <Hero />
      <SelectedImpact />
      <HomeTerminal />
      <CaseStudies />
      <HomeDirectory postCount={posts.length} />
      <LatestBlogs posts={latestPosts} />
    </>
  );
}
