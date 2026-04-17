"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionVisualStrip from "@/components/ui/SectionVisualStrip";
import FallingMotifs from "@/components/vfx/FallingMotifs";
import StorySymbolLayer from "@/components/vfx/StorySymbolLayer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createTextReveal, createImageReveal, createFadeReveal } from "@/lib/gsapUtils";
import { tiktokReels, tiktokStripImages } from "@/lib/tiktokMedia";
import styles from "./TikTokShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

const STORY_BEATS = [
  {
    title: "Nisi gledatelj — sudionik",
    body:
      "Kad kamera stoji iznad šava, ti si u procesu — ne u reklami. Sumnja pada jer vidiš prste, konac, tempo; zajednica i šavovi u istom kadru grade povjerenje brže od gotovog snimka u kutiji.",
  },
  {
    title: "Zajednica kao dokaz",
    body:
      "Chat nije šum — to su pitanja o materijalu, boji, roku. Odgovor uživo gradi autoritet brže od statičnog opisa. Ti osjećaš da postoji osoba iza ekrana, ne algoritam.",
  },
  {
    title: "Ritual koji štedi pažnju",
    body:
      "Tri termina sedmično u isto vrijeme grade naviku: mozak zna kada da se vrati. Taj ritam pretvara „možda kasnije“ u „vidimo se u osam“ — a navika prodaje vještinu bolje od jednokratnog hypea.",
  },
] as const;

export default function TikTokShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".tt-anim", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const labels = section.querySelectorAll<HTMLElement>(".section-label.tt-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.tt-anim");
      createTextReveal(labels, section, { start: "top 85%" });
      createTextReveal(titles, section, { delay: 0.1, start: "top 85%" });

      const rest = section.querySelectorAll<HTMLElement>(".tt-anim:not(.section-label):not(.section-title)");
      createFadeReveal(rest, section, { stagger: 0.08, start: "top 80%" });

      if (videoRef.current) {
        createImageReveal(videoRef.current, section, { direction: "right", start: "top 80%" });
        gsap.to(videoRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="tiktok" className={styles.section}>
      <FallingMotifs />

      <div className={styles.inner}>
        <div className={styles.text}>
          <StorySymbolLayer variant="dense" />
          <div className="section-label tt-anim">Zajednica uživo</div>
          <h2 className="section-title tt-anim">
            TikTok priča: <em>vjerovanje kroz proces</em>
          </h2>
          <p className={`${styles.desc} tt-anim`}>
            Ovdje ne gledaš performans — gledaš radionicu. Svaki krug konca postaje dokaz autentičnosti: kad vidiš kako nastaje, lakše je povjeriti da će i u tvom domu mirisati na isti trud.
          </p>

          <div className={styles.storyGrid}>
            {STORY_BEATS.map((beat) => (
              <article key={beat.title} className={`${styles.storyCard} tt-anim`}>
                <h3 className={styles.storyTitle}>{beat.title}</h3>
                <p className={styles.storyBody}>{beat.body}</p>
              </article>
            ))}
          </div>

          <div className={`${styles.pillars} tt-anim`}>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>3×</span>
              <span className={styles.pillarLabel}>Emitovanja sedmično</span>
              <span className={styles.pillarHint}>ponedjeljak · srijeda · petak</span>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>20:00</span>
              <span className={styles.pillarLabel}>CET · Novi Sad</span>
              <span className={styles.pillarHint}>isti sat, isti studio</span>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>∞</span>
              <span className={styles.pillarLabel}>Snimci ostaju</span>
              <span className={styles.pillarHint}>propušten termin ≠ izgubljena priča</span>
            </div>
          </div>

          <p className={`${styles.fomoLine} tt-anim`}>
            Snimak ostaje, ali „tu sam bila u osam“ je doživljaj koji se ne ponavlja istim ritmom —
            zato ritam termina drži i blagu napetost, bez vrištanja u feed.
          </p>

          <div className={`${styles.ctaRow} tt-anim`}>
            <a
              href="https://www.tiktok.com/@sanjakrstic8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor="pointer"
            >
              <span>Prati @sanjakrstic8</span>
            </a>
            <a href="#shop" className="btn-sec" data-cursor="pointer">
              Pogledaj komade rođene uživo
            </a>
          </div>
          <p className={`${styles.schedule} tt-anim`}>
            Uživo: ponedjeljak, srijeda i petak u 20:00 CET
          </p>
        </div>

        <div ref={videoRef} className={`${styles.visual} tt-anim`}>
          <div className={styles.floatWrap}>
            <video
              className={`${styles.videoMedia} floating-img`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={tiktokReels[0].poster}
              aria-label={tiktokReels[0].alt}
            >
              <source src={tiktokReels[0].video} type="video/mp4" />
            </video>
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              UŽIVO
            </div>
            <a
              href="https://www.tiktok.com/@sanjakrstic8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.playBtn}
              aria-label="Otvori TikTok profil"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <SectionVisualStrip
        className={`${styles.bottomStrip} tt-anim`}
        images={tiktokStripImages}
      />
    </section>
  );
}
