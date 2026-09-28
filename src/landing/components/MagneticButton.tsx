import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { Link } from "react-router-dom";

type Variant = "gold" | "ghost" | "cream" | "dark";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "gold",
  icon = true,
  className = "",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 230, damping: 19, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 230, damping: 19, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    mx.set(Math.max(-1, Math.min(1, dx)) * 9);
    my.set(Math.max(-1, Math.min(1, dy)) * 7);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = `ld-btn ld-btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="ld-btn-ring" aria-hidden="true" />
      <span className="ld-btn-ring" aria-hidden="true" />
      <span className="ld-btn-ring" aria-hidden="true" />
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55rem",
        }}
      >
        {children}
        {icon && <ArrowRight size={16} className="ld-btn-icon" />}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      className="ld-btn-wrap"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={reduced ? undefined : { scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
    >
      {to ? (
        <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} className={cls} aria-label={ariaLabel}>
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={cls}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
