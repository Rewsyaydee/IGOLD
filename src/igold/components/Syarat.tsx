import { useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  Clock,
  Compass,
  Droplets,
  Maximize2,
  Minimize2,
  MoonStar,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SYARAT } from "../data";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

const ICONS: Record<string, LucideIcon> = {
  "moon-star": MoonStar,
  brain: Brain,
  droplets: Droplets,
  sparkles: Sparkles,
  shirt: Shirt,
  clock: Clock,
  compass: Compass,
  "book-open": BookOpen,
};

export function Syarat() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);
  useReveal(ref, { stagger: 0.07 });

  const toggleAll = () => {
    if (expandAll) {
      setExpandAll(false);
      setOpen(null);
    } else {
      setExpandAll(true);
      setOpen(null);
    }
  };

  return (
    <section id="syarat" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Conditions", "Syarat Sah")}</span>
        <h2 className="section-title reveal">{L("Conditions for a Valid Prayer", "Syarat Sah Solat")}</h2>
        <p className="section-sub reveal">
          {L(
            "Eight conditions must be met before a prayer is considered valid. Hover or tap a card to read more.",
            "Lapan syarat yang perlu dipenuhi sebelum solat dianggap sah. Tuding atau tekan kad untuk baca lanjut.",
          )}
        </p>
        <div className="reveal" style={{ marginTop: "0.8rem" }}>
          <button
            onClick={toggleAll}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1rem",
              fontSize: "0.78rem",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              color: "var(--gold-ink)",
              background: "var(--gold-tint)",
              border: "1px solid var(--line)",
              borderRadius: 100,
              cursor: "pointer",
            }}
          >
            {expandAll ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {expandAll ? L("Collapse all", "Tutup semua") : L("Expand all", "Buka semua")}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {SYARAT.map(s => {
          const Icon = ICONS[s.icon] ?? BookOpen;
          const isOpen = expandAll || open === s.id;
          return (
            <button
              key={s.id}
              className={`hover-card reveal${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              onClick={() => {
                if (expandAll) return;
                setOpen(isOpen ? null : s.id);
              }}
            >
              <span className="hover-card__num display">{String(s.id).padStart(2, "0")}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    flexShrink: 0,
                    background: "var(--gold-tint)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <Icon size={22} color="var(--gold-500)" />
                </span>
                <h3 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 600, lineHeight: 1.3 }}>
                  {L(s.titleEn, s.title)}
                </h3>
              </div>

              <div className="hover-card__detail">
                <div>
                  <p style={{ margin: 0, color: "var(--body)", fontSize: "0.96rem", lineHeight: 1.6 }}>
                    {L(s.descEn, s.desc)}
                  </p>
                </div>
              </div>

              <span className="hover-card__hint">{isOpen ? L("Tap to close", "Tekan untuk tutup") : L("Hover / tap", "Tuding / tekan")}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
