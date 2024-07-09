import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

export default defineConfig({
  base: '/', plugins: [react()], preview: {
    port: 8080, strictPort: true,
  }, server: {
    port: 8080, strictPort: true, host: true, origin: "http://0.0.0.0:8080",
  }, resolve: {
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
    }
  }, publicDir: './public', build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
})