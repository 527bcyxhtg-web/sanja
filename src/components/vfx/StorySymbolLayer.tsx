"use client";

import { useId } from "react";
import {
  IconHeart,
  IconInfinity,
  IconSpark,
  IconStar4,
  IconThread,
  IconThreadKnot,
} from "@/components/vfx/icons/storyIcons";
import styles from "./StorySymbolLayer.module.css";

export type StorySymbolVariant = "sparse" | "dense";

interface StorySymbolLayerProps {
  variant: StorySymbolVariant;
  className?: string;
}

/**
 * Decorative floating symbols for section “stories”.
 * No pointer events; CSS-only motion (no mouse tilt).
 */
export default function StorySymbolLayer({
  variant,
  className,
}: StorySymbolLayerProps) {
  const uid = useId().replace(/:/g, "");

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  if (variant === "sparse") {
    return (
      <div className={rootClass} aria-hidden>
        <div className={styles.layer}>
          <span className={`${styles.symbol} ${styles.sSparse1}`}>
            <IconHeart idPrefix={`${uid}s1`} />
          </span>
          <span className={`${styles.symbol} ${styles.sSparse2}`}>
            <IconSpark idPrefix={`${uid}s2`} />
          </span>
          <span className={`${styles.symbol} ${styles.sSparse3}`}>
            <IconThread idPrefix={`${uid}s3`} />
          </span>
          <span className={`${styles.symbol} ${styles.sSparse4}`}>
            <IconInfinity idPrefix={`${uid}s4`} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={rootClass} aria-hidden>
      <div className={styles.layer}>
        <span className={`${styles.symbol} ${styles.sSparse1}`}>
          <IconHeart idPrefix={`${uid}d1`} />
        </span>
        <span className={`${styles.symbol} ${styles.sSparse2}`}>
          <IconStar4 idPrefix={`${uid}d2`} />
        </span>
        <span className={`${styles.symbol} ${styles.sSparse3}`}>
          <IconThreadKnot idPrefix={`${uid}d3`} />
        </span>
        <span className={`${styles.symbol} ${styles.sSparse4}`}>
          <IconInfinity idPrefix={`${uid}d4`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense1}`}>
          <IconSpark idPrefix={`${uid}d5`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense2}`}>
          <IconThread idPrefix={`${uid}d6`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense3}`}>
          <IconHeart idPrefix={`${uid}d7`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense4}`}>
          <IconStar4 idPrefix={`${uid}d8`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense5}`}>
          <IconSpark idPrefix={`${uid}d9`} />
        </span>
        <span className={`${styles.symbol} ${styles.dDense6}`}>
          <IconThread idPrefix={`${uid}d0`} />
        </span>
      </div>
    </div>
  );
}
