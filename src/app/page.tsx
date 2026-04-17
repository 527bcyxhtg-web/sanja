"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/layout/Hero";
import Navigation from "@/components/layout/Navigation";
import Loader from "@/components/ui/Loader";
import styles from "./page.module.css";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const PageAmbient = dynamic(() => import("@/components/vfx/PageAmbient"), {
  ssr: false,
});
const Marquee = dynamic(() => import("@/components/ui/Marquee"), {
  ssr: false,
});
const HandwovenSouls = dynamic(
  () => import("@/components/layout/HandwovenSouls"),
  { ssr: false }
);
const SectionDivider = dynamic(
  () => import("@/components/ui/SectionDivider"),
  { ssr: false }
);
const PlushAtelierGallery = dynamic(
  () => import("@/components/layout/PlushAtelierGallery"),
  { ssr: false }
);
const About = dynamic(() => import("@/components/layout/About"), {
  ssr: false,
});
const Products = dynamic(() => import("@/components/layout/Products"), {
  ssr: false,
});
const TikTokShowcase = dynamic(
  () => import("@/components/layout/TikTokShowcase"),
  { ssr: false }
);
const CraftingProcess = dynamic(
  () => import("@/components/layout/CraftingProcess"),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("@/components/layout/Testimonials"),
  { ssr: false }
);
const Contact = dynamic(() => import("@/components/layout/Contact"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <PageAmbient />

      <main className={styles.main}>
        <Navigation />
        <Hero />
        <Marquee />
        <HandwovenSouls />
        <SectionDivider chapter="I" />
        <PlushAtelierGallery />
        <SectionDivider chapter="II" />
        <About />
        <SectionDivider chapter="III" />
        <Products />
        <SectionDivider chapter="IV" />
        <TikTokShowcase />
        <SectionDivider chapter="V" />
        <CraftingProcess />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
