"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MeshStandardMaterial, SphereGeometry, TorusGeometry, CapsuleGeometry, CircleGeometry } from "three";

export default function PlushToy() {
  const groupRef = useRef<Group>(null);
  
  const materials = useMemo(() => ({
    body: new MeshStandardMaterial({
      color: "#e8b4b8",
      roughness: 0.9,
      metalness: 0.1,
    }),
    accent: new MeshStandardMaterial({
      color: "#d4af37",
      roughness: 0.6,
      metalness: 0.3,
    }),
    detail: new MeshStandardMaterial({
      color: "#faf7f0",
      roughness: 0.8,
      metalness: 0.1,
    }),
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh position={[0, 0, 0]} material={materials.body}>
        <sphereGeometry args={[1.2, 32, 32]} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.4, 0]} material={materials.body}>
        <sphereGeometry args={[0.9, 32, 32]} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.7, 2, 0]} material={materials.body}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      <mesh position={[0.7, 2, 0]} material={materials.body}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      
      {/* Inner Ears */}
      <mesh position={[-0.7, 2, 0.15]} material={materials.detail}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>
      <mesh position={[0.7, 2, 0.15]} material={materials.detail}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.35, 1.4, 0.7]} material={materials.accent}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      <mesh position={[0.35, 1.4, 0.7]} material={materials.accent}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.25, 0.8]} material={materials.accent}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-1.2, 0.3, 0.3]} rotation={[0, 0, -0.5]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      </mesh>
      <mesh position={[1.2, 0.3, 0.3]} rotation={[0, 0, 0.5]} material={materials.body}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.5, -1.2, 0.5]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
      </mesh>
      <mesh position={[0.5, -1.2, 0.5]} rotation={[0.5, 0, 0]} material={materials.body}>
        <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
      </mesh>
      
      {/* Belly Detail */}
      <mesh position={[0, -0.2, 0.9]} material={materials.detail}>
        <circleGeometry args={[0.4, 32]} />
      </mesh>
      
      {/* Gold Bow */}
      <mesh position={[0, 0.8, 0.8]} material={materials.accent}>
        <torusGeometry args={[0.25, 0.08, 8, 16]} />
      </mesh>
    </group>
  );
}
