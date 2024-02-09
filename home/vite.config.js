import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const PRODUCT = env.PRODUCT || 'htmlpages';
  const BRANCH = env.BRANCH_NAME || 'master';
  const TAG = env.TAG_NAME || 'latest';

  return {
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
            {
              src: 'dist/index.html',
              dest: `${PRODUCT}/${BRANCH}/${TAG}`,
            },
            {
              src: 'public/*',
              dest: `${PRODUCT}/${BRANCH}/${TAG}`,
            }
        ]
      }),
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
    build: {
      assetsDir: `${PRODUCT}/${BRANCH}/${TAG}`,
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
        },
      },
    },
  };
});
