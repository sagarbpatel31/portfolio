import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const HOST = new URL(SITE_URL).host;

export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0f1a",
          padding: "64px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#f43f5e" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#f59e0b" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#10b981" }} />
          </div>
          <div style={{ color: "#64748b", fontSize: 24 }}>~/sagar-os</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ color: "#00fff5", fontSize: 26, letterSpacing: 6 }}>
            {eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <div style={{ color: "#00fff5", fontSize: 60, fontWeight: 700 }}>{">"}</div>
            <div
              style={{
                color: "#e2e8f0",
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {title}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "#1e293b",
            paddingTop: "24px",
          }}
        >
          <div style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 600 }}>Sagar Patel</div>
          <div style={{ color: "#64748b", fontSize: 24 }}>{HOST}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
