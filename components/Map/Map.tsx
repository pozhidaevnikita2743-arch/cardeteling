"use client";

import { useState } from "react";
import { clientConfig } from "@/config/client";
import styles from "./Map.module.css";

export default function MapEmbed() {
  const { contacts } = clientConfig;
  const [active, setActive] = useState(false);

  return (
    <div className={styles.frame}>
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=61.402554%2C55.159897&z=13&l=map&pt=61.402554,55.159897,pm2rdl"
        className={styles.iframe}
        style={{ pointerEvents: active ? "auto" : "none" }}
        loading="lazy"
        title={`Карта — ${contacts.city}`}
      />
      <div className={styles.vignette} aria-hidden />

      {!active && (
        <button
          type="button"
          className={styles.activateOverlay}
          onClick={() => setActive(true)}
        >
          <span className={styles.activateHint}>Нажмите, чтобы открыть карту</span>
        </button>
      )}
    </div>
  );
}
