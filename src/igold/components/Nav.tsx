import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "../data";
import { APP_CONFIG } from "../config";
import { useLang } from "../lang";
import { useMadhhab, type Madhhab } from "../madhhab";
import { ModelSelector } from "./ModelSelector";

function MadhhabSelector() {
  const { madhhab, setMadhhab } = useMadhhab();
  const options: { value: Madhhab; label: string }[] = [
    { value: "shafii", label: "Syafi'e" },
    { value: "hanafi", label: "Hanafi" },
  ];
  return (
    <div
      role="group"
      aria-label="Madhhab / Mazhab"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--line)",
        borderRadius: 100,
        padding: 3,
        gap: 2,
        background: "var(--gold-tint-soft)",
        marginLeft: "0.3rem",
      }}
    >
      {options.map(o => {
        const on = madhhab === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setMadhhab(o.value)}
            aria-pressed={on}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 100,
              padding: "0.32rem 0.7rem",
              fontSize: "0.74rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-body)",
              transition: "all 0.3s var(--ease)",
              background: on ? "linear-gradient(120deg, var(--gold-500), var(--gold-600))" : "transparent",
              color: on ? "var(--white)" : "var(--muted)",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language / Bahasa"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--line)",
        borderRadius: 100,
        padding: 3,
        gap: 2,
        background: "var(--gold-tint-soft)",
        marginLeft: compact ? 0 : "0.5rem",
      }}
    >
      {(["en", "bm"] as const).map(l => {
        const on = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={on}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 100,
              padding: "0.32rem 0.7rem",
              fontSize: "0.74rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-body)",
              transition: "all 0.3s var(--ease)",
              background: on ? "linear-gradient(120deg, var(--gold-500), var(--gold-600))" : "transparent",
              color: on ? "var(--white)" : "var(--muted)",
            }}
          >
            {l === "en" ? "EN" : "BM"}
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const { L } = useLang();
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s var(--ease)",
        background: scrolled ? "rgba(247,242,232,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line-soft)" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "0.9rem clamp(1.25rem, 5vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Top"
        >
          <svg width="26" height="26" viewBox="0 0 100 100">
            <polygon points="50,8 60,38 92,38 66,57 76,90 50,70 24,90 34,57 8,38 40,38" fill="none" stroke="var(--gold-500)" strokeWidth="4" />
          </svg>
          <span className="display gold-text" style={{ fontSize: "1.2rem", letterSpacing: "0.14em" }}>{SITE.brand}</span>
          <img
            src={APP_CONFIG.branding.iiumLogo}
            alt="IIUM"
            style={{ height: 26, width: "auto", marginLeft: 4, opacity: 0.85 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </button>

        {/* desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === item.id ? "var(--gold-ink)" : "var(--muted)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.86rem",
                padding: "0.5rem 0.7rem",
                transition: "color 0.3s",
                position: "relative",
              }}
            >
              {L(item.labelEn, item.label)}
              {active === item.id && (
                <span style={{ position: "absolute", bottom: 0, left: "0.7rem", right: "0.7rem", height: 2, background: "var(--gold-500)", borderRadius: 2 }} />
              )}
            </button>
          ))}
          <LangToggle />
          <MadhhabSelector />
          <ModelSelector />
        </div>

        {/* mobile: lang toggle + burger */}
        <div className="nav-burger" style={{ display: "none", alignItems: "center", gap: "0.6rem" }}>
          <LangToggle compact />
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{ background: "none", border: "1px solid var(--line)", borderRadius: 10, padding: "0.5rem 0.6rem", cursor: "pointer" }}
          >
            <div style={{ width: 20, height: 2, background: "var(--gold-500)", margin: "3px 0" }} />
            <div style={{ width: 20, height: 2, background: "var(--gold-500)", margin: "3px 0" }} />
            <div style={{ width: 20, height: 2, background: "var(--gold-500)", margin: "3px 0" }} />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          className="nav-mobile"
          style={{ display: "none", flexDirection: "column", padding: "0.5rem 1.25rem 1.25rem", background: "rgba(247,242,232,0.98)", borderBottom: "1px solid var(--line-soft)" }}
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{ background: "none", border: "none", textAlign: "left", padding: "0.85rem 0.4rem", color: active === item.id ? "var(--gold-ink)" : "var(--fg)", fontSize: "1rem", fontWeight: 500, borderBottom: "1px solid var(--line-soft)", cursor: "pointer" }}
            >
              {L(item.labelEn, item.label)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
