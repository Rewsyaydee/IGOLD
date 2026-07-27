import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Check, RotateCcw, X } from "lucide-react";
import { QUIZ } from "../data";
import { useReveal } from "../useReveal";
import { useLang } from "../lang";

export function Quiz() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useReveal(ref, { stagger: 0.1, selector: ".q-reveal" });

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];

  const choose = (opt: number) => {
    if (picked !== null) return;
    setPicked(opt);
    const correct = opt === q.answer;
    if (correct) {
      setScore(s => s + 1);
      gsap.fromTo(cardRef.current, { boxShadow: "0 0 0 0 rgba(212,175,55,0)" }, { boxShadow: "0 0 0 3px rgba(212,175,55,0.5)", duration: 0.4, yoyo: true, repeat: 1 });
    } else {
      gsap.fromTo(cardRef.current, { x: 0 }, { x: 8, duration: 0.07, repeat: 5, yoyo: true, ease: "power1.inOut", clearProps: "x" });
    }
  };

  const next = () => {
    if (idx + 1 >= QUIZ.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const pct = Math.round((score / QUIZ.length) * 100);
  const verdict =
    pct >= 80
      ? L("Excellent! 🌟", "Cemerlang! 🌟")
      : pct >= 50
        ? L("Good, keep learning! 💪", "Bagus, teruskan belajar! 💪")
        : L("Let's revise again 📖", "Jom ulang kaji semula 📖");

  return (
    <section id="kuiz" ref={ref} className="section">
      <div className="section-head">
        <span className="eyebrow q-reveal">{L("Quiz", "Kuiz")}</span>
        <h2 className="section-title q-reveal">{L("Test Your Understanding", "Uji Kefahaman Anda")}</h2>
        <p className="section-sub q-reveal">{L("Ten short questions to test what you have learned.", "Sepuluh soalan ringkas untuk menguji apa yang anda telah pelajari.")}</p>
      </div>

      <div ref={cardRef} className="q-reveal" style={{ maxWidth: 720, margin: "0 auto", background: "var(--surface)", border: "1px solid var(--line-soft)", borderRadius: 22, boxShadow: "var(--shadow-md)", padding: "clamp(1.5rem, 4vw, 2.6rem)" }}>
        {!done ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.4rem" }}>
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{L("Question", "Soalan")} {idx + 1} / {QUIZ.length}</span>
              <span className="gold-text" style={{ fontWeight: 600 }}>{L("Score", "Skor")}: {score}</span>
            </div>
            <div style={{ height: 4, background: "var(--surface-inset)", borderRadius: 100, overflow: "hidden", marginBottom: "1.8rem" }}>
              <div style={{ height: "100%", width: `${((idx + (picked !== null ? 1 : 0)) / QUIZ.length) * 100}%`, background: "linear-gradient(90deg, var(--gold-600), var(--gold-400))", transition: "width 0.4s var(--ease)" }} />
            </div>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 600, lineHeight: 1.4, margin: "0 0 1.4rem" }}>{L(q.qEn, q.q)}</h3>

            <div style={{ display: "grid", gap: "0.7rem" }}>
              {L(q.optionsEn, q.options).map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const isPicked = picked === oi;
                let bg = "var(--surface-inset)";
                let border = "var(--line-soft)";
                let icon = null;
                if (picked !== null) {
                  if (isCorrect) {
                    bg = "rgba(80,200,120,0.12)";
                    border = "rgba(80,200,120,0.5)";
                    icon = <Check size={18} color="#4ade80" />;
                  } else if (isPicked) {
                    bg = "rgba(240,90,90,0.12)";
                    border = "rgba(240,90,90,0.5)";
                    icon = <X size={18} color="#f87171" />;
                  }
                }
                return (
                  <button
                    key={oi}
                    onClick={() => choose(oi)}
                    disabled={picked !== null}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", textAlign: "left", padding: "1rem 1.2rem", borderRadius: 12, border: `1px solid ${border}`, background: bg, color: "var(--fg)", cursor: picked === null ? "pointer" : "default", fontSize: "1rem", fontFamily: "var(--font-body)", transition: "all 0.3s var(--ease)" }}
                  >
                    <span>{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div style={{ marginTop: "1.4rem" }}>
                <p style={{ background: "var(--gold-tint-soft)", border: "1px solid var(--line)", borderRadius: 12, padding: "0.9rem 1.1rem", margin: "0 0 1.2rem", color: "var(--body)", fontSize: "0.92rem" }}>
                  💡 {L(q.explainEn, q.explain)}
                </p>
                <button className="btn btn-gold" onClick={next} style={{ width: "100%", justifyContent: "center" }}>
                  {idx + 1 >= QUIZ.length ? L("See Results", "Lihat Keputusan") : L("Next Question →", "Soalan Seterusnya →")}
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div className="display gold-gradient" style={{ fontSize: "4.5rem", lineHeight: 1 }}>{pct}%</div>
            <p style={{ fontSize: "1.3rem", fontWeight: 600, margin: "0.8rem 0 0.3rem" }}>{verdict}</p>
            <p style={{ color: "var(--muted)", margin: "0 0 2rem" }}>
              {L(`You answered ${score} out of ${QUIZ.length} questions correctly.`, `Anda menjawab ${score} daripada ${QUIZ.length} soalan dengan betul.`)}
            </p>
            <button className="btn btn-ghost" onClick={restart} style={{ justifyContent: "center" }}>
              <RotateCcw size={16} /> {L("Try Again", "Cuba Lagi")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
