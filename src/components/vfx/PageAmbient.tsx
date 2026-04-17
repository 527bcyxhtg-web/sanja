"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./PageAmbient.module.css";

export default function PageAmbient() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div
        className={`${styles.layer} ${reducedMotion ? styles.reduced : ""}`}
        aria-hidden
      />
      <div
        className={`${styles.layerDeep} ${reducedMotion ? styles.reduced : ""}`}
        aria-hidden
      />
      <div
        className={`${styles.lightLeak} ${reducedMotion ? styles.reduced : ""}`}
        aria-hidden
      />
      <div
        className={`${styles.grainShift} ${reducedMotion ? styles.grainReduced : ""}`}
        aria-hidden
      />
      <div
        className={`${styles.warmBloom} ${reducedMotion ? styles.warmBloomReduced : ""}`}
        aria-hidden
      />
    </>
  );
}
