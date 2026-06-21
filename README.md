# Егине Унанян Landing

MVP skeleton for a static one-page personal site for Егине Левоновна Унанян, a врач-терапевт, психиатр и психолог.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

TypeScript check:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

## Structure

- `src/App.tsx` - page layout and section rendering.
- `src/data/siteContent.ts` - site text, section cards, image metadata.
- `src/data/contacts.ts` - messenger links and first-message text. Replace TODO placeholders before launch.
- `src/styles.css` - visual system and responsive layout.
- `public-yegine/images/yegine/` - selected portrait assets for the MVP and the only public asset directory copied into the production build.
- `.github/workflows/deploy-pages.yml` - GitHub Pages build/deploy workflow.

## GitHub Pages

The Vite base path is controlled through `VITE_BASE_PATH`.

For a root deploy:

```bash
VITE_BASE_PATH=/ npm run build
```

For a repository subpath deploy, set the repository path:

```bash
VITE_BASE_PATH=/repository-name/ npm run build
```

The GitHub Actions workflow derives the Pages base path from the repository name: `/${{ github.event.repository.name }}/`.

The project intentionally uses `publicDir: 'public-yegine'` in `vite.config.ts` so legacy files that still exist in `public/` are not copied into the deploy artifact.

## TODO Before Launch

- Replace Telegram, WhatsApp, and VK placeholders in `src/data/contacts.ts`.
- Replace the canonical URL placeholder in `index.html`.
- Confirm whether the site will deploy as a repository Pages site or from a custom/root domain.
- Add real reviews and video only after permission from patients.
- Add confirmed legal, licensing, price, address, or phone details only after the client provides them.
