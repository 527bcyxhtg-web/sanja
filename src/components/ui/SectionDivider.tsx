"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconHeart, IconThreadKnot } from "@/components/vfx/icons/storyIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./SectionDivider.module.css";

gsap.registerPlugin(ScrollTrigger);

type SectionDividerProps = {
  /** Optional roman / chapter index for story rhythm */
  chapter?: string;
};

export default function SectionDivider({ chapter }: SectionDividerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineLRef = useRef<HTMLSpanElement>(null);
  const lineRRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const lineL = lineLRef.current;
    const lineR = lineRRef.current;
    const svg = svgRef.current;
    const ornament = ornamentRef.current;
    if (!root || !lineL || !lineR || !svg) return;

    if (reducedMotion) {
      gsap.set([lineL, lineR], { scaleX: 1 });
      gsap.set(svg, { opacity: 0.5, y: 0 });
      if (ornament) gsap.set(ornament, { opacity: 0.55, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      if (ornament) {
        tl.fromTo(
          ornament,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
        );
      }

      tl.fromTo(
        lineL,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.95, ease: "power4.out" },
        ornament ? "-=0.35" : 0
      )
        .fromTo(
          lineR,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.95, ease: "power4.out" },
          "-=0.72"
        )
        .fromTo(
          svg,
          { opacity: 0, y: 10, rotate: -2 },
          { opacity: 0.52, y: 0, rotate: 0, duration: 0.75, ease: "power3.out" },
          "-=0.55"
        );

      gsap.to(svg, {
        y: -3,
        rotate: 1,
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={styles.wrap} aria-hidden>
      {chapter ? <span className={styles.chapter}>{chapter}</span> : null}
      {chapter ? (
        <div ref={ornamentRef} className={styles.ornament}>
          <span className={styles.ornIcon}>
            <IconThreadKnot idPrefix={`${uid}orn1`} />
          </span>
          <span className={styles.ornIcon}>
            <IconHeart idPrefix={`${uid}orn2`} />
          </span>
          <span className={styles.ornIcon}>
            <IconThreadKnot idPrefix={`${uid}orn3`} />
          </span>
        </div>
      ) : null}
      <div className={styles.row}>
        <span
          ref={lineLRef}
          className={`${styles.line} ${styles.lineLeft}`}
        />
        <svg
          ref={svgRef}
          className={styles.glyph}
          viewBox="0 0 400 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="12"
            x2="148"
            y2="12"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 10"
          />
          <circle
            cx="166"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M174 8c6 0 6 8 12 8s6-8 12-8 6 8 12 8"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
          />
          <circle
            cx="234"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
          />
          <line
            x1="252"
            y1="12"
            x2="400"
            y2="12"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 10"
          />
        </svg>
        <span
          ref={lineRRef}
          className={`${styles.line} ${styles.lineRight}`}
        />
      </div>
    </div>
  );
}
