import type { Pose } from "../data";

/**
 * Minimalist line-art prayer figures. Each pose is hand-drawn as an elegant
 * gold silhouette on a prayer mat. Intentionally abstract & respectful.
 */

const STROKE = "var(--gold-500)";

function Mat() {
  return (
    <g opacity="0.55">
      <ellipse cx="100" cy="186" rx="74" ry="9" fill="rgba(212,175,55,0.10)" />
      <line x1="30" y1="186" x2="170" y2="186" stroke={STROKE} strokeWidth="1.2" opacity="0.5" />
    </g>
  );
}

function poseContent(pose: Pose) {
  const s = { fill: "none", stroke: STROKE, strokeWidth: 3.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (pose) {
    case "stand":
      return (
        <g {...s}>
          <circle cx="100" cy="46" r="13" />
          <path d="M100 59 V128" />
          <path d="M100 78 C86 92 84 104 88 120 M100 78 C114 92 116 104 112 120" />
          <path d="M100 128 L88 186 M100 128 L112 186" />
        </g>
      );
    case "takbir":
      return (
        <g {...s}>
          <circle cx="100" cy="50" r="13" />
          <path d="M100 63 V130" />
          <path d="M100 76 C84 70 74 60 70 48 M100 76 C116 70 126 60 130 48" />
          <path d="M100 130 L88 186 M100 130 L112 186" />
        </g>
      );
    case "qiyam":
      return (
        <g {...s}>
          <circle cx="100" cy="48" r="13" />
          <path d="M100 61 V128" />
          <path d="M100 80 C90 96 92 110 100 118 M100 80 C110 96 108 110 100 118" />
          <path d="M100 128 L88 186 M100 128 L112 186" />
        </g>
      );
    case "ruku":
      return (
        <g {...s}>
          <circle cx="52" cy="86" r="13" />
          <path d="M64 90 L150 104" />
          <path d="M150 104 L150 168" />
          <path d="M150 104 L160 168" />
          <path d="M96 96 L104 150 M150 104 L150 150" />
        </g>
      );
    case "itidal":
      return (
        <g {...s}>
          <circle cx="100" cy="48" r="13" />
          <path d="M100 61 V128" />
          <path d="M100 80 C90 96 92 110 100 118 M100 80 C110 96 108 110 100 118" />
          <path d="M100 128 L88 186 M100 128 L112 186" />
        </g>
      );
    case "sujud":
      return (
        <g {...s}>
          <circle cx="44" cy="150" r="13" />
          <path d="M56 152 C90 150 120 150 150 168" />
          <path d="M150 168 L150 130 M150 168 L168 168" />
          <path d="M64 160 L60 184 M120 156 L120 184" />
        </g>
      );
    case "duduk":
      return (
        <g {...s}>
          <circle cx="100" cy="74" r="13" />
          <path d="M100 87 V138" />
          <path d="M100 100 C88 112 86 124 90 134 M100 100 C112 112 114 124 110 134" />
          <path d="M100 138 C78 150 64 158 60 168 M100 138 C122 150 136 158 140 168" />
        </g>
      );
    case "tashahhud":
      return (
        <g {...s}>
          <circle cx="100" cy="72" r="13" />
          <path d="M100 85 V136" />
          <path d="M100 98 C90 110 92 122 100 130 M100 98 C112 110 118 118 128 116" />
          <path d="M100 136 C78 148 64 158 60 168 M100 136 C122 148 136 156 140 168" />
          <circle cx="130" cy="115" r="2.4" fill={STROKE} />
        </g>
      );
    case "salam":
      return (
        <g {...s}>
          <circle cx="118" cy="74" r="13" />
          <path d="M100 87 V138" transform="translate(18 0)" />
          <path d="M118 100 C106 112 104 124 108 134 M118 100 C130 112 132 124 128 134" />
          <path d="M118 138 C96 150 82 158 78 168 M118 138 C140 150 154 158 158 168" />
          <path d="M150 70 L168 66" opacity="0.7" />
        </g>
      );
    default:
      return null;
  }
}

export function PrayerFigure({ pose }: { pose: Pose }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      role="img"
      aria-label={`Prayer position: ${pose}`}
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(212,175,55,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill="url(#glow)" />
      <Mat />
      {poseContent(pose)}
    </svg>
  );
}
