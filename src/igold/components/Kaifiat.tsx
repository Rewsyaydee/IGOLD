import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Square, Volume2 } from "lucide-react";
import { STEPS, HANAFI_STEPS } from "../data";
import { playAudio, stopAudio, hasRealAudio } from "../audio";
import { PrayerFigure } from "./PrayerFigure";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";
import { useMadhhab } from "../madhhab";
import { useModel } from "../model";
import { MEDIA_MODELS, MEDIA_MODEL_LABELS, buildKaifiatVideoMap } from "../mediaRegistry";

function ModelPills() {
  const { model, setModel } = useModel();
  const { L } = useLang();
  return (
    <div
      role="group"
      aria-label="Instructional model"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--line)",
        borderRadius: 100,
        padding: 3,
        gap: 2,
        background: "var(--surface)",
        flexShrink: 0,
      }}
    >
      {MEDIA_MODELS.map(m => {
        const labels = MEDIA_MODEL_LABELS[m];
        const on = model === m;
        return (
          <button
            key={m}
            onClick={() => setModel(m)}
            aria-pressed={on}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 100,
              padding: "0.28rem 0.6rem",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontFamily: "var(--font-body)",
              transition: "all 0.3s var(--ease)",
              background: on ? "linear-gradient(120deg, var(--gold-500), var(--gold-600))" : "transparent",
              color: on ? "var(--white)" : "var(--muted)",
            }}
          >
            {L(labels.en, labels.bm)}
          </button>
        );
      })}
    </div>
  );
}

export function Kaifiat() {
  const { L } = useLang();
  const { madhhab, setMadhhab } = useMadhhab();
  const { model } = useModel();
  const ref = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [vidErr, setVidErr] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  useReveal(ref, { stagger: 0.1, selector: ".k-reveal" });

  const steps = madhhab === "hanafi" ? HANAFI_STEPS : STEPS;
  const step = steps[i];
  const pct = ((i + 1) / steps.length) * 100;
  const videoMap = buildKaifiatVideoMap(model);

  useEffect(() => { setVidErr({}); }, [model]);
  useEffect(() => { setPlayingId(null); }, [i]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tl = gsap.timeline();
    if (figureRef.current) {
      tl.fromTo(figureRef.current, { opacity: 0, scale: 0.92, rotate: -2 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "power3.out" }, 0);
    }
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll(".k-anim");
      tl.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }, 0.05);
    }
    return () => { tl.kill(); };
  }, [i]);

  const audioKey = step.id === 4 ? "fatihah" : `step-${step.id}`;

  const onAudio = () => {
    if (playingId === audioKey) {
      stopAudio();
      setPlayingId(null);
      return;
    }
    const kind = playAudio(audioKey);
    setPlayingId(audioKey);
    if (kind === "placeholder") {
      setToast(L("Sample recitation tone — the real audio will be added later.", "Audio recitation contoh — fail audio sebenar akan ditambah kemudian."));
      setTimeout(() => setToast(null), 2600);
    }
  };

  const go = (dir: number) => setI(p => Math.max(0, Math.min(steps.length - 1, p + dir)));

  return (
    <section id="kaifiat" ref={ref} className="section">
      <div className="section-head">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow k-reveal">{L("Step by Step", "Cara Solat")}</span>
            <h2 className="section-title k-reveal" style={{ marginBottom: 0 }}>{L("How to Pray", "Kaifiat Solat")}</h2>
          </div>
          <div className="k-reveal">
            <ModelPills />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
          <div className="k-reveal" style={{ display: "flex", gap: 3, background: "var(--gold-tint-soft)", borderRadius: 100, padding: 3, border: "1px solid var(--line)" }}>
            {(["shafii", "hanafi"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMadhhab(m)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 100,
                  padding: "0.28rem 0.6rem",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.3s var(--ease)",
                  background: madhhab === m ? "linear-gradient(120deg, var(--gold-500), var(--gold-600))" : "transparent",
                  color: madhhab === m ? "var(--white)" : "var(--muted)",
                }}
              >
                {m === "shafii" ? "Syafi'e" : "Hanafi"}
              </button>
            ))}
          </div>
        </div>
        <p className="section-sub k-reveal" style={{ marginTop: "0.6rem" }}>
          {L(
            "Follow every step — complete with recitations, transliteration, meaning, and audio.",
            "Ikuti setiap langkah — lengkap dengan bacaan, sebutan rumi, maksud, dan butang audio.",
          )}
        </p>
      </div>

      <div className="k-reveal" style={{ marginBottom: "1.6rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.8rem", color: "var(--muted)" }}>
          <span>{L("Step", "Langkah")} {i + 1} / {steps.length}</span>
          <span className="gold-text">{L(step.name, step.nameEn)}</span>
        </div>
        <div style={{ height: 4, background: "var(--surface-inset)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--gold-600), var(--gold-400))", borderRadius: 100, transition: "width 0.5s var(--ease)" }} />
        </div>
      </div>

      <div className="k-reveal kaifiat-stage" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", alignItems: "stretch" }}>
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            border: "1px solid var(--line-soft)",
            borderRadius: 22,
            boxShadow: "var(--shadow-md)",
            padding: "1rem",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div ref={figureRef} style={{ position: "relative", height: "clamp(340px, 54vh, 480px)", aspectRatio: "9 / 16", maxWidth: "100%", borderRadius: 18, overflow: "hidden", background: "var(--navy-800)", boxShadow: "0 10px 30px -14px rgba(22,34,63,0.4)", border: "1px solid var(--line-soft)" }}>
            {videoMap[step.pose] && !vidErr[step.pose] ? (
              <video
                key={`${model}-${step.pose}`}
                src={videoMap[step.pose]}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={`${L("Demonstration of", "Demonstrasi")} ${L(step.nameEn, step.name)}`}
                onError={() => setVidErr(e => ({ ...e, [step.pose]: true }))}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", padding: "1rem" }}>
                <PrayerFigure pose={step.pose} />
              </div>
            )}
            <div style={{ position: "absolute", inset: "0 0 auto 0", height: "24%", background: "linear-gradient(to bottom, rgba(6,13,32,0.7), transparent)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", inset: "auto 0 0 0", height: "34%", background: "linear-gradient(to top, rgba(6,13,32,0.82), transparent)", pointerEvents: "none", zIndex: 1 }} />
            <span style={{ position: "absolute", top: 12, left: 14, zIndex: 2, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cream)", opacity: 0.85 }}>{L("Posture", "Kedudukan")}</span>
            <span className="display" style={{ position: "absolute", bottom: 12, right: 16, zIndex: 2, fontSize: "1.05rem", color: "var(--gold-300)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{L(step.nameEn, step.name)}</span>
          </div>
        </div>

        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.4rem" }}>
          <div className="k-anim" style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
            <span className="display gold-gradient" style={{ fontSize: "2.4rem" }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>{L(step.nameEn, step.name)}</h3>
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{L(step.name, step.nameEn)}</span>
            </div>
          </div>

          {step.arabic && (
            <div className="k-anim arabic" style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)", color: "var(--ink)", margin: "1rem 0 0.6rem", padding: "1rem 1.2rem", background: "var(--surface-inset)", borderRight: "3px solid var(--gold-500)", borderRadius: "10px" }}>
              {step.arabic}
            </div>
          )}
          {step.transliteration && (
            <p className="k-anim" style={{ margin: "0.4rem 0", color: "var(--gold-ink)", fontStyle: "italic", fontSize: "0.98rem", lineHeight: 1.6 }}>
              {step.transliteration}
            </p>
          )}
          <p className="k-anim" style={{ margin: "0.5rem 0", color: "var(--body)", lineHeight: 1.6 }}>{L(step.meaningEn, step.meaning)}</p>
          {step.note && (
            <p className="k-anim" style={{ marginTop: "0.6rem", fontSize: "0.84rem", color: "var(--muted)", borderTop: "1px solid var(--line-soft)", paddingTop: "0.7rem" }}>
              ℹ︎ {L(step.noteEn ?? step.note, step.note)}
            </p>
          )}

          {step.hasAudio && (
            <button className="k-anim" onClick={onAudio} style={{ marginTop: "1rem", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.6rem", background: playingId === audioKey ? "var(--gold-500)" : "var(--gold-tint)", border: "1px solid var(--line)", color: playingId === audioKey ? "var(--white)" : "var(--gold-ink)", padding: "0.7rem 1.2rem", borderRadius: 100, cursor: "pointer", fontWeight: 500, fontFamily: "var(--font-body)" }}>
              {playingId === audioKey ? <Square size={18} /> : <Volume2 size={18} />} {playingId === audioKey ? L("Stop", "Hentikan") : L("Listen to recitation", "Dengar bacaan")} {!hasRealAudio(`step-${step.id}`) && <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{L("(sample)", "(contoh)")}</span>}
            </button>
          )}
        </div>
      </div>

      <div className="k-reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.6rem", gap: "1rem", flexWrap: "wrap" }}>
        <button className="btn btn-ghost" onClick={() => go(-1)} disabled={i === 0} style={{ opacity: i === 0 ? 0.4 : 1 }}>← {L("Previous", "Sebelum")}</button>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`${L("Step", "Langkah")} ${idx + 1}`} style={{ width: idx === i ? 24 : 9, height: 9, borderRadius: 100, border: "none", cursor: "pointer", background: idx === i ? "var(--gold-500)" : "rgba(22,34,63,0.18)", transition: "all 0.3s var(--ease)" }} />
          ))}
        </div>
        <button className="btn btn-gold" onClick={() => go(1)} disabled={i === steps.length - 1} style={{ opacity: i === steps.length - 1 ? 0.4 : 1 }}>{L("Next", "Seterusnya")} →</button>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 60, background: "var(--scrim)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--cream)", padding: "0.8rem 1.3rem", borderRadius: 12, fontSize: "0.86rem", maxWidth: "90vw", textAlign: "center" }}>
          {toast}
        </div>
      )}
    </section>
  );
}
