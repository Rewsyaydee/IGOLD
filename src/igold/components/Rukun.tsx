import { useRef, useState } from "react";
import { RUKUN } from "../data";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

const TYPE_LABEL: Record<string, { en: string; bm: string }> = {
  Qauli: { en: "Spoken act", bm: "Perbuatan lidah" },
  "Fi'li": { en: "Physical act", bm: "Perbuatan anggota" },
  Qalbi: { en: "Act of the heart", bm: "Perbuatan hati" },
};

export function Rukun() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveal(ref, { stagger: 0.04 });

  return (
    <section id="rukun" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Pillars", "Rukun")}</span>
        <h2 className="section-title reveal">{L("The 13 Pillars of Prayer", "13 Rukun Solat")}</h2>
        <p className="section-sub reveal">
          {L(
            "The pillars are the essential acts that make up the prayer. If one is missed, the prayer is invalid. Hover or tap a card for details.",
            "Rukun adalah perkara wajib yang membentuk solat. Jika tertinggal satu rukun, solat tidak sah. Tuding atau tekan kad untuk butiran.",
          )}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {RUKUN.map(r => {
          const isOpen = open === r.id;
          const type = TYPE_LABEL[r.type];
          return (
            <button
              key={r.id}
              className={`hover-card reveal${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : r.id)}
            >
              <span className="hover-card__num display">{String(r.id).padStart(2, "0")}</span>
              <h3 style={{ margin: "0 3rem 0 0", fontSize: "1.08rem", fontWeight: 600, lineHeight: 1.3 }}>
                {L(r.titleEn, r.title)}
              </h3>
              <span
                style={{
                  display: "inline-block",
                  marginTop: "0.7rem",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--gold-ink)",
                  border: "1px solid var(--line)",
                  padding: "0.22rem 0.65rem",
                  borderRadius: 100,
                  width: "fit-content",
                }}
              >
                {r.type} · {L(type?.en, type?.bm)}
              </span>

              <div className="hover-card__detail">
                <div>
                  <p style={{ margin: 0, color: "var(--body)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {L(r.descEn, r.desc)}
                  </p>
                </div>
              </div>

              <span className="hover-card__hint">{isOpen ? L("Tap to close", "Tekan untuk tutup") : L("Hover / tap", "Tuding / tekan")}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
