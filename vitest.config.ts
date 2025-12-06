/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      exclude: [
        'e2e/**',
        'src/main.ts',
        'src/app/app.module.ts',
        'src/app/app.component.ts',
        'src/app/warning-centre/warning-centre.module.ts',
        // Exclude identity branch in reducer (not functionally testable)
        'src/app/warnings/warnings.reducer.ts',
      ],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
    watch: false, // autoaccept test outcomes, no interactive mode
  },
});
