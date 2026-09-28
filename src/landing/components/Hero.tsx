import { useLang } from "@/igold/lang";
import { LANDING_HERO } from "../data";
import { useLaunchTransition } from "../hooks/useLaunchTransition";
import { AppMockup } from "./AppMockup";
import { MagneticButton } from "./MagneticButton";
import { SplitReveal } from "./SplitReveal";
import { TiltCard } from "./TiltCard";

function Orbit({ reduced = false }: { reduced?: boolean }) {
  return (
    <div className="ld-hero-orbit" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" role="img">
        <title>iGOLD geometric orbit motif</title>
        <circle
          cx="200"
          cy="200"
          r="186"
          stroke="rgba(190,217,235,0.24)"
          strokeWidth="0.8"
          strokeDasharray="3 7"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          stroke="rgba(234,160,67,0.35)"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="96"
          stroke="rgba(190,217,235,0.2)"
          strokeWidth="0.8"
        />
        <polygon
          points="200,24 224,176 376,200 224,224 200,376 176,224 24,200 176,176"
          stroke="rgba(234,160,67,0.32)"
          strokeWidth="0.8"
          fill="none"
        />
        <polygon
          points="200,60 222,178 340,200 222,222 200,340 178,222 60,200 178,178"
          stroke="rgba(190,217,235,0.16)"
          strokeWidth="0.8"
          fill="none"
          transform="rotate(45 200 200)"
        />
        {!reduced && (
          <circle cx="200" cy="14" r="3.4" fill="#eaa043">
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

export function Hero() {
  const { L } = useLang();
  const { launch } = useLaunchTransition();

  return (
    <section className="ld-hero" id="hero">
      <div className="ld-pattern" aria-hidden="true" />
      <div className="ld-hero-grid">
        <div className="ld-hero-copy">
          <div className="ld-hero-eyebrow">
            <span className="ld-chip">
              <i />
              {L(LANDING_HERO.badge.en, LANDING_HERO.badge.bm)}
            </span>
          </div>

          <h1>
            <SplitReveal
              text={L(LANDING_HERO.titleA.en, LANDING_HERO.titleA.bm)}
            />
            <br />
            <em>
              <SplitReveal
                text={L(LANDING_HERO.titleB.en, LANDING_HERO.titleB.bm)}
                delay={0.22}
              />
            </em>
          </h1>

          <p className="ld-hero-sub">
            {L(LANDING_HERO.sub.en, LANDING_HERO.sub.bm)}
          </p>

          <div className="ld-hero-ctas">
            <MagneticButton variant="gold" onClick={() => launch()}>
              {L(LANDING_HERO.ctaPrimary.en, LANDING_HERO.ctaPrimary.bm)}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              icon={false}
              onClick={() =>
                document
                  .getElementById("mission")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {L(LANDING_HERO.ctaSecondary.en, LANDING_HERO.ctaSecondary.bm)}
            </MagneticButton>
          </div>

          <div className="ld-hero-trust">
            {LANDING_HERO.trust.map(item => (
              <span className="ld-trust-item" key={item.en}>
                {L(item.en, item.bm)}
              </span>
            ))}
          </div>
        </div>

        <div className="ld-hero-visual">
          <span className="ld-hero-arabic" lang="ar" aria-hidden="true">
            اِقْرَأْ
          </span>
          <Orbit />
          <TiltCard>
            <AppMockup />
          </TiltCard>
        </div>
      </div>

      <div className="ld-scroll-cue" aria-hidden="true">
        <span>{L("Scroll", "Tatal")}</span>
        <span className="ld-scroll-line" />
      </div>
    </section>
  );
}
