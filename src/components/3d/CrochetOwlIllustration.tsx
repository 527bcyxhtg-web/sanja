"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { makeCrochetMat, makeGlossMat, disposeMats } from "./crochetMaterials";

type Props = { seg?: number };

export default function CrochetOwlIllustration({ seg: segProp }: Props) {
  const groupRef = useRef<Group>(null);
  const seg = Math.max(16, segProp ?? 22);

  const materials = useMemo(
    () => ({
      body: makeCrochetMat("#b89a72", 0.9, 0.08),
      wing: makeCrochetMat("#8a6e4e", 0.88, 0.06),
      belly: makeCrochetMat("#e8dcc8", 0.85, 0.06),
      eye: makeGlossMat("#c9a96e"),
      pupil: makeCrochetMat("#2a1f18", 0.35, 0.15),
    }),
    []
  );

  useEffect(() => {
    return () =>
      disposeMats(
        materials.body,
        materials.wing,
        materials.belly,
        materials.eye,
        materials.pupil
      );
  }, [materials]);

  useFrame((state) => {
    const g = groupRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, -0.55, 0]} scale={0.4}>
      <mesh position={[0, 0.4, 0]} scale={[1.15, 1.05, 0.88]} material={materials.body}>
        <sphereGeometry args={[1.1, seg, seg]} />
      </mesh>
      <mesh position={[0, -0.15, 0.55]} scale={[0.75, 0.9, 0.35]} material={materials.belly}>
        <sphereGeometry args={[0.85, seg, seg]} />
      </mesh>
      <mesh position={[-1.25, 0.35, 0.1]} rotation={[0, 0, 0.15]} scale={[0.35, 1.1, 0.12]} material={materials.wing}>
        <sphereGeometry args={[1, 12, 12]} />
      </mesh>
      <mesh position={[1.25, 0.35, 0.1]} rotation={[0, 0, -0.15]} scale={[0.35, 1.1, 0.12]} material={materials.wing}>
        <sphereGeometry args={[1, 12, 12]} />
      </mesh>
      <mesh position={[-0.42, 1.05, 0.75]} material={materials.eye}>
        <sphereGeometry args={[0.28, seg, seg]} />
      </mesh>
      <mesh position={[0.42, 1.05, 0.75]} material={materials.eye}>
        <sphereGeometry args={[0.28, seg, seg]} />
      </mesh>
      <mesh position={[-0.42, 1.05, 0.92]} material={materials.pupil}>
        <sphereGeometry args={[0.12, 12, 12]} />
      </mesh>
      <mesh position={[0.42, 1.05, 0.92]} material={materials.pupil}>
        <sphereGeometry args={[0.12, 12, 12]} />
      </mesh>
      <mesh position={[0, 0.85, 0.95]} material={materials.body}>
        <coneGeometry args={[0.12, 0.35, 8]} />
      </mesh>
      <mesh position={[-0.35, -1.1, 0.5]} rotation={[0.45, 0, -0.1]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.45, 4, 8]} />
      </mesh>
      <mesh position={[0.35, -1.1, 0.5]} rotation={[0.45, 0, 0.1]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.45, 4, 8]} />
      </mesh>
    </group>
  );
}
