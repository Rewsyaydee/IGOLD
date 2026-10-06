import { Square, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { hasRealAudio, playAudio, stopAudio } from "../audio";
import { BACAAN } from "../data";
import { useLang } from "../lang";
import { useMadhhab } from "../madhhab";
import { useReveal } from "../useReveal";

export function Bacaan() {
  const { L } = useLang();
  const { madhhab, setMadhhab } = useMadhhab();
  const ref = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  useReveal(ref, { stagger: 0.08, revision: madhhab });

  const items = BACAAN.filter(b => !b.madhhab || b.madhhab === madhhab);

  const onPlay = (id: string) => {
    if (playingId === id) {
      stopAudio();
      setPlayingId(null);
      return;
    }
    const kind = playAudio(id);
    setPlayingId(id);
    if (kind === "placeholder") {
      setToast(
        L(
          "Sample tone — the real recitation audio will be added later.",
          "Audio contoh — fail recitation sebenar akan ditambah kemudian.",
        ),
      );
      setTimeout(() => setToast(null), 2400);
    }
  };

  return (
    <section id="bacaan" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Recitations", "Bacaan")}</span>
        <h2 className="section-title reveal">
          {L("Prayer Recitations", "Himpunan Bacaan Solat")}
        </h2>
        <p className="section-sub reveal">
          {L(
            "A quick reference for the key recitations in prayer. Tap the icon to listen to the pronunciation.",
            "Rujukan pantas bacaan-bacaan utama dalam solat. Tekan ikon untuk mendengar sebutan.",
          )}
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            flexWrap: "wrap",
            marginTop: "0.9rem",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {L("School", "Mazhab")}
          </span>
          <div
            role="group"
            aria-label={L("Select school of law", "Pilih mazhab")}
            style={{
              display: "flex",
              gap: 3,
              background: "var(--gold-tint-soft)",
              borderRadius: "var(--radius-pill)",
              padding: 3,
              border: "1px solid var(--line)",
            }}
          >
            {(["shafii", "hanafi"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMadhhab(m)}
                aria-pressed={madhhab === m}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "var(--radius-pill)",
                  padding: "0.28rem 0.6rem",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.3s var(--ease)",
                  background:
                    madhhab === m
                      ? "linear-gradient(120deg, var(--gold-300), var(--gilded) 55%, var(--gold-600))"
                      : "transparent",
                  color: madhhab === m ? "#2a1a06" : "var(--muted)",
                }}
              >
                {m === "shafii" ? "Shafi'i" : "Hanafi"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {items.map(b => (
          <article
            key={b.id}
            className="card reveal"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "0.6rem",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.08rem", fontWeight: 600 }}>
                  {L(b.titleEn, b.title)}
                </h3>
                <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                  {L(b.whenEn, b.when)}
                </span>
              </div>
              <button
                onClick={() => onPlay(b.id)}
                aria-label={`${playingId === b.id ? L("Stop", "Hentikan") : L("Listen to", "Dengar")} ${L(b.titleEn, b.title)}`}
                style={{
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background:
                    playingId === b.id ? "var(--gold-500)" : "var(--gold-tint)",
                  cursor: "pointer",
                }}
              >
                {playingId === b.id ? (
                  <Square size={16} color="var(--white)" />
                ) : (
                  <Volume2 size={18} color="var(--gold-500)" />
                )}
              </button>
            </div>
            <div
              className="arabic"
              style={{
                fontSize: "1.5rem",
                color: "var(--ink)",
                margin: "0.5rem 0",
                lineHeight: 1.9,
                whiteSpace: "pre-line",
              }}
            >
              {b.arabic}
            </div>
            <p
              style={{
                margin: "0.2rem 0 0",
                color: "var(--gold-ink)",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              {b.transliteration}
            </p>
            {b.madhhab && (
              <span
                style={{
                  marginTop: "0.5rem",
                  alignSelf: "flex-start",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--gold-ink)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-pill)",
                  padding: "0.14rem 0.5rem",
                }}
              >
                {b.madhhab === "shafii" ? "Shafi'i" : "Hanafi"}
              </span>
            )}
            {!hasRealAudio(b.id) && (
              <span
                style={{
                  marginTop: "auto",
                  paddingTop: "0.6rem",
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                }}
              >
                {L("sample tone", "audio contoh")}
              </span>
            )}
          </article>
        ))}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            background: "var(--scrim)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--cream)",
            padding: "0.8rem 1.3rem",
            borderRadius: "var(--radius-thumb)",
            fontSize: "0.86rem",
            maxWidth: "90vw",
            textAlign: "center",
          }}
        >
          {toast}
        </div>
      )}
    </section>
  );
}
