import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: 'https://sergiomir018.github.io/trello-clone/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})