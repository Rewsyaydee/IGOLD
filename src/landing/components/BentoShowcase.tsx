import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpenText,
  Compass,
  Droplets,
  HandHeart,
  Languages,
  LayoutGrid,
  ScrollText,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { playAudio, stopAudio } from "@/igold/audio";
import {
  HANAFI_RUKUN,
  JANAZAH_STEPS,
  NIYYAH,
  POSE_VIDEO,
  POSTURES,
  type Pose,
  QUIZ,
  RUKUN,
  STEPS,
  WUDU_STEPS,
} from "@/igold/data";
import { useLang } from "@/igold/lang";
import { useReveal } from "@/igold/useReveal";
import { LANDING_BENTO } from "../data";

function BentoCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      className={`ld-bento-card ld-reveal ${dark ? "ld-bento-card--dark" : ""} ${className}`.trim()}
      onPointerMove={onMove}
      whileHover={reduced ? undefined : { y: -5, scale: 1.011 }}
      transition={{ type: "spring", stiffness: 230, damping: 24 }}
    >
      {children}
    </motion.article>
  );
}

const STUDIO_POSES: Pose[] = [
  "takbir",
  "qiyam",
  "ruku",
  "sujud",
  "tashahhud",
  "salam",
];

function PostureStudio() {
  const { L } = useLang();
  const [index, setIndex] = useState(0);
  const pose = STUDIO_POSES[index];
  const posture = POSTURES.find(p => p.pose === pose);

  useEffect(() => {
    const next = (index + 1) % STUDIO_POSES.length;
    const t = window.setTimeout(() => setIndex(next), 4600);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <BentoCard className="ld-span-4" dark>
      <span className="ld-card-icon">
        <BookOpenText size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("Demonstrated", "Diperagakan")}
      </span>
      <h3 className="ld-card-title">
        {L(LANDING_BENTO.posture.title.en, LANDING_BENTO.posture.title.bm)}
      </h3>
      <p className="ld-card-desc">
        {L(LANDING_BENTO.posture.desc.en, LANDING_BENTO.posture.desc.bm)}
      </p>

      <div className="ld-posture-stage">
        <video
          key={pose}
          src={POSE_VIDEO[pose]}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label={
            posture
              ? L(posture.nameEn, posture.name)
              : L("Prayer posture", "Gerakan solat")
          }
        />
        <div className="ld-posture-meta">
          <span className="ld-posture-name">
            {posture ? L(posture.nameEn, posture.name) : pose}
          </span>
          <span className="ld-posture-count">
            {index + 1}/{STUDIO_POSES.length}
          </span>
        </div>
      </div>

      <div
        className="ld-pose-chips"
        role="tablist"
        aria-label={L("Postures", "Gerakan")}
      >
        {STUDIO_POSES.map((p, i) => {
          const item = POSTURES.find(x => x.pose === p);
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`ld-pose-chip ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
            >
              {item ? L(item.nameEn, item.name) : p}
            </button>
          );
        })}
      </div>
    </BentoCard>
  );
}

const RECITATION_IDS = [
  { stepId: 2, audio: "step-2" },
  { stepId: 3, audio: "step-3" },
  { stepId: 4, audio: "fatihah" },
];

function RecitationLab() {
  const { L } = useLang();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);

  const items = useMemo(
    () =>
      RECITATION_IDS.map(entry => ({
        ...entry,
        step: STEPS.find(s => s.id === entry.stepId),
      })).filter(entry => entry.step),
    [],
  );

  useEffect(() => stopAudio, []);

  const entry = items[selected];
  const step = entry?.step;

  const toggle = () => {
    if (!entry) return;
    if (playing) {
      stopAudio();
      setPlaying(false);
      return;
    }
    playAudio(entry.audio);
    setPlaying(true);
  };

  if (!step) return null;

  return (
    <BentoCard className="ld-span-2">
      <span className="ld-card-icon">
        <Volume2 size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("Listen & repeat", "Dengar & ulang")}
      </span>
      <h3 className="ld-card-title">
        {L(
          LANDING_BENTO.recitation.title.en,
          LANDING_BENTO.recitation.title.bm,
        )}
      </h3>
      <p className="ld-card-desc">
        {L(LANDING_BENTO.recitation.desc.en, LANDING_BENTO.recitation.desc.bm)}
      </p>

      {step.arabic ? (
        <p className="ld-translit-ar" lang="ar">
          {step.arabic}
        </p>
      ) : null}
      {step.transliteration ? (
        <p className="ld-translit">{step.transliteration}</p>
      ) : null}

      <div className="ld-audio-row">
        <button
          type="button"
          className="ld-audio-play"
          onClick={toggle}
          aria-label={L(
            playing ? "Stop recitation" : "Play recitation",
            playing ? "Hentikan bacaan" : "Main bacaan",
          )}
        >
          {playing ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <div
          className={`ld-audio-bars ${playing ? "is-playing" : ""}`}
          aria-hidden="true"
        >
          {Array.from({ length: 22 }, (_, i) => (
            <i key={i} style={{ height: `${18 + ((i * 37) % 64)}%` }} />
          ))}
        </div>
      </div>

      <div className="ld-pose-chips">
        {items.map((item, i) => (
          <button
            key={item.audio}
            type="button"
            className={`ld-pose-chip ${i === selected ? "is-active" : ""}`}
            onClick={() => {
              stopAudio();
              setPlaying(false);
              setSelected(i);
            }}
          >
            {item.step ? L(item.step.nameEn, item.step.name) : ""}
          </button>
        ))}
      </div>
    </BentoCard>
  );
}

function ScheduleCard() {
  const { L } = useLang();
  const schedule = LANDING_BENTO.schedule;
  const prayers = schedule.prayers;
  const activeIndex = useMemo(() => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    let idx = 0;
    prayers.forEach((prayer, i) => {
      const [h, m] = prayer.time.split(":").map(Number);
      if (h * 60 + m <= minutes) idx = i;
    });
    return idx;
  }, [prayers]);

  return (
    <BentoCard className="ld-span-2">
      <span className="ld-card-icon">
        <Compass size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L(schedule.sample.en, schedule.sample.bm)}
      </span>
      <h3 className="ld-card-title">
        {L(schedule.title.en, schedule.title.bm)}
      </h3>

      <div className="ld-schedule">
        {schedule.prayers.map((prayer, i) => (
          <div
            className={`ld-schedule-row ${i === activeIndex ? "is-active" : ""}`}
            key={prayer.time}
          >
            <span>{L(prayer.name.en, prayer.name.bm)}</span>
            <span>{prayer.time}</span>
          </div>
        ))}
      </div>

      <div className="ld-qibla">
        <span className="ld-qibla-dial" aria-hidden="true">
          <span className="ld-qibla-needle" />
        </span>
        <span className="ld-qibla-label">
          <b>{L(schedule.qibla.en, schedule.qibla.bm)}</b>
          {L("Auckland → Makkah", "Auckland → Makkah")}
        </span>
      </div>
    </BentoCard>
  );
}

function MadhhabCard() {
  const { L } = useLang();
  const [school, setSchool] = useState<"shafii" | "hanafi">("shafii");
  const count = school === "shafii" ? RUKUN.length : HANAFI_RUKUN.length;

  return (
    <BentoCard className="ld-span-2">
      <span className="ld-card-icon">
        <LayoutGrid size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("Comparative", "Perbandingan")}
      </span>
      <h3 className="ld-card-title">
        {L(LANDING_BENTO.madhhab.title.en, LANDING_BENTO.madhhab.title.bm)}
      </h3>
      <p className="ld-card-desc">
        {L(LANDING_BENTO.madhhab.desc.en, LANDING_BENTO.madhhab.desc.bm)}
      </p>

      <div className="ld-madhhab-toggle" role="tablist" aria-label="Madhhab">
        <button
          type="button"
          role="tab"
          aria-selected={school === "shafii"}
          className={school === "shafii" ? "is-active" : ""}
          onClick={() => setSchool("shafii")}
        >
          {LANDING_BENTO.madhhab.shafii}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={school === "hanafi"}
          className={school === "hanafi" ? "is-active" : ""}
          onClick={() => setSchool("hanafi")}
        >
          {LANDING_BENTO.madhhab.hanafi}
        </button>
      </div>

      <div className="ld-madhhab-stats">
        <span className="ld-madhhab-stat">
          <b>{count}</b>
          <span>{L("Pillars shown", "Rukun dipaparkan")}</span>
        </span>
        <span className="ld-madhhab-stat">
          <b>{STEPS.length}</b>
          <span>{L("Guided steps", "Langkah berpanduan")}</span>
        </span>
      </div>
    </BentoCard>
  );
}

function ModulesCard() {
  const { L } = useLang();
  const rows = [
    {
      icon: <Droplets size={18} />,
      name: L("Wudu", "Wuduk"),
      count: `${WUDU_STEPS.length} ${L("steps", "langkah")}`,
    },
    {
      icon: <HandHeart size={18} />,
      name: L("Niyyah", "Niat"),
      count: `${NIYYAH.length} ${L("prayers", "solat")}`,
    },
    {
      icon: <ScrollText size={18} />,
      name: L("Janazah", "Jenazah"),
      count: `${JANAZAH_STEPS.length} ${L("steps", "langkah")}`,
    },
  ];

  return (
    <BentoCard className="ld-span-2">
      <span className="ld-card-icon">
        <Sparkles size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("Complete path", "Laluan lengkap")}
      </span>
      <h3 className="ld-card-title">
        {L(LANDING_BENTO.modules.title.en, LANDING_BENTO.modules.title.bm)}
      </h3>
      <p className="ld-card-desc">
        {L(LANDING_BENTO.modules.desc.en, LANDING_BENTO.modules.desc.bm)}
      </p>

      <div className="ld-schedule" style={{ marginTop: "1rem" }}>
        {rows.map(row => (
          <div className="ld-schedule-row" key={row.name}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
              }}
            >
              <span style={{ color: "var(--gold-ink)" }}>{row.icon}</span>
              {row.name}
            </span>
            <span style={{ color: "var(--muted-ink)", fontWeight: 500 }}>
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

function BilingualCard() {
  const { L } = useLang();
  const card = LANDING_BENTO.bilingual;
  return (
    <BentoCard className="ld-span-3" dark>
      <span className="ld-card-icon">
        <Languages size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("EN · BM", "EN · BM")}
      </span>
      <h3 className="ld-card-title">{L(card.title.en, card.title.bm)}</h3>
      <p className="ld-card-desc">{L(card.desc.en, card.desc.bm)}</p>
      <div className="ld-flip-row">
        {card.pairs.map(pair => (
          <span className="ld-flip-pair" key={pair.en}>
            <span>{pair.en}</span>
            <span className="ld-flip-arrow" aria-hidden="true">
              ⇄
            </span>
            <b>{pair.bm}</b>
          </span>
        ))}
      </div>
    </BentoCard>
  );
}

function QuizCard() {
  const { L } = useLang();
  return (
    <BentoCard className="ld-span-3">
      <span className="ld-card-icon">
        <Sparkles size={20} />
      </span>
      <span className="ld-card-kicker" style={{ display: "block" }}>
        {L("Practice", "Latihan")}
      </span>
      <h3 className="ld-card-title">
        {L(LANDING_BENTO.quiz.title.en, LANDING_BENTO.quiz.title.bm)}
      </h3>
      <p className="ld-card-desc">
        {L(LANDING_BENTO.quiz.desc.en, LANDING_BENTO.quiz.desc.bm)}
      </p>
      <div className="ld-quiz-ring" aria-hidden="true">
        <span>{QUIZ.length}</span>
      </div>
    </BentoCard>
  );
}

export function BentoShowcase() {
  const { L } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { selector: ".ld-reveal", stagger: 0.07 });

  return (
    <section id="curriculum" ref={ref} className="ld-section">
      <div className="ld-section-head ld-reveal">
        <span className="ld-eyebrow">
          {L(LANDING_BENTO.eyebrow.en, LANDING_BENTO.eyebrow.bm)}
        </span>
        <h2 className="ld-section-title">
          {L(LANDING_BENTO.heading.en, LANDING_BENTO.heading.bm)}
        </h2>
        <p className="ld-section-sub">
          {L(LANDING_BENTO.sub.en, LANDING_BENTO.sub.bm)}
        </p>
      </div>

      <div className="ld-bento">
        <PostureStudio />
        <RecitationLab />
        <ScheduleCard />
        <MadhhabCard />
        <ModulesCard />
        <BilingualCard />
        <QuizCard />
      </div>
    </section>
  );
}
