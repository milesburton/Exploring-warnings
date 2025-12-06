/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      exclude: [
        'src/main.ts',
        'src/app/app.module.ts',
        'src/app/app.component.ts',
        'src/app/warning-centre/warning-centre.module.ts',
      ],
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
    watch: false, // autoaccept test outcomes, no interactive mode
  },
});
