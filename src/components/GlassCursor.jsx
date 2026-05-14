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
  const dotRef = useRef(null);
  const trailContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const trailContainer = trailContainerRef.current;
    if (!wrap || !dot || !trailContainer) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let speed = 0;
    let visible = false;
    let raf = 0;

    // Pre-create trail segment elements (cheap pool — no React re-renders).
    const trailEls = [];
    const trailState = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "glass-cursor-trail";
      el.style.opacity = "0";
      trailContainer.appendChild(el);
      trailEls.push(el);
      trailState.push({
        x: 0,
        y: 0,
        angle: 0,
        length: 0,
        thickness: 6,
        hue: 200,
        born: -Infinity,
        alive: false,
      });
    }
    let trailIdx = 0;
    let lastSpawn = 0;
    // Anchor for the *start* of the next line segment — updates after every
    // spawn so each segment connects to the next, forming a continuous line.
    let prevSpawnX = mouseX;
    let prevSpawnY = mouseY;

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
      // Position smoothing — only the dot tracks the cursor; the big glass
      // ring has been removed (left a circular hover artifact users disliked).
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

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      // ---- Line-segment color trail ----
      // Each spawn lays down a thin line segment from the previous spawn
      // anchor to the current cursor position. Successive segments join
      // end-to-end, producing a continuous streak when moving fast.
      if (visible && t > TRAIL_SPAWN_THRESHOLD) {
        // Boost = speed above threshold, normalized 0..1
        const boost = (t - TRAIL_SPAWN_THRESHOLD) / (1 - TRAIL_SPAWN_THRESHOLD);
        const interval = Math.max(12, 26 - boost * 14);
        if (ts - lastSpawn >= interval) {
          lastSpawn = ts;
          const sx = prevSpawnX;
          const sy = prevSpawnY;
          const ex = mouseX;
          const ey = mouseY;
          const segDx = ex - sx;
          const segDy = ey - sy;
          const segLen = Math.hypot(segDx, segDy);

          if (segLen >= 4) {
            const p = trailState[trailIdx];
            p.x = (sx + ex) / 2; // midpoint of segment
            p.y = (sy + ey) / 2;
            p.angle = Math.atan2(segDy, segDx);
            p.length = segLen;
            // Neon stroke — thinner core, the halo glow gives it visual weight
            p.thickness = 2 + boost * 3; // 2 → 5 px true stroke
            // Cyan (190°) → Green (150°). Pure greenish-blue neon range only.
            p.hue = 190 - t * 40;
            p.born = ts;
            p.alive = true;

            const el = trailEls[trailIdx];
            el.style.width = `${p.length.toFixed(1)}px`;
            el.style.height = `${p.thickness.toFixed(1)}px`;
            el.style.borderRadius = `${(p.thickness / 2).toFixed(1)}px`;
            el.style.filter = "none";
            // Solid bright neon core — high saturation + high lightness.
            const hue = p.hue.toFixed(0);
            el.style.background = `linear-gradient(90deg,
              hsla(${hue}, 100%, 80%, 0) 0%,
              hsl(${hue}, 100%, 78%) 22%,
              hsl(${hue}, 100%, 82%) 50%,
              hsl(${hue}, 100%, 78%) 78%,
              hsla(${hue}, 100%, 80%, 0) 100%)`;
            // Layered neon halo: tight bright bloom + wider soft glow.
            const glow = (8 + boost * 14).toFixed(0);
            const farGlow = (16 + boost * 24).toFixed(0);
            el.style.boxShadow = `
              0 0 ${(p.thickness * 1.5).toFixed(0)}px hsl(${hue}, 100%, 70%),
              0 0 ${glow}px hsla(${hue}, 100%, 60%, 0.85),
              0 0 ${farGlow}px hsla(${hue}, 100%, 55%, 0.45)`;
            trailIdx = (trailIdx + 1) % TRAIL_COUNT;
          }

          // Always advance the anchor — even if segLen was too short — so
          // the next segment starts from the latest point and we never
          // accumulate a long stale gap.
          prevSpawnX = ex;
          prevSpawnY = ey;
        }
      } else {
        // While slow / idle, keep the anchor glued to the cursor so the
        // FIRST segment after a fast move is short, not a giant slingshot.
        prevSpawnX = mouseX;
        prevSpawnY = mouseY;
      }

      // Decay every alive segment. Pure opacity fade — no scale stretch
      // (which would distort the line). Pill rotation is preserved.
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
        trailEls[i].style.opacity = alpha.toFixed(3);
        trailEls[
          i
        ].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.angle}rad)`;
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
      {/* Trail segments render here (created imperatively in useEffect) */}
      <div
        ref={trailContainerRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div ref={dotRef} className="glass-cursor-dot absolute top-0 left-0" />
    </div>
  );
};

export default GlassCursor;
