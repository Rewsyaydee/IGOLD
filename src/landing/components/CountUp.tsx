import { useCountUp } from "../hooks/useCountUp";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

export function CountUp({ value, suffix = "", className }: Props) {
  const { ref, value: current } = useCountUp(value);
  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
}
