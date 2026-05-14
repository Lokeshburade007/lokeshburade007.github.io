import { useEffect, useRef } from "react";

/**
 * Glass-circle cursor with a neon canvas trail.
 *
 * Layers (bottom → top):
 *   • <canvas> covering the viewport — receives the neon stroke each frame
 *     and fades older strokes via destination-out compositing. This is the
 *     only way to guarantee a fully continuous line with no gaps at corners
 *     (DOM div segments leave kinks when the angle changes between frames).
 *   • Glass ring — soft frosted disc that lags behind the cursor when slow,
 *     fades out as the cursor speeds up.
 *   • Tiny dot at the cursor tip for precision.
 *
 * Hidden on touch devices and when the user prefers reduced motion.
 */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";

// How quickly the canvas fades each frame. Higher = trail evaporates faster
// AND no near-zero "footprint" pixels accumulate on the canvas.
const TRAIL_FADE_ALPHA = 0.16;
// Speed (0–1) at which we start drawing the colored neon trail. Below this
// the cursor reads as the calm glass ring + dot only.
const TRAIL_THRESHOLD = 0.28;
// After this many ms with no new stroke being drawn, hard-clear the canvas
// so no faint sub-pixel residue remains visible anywhere on the page.
const TRAIL_QUIESCE_MS = 280;

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
    // Three-point smoothing buffer for the trail. Each frame we draw a
    // quadratic bezier whose control point is p1 and whose endpoints are
    // the midpoints of (p0,p1) and (p1,current). This guarantees C¹
    // continuity between consecutive frames — the line is smooth, with
    // no visible angles where points connect.
    let p0x = mouseX;
    let p0y = mouseY;
    let p1x = mouseX;
    let p1y = mouseY;
    // Smoothed input position used for trail drawing — removes pointer
    // jitter so curves don't ripple.
    let smoothX = mouseX;
    let smoothY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let speed = 0;
    let visible = false;
    let raf = 0;
    let lastStrokeAt = 0; // timestamp of last actual draw

    const showCursor = () => {
      if (!visible) {
        visible = true;
        wrap.style.opacity = "1";
      }
    };
    const hideCursor = () => {
      visible = false;
      wrap.style.opacity = "0";
      // Clear the canvas so the trail doesn't reappear if the cursor returns
      // to the same spot it left from.
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
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
      // Smoothed trail input — removes single-frame pointer jitter
      smoothX += (mouseX - smoothX) * 0.6;
      smoothY += (mouseY - smoothY) * 0.6;

      // Position smoothing for the visible cursor elements
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      // Velocity (low-pass filtered)
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const inst = Math.sqrt(dx * dx + dy * dy);
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      const k = inst > speed ? 0.35 : 0.08;
      speed += (inst - speed) * k;
      const t = Math.max(0, Math.min(1, speed / 50));
      wrap.style.setProperty("--cursor-speed", t.toFixed(3));

      // ----- Canvas trail -----
      // 1) Fade existing trail every frame (destination-out keeps the page
      //    behind the canvas untouched).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE_ALPHA})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // 1a) After the cursor has been quiescent for TRAIL_QUIESCE_MS, do
      //     one hard wipe — kills any sub-pixel residue that the alpha
      //     fade leaves behind. Without this, very faint "footprints"
      //     accumulate over time on the canvas.
      if (lastStrokeAt && ts - lastStrokeAt > TRAIL_QUIESCE_MS) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        lastStrokeAt = 0;
      }

      // 2) Draw a quadratic bezier between midpoints, using p1 as the
      //    control point. Successive curves share their endpoint = perfect
      //    C¹ continuity, no visible angles. This is the standard "smooth
      //    path" technique used in drawing apps.
      if (visible && t > TRAIL_THRESHOLD) {
        const boost = (t - TRAIL_THRESHOLD) / (1 - TRAIL_THRESHOLD);
        // Cyan (190°) → Green (150°). Greenish-blue neon range only.
        const hue = 190 - t * 40;
        const stroke = 1.5 + boost * 2.5; // 1.5 → 4 px true core
        const glow = 8 + boost * 18;

        const midAx = (p0x + p1x) / 2;
        const midAy = (p0y + p1y) / 2;
        const midBx = (p1x + smoothX) / 2;
        const midBy = (p1y + smoothY) / 2;

        ctx.globalCompositeOperation = "lighter"; // additive bloom
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Outer soft halo (wide, low-alpha)
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.35)`;
        ctx.lineWidth = stroke + 6;
        ctx.shadowBlur = glow;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(midAx, midAy);
        ctx.quadraticCurveTo(p1x, p1y, midBx, midBy);
        ctx.stroke();

        // Bright inner core (tight, high-alpha)
        ctx.strokeStyle = `hsl(${hue}, 100%, 88%)`;
        ctx.lineWidth = stroke;
        ctx.shadowBlur = glow * 0.4;
        ctx.beginPath();
        ctx.moveTo(midAx, midAy);
        ctx.quadraticCurveTo(p1x, p1y, midBx, midBy);
        ctx.stroke();

        ctx.shadowBlur = 0;
        lastStrokeAt = ts;
      }

      // Advance the smoothing buffer so the next frame's curve continues
      // smoothly from this one.
      p0x = p1x;
      p0y = p1y;
      p1x = smoothX;
      p1y = smoothY;

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
