import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fullReload from "vite-plugin-full-reload";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReload(["src/**/*.{js,jsx,html,ts,tsx}"])],
});
