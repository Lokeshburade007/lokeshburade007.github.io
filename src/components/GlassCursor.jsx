import { useEffect, useRef } from "react";

/**
 * Glass-circle cursor follower.
 *
 *  • a small dot that snaps to the cursor for precision
 *  • a glass ring that lags behind for a polished trail
 *  • a pool of colored "leak" particles that spawn behind the cursor
 *    when it moves fast — they pulse the same speed-driven hue and fade
 *    away within ~600ms so the trail bleeds color across the UI
 *
 * The ring grows on `.is-hovering` (CSS handles the size transition).
 * Hidden on touch devices and when the user prefers reduced motion.
 *
 * Class names match src/style.css:
 *   .glass-cursor / .glass-cursor-ring / .glass-cursor-dot /
 *   .glass-cursor-trail
 */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";

const TRAIL_COUNT = 18;
const TRAIL_LIFE_MS = 550;
const TRAIL_SPAWN_THRESHOLD = 0.32; // 0..1 — only fires on genuinely fast moves

const GlassCursor = () => {
  const wrapRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const trailContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const trailContainer = trailContainerRef.current;
    if (!wrap || !ring || !dot || !trailContainer) return;

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

    // Pre-create trail particle elements (cheap pool — no React re-renders).
    const trailEls = [];
    const trailState = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "glass-cursor-trail";
      el.style.opacity = "0";
      trailContainer.appendChild(el);
      trailEls.push(el);
      trailState.push({ x: 0, y: 0, hue: 200, born: -Infinity, alive: false });
    }
    let trailIdx = 0;
    let lastSpawn = 0;

    const showCursor = () => {
      if (!visible) {
        visible = true;
        wrap.style.opacity = "1";
      }
    };
    const hideCursor = () => {
      visible = false;
      wrap.style.opacity = "0";
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

    const tick = (ts) => {
      // Position smoothing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      // Velocity (low-pass filtered, faster attack than decay)
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const inst = Math.sqrt(dx * dx + dy * dy);
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      const k = inst > speed ? 0.35 : 0.08;
      speed += (inst - speed) * k;

      const t = Math.max(0, Math.min(1, speed / 50));
      wrap.style.setProperty("--cursor-speed", t.toFixed(3));

      // Ring stretch along motion vector
      const len = Math.hypot(dx, dy);
      const angle = len > 0.5 ? Math.atan2(dy, dx) : 0;
      const stretch = 1 + t * 0.6;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${angle}rad) scale(${stretch}, ${
        2 - stretch
      }) rotate(${-angle}rad)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      // ---- Color-leak trail ----
      // Only kicks in past TRAIL_SPAWN_THRESHOLD (genuine fast movement).
      // Particles are LIGHT — high lightness, low-to-mid alpha, soft blur —
      // so the trail reads as an airy color wash, not a heavy paint stroke.
      if (visible && t > TRAIL_SPAWN_THRESHOLD) {
        // Boost intensity is the speed *above* threshold, normalized 0..1
        const boost = (t - TRAIL_SPAWN_THRESHOLD) / (1 - TRAIL_SPAWN_THRESHOLD);
        const interval = Math.max(14, 32 - boost * 18);
        if (ts - lastSpawn >= interval) {
          lastSpawn = ts;
          const p = trailState[trailIdx];
          p.x = mouseX;
          p.y = mouseY;
          // Blue (210°) → Green (120°) → Orange (30°). Descending hue arc.
          p.hue = 210 - t * 180;
          p.born = ts;
          p.alive = true;
          const el = trailEls[trailIdx];
          const startSize = 16 + boost * 22; // 16 → 38 px (smaller, tighter)
          el.style.width = `${startSize}px`;
          el.style.height = `${startSize}px`;
          el.style.filter = `blur(${(2 + boost * 2).toFixed(1)}px)`;
          // Light pastel core (high lightness 80%, modest alpha) — reads as
          // a glowing color wisp rather than a saturated dark blob.
          const coreAlpha = (0.32 + boost * 0.25).toFixed(2);
          const midAlpha = (0.14 + boost * 0.12).toFixed(2);
          el.style.background = `radial-gradient(circle, hsla(${p.hue.toFixed(
            0
          )}, 85%, 80%, ${coreAlpha}) 0%, hsla(${(p.hue + 24).toFixed(
            0
          )}, 80%, 78%, ${midAlpha}) 50%, hsla(${(p.hue - 16).toFixed(
            0
          )}, 80%, 75%, 0) 78%)`;
          trailIdx = (trailIdx + 1) % TRAIL_COUNT;
        }
      }

      // Decay every alive particle. Smooth fade across the whole lifetime
      // (no held plateau) so the trail doesn't pile up visually.
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const p = trailState[i];
        if (!p.alive) continue;
        const age = ts - p.born;
        if (age >= TRAIL_LIFE_MS) {
          p.alive = false;
          trailEls[i].style.opacity = "0";
          continue;
        }
        const u = age / TRAIL_LIFE_MS; // 0..1
        const alpha = 1 - u;
        const scale = 1 + u * 1.4;
        trailEls[i].style.opacity = alpha.toFixed(3);
        trailEls[i].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(
          2
        )})`;
      }

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
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      trailEls.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="glass-cursor fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Trail particles render here (created imperatively in useEffect) */}
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div ref={ringRef} className="glass-cursor-ring" />
      <div ref={dotRef} className="glass-cursor-dot absolute top-0 left-0" />
    </div>
  );
};

export default GlassCursor;
