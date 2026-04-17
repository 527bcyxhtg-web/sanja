"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  createTextReveal,
  createFadeReveal,
  createImageReveal,
} from "@/lib/gsapUtils";
import styles from "./PlushAtelierGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "Uživo, bez šminka",
    body:
      "Na TikToku vidiš svaki potez — nema skrivene proizvodnje. Priča o tvom plišancu počinje dok još niti nije gotov.",
  },
  {
    title: "Jedna majstorica",
    body:
      "Sanja — od prvog čvora do pakovanja. Nije serija s trake; svaki komad nosi isti ritam, strpljenje i toplinu ruku.",
  },
  {
    title: "Evropski atelje",
    body:
      "Novi Sad: mali studio, velika pažnja na predivo, boju i detalj. Kada stigne kod tebe, već znaš odakle dolazi.",
  },
] as const;

const PROOF = [
  { value: "12K+", label: "Zajednica na TikToku", num: 12, suffix: "K+" },
  { value: "500+", label: "Srećnih vlasnika",     num: 500, suffix: "+" },
  { value: "5+",   label: "Godina rada koncem",   num: 5,   suffix: "+" },
] as const;

export default function PlushAtelierGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".story-anim", { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const ctx = gsap.context(() => {
      const head = section.querySelector<HTMLElement>(`.${styles.head}`);
      if (head) {
        createTextReveal(head, section, { start: "top 86%" });
      }

      const pillars = section.querySelectorAll<HTMLElement>(`.${styles.pillar}`);
      createFadeReveal(pillars, section, { stagger: 0.1, start: "top 82%" });

      const proof = section.querySelector<HTMLElement>(`.${styles.proof}`);
      if (proof) {
        createFadeReveal(proof, section, { start: "top 88%" });
      }

      if (visualRef.current) {
        createImageReveal(visualRef.current, section, {
          direction: "right",
          start: "top 78%",
        });
      }

      // Animated counters — count up to target on first scroll into view
      const proofSection = section.querySelector<HTMLElement>(`.${styles.proof}`);
      if (proofSection) {
        PROOF.forEach((item, i) => {
          const el = counterRefs.current[i];
          if (!el) return;

          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: item.num,
            duration: item.num > 100 ? 2.0 : 1.4,
            ease: "power2.out",
            onUpdate() {
              const v = Math.round(proxy.val);
              el.textContent = v + item.suffix;
            },
            scrollTrigger: {
              trigger: proofSection,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="live-atelier"
      aria-labelledby="live-atelier-heading"
    >
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <header className={`${styles.head} story-anim`}>
              <p className={styles.eyebrow}>Zašto ovo nije obična radnja igračaka</p>
              <h2 id="live-atelier-heading" className={styles.title}>
                Gledaš kako nit postaje <em>neko</em> koga ćeš voleti
              </h2>
              <p className={styles.lead}>
                Ovo nije katalog — to je pozivnica. Svaki medo, zec i sova nose
                minutе koje si mogla videti na ekranu: heklanje uživo, smeh u
                chatu, poslednji šav pre nego što pošalje paket. Kada ga otvoriš,
                ne držiš fabrički proizvod — držiš nastavak priče koju si već
                započela sa nama.
              </p>
            </header>

            <ul className={styles.pillars}>
              {PILLARS.map((p) => (
                <li key={p.title} className={`${styles.pillar} story-anim`}>
                  <span className={styles.pillarMark} aria-hidden />
                  <div>
                    <h3 className={styles.pillarTitle}>{p.title}</h3>
                    <p className={styles.pillarBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`${styles.proof} story-anim`}>
              {PROOF.map((item, i) => (
                <div key={item.label} className={styles.proofItem}>
                  <span
                    ref={(el) => { if (el) counterRefs.current[i] = el; }}
                    className={styles.proofValue}
                    aria-label={item.value}
                  >
                    {/* Initial value visible before JS/scroll */}
                    {item.value}
                  </span>
                  <span className={styles.proofLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={visualRef} className={`${styles.visual} story-anim`}>
            <div className={styles.visualFrame}>
              <div className={styles.liveBadge}>
                <span className={styles.liveDot} aria-hidden />
                Uživo &mdash; TikTok
              </div>
              <div className={styles.visualImg}>
                <Image
                  src={siteImages.tiktok}
                  alt="Sanja uživo hekla plišanog saputnika ispred kamere"
                  fill
                  className={styles.photo}
                  sizes="(max-width: 900px) 100vw, 48vw"
                  loading="lazy"
                />
              </div>
              <p className={styles.caption}>
                Isti sto, iste ruke, ista nit &mdash; samo što sada gledaš sa
                svog kreveta umesto iz publike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
