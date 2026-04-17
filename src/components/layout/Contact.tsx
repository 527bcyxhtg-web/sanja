"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionDivider from "@/components/ui/SectionDivider";
import { createTextReveal, createImageReveal, createFadeReveal } from "@/lib/gsapUtils";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(".ct-anim", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const labels = section.querySelectorAll<HTMLElement>(".section-label.ct-anim");
      const titles = section.querySelectorAll<HTMLElement>(".section-title.ct-anim");
      createTextReveal(labels, section, { start: "top 85%" });
      createTextReveal(titles, section, { delay: 0.1, start: "top 85%" });

      const rest = section.querySelectorAll<HTMLElement>(".ct-anim:not(.section-label):not(.section-title)");
      createFadeReveal(rest, section, { stagger: 0.1, start: "top 80%" });

      if (imgRef.current) {
        createImageReveal(imgRef.current, section, { direction: "up", start: "top 80%" });
        gsap.to(imgRef.current, {
          y: -30,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <SectionDivider />
      <div className={styles.inner}>
        <div className={styles.info}>
          <div className="section-label ct-anim">Get in Touch</div>
          <h2 className="section-title ct-anim">Let&apos;s <em>Create</em> Together</h2>
          <p className={`${styles.desc} ct-anim`}>
            Have a custom request? Want to commission a special piece?
            I&apos;d love to hear from you.
          </p>
          <div className={`${styles.details} ct-anim`}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>hello@sanjakrstic.com</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>Novi Sad, Serbia</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>TikTok</span>
              <span className={styles.detailValue}>@sanjakrstic8</span>
            </div>
          </div>

          <div ref={imgRef} className={`${styles.visual} ct-anim`}>
            <div className={styles.floatWrap}>
              <Image
                src={siteImages.contact}
                alt="Gift-wrapped handmade plush — studio detail"
                fill
                className={`${styles.visualImg} floating-img`}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={`${styles.form} ct-anim`}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              placeholder="Your name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
              placeholder="Your email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={styles.textarea}
              placeholder="Tell me about your request..."
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            <span>{isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : "Send Message"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
