"use client";

import { useState, useEffect } from "react";
import styles from "./ProgressiveImage.module.css";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  containerClassName?: string;
}

export function ProgressiveImage({
  src,
  alt,
  placeholderSrc,
  className = "",
  containerClassName = "",
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    if (!placeholderSrc) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src, placeholderSrc]);

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {/* Native img: blur-up placeholder swap; next/image does not fit this pattern with static export. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        className={`${styles.image} ${className} ${
          isLoaded ? styles.loaded : styles.blur
        }`}
        onLoad={() => !placeholderSrc && setIsLoaded(true)}
      />
      {!isLoaded && <div className={styles.shimmer} />}
    </div>
  );
}
