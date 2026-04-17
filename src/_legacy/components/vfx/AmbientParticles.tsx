"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

interface AmbientParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  mouseRepulsion?: boolean;
}

export function AmbientParticles({
  count = 100,
  spread = 20,
  color = "#ffffff",
  size = 0.05,
  mouseRepulsion = true,
}: AmbientParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;

      vel.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    return [pos, vel];
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    // Update mouse position in normalized device coordinates
    if (mouseRepulsion) {
      mouseRef.current.x = (state.pointer.x * spread) / 2;
      mouseRef.current.y = (state.pointer.y * spread) / 2;
    }

    for (let i = 0; i < count; i++) {
      // Apply velocity
      array[i * 3] += velocities[i].x;
      array[i * 3 + 1] += velocities[i].y;
      array[i * 3 + 2] += velocities[i].z;

      // Mouse repulsion
      if (mouseRepulsion) {
        const dx = array[i * 3] - mouseRef.current.x;
        const dy = array[i * 3 + 1] - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          const force = (2 - dist) * 0.01;
          array[i * 3] += (dx / dist) * force;
          array[i * 3 + 1] += (dy / dist) * force;
        }
      }

      // Wrap around boundaries
      if (array[i * 3] > spread / 2) array[i * 3] = -spread / 2;
      if (array[i * 3] < -spread / 2) array[i * 3] = spread / 2;
      if (array[i * 3 + 1] > spread / 2) array[i * 3 + 1] = -spread / 2;
      if (array[i * 3 + 1] < -spread / 2) array[i * 3 + 1] = spread / 2;
      if (array[i * 3 + 2] > spread / 2) array[i * 3 + 2] = -spread / 2;
      if (array[i * 3 + 2] < -spread / 2) array[i * 3 + 2] = spread / 2;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Float>
  );
}
