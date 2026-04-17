"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeAccentMat, makeCrochetMat, disposeMats } from "./crochetMaterials";

type Props = { seg?: number };

export default function CrochetCatIllustration({ seg: segProp }: Props) {
  const groupRef = useRef<Group>(null);
  const seg = Math.max(16, segProp ?? 22);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat("#9a8a82", 0.9, 0.08),
      accent: makeAccentMat("#c9a96e"),
      detail: makeCrochetMat("#d4c4bc", 0.82, 0.07),
    }),
    []
  );

  useEffect(() => {
    return () => disposeMats(materials.body, materials.accent, materials.detail);
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.14;
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]} scale={0.4}>
      <mesh position={[0, 0.05, 0]} scale={[0.72, 1.05, 0.65]} material={materials.body}>
        <sphereGeometry args={[1.15, seg, seg]} />
      </mesh>
      <mesh position={[0, 1.35, 0]} material={materials.body}>
        <sphereGeometry args={[0.78, seg, seg]} />
      </mesh>
      <mesh position={[-0.35, 1.95, 0]} rotation={[0, 0, -0.55]} material={materials.body}>
        <coneGeometry args={[0.22, 0.65, 8]} />
      </mesh>
      <mesh position={[0.35, 1.95, 0]} rotation={[0, 0, 0.55]} material={materials.body}>
        <coneGeometry args={[0.22, 0.65, 8]} />
      </mesh>
      <mesh position={[0.85, -0.35, 0.15]} rotation={[0, 0, 0.85]} material={materials.body}>
        <capsuleGeometry args={[0.12, 1.1, 4, 10]} />
      </mesh>
      <mesh position={[0, 1.15, 0.72]} material={materials.detail}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
      <mesh position={[-0.12, 1.12, 0.74]} material={materials.detail}>
        <sphereGeometry args={[0.04, 6, 6]} />
      </mesh>
      <mesh position={[0.12, 1.12, 0.74]} material={materials.detail}>
        <sphereGeometry args={[0.04, 6, 6]} />
      </mesh>
      <mesh position={[0, 0.95, 0.68]} material={materials.accent}>
        <torusGeometry args={[0.22, 0.05, 8, 20]} />
      </mesh>
      <mesh position={[-0.55, -1.05, 0.45]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.26, 0.48, 4, 8]} />
      </mesh>
      <mesh position={[0.55, -1.05, 0.45]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.26, 0.48, 4, 8]} />
      </mesh>
    </group>
  );
}
