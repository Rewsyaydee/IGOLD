import { Check, Landmark, Mail, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useLang } from "@/igold/lang";
import { useReveal } from "@/igold/useReveal";
import { LANDING_SUPPORT } from "../data";
import { MagneticButton } from "./MagneticButton";

function BankCard() {
  const { L } = useLang();
  const [copied, setCopied] = useState<string | null>(null);
  const bank = LANDING_SUPPORT.bank;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="ld-bank">
      <span className="ld-eyebrow">
        <Landmark size={13} />
        {L(bank.title.en, bank.title.bm)}
      </span>
      <div style={{ marginTop: "0.9rem", position: "relative" }}>
        {bank.rows.map(row => (
          <div className="ld-bank-row" key={row.value}>
            <span className="ld-bank-label">
              {L(row.label.en, row.label.bm)}
            </span>
            <span className="ld-bank-value">
              {row.value}
              <button
                type="button"
                className="ld-copy"
                onClick={() => copy(row.value)}
                aria-label={`${L("Copy", "Salin")} ${row.value}`}
              >
                {copied === row.value
                  ? L(bank.copied.en, bank.copied.bm)
                  : L(bank.copy.en, bank.copy.bm)}
              </button>
            </span>
          </div>
        ))}
      </div>
      <p className="ld-receipt-note">
        {L(bank.receiptNote.en, bank.receiptNote.bm)}
      </p>
    </div>
  );
}

function Contacts() {
  const { L } = useLang();
  const contacts = LANDING_SUPPORT.contacts;
  return (
    <div className="ld-contacts">
      <span className="ld-eyebrow">
        <Mail size={13} />
        {L(contacts.title.en, contacts.title.bm)}
      </span>
      <div style={{ marginTop: "0.9rem" }}>
        {contacts.people.map(person => (
          <div className="ld-contact" key={person.href}>
            <span className="ld-contact-role">
              {L(person.role.en, person.role.bm)}
            </span>
            <span className="ld-contact-name">{person.name}</span>
            <a href={person.href}>{person.detail}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Support() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { selector: ".ld-reveal", stagger: 0.08 });

  return (
    <section id="support" ref={ref} className="ld-section">
      <div className="ld-section-head ld-reveal">
        <span className="ld-eyebrow">
          {L(LANDING_SUPPORT.eyebrow.en, LANDING_SUPPORT.eyebrow.bm)}
        </span>
        <h2 className="ld-section-title">
          {L(LANDING_SUPPORT.heading.en, LANDING_SUPPORT.heading.bm)}
        </h2>
        <p className="ld-section-sub">
          {L(LANDING_SUPPORT.sub.en, LANDING_SUPPORT.sub.bm)}
        </p>
      </div>

      <div className="ld-tiers">
        {LANDING_SUPPORT.tiers.map(tier => (
          <article
            className={`ld-tier ld-reveal ${tier.featured ? "ld-tier--featured" : ""}`}
            key={tier.name.en}
          >
            {tier.featured ? (
              <span className="ld-tier-badge">
                {L("Flagship tier", "Tier utama")}
              </span>
            ) : null}
            <h3 className="ld-tier-name">{L(tier.name.en, tier.name.bm)}</h3>
            <p className="ld-tier-range">{L(tier.range.en, tier.range.bm)}</p>
            <ul className="ld-tier-list">
              {tier.benefits.map(benefit => (
                <li key={benefit.en}>
                  <Check size={14} />
                  <span>{L(benefit.en, benefit.bm)}</span>
                </li>
              ))}
            </ul>
            <div className="ld-tier-cta">
              <MagneticButton
                variant={tier.featured ? "gold" : "dark"}
                href={`mailto:iium.communityengagement@gmail.com?subject=${encodeURIComponent(
                  `IGOLD Sponsorship — ${tier.name.en}`,
                )}`}
                icon={false}
              >
                {L("Sponsor this tier", "Taja tier ini")}
              </MagneticButton>
            </div>
          </article>
        ))}
      </div>

      <p className="ld-tax-note ld-reveal">
        <ShieldCheck
          size={15}
          style={{ verticalAlign: "-2px", marginRight: "0.5rem" }}
        />
        {L(LANDING_SUPPORT.taxNote.en, LANDING_SUPPORT.taxNote.bm)}
      </p>

      <div className="ld-support-grid">
        <div className="ld-reveal">
          <BankCard />
        </div>
        <div className="ld-reveal">
          <Contacts />
        </div>
      </div>
    </section>
  );
}
