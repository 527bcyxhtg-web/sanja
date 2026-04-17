"use client";

import { useEffect, useState } from "react";

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId: number;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        const newVelocity = Math.abs(deltaY / deltaTime) * 10;
        setVelocity(Math.min(newVelocity, 50));
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateVelocity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return velocity;
}
