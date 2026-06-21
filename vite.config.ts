import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'node:process';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public-yegine',
  base: env.VITE_BASE_PATH || '/',
});
