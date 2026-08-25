"use client";

import { useServerInsertedHTML } from "next/navigation";

const themeInit = `try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.toggle("light",t!=="dark")}catch(e){}`;

export function ThemeInit() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeInit }} />
  ));

  return null;
}
