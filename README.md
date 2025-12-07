# Alert Centre Demo (Angular 19 + Vite + Node 22/25)

![Coverage 100%](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Lint Passing](https://img.shields.io/badge/lint-passing-brightgreen)
![E2E Passing](https://img.shields.io/badge/e2e-passing-brightgreen)



This project demonstrates a compact Angular 19 generic alert-centre system with Pokémon-themed mock data:

- Angular 19
- NgRx 19
- PrimeNG
- Vite + Vitest
- Playwright E2E
- DevContainer (Node 22, see `.devcontainer/devcontainer.json`)
- GitHub Actions (CI: lint, unit, E2E, build, Netlify deploy)
- Netlify Hosting ([Live Demo](https://alert-example.netlify.app/))




## Getting Started

```bash
npm install
npm start
```

Visit: http://localhost:4200

## Run Tests

```bash
npm test
```

### E2E and Visual Snapshots (Playwright)

- Run all E2E tests:

```bash
npm run test:e2e
```

- Update the visual baseline for the Warning Centre snapshot:

```bash
npm run test:e2e -- --update-snapshots -g "Warning Centre visual snapshot"
```

## Visual Snapshot Testing

This project uses Playwright for visual regression checks. Snapshots are stored under `e2e/*.spec.ts-snapshots/` and compared on each run.

- Run all e2e tests: `npx playwright test`
- View report: `npx playwright show-report`
- Baselines are OS-specific (e.g., `*-linux.png`). CI enforces strict diffs.

### Updating Snapshots

When the UI intentionally changes, update the baseline snapshots:

- Update changed/missing snapshots for all tests:

```bash
npx playwright test --update-snapshots=changed
```

- Update snapshots for a specific spec only:

```bash
npx playwright test --update-snapshots=changed e2e/visual-open.spec.ts
```

- Regenerate all snapshots (use sparingly):

```bash
npx playwright test --update-snapshots=all
```

Tips:
- Run unit tests first to ensure build stability: `npm test`
- If a test fails with a diff, inspect `test-results/.../*-diff.png` before updating.

Notes:
- Playwright config uses `webServer`, so it will start the dev server and wait for port readiness automatically.
- The visual snapshot test lives in `e2e/visual.spec.ts` and uses `expect(page).toHaveScreenshot('warning-centre.png', { fullPage: true })`.
- Baselines are stored next to the spec under a `*-snapshots/` folder; subsequent runs compare against the baseline and fail on diffs.
- We also capture the UI with the dialog open in `e2e/visual-open.spec.ts` (soft assertion). It opens the popover via `.alert-icon-btn` and snapshots `warning-centre-open.png` to verify spacing and overlay visuals.

Interaction behavior:
- Error items auto-dismiss after 5s unless hovered or clicked — interaction cancels dismissal.
- Removal applies a brief fade-and-collapse animation so the dialog size changes smoothly.
 - Snapshot assertion uses a soft check: `expect.soft(page).toHaveScreenshot(...)` so visual diffs warn but do not fail CI. Switch to a hard assertion if strict enforcement is required.

## Build

```bash
npm run build
```

Build output: `dist/alert-ui-example/browser`


## Dev Container

- Uses Node 22: `mcr.microsoft.com/devcontainers/javascript-node:22`
- Pre-installs Angular CLI 19, ESLint, Prettier, spell checker

### Playwright Dependencies

The dev container Dockerfile installs system libraries required for headless Chromium (NSS/NSPR, DBus, GTK/ATK, GBM, ALSA, X11 helpers) to ensure Playwright E2E runs reliably.


## GitHub Actions

- Node 25 for CI
- Steps: checkout, setup node, install, lint, unit test, E2E, build, Netlify deploy


## Testing & Linting

- Unit: `npm test` (Vitest)
- E2E: `npm run test:e2e` (Playwright)
- Coverage: `npm run coverage`
- Lint: `npm run lint`
- Pre-commit: `lint-staged` via Husky
- Pre-push: All tests and lint must pass

---


## Formatting & Linting

- ESLint config: `.eslintrc.js`, `eslint.config.js`
- Prettier: VS Code extension recommended
- All HTML files ignored by ESLint

## Netlify

- Deploys from `main` branch
- Build command: `npm run build`
- Publish directory: `dist/alert-ui-example/browser`
- SPA routing via `netlify.toml`

## UI

- Pokémon-themed background and mock data

### Design Tokens

Design tokens are centralized CSS variables defined in `src/styles/design-tokens.scss` for colors, backgrounds, borders, text, and shadows. Component SCSS references these tokens to keep styles consistent and accessible.

---

