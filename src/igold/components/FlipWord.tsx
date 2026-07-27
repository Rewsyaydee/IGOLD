import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FlipWordProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export function FlipWord({ texts, className, interval = 2000 }: FlipWordProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <motion.span
      className={className}
      style={{ display: "inline-flex", position: "relative", overflow: "hidden", verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          style={{ display: "inline-block" }}
        >
          {texts[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
