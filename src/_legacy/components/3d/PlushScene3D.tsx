"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import PlushToy from "./PlushToy";
import styles from "./PlushScene3D.module.css";

export default function PlushScene3D() {
  return (
    <div className={styles.scene}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#d4af37" />
        
        <Suspense fallback={null}>
          <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
          >
            <PlushToy />
          </Float>
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={8} 
            blur={2.5} 
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      <div className={styles.glow} />
    </div>
  );
}
