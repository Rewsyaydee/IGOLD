import { MEDIA_MODELS, MEDIA_MODEL_LABELS } from "../mediaRegistry";
import { useModel } from "../model";
import { useLang } from "../lang";

export function ModelSelector() {
  const { model, setModel } = useModel();
  const { L } = useLang();

  return (
    <div
      role="group"
      aria-label="Instructional model"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--line)",
        borderRadius: 100,
        padding: 3,
        gap: 2,
        background: "var(--gold-tint-soft)",
        marginLeft: "0.3rem",
        flexWrap: "wrap",
      }}
    >
      {MEDIA_MODELS.map(m => {
        const labels = MEDIA_MODEL_LABELS[m];
        const on = model === m;
        return (
          <button
            key={m}
            onClick={() => setModel(m)}
            aria-pressed={on}
            title={L(labels.en, labels.bm)}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 100,
              padding: "0.32rem 0.7rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontFamily: "var(--font-body)",
              transition: "all 0.3s var(--ease)",
              background: on ? "linear-gradient(120deg, var(--gold-500), var(--gold-600))" : "transparent",
              color: on ? "var(--white)" : "var(--muted)",
            }}
          >
            {L(labels.en, labels.bm)}
          </button>
        );
      })}
    </div>
  );
}
