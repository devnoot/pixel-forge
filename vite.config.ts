import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
 
export default defineConfig({
  plugins: [react()],
  base: "/pixel-forge/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
})
