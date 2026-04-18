import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import path from "path" // <-- Add this

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- This tells Vercel what @ means
    },
  },
  plugins: [
    tanstackStart(),
  ],
})
