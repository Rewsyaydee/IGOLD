import {
  type MotionStyle,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
};

type DeviceOrientationWithPermission = {
  requestPermission?: () => Promise<string>;
};

export function TiltCard({ children, className = "", max = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 130, damping: 17, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 130, damping: 17, mass: 0.6 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(35);
  const px = useTransform(gx, v => `${v}%`);
  const py = useTransform(gy, v => `${v}%`);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      ry.set((nx - 0.5) * max * 2);
      rx.set(-(ny - 0.5) * max * 2);
      gx.set(nx * 100);
      gy.set(ny * 100);
    };

    const onLeave = () => {
      rx.set(0);
      ry.set(0);
      gx.set(50);
      gy.set(35);
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const g = Math.max(-1, Math.min(1, e.gamma / 45));
      const b = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
      ry.set(g * max * 0.8);
      rx.set(-b * max * 0.55);
    };

    const attachGyro = async () => {
      const DOE = window.DeviceOrientationEvent as
        | (typeof DeviceOrientationEvent & DeviceOrientationWithPermission)
        | undefined;
      if (DOE && typeof DOE.requestPermission === "function") {
        try {
          const result = await DOE.requestPermission();
          if (result !== "granted") return;
        } catch {
          return;
        }
      }
      window.addEventListener("deviceorientation", onOrient);
    };

    const onFirstTouch = () => {
      void attachGyro();
      window.removeEventListener("touchend", onFirstTouch);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchend", onFirstTouch, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("touchend", onFirstTouch);
    };
  }, [max, reduced, rx, ry, gx, gy]);

  return (
    <div ref={ref} className={`ld-tilt-scene ${className}`.trim()}>
      <span className="ld-tilt-glare" aria-hidden="true" />
      <motion.div
        className="ld-tilt"
        style={
          {
            rotateX: rx,
            rotateY: ry,
            "--px": px,
            "--py": py,
          } as MotionStyle
        }
      >
        <span className="ld-tilt-sheen" aria-hidden="true" />
        {children}
      </motion.div>
    </div>
  );
}
