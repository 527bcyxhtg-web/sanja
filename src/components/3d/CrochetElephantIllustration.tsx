"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeAccentMat, makeCrochetMat, disposeMats } from "./crochetMaterials";

type Props = { seg?: number };

export default function CrochetElephantIllustration({ seg: segProp }: Props) {
  const groupRef = useRef<Group>(null);
  const seg = Math.max(16, segProp ?? 22);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat("#a8a4a0", 0.9, 0.08),
      earIn: makeCrochetMat("#d8cfc4", 0.84, 0.06),
      accent: makeAccentMat("#8a8580"),
    }),
    []
  );

  useEffect(() => {
    return () => disposeMats(materials.body, materials.earIn, materials.accent);
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={0.36}>
      <mesh position={[0, 0.35, 0]} scale={[1.1, 0.95, 0.88]} material={materials.body}>
        <sphereGeometry args={[1.2, seg, seg]} />
      </mesh>
      <mesh position={[0, 1.25, -0.15]} material={materials.body}>
        <sphereGeometry args={[0.82, seg, seg]} />
      </mesh>
      <mesh position={[-1.15, 1.05, 0.05]} rotation={[0, 0.25, 0]} scale={[0.22, 0.85, 0.55]} material={materials.body}>
        <sphereGeometry args={[1, 14, 14]} />
      </mesh>
      <mesh position={[1.15, 1.05, 0.05]} rotation={[0, -0.25, 0]} scale={[0.22, 0.85, 0.55]} material={materials.body}>
        <sphereGeometry args={[1, 14, 14]} />
      </mesh>
      <mesh position={[-1.05, 1.05, 0.12]} scale={[0.85, 0.75, 0.35]} material={materials.earIn}>
        <sphereGeometry args={[0.35, 12, 12]} />
      </mesh>
      <mesh position={[1.05, 1.05, 0.12]} scale={[0.85, 0.75, 0.35]} material={materials.earIn}>
        <sphereGeometry args={[0.35, 12, 12]} />
      </mesh>
      <mesh position={[0, 1.05, 0.95]} material={materials.body}>
        <sphereGeometry args={[0.14, 12, 12]} />
      </mesh>
      <mesh position={[0, 0.85, 1.15]} material={materials.body}>
        <sphereGeometry args={[0.12, 10, 10]} />
      </mesh>
      <mesh position={[0, 0.72, 1.35]} material={materials.body}>
        <sphereGeometry args={[0.1, 10, 10]} />
      </mesh>
      <mesh position={[0, 0.58, 1.52]} material={materials.accent}>
        <sphereGeometry args={[0.08, 8, 8]} />
      </mesh>
      <mesh position={[-0.55, -1.15, 0.55]} rotation={[0.35, 0, -0.15]} scale={[1.1, 0.85, 1]} material={materials.body}>
        <sphereGeometry args={[0.38, 12, 12]} />
      </mesh>
      <mesh position={[0.55, -1.15, 0.55]} rotation={[0.35, 0, 0.15]} scale={[1.1, 0.85, 1]} material={materials.body}>
        <sphereGeometry args={[0.38, 12, 12]} />
      </mesh>
      <mesh position={[-1.15, 0.15, 0.25]} rotation={[0, 0, -0.4]} material={materials.body}>
        <capsuleGeometry args={[0.24, 0.65, 4, 8]} />
      </mesh>
      <mesh position={[1.15, 0.15, 0.25]} rotation={[0, 0, 0.4]} material={materials.body}>
        <capsuleGeometry args={[0.24, 0.65, 4, 8]} />
      </mesh>
    </group>
  );
}
