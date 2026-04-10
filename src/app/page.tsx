import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Awards } from "@/components/sections/awards";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Awards />
      <Blog posts={posts} />
      <Contact />
    </>
  );
}
