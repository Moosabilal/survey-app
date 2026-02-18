import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  format: ["esm"],
  outDir: "dist",
  sourcemap: true,
  clean: true,
  target: "node22",
  platform: "node",
});
