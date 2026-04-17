"use client";

import { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CrochetMorph } from "@/components/3d/crochetMorphTypes";
import ProductCrochetThumb3D from "@/components/3d/ProductCrochetThumb3D";
import styles from "./ProductModal.module.css";

function luxuryParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

interface ProductDetail {
  id: number;
  name: string;
  desc: string;
  /** One-line emotional hook for cards & modal */
  storyLine?: string;
  longDesc: string;
  /** Visible finish: silhouette, texture, eyes, ribbons (Serbian luxury copy) */
  exteriorLuxury?: string;
  /** Fill, seams, hidden craft, weighting (Serbian) */
  interiorLuxury?: string;
  /** Single premium line on the card */
  luxuryTeaser?: string;
  /** 2–3 discrete chips on the card */
  highlights?: string[];
  /** Gift box / certificate specifics */
  packaging?: string;
  price: number;
  tag: string;
  img: string;
  /** Force real product photography instead of procedural 3D thumb. */
  displayMode?: "image" | "3d";
  /** Future-proof for transparent cut-outs vs lifestyle shots. */
  imageFit?: "cover" | "contain";
  /** Procedural R3F lik u istom stilu kao kartica (kad nije reduced motion) */
  crochetMorph: CrochetMorph;
  materials: string;
  dimensions: string;
  care: string;
  madeIn: string;
}

interface ProductModalProps {
  product: ProductDetail | null;
  onClose: () => void;
  /** Called when user confirms add to cart from the modal CTA. */
  onAddToCart?: () => void;
}

export type { ProductDetail };

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgKenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const animateIn = useCallback(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (reducedMotion) {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(panelRef.current, { opacity: 1, y: 0 });
      if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" });
      if (imgKenRef.current) gsap.set(imgKenRef.current, { scale: 1 });
      const kids = contentRef.current?.children;
      if (kids?.length) gsap.set(kids, { opacity: 1, y: 0 });
      return;
    }

    const contentEls = contentRef.current?.children
      ? Array.from(contentRef.current.children)
      : [];

    const tl = gsap.timeline();
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      .fromTo(
        panelRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.4"
      );

    if (contentEls.length > 0) {
      gsap.set(contentEls, { opacity: 0, y: 12 });
      tl.to(
        contentEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.055,
          ease: "power3.out",
        },
        "-=0.35"
      );
    }
  }, [reducedMotion]);

  const scrollToTiktokAfterClose = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("tiktok")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }, 640);
  }, [reducedMotion]);

  const animateOut = useCallback(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (reducedMotion) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(panelRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.4,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.15"
    );
  }, [onClose, reducedMotion]);

  useEffect(() => {
    if (product) {
      animateIn();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product, animateIn]);

  useLayoutEffect(() => {
    if (!product || reducedMotion) return;
    const el = imgKenRef.current;
    if (!el) return;
    gsap.set(el, { scale: 1, transformOrigin: "50% 50%" });
    const tween = gsap.to(el, {
      scale: 1.02,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [product, reducedMotion]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateOut();
    };
    if (product) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [product, animateOut]);

  if (!product) return null;

  const useCrochet3d = !reducedMotion && product.displayMode !== "image";

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === backdropRef.current) animateOut();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div ref={panelRef} className={styles.panel}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={animateOut}
          aria-label="Zatvori"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        <div ref={imageRef} className={styles.imageCol}>
          <div ref={imgKenRef} className={styles.imgWrap}>
            {useCrochet3d ? (
              <ProductCrochetThumb3D
                morph={product.crochetMorph}
                variant="modal"
                className={styles.thumbCrochet3d}
              />
            ) : (
              <Image
                src={product.img}
                alt={product.name}
                fill
                className={`${styles.img} floating-img`}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: product.imageFit ?? "cover" }}
              />
            )}
          </div>
          <div className={styles.imgGlow} />
        </div>

        <div ref={contentRef} className={styles.contentCol}>
          <span className={styles.tag}>{product.tag}</span>
          <h2 className={styles.name}>{product.name}</h2>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              {product.price > 0 ? `€${product.price}` : "Po dogovoru"}
            </span>
            <span className={styles.priceLabel}>Ručni original</span>
          </div>

          <div className={styles.divider} />

          {product.storyLine ? (
            <p className={styles.storyLine}>{product.storyLine}</p>
          ) : null}

          <p className={styles.longDesc}>{product.longDesc}</p>

          {product.exteriorLuxury ? (
            <section className={styles.luxuryBlock} aria-labelledby={`exterior-${product.id}`}>
              <h3 id={`exterior-${product.id}`} className={styles.luxuryHeading}>
                Izvana
              </h3>
              <div className={styles.luxuryRule} aria-hidden />
              {luxuryParagraphs(product.exteriorLuxury).map((para, i) => (
                <p key={`ex-${product.id}-${i}`} className={styles.luxuryText}>
                  {para}
                </p>
              ))}
            </section>
          ) : null}

          {product.interiorLuxury ? (
            <section className={styles.luxuryBlock} aria-labelledby={`interior-${product.id}`}>
              <h3 id={`interior-${product.id}`} className={styles.luxuryHeading}>
                Unutra
              </h3>
              <div className={styles.luxuryRule} aria-hidden />
              {luxuryParagraphs(product.interiorLuxury).map((para, i) => (
                <p key={`in-${product.id}-${i}`} className={styles.luxuryText}>
                  {para}
                </p>
              ))}
            </section>
          ) : null}

          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 4v4l2.5 1.5" />
                </svg>
              </span>
              <div>
                <span className={styles.specLabel}>Materijali</span>
                <span className={styles.specValue}>{product.materials}</span>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="2" width="12" height="12" rx="1" />
                  <line x1="8" y1="2" x2="8" y2="14" />
                  <line x1="2" y1="8" x2="14" y2="8" />
                </svg>
              </span>
              <div>
                <span className={styles.specLabel}>Dimenzije</span>
                <span className={styles.specValue}>{product.dimensions}</span>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 12c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                  <circle cx="8" cy="5" r="2.5" />
                </svg>
              </span>
              <div>
                <span className={styles.specLabel}>Poreklo</span>
                <span className={styles.specValue}>{product.madeIn}</span>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M3 8l3 3 7-7" />
                </svg>
              </span>
              <div>
                <span className={styles.specLabel}>Nega</span>
                <span className={styles.specValue}>{product.care}</span>
              </div>
            </div>
            {product.packaging ? (
              <div className={styles.spec}>
                <span className={styles.specIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M2 5h12v9H2V5z" />
                    <path d="M2 5l6-3 6 3" />
                    <path d="M8 2v12" />
                  </svg>
                </span>
                <div>
                  <span className={styles.specLabel}>Pakovanje</span>
                  <span className={styles.specValue}>{product.packaging}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onAddToCart?.();
                animateOut();
              }}
            >
              <span>
                Dodaj u korpu —{" "}
                {product.price > 0 ? `€${product.price}` : "po dogovoru"}
              </span>
            </button>
          </div>

          <p className={styles.tiktokHint}>
            <a
              href="#tiktok"
              className={styles.tiktokLink}
              onClick={(e) => {
                e.preventDefault();
                animateOut();
                scrollToTiktokAfterClose();
              }}
            >
              Pogledaj kako to nastaje na TikTok-u
            </a>
          </p>

          <p className={styles.note}>
            Svaki komad je jedinstven. Uz njega ide sertifikat autentičnosti.
          </p>
        </div>
      </div>
    </div>
  );
}
