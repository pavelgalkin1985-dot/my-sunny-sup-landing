# AGENTS.md

## Project Overview

`Мой солнечный SUP` is a Vite + React + TypeScript landing page for SUP walks, board rental, instructor lessons, first-time SUP, SUP yoga, family formats, sea photoshoots, and tours in Lazarevskoye / Sochi.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Cloudflare Pages:

```text
Build command: npm run build
Output directory: dist
Functions: functions/api/lead.ts
```

## Important Paths

- `src/App.tsx` — landing page, CTAs, lead form behavior.
- `src/styles.css` — visual system, responsive layout, live sun animation, image-frame system.
- `src/data/images.ts` — canonical image list.
- `public/images/` — project images. Every file here must be displayed on the site.
- `public/images/cards/card-yoga.jpg` — yoga card.
- `functions/api/lead.ts` — Cloudflare Pages Function for Telegram leads.
- `IMAGE_MANIFEST.md` — image description and usage map.
- `PROJECT_MEMORY.md` — brand, pricing, contacts, and implementation memory.

## Hard Rules

- Do not crop important images.
- Do not use `object-fit: cover` for service cards, maps, logos, gallery, yoga card, or other important image content.
- Important imagery must use `object-fit: contain` inside `.image-frame`.
- Every image from `public/images` must be displayed on the site and documented in `IMAGE_MANIFEST.md`.
- Do not hardcode Telegram secrets.
- Keep `/api/lead` success gated by Telegram API `ok:true`.
- Keep `.env` and local env files ignored.
- Do not commit or push until the user explicitly says to do so.

## Contacts

- Main phone and Telegram: `8 (963) 692-83-78`
- MAX phone: `8 (999) 655-80-43`
- VK: `https://vk.com/my_sup_sun_lazarevskoye`
- Taxi address: `ул. Одоевского, 93А`
- Landmark: beach `Морской бриз`

## Future Agent Final Report Format

Report:

1. What changed.
2. Files changed.
3. Image usage status.
4. Verification commands and results.
5. Cloudflare variables needed.
6. Git status / files ready for commit.
7. Known risks or follow-up work.
