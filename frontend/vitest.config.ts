import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    root: __dirname,
    setupFiles: ['./vitest.setup.ts'],
  },
})
