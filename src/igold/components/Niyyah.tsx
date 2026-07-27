import { useRef, useState } from "react";
import { Volume2, Clock } from "lucide-react";
import { NIYYAH } from "../data";
import { playAudio, hasRealAudio } from "../audio";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

export function Niyyah() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  useReveal(ref, { stagger: 0.08 });

  const onPlay = (id: string) => {
    const kind = playAudio(`niyyah-${id}`);
    if (kind === "placeholder") {
      setToast(L("Sample tone — the real recitation audio will be added later.", "Audio contoh — fail recitation sebenar akan ditambah kemudian."));
      setTimeout(() => setToast(null), 2400);
    }
  };

  return (
    <section id="niyyah" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Intentions", "Niat")}</span>
        <h2 className="section-title reveal">{L("Prayer Intentions", "Niat Solat Fardhu")}</h2>
        <p className="section-sub reveal">
          {L(
            "The intention (niyyah) for each of the five obligatory prayers. Tap the icon to listen.",
            "Lafaz niat untuk setiap solat fardhu lima waktu. Tekan ikon untuk mendengar sebutan.",
          )}
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.1rem", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
        {NIYYAH.map(n => (
          <article key={n.id} className="card reveal" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.6rem" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{L(n.prayerEn, n.prayer)}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.3rem" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.78rem",
                    color: "var(--gold-ink)",
                    background: "var(--gold-tint)",
                    border: "1px solid var(--line)",
                    borderRadius: 100,
                    padding: "0.18rem 0.6rem",
                    fontWeight: 600,
                  }}>
                    {n.rakats} {L("rak'ah", "rakaat")}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.76rem", color: "var(--muted)" }}>
                    <Clock size={13} /> {L(n.timeEn, n.time)}
                  </span>
                </div>
              </div>
              {n.hasAudio && (
                <button
                  onClick={() => onPlay(n.id)}
                  aria-label={`${L("Listen to", "Dengar")} ${L(n.prayerEn, n.prayer)}`}
                  style={{
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    background: "var(--gold-tint)",
                    cursor: "pointer",
                  }}
                >
                  <Volume2 size={18} color="var(--gold-500)" />
                </button>
              )}
            </div>
            <div className="arabic" style={{ fontSize: "1.4rem", color: "var(--ink)", margin: "0.5rem 0", lineHeight: 1.9 }}>{n.arabic}</div>
            <p style={{ margin: "0.2rem 0 0", color: "var(--gold-ink)", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.5 }}>{n.transliteration}</p>
            <p style={{ margin: "0.5rem 0 0", color: "var(--body)", fontSize: "0.9rem", lineHeight: 1.55 }}>{L(n.meaningEn, n.meaning)}</p>
            {!hasRealAudio(`niyyah-${n.id}`) && (
              <span style={{ marginTop: "auto", paddingTop: "0.6rem", fontSize: "0.7rem", color: "var(--muted)" }}>{L("sample tone", "audio contoh")}</span>
            )}
          </article>
        ))}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 60, background: "var(--scrim)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--cream)", padding: "0.8rem 1.3rem", borderRadius: 12, fontSize: "0.86rem", maxWidth: "90vw", textAlign: "center" }}>
          {toast}
        </div>
      )}
    </section>
  );
}
