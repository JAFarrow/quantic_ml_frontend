import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      open: true
    },
    build: {
      outDir: "dist"
    },
    define: {
      "import.meta.env.API_BASE_URL": JSON.stringify(env.API_BASE_URL ?? "")
    }
  };
});
