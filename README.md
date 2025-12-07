

# Alert Centre Demo (Angular 19 + Vite + Node 25)

![Coverage 100%](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Lint Passing](https://img.shields.io/badge/lint-passing-brightgreen)
![E2E Passing](https://img.shields.io/badge/e2e-passing-brightgreen)


This project demonstrates a compact Angular 19 generic alert-centre system using:

- Angular 19
- NgRx 19
- PrimeNG
- Vite + Vitest
- DevContainer with **Node 25**
- GitHub Actions (Vitest → Build → Netlify deploy)
- Netlify Hosting ([See live on Netlify](https://alert-example.netlify.app/))

## Getting Started

```bash
npm install
npm start
```

Visit: http://localhost:4200

Deployed via Netlify for instant preview and CI/CD.

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

Uses Node 25 via:

```
mcr.microsoft.com/devcontainers/javascript-node:25
```

## GitHub Actions

Runs:
1. npm ci
2. npm test (Vitest)
3. npm run build
4. Deploys to Netlify

## End-to-End (E2E) Testing

This project uses [Playwright](https://playwright.dev/) for headless E2E browser testing.

### Run E2E Tests

Start the dev server in one terminal:

```bash
npm start
```

Then, in another terminal, run:

```bash
npm run test:e2e
```

This will run all Playwright tests in `e2e/` headlessly against `http://localhost:4200`.

### Add a New E2E Test

Create a new file in `e2e/` (e.g. `e2e/your-feature.spec.ts`) and use the Playwright test API.

---

## Linting & Pre-commit

- ESLint is configured for Angular, TypeScript, and import order.
- Pre-commit hook (Husky + lint-staged) blocks commits with lint errors.

Run lint manually:

```bash
npx eslint src --ext .ts
```

---

