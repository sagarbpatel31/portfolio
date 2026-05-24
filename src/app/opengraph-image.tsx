import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { profile } from "@/content/profile";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SAGAR_OS — Systems & AI Engineer";

export default function Image() {
  return renderOgImage({
    eyebrow: "Systems & AI Engineer",
    title: profile.name,
  });
}
