import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // This is where we are going to put the netlify link
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});