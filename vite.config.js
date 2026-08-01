import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Sesuaikan nama repository GitHub Pages kamu
  base: '/undangan-taufik-jihan3.2/', 
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
