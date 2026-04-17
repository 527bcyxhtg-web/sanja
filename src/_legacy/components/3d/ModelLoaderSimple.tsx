"use client";

import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

interface ModelLoaderProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function ModelLoader({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad,
  onError,
}: ModelLoaderProps) {
  const [error, setError] = useState<Error | null>(null);

  try {
    const gltf = useGLTF(url);

    useEffect(() => {
      if (gltf && onLoad) onLoad();
    }, [gltf, onLoad]);

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
      const loadError =
        err instanceof Error ? err : new Error("Failed to load model");
      setError(loadError);
      if (onError) onError(loadError);
    }
    return null;
  }
}

export function preloadModel(url: string) {
  useGLTF.preload(url);
}
