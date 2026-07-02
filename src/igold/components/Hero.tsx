import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpenCheck, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import { SITE } from "../data";
import { useLang } from "../lang";

/** Static Islamic geometric rosette (8-point khatam star), gold line-art.
 *  Purely decorative, aria-hidden. Gently rotates unless reduced-motion. */
function GeoMotif() {
  return (
    <div
      aria-hidden="true"
      className="hero-motif"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    >
      <svg
        width="min(92vw, 760px)"
        height="min(92vw, 760px)"
        viewBox="0 0 200 200"
        fill="none"
        style={{ display: "block" }}
      >
        <g stroke="var(--gold-500)" strokeWidth="0.6" opacity="0.6">
          <circle cx="100" cy="100" r="92" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="46" />
        </g>
        {/* two overlaid squares → 8-point star */}
        <g stroke="var(--gold-600)" strokeWidth="0.8" opacity="0.75">
          <rect x="32" y="32" width="136" height="136" transform="rotate(0 100 100)" />
          <rect x="32" y="32" width="136" height="136" transform="rotate(45 100 100)" />
        </g>
        {/* inner rosette petals */}
        <g stroke="var(--gold-400)" strokeWidth="0.7" opacity="0.7">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2="100"
              y2="8"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}
        </g>
        <circle cx="100" cy="100" r="14" stroke="var(--gold-600)" strokeWidth="0.9" />
      </svg>
    </div>
  );
}

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
      // slow, subtle rotation of the geometric motif
      gsap.to(".hero-motif svg", { rotate: 360, duration: 240, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    }, root);
    return () => ctx.revert();
  }, []);

  const trust = [
    { icon: BookOpenCheck, en: "Shafi'i school", bm: "Mazhab Syafi'i" },
    { icon: ShieldCheck, en: "IGOLD academic review", bm: "Semakan akademik IGOLD" },
    { icon: Globe2, en: "Malaysia · New Zealand", bm: "Malaysia · New Zealand" },
    { icon: HeartHandshake, en: "Free & open for all", bm: "Percuma & terbuka" },
  ];

  return (
    <section
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
      <GeoMotif />

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

      {/* scroll cue */}
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 2, color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {L("Scroll", "Skrol")}
        <span style={{ width: 1, height: 34, background: "linear-gradient(var(--gold-500), transparent)" }} />
      </div>
    </section>
  );
}
