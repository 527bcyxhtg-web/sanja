"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import type { CrochetMorph, CrochetThumbVariant } from "./crochetMorphTypes";
import CrochetProductIllustration from "./CrochetProductIllustration";

type ProductCrochetThumb3DProps = {
  morph: CrochetMorph;
  variant?: CrochetThumbVariant;
  className?: string;
};

/**
 * R3F thumb za karticu ili modal — Canvas na kartici mounta tek u viewportu;
 * modal mounta odmah. Bez Environment/HDRI.
 */
export default function ProductCrochetThumb3D({
  morph,
  variant = "card",
  className,
}: ProductCrochetThumb3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(variant === "modal");

  useEffect(() => {
    if (variant === "modal") return;
    const el = wrapRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) setInView(true);
      },
      { rootMargin: "100px 0px", threshold: 0.06 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [variant]);

  const detail = variant === "modal" ? "modal" : "card";
  const dpr: [number, number] = variant === "modal" ? [1, 2] : [1, 1.5];

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      {inView ? (
        <Canvas
          camera={{ position: [0, 0.15, 5.4], fov: 38 }}
          dpr={dpr}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <ambientLight intensity={0.48} />
          <directionalLight position={[4, 6, 4]} intensity={0.95} />
          <directionalLight position={[-3, 2, -2]} intensity={0.28} color="#f5ead8" />
          <Suspense fallback={null}>
            <Float speed={1.35} rotationIntensity={0.22} floatIntensity={0.32}>
              <CrochetProductIllustration morph={morph} detail={detail} />
            </Float>
            <ContactShadows
              position={[0, -1.65, 0]}
              opacity={0.32}
              scale={7}
              blur={2.2}
              far={4.5}
            />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
