"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clientConfig } from "@/config/client";
import MapEmbed from "@/components/Map/Map";
import styles from "./Booking.module.css";

function getNextDays(count: number) {
  const days = [];
  const now = new Date();
  const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "short" });
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      label: weekday.format(d).replace(".", ""),
      date: d.getDate(),
    });
  }
  return days;
}

const TIME_SLOTS = ["10:00", "12:30", "14:00", "16:30", "18:00"];

export default function Booking() {
  const days = getNextDays(7);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [submitted, setSubmitted] = useState(false);

  const { booking, services } = clientConfig;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.headingBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>{booking.heading}</h2>
          <p className={styles.subheading}>{booking.subheading}</p>
        </motion.div>

        <div className={styles.layout}>
          <motion.div
            className={styles.mapCol}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <MapEmbed />
          </motion.div>

          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
          <div className={styles.calendar}>
            <span className={styles.calendarLabel}>Выберите дату</span>
            <div className={styles.days}>
              {days.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.day} ${selectedDay === i ? styles.dayActive : ""}`}
                  onClick={() => setSelectedDay(i)}
                >
                  <span className={styles.dayWeekday}>{d.label}</span>
                  <span className={styles.dayNumber}>{d.date}</span>
                </button>
              ))}
            </div>

            <span className={styles.calendarLabel}>Выберите время</span>
            <div className={styles.times}>
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`${styles.time} ${selectedTime === t ? styles.timeActive : ""}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className={styles.thanks}>
              <span className={styles.thanksTitle}>Заявка отправлена</span>
              <p className={styles.thanksText}>
                Мы свяжемся с вами в ближайшее время, чтобы подтвердить запись.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                placeholder="Ваше имя"
                required
              />
              <input
                className={styles.input}
                type="tel"
                placeholder="Телефон"
                required
              />
              <select className={styles.input} defaultValue="">
                <option value="" disabled>
                  Выберите услугу
                </option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>

              <button type="submit" className={styles.submit}>
                Записаться
              </button>

              <p className={styles.note}>{booking.note}</p>
            </form>
          )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
