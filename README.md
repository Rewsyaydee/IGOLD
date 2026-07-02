# IGOLD · Interactive Solat Guide

An interactive, bilingual (English / Bahasa Melayu) web platform that teaches Muslims — from age 7 and up — how to perform the daily prayer (solat) correctly, with confidence and meaning.

Built as an initiative under **IGOLD** (International Global Outreach & Leadership Programme) at the International Islamic University Malaysia (IIUM), for audiences in **Malaysia and New Zealand**.

> ⚠️ **Work in progress — pending academic review.**
> All religious content follows the **Shafi'i (Syafie) school** and is currently **pending verification by a qualified ustaz / the IGOLD academic team** before public release. Some recitation audio is a placeholder sample tone and will be replaced with real recordings.

## Features

- **EN ⇄ BM language toggle** across the whole site
- **Conditions (Syarat)** and **13 Pillars (Rukun)** — interactive hover/tap reveal cards
- **How to Pray (Kaifiat)** — step-by-step guide with posture videos, Arabic, transliteration, meaning, and audio
- **Posture Explorer** — browse each prayer posture up close with plain-language body-alignment notes (lazy-loaded)
- **Recitations (Bacaan)** — quick reference for the key prayer recitations
- **Quiz** — 10 questions to test understanding
- **Contact** form for feedback to the IGOLD team
- Calm, cream-forward editorial design; accessible; fast (no heavy 3D libraries)

## Tech stack

- **React** + **TypeScript** + **Vite**
- **GSAP** for gentle, reduced-motion-aware animations
- **Convex** backend (contact form)
- Deployed on Viktor Spaces

## Getting started

```bash
bun install          # or: npm install
npx convex dev       # generates convex/_generated (gitignored) & runs the backend
bun run dev          # start the dev server
```

Build for production:

```bash
bunx vite build      # output in dist/
```

> `convex/_generated/` is intentionally gitignored and is created by `npx convex dev`.

## Design system — "NOOR"

Cream paper · navy ink · gold radiance. Locked palette: **navy / gold / cream / white**.

---

© IGOLD · IIUM. Built with care for the ummah. 🤲
