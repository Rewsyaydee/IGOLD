import { motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface LaunchCtx {
  launch: (to?: string) => void;
}

const Ctx = createContext<LaunchCtx | null>(null);

export function LaunchTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const timers = useRef<number[]>([]);

  const launch = useCallback(
    (to = "/learn") => {
      if (active) return;
      setActive(true);
      const travel = reduced ? 80 : 560;
      timers.current.push(
        window.setTimeout(() => navigate(to), travel),
        window.setTimeout(() => setActive(false), travel + 900),
      );
    },
    [active, navigate, reduced],
  );

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  return (
    <Ctx.Provider value={{ launch }}>
      {children}
      <motion.div
        className="ld-transition"
        aria-hidden="true"
        initial={false}
        animate={{ y: active ? "0%" : "102%" }}
        transition={{
          duration: reduced ? 0.001 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="ld-transition-inner">
          <div className="ld-transition-seal" lang="ar">
            اقْرَأْ
          </div>
          <div className="ld-transition-label">iGOLD · Prayer Portal</div>
        </div>
      </motion.div>
    </Ctx.Provider>
  );
}

export function useLaunchTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useLaunchTransition must be used within LaunchTransitionProvider",
    );
  }
  return ctx;
}
