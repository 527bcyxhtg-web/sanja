"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import styles from "./Navigation.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCart } from "@/components/providers/CartProvider";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const cartRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { totalQty } = useCart();

  useLayoutEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const ul = linksRef.current;
    const cart = cartRef.current;
    if (!nav || !logo || !ul || !cart) return;

    const linkItems = ul.querySelectorAll<HTMLElement>("li");

    if (reducedMotion) {
      gsap.set([logo, cart, ...linkItems], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([logo, cart, ...linkItems], { opacity: 0, y: -10 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(logo, { opacity: 1, y: 0, duration: 0.55 })
        .to(
          cart,
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .to(
          linkItems,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        );
    }, nav);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 48);

        // Scroll progress bar
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? scrollY / total : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${pct})`;
        }

        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#pleteno", label: "Ručno" },
    { href: "#story", label: "Story" },
    { href: "#live-atelier", label: "Iskustvo" },
    { href: "#shop", label: "Collection" },
    { href: "#process", label: "Process" },
    { href: "#tiktok", label: "Live" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Scroll progress — thin gold line that grows from left as user reads */}
      <div ref={progressRef} className={styles.scrollProgress} aria-hidden />
      <a ref={logoRef} href="#hero" className={styles.logo}>
        Sanja <span className={styles.logoAccent}>Krstić</span>
      </a>

      <ul ref={linksRef} className={styles.links}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link}>{link.label}</a>
          </li>
        ))}
      </ul>

      <button
        ref={cartRef}
        type="button"
        className={styles.cart}
        onClick={() => {
          window.location.hash = "#shop";
        }}
        aria-label={`Korpa, ${totalQty} stavki`}
      >
        <span>BAG</span>
        <span className={styles.cartCount}>{totalQty > 99 ? "99+" : totalQty}</span>
      </button>

      <button
        type="button"
        className={styles.hamburger}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
