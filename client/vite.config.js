import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mikre-netflix-clone/",
  // base: "/", // For YegaraHost (root domain)
});
