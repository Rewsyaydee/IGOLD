import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { BACAAN } from "../data";
import { playAudio, hasRealAudio } from "../audio";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

export function Bacaan() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const [toast, setToast] = useState<string | null>(null);
  useReveal(ref, { stagger: 0.08 });

  const onPlay = (id: string) => {
    const kind = playAudio(id);
    if (kind === "placeholder") {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast(L("Sample tone — the real recitation audio will be added later.", "Audio contoh — fail recitation sebenar akan ditambah kemudian."));
      toastTimer.current = setTimeout(() => setToast(null), 2600);
    }
  };

  // Cleanup toast timer on unmount
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  return (
    <section id="bacaan" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Recitations", "Bacaan")}</span>
        <h2 className="section-title reveal">{L("Prayer Recitations", "Himpunan Bacaan Solat")}</h2>
        <p className="section-sub reveal">
          {L(
            "A quick reference for the key recitations in prayer. Tap the icon to listen to the pronunciation.",
            "Rujukan pantas bacaan-bacaan utama dalam solat. Tekan ikon untuk mendengar sebutan.",
          )}
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.1rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {BACAAN.map(b => (
          <article key={b.id} className="card reveal" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.6rem" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.08rem", fontWeight: 600 }}>{L(b.titleEn, b.title)}</h3>
                <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{L(b.whenEn, b.when)}</span>
              </div>
              <button onClick={() => onPlay(b.id)} aria-label={`${L("Listen to", "Dengar")} ${L(b.titleEn, b.title)}`} style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--line)", background: "var(--gold-tint)", cursor: "pointer" }}>
                <Volume2 size={18} color="var(--gold-500)" />
              </button>
            </div>
            <div className="arabic" style={{ fontSize: "1.5rem", color: "var(--ink)", margin: "0.5rem 0", lineHeight: 1.9 }}>{b.arabic}</div>
            <p style={{ margin: "0.2rem 0 0", color: "var(--gold-ink)", fontStyle: "italic", fontSize: "0.9rem" }}>{b.transliteration}</p>
            {b.pending && (
              <span
                style={{
                  marginTop: "0.9rem",
                  alignSelf: "flex-start",
                  fontSize: "0.68rem",
                  letterSpacing: "0.04em",
                  color: "var(--gold-ink)",
                  background: "var(--gold-tint)",
                  border: "1px solid var(--line)",
                  borderRadius: 100,
                  padding: "0.28rem 0.7rem",
                }}
              >
                ⚠️ {L("Pending ustaz review", "Menunggu semakan ustaz")}
              </span>
            )}
            {!hasRealAudio(b.id) && <span style={{ marginTop: "auto", paddingTop: "0.6rem", fontSize: "0.7rem", color: "var(--muted)" }}>{L("sample tone", "audio contoh")}</span>}
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
