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

// How quickly the canvas fades each frame. Higher = trail evaporates faster.
const TRAIL_FADE_ALPHA = 0.085;
// Speed (0–1) at which we start drawing the colored neon trail. Below this
// the cursor reads as the calm glass ring + dot only.
const TRAIL_THRESHOLD = 0.28;

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
    // Stroke anchor — the START of the next line segment we draw. Updated
    // every frame to the current mouse position so consecutive frames'
    // segments share an endpoint exactly (= no gap, no kink).
    let strokeX = mouseX;
    let strokeY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let speed = 0;
    let visible = false;
    let raf = 0;

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

    const tick = () => {
      // Position smoothing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      // Velocity
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
      // 1) Fade the entire existing trail by reducing alpha — uses
      //    destination-out so we lower opacity without darkening the page
      //    behind the canvas.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE_ALPHA})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // 2) Draw the new segment from previous stroke anchor to current mouse.
      //    Because anchor advances every frame, segments share endpoints
      //    exactly — the line is continuous, no gaps, no kinks.
      if (visible && t > TRAIL_THRESHOLD) {
        const boost = (t - TRAIL_THRESHOLD) / (1 - TRAIL_THRESHOLD);
        // Cyan (190°) → Green (150°). Greenish-blue neon range only.
        const hue = 190 - t * 40;
        const stroke = 1.5 + boost * 2.5; // 1.5 → 4 px true core
        const glow = 8 + boost * 18;

        ctx.globalCompositeOperation = "lighter"; // additive bloom

        // Outer soft halo (wide, low-alpha)
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.35)`;
        ctx.lineWidth = stroke + 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = glow;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(strokeX, strokeY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        // Bright inner core (tight, high-alpha)
        ctx.strokeStyle = `hsl(${hue}, 100%, 88%)`;
        ctx.lineWidth = stroke;
        ctx.shadowBlur = glow * 0.4;
        ctx.beginPath();
        ctx.moveTo(strokeX, strokeY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // Anchor advances regardless of whether we drew — ensures the trail
      // never has a leftover stale start position.
      strokeX = mouseX;
      strokeY = mouseY;

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
