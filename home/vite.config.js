import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const PRODUCT = env.PRODUCT || 'htmlpages';
  const BRANCH = env.BRANCH_NAME || 'master';
  const TAG = env.TAG_NAME || 'latest';

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`,
        },
      },
    },
    server: {
      port: 8080,
    },
    base: '/',
    build: {
      outDir: `dist/${PRODUCT}/${BRANCH}/${TAG}`,
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
        },
      },
    },
  };
});
