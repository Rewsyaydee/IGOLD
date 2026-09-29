export type PaletteToken = {
  cssVar: string;
  hex: string;
  name: string;
  role: string;
  onDark?: boolean;
};

export const CORE_PALETTE: PaletteToken[] = [
  {
    cssVar: "--everglade",
    hex: "#264431",
    name: "Everglade",
    role: "Primary brand · dark bands · footer",
    onDark: true,
  },
  {
    cssVar: "--everglade-deep",
    hex: "#1b3225",
    name: "Everglade Deep",
    role: "Dark gradient anchor",
    onDark: true,
  },
  {
    cssVar: "--up-north",
    hex: "#719687",
    name: "Up North",
    role: "Secondary green accent",
    onDark: true,
  },
  {
    cssVar: "--deep-diving",
    hex: "#5A94A7",
    name: "Deep Diving",
    role: "Blue accent · contact links",
    onDark: true,
  },
  {
    cssVar: "--light-veil",
    hex: "#BED9EB",
    name: "Light Veil",
    role: "Alternate light band",
  },
  {
    cssVar: "--gilded",
    hex: "#EAA043",
    name: "Gilded",
    role: "Accent gold · primary highlight",
  },
  {
    cssVar: "--gold-300",
    hex: "#f2bf76",
    name: "Gold 300",
    role: "Gold text on dark",
  },
  {
    cssVar: "--gold-400",
    hex: "#eead59",
    name: "Gold 400",
    role: "Gold ramp stop",
  },
  {
    cssVar: "--gold-500",
    hex: "#EAA043",
    name: "Gold 500",
    role: "Alias of --gilded",
  },
  {
    cssVar: "--gold-600",
    hex: "#c97923",
    name: "Gold 600",
    role: "Gold gradient end",
  },
  {
    cssVar: "--gold-ink",
    hex: "#98510f",
    name: "Gold Ink",
    role: "Gold text on light (accessible)",
  },
  {
    cssVar: "--cream",
    hex: "#e8f2f7",
    name: "Cream",
    role: "Page background",
  },
  {
    cssVar: "--paper",
    hex: "#f7fbfd",
    name: "Paper",
    role: "Card and surface base",
  },
  {
    cssVar: "--ink",
    hex: "#183226",
    name: "Ink",
    role: "Body text on light",
    onDark: true,
  },
];

export type LegacyColor = {
  hex: string;
  name: string;
  foundIn: string;
};

export const LEGACY_COLORS: LegacyColor[] = [
  {
    hex: "#c9a227",
    name: "Old Gold",
    foundIn: "PillNav.tsx:43 · PillNav.css · LineSidebar.tsx:34",
  },
  {
    hex: "#16223f",
    name: "Old Navy",
    foundIn: "PillNav.tsx:45-46 · LineSidebar.tsx:34-36",
  },
  {
    hex: "#f7f2e8",
    name: "Old Cream",
    foundIn: "PillNav.tsx:44 · PillNav.css:94",
  },
  {
    hex: "#f1e7d2",
    name: "Old Parchment",
    foundIn: "HeroConcept.css:1",
  },
  {
    hex: "#0a1531",
    name: "Old Night",
    foundIn: "HeroConcept.css:1",
  },
  {
    hex: "#d4af37",
    name: "Old Metallic Gold",
    foundIn: "Quiz.tsx:28 · Janazah.tsx:96 · PrayerFigure.tsx:13,123",
  },
  {
    hex: "#4ade80",
    name: "Tailwind Green 400",
    foundIn: "Contact.tsx:95 · Quiz.tsx:92",
  },
  {
    hex: "#f87171",
    name: "Tailwind Red 400",
    foundIn: "Contact.tsx:97 · Quiz.tsx:96",
  },
];

export type SemanticToken = {
  token: string;
  role: string;
};

export const SEMANTIC_LIGHT: SemanticToken[] = [
  { token: "--bg", role: "Band background" },
  { token: "--fg", role: "Primary text" },
  { token: "--body", role: "Body copy" },
  { token: "--muted", role: "Secondary text" },
  { token: "--line", role: "Strong border" },
  { token: "--line-soft", role: "Hairline border" },
  { token: "--surface", role: "Card surface" },
  { token: "--surface-inset", role: "Inset well" },
  { token: "--gold-ink", role: "Gold on light" },
];

export const SEMANTIC_DARK: SemanticToken[] = [
  { token: "--bg", role: "Band background" },
  { token: "--fg", role: "Primary text" },
  { token: "--body", role: "Body copy" },
  { token: "--muted", role: "Secondary text" },
  { token: "--line", role: "Strong border" },
  { token: "--line-soft", role: "Hairline border" },
  { token: "--surface", role: "Card surface" },
  { token: "--surface-inset", role: "Inset well" },
  { token: "--gold-ink", role: "Gold on dark" },
];

export type TypeSpec = {
  label: string;
  className: string;
  live: boolean;
  size: string;
  lineHeight: string;
  tracking: string;
  font: string;
  weight: number;
  sample: string;
  note: string;
};

export const TYPE_SCALE: TypeSpec[] = [
  {
    label: "Display XL",
    className: "display",
    live: true,
    size: "clamp(2.05rem, 8.4vw, 5rem)",
    lineHeight: "1.03",
    tracking: "-0.028em",
    font: "Playfair Display",
    weight: 700,
    sample: "Learn prayer with confidence",
    note: "Hero headline",
  },
  {
    label: "Display LG",
    className: "section-title",
    live: true,
    size: "clamp(2.35rem, 5.8vw, 4.6rem)",
    lineHeight: "0.94",
    tracking: "-0.045em",
    font: "Playfair Display",
    weight: 700,
    sample: "From intention to salam",
    note: "Section heading",
  },
  {
    label: "Display MD",
    className: "ld-display",
    live: false,
    size: "1.32rem",
    lineHeight: "1.2",
    tracking: "-0.02em",
    font: "Playfair Display",
    weight: 700,
    sample: "Card title",
    note: "Cards and panels",
  },
  {
    label: "Lead",
    className: "",
    live: false,
    size: "clamp(1rem, 1.4vw, 1.14rem)",
    lineHeight: "1.75",
    tracking: "0",
    font: "Inter",
    weight: 400,
    sample:
      "An interactive solat guide built with IIUM — bilingual, step by step.",
    note: "Section introductions",
  },
  {
    label: "Body",
    className: "",
    live: false,
    size: "1rem",
    lineHeight: "1.65",
    tracking: "0",
    font: "Inter",
    weight: 400,
    sample:
      "All content keeps a calm reading rhythm with generous line height.",
    note: "Default paragraph",
  },
  {
    label: "Small",
    className: "",
    live: false,
    size: "0.86rem",
    lineHeight: "1.6",
    tracking: "0",
    font: "Inter",
    weight: 400,
    sample: "Supporting detail, metadata and list items.",
    note: "Secondary copy",
  },
  {
    label: "Caption",
    className: "",
    live: false,
    size: "0.78rem",
    lineHeight: "1.5",
    tracking: "0",
    font: "Inter",
    weight: 400,
    sample: "Footnotes, disclaimers and legal notes.",
    note: "Tertiary copy",
  },
  {
    label: "Eyebrow",
    className: "eyebrow",
    live: true,
    size: "0.72rem",
    lineHeight: "1.4",
    tracking: "0.32em",
    font: "Inter",
    weight: 700,
    sample: "NOOR · Sacred Atlas",
    note: "Uppercase section kicker",
  },
  {
    label: "Arabic",
    className: "arabic",
    live: true,
    size: "1.5rem",
    lineHeight: "2.1",
    tracking: "0",
    font: "Amiri",
    weight: 400,
    sample: "مرحبًا بكم في نور",
    note: "RTL script · Amiri, Scheherazade fallback",
  },
];

export type RadiusSpec = {
  value: string;
  usage: string;
  canonical: boolean;
};

export const RADII: RadiusSpec[] = [
  {
    value: "14px",
    usage: "Thumbnails · inputs · small chips",
    canonical: true,
  },
  { value: "18px", usage: "Standard card", canonical: true },
  { value: "24px", usage: "Feature card · tier · panel", canonical: true },
  { value: "32px", usage: "Finale / hero panel", canonical: true },
  { value: "999px", usage: "Every pill, button and chip", canonical: true },
];

export const RADIUS_DRIFT =
  "Currently rendered in code: 10 · 12 · 13 · 16 · 20 · 22 · 27px, plus pill values 100px, 999px and 9999px.";

export type ShadowSpec = {
  token: string;
  value: string;
  usage: string;
  gold?: boolean;
};

export const ELEVATION: ShadowSpec[] = [
  {
    token: "--shadow-sm",
    value: "0 8px 24px -16px rgba(38, 68, 49, 0.35)",
    usage: "Resting card",
  },
  {
    token: "--shadow-md",
    value: "0 24px 60px -30px rgba(38, 68, 49, 0.46)",
    usage: "Hover and elevated surfaces",
  },
  {
    token: "hover lift",
    value: "0 30px 70px -36px rgba(20, 46, 34, 0.65)",
    usage: "Card hover state",
  },
  {
    token: "--shadow-gold",
    value: "0 24px 60px -24px rgba(234, 160, 67, 0.55)",
    usage: "Gold CTA glow",
    gold: true,
  },
];

export type MotionSpec = {
  token: string;
  value: string;
  usage: string;
};

export const MOTION: MotionSpec[] = [
  {
    token: "--ease",
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    usage: "Universal easing for every transition",
  },
  {
    token: "Reveal",
    value: "translateY(26–28px) → 0 · 0.75–1s",
    usage: "Scroll-in content",
  },
  {
    token: "Hover lift",
    value: "translateY(-4px) · 0.4–0.5s",
    usage: "Cards and interactive surfaces",
  },
  {
    token: "Press",
    value: "scale(0.975)",
    usage: "Buttons and links on tap",
  },
  {
    token: "Focus",
    value: "3px solid var(--gilded) · offset 4px",
    usage: "Keyboard focus ring",
  },
];

export type ConflictStatus = "legacy" | "drift" | "dead" | "fragmented";

export type Conflict = {
  title: string;
  status: ConflictStatus;
  detail: string;
  fix: string;
  refs: string[];
};

export const CONFLICTS: Conflict[] = [
  {
    title: "Legacy navy and gold palette still live",
    status: "legacy",
    detail:
      "Pre-NOOR values survive as defaults and fallbacks: #c9a227, #16223f, #f7f2e8, plus navy rgba overlays in Kaifiat and Wudu.",
    fix: "Replace with var(--gilded), var(--everglade) and gold-tinted rgba; drop stale defaults.",
    refs: [
      "PillNav.tsx:43-46",
      "PillNav.css:48,117,188",
      "LineSidebar.tsx:34-36",
      "LineSidebar.css:2-4",
      "Kaifiat.tsx:184-206",
      "Wudu.tsx:101-124",
    ],
  },
  {
    title: "Old metallic gold in motion and glow",
    status: "legacy",
    detail:
      "Quiz pass flash, Janazah play glow and PrayerFigure mat use rgba(212, 175, 55, ·) — a different gold from --gilded.",
    fix: "Use rgba(234, 160, 67, ·) through --gold-tint and --gold-tint-soft.",
    refs: ["Quiz.tsx:28", "Janazah.tsx:96", "PrayerFigure.tsx:13,123"],
  },
  {
    title: "Three success and error color schemes",
    status: "fragmented",
    detail:
      "Contact and Quiz each invent feedback colors: #4ade80 / #f87171 versus rgba(80,200,120) / rgba(240,90,90). No tokens exist.",
    fix: "Add --success and --danger plus tints to the token layer, then consume them everywhere.",
    refs: ["Contact.tsx:95-97", "Quiz.tsx:90-96"],
  },
  {
    title: "Two duplicate token sets with drifted values",
    status: "drift",
    detail:
      "igold.css :root and landing.css .igold-landing redefine the same palette. Shadows, line colors and max width diverge (1200 vs 1240).",
    fix: "Keep one canonical token block; landing declares only its deltas.",
    refs: ["igold.css:8-52", "landing.css:9-55"],
  },
  {
    title: "Radius drift across equivalent surfaces",
    status: "drift",
    detail:
      "Cards render at 16/18/20/22/24px and pills at 100px/999px/9999px depending on the component.",
    fix: "Adopt the radius scale in section 05 and migrate components onto it.",
    refs: [
      "igold.css:213,237,343",
      "Quiz.tsx:68",
      "Janazah.tsx:48",
      "Kaifiat.tsx:177",
    ],
  },
  {
    title: "Two button systems with different gold text",
    status: "drift",
    detail:
      ".btn-gold uses everglade text on a gold-500→600 gradient; .ld-btn--gold uses #2a1a06 on gold-300→gilded→gold-600. Focus rings also differ.",
    fix: "Unify on one gold ramp, text color and focus ring; keep size variants only.",
    refs: ["igold.css:456", "landing.css:471-474", "landing.css:503-506"],
  },
  {
    title: "Glass declared but never applied",
    status: "dead",
    detail:
      "igold.css targets .condition-card, .rukun-card, .quiz-card and friends with backdrop blur, but no component uses those class names — real cards stay solid.",
    fix: "Apply glass to the intended surfaces or delete the rule.",
    refs: ["igold.css:449-450"],
  },
  {
    title: "Tailwind layer and dark mode leak into NOOR",
    status: "drift",
    detail:
      "Global body bg-background, an always-on ThemeProvider (.dark from OS) and Tailwind-styled Toaster and ErrorBoundary render oklch tokens on public NOOR routes.",
    fix: "Scope the Tailwind base or opt NOOR routes out of the dark theme and token overrides.",
    refs: ["index.css:143-161", "ThemeContext.tsx:43-54", "App.tsx:23"],
  },
  {
    title: "Typography bypasses",
    status: "drift",
    detail:
      "PillNav.css and LineSidebar.css hardcode Inter instead of var(--font-body); PillNav switches to px type (12px, 32px height).",
    fix: "Reference --font-body and rem sizes; add a --font-mono token if the sidebar index needs one.",
    refs: [
      "PillNav.css:109,253,290",
      "LineSidebar.css:54,59",
      "PillNav.tsx:320",
    ],
  },
  {
    title: "Duplicated interaction patterns",
    status: "fragmented",
    detail:
      "The toast block is duplicated 4×, the madhhab/model toggle 4–5× with padding drift, audio buttons have 3 variants and step dots repeat in Kaifiat and Wudu.",
    fix: "Extract Toast, SegmentedPills, AudioButton and StepDots primitives.",
    refs: [
      "Bacaan.tsx:62",
      "Niyyah.tsx:92",
      "Kaifiat.tsx:255",
      "Wudu.tsx:173",
      "Rukun.tsx:46-61",
    ],
  },
  {
    title: "Container and rhythm drift",
    status: "drift",
    detail:
      "igold uses maxw 1200 and 10vw section padding; landing uses 1240 and 9vw. Footers diverge, and landing drops the Scheherazade New fallback.",
    fix: "Pick one content width and section rhythm; align font stacks.",
    refs: [
      "igold.css:50,115",
      "landing.css:42,128",
      "igold.css:6",
      "landing.css:7",
    ],
  },
  {
    title: "DotField is fully off-system and unused",
    status: "dead",
    detail:
      "DotField and DotField.css use a purple palette (#120F17, rgba(168,85,247)) and are imported nowhere.",
    fix: "Delete, or restyle onto NOOR tokens before use.",
    refs: ["DotField.tsx:31-33", "DotField.css"],
  },
];

export const DLS_SECTIONS = [
  { id: "principles", num: "01", label: "Principles" },
  { id: "color", num: "02", label: "Color" },
  { id: "typography", num: "03", label: "Typography" },
  { id: "layout", num: "04", label: "Layout & Spacing" },
  { id: "radii", num: "05", label: "Radii & Elevation" },
  { id: "components", num: "06", label: "Components" },
  { id: "motion", num: "07", label: "Motion" },
  { id: "conflicts", num: "08", label: "Conflict Register" },
  { id: "version", num: "09", label: "Version" },
] as const;
