import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog post";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return renderOgImage({
    eyebrow: "Blog Post",
    title: post?.title ?? "SAGAR_OS",
  });
}
