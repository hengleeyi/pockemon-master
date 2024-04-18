import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest/setup.ts"],
    alias: {
      "@": resolve(__dirname),
    },
    coverage: {
      provider: "v8",
      include: ["**/*.{ts,tsx}"],
      exclude: [
        "**/schemas/**",
        "tailwind.config.ts",
        ".next/**",
        "**/*-provider.tsx",
        "**/layout.tsx",
        "**/middleware.ts",
      ],
    },
  },
});
