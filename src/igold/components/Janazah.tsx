import { useRef, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { JANAZAH_STEPS } from "../data";
import { playAudio, stopAudio, hasRealAudio } from "../audio";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

const YOUTUBE_ID = "r620C-Y2ZyE";

export function Janazah() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  useReveal(ref, { stagger: 0.08 });

  const onPlay = (id: number) => {
    const key = `janazah-${id}`;
    if (playingId === key) {
      stopAudio();
      setPlayingId(null);
      return;
    }
    playAudio(key);
    setPlayingId(key);
  };

  return (
    <section id="janazah" ref={ref} className="section band">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Funeral Prayer", "Solat Jenazah")}</span>
        <h2 className="section-title reveal">{L("How to Perform Janazah Prayer", "Cara Solat Jenazah")}</h2>
        <p className="section-sub reveal">
          {L(
            "The janazah (funeral) prayer is a communal obligation (fardh kifayah) performed for a deceased Muslim. Watch the full demonstration and read each recitation below.",
            "Solat jenazah adalah fardhu kifayah yang dilakukan untuk seorang Muslim yang telah meninggal dunia. Tonton demonstrasi penuh dan baca setiap bacaan di bawah.",
          )}
        </p>
      </div>

      <div className="reveal" style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 800,
            margin: "0 auto",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--line-soft)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title={L("Janazah Prayer Demonstration", "Demonstrasi Solat Jenazah")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 920, margin: "0 auto" }}>
        {JANAZAH_STEPS.map(s => {
          const key = `janazah-${s.id}`;
          return (
            <article key={s.id} className="card reveal" style={{ display: "flex", flexDirection: "column", gap: "0.8rem", padding: "1.6rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <span className="display gold-gradient" style={{ fontSize: "2rem", lineHeight: 1, flexShrink: 0 }}>
                  {String(s.id).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.3 }}>
                    {L(s.nameEn, s.name)}
                  </h3>
                </div>
                {s.hasAudio && (
                  <button
                    onClick={() => onPlay(s.id)}
                    aria-label={playingId === key ? L("Stop", "Hentikan") : L("Listen to", "Dengar")}
                    style={{
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid var(--line)",
                      background: playingId === key ? "var(--gold-500)" : "var(--gold-tint)",
                      cursor: "pointer",
                    }}
                  >
                    {playingId === key ? <Square size={15} color="var(--white)" /> : <Volume2 size={18} color="var(--gold-500)" />}
                  </button>
                )}
              </div>

              {s.arabic && (
                <div className="arabic" style={{ fontSize: "1.35rem", color: "var(--ink)", lineHeight: 1.9, padding: "0.6rem 1rem", background: "var(--surface-inset)", borderRadius: 10 }}>
                  {s.arabic}
                </div>
              )}
              {s.transliteration && (
                <p style={{ margin: 0, color: "var(--gold-ink)", fontStyle: "italic", fontSize: "0.92rem", lineHeight: 1.5 }}>
                  {s.transliteration}
                </p>
              )}
              <p style={{ margin: 0, color: "var(--body)", fontSize: "0.98rem", lineHeight: 1.6 }}>
                {L(s.meaningEn, s.meaning)}
              </p>
              {s.note && (
                <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--muted)", borderTop: "1px solid var(--line-soft)", paddingTop: "0.6rem" }}>
                  ℹ︎ {L(s.noteEn ?? s.note, s.note)}
                </p>
              )}
              {!hasRealAudio(key) && (
                <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{L("sample tone", "audio contoh")}</span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
