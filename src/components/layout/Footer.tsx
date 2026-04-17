"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionDivider from "@/components/ui/SectionDivider";
import { staggerRevealChildren } from "@/lib/gsapUtils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const top = topRef.current;
    if (!footer || !top) return;

    if (reducedMotion) {
      gsap.set(Array.from(top.children), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      staggerRevealChildren(top, footer, {
        start: "top 88%",
        stagger: 0.09,
        y: 18,
        duration: 0.7,
      });
    }, footer);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <SectionDivider />
      <div className={styles.inner}>
        <div ref={topRef} className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Sanja <em>Krstić</em></span>
            <p className={styles.tagline}>Handcrafted Plush Artistry</p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <a href="#hero">Home</a>
            <a href="#story">Story</a>
            <a href="#shop">Collection</a>
            <a href="#tiktok">Live</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={styles.social}>
            <a href="https://www.tiktok.com/@sanjakrstic8" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="mailto:hello@sanjakrstic.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 7L2 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.motif} aria-hidden>
          <svg viewBox="0 0 600 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="8" x2="260" y2="8" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 12" />
            <circle cx="278" cy="8" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M286 5c4 0 4 6 8 6s4-6 8-6 4 6 8 6 4-6 8-6" stroke="currentColor" strokeWidth="0.6" fill="none" />
            <circle cx="324" cy="8" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <line x1="340" y1="8" x2="600" y2="8" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 12" />
          </svg>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {year} Sanja Krstić. All rights reserved.</span>
          <span>Handcrafted with love in Novi Sad, Serbia</span>
        </div>
      </div>
    </footer>
  );
}
