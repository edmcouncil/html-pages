import axios from "axios";

process.env.VUE_APP_PRODUCT =
  process.env.PRODUCT ||
  process.env.ontology_publisher_current_product ||
  "pages";
process.env.VUE_APP_BRANCH = (
  process.env.BRANCH ||
  (process.env.BRANCH_NAME === process.env.TAG_NAME
    ? "master"
    : process.env.BRANCH_NAME || "master")
).toLowerCase();
process.env.VUE_APP_TAG = process.env.TAG || process.env.TAG_NAME || "latest";
process.env.VUE_APP_TIMESTAMP = process.env.TIMESTAMP || "2021Q4";
process.env.VUE_ONTOLOGY_NAME = process.env.ONTPUB_FAMILY || "fibo";
process.env.VUE_BASE_URL =
  process.env.BASE_URL ||
  "https://spec." +
    (process.env.VUE_ONTOLOGY_NAME === "idmp"
      ? "pistoiaalliance"
      : "edmcouncil") +
    ".org/";

// default ontologyResourcesBaseUri for ontologies:
// FIBO - https://spec.edmcouncil.org/fibo/ontology/
// AUTO - https://spec.edmcouncil.org/auto/ontology/
// IDMP - https://spec.pistoiaalliance.org/idmp/ontology/
process.env.VUE_RESOURCES_BASE_URL =
  process.env.RESOURCES_BASE_URL ||
  process.env.BASE_URL + process.env.VUE_ONTOLOGY_NAME + "/ontology/";

process.env.STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
process.env.STRAPI_RESOURCES_URL =
  process.env.STRAPI_RESOURCES_URL || process.env.STRAPI_URL;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.VUE_ONTOLOGY_NAME.toUpperCase(),
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
  server: {
    host: process.env.PUBLIC_URL || "localhost",
  },
  assetsDir: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}`,
  indexPath: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}/index.html`,
  router: {
    base: `/${process.env.VUE_ONTOLOGY_NAME}`,
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: "/",
          component: resolve(__dirname, "pages/index.vue"),
        },
        {
          path: "/:slug",
          component: resolve(__dirname, "pages/_slug.vue"),
        },
        {
          path: "/ontology/:1?/:2?/:3?/:4?/:5?",
          component: resolve(__dirname, "pages/ontology/index.vue"),
        },
        {
          path: "/ontology",
          component: resolve(__dirname, "pages/ontology/index.vue"),
        }
      );
    },
  },
  generate: {
    dir: `dist/${process.env.VUE_ONTOLOGY_NAME}/${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}`,
    // routes() {
    //   return axios
    //     .get(`${process.env.STRAPI_URL || "http://localhost:1337"}/api/pages`)
    //     .then((res) => {
    //       return res.data.data.map((page) => {
    //         const slug = page.attributes.slug;
    //         return `/${slug}`;
    //       });
    //     });
    // },
  },

  // loading bar
  loading: {
    color: "black",
    height: "5px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/scss/_variables.scss",
    "~assets/scss/_bootstrap-override.scss",
    "~assets/scss/global.scss",
    "~assets/scss/typography.scss",
    "~assets/scss/highlight.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-multiselect" },
    { src: "~/plugins/v-clipboard" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      "~/components",
      "~/components/Articles",
      "~/components/chunks",
      "~/components/Ontology",
    ],
  },

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
    "@nuxtjs/proxy",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: `/${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}/_nuxt/`,
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
    extend(config) {
      config.resolve.alias.vue = "vue/dist/vue.common";
    },
  },

  // variable for our app
  // default ontologyResourcesBaseUri for ontologies:
  // FIBO - https://spec.edmcouncil.org/fibo/ontology/
  // AUTO - https://spec.edmcouncil.org/auto/ontology/
  // IDMP - https://spec.pistoiaalliance.org/idmp/ontology/
  env: {
    ontologyName: process.env.VUE_ONTOLOGY_NAME,

    strapiBaseUri: process.env.STRAPI_URL,
    strapiResourcesUri: process.env.STRAPI_RESOURCES_URL,
    ontologyResourcesBaseUri: process.env.VUE_RESOURCES_BASE_URL,
    showTermsLinkOnFooter: process.env.SHOW_TERMS_LINK_ON_FOOTER || true,
    ontologyResourcesBaseUri:
      process.env.RESOURCES_BASE_URL ||
      "https://spec.edmcouncil.org/fibo/ontology/",
  },

  http: {
    proxy: process.env.NODE_ENV !== "production",
  },

  proxy: [
    process.env.VUE_RESOURCES_BASE_URL.startsWith("http://") ||
    process.env.VUE_RESOURCES_BASE_URL.startsWith("https://")
      ? process.env.VUE_RESOURCES_BASE_URL
      : process.env.VUE_BASE_URL +
        process.env.VUE_ONTOLOGY_NAME +
        "/ontology/api",
    process.env.VUE_RESOURCES_BASE_URL.startsWith("http://") ||
    process.env.VUE_RESOURCES_BASE_URL.startsWith("https://")
      ? process.env.VUE_RESOURCES_BASE_URL
      : process.env.VUE_BASE_URL +
        process.env.VUE_ONTOLOGY_NAME +
        "/ontology/*/api",
  ],

  styleResources: {
    scss: ["./assets/scss/*.scss"],
  },

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    use: ["markdown-it-div", "markdown-it-attrs", "markdown-it-highlightjs"],
    runtime: true,
  },
};
