import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { Mail, Send } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { SITE } from "../data";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

export function Contact() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { stagger: 0.1 });
  const submit = useMutation(api.contact.submit);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation before hitting the server
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg(L("Please fill in all fields.", "Sila isi semua ruangan."));
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(form.email.trim())) {
      setStatus("error");
      setErrorMsg(L("Please enter a valid email address.", "Sila masukkan alamat e-mel yang sah."));
      return;
    }

    setStatus("sending");
    setErrorMsg(null);
    try {
      await submit(form);
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : L("Sorry, something went wrong. Please try again.", "Maaf, ada masalah. Sila cuba lagi."),
      );
    }
  };

  const field = (label: string, key: keyof typeof form, type = "text", textarea = false) => (
    <label style={{ display: "block", marginBottom: "1.1rem" }}>
      <span style={{ display: "block", fontSize: "0.82rem", color: "var(--muted)", marginBottom: 6, letterSpacing: "0.04em" }}>{label}</span>
      {textarea ? (
        <textarea
          required
          rows={4}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={inputStyle}
        />
      ) : (
        <input
          required
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          style={inputStyle}
        />
      )}
    </label>
  );

  return (
    <section id="hubungi" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow reveal">{L("Contact", "Hubungi")}</span>
        <h2 className="section-title reveal">{L("Have a Question or Suggestion?", "Ada Soalan atau Cadangan?")}</h2>
        <p className="section-sub reveal">
          {L(
            "Reach out to the IGOLD team. We truly value your feedback to keep improving this platform.",
            "Hubungi pasukan IGOLD. Kami amat menghargai maklum balas anda untuk menambah baik platform ini.",
          )}
        </p>
      </div>

      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", maxWidth: 920 }}>
        <form onSubmit={onSubmit} className="reveal">
          {field(L("Your name", "Nama anda"), "name")}
          {field(L("Email address", "Alamat e-mel"), "email", "email")}
          {field(L("Your message", "Mesej anda"), "message", "text", true)}
          <button type="submit" className="btn btn-gold" disabled={status === "sending"} style={{ width: "100%", justifyContent: "center" }}>
            {status === "sending" ? L("Sending…", "Menghantar…") : <><Send size={16} /> {L("Send Message", "Hantar Mesej")}</>}
          </button>
          {status === "done" && <p style={{ color: "#4ade80", marginTop: "1rem", fontSize: "0.9rem" }}>{L("✓ Thank you! Your message has been sent.", "✓ Terima kasih! Mesej anda telah dihantar.")}</p>}
          {status === "error" && (
            <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.9rem" }}>
              {errorMsg || L("Sorry, something went wrong. Please try again.", "Maaf, ada masalah. Sila cuba lagi.")}
            </p>
          )}
        </form>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.4rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 12, background: "var(--gold-tint)", border: "1px solid var(--line)", flexShrink: 0 }}>
              <Mail size={20} color="var(--gold-500)" />
            </span>
            <div>
              <h3 style={{ margin: "0 0 0.3rem", fontSize: "1.05rem" }}>{L("The IGOLD Team", "Pasukan IGOLD")}</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.92rem" }}>{SITE.brandFull}. {L("An initiative under IIUM.", "Sebuah inisiatif di bawah UIAM (IIUM).")}</p>
            </div>
          </div>
          <div className="card" style={{ background: "var(--gold-tint-soft)" }}>
            <p style={{ margin: 0, color: "var(--body)", fontStyle: "italic", lineHeight: 1.6 }}>
              {L(
                "\"Indeed, prayer has been decreed upon the believers a decree of specified times.\"",
                "\"Sesungguhnya solat itu adalah kewajipan yang ditentukan waktunya ke atas orang-orang yang beriman.\"",
              )}
              <br />
              <span className="gold-text" style={{ fontStyle: "normal", fontSize: "0.85rem" }}>— Surah An-Nisa', 4:103</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface-inset)",
  border: "1px solid var(--line)",
  borderRadius: 12,
  padding: "0.85rem 1rem",
  color: "var(--ink)",
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  outline: "none",
  resize: "vertical",
};
