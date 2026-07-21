import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data";
import { APP_CONFIG } from "../config";
import { useLang } from "../lang";
import { useMadhhab } from "../madhhab";
import { PillNav } from "./PillNav";

export function Nav() {
  const { lang, L, toggle: toggleLang } = useLang();
  const { madhhab, setMadhhab } = useMadhhab();
  const [scrolled, setScrolled] = useState(false);

  const toggleMadhhab = () => setMadhhab(madhhab === "shafii" ? "hanafi" : "shafii");

  const navItems = NAV_ITEMS.map(item => ({
    label: L(item.labelEn, item.label),
    href: item.id,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <PillNav
        logoStar={
          <svg width="26" height="26" viewBox="0 0 100 100">
            <polygon points="50,8 60,38 92,38 66,57 76,90 50,70 24,90 34,57 8,38 40,38" fill="none" stroke="var(--gold-500)" strokeWidth="4" />
          </svg>
        }
        logoIIUM={APP_CONFIG.branding.iiumLogo}
        logoIIUMAlt="IIUM"
        items={navItems}
        lang={lang}
        madhhab={madhhab}
        onToggleLang={toggleLang}
        onToggleMadhhab={toggleMadhhab}
        onNavigate={id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        baseColor="var(--cream)"
        pillColor="var(--gold-500)"
        pillTextColor="var(--ink)"
        hoveredPillTextColor="var(--white)"
      />
    </header>
  );
}
