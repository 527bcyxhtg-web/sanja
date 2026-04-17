import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  stagger?: number;
}

export function createTextReveal(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element> | null,
  trigger: HTMLElement | null,
  options: RevealOptions = {}
) {
  if (!elements || !trigger) return;

  const {
    duration = 0.9,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    stagger = 0.12,
  } = options;

  gsap.fromTo(
    elements,
    {
      clipPath: "inset(0 0 100% 0)",
      y: 30,
      opacity: 0,
    },
    {
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function createImageReveal(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element> | null,
  trigger: HTMLElement | null,
  options: RevealOptions = {}
) {
  if (!elements || !trigger) return;

  const {
    direction = "up",
    duration = 1.1,
    delay = 0,
    ease = "power3.inOut",
    start = "top 85%",
    stagger = 0.15,
  } = options;

  const clipFrom: Record<string, string> = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  gsap.fromTo(
    elements,
    {
      clipPath: clipFrom[direction] || clipFrom.up,
      scale: 1.08,
    },
    {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function createFadeReveal(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element> | null,
  trigger: HTMLElement | null,
  options: RevealOptions = {}
) {
  if (!elements || !trigger) return;

  const {
    duration = 0.8,
    delay = 0,
    ease = "power2.out",
    start = "top 85%",
    stagger = 0.1,
  } = options;

  gsap.fromTo(
    elements,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/** Slow vertical drift for cinematic story sections (pairs with Lenis). */
export function bindStoryParallax(
  element: HTMLElement | null,
  trigger: HTMLElement | null,
  options: { y?: number; scrub?: number } = {}
) {
  if (!element || !trigger) return;
  const { y = 32, scrub = 1.35 } = options;
  gsap.to(element, {
    y: -y,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
}

export interface StaggerRevealOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  stagger?: number;
  y?: number;
}

/** Direct children fade/slide in with scroll (nav columns, footer blocks, card rows). */
export function staggerRevealChildren(
  container: HTMLElement | null,
  trigger: HTMLElement | null,
  options: StaggerRevealOptions = {}
) {
  if (!container || !trigger) return;

  const children = Array.from(container.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );
  if (children.length === 0) return;

  const {
    duration = 0.65,
    delay = 0,
    ease = "power3.out",
    start = "top 88%",
    stagger = 0.08,
    y = 16,
  } = options;

  gsap.fromTo(
    children,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export interface ScrubOpacityOptions {
  start?: string;
  end?: string;
  from?: number;
  to?: number;
  scrub?: number;
}

/** Gentle opacity tied to scroll (single element). */
/** Cinematic intro for a story block — 3D tilt-in without mouse tracking */
export function createStoryStageReveal(
  element: HTMLElement | null,
  trigger: HTMLElement | null,
  options: { start?: string; duration?: number } = {}
) {
  if (!element || !trigger) return;
  const { start = "top 86%", duration = 1.05 } = options;
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
      rotateX: 8,
      transformPerspective: 1100,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function scrubOpacity(
  target: HTMLElement | null,
  trigger: HTMLElement | null,
  options: ScrubOpacityOptions = {}
) {
  if (!target || !trigger) return;

  const {
    start = "top bottom",
    end = "bottom top",
    from = 0.5,
    to = 1,
    scrub = 1,
  } = options;

  gsap.fromTo(
    target,
    { opacity: from },
    {
      opacity: to,
      ease: "none",
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    }
  );
}
