import { useEffect, useRef } from "react";

/**
 * Glass cursor with a smooth, continuous neon trail on fast movement.
 *
 * Drawing model:
 *   Each frame we (a) push the current mouse point, (b) trim points older
 *   than TRAIL_LIFE_MS, (c) FULL-clear the canvas, and (d) redraw the
 *   entire active polyline as ONE stroke with rounded joins.
 *
 *   Why not destination-out fade? Additive fade with low alpha never
 *   reaches zero — pixels asymptote to a faint glow that lingers
 *   indefinitely as a "footprint". Full clear + buffer-trim guarantees
 *   the trail vanishes the instant the buffer empties, with no residue.
 *
 *   Why one stroke per frame instead of one per segment? lineCap: round
 *   adds a circular cap at every endpoint. Stacking per-frame segments
 *   = two caps overlapping at every join = visible "dot" pearls along
 *   the line. A single beginPath/lineTo/stroke uses lineJoin instead,
 *   which is gap-free and dot-free.
 *
 * Layers:
 *   • <canvas> — the polyline render
 *   • Glass ring — soft frosted disc that follows the cursor with lag,
 *     fades out as speed climbs (CSS via --cursor-speed)
 *   • Tiny dot at the cursor tip for precision
 */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";

const TRAIL_LIFE_MS = 420;
const TRAIL_SPEED_THRESHOLD = 0.22;

const GlassCursor = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!wrap || !canvas || !ring || !dot) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const sizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // logical px coords
    };
    sizeCanvas();

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let speed = 0;
    let visible = false;
    let raf = 0;

    /** @type {{x:number,y:number,ts:number,speed:number}[]} */
    const points = [];

    const clearAll = () => {
      // Full clear — never leave residual pixels behind.
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const showCursor = () => {
      if (!visible) {
        visible = true;
        wrap.style.opacity = "1";
      }
    };
    const hideCursor = () => {
      visible = false;
      wrap.style.opacity = "0";
      points.length = 0;
      clearAll();
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      showCursor();
    };

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) {
        wrap.classList.add("is-hovering");
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) {
        wrap.classList.remove("is-hovering");
      }
    };

    const onResize = () => sizeCanvas();
    window.addEventListener("resize", onResize);

    const tick = (ts) => {
      // Position smoothing
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      // Velocity (smoothed, faster attack than decay)
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const inst = Math.sqrt(dx * dx + dy * dy);
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      const k = inst > speed ? 0.35 : 0.08;
      speed += (inst - speed) * k;
      const t = Math.max(0, Math.min(1, speed / 50));
      wrap.style.setProperty("--cursor-speed", t.toFixed(3));

      // Always record the current point so the polyline has a recent anchor.
      // Skip exact duplicates.
      const last = points[points.length - 1];
      if (!last || last.x !== mouseX || last.y !== mouseY) {
        points.push({ x: mouseX, y: mouseY, ts, speed: t });
      }
      // Trim expired points off the front.
      while (points.length && ts - points[0].ts > TRAIL_LIFE_MS) {
        points.shift();
      }

      // ---- Draw ----
      // Always start with a CLEAN canvas — guarantees no footprint accumulates.
      clearAll();

      // Find the contiguous "fast" tail to render. Walk back; if we hit a
      // slow point, cut the polyline there. (Otherwise a slow region would
      // be drawn between two fast bursts as one weird connected line.)
      let startIdx = -1;
      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].speed > TRAIL_SPEED_THRESHOLD) {
          startIdx = i;
        } else if (startIdx !== -1) {
          startIdx = i + 1;
          break;
        }
      }

      if (
        visible &&
        startIdx !== -1 &&
        points.length - startIdx >= 2
      ) {
        const headSpeed = points[points.length - 1].speed;
        // Cyan (190°) → Green (150°). Greenish-blue neon range only.
        const hue = 190 - headSpeed * 40;
        const boost = Math.min(
          1,
          Math.max(
            0,
            (headSpeed - TRAIL_SPEED_THRESHOLD) /
              (1 - TRAIL_SPEED_THRESHOLD)
          )
        );
        const coreWidth = 1.5 + boost * 2.5; // 1.5 → 4 px
        const haloWidth = coreWidth + 5;
        const glow = 8 + boost * 14;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Use source-over (default) so colors compose normally — no
        // "lighter" accumulation that brightens shared pixels over time.
        ctx.globalCompositeOperation = "source-over";

        // Smooth the polyline by drawing quadratic curves through the
        // midpoints of consecutive segments — each captured point becomes a
        // control point for the curve, so spins/loops render as smooth
        // arcs instead of angular polygons.
        const buildPath = () => {
          ctx.beginPath();
          const n = points.length;
          ctx.moveTo(points[startIdx].x, points[startIdx].y);
          if (n - startIdx === 2) {
            // Only 2 points — straight line is the only option
            ctx.lineTo(points[n - 1].x, points[n - 1].y);
            return;
          }
          for (let i = startIdx + 1; i < n - 1; i++) {
            const mx = (points[i].x + points[i + 1].x) / 2;
            const my = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
          }
          // Final segment to the actual last point
          ctx.lineTo(points[n - 1].x, points[n - 1].y);
        };

        // Outer halo — wide, low-alpha, with shadowBlur for the bloom
        ctx.shadowBlur = glow;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.32)`;
        ctx.lineWidth = haloWidth;
        buildPath();
        ctx.stroke();

        // Bright inner core
        ctx.shadowBlur = glow * 0.45;
        ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.strokeStyle = `hsl(${hue}, 100%, 88%)`;
        ctx.lineWidth = coreWidth;
        buildPath();
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // Ring & dot
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="glass-cursor fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div ref={ringRef} className="glass-cursor-ring" />
      <div ref={dotRef} className="glass-cursor-dot absolute top-0 left-0" />
    </div>
  );
};

export default GlassCursor;
