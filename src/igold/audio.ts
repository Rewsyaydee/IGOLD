// Lightweight audio helper.
// Real recitation MP3s are not yet provided by the client. Until then we play a
// soft, gentle two-tone chime as a placeholder so the audio UX can be tested.
// When real files arrive, populate AUDIO_URLS keyed by step/bacaan id and the
// player will prefer them automatically.

import { Howl } from "howler";

// Real recitation files provided by the client (2026-07). Keyed by both the
// Bacaan card ids and the Kaifiat step keys (`step-<id>` / `fatihah`).
export const AUDIO_URLS: Record<string, string> = {
  // --- Bacaan section cards ---
  takbir: "/audio/01_takbir.mp3",
  ruku: "/audio/04_rukuk.m4a",
  itidal: "/audio/05_iktidal.m4a",
  sujud: "/audio/06_sujud.m4a",
  duduk: "/audio/07_duduk.m4a",
  salam: "/audio/10_salam.mp3",
  tahiyatawal: "/audio/08_tahiyatawal.m4a",
  qunutsubuh: "/audio/11_qunutsubuh.m4a",
  sujudtilawah: "/audio/12_sujudtilawah.m4a",
  // --- Kaifiat step buttons ---
  "step-2": "/audio/01_takbir.mp3",      // Takbiratul Ihram
  "step-3": "/audio/02_iftitah.m4a",     // Doa Iftitah
  fatihah: "/audio/03_fatihah.m4a",      // step 4 · Al-Fatihah
  "step-6": "/audio/04_rukuk.m4a",       // Rukuk
  "step-7": "/audio/05_iktidal.m4a",     // Iktidal
  "step-8": "/audio/06_sujud.m4a",       // Sujud pertama
  "step-9": "/audio/07_duduk.m4a",       // Duduk antara dua sujud
  "step-10": "/audio/06_sujud.m4a",      // Sujud kedua
  "step-11": "/audio/09_tahiyatakhir.m4a", // Tahiyat Akhir
  "step-13": "/audio/10_salam.mp3",      // Salam
  // step-5 (Surah Lazim) & step-12 (Selawat) — no dedicated file yet (placeholder)
  // Extra recitations available (pending section decision):
  //   /audio/08_tahiyatawal.m4a, /audio/11_qunutsubuh.m4a, /audio/12_sujudtilawah.m4a
  // --- Niyyah audio (one file per prayer) ---
  "niyyah-subuh": "/audio/niyyah/subuh.mp3",
  "niyyah-zohor": "/audio/niyyah/zohor.mp3",
  "niyyah-asar": "/audio/niyyah/asar.mp3",
  "niyyah-maghrib": "/audio/niyyah/maghrib.mp3",
  "niyyah-isyak": "/audio/niyyah/isyak.mp3",
  // --- Wudu audio ---
  "wudu-10": "/audio/wudu/dua-wudu.mp3",
};

let ctx: AudioContext | null = null;
const howls: Record<string, Howl> = {};

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AC) ctx = new AC();
  }
  return ctx;
}

function placeholderChime() {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime;
  const notes = [523.25, 659.25]; // C5, E5 — calm
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.16;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.75);
  });
}

/** Play audio for a given id; falls back to a placeholder chime. */
export function playAudio(id: string): "real" | "placeholder" {
  const url = AUDIO_URLS[id];
  if (url) {
    if (!howls[id]) howls[id] = new Howl({ src: [url], html5: true });
    Object.values(howls).forEach(h => h.stop());
    howls[id].play();
    return "real";
  }
  placeholderChime();
  return "placeholder";
}

export const hasRealAudio = (id: string) => Boolean(AUDIO_URLS[id]);

export function stopAudio() {
  Object.values(howls).forEach(h => h.stop());
}
