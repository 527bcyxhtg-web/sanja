"use client";

import { ReactNode } from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "rgba(102, 126, 234, 0.5)",
}: GlassCardProps) {
  return (
    <div
      className={`${styles.glassCard} ${className}`}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
    >
      <div className={styles.glassContent}>{children}</div>
      <div className={styles.glassBorder} />
    </div>
  );
}
