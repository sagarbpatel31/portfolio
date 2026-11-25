import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { profile } from "@/content/profile";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sagar Patel | Embedded Systems & Firmware Validation";

export default function Image() {
  return renderOgImage({
    eyebrow: "Embedded Systems & Firmware Validation",
    title: profile.name,
  });
}
