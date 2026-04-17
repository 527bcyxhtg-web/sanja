"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeAccentMat, makeCrochetMat, disposeMats } from "./crochetMaterials";

type Props = { seg?: number };

export default function CrochetPuppyIllustration({ seg: segProp }: Props) {
  const groupRef = useRef<Group>(null);
  const seg = Math.max(16, segProp ?? 22);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat("#c4a88a", 0.9, 0.08),
      accent: makeAccentMat("#8b5a3c"),
      scarf: makeCrochetMat("#7a9a7a", 0.86, 0.08),
    }),
    []
  );

  useEffect(() => {
    return () => disposeMats(materials.body, materials.accent, materials.scarf);
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, -0.28, 0]} scale={0.4}>
      <mesh position={[0, -0.05, 0]} scale={[0.95, 0.88, 0.82]} material={materials.body}>
        <sphereGeometry args={[1.15, seg, seg]} />
      </mesh>
      <mesh position={[0, 1.25, 0]} scale={[1.05, 1, 0.92]} material={materials.body}>
        <sphereGeometry args={[0.95, seg, seg]} />
      </mesh>
      <mesh position={[-0.85, 1.35, 0.1]} rotation={[0.1, 0, 0.65]} material={materials.body}>
        <capsuleGeometry args={[0.16, 0.55, 4, 8]} />
      </mesh>
      <mesh position={[0.85, 1.35, 0.1]} rotation={[0.1, 0, -0.65]} material={materials.body}>
        <capsuleGeometry args={[0.16, 0.55, 4, 8]} />
      </mesh>
      <mesh position={[-0.28, 1.35, 0.72]} material={materials.accent}>
        <sphereGeometry args={[0.11, 10, 10]} />
      </mesh>
      <mesh position={[0.28, 1.35, 0.72]} material={materials.accent}>
        <sphereGeometry args={[0.11, 10, 10]} />
      </mesh>
      <mesh position={[0, 1.18, 0.88]} material={materials.accent}>
        <sphereGeometry args={[0.14, 12, 12]} />
      </mesh>
      <mesh position={[0, 0.85, 0.78]} rotation={[0.25, 0, 0]} material={materials.scarf}>
        <torusGeometry args={[0.38, 0.09, 10, 28]} />
      </mesh>
      <mesh position={[-1.05, 0.25, 0.2]} rotation={[0, 0, -0.35]} material={materials.body}>
        <capsuleGeometry args={[0.26, 0.72, 4, 8]} />
      </mesh>
      <mesh position={[1.05, 0.25, 0.2]} rotation={[0, 0, 0.35]} material={materials.body}>
        <capsuleGeometry args={[0.26, 0.72, 4, 8]} />
      </mesh>
      <mesh position={[-0.48, -1.1, 0.48]} rotation={[0.52, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.52, 4, 8]} />
      </mesh>
      <mesh position={[0.48, -1.1, 0.48]} rotation={[0.52, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.52, 4, 8]} />
      </mesh>
    </group>
  );
}
