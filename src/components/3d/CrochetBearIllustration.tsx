"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeAccentMat, makeCrochetMat, disposeMats } from "./crochetMaterials";

export type BearAppearance = "bear" | "teddyWarm" | "teddyDust" | "teddyMocha";

const PALETTES: Record<
  BearAppearance,
  { body: string; accent: string; detail: string }
> = {
  bear: { body: "#c9a574", accent: "#8b6914", detail: "#f5ebe0" },
  teddyWarm: { body: "#e8b4b8", accent: "#d4af37", detail: "#faf7f0" },
  teddyDust: { body: "#c4aeb5", accent: "#b8a078", detail: "#ebe4dc" },
  teddyMocha: { body: "#a88b7d", accent: "#c9a96e", detail: "#f2ebe4" },
};

type CrochetBearIllustrationProps = {
  appearance: BearAppearance;
  /** Više segmenata u modalu za glađi „HD“ dojam */
  seg?: number;
};

export default function CrochetBearIllustration({
  appearance,
  seg: segProp,
}: CrochetBearIllustrationProps) {
  const groupRef = useRef<Group>(null);
  const hex = PALETTES[appearance];
  const seg = Math.max(16, segProp ?? 24);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat(hex.body, 0.9, 0.08),
      accent: makeAccentMat(hex.accent),
      detail: makeCrochetMat(hex.detail, 0.82, 0.08),
    }),
    [hex.body, hex.accent, hex.detail]
  );

  useEffect(() => {
    return () => disposeMats(materials.body, materials.accent, materials.detail);
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) {
      g.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.38}>
      <mesh position={[0, 0, 0]} material={materials.body}>
        <sphereGeometry args={[1.2, seg, seg]} />
      </mesh>
      <mesh position={[0, 1.4, 0]} material={materials.body}>
        <sphereGeometry args={[0.9, seg, seg]} />
      </mesh>
      <mesh position={[-0.7, 2, 0]} material={materials.body}>
        <sphereGeometry args={[0.35, seg, seg]} />
      </mesh>
      <mesh position={[0.7, 2, 0]} material={materials.body}>
        <sphereGeometry args={[0.35, seg, seg]} />
      </mesh>
      <mesh position={[-0.7, 2, 0.15]} material={materials.detail}>
        <sphereGeometry args={[0.2, 16, 16]} />
      </mesh>
      <mesh position={[0.7, 2, 0.15]} material={materials.detail}>
        <sphereGeometry args={[0.2, 16, 16]} />
      </mesh>
      <mesh position={[-0.35, 1.4, 0.7]} material={materials.accent}>
        <sphereGeometry args={[0.12, 12, 12]} />
      </mesh>
      <mesh position={[0.35, 1.4, 0.7]} material={materials.accent}>
        <sphereGeometry args={[0.12, 12, 12]} />
      </mesh>
      <mesh position={[0, 1.25, 0.8]} material={materials.accent}>
        <sphereGeometry args={[0.08, 12, 12]} />
      </mesh>
      <mesh position={[-1.2, 0.3, 0.3]} rotation={[0, 0, -0.5]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      </mesh>
      <mesh position={[1.2, 0.3, 0.3]} rotation={[0, 0, 0.5]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      </mesh>
      <mesh position={[-0.5, -1.2, 0.5]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
      </mesh>
      <mesh position={[0.5, -1.2, 0.5]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.2, 0.9]} material={materials.detail}>
        <circleGeometry args={[0.4, 28]} />
      </mesh>
      <mesh position={[0, 0.8, 0.8]} material={materials.accent}>
        <torusGeometry args={[0.25, 0.08, 8, 16]} />
      </mesh>
    </group>
  );
}
