import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    mockReset: true,
    exclude: ["node_modules", "dist", "**/*.visual-tests.spec.ts"],
  },
});
