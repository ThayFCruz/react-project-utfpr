import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-project-utfpr",
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setupTests.js'
  }
})