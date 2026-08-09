import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SITE } from "../data";
import { APP_CONFIG } from "../config";

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
    tl.fromTo(".pl-iium", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, 0);
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
        background: "linear-gradient(145deg, var(--everglade), #1d3526 62%, var(--deep-diving))",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          className="pl-iium"
          src={APP_CONFIG.branding.iiumLogo}
          alt="International Islamic University Malaysia"
          width="96"
          height="101"
          style={{ marginBottom: 20, objectFit: "contain", filter: "drop-shadow(0 14px 28px rgba(0,0,0,.25))" }}
        />
        <div
          className="pl-word display"
          style={{ fontSize: "2.2rem", letterSpacing: "0.18em", color: "var(--gilded)", opacity: 0, transform: "translateY(16px)" }}
        >
          {SITE.brand}
        </div>
        <div style={{ marginTop: 12, color: "var(--light-veil)", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
          {count}%
        </div>
      </div>
    </div>
  );
}
