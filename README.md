# Warning Centre UI (Angular 19 + Vite)

![Coverage 100%](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Lint Passing](https://img.shields.io/badge/lint-passing-brightgreen)
![E2E Passing](https://img.shields.io/badge/e2e-passing-brightgreen)



This project demonstrates a compact Angular 19, generic warning centre with Pokémon-themed mock data:

- Angular 19
- NgRx 19
- PrimeNG
- Vite + Vitest
- Playwright E2E
- DevContainer (see `.devcontainer/devcontainer.json`)
- GitHub Actions (CI: lint, unit, E2E, build)
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

Interaction behaviour:
- Error items auto-dismiss after 5s unless hovered or clicked — interaction cancels dismissal.
- Removal applies a brief fade-and-collapse animation so the dialog size changes smoothly.
- Snapshot assertion uses a soft check: `expect.soft(page).toHaveScreenshot(...)` so visual diffs warn but do not fail CI. Switch to a hard assertion if strict enforcement is required.

## Build

```bash
npm run build
```

Build output: `dist/alert-ui-example/browser`


## Dev Container

- Uses Node LTS, `mcr.microsoft.com/devcontainers/javascript-node:22`
- Pre-installs Angular CLI 19, ESLint, Prettier, spell checker

### Playwright Dependencies

The dev container Dockerfile installs system libraries required for headless Chromium (NSS/NSPR, DBus, GTK/ATK, GBM, ALSA, X11 helpers) to ensure Playwright E2E runs reliably.


## GitHub Actions

- Steps: checkout, set up Node, install, lint, unit test, E2E, build
	- Visual tests: we mask dynamic regions (version/date footer, debug tools) and use OS-specific baselines.
	- A small tolerance is applied for certain element-level screenshots on CI to account for rendering variance.


## Testing & Linting

- Unit: `npm test` (Vitest)
- E2E: `npm run test:e2e` (Playwright)
- Coverage: `npm run coverage`
- Lint: `npm run lint`
- Pre-commit: `lint-staged` via Husky (also bumps version and writes build info)
- Pre-push: all tests and lint must pass

---


## Formatting & Linting

- ESLint config: `eslint.config.js` (flat config)
- Prettier: VS Code extension recommended
- HTML files ignored by ESLint (configured via flat config)

## Versioning & Build Info

- Each commit bumps the patch version and writes `src/version.ts`.
- The app footer shows version and the date of the latest commit.

## UI

- Pokémon-themed background and mock data

### Design Tokens & Themes

Design tokens are centralised CSS variables defined in `src/styles/design-tokens.scss` for colours, backgrounds, borders, text, and shadows. Components reference these tokens to keep styles consistent and accessible.

Light/Dark mode:
---

## Conventional Commits Enforcement

Commit messages are validated against the Conventional Commits specification via Commitlint.

- Hook: `.husky/commit-msg` runs `npx --no -- commitlint --edit $1` on every commit.
- Config: `commitlint.config.js` extends `@commitlint/config-conventional`.
- Examples:
	- Valid: `feat(warnings): add filter by severity`
	- Valid: `fix(ui): correct popover width in light mode`
	- Invalid: `update stuff` (missing type/scope/subject)

### Commitlint Unit Test

We include a small test to verify the configuration works. It lints known-valid and known-invalid messages using Commitlint’s API.

Run:

```bash
npm run test
```

The test lives in `src/commitlint.spec.ts`.

---
- Theme variables are defined in `src/styles.scss` under `:root` (light) and `.theme-dark` (dark).
- `ThemeService` initialises the theme based on OS preference, persists a manual choice, and supports Auto/Light/Dark modes.
- A debug toolbar combines version/date with a manual add form and a theme toggle; it is masked in visual tests.

---

