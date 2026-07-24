import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpenCheck, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import { SITE } from "../data";
import { useLang } from "../lang";
import DotField from "./DotField";

export function Hero() {
  const { L } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".hero-arabic", { opacity: 0, scale: 0.9, duration: 1.1, ease: "power2.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 18, duration: 0.6, ease: "power3.out" }, "-=0.7")
        .from(".hero-line", { opacity: 0, y: 40, duration: 0.9, ease: "power4.out", stagger: 0.12 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".trust-pill", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, "-=0.3");
    }, root);
    return () => ctx.revert();
  }, []);

  const trust = [
    { icon: BookOpenCheck, en: "Shafi'i & Hanafi schools", bm: "Mazhab Syafi'i & Hanafi" },
    { icon: ShieldCheck, en: "IGOLD academic review", bm: "Semakan akademik IGOLD" },
    { icon: Globe2, en: "Malaysia · New Zealand", bm: "Malaysia · New Zealand" },
    { icon: HeartHandshake, en: "Free & open for all", bm: "Percuma & terbuka" },
  ];

  return (
    <section
      id="hero"
      ref={root}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 30%, #fffdf8 0%, var(--cream) 55%, var(--cream-2) 100%)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <DotField
          dotRadius={2.5}
          dotSpacing={18}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(201, 162, 39, 0.28)"
          gradientTo="rgba(22, 34, 63, 0.16)"
          glowColor="rgba(201, 162, 39, 0.05)"
        />
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "7rem 1.5rem 3rem", maxWidth: 900 }}>
        <div
          className="hero-arabic arabic gold-text"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.6rem)", opacity: 0.9, marginBottom: "0.5rem" }}
        >
          صَلَاة
        </div>
        <div className="hero-eyebrow eyebrow" style={{ marginBottom: "1.2rem" }}>
          {L("An initiative under IGOLD · IIUM", "Sebuah inisiatif di bawah IGOLD · UIAM")}
        </div>
        <h1 className="display" style={{ fontSize: "clamp(2.6rem, 9vw, 5.6rem)", margin: 0, color: "var(--ink)" }}>
          <span className="hero-line" style={{ display: "block" }}>{L("Learn to Pray", "Belajar Solat")}</span>
          <span className="hero-line gold-gradient" style={{ display: "block" }}>{L("with Confidence", "dengan Yakin")}</span>
        </h1>
        <p
          className="hero-sub"
          style={{ color: "var(--body)", fontSize: "clamp(1.05rem, 2.4vw, 1.28rem)", maxWidth: 600, margin: "1.6rem auto 0", lineHeight: 1.65 }}
        >
          {L(SITE.taglineEn, SITE.tagline)}
        </p>
        <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", marginTop: "2.2rem", flexWrap: "wrap" }}>
          <button className="hero-cta btn btn-gold" onClick={() => document.getElementById("kaifiat")?.scrollIntoView({ behavior: "smooth" })}>
            {L("Start Learning →", "Mula Belajar →")}
          </button>
          <button className="hero-cta btn btn-ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            {L("About the Platform", "Tentang Platform")}
          </button>
        </div>

        <div className="trust-row" style={{ marginTop: "2.6rem" }}>
          {trust.map(t => {
            const Icon = t.icon;
            return (
              <span key={t.en} className="trust-pill">
                <Icon size={16} /> {L(t.en, t.bm)}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 2, color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {L("Scroll", "Skrol")}
        <span style={{ width: 1, height: 34, background: "linear-gradient(var(--gold-500), transparent)" }} />
      </div>
    </section>
  );
}
