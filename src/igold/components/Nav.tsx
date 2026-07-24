import { NAV_ITEMS } from "../data";
import { APP_CONFIG } from "../config";
import { useLang } from "../lang";
import { useActiveSection } from "../hooks/useActiveSection";
import { PillNav } from "./PillNav";

export function Nav() {
  const { lang, L, toggle: toggleLang } = useLang();
  const sectionIds = NAV_ITEMS.map(n => n.id);
  const activeHref = useActiveSection(sectionIds);

  const navItems = NAV_ITEMS.map(item => ({
    label: L(item.labelEn, item.label),
    href: item.id,
  }));

  return (
    <header
      className="pill-nav-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s var(--ease)",
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
        activeHref={activeHref}
        onToggleLang={toggleLang}
        onNavigate={id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        baseColor="var(--gold-500)"
        pillColor="var(--cream)"
        pillTextColor="var(--ink)"
        hoveredPillTextColor="var(--ink)"
      />
    </header>
  );
}
