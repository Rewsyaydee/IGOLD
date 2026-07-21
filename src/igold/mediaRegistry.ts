// ============================================================================
// IGOLD — Media Registration & Path Resolution
// ----------------------------------------------------------------------------
// Central place to define media types, models, and resolve file paths.
// Adding a new model: add to MEDIA_MODELS and create the matching folder
// under public/media/ with the appropriate video/audio files.
// ============================================================================

import type { Pose } from "./data";

/** Supported instructional models (figures in the videos). */
export type MediaModel = "default" | "adult-woman" | "boy" | "girl";

/** All available instructional models. */
export const MEDIA_MODELS: MediaModel[] = ["default", "adult-woman", "boy", "girl"];

/** Human-readable labels for each model. */
export const MEDIA_MODEL_LABELS: Record<MediaModel, { en: string; bm: string }> = {
  default: { en: "Default", bm: "Asal" },
  "adult-woman": { en: "Adult Woman", bm: "Wanita Dewasa" },
  boy: { en: "Boy", bm: "Lelaki (Kanak)" },
  girl: { en: "Girl", bm: "Perempuan (Kanak)" },
};

/** Resolve a media path for a given model, media type, and pose.
 *  Falls back to the "default" model if the requested model doesn't have
 *  the file (determined at build time via the registry — runtime falls
 *  back gracefully via video onError). */
export function getMediaPath(
  model: MediaModel,
  type: "kaifiat" | "wudu" | "janazah",
  pose: string,
): string {
  return `/media/${model}/${type}/${pose}.mp4`;
}

/** Map of kaifiat pose IDs to filenames (without extension). */
export const KAIFIAT_POSES: Pose[] = [
  "stand",
  "takbir",
  "qiyam",
  "ruku",
  "itidal",
  "sujud",
  "duduk",
  "tashahhud",
  "salam",
];

/** Build a video-src map for a given model's kaifiat poses. */
export function buildKaifiatVideoMap(model: MediaModel): Record<Pose, string> {
  const map = {} as Record<Pose, string>;
  for (const pose of KAIFIAT_POSES) {
    map[pose] = getMediaPath(model, "kaifiat", pose);
  }
  return map;
}
