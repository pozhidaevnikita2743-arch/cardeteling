"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BeforeAfterSlider.module.css";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={styles.slider}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <Image src={afterSrc} alt={`${alt} — после`} fill className={styles.image} />
      <div className={styles.beforeLayer} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={beforeSrc} alt={`${alt} — до`} fill className={styles.image} />
      </div>

      <div className={styles.handle} style={{ left: `${pos}%` }}>
        <span className={styles.handleGrip}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 7l-4 5 4 5M15 7l4 5-4 5"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <span className={styles.tagBefore}>До</span>
      <span className={styles.tagAfter}>После</span>
    </div>
  );
}
