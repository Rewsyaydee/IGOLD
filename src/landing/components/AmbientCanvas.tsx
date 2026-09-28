import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  rgb: [number, number, number];
};

type Particle = {
  x: number;
  y: number;
  s: number;
  a: number;
  d: number;
};

const BLOB_COLORS: Array<[number, number, number]> = [
  [38, 68, 49],
  [90, 148, 167],
  [234, 160, 67],
  [113, 150, 135],
];

const PARTICLE_COUNT = 64;

export function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let scrollY = 0;
    let px = 0.5;
    let py = 0.4;
    let tvx = 0;
    let tvy = 0;

    const blobs: Blob[] = BLOB_COLORS.map((rgb, i) => ({
      x: 0.16 + 0.68 * ((i * 0.37) % 1),
      y: 0.14 + 0.7 * ((i * 0.53) % 1),
      r: 0.34 + 0.14 * ((i * 0.29) % 1),
      rgb,
    }));

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => ({
        x: Math.random(),
        y: Math.random(),
        s: 0.5 + Math.random() * 1.7,
        a: 0.06 + Math.random() * 0.24,
        d: 0.15 + Math.random() * 0.85,
      }),
    );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      if (!w || !h) return;
      const nx = e.clientX / w;
      const ny = e.clientY / h;
      tvx = nx - px;
      tvy = ny - py;
      px = nx;
      py = ny;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const draw = (now: number) => {
      const vel = Math.min(1, Math.hypot(tvx, tvy) * 24);
      tvx *= 0.9;
      tvy *= 0.9;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const cx =
          (b.x + Math.sin(now * 0.00006 + i * 2.1) * 0.05 + (px - 0.5) * 0.06) *
          w;
        const cy =
          (b.y +
            Math.cos(now * 0.00005 + i * 1.7) * 0.05 -
            scrollY * 0.00008 * (i + 1)) *
          h;
        const r = b.r * Math.max(w, h) * (1 + vel * 0.9);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [R, G, B] = b.rgb;
        g.addColorStop(0, `rgba(${R},${G},${B},0.15)`);
        g.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }

      ctx.globalCompositeOperation = "source-over";
      for (const p of particles) {
        const drift = now * 0.000012 * p.d;
        const x = ((p.x + drift) % 1) * w;
        const y =
          ((p.y + scrollY * 0.00012 * (0.4 + p.d) + drift * 0.6) % 1) * h;
        const near = Math.hypot(x / w - px, y / h - py);
        const boost = Math.max(0, 1 - near * 2.6);
        ctx.beginPath();
        ctx.arc(x, y, p.s * (1 + boost * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234,160,67,${p.a + boost * 0.3})`;
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="ld-ambient" />;
}
