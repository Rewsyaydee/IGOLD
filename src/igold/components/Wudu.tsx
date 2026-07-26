import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Volume2 } from "lucide-react";
import {
  ScanFace, Hand, Brain, Footprints,
  MessageSquare, HandPlatter, Sparkles, Droplets, Repeat, Ear, BetweenHorizontalStart, ListOrdered,
  ArrowDownToLine, Droplet, Frown, BedSingle, Zap, Smile,
  Ban, Container, Fish,
} from "lucide-react";
import { WUDU_STEPS, WUDU_RUKUN, WUDU_SUNAT, WUDU_PEMBATAL, WUDU_HUKUM_AIR, type WuduInfo } from "../data";
import { playAudio, hasRealAudio } from "../audio";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";
import { getMediaPath } from "../mediaRegistry";

const DEFAULT_MODEL = "default";

export default function Wudu() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [vidErr, setVidErr] = useState<Record<string, boolean>>({});
  useReveal(ref, { stagger: 0.1, selector: ".w-reveal" });

  const step = WUDU_STEPS[i];
  const pct = ((i + 1) / WUDU_STEPS.length) * 100;
  const videoSrc = getMediaPath(DEFAULT_MODEL, "wudu", step.pose);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tl = gsap.timeline();
    if (figureRef.current) {
      tl.fromTo(figureRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0);
    }
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll(".w-anim");
      tl.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }, 0.05);
    }
    return () => { tl.kill(); };
  }, [i]);

  const onAudio = () => {
    const kind = playAudio(`wudu-${step.id}`);
    if (kind === "placeholder") {
      setToast(L("Sample recitation tone — the real audio will be added later.", "Audio recitation contoh — fail audio sebenar akan ditambah kemudian."));
      setTimeout(() => setToast(null), 2600);
    }
  };

  const go = (dir: number) => setI(p => Math.max(0, Math.min(WUDU_STEPS.length - 1, p + dir)));

  return (
    <section id="wudu" ref={ref} className="section band">
      <div className="section-head">
        <span className="eyebrow w-reveal">{L("Ablution", "Bersuci")}</span>
        <h2 className="section-title w-reveal">{L("How to Perform Wudu", "Cara Berwuduk")}</h2>
        <p className="section-sub w-reveal">
          {L(
            "Follow each step of ablution — from intention to the closing du'a. Wudu is a prerequisite for prayer, so getting it right is essential.",
            "Ikuti setiap langkah berwuduk — dari niat hingga doa penutup. Wuduk adalah syarat sah solat, maka penting untuk melakukannya dengan betul.",
          )}
        </p>
      </div>

      <div className="w-reveal" style={{ marginBottom: "1.6rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.8rem", color: "var(--muted)" }}>
          <span>{L("Step", "Langkah")} {i + 1} / {WUDU_STEPS.length}</span>
          <span className="gold-text">{L(step.name, step.nameEn)}</span>
        </div>
        <div style={{ height: 4, background: "var(--surface-inset)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--gold-600), var(--gold-400))", borderRadius: 100, transition: "width 0.5s var(--ease)" }} />
        </div>
      </div>

      <div className="w-reveal kaifiat-stage" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", alignItems: "stretch" }}>
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
            {!vidErr[step.pose] ? (
              <video
                key={`${DEFAULT_MODEL}-${step.pose}`}
                src={videoSrc}
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
              <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", padding: "2rem", color: "var(--muted)", fontSize: "0.9rem", textAlign: "center" }}>
                <p>{L("Video coming soon.", "Video akan datang.")}</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>{L("Place MP4 in", "Letak MP4 di")} public/media/default/wudu/{step.pose}.mp4</p>
              </div>
            )}
            <div style={{ position: "absolute", inset: "0 0 auto 0", height: "24%", background: "linear-gradient(to bottom, rgba(6,13,32,0.7), transparent)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", inset: "auto 0 0 0", height: "34%", background: "linear-gradient(to top, rgba(6,13,32,0.82), transparent)", pointerEvents: "none", zIndex: 1 }} />
            <span style={{ position: "absolute", top: 12, left: 14, zIndex: 2, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cream)", opacity: 0.85 }}>{L("Wudu Step", "Langkah Wuduk")}</span>
            <span className="display" style={{ position: "absolute", bottom: 12, right: 16, zIndex: 2, fontSize: "1.05rem", color: "var(--gold-300)", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{L(step.nameEn, step.name)}</span>
          </div>
        </div>

        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.4rem" }}>
          <div className="w-anim" style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
            <span className="display gold-gradient" style={{ fontSize: "2.4rem" }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>{L(step.nameEn, step.name)}</h3>
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{L(step.name, step.nameEn)}</span>
            </div>
          </div>

          {step.arabic && (
            <div className="w-anim arabic" style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)", color: "var(--ink)", margin: "1rem 0 0.6rem", padding: "1rem 1.2rem", background: "var(--surface-inset)", borderRight: "3px solid var(--gold-500)", borderRadius: "10px" }}>
              {step.arabic}
            </div>
          )}
          {step.transliteration && (
            <p className="w-anim" style={{ margin: "0.4rem 0", color: "var(--gold-ink)", fontStyle: "italic", fontSize: "0.98rem", lineHeight: 1.6 }}>
              {step.transliteration}
            </p>
          )}
          <p className="w-anim" style={{ margin: "0.5rem 0", color: "var(--body)", lineHeight: 1.6 }}>{L(step.meaningEn, step.meaning)}</p>
          {step.note && (
            <p className="w-anim" style={{ marginTop: "0.6rem", fontSize: "0.84rem", color: "var(--muted)", borderTop: "1px solid var(--line-soft)", paddingTop: "0.7rem" }}>
              ℹ︎ {L(step.noteEn ?? step.note, step.note)}
            </p>
          )}

          {step.hasAudio && (
            <button className="w-anim" onClick={onAudio} style={{ marginTop: "1rem", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "var(--gold-tint)", border: "1px solid var(--line)", color: "var(--gold-ink)", padding: "0.7rem 1.2rem", borderRadius: 100, cursor: "pointer", fontWeight: 500, fontFamily: "var(--font-body)" }}>
              <Volume2 size={18} /> {L("Listen to recitation", "Dengar bacaan")} {!hasRealAudio(`wudu-${step.id}`) && <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{L("(sample)", "(contoh)")}</span>}
            </button>
          )}
        </div>
      </div>

      <div className="w-reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.6rem", gap: "1rem", flexWrap: "wrap" }}>
        <button className="btn btn-ghost" onClick={() => go(-1)} disabled={i === 0} style={{ opacity: i === 0 ? 0.4 : 1 }}>← {L("Previous", "Sebelum")}</button>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {WUDU_STEPS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`${L("Step", "Langkah")} ${idx + 1}`} style={{ width: idx === i ? 24 : 9, height: 9, borderRadius: 100, border: "none", cursor: "pointer", background: idx === i ? "var(--gold-500)" : "rgba(22,34,63,0.18)", transition: "all 0.3s var(--ease)" }} />
          ))}
        </div>
        <button className="btn btn-gold" onClick={() => go(1)} disabled={i === WUDU_STEPS.length - 1} style={{ opacity: i === WUDU_STEPS.length - 1 ? 0.4 : 1 }}>{L("Next", "Seterusnya")} →</button>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 60, background: "var(--scrim)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--cream)", padding: "0.8rem 1.3rem", borderRadius: 12, fontSize: "0.86rem", maxWidth: "90vw", textAlign: "center" }}>
          {toast}
        </div>
      )}

      <InfoPanel
        title={L("Obligatory Acts of Wudu", "Rukun Wuduk (Wajib)")}
        subtitle={L("If any of these are missed, wudu is invalid.", "Jika mana-mana perkara ini tertinggal, wuduk tidak sah.")}
        items={WUDU_RUKUN}
        icons={[ScanFace, Hand, Brain, Footprints]}
        L={L}
      />

      <InfoPanel
        title={L("Recommended Acts of Wudu", "Sunat Wuduk (Digalakkan)")}
        subtitle={L("Performing these acts increases the reward of wudu.", "Melakukan amalan ini menambahkan pahala wuduk.")}
        items={WUDU_SUNAT}
        icons={[MessageSquare, HandPlatter, Sparkles, Droplets, Repeat, Ear, BetweenHorizontalStart, ListOrdered]}
        L={L}
      />

      <InfoPanel
        title={L("Nullifiers of Wudu", "Pembatal Wuduk (Nawaqidh)")}
        subtitle={L("These things invalidate wudu and require it to be renewed.", "Perkara-perkara ini membatalkan wuduk dan mewajibkan wuduk diperbaharui.")}
        items={WUDU_PEMBATAL}
        icons={[ArrowDownToLine, Droplet, Frown, BedSingle, Zap, Smile]}
        L={L}
      />

      <InfoPanel
        title={L("Water Rulings for Purification", "Hukum Air untuk Bersuci")}
        subtitle={L("Understanding what water can and cannot be used for wudu.", "Memahami air yang boleh dan tidak boleh digunakan untuk berwuduk.")}
        items={WUDU_HUKUM_AIR}
        icons={[Droplets, Ban, Container, Fish]}
        L={L}
      />
    </section>
  );
}

function InfoPanel({ title, subtitle, items, icons, L }: { title: string; subtitle: string; items: WuduInfo[]; icons: React.ComponentType<{ size?: number; color?: string }>[]; L: (en: string, bm: string) => string }) {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ marginBottom: "1.6rem" }}>
        <h3 className="display" style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 700, margin: "0 0 0.4rem", color: "var(--ink)" }}>
          {title}
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((s, idx) => {
          const Icon = icons[idx];
          return (
            <article key={s.id} className="card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.3rem 1.5rem" }}>
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  flexShrink: 0,
                  background: "var(--gold-tint)",
                  border: "1px solid var(--line)",
                }}
              >
                {Icon && <Icon size={22} color="var(--gold-500)" />}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.4rem" }}>
                  <span className="display gold-text" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3 }}>
                    {L(s.titleEn, s.title)}
                  </h4>
                </div>
                <p style={{ margin: 0, color: "var(--body)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {L(s.descEn, s.desc)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
