"use client";

import { motion } from "framer-motion";
import { clientConfig } from "@/config/client";
import styles from "./Advantages.module.css";

const ADVANTAGE_ICONS = [
  // автопарк — силуэт машины
  (
    <svg key="fleet" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 15.5l1.6-4.8A2 2 0 0 1 6.5 9.3h11a2 2 0 0 1 1.9 1.4l1.6 4.8"
        strokeWidth="1.6"
      />
      <rect x="2.5" y="15.5" width="19" height="3.5" rx="1.2" strokeWidth="1.6" />
      <circle cx="7" cy="19" r="1.3" strokeWidth="1.6" />
      <circle cx="17" cy="19" r="1.3" strokeWidth="1.6" />
    </svg>
  ),
  // гарантия — медаль
  (
    <svg key="warranty" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="5" strokeWidth="1.6" />
      <path d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" strokeWidth="1.6" />
    </svg>
  ),
  // химия — колба
  (
    <svg key="chemistry" viewBox="0 0 24 24" fill="none">
      <path d="M9 3h6" strokeWidth="1.6" />
      <path
        d="M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3"
        strokeWidth="1.6"
      />
      <path d="M7.5 14h9" strokeWidth="1.6" />
    </svg>
  ),
  // забор и доставка — грузовик
  (
    <svg key="delivery" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="7" width="11" height="8" rx="1" strokeWidth="1.6" />
      <path d="M13.5 10h3.5l3 3v2h-6.5z" strokeWidth="1.6" />
      <circle cx="7" cy="17" r="1.6" strokeWidth="1.6" />
      <circle cx="16.5" cy="17" r="1.6" strokeWidth="1.6" />
    </svg>
  ),
];

export default function Advantages() {
  return (
    <section id="advantages" className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Почему выбирают нас
        </motion.h2>

        <div className={styles.list}>
          {clientConfig.advantages.map((item, i) => (
            <motion.div
              key={item}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.itemIcon}>{ADVANTAGE_ICONS[i]}</div>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
