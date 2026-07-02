import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SITE } from "../data";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (!doneRef.current) {
          doneRef.current = true;
          onDone();
        }
      },
    });
    const counter = { v: 0 };
    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
    });
    tl.to(".pl-star", { rotate: 180, scale: 1.1, duration: 1.6, ease: "power2.inOut" }, 0);
    tl.to(".pl-word", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    tl.to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.25");

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--cream)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <svg className="pl-star" width="72" height="72" viewBox="0 0 100 100" style={{ marginBottom: 24 }}>
          <g fill="none" stroke="var(--gold-500)" strokeWidth="2">
            <polygon points="50,6 62,38 96,38 68,58 79,92 50,72 21,92 32,58 4,38 38,38" opacity="0.9" />
            <polygon points="50,18 58,40 82,40 62,54 70,78 50,64 30,78 38,54 18,40 42,40" opacity="0.4" />
          </g>
        </svg>
        <div
          className="pl-word display"
          style={{ fontSize: "2.2rem", letterSpacing: "0.18em", color: "var(--gold-ink)", opacity: 0, transform: "translateY(16px)" }}
        >
          {SITE.brand}
        </div>
        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          {count}%
        </div>
      </div>
    </div>
  );
}
