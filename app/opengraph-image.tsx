import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Elliyeen Research — Engineer Higher Revenue";
export const size = { width: 1200, height: 630 };
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
          background: "#080713",
          padding: "72px 80px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              border: "1.5px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "19px",
              fontWeight: 800,
            }}
          >
            E
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            ELLIYEEN RESEARCH
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: "88px",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Engineer Higher
          </div>
          <div
            style={{
              color: "#1B5EA8",
              fontSize: "88px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Revenue.
          </div>
          <div
            style={{
              marginTop: "30px",
              color: "rgba(255,255,255,0.45)",
              fontSize: "23px",
              fontWeight: 400,
              lineHeight: 1.55,
              maxWidth: "620px",
            }}
          >
            AI-powered revenue engineering for growth-focused organizations.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "15px",
              letterSpacing: "0.05em",
            }}
          >
            elliyeen-get-started.pages.dev
          </span>

          {/* Decorative bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "7px" }}>
            {[38, 58, 44, 72, 52, 90, 66].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "11px",
                  height: `${h * 0.62}px`,
                  borderRadius: "4px",
                  background:
                    i === 5
                      ? "#1B5EA8"
                      : i === 6
                      ? "#85BB65"
                      : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
