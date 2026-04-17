"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StorySymbolLayer from "@/components/vfx/StorySymbolLayer";
import { PlushFaceSvg } from "@/components/vfx/icons/plushFaceIcons";
import type { PlushFaceVariant } from "@/components/vfx/icons/plushFaceIcons";
import { plushGalleryItems } from "@/lib/toyGallery";
import { siteImages } from "@/lib/siteImages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createFadeReveal, createStoryStageReveal } from "@/lib/gsapUtils";
import styles from "./HandwovenSouls.module.css";

const HandwovenSoulsStage3D = dynamic(
  () => import("./HandwovenSoulsStage3D"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const AVATAR_CYCLE: PlushFaceVariant[] = [
  "a",
  "b",
  "c",
  "a",
  "b",
  "c",
  "a",
];

const CRAFT_PILLARS = [
  {
    title: "Konac kao linija",
    body:
      "Svaki krug je vidljiv — nema skrivene fabrike: samo prsti, kuka i ritam koji traje satima dok ne postane saputnik.",
  },
  {
    title: "Tekstura koja „priča“",
    body:
      "Pamuk i merino drže toplinu boje; šavovi grade reljef koji pod prstima zna ko je doma.",
  },
  {
    title: "Jedinstveno lice",
    body:
      "Dva meda nisu klonovi — mali pomaci očiju i mašne čine da tvoj komad ima svoj karakter.",
  },
] as const;

export default function HandwovenSouls() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      const toShow = [
        ...section.querySelectorAll<HTMLElement>(
          `.${styles.eyebrow}, .${styles.title}, .${styles.lead}`
        ),
        ...section.querySelectorAll<HTMLElement>(`.${styles.pillar}`),
        ...section.querySelectorAll<HTMLElement>(
          `.${styles.stripItem}, .${styles.stripHero}`
        ),
        stageRef.current,
      ].filter(Boolean) as HTMLElement[];
      gsap.set(toShow, { opacity: 1, y: 0, rotateX: 0, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      if (stageRef.current) {
        createStoryStageReveal(stageRef.current, section, {
          start: "top 86%",
          duration: 1,
        });
      }

      const headerEls = section.querySelectorAll<HTMLElement>(
        `.${styles.eyebrow}, .${styles.title}, .${styles.lead}`
      );
      createFadeReveal(headerEls, section, { stagger: 0.1, start: "top 88%" });

      const cards = section.querySelectorAll<HTMLElement>(`.${styles.pillar}`);
      createFadeReveal(cards, section, { stagger: 0.12, start: "top 82%" });

      const strip = section.querySelectorAll<HTMLElement>(`.${styles.stripItem}`);
      createFadeReveal(strip, section, { stagger: 0.06, start: "top 84%" });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const stripImages = [
    plushGalleryItems[0],
    plushGalleryItems[1],
    plushGalleryItems[3],
    plushGalleryItems[4],
  ].filter(Boolean);

  const toyOrbsRow = (
    <div className={styles.toyRow} aria-hidden>
      {plushGalleryItems.map((toy) => (
        <div key={toy.src} className={styles.toyOrb}>
          <Image
            src={toy.src}
            alt=""
            fill
            sizes="(max-width: 600px) 18vw, 96px"
            className={styles.toyImg}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="pleteno"
      className={styles.section}
      aria-labelledby="pleteno-heading"
    >
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.threadAccent} aria-hidden />

      <div className={styles.inner}>
        <StorySymbolLayer variant="sparse" className={styles.symbols} />

        <header className={styles.header}>
          <p className={styles.eyebrow}>Atelje · Novi Sad</p>
          <h2 id="pleteno-heading" className={styles.title}>
            Ručno ispleteno, <em>jedno po jedno</em>
          </h2>
          <p className={styles.lead}>
            Ispod svake fotografije stoji stvaran rad — nit koja se vidi na svjetlu, sav koji
            pamti tempo veceri. Ovdje nisu &quot;modeli&quot;: to su mala lica kolekcije, a sada i dnevni
            plush oracle koji jednom dnevno otvara tri karte i malu pricu.
          </p>
        </header>

        <div ref={stageRef} className={styles.visualStage}>
          <div className={styles.stageInner}>
            {reducedMotion ? (
              <div className={styles.avatarRibbon} aria-hidden>
                {AVATAR_CYCLE.map((variant, i) => (
                  <div key={`av-${i}`} className={styles.avatar}>
                    <span className={styles.ringGlow} />
                    <PlushFaceSvg variant={variant} className={styles.face} />
                  </div>
                ))}
              </div>
            ) : null}
            <HandwovenSoulsStage3D />
            {toyOrbsRow}
          </div>
        </div>

        <div className={styles.pillars}>
          {CRAFT_PILLARS.map((p) => (
            <article key={p.title} className={styles.pillar}>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.strip} role="list">
          {stripImages.map((item) => (
            <div key={item.src} className={styles.stripItem} role="listitem">
              <div className={styles.stripFrame}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 180px"
                  className={styles.stripImg}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          <div className={styles.stripHero} role="listitem">
            <div className={styles.stripFrame}>
              <Image
                src={siteImages.process.yarn}
                alt="Odabir pređe u ateljeu — topli tonovi konca"
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className={styles.stripImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
