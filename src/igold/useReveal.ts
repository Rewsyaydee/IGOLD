import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveals all `.reveal` elements inside the ref'd container on scroll.
 * Respects prefers-reduced-motion (shows everything instantly).
 */
export function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: { stagger?: number; selector?: string } = {},
) {
  const { stagger = 0.08, selector = ".reveal" } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = gsap.utils.toArray<HTMLElement>(selector, el);
    if (!targets.length) return;

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, stagger, selector]);
}

export { gsap, ScrollTrigger };
