"use client";

import { useState, useEffect, useCallback } from "react";

interface HoverState {
  isHovered: boolean;
  isTouch: boolean;
}

export function useHover<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  HoverState
] {
  const [state, setState] = useState<HoverState>({
    isHovered: false,
    isTouch: false,
  });
  const [ref] = useState<{ current: T | null }>({ current: null });

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      queueMicrotask(() => {
        setState((s) => ({ ...s, isTouch: true }));
      });
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () =>
      setState((s) => ({ ...s, isHovered: true }));
    const handleMouseLeave = () =>
      setState((s) => ({ ...s, isHovered: false }));

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return [ref as React.RefObject<T>, state];
}
