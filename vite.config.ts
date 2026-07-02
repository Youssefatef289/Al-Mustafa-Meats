import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const isGitHubPages = process.env.GITHUB_PAGES === "true"

export default defineConfig({
  base: isGitHubPages ? "/Al-Mustafa-Meats/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
