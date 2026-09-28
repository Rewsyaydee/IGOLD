import { useRef } from "react";
import { useLang } from "@/igold/lang";
import { useReveal } from "@/igold/useReveal";
import { LANDING_MISSION } from "../data";
import { CountUp } from "./CountUp";

export function Mission() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { selector: ".ld-reveal", stagger: 0.09 });

  return (
    <section id="mission" ref={ref} className="ld-section">
      <div className="ld-section-head ld-reveal">
        <span className="ld-eyebrow">
          {L(LANDING_MISSION.eyebrow.en, LANDING_MISSION.eyebrow.bm)}
        </span>
        <h2 className="ld-section-title">
          {L(LANDING_MISSION.heading.en, LANDING_MISSION.heading.bm)}
        </h2>
        <p className="ld-section-sub">
          {L(LANDING_MISSION.lead.en, LANDING_MISSION.lead.bm)}
        </p>
      </div>

      <div className="ld-mission-grid">
        <div>
          {LANDING_MISSION.body.map(para => (
            <p className="ld-reveal" key={para.en}>
              {L(para.en, para.bm)}
            </p>
          ))}
          <blockquote className="ld-quote ld-reveal">
            {L(LANDING_MISSION.quote.en, LANDING_MISSION.quote.bm)}
            <cite>
              {L(
                LANDING_MISSION.quoteAuthor.en,
                LANDING_MISSION.quoteAuthor.bm,
              )}
            </cite>
          </blockquote>
        </div>

        <div>
          <div className="ld-evidence">
            {LANDING_MISSION.evidence.map(item => (
              <div className="ld-evidence-item ld-reveal" key={item.value}>
                <CountUp
                  className="ld-evidence-num"
                  value={item.value}
                  suffix=""
                />
                <p className="ld-evidence-label">
                  {L(item.label.en, item.label.bm)}
                </p>
              </div>
            ))}
          </div>

          <div className="ld-timeline ld-reveal">
            {LANDING_MISSION.timeline.map(item => (
              <div className="ld-timeline-item" key={item.date + item.title.en}>
                <span className="ld-timeline-date">{item.date}</span>
                <span>
                  <p className="ld-timeline-title">
                    {L(item.title.en, item.title.bm)}
                  </p>
                  <p className="ld-timeline-desc">
                    {L(item.desc.en, item.desc.bm)}
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ld-partners ld-reveal">
        <p className="ld-partners-label">
          {L(
            LANDING_MISSION.partnersLabel.en,
            LANDING_MISSION.partnersLabel.bm,
          )}
        </p>
        <div className="ld-partner-chips">
          {LANDING_MISSION.partners.map(partner => (
            <span className="ld-partner-chip" key={partner}>
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
