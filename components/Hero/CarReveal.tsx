"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CarReveal.module.css";

interface CarRevealProps {
  baseSrc: string;
  wrapSrc: string;
  blurData?: string;
  alt: string;
  ctaText: string;
}

const COMPLETE_THRESHOLD = 0.65;
// Прямоугольник, приближающий силуэт машины в кадре (доли от размера)
const ROI = { x0: 0.02, y0: 0.04, x1: 0.98, y1: 0.96 };

export default function CarReveal({
  baseSrc,
  wrapSrc,
  blurData,
  alt,
  ctaText,
}: CarRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const wrapImgRef = useRef<HTMLImageElement | null>(null);
  const sampleRef = useRef<HTMLCanvasElement | null>(null);

  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const userInteractedRef = useRef(false);
  const completedRef = useRef(false);
  const radiusRef = useRef(90);
  const renderRafRef = useRef(0);
  const autoRafRef = useRef(0);
  const finishRafRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sampleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [fallback, setFallback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [interacted, setInteracted] = useState(false);

  // --- рисование маски ---------------------------------------------------
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const mask = maskRef.current;
    const wrap = wrapImgRef.current;
    if (!canvas || !mask || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // повторяем CSS object-fit:cover при отрисовке в canvas, чтобы картинка
    // не растягивалась, если пропорции контейнера отличаются от 1185:560
    const srcW = wrap.naturalWidth || wrap.width;
    const srcH = wrap.naturalHeight || wrap.height;
    const srcRatio = srcW / srcH;
    const dstRatio = canvas.width / canvas.height;
    let sx = 0;
    let sy = 0;
    let sw = srcW;
    let sh = srcH;
    if (srcRatio > dstRatio) {
      sw = srcH * dstRatio;
      sx = (srcW - sw) / 2;
    } else {
      sh = srcW / dstRatio;
      sy = (srcH - sh) / 2;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(wrap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }, []);

  const scheduleRender = useCallback(() => {
    if (renderRafRef.current) return;
    renderRafRef.current = requestAnimationFrame(() => {
      renderRafRef.current = 0;
      render();
    });
  }, [render]);

  const stamp = useCallback((x: number, y: number, radius?: number) => {
    const mask = maskRef.current;
    if (!mask) return;
    const mctx = mask.getContext("2d");
    if (!mctx) return;
    const r = radius ?? radiusRef.current;
    const g = mctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(0,0,0,0.95)");
    g.addColorStop(0.6, "rgba(0,0,0,0.7)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    mctx.globalCompositeOperation = "source-over";
    mctx.fillStyle = g;
    mctx.beginPath();
    mctx.arc(x, y, r, 0, Math.PI * 2);
    mctx.fill();
  }, []);

  const strokeTo = useCallback(
    (x: number, y: number, radius?: number) => {
      const r = radius ?? radiusRef.current;
      const last = lastPtRef.current;
      if (!last) {
        stamp(x, y, r);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(r / 3, 1);
        const n = Math.floor(dist / step);
        for (let i = 1; i <= n; i++) {
          stamp(last.x + dx * (i / n), last.y + dy * (i / n), r);
        }
        if (n === 0) stamp(x, y, r);
      }
      lastPtRef.current = { x, y };
      scheduleRender();
    },
    [stamp, scheduleRender]
  );

  // --- измерение проявленной площади -------------------------------------
  const sampleProgress = useCallback(() => {
    const mask = maskRef.current;
    if (!mask || !mask.width) return 0;
    let sample = sampleRef.current;
    if (!sample) {
      sample = document.createElement("canvas");
      sampleRef.current = sample;
    }
    const SW = 120;
    const SH = Math.max(1, Math.round((SW * mask.height) / mask.width));
    sample.width = SW;
    sample.height = SH;
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    if (!sctx) return 0;
    sctx.clearRect(0, 0, SW, SH);
    sctx.drawImage(mask, 0, 0, SW, SH);
    const x0 = Math.floor(ROI.x0 * SW);
    const x1 = Math.ceil(ROI.x1 * SW);
    const y0 = Math.floor(ROI.y0 * SH);
    const y1 = Math.ceil(ROI.y1 * SH);
    const data = sctx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
    let painted = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4) {
      total++;
      if (data[i] > 40) painted++;
    }
    return total ? painted / total : 0;
  }, []);

  // --- завершение: плавно доводим до 100% --------------------------------
  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
    const mask = maskRef.current;
    if (!mask) return;
    const mctx = mask.getContext("2d");
    if (!mctx) return;
    const start = performance.now();
    const dur = 600;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = "rgba(0,0,0,0.14)";
      mctx.fillRect(0, 0, mask.width, mask.height);
      render();
      if (k < 1) {
        finishRafRef.current = requestAnimationFrame(step);
      } else {
        setCompleted(true);
      }
    };
    finishRafRef.current = requestAnimationFrame(step);
  }, [render]);

  const startSampling = useCallback(() => {
    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
    sampleTimerRef.current = setInterval(() => {
      if (completedRef.current) return;
      const p = sampleProgress();
      if (p >= COMPLETE_THRESHOLD) finish();
    }, 300);
  }, [sampleProgress, finish]);

  // --- автодемонстрация ---------------------------------------------------
  const cancelAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (autoRafRef.current) {
      cancelAnimationFrame(autoRafRef.current);
      autoRafRef.current = 0;
    }
  }, []);

  const startAuto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || userInteractedRef.current) return;
    const w = canvas.width;
    const h = canvas.height;
    // короткий мазок по капоту — лишь намёк на эффект, не полный вид
    const ax0 = 0.22 * w;
    const ay0 = 0.38 * h;
    const ax1 = 0.48 * w;
    const ay1 = 0.56 * h;
    const autoRadius = radiusRef.current * 0.55;
    const start = performance.now();
    const dur = 1000;
    lastPtRef.current = null;
    const step = (t: number) => {
      if (userInteractedRef.current) return;
      const k = Math.min(1, (t - start) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      strokeTo(ax0 + (ax1 - ax0) * ease, ay0 + (ay1 - ay0) * ease, autoRadius);
      if (k < 1) autoRafRef.current = requestAnimationFrame(step);
      else lastPtRef.current = null;
    };
    autoRafRef.current = requestAnimationFrame(step);
  }, [strokeTo]);

  // --- размеры канваса (сохраняя маску) ----------------------------------
  const resize = useCallback(
    (preserve: boolean) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      radiusRef.current = (rect.width < 640 ? 60 : 90) * dpr;

      let mask = maskRef.current;
      if (!mask) {
        mask = document.createElement("canvas");
        maskRef.current = mask;
      }
      if (mask.width !== w || mask.height !== h) {
        if (preserve && mask.width && mask.height) {
          const tmp = document.createElement("canvas");
          tmp.width = mask.width;
          tmp.height = mask.height;
          tmp.getContext("2d")?.drawImage(mask, 0, 0);
          mask.width = w;
          mask.height = h;
          mask.getContext("2d")?.drawImage(tmp, 0, 0, w, h);
        } else {
          mask.width = w;
          mask.height = h;
        }
      }
      canvas.width = w;
      canvas.height = h;
      render();
    },
    [render]
  );

  // --- позиция указателя в пикселях канваса ------------------------------
  const posFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (completedRef.current) return;
    cancelAuto();
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      setInteracted(true);
    }
    drawingRef.current = true;
    lastPtRef.current = null;
    try {
      canvasRef.current?.setPointerCapture(e.pointerId);
    } catch {}
    const p = posFromEvent(e);
    strokeTo(p.x, p.y);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const p = posFromEvent(e);
    strokeTo(p.x, p.y);
  };

  const endStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    lastPtRef.current = null;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // --- «Ещё раз» ----------------------------------------------------------
  const reset = () => {
    cancelAuto();
    if (finishRafRef.current) cancelAnimationFrame(finishRafRef.current);
    completedRef.current = false;
    userInteractedRef.current = true;
    setCompleted(false);
    const mask = maskRef.current;
    mask?.getContext("2d")?.clearRect(0, 0, mask.width, mask.height);
    render();
    startSampling();
  };

  // --- инициализация ------------------------------------------------------
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const supported = !!(canvas && canvas.getContext && canvas.getContext("2d"));
    if (prefersReduced || !supported) {
      setFallback(true);
      return;
    }

    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      wrapImgRef.current = img;
      resize(false);
      autoTimerRef.current = setTimeout(startAuto, 800);
    };
    img.src = wrapSrc;

    const ro = new ResizeObserver(() => resize(true));
    if (containerRef.current) ro.observe(containerRef.current);

    startSampling();

    return () => {
      ro.disconnect();
      cancelAuto();
      if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
      if (renderRafRef.current) cancelAnimationFrame(renderRafRef.current);
      if (finishRafRef.current) cancelAnimationFrame(finishRafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapSrc]);

  if (fallback) {
    return (
      <div ref={containerRef} className={styles.stage}>
        <div className={styles.groundShadow} aria-hidden />
        <div className={styles.media}>
          <Image
            src={wrapSrc}
            alt={alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            placeholder={blurData ? "blur" : "empty"}
            blurDataURL={blurData}
            className={styles.staticImg}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.stage}>
      <div className={styles.groundShadow} aria-hidden />
      <div className={styles.media}>
        <Image
          src={baseSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          placeholder={blurData ? "blur" : "empty"}
          blurDataURL={blurData}
          className={styles.baseImg}
        />
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          onPointerLeave={endStroke}
        />
      </div>

      {!interacted && !completed && (
        <motion.div
          className={styles.hint}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Проведите курсором по машине
        </motion.div>
      )}

      {completed && (
        <motion.div
          className={styles.done}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className={styles.doneText}>Готово — новый цвет проявлен</p>
          <div className={styles.doneActions}>
            <a href="#booking" className={styles.doneCta}>
              {ctaText}
            </a>
            <button type="button" className={styles.again} onClick={reset}>
              Ещё раз
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
