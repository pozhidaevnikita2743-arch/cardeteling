"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clientConfig } from "@/config/client";
import BeforeAfterSlider from "./BeforeAfterSlider";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.headingRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>Наши работы</h2>
          <p className={styles.note}>
            В полной версии сайта — полноценная галерея с фото до/после по каждому проекту
          </p>
        </motion.div>

        <div className={styles.grid}>
          {clientConfig.gallery.map((item, i) => (
            <motion.div
              key={item.caption + i}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              {item.beforeSrc && item.afterSrc ? (
                <BeforeAfterSlider
                  beforeSrc={item.beforeSrc}
                  afterSrc={item.afterSrc}
                  alt={item.caption}
                />
              ) : item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={item.caption}
                  fill
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholder}>
                  <svg
                    className={styles.placeholderIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.4" />
                    <circle cx="9" cy="10" r="1.6" strokeWidth="1.4" />
                    <path d="M3 16l5-5 4 4 3-3 6 6" strokeWidth="1.4" />
                  </svg>
                </div>
              )}
              <span className={styles.caption}>{item.caption}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
