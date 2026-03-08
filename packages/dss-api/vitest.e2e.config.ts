import swc from 'unplugin-swc';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    globals: true,
    root: '.',
    include: ['src/e2e/**/*.spec.ts'],
    testTimeout: 90_000,
    hookTimeout: 60_000,
    sequence: { concurrent: false },
    env: loadEnv('test', process.cwd(), ''),
  },
});
