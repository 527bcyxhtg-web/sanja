"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ShopHero3D.module.css";

const PlushScene3D = dynamic(
  () => import("../3d/PlushScene3D"),
  {
    ssr: false,
    loading: () => <div className={styles.placeholder} aria-hidden />,
  }
);

export default function ShopHero3D() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={styles.fallback} aria-hidden>
        <div className={styles.fallbackInner} />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <PlushScene3D />
    </div>
  );
}
