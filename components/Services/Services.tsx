"use client";

import { motion } from "framer-motion";
import { clientConfig } from "@/config/client";
import styles from "./Services.module.css";

const SERVICE_ICONS = [
  // полировка — диск с бликами
  (
    <svg key="polish" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="6" strokeWidth="1.6" />
      <path d="M12 3v2.2M18.4 6.6l-1.5 1.5M5.6 6.6l1.5 1.5" strokeWidth="1.6" />
    </svg>
  ),
  // керамика — соты + капля
  (
    <svg key="ceramic" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.5l8 4.5v9L12 20.5l-8-4.5v-9l8-4.5z" strokeWidth="1.6" />
      <path
        d="M12 8c1.8 2.2 2.6 3.6 2.6 5a2.6 2.6 0 1 1-5.2 0c0-1.4.8-2.8 2.6-5z"
        strokeWidth="1.6"
      />
    </svg>
  ),
  // химчистка — кресло + блеск
  (
    <svg key="interior" viewBox="0 0 24 24" fill="none">
      <path d="M7 13V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" strokeWidth="1.6" />
      <path
        d="M6 13h9a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2z"
        strokeWidth="1.6"
      />
      <path
        d="M17.5 6.2l.75 1.55 1.55.75-1.55.75-.75 1.55-.75-1.55-1.55-.75 1.55-.75z"
        strokeWidth="1.4"
      />
    </svg>
  ),
  // плёнка — щит с галочкой
  (
    <svg key="wrap" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        strokeWidth="1.6"
      />
      <path d="M9 12.2l2 2 4-4.4" strokeWidth="1.6" />
    </svg>
  ),
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Что мы делаем
        </motion.h2>

        <div className={styles.grid}>
          {clientConfig.services.map((service, i) => (
            <motion.div
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.cardIcon}>{SERVICE_ICONS[i]}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
