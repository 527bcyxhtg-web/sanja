"use client";

import { Environment, ContactShadows, SoftShadows } from "@react-three/drei";

interface LightingRigProps {
  keyIntensity?: number;
  fillIntensity?: number;
  rimIntensity?: number;
  environment?: "studio" | "sunset" | "dawn" | "night" | "city";
  showContactShadows?: boolean;
}

export function LightingRig({
  keyIntensity = 1.5,
  fillIntensity = 0.5,
  rimIntensity = 1,
  environment = "studio",
  showContactShadows = true,
}: LightingRigProps) {
  return (
    <>
      {/* Key Light - Directional */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={keyIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      {/* Fill Light - Ambient */}
      <ambientLight intensity={fillIntensity} />

      {/* Rim Light - Spot */}
      <spotLight
        position={[-5, 5, -5]}
        intensity={rimIntensity}
        angle={Math.PI / 6}
        penumbra={0.5}
        castShadow
      />

      {/* Environment Map */}
      <Environment preset={environment} background={false} />

      {/* Soft Shadows */}
      <SoftShadows size={10} samples={16} focus={0.5} />

      {/* Contact Shadows */}
      {showContactShadows && (
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={20}
          blur={2}
          far={5}
        />
      )}
    </>
  );
}
