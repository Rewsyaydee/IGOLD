import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/igold/config";
import "@/igold/igold.css";
import "@/landing/landing.css";
import "./dls.css";
import {
  CONFLICTS,
  CORE_PALETTE,
  type ConflictStatus,
  DLS_SECTIONS,
  ELEVATION,
  LEGACY_COLORS,
  MOTION,
  RADII,
  RADIUS_DRIFT,
  SEMANTIC_DARK,
  SEMANTIC_LIGHT,
  type SemanticToken,
  TYPE_SCALE,
} from "./data";

const STATUS_LABELS: Record<ConflictStatus, string> = {
  resolved: "Resolved",
  legacy: "Legacy",
  drift: "Drift",
  dead: "Dead code",
  fragmented: "Fragmented",
};

const SEQUENCE = [
  { id: "hero", tone: "dark" },
  { id: "about", tone: "light" },
  { id: "syarat", tone: "dark" },
  { id: "rukun", tone: "light" },
  { id: "niyyah", tone: "dark" },
  { id: "wudu", tone: "light" },
  { id: "kaifiat", tone: "dark" },
  { id: "bacaan", tone: "light" },
  { id: "kuiz", tone: "dark" },
];

function SemanticRows({ tokens }: { tokens: SemanticToken[] }) {
  return (
    <>
      {tokens.map(token => (
        <div key={token.token} className="dls-semantic__row">
          <span
            className="dls-semantic__chip"
            style={{ background: `var(${token.token})` }}
          />
          <div>
            <span className="dls-semantic__token">{token.token}</span>
            <span className="dls-semantic__role">{token.role}</span>
            <span
              className="dls-semantic__meter"
              style={{ color: `var(${token.token})` }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export function DlsPage() {
  const [active, setActive] = useState<string>(DLS_SECTIONS[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    document.title = "NOOR Design System · iGOLD";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      if (previous === null) {
        meta?.remove();
      } else {
        meta?.setAttribute("content", previous);
      }
    };
  }, []);

  useEffect(() => {
    const sections = DLS_SECTIONS.map(section =>
      document.getElementById(section.id),
    ).filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach(section => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).catch(() => undefined);
    setCopied(value);
    window.setTimeout(
      () => setCopied(current => (current === value ? null : current)),
      1400,
    );
  };

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dls">
      <header className="dls-topbar">
        <Link className="dls-brand" to="/">
          <img src={APP_CONFIG.branding.igoldLogo} alt="iGOLD" />
          <span className="dls-brand-divider" aria-hidden="true" />
          <span>
            <span className="dls-brand-title">NOOR</span>
            <span className="dls-brand-sub"> Design System</span>
          </span>
        </Link>
        <nav className="dls-topbar-actions" aria-label="Design system links">
          <Link className="dls-toplink" to="/">
            Landing
          </Link>
          <Link className="dls-toplink" to="/learn">
            Prayer guide
          </Link>
        </nav>
      </header>

      <div className="dls-layout">
        <aside className="dls-toc">
          <p className="dls-toc-title">Contents</p>
          {DLS_SECTIONS.map(section => (
            <button
              key={section.id}
              type="button"
              className={`dls-toc-link ${active === section.id ? "is-active" : ""}`}
              onClick={() => jump(section.id)}
            >
              <span className="dls-toc-num">{section.num}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </aside>

        <main className="dls-main">
          <section className="dls-hero">
            <span className="dls-pill">
              <i />
              Living specification · bound to the live stylesheets
            </span>
            <h1>The NOOR design language</h1>
            <p>
              NOOR is the iGOLD design language. Its current visual phase,
              Sacred Atlas, pairs cream paper and everglade ink with gilded
              radiance: calm, editorial and trustworthy. Every swatch and
              specimen below reads the real tokens and classes from igold.css
              and landing.css, so this page cannot drift from production.
            </p>
            <div className="dls-pills">
              <span className="dls-pill">
                <i />
                Sacred Atlas palette
              </span>
              <span className="dls-pill">
                <i />
                Playfair · Inter · Amiri
              </span>
              <span className="dls-pill">
                <i />
                v1.1.0
              </span>
            </div>
          </section>

          <section id="principles" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">01 · Foundation</span>
              <h2 className="dls-h2">Principles</h2>
              <p className="dls-lead">
                Four rules drive every layout and component decision in the
                guide and the landing page.
              </p>
            </div>
            <div className="dls-grid-3">
              <article className="dls-principle">
                <span className="dls-num">01</span>
                <h3>Cream paper</h3>
                <p>
                  Light surfaces default to cream and paper. Generous whitespace
                  keeps the learning experience calm and readable.
                </p>
              </article>
              <article className="dls-principle">
                <span className="dls-num">02</span>
                <h3>Everglade ink</h3>
                <p>
                  Deep green anchors the journey. Dark bands alternate with
                  light ones, chapter by chapter, and close the page.
                </p>
              </article>
              <article className="dls-principle">
                <span className="dls-num">03</span>
                <h3>Gilded radiance</h3>
                <p>
                  Gold is a highlight, never a flood. Reserve it for accents,
                  kickers, focus and the single most important action.
                </p>
              </article>
              <article className="dls-principle">
                <span className="dls-num">04</span>
                <h3>Editorial rhythm</h3>
                <p>
                  Playfair Display carries headlines, Inter carries reading, and
                  Amiri carries Arabic. Type is the main decoration.
                </p>
              </article>
            </div>
          </section>

          <section id="color" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">02 · Tokens</span>
              <h2 className="dls-h2">Color</h2>
              <p className="dls-lead">
                The Sacred Atlas core palette. Swatches are painted with{" "}
                <code>var()</code> references, so these values update the moment
                the stylesheets change.
              </p>
            </div>

            <p className="dls-subhead">Core palette</p>
            <div className="dls-swatches">
              {CORE_PALETTE.map(token => (
                <article key={token.cssVar} className="dls-swatch">
                  <div
                    className="dls-swatch__chip"
                    style={{ background: `var(${token.cssVar})` }}
                  />
                  <button
                    type="button"
                    className="dls-copy"
                    onClick={() => copy(token.hex)}
                  >
                    {copied === token.hex ? "Copied" : "Copy"}
                  </button>
                  <div className="dls-swatch__body">
                    <span className="dls-swatch__name">{token.name}</span>
                    <span className="dls-swatch__var">
                      {token.cssVar} · {token.hex}
                    </span>
                    <span className="dls-swatch__role">{token.role}</span>
                  </div>
                </article>
              ))}
            </div>

            <p className="dls-subhead">Semantic tokens · light band</p>
            <div className="igold" style={{ borderRadius: 18 }}>
              <section id="about" className="dls-semantic">
                <SemanticRows tokens={SEMANTIC_LIGHT} />
              </section>
            </div>

            <p className="dls-subhead">Semantic tokens · dark band</p>
            <div className="igold" style={{ borderRadius: 18 }}>
              <section id="syarat" className="dls-semantic">
                <SemanticRows tokens={SEMANTIC_DARK} />
              </section>
            </div>

            <p className="dls-subhead">Retired palette · do not use</p>
            <div className="dls-swatches">
              {LEGACY_COLORS.map(color => (
                <article
                  key={color.hex}
                  className="dls-swatch dls-swatch--legacy"
                >
                  <div
                    className="dls-swatch__chip"
                    style={{ background: color.hex }}
                  />
                  <div className="dls-swatch__body">
                    <span className="dls-swatch__name">{color.name}</span>
                    <span className="dls-swatch__var">{color.hex}</span>
                    <span className="dls-swatch__role">{color.foundIn}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="typography" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">03 · Tokens</span>
              <h2 className="dls-h2">Typography</h2>
              <p className="dls-lead">
                Three families, four jobs. Playfair Display for display, Inter
                for interface and reading, Amiri for Arabic.
              </p>
            </div>
            <div className="dls-type-list">
              {TYPE_SCALE.map(spec => (
                <div key={spec.label} className="dls-type-row">
                  <div className="dls-type-label">
                    <b>{spec.label}</b>
                    <span className="dls-type-meta">
                      {spec.font} · {spec.weight}
                      <br />
                      {spec.size} / {spec.lineHeight}
                      {spec.tracking !== "0" ? ` / ${spec.tracking}` : ""}
                    </span>
                    <span className="dls-type-note">{spec.note}</span>
                  </div>
                  <p
                    className={spec.className || undefined}
                    style={{
                      fontSize: spec.size,
                      lineHeight: spec.lineHeight,
                      letterSpacing:
                        spec.tracking === "0" ? undefined : spec.tracking,
                      fontWeight: spec.weight,
                      margin: 0,
                    }}
                  >
                    {spec.sample}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="layout" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">04 · Structure</span>
              <h2 className="dls-h2">Layout &amp; spacing</h2>
              <p className="dls-lead">
                One centered measure, cinematic padding and an alternating light
                and dark chapter rhythm.
              </p>
            </div>

            <p className="dls-subhead">Content width</p>
            <div className="dls-measure">
              <div className="dls-measure__bar">
                <span
                  className="dls-measure__fill"
                  style={{ width: "93.9%" }}
                />
              </div>
              <div className="dls-measure__labels">
                <span>Guide · --maxw 1240px</span>
                <span>Landing · 1240px</span>
              </div>
            </div>
            <p className="dls-caption">
              Unified: both surfaces share the 1240px measure.
            </p>

            <p className="dls-subhead">Section rhythm</p>
            <div className="dls-bands">
              {SEQUENCE.map(item => (
                <div
                  key={item.id}
                  className={`dls-band dls-band--${item.tone}`}
                >
                  <span>#{item.id}</span>
                  <code>
                    {item.tone === "dark"
                      ? "everglade gradient · light text · #ffc16f gold"
                      : "light-veil gradient · ink text · #98510f gold"}
                  </code>
                </div>
              ))}
            </div>
            <p className="dls-caption">
              Unified: both surfaces use{" "}
              <code>clamp(4.5rem, 9vw, 8.5rem)</code> section padding.
            </p>
          </section>

          <section id="radii" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">05 · Surfaces</span>
              <h2 className="dls-h2">Radii &amp; elevation</h2>
              <p className="dls-lead">
                Soft corners, soft green shadows. Elevation is used to signal
                interactivity, not decoration.
              </p>
            </div>

            <p className="dls-subhead">Radius scale</p>
            <div className="dls-tiles">
              {RADII.map(radius => (
                <div
                  key={radius.value}
                  className="dls-radius-tile"
                  style={{ borderRadius: radius.value }}
                >
                  {radius.value}
                </div>
              ))}
            </div>
            <p className="dls-radius-note">{RADIUS_DRIFT}</p>

            <p className="dls-subhead">Elevation tokens</p>
            <div className="dls-grid-3">
              {ELEVATION.map(shadow => (
                <article
                  key={shadow.token}
                  className="dls-shadow-tile"
                  style={{
                    boxShadow: shadow.value,
                    borderColor: shadow.gold
                      ? "rgba(234, 160, 67, 0.45)"
                      : undefined,
                  }}
                >
                  <b>{shadow.token}</b>
                  <code>{shadow.value}</code>
                  <span>{shadow.usage}</span>
                </article>
              ))}
            </div>
          </section>

          <section id="components" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">06 · Library</span>
              <h2 className="dls-h2">Components</h2>
              <p className="dls-lead">
                Specimens rendered with the production classes. Landing
                specimens are wrapped in an <code>.igold-landing</code> scope so
                their tokens resolve exactly as on the real page.
              </p>
            </div>

            <p className="dls-subhead">Buttons</p>
            <div className="igold-landing dls-specimen">
              <button type="button" className="btn btn-gold">
                Start learning
              </button>
              <button type="button" className="btn btn-ghost">
                Browse guide
              </button>
              <button type="button" className="ld-btn ld-btn--gold">
                Open the guide
              </button>
              <button type="button" className="ld-btn ld-btn--ghost">
                Secondary
              </button>
            </div>
            <p className="dls-caption">
              Unified: <code>.btn</code> and <code>.ld-btn</code> share the
              999px pill, gold ramp, ink color and focus ring.
            </p>

            <div className="igold-landing dls-specimen dls-specimen--dark">
              <button type="button" className="ld-btn ld-btn--cream">
                Cream on dark
              </button>
              <button type="button" className="ld-btn ld-btn--gold">
                Gold CTA
              </button>
              <span className="ld-chip">
                <i />
                Live now
              </span>
            </div>

            <p className="dls-subhead">Segmented pills &amp; chips</p>
            <div className="igold-landing dls-specimen">
              <span className="ld-madhhab-toggle">
                <button type="button" className="is-active">
                  Shafi&apos;i
                </button>
                <button type="button">Hanafi</button>
              </span>
              <button type="button" className="ld-pose-chip is-active">
                Qiyam
              </button>
              <button type="button" className="ld-pose-chip">
                Rukuk
              </button>
              <span className="ld-partner-chip">IIUM</span>
            </div>

            <p className="dls-subhead">Cards</p>
            <div className="igold dls-specimen dls-specimen--stack">
              <article className="card">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  Standard card
                </h3>
                <p style={{ margin: 0, color: "var(--muted)" }}>
                  18px radius, hairline border, green-tinted shadow. Hover lifts
                  4px and turns the border gold.
                </p>
              </article>
              <button type="button" className="hover-card">
                <span className="hover-card__num">01</span>
                <span style={{ fontWeight: 700 }}>Hover card</span>
                <span className="hover-card__detail">
                  <div
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--muted)",
                    }}
                  >
                    Detail reveals on hover or focus with a grid-row transition.
                  </div>
                </span>
                <span className="hover-card__hint">Hover to reveal</span>
              </button>
            </div>

            <div className="igold-landing dls-specimen dls-specimen--stack">
              <article className="ld-bento-card">
                <span className="ld-card-icon" aria-hidden="true">
                  ✦
                </span>
                <h3 className="ld-card-title">Bento card</h3>
                <p className="ld-card-desc">
                  Light feature card with a cursor-tracking gold border.
                </p>
              </article>
              <article className="ld-bento-card ld-bento-card--dark">
                <span className="ld-card-kicker">Feature</span>
                <h3 className="ld-card-title">Dark variant</h3>
                <p className="ld-card-desc">
                  Everglade gradient for emphasis moments inside a light band.
                </p>
              </article>
            </div>

            <p className="dls-subhead">Audio control &amp; input</p>
            <div className="igold dls-specimen">
              <button
                type="button"
                aria-label="Play recitation sample"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  border: "1px solid rgba(234, 160, 67, 0.4)",
                  background: "var(--gold-tint)",
                  color: "var(--gold-ink)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <input
                className="dls-input"
                style={{ maxWidth: 320 }}
                placeholder="Name"
                aria-label="Sample input"
              />
            </div>

            <p className="dls-subhead">Glass · chrome only</p>
            <div className="dls-specimen dls-specimen--glass">
              <div className="dls-glass">
                Nav, sidebars, floating badges and the app mockup may use blur.
                Content cards stay solid.
              </div>
            </div>
          </section>

          <section id="motion" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">07 · Behavior</span>
              <h2 className="dls-h2">Motion</h2>
              <p className="dls-lead">
                One easing curve for everything, gentle reveals, small lifts and
                a visible keyboard focus ring.
              </p>
            </div>
            <div className="dls-grid-2">
              <div>
                {MOTION.map(item => (
                  <div key={item.token} className="dls-semantic__row">
                    <span
                      className="dls-semantic__chip"
                      style={{ background: "var(--gold-tint)" }}
                    />
                    <div>
                      <span className="dls-semantic__token">{item.token}</span>
                      <span className="dls-semantic__role">{item.usage}</span>
                      <span
                        className="dls-semantic__role"
                        style={{ color: "var(--deep-diving)" }}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dls-motion-stage">
                <button
                  type="button"
                  className="dls-button-demo"
                  onClick={() => setRevealKey(key => key + 1)}
                >
                  Replay reveal
                </button>
                <div
                  key={revealKey}
                  className="dls-motion-reveal dls-motion-card"
                >
                  I rise 26px into place using the NOOR ease.
                </div>
                <div className="dls-motion-card">
                  Hover me: 4px lift, gold border, deeper shadow.
                </div>
              </div>
            </div>
            <div className="igold dls-motion-stage" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-ghost">
                Tab to this button
              </button>
              <p className="dls-caption" style={{ margin: 0 }}>
                The ring is the live <code>igold.css</code> focus-visible rule:
                3px gilded, 4px offset.
              </p>
            </div>
          </section>

          <section id="conflicts" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">08 · Cleanup backlog</span>
              <h2 className="dls-h2">Conflict register</h2>
              <p className="dls-lead">
                Every tracked deviation between the intended NOOR system and
                the code, with the fix and file references. Resolved items stay
                listed as a change record; deferred items remain open.
              </p>
            </div>
            <div className="dls-conflicts">
              {CONFLICTS.map((conflict, index) => (
                <article key={conflict.title} className="dls-conflict">
                  <span className="dls-conflict__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="dls-conflict__head">
                      <h3>{conflict.title}</h3>
                      <span
                        className={`dls-badge dls-badge--${conflict.status}`}
                      >
                        {STATUS_LABELS[conflict.status]}
                      </span>
                    </div>
                    <p className="dls-conflict__detail">{conflict.detail}</p>
                    <p className="dls-conflict__fix">
                      <b>Fix:</b> {conflict.fix}
                    </p>
                    <div className="dls-refs">
                      {conflict.refs.map(ref => (
                        <code key={ref} className="dls-ref">
                          {ref}
                        </code>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="version" className="dls-section">
            <div className="dls-section-head">
              <span className="dls-kicker">09 · Record</span>
              <h2 className="dls-h2">Version</h2>
              <p className="dls-lead">
                This page is unlisted and marked <code>noindex</code>. It reads
                production CSS directly, so token edits appear here without any
                page change.
              </p>
            </div>
            <div className="dls-version-grid">
              <div className="dls-version-card">
                <b>System</b>
                <span>NOOR · Sacred Atlas palette</span>
              </div>
              <div className="dls-version-card">
                <b>Version</b>
                <span>v1.1.0 · September 2026 · consistency pass</span>
              </div>
              <div className="dls-version-card">
                <b>Sources of truth</b>
                <span>
                  src/igold/igold.css · src/landing/landing.css ·
                  src/dls/data.ts
                </span>
              </div>
              <div className="dls-version-card">
                <b>Maintainer</b>
                <span>
                  {APP_CONFIG.developer.name} ·{" "}
                  <a
                    href={APP_CONFIG.developer.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {APP_CONFIG.developer.websiteLabel}
                  </a>
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="dls-footer">
        <b>NOOR</b> — cream paper, everglade ink, gilded radiance. Bound to the
        live stylesheets of iGOLD × IIUM.
      </footer>
    </div>
  );
}
