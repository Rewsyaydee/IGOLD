import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/igold/lang";
import { LANDING_NAV, LANDING_SITE } from "../data";
import { useLaunchTransition } from "../hooks/useLaunchTransition";
import { MagneticButton } from "./MagneticButton";

export function GlassNav() {
  const { L, lang, toggle } = useLang();
  const { launch } = useLaunchTransition();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(
      () => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      open ? 320 : 0,
    );
  };

  return (
    <>
      <header
        className={`ld-nav ${scrolled ? "ld-nav--glass ld-nav-light" : "ld-nav--top"}`}
      >
        <div className="ld-nav-inner">
          <a
            className="ld-brand"
            href="/"
            aria-label={`${LANDING_SITE.brand} home`}
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              className="ld-brand-logo"
              src={
                scrolled
                  ? "/branding/igold-logo.png"
                  : "/branding/igold-logo-light.png"
              }
              alt="iGOLD"
              width={102}
              height={84}
            />
            <span className="ld-brand-divider" aria-hidden="true" />
            <img
              className="ld-brand-iium"
              src="/branding/iium-logo.png"
              alt="IIUM"
              width={34}
              height={34}
            />
          </a>

          <nav className="ld-nav-links" aria-label="Primary">
            {LANDING_NAV.map(item => (
              <button
                key={item.id}
                type="button"
                className="ld-nav-link"
                onClick={() => go(item.id)}
              >
                {L(item.label.en, item.label.bm)}
              </button>
            ))}
          </nav>

          <div className="ld-nav-actions">
            <button
              type="button"
              className="ld-lang"
              onClick={toggle}
              aria-label={L("Tukar ke Bahasa Melayu", "Switch to English")}
            >
              {lang === "en" ? "BM" : "EN"}
            </button>
            <MagneticButton variant="gold" onClick={() => launch()}>
              {L("Launch App", "Buka Aplikasi")}
            </MagneticButton>
          </div>

          <button
            type="button"
            className="ld-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        className={`ld-mobile-sheet ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        {LANDING_NAV.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="ld-mobile-link"
            tabIndex={open ? 0 : -1}
            onClick={() => go(item.id)}
          >
            <small>0{i + 1}</small>
            {L(item.label.en, item.label.bm)}
          </button>
        ))}
        <div className="ld-mobile-foot">
          <button
            type="button"
            className="ld-lang"
            style={{ width: "fit-content" }}
            onClick={toggle}
            tabIndex={open ? 0 : -1}
          >
            {lang === "en" ? "BM" : "EN"}
          </button>
          <MagneticButton
            variant="gold"
            onClick={() => {
              setOpen(false);
              launch();
            }}
          >
            {L("Launch App", "Buka Aplikasi")}
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
