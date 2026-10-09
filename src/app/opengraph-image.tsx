import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { profile } from "@/content/profile";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SAGAR_OS — Software Validation & Systems AI Engineer";

export default function Image() {
  return renderOgImage({
    eyebrow: "Software Validation + Systems AI",
    title: profile.name,
  });
}
