import { ImageResponse } from "next/og";

// Branded iOS home-screen icon: the pink Borrel 35 sticker on the dark ink
// ground, matching app/icon.svg. next/og renders this to a PNG at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1120",
        }}
      >
        {/* Giraffe-gold spark accent */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "#f2c22e",
            border: "8px solid #16111e",
          }}
        />
        {/* Hot-pink graffiti sticker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 114,
            borderRadius: 26,
            background: "#f5407c",
            border: "11px solid #16111e",
            transform: "rotate(-7deg)",
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#fbf6ea",
              letterSpacing: "-4px",
            }}
          >
            35
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
