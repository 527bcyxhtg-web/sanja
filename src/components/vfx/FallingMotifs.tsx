"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./FallingMotifs.module.css";

/** Deterministic presets — stable SSR/hydration */
const MOTIF_PRESETS: ReadonlyArray<{
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
}> = [
  { left: "6%", size: 5, delay: "0s", duration: "16s", drift: "18px" },
  { left: "14%", size: 4, delay: "2.2s", duration: "19s", drift: "-12px" },
  { left: "22%", size: 6, delay: "1s", duration: "14s", drift: "22px" },
  { left: "38%", size: 4, delay: "3.5s", duration: "18s", drift: "-20px" },
  { left: "48%", size: 5, delay: "0.6s", duration: "21s", drift: "10px" },
  { left: "58%", size: 4, delay: "4s", duration: "17s", drift: "-14px" },
  { left: "72%", size: 6, delay: "2.8s", duration: "15s", drift: "16px" },
  { left: "84%", size: 5, delay: "1.4s", duration: "20s", drift: "-18px" },
  { left: "92%", size: 4, delay: "5s", duration: "22s", drift: "8px" },
  { left: "31%", size: 3, delay: "6s", duration: "24s", drift: "-10px" },
  { left: "66%", size: 3, delay: "7s", duration: "23s", drift: "12px" },
];

interface FallingMotifsProps {
  className?: string;
}

export default function FallingMotifs({ className }: FallingMotifsProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div className={`${styles.root} ${className ?? ""}`} aria-hidden>
      {MOTIF_PRESETS.map((m, i) => (
        <span
          key={i}
          className={styles.motif}
          style={
            {
              left: m.left,
              width: m.size,
              height: m.size,
              animationDelay: m.delay,
              animationDuration: m.duration,
              "--drift": m.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
