"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";
import SectionVisualStrip from "@/components/ui/SectionVisualStrip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import StorySymbolLayer from "@/components/vfx/StorySymbolLayer";
import {
  createTextReveal,
  createFadeReveal,
  createImageReveal,
  createStoryStageReveal,
} from "@/lib/gsapUtils";
import styles from "./CraftingProcess.module.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Premium Yarn Selection",
    desc: "Carefully selecting the softest, highest-quality yarns. Every fiber is chosen for texture, durability, and comfort.",
    img: siteImages.process.yarn,
    alt: "Skeins of soft yarn in warm colors",
  },
  {
    num: "02",
    title: "Hand Stitching",
    desc: "Each piece is meticulously crocheted stitch by stitch during live TikTok sessions, transforming flat yarn into 3D art.",
    img: siteImages.process.stitch,
    alt: "Hands working with thread and fabric",
  },
  {
    num: "03",
    title: "Details & Finishing",
    desc: "Adding personality with embroidered eyes, nose, and signature gold accents. Every detail is crafted with precision.",
    img: siteImages.process.detail,
    alt: "Plush toy detail and texture",
  },
  {
    num: "04",
    title: "Luxury Packaging",
    desc: "Your plush friend is lovingly wrapped and prepared for its journey. Each package includes a certificate of authenticity.",
    img: siteImages.process.package,
    alt: "Gift box and thoughtful packaging",
  },
];

export default function CraftingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerStageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".proc-anim", { opacity: 1, y: 0 });
      gsap.set(section.querySelectorAll(`.${styles.cardImg}`), {
        clipPath: "inset(0 0 0 0)",
        scale: 1,
      });
      if (headerStageRef.current) {
        gsap.set(headerStageRef.current, { clearProps: "opacity,transform" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (headerStageRef.current) {
        createStoryStageReveal(headerStageRef.current, section, {
          start: "top 88%",
          duration: 0.9,
        });
      }

      const labels = section.querySelectorAll<HTMLElement>(".section-label.proc-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.proc-anim");
      createTextReveal(labels, section, { start: "top 88%" });
      createTextReveal(titles, section, { delay: 0.08, start: "top 88%" });

      const cardImgs = section.querySelectorAll<HTMLElement>(`.${styles.cardImg}`);
      createImageReveal(cardImgs, section, {
        direction: "up",
        stagger: 0.14,
        duration: 1,
        start: "top 82%",
      });

      const cardCopy = section.querySelectorAll<HTMLElement>(
        `.${styles.num}, .${styles.cardTitle}, .${styles.cardDesc}`
      );
      createFadeReveal(cardCopy, section, { stagger: 0.06, start: "top 78%" });

      const strip = section.querySelectorAll<HTMLElement>(`.${styles.bottomStrip}`);
      createFadeReveal(strip, section, { start: "top 88%" });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.procStage}>
          <StorySymbolLayer variant="sparse" />
          <div ref={headerStageRef} className={styles.header3d}>
            <div className="section-label proc-anim">The Journey</div>
            <h2 className="section-title proc-anim">From Thread to <em>Treasure</em></h2>
          </div>
        </div>

        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.num} className={styles.card}>
              <div className={styles.cardImg}>
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  className={`${styles.cardPhoto} floating-img`}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
              </div>
              <span className={styles.num}>{step.num}</span>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionVisualStrip
        className={`${styles.bottomStrip} proc-anim`}
        images={steps.map((step) => ({ src: step.img, alt: step.alt }))}
      />
    </section>
  );
}
