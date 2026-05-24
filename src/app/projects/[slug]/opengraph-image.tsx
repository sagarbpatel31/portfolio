import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { projects } from "@/content/projects";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Project";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return renderOgImage({
    eyebrow: "Project",
    title: project?.title ?? "SAGAR_OS",
  });
}
