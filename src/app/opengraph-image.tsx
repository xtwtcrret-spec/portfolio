import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  let photoDataUri: string | null = null;
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "profile.jpg"));
    photoDataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    photoDataUri = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #090D16 0%, #0D1117 55%, #101828 100%)",
          color: "#F3F4F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {photoDataUri && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoDataUri}
              width="132"
              height="132"
              alt=""
              style={{ borderRadius: "9999px", border: "4px solid #3B82F6" }}
            />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "26px",
              color: "#9CA3AF",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                background: "#22C55E",
                display: "flex",
              }}
            />
            {site.availability}
          </div>
        </div>
        <div
          style={{
            fontSize: "88px",
            fontWeight: 800,
            letterSpacing: "-2px",
            marginTop: "32px",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: "40px",
            marginTop: "18px",
            display: "flex",
            background: "linear-gradient(90deg, #3B82F6, #6366F1)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.role.en}
        </div>
        <div style={{ fontSize: "28px", color: "#6B7280", marginTop: "26px", display: "flex" }}>
          {site.tagline.en}
        </div>
      </div>
    ),
    size
  );
}
