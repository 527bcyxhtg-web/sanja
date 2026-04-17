"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionDivider from "@/components/ui/SectionDivider";
import { createTextReveal, createFadeReveal } from "@/lib/gsapUtils";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: "Ana M.",
    loc: "Beograd",
    stars: 5,
    text: "Gledala sam Sanju kako dovršava mog zeku u plavom kombinezonu na TikToku. U stvarnosti je još mekši i slađi nego na videu.",
    product: "Zeko Denim",
    thumb: "/catalog/bunny-blue-overalls.webp",
  },
  {
    id: 2,
    name: "Marko K.",
    loc: "Zagreb",
    stars: 5,
    text: "Rozi medvjedić je bio poklon za rođendan i reakcija je bila savršena. Pakiranje, mekoća i detalji stvarno djeluju kao mali luksuz.",
    product: "Medvjedić Rozi",
    thumb: "/catalog/bear-rose-dress.webp",
  },
  {
    id: 3,
    name: "Elena S.",
    loc: "Sarajevo",
    stars: 5,
    text: "Pilić s mint kapicom je stigao isto kao na snimci i odmah je postao najdraži komad u dječjoj sobi. Baš se vidi ručni rad.",
    product: "Pilić Mint",
    thumb: "/catalog/chick-mint-bonnet.webp",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".rev-anim", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const labels = section.querySelectorAll<HTMLElement>(".section-label.rev-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.rev-anim");
      createTextReveal(labels, section, { start: "top 85%" });
      createTextReveal(titles, section, { delay: 0.1, start: "top 85%" });

      const cards = section.querySelectorAll<HTMLElement>(`.${styles.card}`);
      createFadeReveal(cards, section, { stagger: 0.15, start: "top 78%" });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <SectionDivider />
      <div className={styles.inner}>
        <div className="section-label rev-anim">Testimonials</div>
        <h2 className="section-title rev-anim">Loved by <em>Collectors</em></h2>

        <div className={styles.grid}>
          {reviews.map((r) => (
            <div key={r.id} className={`${styles.card} rev-anim`}>
              <div className={styles.stars}>
                {Array.from({ length: r.stars }, (_, i) => (
                  <span key={i} className={styles.star} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden>{"\u201C"}</span>
                {r.text}
                <span className={styles.quoteMark} aria-hidden>{"\u201D"}</span>
              </p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <Image
                    src={r.thumb}
                    alt={`${r.product} — customer photo`}
                    width={52}
                    height={52}
                    sizes="52px"
                    className={`${styles.avatarImg} floating-img`}
                  />
                </div>
                <div>
                  <span className={styles.name}>{r.name}</span>
                  <span className={styles.loc}>{r.loc} — {r.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
