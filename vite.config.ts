import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  plugins: [react()],
  test: {
    setupFiles: ["vitest-setup.ts"],
    environment: "jsdom",
    mockReset: true,
    globals: true,
    exclude: [
      "node_modules",
      "dist",
      "design-system/**/*.visual-tests.spec.ts",
      "e2e",
    ],
  },
});
