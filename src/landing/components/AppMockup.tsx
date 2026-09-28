import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { playAudio, stopAudio } from "@/igold/audio";
import { POSE_VIDEO, STEPS, type Step } from "@/igold/data";
import { useLang } from "@/igold/lang";

const STEP_IDS = [2, 3, 6, 8, 11, 13];
const ROTATE_MS = 5200;

export function AppMockup() {
  const { L, lang } = useLang();
  const steps = useMemo(
    () =>
      STEP_IDS.map(id => STEPS.find(s => s.id === id)).filter((s): s is Step =>
        Boolean(s),
      ),
    [],
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const step = steps[index];
  const pose = step.pose;

  useEffect(() => {
    if (paused) return;
    const next = (index + 1) % steps.length;
    const t = window.setTimeout(() => setIndex(next), ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, paused, steps.length]);

  useEffect(() => {
    stopAudio();
    setPlaying(false);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    video.dataset.step = String(index);
    const io = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  const toggleAudio = () => {
    if (!step || playing) {
      stopAudio();
      setPlaying(false);
      return;
    }
    playAudio(`step-${step.id}`);
    setPlaying(true);
  };

  if (!step) return null;

  return (
    <div className="ld-app">
      <div className="ld-app-bar">
        <div className="ld-app-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="ld-app-url">
          igoldiium.my/learn · {L("How to Pray", "Cara Solat")}
        </div>
        <span className="ld-app-live">
          <i />
          Live
        </span>
      </div>

      <div className="ld-app-body">
        <div className="ld-app-stage" ref={stageRef}>
          <video
            key={pose}
            ref={videoRef}
            src={POSE_VIDEO[pose]}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-label={L(step.nameEn, step.name)}
          />
          <span className="ld-app-stage-badge">
            <i />
            {L(step.nameEn, step.name)}
          </span>
          <button
            type="button"
            className="ld-app-audio"
            onClick={toggleAudio}
            aria-label={L(
              playing ? "Stop recitation" : "Play recitation",
              playing ? "Hentikan bacaan" : "Main bacaan",
            )}
          >
            {playing ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        <div className="ld-app-panel">
          <div className="ld-app-progress">
            <span className="ld-app-progress-label">
              {L("Step", "Langkah")} {step.id}/13
            </span>
            <div className="ld-app-progress-track">
              <div
                className="ld-app-progress-fill"
                style={{ width: `${(step.id / 13) * 100}%` }}
              />
            </div>
          </div>

          <div className="ld-app-card">
            <p className="ld-app-step">
              {L("Step", "Langkah")} {step.id}
            </p>
            <h3 className="ld-app-name">{L(step.nameEn, step.name)}</h3>
            {step.arabic ? (
              <p className="ld-app-arabic" lang="ar">
                {step.arabic}
              </p>
            ) : null}
            {step.transliteration ? (
              <p className="ld-app-translit">{step.transliteration}</p>
            ) : null}
            <p className="ld-app-meaning">{L(step.meaningEn, step.meaning)}</p>
          </div>

          <div
            className="ld-app-tabs"
            role="tablist"
            aria-label={L("Prayer steps", "Langkah solat")}
          >
            {steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`ld-app-tab ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              >
                {s.id}
              </button>
            ))}
            <button
              type="button"
              className="ld-app-tab"
              onClick={() => setPaused(p => !p)}
              aria-label={L(
                paused ? "Resume auto-play" : "Pause auto-play",
                paused ? "Sambung main automatik" : "Hentikan main automatik",
              )}
              style={{ marginLeft: "auto" }}
            >
              {paused ? "▶" : "❚❚"}
            </button>
          </div>
          <p
            style={{
              margin: "0.2rem 0 0",
              fontSize: "0.64rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--cream-muted)",
            }}
          >
            {L("Shafi'i ·", "Syafi'i ·")}{" "}
            {lang === "en" ? "English" : "Bahasa Melayu"}
          </p>
        </div>
      </div>
    </div>
  );
}
