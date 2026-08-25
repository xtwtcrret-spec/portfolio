"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent motion-reduce:hidden [@media(pointer:coarse)]:hidden"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 motion-reduce:hidden [@media(pointer:coarse)]:hidden"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: pressed ? 0.5 : 1,
          scale: pressed ? 0.85 : 1,
          backgroundColor: active ? "var(--accent-soft)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      />
    </>
  );
}
