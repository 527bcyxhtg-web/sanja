"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProceduralShapesProps {
  count?: number;
  shape?: "sphere" | "box" | "torus" | "icosahedron";
  spread?: number;
  color?: string;
  animate?: boolean;
  metalness?: number;
  roughness?: number;
}

export function ProceduralShapes({
  count = 50,
  shape = "sphere",
  spread = 10,
  color = "#667eea",
  animate = true,
  metalness = 0.35,
  roughness = 0.28,
}: ProceduralShapesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        )
      );
    }
    return pos;
  }, [count, spread]);

  useFrame((state) => {
    if (!meshRef.current || !animate) return;

    const time = state.clock.elapsedTime;

    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.rotation.set(
        time * 0.1 + i,
        time * 0.2 + i * 0.5,
        time * 0.05
      );
      dummy.scale.setScalar(0.5 + Math.sin(time + i) * 0.2);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "box":
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
      case "torus":
        return new THREE.TorusGeometry(0.3, 0.1, 16, 32);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(0.4, 0);
      default:
        return new THREE.SphereGeometry(0.3, 16, 16);
    }
  }, [shape]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </instancedMesh>
  );
}
