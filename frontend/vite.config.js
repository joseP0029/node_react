import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "super-duper-waddle-r4rwq5pjqq9gfx95g-5173.app.github.dev"
    ],
    proxy: {
      // Intercepta las llamadas a /api y las manda al servidor Express
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        // Opcional: útil si tienes problemas de WebSocket o rutas complejas
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
