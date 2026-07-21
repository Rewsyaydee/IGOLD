import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

interface PillNavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logoStar: React.ReactNode;
  logoIIUM: string;
  logoIIUMAlt?: string;
  items: PillNavItem[];
  lang: string;
  madhhab: string;
  onToggleLang: () => void;
  onToggleMadhhab: () => void;
  onNavigate: (href: string) => void;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

export function PillNav({
  logoStar,
  logoIIUM,
  logoIIUMAlt = "IIUM",
  items,
  lang,
  madhhab,
  onToggleLang,
  onToggleMadhhab,
  onNavigate,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#f7f2e8",
  pillColor = "#c9a227",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#16223f",
  initialLoadAnimation = true,
}: PillNavProps) {
  const [activeHref, setActiveHref] = useState<string | undefined>(items[0]?.href);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoIIUMRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ids = items.map(n => n.href);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveHref(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label") as HTMLElement | null;
        const white = pill.querySelector(".pill-label-hover") as HTMLElement | null;

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItemsEl = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
      }

      if (navItemsEl) {
        gsap.set(navItemsEl, { width: 0, overflow: "hidden" });
        gsap.to(navItemsEl, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoIIUMRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: "top center",
          },
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }
  };

  const go = (href: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(href);
  };

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: pillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <button
          className="pill-logos"
          aria-label="Scroll to top"
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {logoStar}
          </span>
          <img src={logoIIUM} alt={logoIIUMAlt} className="pill-logo-iium" ref={logoIIUMRef} />
        </button>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <button
                  role="menuitem"
                  className={`pill${activeHref === item.href ? " is-active" : ""}`}
                  aria-label={item.label}
                  onClick={() => go(item.href)}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            <li role="none">
              <button
                role="menuitem"
                className={`pill ${lang === "en" ? "is-toggle-on" : "is-toggle-off"}`}
                aria-label="Toggle language"
                onClick={onToggleLang}
              >
                <span className="label-stack">
                  <span className="pill-label" style={{ zIndex: 2, position: "relative" }}>
                    {lang === "en" ? "EN" : "BM"}
                  </span>
                </span>
              </button>
            </li>
            <li role="none">
              <button
                role="menuitem"
                className={`pill ${madhhab === "shafii" ? "is-toggle-on" : "is-toggle-off"}`}
                aria-label="Toggle madhhab"
                onClick={onToggleMadhhab}
              >
                <span className="label-stack">
                  <span className="pill-label" style={{ zIndex: 2, position: "relative" }}>
                    {madhhab === "shafii" ? "Syafi'e" : "Hanafi"}
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mobile-only">
          <button
            className={`pill ${lang === "en" ? "is-toggle-on" : "is-toggle-off"}`}
            aria-label="Toggle language"
            onClick={onToggleLang}
            style={{ padding: "0 10px", fontSize: "12px", height: "32px" }}
          >
            <span className="label-stack">
              <span className="pill-label" style={{ zIndex: 2, position: "relative" }}>
                {lang === "en" ? "EN" : "BM"}
              </span>
            </span>
          </button>
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            ref={hamburgerRef}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              <button
                className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                onClick={() => go(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-divider" />
        <div className="mobile-toggle-row">
          <button
            className={`mobile-toggle-btn ${lang === "en" ? "on" : "off"}`}
            onClick={onToggleLang}
          >
            EN
          </button>
          <button
            className={`mobile-toggle-btn ${lang === "bm" ? "on" : "off"}`}
            onClick={onToggleLang}
          >
            BM
          </button>
        </div>
        <div className="mobile-toggle-row">
          <button
            className={`mobile-toggle-btn ${madhhab === "shafii" ? "on" : "off"}`}
            onClick={onToggleMadhhab}
          >
            Syafi'e
          </button>
          <button
            className={`mobile-toggle-btn ${madhhab === "hanafi" ? "on" : "off"}`}
            onClick={onToggleMadhhab}
          >
            Hanafi
          </button>
        </div>
      </div>
    </div>
  );
}
