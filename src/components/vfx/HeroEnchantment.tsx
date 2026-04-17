"use client";

import { useEffect, useId, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  IconHeart,
  IconInfinity,
  IconSpark,
  IconStar4,
  IconThread,
} from "@/components/vfx/icons/storyIcons";
import styles from "./HeroEnchantment.module.css";

interface HeroEnchantmentProps {
  heroRef: RefObject<HTMLElement | null>;
}

export default function HeroEnchantment({ heroRef }: HeroEnchantmentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const symbolMarkup = (
    <>
      <span className={`${styles.symbol} ${styles.sym1}`}>
        <IconHeart idPrefix={`${uid}a`} />
      </span>
      <span className={`${styles.symbol} ${styles.sym2}`}>
        <IconSpark idPrefix={`${uid}b`} />
      </span>
      <span className={`${styles.symbol} ${styles.sym3}`}>
        <IconThread idPrefix={`${uid}c`} />
      </span>
      <span className={`${styles.symbol} ${styles.sym4}`}>
        <IconInfinity idPrefix={`${uid}d`} />
      </span>
      <span className={`${styles.symbol} ${styles.sym5}`}>
        <IconStar4 idPrefix={`${uid}e`} />
      </span>
      <span className={`${styles.symbol} ${styles.sym6}`}>
        <IconHeart idPrefix={`${uid}f`} />
      </span>
    </>
  );

  useEffect(() => {
    if (reducedMotion || !layerRef.current || !heroRef.current) return;

    const hero = heroRef.current;
    const layer = layerRef.current;
    const symbols = layer.querySelectorAll<HTMLElement>(`.${styles.symbol}`);
    const tweens: gsap.core.Tween[] = [];

    const floatOk =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 901px)").matches;

    if (floatOk) {
      symbols.forEach((el) => {
        tweens.push(
          gsap.to(el, {
            y: gsap.utils.random(-14, 14),
            x: gsap.utils.random(-10, 10),
            rotation: gsap.utils.random(-18, 18),
            duration: gsap.utils.random(4, 6.5),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: gsap.utils.random(0, 1.2),
          })
        );
      });
    }

    const tiltOk =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 901px)").matches;

    const handleMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(layer, {
        rotateY: px * 12,
        rotateX: -py * 9,
        duration: 0.75,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      gsap.to(layer, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.1,
        ease: "power2.out",
      });
    };

    if (tiltOk) {
      hero.addEventListener("mousemove", handleMove, { passive: true });
      hero.addEventListener("mouseleave", handleLeave, { passive: true });
    }

    return () => {
      tweens.forEach((t) => t.kill());
      if (tiltOk) {
        hero.removeEventListener("mousemove", handleMove);
        hero.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [reducedMotion, heroRef]);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden>
      <div className={styles.stage3d}>
        <div ref={layerRef} className={styles.symbolLayer}>
          {symbolMarkup}
        </div>
      </div>
    </div>
  );
}
