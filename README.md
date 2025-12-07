


# Alert Centre Demo (Angular 19 + Vite + Node 20/25)

![Coverage 100%](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Lint Passing](https://img.shields.io/badge/lint-passing-brightgreen)
![E2E Passing](https://img.shields.io/badge/e2e-passing-brightgreen)



This project demonstrates a compact Angular 19 generic alert-centre system with Pokémon-themed mock data:

- Angular 19
- NgRx 19
- PrimeNG
- Vite + Vitest
- Playwright E2E
- DevContainer (Node 20, see `.devcontainer/devcontainer.json`)
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

## Build

```bash
npm run build
```

Build output: `dist/alert-ui-example/browser`


## Dev Container

- Uses Node 20: `mcr.microsoft.com/devcontainers/javascript-node:20`
- Pre-installs Angular CLI 19, ESLint, Prettier, spell checker


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
- PrimeNG components for UI primitives

---

