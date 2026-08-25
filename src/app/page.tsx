import fs from "node:fs";
import path from "node:path";
import { HomeClient } from "@/components/HomeClient";

function publicFileExists(name: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", name));
  } catch {
    return false;
  }
}

export default function Home() {
  return (
    <HomeClient
      hasPhoto={publicFileExists("profile.jpg")}
      hasCv={publicFileExists("cv.pdf")}
    />
  );
}
