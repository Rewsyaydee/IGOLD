# Collaborator Logos ("Working with")

Drop the official logo for each collaborating organisation into this folder.
The landing page picks them up automatically — no code changes needed.

## Files

| File | Organisation |
|------|--------------|
| `uitm.jpg` | Universiti Teknologi MARA (UiTM) |
| `uaiinz.jpg` | Ulul Albāb Islamic Institute NZ (UAIINZ) |
| `fatimah-foundation.png` | Fatimah Foundations |
| `keluarga-kiwi.jpg` | Keluarga Kiwi |
| `mahallah-halimatus-saadiah.jpg` | Mahallah Halimatus Sa'adiah |
| `sofi.jpg` | Secretariat of Fiqh & Usul Al-Fiqh (SOFI) |
| `omani-research-studies-centre.jpg` | Omani Research & Studies Center Malaysia |

Filenames are referenced from `src/landing/data.ts` → `LANDING_MISSION.partners`.
If you replace a file with a different extension, update the path there too.

## Specs

- **Format:** PNG with a transparent background, or SVG. JPEG works but carries a
  solid background — the tile renders each logo on a white plate, so white-backed
  JPEGs blend in; other background colours will show as a block.
- **Width:** at least 400 px.
- **Canvas:** logos are contained, not cropped, and capped at 76 px tall by
  132 px wide, so heavy internal padding makes a logo appear smaller.

## Fallback

If a file is missing or fails to load, the tile renders a monogram placeholder
derived from the organisation's name, so the layout never breaks.
