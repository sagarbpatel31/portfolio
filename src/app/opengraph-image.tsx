import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SAGAR_OS — Systems & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,255,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00fff5, #10b981, #00fff5)",
          }}
        />

        {/* SAGAR_OS badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "rgba(0,255,245,0.1)",
              border: "1px solid rgba(0,255,245,0.3)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00fff5",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            S
          </div>
          <span
            style={{
              color: "#e2e8f0",
              fontSize: "16px",
              letterSpacing: "0.15em",
            }}
          >
            SAGAR
            <span style={{ color: "#00fff5" }}>_</span>
            OS
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#e2e8f0",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Sagar{" "}
          <span
            style={{
              color: "#00fff5",
            }}
          >
            Patel
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            marginBottom: "40px",
            letterSpacing: "0.02em",
          }}
        >
          Senior Embedded Software Engineer & AI Software Engineer
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Embedded Linux", "Edge AI", "ROS2", "DPDK", "Jetson Orin", "Gen AI"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(0,255,245,0.05)",
                  border: "1px solid rgba(0,255,245,0.2)",
                  borderRadius: "4px",
                  padding: "6px 14px",
                  color: "#00fff5",
                  fontSize: "14px",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Status bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "44px",
            borderTop: "1px solid #1e293b",
            background: "rgba(10,15,26,0.95)",
            display: "flex",
            alignItems: "center",
            padding: "0 80px",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#64748b",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: "#10b981" }}>● SYS:ONLINE</span>
          <span>LOC: Riverside, CA</span>
          <span style={{ color: "#f59e0b" }}>STATUS: Open to roles</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
