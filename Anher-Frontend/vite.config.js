import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'gsap': ['gsap'],
          'sweetalert': ['sweetalert2'],
        },
      },
    },
  },

  // server: {
  //   port: 3000, // Set your desired port here
  // },
})
