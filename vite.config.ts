import { defineConfig } from 'vitest/config';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: 'components', replacement: path.resolve(__dirname, './src/components') },
      { find: 'hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: 'utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: 'interfaces', replacement: path.resolve(__dirname, './src/interfaces') },
      { find: 'enums', replacement: path.resolve(__dirname, './src/enums') },
      { find: 'api', replacement: path.resolve(__dirname, './src/api') },
      { find: 'app', replacement: path.resolve(__dirname, './src/app') },
      { find: 'constants', replacement: path.resolve(__dirname, './src/constants') },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
