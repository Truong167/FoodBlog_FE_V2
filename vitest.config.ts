import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    testTimeout: 20000,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
      reporter: ["text", "json", "html"],
      include: [
        "app/**/*.{js,jsx,ts,tsx}",
        "!app/api/**/*",
        "components/**/*.{js,jsx,ts,tsx}",
        "utils/**/*.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@/": `${__dirname}/`,
    },
  },
});
