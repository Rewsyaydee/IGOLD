import { useRef, useState } from "react";
import { useLang } from "@/igold/lang";
import { useReveal } from "@/igold/useReveal";
import { LANDING_MISSION, type LandingPartner } from "../data";
import { CountUp } from "./CountUp";

function monogram(name: string): string {
  const acronym = name.match(/\(([^)]+)\)/);
  if (acronym) return acronym[1];
  return name
    .split(/\s+/)
    .filter(word => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

function PartnerTile({ partner }: { partner: LandingPartner }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <figure className="ld-partner-tile">
      <div className="ld-partner-logo">
        {logoFailed ? (
          <span className="ld-partner-monogram" aria-hidden="true">
            {monogram(partner.name)}
          </span>
        ) : (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            onError={() => setLogoFailed(true)}
          />
        )}
      </div>
      <figcaption className="ld-partner-name">{partner.name}</figcaption>
    </figure>
  );
}

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
        </div>
      </div>

      <div className="ld-partners ld-reveal">
        <div className="ld-partners-head">
          <p className="ld-partners-label">
            {L(
              LANDING_MISSION.partnersLabel.en,
              LANDING_MISSION.partnersLabel.bm,
            )}
          </p>
          <h3 className="ld-partners-heading">
            {L(
              LANDING_MISSION.partnersHeading.en,
              LANDING_MISSION.partnersHeading.bm,
            )}
          </h3>
          <p className="ld-partners-sub">
            {L(LANDING_MISSION.partnersSub.en, LANDING_MISSION.partnersSub.bm)}
          </p>
        </div>
        <div className="ld-partner-grid">
          {LANDING_MISSION.partners.map(partner => (
            <PartnerTile partner={partner} key={partner.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
