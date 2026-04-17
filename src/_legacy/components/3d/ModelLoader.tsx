"use client";

import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { useState, useEffect } from "react";
import * as THREE from "three";

interface ModelLoaderProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  draco?: boolean;
  ktx2?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function ModelLoader({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  draco = true,
  ktx2 = false,
  onLoad,
  onError,
}: ModelLoaderProps) {
  const [error, setError] = useState<Error | null>(null);

  const dracoLoader = draco
    ? new DRACOLoader().setDecoderPath("/draco/")
    : undefined;

  const ktx2Loader = ktx2
    ? new KTX2Loader().setTranscoderPath("/basis/")
    : undefined;

  try {
    const gltf = useLoader(GLTFLoader, url, (loader) => {
      if (dracoLoader) loader.setDRACOLoader(dracoLoader);
      if (ktx2Loader) loader.setKTX2Loader(ktx2Loader);
    });

    useEffect(() => {
      if (gltf && onLoad) onLoad();
    }, [gltf]);

    if (!gltf) return null;

    return (
      <primitive
        object={gltf.scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    );
  } catch (err) {
    if (!error) {
      const loadError = err instanceof Error ? err : new Error("Failed to load model");
      setError(loadError);
      if (onError) onError(loadError);
    }
    return null;
  }
}

// Preload helper
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
