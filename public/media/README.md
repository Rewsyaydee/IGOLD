# Media Assets

This directory contains all instructional video and audio assets organized by **model** and **type**.

## Directory structure

```
media/
├── README.md                    ← this file
├── default/                     ← existing neutral model (videos already placed)
│   ├── kaifiat/                 ← prayer posture videos (stand, takbir, qiyam, ruku, …)
│   ├── wudu/                    ← ablution step videos
│   └── janazah/                 ← funeral prayer videos (future)
├── adult-woman/                 ← adult woman model (you provide videos)
│   ├── kaifiat/
│   ├── wudu/
│   └── janazah/
├── boy/                         ← boy model (you provide videos)
│   ├── kaifiat/
│   ├── wudu/
│   └── janazah/
└── girl/                        ← girl model (you provide videos)
    ├── kaifiat/
    ├── wudu/
    └── janazah/
```

## How to add a new model

1. Create a folder under `media/` with the model name (e.g. `media/adult-man/`).
2. Inside, create `kaifiat/`, `wudu/`, and `janazah/` subfolders.
3. Place the video files matching the names listed in each README.
4. Register the model in `src/igold/mediaRegistry.ts` by adding it to `MEDIA_MODELS` and `MEDIA_MODEL_LABELS`.

## Video specifications

| Property | Value |
|----------|-------|
| Format | MP4 (H.264) |
| Orientation | Portrait 9:16 |
| Audio | Muted (no audio track) |
| Duration | 3–6 seconds (looping) |
| Resolution | 720p recommended |
| Max file size | < 2 MB per file |

## Audio specifications

Audio files live in `/public/audio/` organized by section. See each folder's README.

## Fallback behavior

If a model doesn't have a video for a specific posture, the app falls back to the `default` model. This is handled gracefully — a placeholder message is shown and the app continues to function.
