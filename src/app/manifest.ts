import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAGAR_OS",
    short_name: "SAGAR_OS",
    description:
      "Portfolio and resume for Sagar Patel, a Systems & AI Engineer focused on embedded Linux, networking, edge AI, and robotics systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1a",
    theme_color: "#00fff5",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
