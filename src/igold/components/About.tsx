import { useRef } from "react";
import { ABOUT } from "../data";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

export function About() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { stagger: 0.12 });

  const body = L(ABOUT.bodyEn, ABOUT.body);

  return (
    <section id="about" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("About", "Pengenalan")}</span>
        <h2 className="section-title reveal">{L(ABOUT.headingEn, ABOUT.heading)}</h2>
      </div>

      <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "1fr", alignItems: "start" }} className="about-grid">
        <div>
          {body.map((p, i) => (
            <p key={i} className="reveal" style={{ color: "var(--body)", fontSize: "1.08rem", marginBottom: "1.2rem", maxWidth: "62ch" }}>
              {p}
            </p>
          ))}
        </div>

        <div className="reveal" style={{ display: "grid", gap: "1rem" }}>
          {ABOUT.stats.map(s => (
            <div key={s.label} className="card" style={{ display: "flex", alignItems: "baseline", gap: "1.2rem" }}>
              <span className="display gold-gradient" style={{ fontSize: "2.6rem", lineHeight: 1 }}>{s.value}</span>
              <span style={{ color: "var(--muted)" }}>{L(s.labelEn, s.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
