# Alert UI Example (Angular 19 + Vite + Node 25)

This project demonstrates a compact Angular 19 warning-centre system using:

- Angular 19
- NgRx 19
- PrimeNG
- Vite + Vitest
- DevContainer with **Node 25**
- GitHub Actions (Vitest → Build → Netlify deploy)
- Netlify Hosting

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

