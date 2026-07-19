import { ImageResponse } from "next/og";

export const alt = "Kuvoco — websites for Washington service businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          background:
            "radial-gradient(circle at 82% 18%, rgba(34,211,238,.25), transparent 34%), linear-gradient(135deg, #080b12 0%, #0d1726 58%, #111c2d 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              color: "#071018",
              background: "#22d3ee",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 750, letterSpacing: -1 }}>
            Kuvoco
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 940 }}>
          <div style={{ display: "flex", color: "#67e8f9", fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>
            WASHINGTON SERVICE BUSINESSES
          </div>
          <div style={{ display: "flex", fontSize: 66, lineHeight: 1.05, fontWeight: 800, letterSpacing: -3 }}>
            Websites built to turn local attention into real inquiries.
          </div>
          <div style={{ display: "flex", color: "#aebbd0", fontSize: 26 }}>
            Clear scope · one-time project pricing · no mandatory monthly plan
          </div>
        </div>
      </div>
    ),
    size,
  );
}
