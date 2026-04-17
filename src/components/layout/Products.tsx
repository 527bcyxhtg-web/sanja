"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StorySymbolLayer from "@/components/vfx/StorySymbolLayer";
import {
  createTextReveal,
  createFadeReveal,
  bindStoryParallax,
  createStoryStageReveal,
} from "@/lib/gsapUtils";
import SectionVisualStrip, {
  type SectionStripImage,
} from "@/components/ui/SectionVisualStrip";
import ProductModal, { type ProductDetail } from "@/components/ui/ProductModal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import FallingMotifs from "@/components/vfx/FallingMotifs";
import ProductCrochetThumb3D from "@/components/3d/ProductCrochetThumb3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/components/providers/CartProvider";
import styles from "./Products.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Product extends ProductDetail {}

const ORDER_JOURNEY = [
  {
    num: "01",
    title: "Odaberi",
    desc: "Komad iz uživo sesije ili gotov iz istaknutih favorita — cijena i materijal su na kartici, bez skrivene fabrike.",
  },
  {
    num: "02",
    title: "Dogovor",
    desc: "Poruka ili forma: nijanse, mašna, rok. Sanja potvrdi prije šava — TikTok transparentnost, kutija iste ruke.",
  },
  {
    num: "03",
    title: "Prati",
    desc: "Ako želiš, uđi na TikTok u termin: vidiš zadnje krugove, pitaš u chatu, osjećaš ritam atelijera iz Novog Sada.",
  },
  {
    num: "04",
    title: "Zagrli",
    desc: "Luksuzno pakovanje i sertifikat autentičnosti stižu na prag — saputnik s istom pričom koju si pratila.",
  },
] as const;

type ShopFilterId = "all" | "live" | "spotlight";

const SHOP_FILTERS: {
  id: ShopFilterId;
  label: string;
  predicate: (p: Product) => boolean;
}[] = [
  { id: "all", label: "Svi", predicate: () => true },
  { id: "live", label: "Uživo", predicate: (p) => p.tag === "Live Made" },
  { id: "spotlight", label: "Istaknuto", predicate: (p) => p.tag !== "Live Made" },
];

function stripImagesFromProducts(list: Product[]): SectionStripImage[] {
  return list.map((p) => ({ src: p.img, alt: p.name }));
}

interface ShopProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  tiltEnabled: boolean;
  reducedMotion: boolean;
}

function ShopProductCard({
  product,
  onAdd,
  onOpen,
  tiltEnabled,
  reducedMotion,
}: ShopProductCardProps) {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tiltEnabled) return;
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = root.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = `rotateX(${-py * 9}deg) rotateY(${px * 9}deg) translateZ(0)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafId);
      inner.style.transform = "";
    };

    root.addEventListener("mousemove", handleMove, { passive: true });
    root.addEventListener("mouseleave", handleLeave, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener("mousemove", handleMove);
      root.removeEventListener("mouseleave", handleLeave);
    };
  }, [tiltEnabled]);

  const useCrochet3d = !reducedMotion && product.displayMode !== "image";

  const isLiveMade = product.tag === "Live Made";

  return (
    <article
      ref={rootRef}
      className={styles.card3d}
      data-cursor="view"
      data-live={isLiveMade ? "true" : undefined}
      aria-labelledby={`product-title-${product.id}`}
      onClick={() => onOpen(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(product);
        }
      }}
    >
      <div ref={innerRef} className={styles.cardInner}>
        <div className={styles.imgWrap}>
          {useCrochet3d ? (
            <ProductCrochetThumb3D
              morph={product.crochetMorph}
              variant="card"
              className={styles.thumb3d}
            />
          ) : (
            <Image
              src={product.img}
              alt={product.name}
              fill
              className={`${styles.img} floating-img`}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              loading="lazy"
              style={{ objectFit: product.imageFit ?? "cover" }}
            />
          )}
          <div className={styles.viewOverlay}>
            <span className={styles.viewLabel}>Pogledaj priču</span>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.tag}>{product.tag}</span>
          <h3 id={`product-title-${product.id}`} className={styles.name}>
            {product.name}
          </h3>
          <p className={styles.desc}>{product.desc}</p>
          {product.luxuryTeaser ? (
            <p className={styles.luxuryTeaser}>{product.luxuryTeaser}</p>
          ) : null}
          {product.highlights && product.highlights.length > 0 ? (
            <ul className={styles.highlights} aria-label="Istaknuti detalji">
              {product.highlights.map((h) => (
                <li key={h} className={styles.highlightChip}>
                  {h}
                </li>
              ))}
            </ul>
          ) : null}
          {product.storyLine ? (
            <p className={styles.storyLine}>{product.storyLine}</p>
          ) : null}
          <div className={styles.bottom}>
            <span className={styles.price}>
              {product.price > 0 ? `€${product.price}` : "Po dogovoru"}
            </span>
            <button
              type="button"
              className={styles.addBtn}
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product);
              }}
            >
              U korpu
            </button>
          </div>
          {product.tag === "Live Made" ? (
            <p className={styles.liveQueueHint}>Red uživo — za termin piši u DM na TikTok-u.</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const { products } = useProducts();
  const { addProduct } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cardTiltOk, setCardTiltOk] = useState(false);
  const [shopFilter, setShopFilter] = useState<ShopFilterId>("all");
  const reducedMotion = useReducedMotion();

  const filteredProducts = useMemo(() => {
    const f = SHOP_FILTERS.find((x) => x.id === shopFilter);
    const pred = f?.predicate ?? (() => true);
    return products.filter(pred);
  }, [shopFilter, products]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px) and (pointer: fine)");
    const sync = () => setCardTiltOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      addProduct(product);
      setToast(`${product.name} — dodato u korpu!`);
      setTimeout(() => setToast(""), 2500);
    },
    [addProduct]
  );

  const openProduct = useCallback((p: Product) => {
    setSelectedProduct(p);
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".shop-anim", { opacity: 1, y: 0 });
      gsap.set(".shop-card-stagger", { opacity: 1, y: 0 });
      if (introStageRef.current) {
        gsap.set(introStageRef.current, { clearProps: "opacity,transform" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (introStageRef.current) {
        createStoryStageReveal(introStageRef.current, section, {
          start: "top 87%",
          duration: 0.92,
        });
      }

      const labels = section.querySelectorAll<HTMLElement>(".section-label.shop-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.shop-anim");
      createTextReveal(labels, section, { start: "top 85%" });
      createTextReveal(titles, section, { delay: 0.1, start: "top 85%" });

      const rest = section.querySelectorAll<HTMLElement>(
        ".shop-anim:not(.section-label):not(.section-title)"
      );
      createFadeReveal(rest, section, { stagger: 0.08, start: "top 82%" });

      const catalog = section.querySelector<HTMLElement>("[data-shop-catalog]");
      if (catalog) {
        const cards = catalog.querySelectorAll<HTMLElement>(".shop-card-stagger");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: catalog,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      if (introRef.current) {
        bindStoryParallax(introRef.current, section, { y: 20, scrub: 1.45 });
      }
    }, section);
    return () => ctx.revert();
  }, [reducedMotion, shopFilter, products]);

  return (
    <div className={styles.shopShell}>
      <div className={styles.shopBg} aria-hidden>
        <FallingMotifs />
        <div className={styles.shopNoise} />
      </div>

      <section ref={sectionRef} id="shop" className={styles.shop}>
        <div ref={introRef} className={styles.intro}>
          <StorySymbolLayer variant="sparse" />
          <div ref={introStageRef} className={styles.introStory3d}>
            <div className={styles.introText}>
              <div className="section-label shop-anim">Kolekcija</div>
              <h2 className="section-title shop-anim">
                Saputnici sa <em>pričom</em>
              </h2>
              <p className={`${styles.introLead} shop-anim`}>
                Jedna vitrina za cijelu kolekciju — uživo, favoriti i uskoro stižući komadi na
                istom mjestu. Filtri ispod sužavaju prikaz; strip i mreža uvijek prate odabrani
                rezultat. Svaka kartica nosi kratki narativ; klik otvara cijelu priču, materijale
                i brigu koju Sanja ugrađuje u svaki šav.
              </p>

              <div className={`${styles.orderJourney} shop-anim`}>
                {ORDER_JOURNEY.map((step) => (
                  <div key={step.num} className={styles.orderStep}>
                    <span className={styles.orderStepNum}>{step.num}</span>
                    <span className={styles.orderStepTitle}>{step.title}</span>
                    <p className={styles.orderStepDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>

              <FaqAccordion className="shop-anim" />
            </div>
          </div>
        </div>

        <div className={styles.catalogBlock} data-shop-catalog>
          <div className={`${styles.catalogToolbar} shop-anim`}>
            <span className={styles.catalogToolbarLabel}>Filtriraj</span>
            {SHOP_FILTERS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`${styles.filterChip} ${
                  shopFilter === chip.id ? styles.filterChipActive : ""
                }`}
                aria-pressed={shopFilter === chip.id ? "true" : "false"}
                onClick={() => setShopFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className={`${styles.subSubtitle} shop-anim`} role="status">
              Nema komada u ovoj kategoriji — probaj „Svi“.
            </p>
          ) : (
            <>
              <div className={`${styles.filmStrip} shop-anim`}>
                <SectionVisualStrip
                  embedded
                  images={stripImagesFromProducts(filteredProducts)}
                />
              </div>

              <div className={styles.cardsGrid}>
                {filteredProducts.map((p) => (
                  <div key={p.id} className="shop-card-stagger">
                    <ShopProductCard
                      product={p}
                      onAdd={addToCart}
                      onOpen={openProduct}
                      tiltEnabled={cardTiltOk && !reducedMotion}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {toast ? (
          <div className={styles.toast} role="status">
            {toast}
          </div>
        ) : null}

        <ProductModal
          product={selectedProduct}
          onClose={closeProduct}
          onAddToCart={() => {
            if (selectedProduct) addToCart(selectedProduct);
          }}
        />
      </section>
    </div>
  );
}
