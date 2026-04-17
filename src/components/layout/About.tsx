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
  createImageReveal,
  createFadeReveal,
  bindStoryParallax,
  createStoryStageReveal,
} from "@/lib/gsapUtils";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_STRIP = [
  { src: siteImages.hero, alt: "Handcrafted plush teddy bear" },
  { src: siteImages.about, alt: "Colorful yarn and crochet work" },
  { src: siteImages.process.yarn, alt: "Soft yarn skeins" },
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".story-anim", { opacity: 1, y: 0 });
      if (introStageRef.current) {
        gsap.set(introStageRef.current, { clearProps: "opacity,transform" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (introStageRef.current) {
        createStoryStageReveal(introStageRef.current, section, {
          start: "top 88%",
          duration: 0.95,
        });
      }

      const labels = section.querySelectorAll<HTMLElement>(".section-label.story-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.story-anim");
      createTextReveal(labels, section, { start: "top 85%" });
      createTextReveal(titles, section, { delay: 0.1, start: "top 85%" });

      const textEls = section.querySelectorAll<HTMLElement>("p.story-anim, .story-anim:not(.section-label):not(.section-title)");
      createFadeReveal(textEls, section, { stagger: 0.08, start: "top 80%" });

      if (imgRef.current) {
        createImageReveal(imgRef.current, section, { direction: "left", start: "top 80%" });
        gsap.to(imgRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      if (textColRef.current) {
        bindStoryParallax(textColRef.current, section, { y: 28, scrub: 1.6 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="story" className={styles.story}>
      <div className={styles.grid}>
        <div ref={textColRef} className={styles.text}>
          <div className={styles.storyStage}>
            <StorySymbolLayer variant="sparse" />
            <div ref={introStageRef} className={styles.storyIntro3d}>
              <div className="section-label story-anim">The Artist</div>
              <h2 className="section-title story-anim">
                Meet <em>Sanja</em>
              </h2>
              <p className={`${styles.lead} story-anim`}>
                Transforming threads into cherished companions, one handmade creation at a time.
              </p>
              <p className={`${styles.body} story-anim`}>
                From her cozy studio in Novi Sad, Serbia, Sanja Krstić discovered a passion
                for crochet that quickly turned into magical TikTok live sessions. What started
                as quiet evenings with yarn has blossomed into a community of thousands who watch
                in awe as thread transforms into adorable plush friends before their eyes.
              </p>
              <p className={`${styles.body} story-anim`}>
                Every piece tells a story &mdash; of patience, creativity, and the joy of handmade
                craftsmanship. When you hold a Sanja creation, you&apos;re holding hours of
                live-streamed artistry, made exclusively for you.
              </p>

              <div className={`${styles.stats} story-anim`}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>500+</span>
                  <span className={styles.statLabel}>Happy Owners</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>5+</span>
                  <span className={styles.statLabel}>Years Crafting</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>12K</span>
                  <span className={styles.statLabel}>TikTok Family</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={imgRef} className={`${styles.visual} story-anim`}>
          <div className={styles.floatWrap}>
            <Image
              src={siteImages.about}
              alt="Colorful yarn and handmade crochet work in the studio"
              fill
              className={`${styles.img} floating-img`}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <SectionVisualStrip
        className={`${styles.bottomStrip} story-anim`}
        images={[...ABOUT_STRIP]}
      />
    </section>
  );
}
