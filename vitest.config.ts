import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules", "dist", ".idea", ".git"],
    passWithNoTests: true,
    coverage: {
      all: true,
      reporter: ["clover", "cobertura", "lcov", "text"],
      include: ["src"],
    },
    reporters: "basic",
  },
});
