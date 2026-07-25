"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import styles from "./CarScene.module.css";

interface CarSceneProps {
  progress: MotionValue<number>;
}

const BODY_PATH =
  "M180,400 L150,360 L150,330 Q140,300 170,270 L250,230 L430,180 L500,125 L780,120 L860,175 L940,225 L1010,275 L1045,330 L1045,360 L1015,400 L1015,415 L185,415 Z";

const WINDOW_PATH = "M450,195 L515,145 L770,140 L845,190 L845,207 L450,207 Z";

const WHEELS = [
  { cx: 340, cy: 382, r: 78 },
  { cx: 880, cy: 382, r: 78 },
];

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const spokes = Array.from({ length: 5 });
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r={r} fill="#0b0d10" stroke="#000" strokeWidth={2} />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
      >
        <circle r={r * 0.62} fill="url(#rimMetal)" />
        {spokes.map((_, i) => (
          <rect
            key={i}
            x={-4}
            y={-r * 0.55}
            width={8}
            height={r * 0.5}
            rx={3}
            fill="#3a4048"
            transform={`rotate(${(360 / spokes.length) * i})`}
          />
        ))}
        <circle r={r * 0.15} fill="var(--color-accent)" />
      </motion.g>
    </g>
  );
}

export default function CarScene({ progress }: CarSceneProps) {
  const rotateY = useTransform(progress, [0, 1], [-18, 18]);

  const wrapWidth = useTransform(progress, [0.16, 0.78], [0, 1200]);
  const glossX = useTransform(wrapWidth, (v) => v - 24);
  const glossOpacity = useTransform(
    progress,
    [0.16, 0.22, 0.72, 0.8],
    [0, 1, 1, 0]
  );

  return (
    <div className={styles.stage}>
      <motion.div
        className={styles.carWrap}
        style={{ rotateY }}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 1200 480"
          className={styles.svg}
          role="img"
          aria-label="Автомобиль в процессе оклейки защитной плёнкой"
        >
          <defs>
            <linearGradient id="bodyBaseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b323c" />
              <stop offset="100%" stopColor="#12161b" />
            </linearGradient>
            <linearGradient id="bodyWrapGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-dark)" }} />
              <stop offset="40%" style={{ stopColor: "var(--color-accent)" }} />
              <stop offset="52%" stopColor="#fff6d8" />
              <stop offset="65%" style={{ stopColor: "var(--color-accent)" }} />
              <stop offset="100%" stopColor="#5f4a1c" />
            </linearGradient>
            <linearGradient id="rimMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b929c" />
              <stop offset="100%" stopColor="#3a3f46" />
            </linearGradient>
            <linearGradient id="glossBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopOpacity="0" stopColor="#fff" />
              <stop offset="50%" stopOpacity="0.9" stopColor="#fff8e0" />
              <stop offset="100%" stopOpacity="0" stopColor="#fff" />
            </linearGradient>
            <clipPath id="wrapClip">
              <motion.rect x={0} y={0} width={wrapWidth} height={480} />
            </clipPath>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <path id="carBodyPath" d={BODY_PATH} />
          </defs>

          <ellipse
            cx={610}
            cy={438}
            rx={470}
            ry={22}
            fill="black"
            opacity={0.45}
            filter="url(#softBlur)"
          />

          <use href="#carBodyPath" fill="url(#bodyBaseGrad)" />

          <g clipPath="url(#wrapClip)">
            <use href="#carBodyPath" fill="url(#bodyWrapGrad)" />
          </g>

          <path d={WINDOW_PATH} fill="#93b4c9" opacity={0.35} />

          <path
            d="M300,255 L950,258"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={3}
            fill="none"
          />

          <ellipse cx={205} cy={295} rx={16} ry={9} fill="#f5f3ee" opacity={0.85} />
          <ellipse
            cx={1015}
            cy={300}
            rx={14}
            ry={9}
            fill="var(--color-accent)"
            opacity={0.9}
          />

          <motion.rect
            x={glossX}
            y={100}
            width={46}
            height={340}
            fill="url(#glossBar)"
            opacity={glossOpacity}
            filter="url(#softBlur)"
            style={{ mixBlendMode: "screen" }}
            transform="skewX(-12)"
          />

          {WHEELS.map((w, i) => (
            <Wheel key={i} {...w} />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
