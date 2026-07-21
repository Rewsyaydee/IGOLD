# AGENTS.md — IGOLD Project Conventions

## Overview

IGOLD (International Global Outreach & Leadership Programme) is an interactive Islamic prayer (solat) learning web application built with React + TypeScript + Vite. It supports Shafi'i and Hanafi madhhabs, multiple instructional models (default, adult woman, boy, girl), and bilingual content (English / Bahasa Melayu).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 |
| CSS | Tailwind CSS 4 + custom NOOR design system (`igold.css`) |
| UI Kit | shadcn/ui (Radix primitives) |
| Animations | GSAP + ScrollTrigger |
| Backend | Convex (contact form, auth) |
| Package Manager | Bun |
| Linting | Biome |

## Project Structure

```
src/
├── igold/                  # Core prayer guide app (the main product)
│   ├── IgoldSite.tsx       # Root component — renders all sections in order
│   ├── data.ts             # ALL content data (single source of truth)
│   ├── config.ts           # App config: branding, dev credits, feature flags
│   ├── lang.tsx            # Language context (EN / BM)
│   ├── madhhab.tsx         # Madhhab context (Shafi'i / Hanafi)
│   ├── model.tsx           # Instructional model context (default / woman / boy / girl)
│   ├── mediaRegistry.ts    # Media path resolution
│   ├── audio.ts            # Audio playback (Howler.js + Web Audio API fallback)
│   ├── igold.css           # NOOR design system (custom CSS, NOT Tailwind)
│   ├── useReveal.ts        # Scroll-triggered GSAP reveal animations
│   └── components/         # All UI components for the prayer guide
├── components/             # App-level components (layout, auth, shadcn/ui)
├── pages/                  # App pages (dashboard, landing, login, etc.)
```

## How to Add a New Content Module

1. Add the data array to `src/igold/data.ts` (follow the existing pattern).
2. Create a component in `src/igold/components/` (follow existing patterns like `Niyyah.tsx`).
3. Add the component to `src/igold/IgoldSite.tsx` in the desired position.
4. Add the nav entry to `NAV_ITEMS` in `data.ts`.
5. If the module has audio, add keys to `AUDIO_URLS` in `audio.ts`.
6. Create a feature flag in `src/igold/config.ts` if it should be toggleable.

## How to Add a New Madhhab

1. Add the madhhab to the `Madhhab` type in `src/igold/madhhab.tsx`.
2. Create madhhab-specific data arrays in `data.ts` (e.g., `MALIKI_RUKUN`, `MALIKI_STEPS`).
3. Update all components that use madhhab-specific data (Rukun, Kaifiat, PostureExplorer).
4. Add the madhhab option to `MadhhabSelector` in `Nav.tsx`.

## How to Add a New Media Model

1. Add the model to `MEDIA_MODELS` and `MEDIA_MODEL_LABELS` in `src/igold/mediaRegistry.ts`.
2. Create the directory structure under `public/media/<model>/` (kaifiat, wudu, janazah).
3. Place the required video files (see each folder's README).
4. The app will automatically pick it up via the model selector.

## Content Architecture

All text content lives in `src/igold/data.ts`. Every string has both English (`En` suffix) and Bahasa Melayu versions. Components use the `L(enValue, bmValue)` helper from `useLang()` to render the correct language.

**Do NOT hardcode religious text in components.** Always add it to `data.ts`.

## Media Conventions

- Videos: MP4, portrait 9:16, muted, 3–6 s looping, < 2 MB
- Audio: MP3, 128 kbps+
- Logos: SVG preferred

## Code Style

- No comments unless genuinely necessary for clarity.
- Use inline styles for component-specific styling (NOOR design system).
- Tailwind classes for shadcn/ui components only.
- Follow existing component patterns exactly.
- Run `bun run typecheck` and `bun run lint` before committing.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Production build
bun run typecheck    # Type check
bun run lint         # Biome lint
```
