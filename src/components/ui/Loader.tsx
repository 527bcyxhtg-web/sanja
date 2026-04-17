"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import styles from "./Loader.module.css";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const exit = useCallback(() => {
    if (!loaderRef.current) return;
    gsap.to(loaderRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.85,
      ease: "power4.inOut",
      onComplete: () => {
        setVisible(false);
        window.dispatchEvent(new CustomEvent("loaderComplete"));
      },
    });
  }, []);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: exit,
    });

    tl.set(loaderRef.current, { clipPath: "inset(0 0 0 0)" });

    tl.from(brandRef.current, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.from(
      subRef.current,
      {
        opacity: 0,
        y: 10,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.15"
    );

    tl.to(
      counter,
      {
        value: 100,
        duration: 1.0,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              String(Math.floor(counter.value)).padStart(3, "0") + "%";
          }
          if (barRef.current) {
            barRef.current.style.width = `${counter.value}%`;
          }
        },
      },
      "-=0.1"
    );

    tl.to({}, { duration: 0.15 });

    return () => {
      tl.kill();
    };
  }, [exit]);

  if (!visible) return null;

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div className={styles.box}>
        <div ref={brandRef} className={styles.brand}>
          SANJA
        </div>
        <div ref={subRef} className={styles.sub}>
          Handcrafted Plush Toys
        </div>
        <div className={styles.barWrap}>
          <div ref={barRef} className={styles.bar} style={{ width: 0 }} />
        </div>
        <div ref={counterRef} className={styles.pct}>
          000%
        </div>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  );
}
