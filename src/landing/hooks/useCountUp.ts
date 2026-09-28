import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, durationMs = 1700) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / durationMs);
          const eased = 1 - (1 - p) ** 3;
          setValue(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return { ref, value };
}
