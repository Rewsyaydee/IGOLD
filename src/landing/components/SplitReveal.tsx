import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  show: (opts: { delay: number; stagger: number }) => ({
    transition: { delayChildren: opts.delay, staggerChildren: opts.stagger },
  }),
};

const word: Variants = {
  hidden: { y: "114%" },
  show: {
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((item, i) => (
        <span className="ld-split-word" key={`${item}-${i}`}>
          <motion.span variants={word}>
            {item}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
