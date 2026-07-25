"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clientConfig } from "@/config/client";
import CarReveal from "./CarReveal";
import styles from "./Hero.module.css";

const NAV_ITEMS = [
  { href: "#services", label: "Услуги" },
  { href: "#gallery", label: "Работы" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#booking", label: "Контакты" },
];

export default function Hero() {
  const { hero, companyName, niche, contacts } = clientConfig;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.topbar} ${scrolled ? styles.topbarScrolled : ""}`}
      >
        <div className={`container ${styles.topbarInner}`}>
          <div className={styles.brandGroup}>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Открыты для записи
            </span>
            <span className={styles.logo}>{companyName}</span>
          </div>

          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}
            className={styles.phone}
          >
            <span className={styles.phoneLabel}>{contacts.phone}</span>
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.bgBase} />

        <div className={styles.grid}>
        <div className={styles.textCol}>
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {niche.toUpperCase()} · {contacts.city}
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: "easeOut" }}
          >
            <a href="#booking" className={styles.cta}>
              <span className={styles.ctaFace}>
                <span className={styles.ctaLabel}>{hero.ctaText}</span>
              </span>
            </a>
          </motion.div>
        </div>

        <div className={styles.carCol}>
          {hero.baseImage && hero.wrapImage ? (
            <CarReveal
              baseSrc={hero.baseImage}
              wrapSrc={hero.wrapImage}
              blurData={hero.blurData}
              alt={`${companyName} — оклейка автомобиля плёнкой`}
              ctaText={hero.ctaText}
            />
          ) : null}
        </div>
      </div>
      </section>
    </>
  );
}
