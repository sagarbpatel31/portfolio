import { Hero } from "@/components/sections/hero";
import { HiringSignal } from "@/components/sections/hiring-signal";
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

  return (
    <BootWrapper>
      <Hero />
      <HiringSignal />
      <Dashboard blogEntries={blogEntries} />
    </BootWrapper>
  );
}
