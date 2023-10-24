const path = require('path');
const VUE_APP_PRODUCT = process.env.PRODUCT
  || process.env.ontology_publisher_current_product
  || 'pages';

const VUE_APP_BRANCH = (
  process.env.BRANCH
  || (process.env.BRANCH_NAME === process.env.TAG_NAME
    ? 'develop'
    : process.env.BRANCH_NAME || 'develop')
).toLowerCase();

const VUE_ONTOLOGY_NAME = process.env.ONTPUB_FAMILY || 'fibo';
const VUE_APP_TAG = process.env.TAG || process.env.TAG_NAME || 'latest';
const VUE_DIST_DIR = process.env.VUE_DIST_DIR || `/${VUE_APP_PRODUCT}/${VUE_APP_BRANCH}/${VUE_APP_TAG}`;
const VUE_ASSETS_DIR = `${VUE_DIST_DIR}/_nuxt/`;
const VUE_BASE_URL = process.env.BASE_URL
  || `https://spec.${VUE_ONTOLOGY_NAME === 'idmp' ? 'pistoiaalliance' : 'edmcouncil'}.org/`;

const VUE_RESOURCES_BASE_URL = `${VUE_BASE_URL + VUE_ONTOLOGY_NAME}/ontology/`;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

const DEV_BASE_URL = VUE_BASE_URL.replace(
  'pistoiaalliance',
  'edmcouncil',
);

export default defineNuxtConfig({
  vue: {
    runtimeCompiler: true,
  },
  app: {
    baseURL: `/${VUE_ONTOLOGY_NAME}`,
    head: {
      title: VUE_ONTOLOGY_NAME.toUpperCase(),
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'ontology, Open Knowledge Graph, OKG, EDM Council, Enterprise Data Management Council',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      gtm: {
        id: 'GTM-N7GL2D5',
        defer: false,
        compatibility: true,
        loadScript: true,
        enableRouterSync: true
      },
      generateDir: `dist/${VUE_ONTOLOGY_NAME}${VUE_DIST_DIR}`,
      assetsDir: VUE_ASSETS_DIR,
      distDir: process.env.VUE_DIST_DIR,
      staticGenerationMode: process.env.NODE_ENV === 'production',
      strapiBasePath: `/${VUE_ONTOLOGY_NAME}/strapi`,
      strapiBaseUrl: STRAPI_URL,
      tagName: process.env.VUE_APP_TAG || 'latest',
      showTermsLinkOnFooter: process.env.SHOW_TERMS_LINK_ON_FOOTER === 'true' || true,
      ontologyResourcesBaseUri: VUE_RESOURCES_BASE_URL,
      ontologyName: VUE_ONTOLOGY_NAME,
    },
  },
  components: {
    global: true,
    dirs: [
      {
        path: '~/components/Resource/chunks',
        pathPrefix: false
      },
      {
        path: '~/components/Resource',
        pathPrefix: false
      },
      {
        path: '~/components/Header',
        pathPrefix: false
      },
      {
        path: '~/components/UI',
        pathPrefix: false,
      },
      {
        path: '~/components/Ontology',
        pathPrefix: false,
      },
      {
        path: '~/components/Articles',
        pathPrefix: false
      },
      {
        path: '~/components',
        pathPrefix: false
      },
    ],
  },
  vite: {
    server: {
      proxy: {
        [
          `/${VUE_ONTOLOGY_NAME}/ontology/api`
        ]: {
          target: DEV_BASE_URL,
          changeOrigin: true,
        },
        [`/${VUE_ONTOLOGY_NAME}/strapi`]: {
          target: DEV_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    output: {
      publicDir: path.join(__dirname, `dist/${VUE_ONTOLOGY_NAME}${VUE_DIST_DIR}`)
    }
  },
  css: [
    '@/assets/scss/global.scss',
    '@/assets/scss/Ontology.scss',
    'vue-multiselect/dist/vue-multiselect.css'
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  googleFonts: {
    families: {
      Inter: [400, 600, 700, 800],
    }
  },
})
