import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: [
      "node_modules",
      "e2e/**",
      "copy-engineering-system/**",
      "economic-engineering-system/**",
      "economic-engineering-agents/**",
      "human-consent-growth-agent/**",
    ],
  },
});
