import { useLang } from "@/igold/lang";
import { LANDING_FINALE, LANDING_SITE } from "../data";
import { useLaunchTransition } from "../hooks/useLaunchTransition";
import { MagneticButton } from "./MagneticButton";
import { SplitReveal } from "./SplitReveal";

export function Finale() {
  const { L } = useLang();
  const { launch } = useLaunchTransition();

  return (
    <section className="ld-finale-wrap">
      <div
        className="ld-section"
        style={{ paddingTop: 0, paddingBottom: "clamp(2rem, 5vw, 4rem)" }}
      >
        <div className="ld-finale">
          <span className="ld-finale-glow" aria-hidden="true" />
          <span className="ld-finale-rays" aria-hidden="true" />

          <span className="ld-eyebrow">
            {L(LANDING_FINALE.eyebrow.en, LANDING_FINALE.eyebrow.bm)}
          </span>
          <h2>
            <SplitReveal
              text={L(LANDING_FINALE.heading.en, LANDING_FINALE.heading.bm)}
            />
          </h2>
          <p>{L(LANDING_FINALE.sub.en, LANDING_FINALE.sub.bm)}</p>

          <div className="ld-finale-cta">
            <MagneticButton variant="gold" onClick={() => launch()}>
              {L(LANDING_FINALE.cta.en, LANDING_FINALE.cta.bm)}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              icon={false}
              onClick={() =>
                document
                  .getElementById("support")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {L("Support the mission", "Sokong misi ini")}
            </MagneticButton>
          </div>

          <p className="ld-finale-note">
            {L(LANDING_FINALE.note.en, LANDING_FINALE.note.bm)}
          </p>
          <span className="ld-finale-url">
            {LANDING_SITE.url}
            {LANDING_SITE.learnPath}
          </span>
        </div>
      </div>
    </section>
  );
}
