import { NAV_ITEMS, SITE } from "../data";
import { useLang } from "../lang";

export function Footer() {
  const { L } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 5vw, 3rem)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <svg width="30" height="30" viewBox="0 0 100 100">
                <polygon points="50,8 60,38 92,38 66,57 76,90 50,70 24,90 34,57 8,38 40,38" fill="none" stroke="var(--gold-500)" strokeWidth="4" />
              </svg>
              <span className="display gold-text" style={{ fontSize: "1.3rem", letterSpacing: "0.14em" }}>{SITE.brand}</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              {SITE.brandFull}. {SITE.org}.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginTop: "1rem", lineHeight: 1.6, opacity: 0.7 }}>
              {L(
                "Religious content follows the Shafi'i school. Please refer to a qualified ustaz / the IGOLD academic team for verification.",
                "Kandungan agama mengikut mazhab Syafie. Sila rujuk ustaz / pasukan akademik IGOLD untuk pengesahan.",
              )}
            </p>
          </div>

          <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2.5rem" }}>
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", textAlign: "left", padding: "0.3rem 0", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>
                {L(n.labelEn, n.label)}
              </button>
            ))}
          </nav>
        </div>

        <div className="geo-rule" style={{ margin: "2.5rem 0 1.5rem" }}>
          <svg width="22" height="22" viewBox="0 0 100 100"><polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="var(--gold-600)" strokeWidth="5" /></svg>
        </div>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>
          © {new Date().getFullYear()} {SITE.brand} · IIUM. {L("Built with love for the ummah.", "Dibina dengan penuh kasih untuk ummah.")} 🤲
        </p>
      </div>
    </footer>
  );
}
