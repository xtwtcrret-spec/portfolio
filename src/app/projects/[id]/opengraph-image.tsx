import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return new ImageResponse(<div>Not found</div>, size);
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
        <div
          style={{
            fontSize: "24px",
            color: "#9CA3AF",
            display: "flex",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          {project.category} · {project.year}
        </div>
        <div
          style={{
            fontSize: "84px",
            fontWeight: 800,
            letterSpacing: "-2px",
            marginTop: "28px",
            display: "flex",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            width: "220px",
            height: "10px",
            borderRadius: "999px",
            marginTop: "34px",
            background: "linear-gradient(90deg, #3B82F6, #6366F1)",
            display: "flex",
          }}
        />
        <div style={{ fontSize: "30px", color: "#6B7280", marginTop: "30px", display: "flex" }}>
          Case study by Raihan Farhani
        </div>
      </div>
    ),
    size
  );
}
