import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../data";
import { APP_CONFIG } from "../config";
import { useLang } from "../lang";
import { useActiveSection } from "../hooks/useActiveSection";
import { PillNav } from "./PillNav";

export function Nav() {
  const { lang, L, toggle: toggleLang } = useLang();
  const navigate = useNavigate();
  const sectionIds = NAV_ITEMS.map(n => n.id);
  const activeHref = useActiveSection(sectionIds);

  const PILL_IDS = ["about", "rukun", "wudu", "kaifiat", "hubungi"];

  const desktopItems = NAV_ITEMS
    .filter(item => PILL_IDS.includes(item.id))
    .map(item => ({
      label: item.id === "kaifiat" ? L("Prayer", "Solat") : L(item.labelEn, item.label),
      href: item.id,
    }));

  const mobileItems = NAV_ITEMS.map(item => ({
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
        logoStar={null}
        logoIIUM={APP_CONFIG.branding.iiumLogo}
        logoIIUMAlt="IIUM"
        items={desktopItems}
        mobileItems={mobileItems}
        lang={lang}
        activeHref={activeHref}
        onToggleLang={toggleLang}
        onNavigate={id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        onHome={() => navigate("/")}
        baseColor="var(--gilded)"
        pillColor="var(--light-veil)"
        pillTextColor="var(--everglade)"
        hoveredPillTextColor="var(--everglade)"
      />
    </header>
  );
}
