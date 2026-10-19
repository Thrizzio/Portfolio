import { ImageResponse } from "next/og";

export const alt = "Aadi — CS Undergrad & AI Product Builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0F0B1E",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(124, 139, 255, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 92, 168, 0.25) 0%, transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#C8FF3D",
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            PORTFOLIO 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "110px",
              fontWeight: 800,
              color: "#C8FF3D",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Aadi<span style={{ color: "#FF5CA8" }}>.</span>
          </div>

          <div
            style={{
              fontSize: "32px",
              color: "#F4F0FF",
              marginTop: "24px",
              fontWeight: 500,
              maxWidth: "850px",
              lineHeight: 1.35,
            }}
          >
            CS Undergrad building AI/LLM-powered products — Node.js, Next.js, Claude API, RAG, and Flutter.
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {["AI / LLM", "Full-Stack", "Backend", "Mobile"].map((role) => (
            <div
              key={role}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#D9D2F2",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
