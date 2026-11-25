import { Hero } from "@/components/sections/hero";
import { SelectedImpact } from "@/components/sections/selected-impact";
import { HomeTerminal } from "@/components/sections/home-terminal";
import { CaseStudies } from "@/components/sections/case-studies";
import { LatestBlogs } from "@/components/sections/latest-blogs";
import { HomeDirectory } from "@/components/sections/home-directory";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3).map(({ slug, title, date, readingTime, tags, excerpt }) => ({
    slug, title, date, readingTime, tags, excerpt,
  }));

  return (
    <>
      <Hero />
      <SelectedImpact />
      <CaseStudies />
      <HomeDirectory />
      <LatestBlogs posts={latestPosts} />
      <HomeTerminal />
    </>
  );
}
