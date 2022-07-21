process.env.VUE_APP_PRODUCT =
  process.env.PRODUCT ||
  process.env.ontology_publisher_current_product ||
  "htmlpages";
process.env.VUE_APP_BRANCH = (
  process.env.BRANCH ||
  (process.env.BRANCH_NAME === process.env.TAG_NAME
    ? "master"
    : process.env.BRANCH_NAME || "master")
).toLowerCase();
process.env.VUE_APP_TAG = process.env.TAG || process.env.TAG_NAME || "latest";
process.env.VUE_APP_TIMESTAMP = process.env.TIMESTAMP || "2021Q4";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "html-pages-general",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js",
        integrity:
          "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",
        crossorigin: "anonymous",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
        integrity:
          "sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN",
        crossorigin: "anonymous",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js",
        integrity:
          "sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2",
        crossorigin: "anonymous",
      },
    ],
  },
  publicPath: `/${process.env.ONTPUB_FAMILY || "idmp"}/`,
  assetsDir: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}`,
  indexPath: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}/index.html`,
  router: {
    base: process.env.BASE_URL || "",
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: "/ontology/:1?/:2?/:3?/:4?/:5?",
    //     component: resolve(__dirname, "pages/ontology.vue"),
    //   });
    // },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/scss/_variables.scss",
    "~assets/scss/_bootstrap-override.scss",
    "~assets/scss/global.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: {
            wght: [300, 400, 500],
          },
        },
        display: "swap",
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "bootstrap-vue/nuxt",
    "@nuxtjs/markdownit",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },

  // variable for our app
  env: {
    strapiBaseUri: process.env.STRAPI_URL || "http://localhost:1337",
    ontoViewerBaseUri: process.env.ONTO_VIEWER_URL || "http://localhost:8080",
    showTermsLinkOnFooter: process.env.SHOW_TERMS_LINK_ON_FOOTER || true,
  },

  styleResources: {
    scss: ["./assets/scss/*.scss"],
  },

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    use: ["markdown-it-div", "markdown-it-attrs"],
    runtime: true,
  },
};
