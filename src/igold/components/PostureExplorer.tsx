import { useState } from "react";
import { Check } from "lucide-react";
import { POSTURES, HANAFI_POSTURES } from "../data";
import { useLang } from "../lang";
import { useMadhhab } from "../madhhab";
import { buildKaifiatVideoMap } from "../mediaRegistry";

const DEFAULT_MODEL = "default";

export default function PostureExplorer() {
  const { L } = useLang();
  const { madhhab } = useMadhhab();
  const [active, setActive] = useState(0);

  const postureData = madhhab === "hanafi" ? HANAFI_POSTURES : POSTURES;
  const p = postureData[active];
  const align = L(p.alignEn, p.align);
  const videoMap = buildKaifiatVideoMap(DEFAULT_MODEL);

  return (
    <section id="explorer" className="band">
      <div className="section">
        <div className="section-head">
          <span className="eyebrow">{L("Postures", "Posisi")}</span>
          <h2 className="section-title">{L("Explore Each Posture", "Terokai Setiap Posisi")}</h2>
          <p className="section-sub">
            {L(
              "Tap a posture to watch it up close and read how the body should be aligned in each position.",
              "Tekan mana-mana posisi untuk menontonnya dari dekat dan membaca cara badan sepatutnya berada dalam setiap kedudukan.",
            )}
          </p>
        </div>

        <div className="pex-stage" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr", alignItems: "start" }}>
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              background: "var(--navy-800)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-md)",
              height: "clamp(340px, 58vh, 520px)",
              aspectRatio: "9 / 16",
              margin: "0 auto",
              maxWidth: "100%",
            }}
          >
            <video
              key={`${DEFAULT_MODEL}-${p.pose}`}
              src={videoMap[p.pose]}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontSize: "0.64rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--white)",
                background: "var(--scrim)",
                borderRadius: 100,
                padding: "0.3rem 0.8rem",
              }}
            >
              {String(active + 1).padStart(2, "0")} / {postureData.length}
            </span>
          </div>

          <div>
            <h3 className="display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", margin: "0 0 0.4rem", color: "var(--ink)" }}>
              {L(p.nameEn, p.name)}
            </h3>
            <div className="arabic gold-text" style={{ fontSize: "1.3rem", marginBottom: "1.4rem", opacity: 0.9 }}>
              {p.pose === "salam" ? "اَلسَّلَامُ عَلَيْكُمْ" : "صَلَاة"}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              {align.map((line, i) => (
                <li key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", color: "var(--body)", fontSize: "1.02rem", lineHeight: 1.55 }}>
                  <span
                    aria-hidden="true"
                    style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: "var(--gold-tint)", border: "1px solid var(--line)" }}
                  >
                    <Check size={15} color="var(--gold-ink)" />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.6rem", color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>
              {L(
                `A general guide following the ${madhhab === "hanafi" ? "Hanafi" : "Shafi'i"} school. For detail on your own situation, please refer to a qualified ustaz.`,
                `Panduan umum mengikut mazhab ${madhhab === "hanafi" ? "Hanafi" : "Syafie"}. Untuk butiran mengikut keadaan anda, sila rujuk ustaz yang bertauliah.`,
              )}
            </p>
          </div>
        </div>

        <div className="pex-grid" style={{ marginTop: "2.4rem" }}>
          {postureData.map((pt, i) => (
            <button
              key={pt.pose}
              className={`pex-thumb${i === active ? " is-active" : ""}`}
              aria-pressed={i === active}
              aria-label={L(pt.nameEn, pt.name)}
              onClick={() => setActive(i)}
            >
              <video src={`${videoMap[pt.pose]}#t=0.6`} muted playsInline preload="metadata" aria-hidden="true" />
              <span className="pex-thumb__label">{L(pt.nameEn, pt.name)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
