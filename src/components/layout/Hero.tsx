"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteImages } from "@/lib/siteImages";
import { ORACLE_POSITIONS } from "@/lib/plushOracle";
import { useDailyPlushOracle } from "@/hooks/useDailyPlushOracle";
import HeroEnchantment from "@/components/vfx/HeroEnchantment";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<HTMLElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const contentStageRef = useRef<HTMLDivElement>(null);
  const oraclePanelRef = useRef<HTMLDivElement>(null);
  const oracleCardsRef = useRef<HTMLDivElement>(null);
  const oracleStoryRef = useRef<HTMLParagraphElement>(null);

  const oracle = useDailyPlushOracle();

  /* ── Main entrance + scroll animations ── */
  useEffect(() => {
    if (reducedMotion) {
      gsap.set(
        [eyebrowRef.current, subRef.current, ctaRef.current],
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
      );
      gsap.set(wordRefs.current.filter(Boolean), { y: 0 });
      gsap.set(scrollRef.current, { opacity: 1 });
      gsap.set(lineRef.current, { scaleX: 1 });
      gsap.set(backdropRef.current, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial hidden state for word spans
      gsap.set(wordRefs.current.filter(Boolean), { y: "110%" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        paused: true,
      });

      tl.to(overlayRef.current, { opacity: 1, duration: 1.2, ease: "power2.inOut" })
        .to(backdropRef.current, { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }, "-=0.8")
        .to(raysRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, "-=1.4")
        .to(lineRef.current, { scaleX: 1, duration: 1.4, ease: "power4.out" }, "-=1.6")
        .to(eyebrowRef.current, {
          opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.9,
        }, "-=1.2")
        .to(wordRefs.current.filter(Boolean), {
          y: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        }, "-=0.55")
        .to(subRef.current, {
          opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.0,
        }, "-=0.65")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(oraclePanelRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.45")
        .to(scrollRef.current, { opacity: 1, duration: 1 }, "-=0.3");

      const onLoaderDone = () => tl.play();
      window.addEventListener("loaderComplete", onLoaderDone);
      const fallback = setTimeout(() => tl.play(), 2200);

      // Scroll parallax — overlay fades
      gsap.to(overlayRef.current, {
        opacity: 0.3,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      // Video subtle zoom + drift on scroll
      gsap.to(videoRef.current, {
        scale: 1.15, y: 80,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      // Backdrop parallax
      gsap.to(backdropRef.current, {
        y: -40,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      // 3D content tilt on mouse move (desktop only)
      const heroEl = heroRef.current;
      const stageEl = contentStageRef.current;
      const tiltOk = typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches;
      let removeContentTilt: (() => void) | undefined;

      if (heroEl && stageEl && tiltOk) {
        const onMove = (e: MouseEvent) => {
          const r = heroEl.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(stageEl, {
            rotateY: px * 5, rotateX: -py * 4, translateZ: 12,
            duration: 0.85, ease: "power3.out", overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(stageEl, {
            rotateY: 0, rotateX: 0, translateZ: 0,
            duration: 1.2, ease: "power2.out",
          });
        };
        heroEl.addEventListener("mousemove", onMove, { passive: true });
        heroEl.addEventListener("mouseleave", onLeave, { passive: true });
        removeContentTilt = () => {
          heroEl.removeEventListener("mousemove", onMove);
          heroEl.removeEventListener("mouseleave", onLeave);
        };
      }

      return () => {
        removeContentTilt?.();
        window.removeEventListener("loaderComplete", onLoaderDone);
        clearTimeout(fallback);
      };
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ── Magnetic button effect on CTAs ── */
  useEffect(() => {
    if (reducedMotion) return;

    const cleanups: (() => void)[] = [];

    function bindMagnetic(el: HTMLElement | null, strength = 0.28) {
      if (!el) return;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x, y, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    }

    bindMagnetic(ctaPrimaryRef.current, 0.28);
    bindMagnetic(ctaSecRef.current, 0.22);

    return () => cleanups.forEach((fn) => fn());
  }, [reducedMotion]);

  useEffect(() => {
    if (!oracle.cards.length || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        oracleCardsRef.current?.children ?? [],
        { opacity: 0, y: 24, rotateY: -8 },
        { opacity: 1, y: 0, rotateY: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        oracleStoryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [oracle.cards, reducedMotion]);

  return (
    <section ref={heroRef} id="hero" className={styles.hero}>

      {/* ── Video background ── */}
      <div className={styles.videoBg}>
        <Image
          src={siteImages.hero}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.heroPosterImg}
          aria-hidden
        />
        <video
          ref={videoRef}
          className={`${styles.video} ${heroVideoReady ? styles.videoVisible : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={siteImages.hero}
          onLoadedData={() => setHeroVideoReady(true)}
          aria-hidden
        >
          <source src="/video/hero-crochet.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoGrain} aria-hidden />
      </div>

      <div ref={overlayRef} className={styles.overlay} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      {/* ── Cinematic backdrop ── */}
      <div ref={backdropRef} className={styles.backdrop} aria-hidden>
        <div ref={raysRef} className={styles.rays}>
          <div className={styles.ray} />
          <div className={`${styles.ray} ${styles.ray2}`} />
          <div className={`${styles.ray} ${styles.ray3}`} />
        </div>
        <div className={styles.bokeh}>
          <span className={styles.orb} />
          <span className={`${styles.orb} ${styles.orb2}`} />
          <span className={`${styles.orb} ${styles.orb3}`} />
          <span className={`${styles.orb} ${styles.orb4}`} />
          <span className={`${styles.orb} ${styles.orb5}`} />
          <span className={`${styles.orb} ${styles.orb6}`} />
          <span className={`${styles.orb} ${styles.orb7}`} />
        </div>
        <div className={styles.aura} />
        <div className={styles.glassFrame} />
      </div>

      <HeroEnchantment heroRef={heroRef} />

      {/* ── Content ── */}
      <div className={styles.inner}>
        <div ref={contentStageRef} className={styles.contentStage3d}>
          <div ref={lineRef} className={styles.accentLine} aria-hidden />

          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowDash} aria-hidden />
            Handcrafted in Novi Sad, Serbia
            <span className={styles.eyebrowDash} aria-hidden />
          </div>

          {/* Word-split title — each word reveals from beneath its mask */}
          <h1 ref={titleRef} className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.wordWrap}>
                <span
                  ref={(el) => { if (el) wordRefs.current[0] = el; }}
                  className={styles.word}
                >
                  Luxury
                </span>
              </span>
            </span>
            <span className={styles.titleLine}>
              <span className={styles.wordWrap}>
                <em
                  ref={(el) => { if (el) wordRefs.current[1] = el; }}
                  className={`${styles.word} ${styles.wordGold}`}
                >
                  Plush
                </em>
              </span>
              {"\u00A0"}
              <span className={styles.wordWrap}>
                <span
                  ref={(el) => { if (el) wordRefs.current[2] = el; }}
                  className={styles.word}
                >
                  Toys
                </span>
              </span>
            </span>
          </h1>

          <p ref={subRef} className={styles.sub}>
            Each creation is meticulously crocheted by hand during live TikTok
            sessions. Unique, warm, made with love &mdash; just for you.
          </p>

          <div ref={ctaRef} className={styles.ctas}>
            <a ref={ctaPrimaryRef} href="#shop" className="btn-primary">
              <span>Explore Collection</span>
            </a>
            <a ref={ctaSecRef} href="#tiktok" className="btn-sec">
              Watch Live
            </a>
          </div>

          <div ref={oraclePanelRef} className={styles.oraclePanel}>
            <p className={styles.oracleKicker}>Dnevno izvlačenje za lakši izbor</p>
            <h2 className={styles.oracleTitle}>Plush karte dana</h2>
            <p className={styles.oracleLead}>
              Ako ne znaš šta izabrati, izvuci 3 karte. Samo jednom dnevno i dobiješ mini priču + preporuku proizvoda.
            </p>

            <button
              type="button"
              className={styles.oracleButton}
              onClick={oracle.drawCards}
              disabled={!oracle.canDraw || oracle.isLoading}
            >
              {oracle.isLoading ? "Miješam karte..." : oracle.canDraw ? "Izvuci 3 karte" : "Dnevne karte su već izvučene"}
            </button>

            {oracle.cards.length > 0 && (
              <>
                <div ref={oracleCardsRef} className={styles.oracleCards}>
                  {oracle.cards.map((card, index) => (
                    <article key={`${card.id}-${index}`} className={styles.oracleCard}>
                      <div className={styles.oraclePosition}>{ORACLE_POSITIONS[index]?.title}</div>
                      <div className={styles.oraclePositionSub}>{ORACLE_POSITIONS[index]?.subtitle}</div>
                      <div className={styles.oracleImageWrap}>
                        <Image
                          src={card.oracleImage}
                          alt={card.name}
                          width={300}
                          height={420}
                          className={styles.oracleImage}
                        />
                      </div>
                      <h3>{card.name}</h3>
                      <p>{card.oracleSeal}</p>
                      <a href="#shop" className={styles.oracleCtaLink}>
                        Pogledaj u ponudi
                      </a>
                    </article>
                  ))}
                </div>

                <p ref={oracleStoryRef} className={styles.oracleStory}>
                  {oracle.story}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollHint} aria-hidden>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
