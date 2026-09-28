import { useRef } from "react";
import { useLang } from "@/igold/lang";
import { useReveal } from "@/igold/useReveal";
import { LANDING_METRICS } from "../data";
import { CountUp } from "./CountUp";

export function Metrics() {
  const { L } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { selector: ".ld-reveal", stagger: 0.07 });

  return (
    <section id="impact" className="ld-band">
      <div className="ld-pattern" aria-hidden="true" />
      <div ref={ref} className="ld-section">
        <div className="ld-section-head ld-reveal">
          <span className="ld-eyebrow">
            {L(LANDING_METRICS.eyebrow.en, LANDING_METRICS.eyebrow.bm)}
          </span>
          <h2 className="ld-section-title">
            {L(LANDING_METRICS.heading.en, LANDING_METRICS.heading.bm)}
          </h2>
          <p className="ld-section-sub">
            {L(LANDING_METRICS.sub.en, LANDING_METRICS.sub.bm)}
          </p>
        </div>

        <div className="ld-metrics-grid">
          {LANDING_METRICS.items.map(item => (
            <div className="ld-metric ld-reveal" key={item.label.en}>
              <CountUp
                className="ld-metric-num"
                value={item.value}
                suffix={item.suffix}
              />
              <p className="ld-metric-label">
                {L(item.label.en, item.label.bm)}
              </p>
            </div>
          ))}
        </div>

        <p className="ld-metric-note">
          {L(LANDING_METRICS.note.en, LANDING_METRICS.note.bm)}
        </p>
      </div>
    </section>
  );
}
