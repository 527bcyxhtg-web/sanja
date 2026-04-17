"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeAccentMat, makeCrochetMat, disposeMats } from "./crochetMaterials";

type Props = { seg?: number };

export default function CrochetBunnyIllustration({ seg: segProp }: Props) {
  const groupRef = useRef<Group>(null);
  const seg = Math.max(16, segProp ?? 22);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat("#e8c4c8", 0.9, 0.07),
      accent: makeAccentMat("#c9a96e"),
      detail: makeCrochetMat("#faf5f2", 0.84, 0.06),
    }),
    []
  );

  useEffect(() => {
    return () => disposeMats(materials.body, materials.accent, materials.detail);
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.26) * 0.16;
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} scale={0.42}>
      <mesh position={[0, 0.1, 0]} scale={[0.85, 1.05, 0.75]} material={materials.body}>
        <sphereGeometry args={[1, seg, seg]} />
      </mesh>
      <mesh position={[0, 1.35, 0]} material={materials.body}>
        <sphereGeometry args={[0.72, seg, seg]} />
      </mesh>
      <mesh position={[-0.55, 2.15, 0]} rotation={[0.2, 0, -0.35]} material={materials.body}>
        <capsuleGeometry args={[0.14, 1.15, 4, 10]} />
      </mesh>
      <mesh position={[0.55, 2.15, 0]} rotation={[0.2, 0, 0.35]} material={materials.body}>
        <capsuleGeometry args={[0.14, 1.15, 4, 10]} />
      </mesh>
      <mesh position={[-0.55, 2.95, 0.08]} material={materials.detail}>
        <sphereGeometry args={[0.18, 14, 14]} />
      </mesh>
      <mesh position={[0.55, 2.95, 0.08]} material={materials.detail}>
        <sphereGeometry args={[0.18, 14, 14]} />
      </mesh>
      <mesh position={[-0.28, 1.35, 0.62]} material={materials.accent}>
        <sphereGeometry args={[0.1, 10, 10]} />
      </mesh>
      <mesh position={[0.28, 1.35, 0.62]} material={materials.accent}>
        <sphereGeometry args={[0.1, 10, 10]} />
      </mesh>
      <mesh position={[-0.95, 0.15, 0.25]} rotation={[0, 0, -0.45]} material={materials.body}>
        <capsuleGeometry args={[0.22, 0.65, 4, 8]} />
      </mesh>
      <mesh position={[0.95, 0.15, 0.25]} rotation={[0, 0, 0.45]} material={materials.body}>
        <capsuleGeometry args={[0.22, 0.65, 4, 8]} />
      </mesh>
      <mesh position={[-0.42, -1.05, 0.45]} rotation={[0.55, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.28, 0.5, 4, 8]} />
      </mesh>
      <mesh position={[0.42, -1.05, 0.45]} rotation={[0.55, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.28, 0.5, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.15, 0.78]} material={materials.detail}>
        <circleGeometry args={[0.32, 24]} />
      </mesh>
    </group>
  );
}
