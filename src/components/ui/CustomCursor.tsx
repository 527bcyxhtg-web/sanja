"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const hoveredRef = useRef<HTMLElement | null>(null);
  const boundElsRef = useRef<WeakSet<HTMLElement>>(new WeakSet());

  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const hovered = hoveredRef.current;
      if (hovered) {
        const rect = hovered.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pullStrength = 0.35;
        const mx = e.clientX + (cx - e.clientX) * pullStrength;
        const my = e.clientY + (cy - e.clientY) * pullStrength;
        ringX(mx);
        ringY(my);
      } else {
        ringX(e.clientX);
        ringY(e.clientY);
      }
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onEnter = (e: Event) => {
      hoveredRef.current = e.target as HTMLElement;
      gsap.to(ring, {
        scale: 1.47,
        borderColor: "rgba(201, 169, 110, 0.7)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onLeave = () => {
      hoveredRef.current = null;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(201, 169, 110, 0.45)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const interactiveSelector =
      'a, button, [data-cursor="pointer"], [data-cursor="magnetic"], [data-cursor="view"], input, textarea, .btn-primary, .btn-sec';

    const boundEls = boundElsRef.current;

    const bindInteractive = () => {
      const els = document.querySelectorAll<HTMLElement>(interactiveSelector);
      els.forEach((el) => {
        if (boundEls.has(el)) return;
        boundEls.add(el);
        el.addEventListener("mouseenter", onEnter, { passive: true });
        el.addEventListener("mouseleave", onLeave, { passive: true });
      });
    };

    bindInteractive();

    let mutationTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(bindInteractive, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      clearTimeout(mutationTimer);
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [reducedMotion, isTouchDevice]);

  if (reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
