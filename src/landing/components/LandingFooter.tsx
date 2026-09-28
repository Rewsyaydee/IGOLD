import { useLang } from "@/igold/lang";
import { LANDING_FOOTER, LANDING_NAV, LANDING_SITE } from "../data";
import { useLaunchTransition } from "../hooks/useLaunchTransition";

export function LandingFooter() {
  const { L } = useLang();
  const { launch } = useLaunchTransition();

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="ld-footer">
      <div className="ld-footer-grid">
        <div className="ld-footer-brand">
          <img
            src="/branding/igold-logo-light.png"
            alt="iGOLD"
            width={150}
            height={124}
          />
          <p className="ld-footer-about">
            {L(LANDING_FOOTER.about.en, LANDING_FOOTER.about.bm)}
          </p>
        </div>

        <div className="ld-footer-col">
          <h4>{L(LANDING_FOOTER.explore.en, LANDING_FOOTER.explore.bm)}</h4>
          <ul>
            {LANDING_NAV.map(item => (
              <li key={item.id}>
                <button type="button" onClick={() => go(item.id)}>
                  {L(item.label.en, item.label.bm)}
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => launch()}>
                {L("Prayer Portal", "Portal Solat")}
              </button>
            </li>
          </ul>
        </div>

        <div className="ld-footer-col">
          <h4>{L(LANDING_FOOTER.official.en, LANDING_FOOTER.official.bm)}</h4>
          <ul>
            <li>
              <a
                href="https://www.iium.edu.my"
                target="_blank"
                rel="noopener noreferrer"
              >
                IIUM Malaysia
              </a>
            </li>
            <li>
              <a href={`https://${LANDING_SITE.url}`} rel="noopener noreferrer">
                {LANDING_SITE.url}
              </a>
            </li>
            <li>
              <span
                style={{ color: "var(--cream-muted)", fontSize: "0.86rem" }}
              >
                {L("Auckland · November 2026", "Auckland · November 2026")}
              </span>
            </li>
          </ul>
        </div>

        <div className="ld-footer-col">
          <h4>{L(LANDING_FOOTER.contact.en, LANDING_FOOTER.contact.bm)}</h4>
          <ul>
            <li>
              <a href="mailto:iium.communityengagement@gmail.com">
                iium.communityengagement@gmail.com
              </a>
            </li>
            <li>
              <a href="mailto:nanhidayu@iium.edu.my">nanhidayu@iium.edu.my</a>
            </li>
            <li>
              <a href="mailto:syafiyahmaisarah@gmail.com">
                syafiyahmaisarah@gmail.com
              </a>
            </li>
          </ul>
          <p className="ld-footer-address">
            {L(LANDING_FOOTER.address.en, LANDING_FOOTER.address.bm)}
          </p>
        </div>
      </div>

      <div className="ld-footer-bottom">
        <p className="ld-footer-legal">
          &copy; {new Date().getFullYear()} {LANDING_SITE.copyright} &middot;{" "}
          {LANDING_SITE.brand} ·{" "}
          {L(LANDING_FOOTER.builtWith.en, LANDING_FOOTER.builtWith.bm)}
        </p>
        <p className="ld-footer-legal">
          {L(LANDING_FOOTER.developedBy.en, LANDING_FOOTER.developedBy.bm)}{" "}
          <a
            href={LANDING_FOOTER.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LANDING_FOOTER.developerName} · {LANDING_FOOTER.developerLabel}
          </a>
        </p>
      </div>
      <p className="ld-footer-disclaimer">
        {L(LANDING_FOOTER.disclaimer.en, LANDING_FOOTER.disclaimer.bm)}
      </p>
    </footer>
  );
}
