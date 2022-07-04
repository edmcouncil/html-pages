process.env.VUE_APP_PRODUCT   = process.env.PRODUCT || process.env.ontology_publisher_current_product || 'htmlpages'
process.env.VUE_APP_BRANCH    = (process.env.BRANCH ||
  ( process.env.BRANCH_NAME === process.env.TAG_NAME ? 'master' : process.env.BRANCH_NAME || 'master')).toLowerCase()
process.env.VUE_APP_TAG       = process.env.TAG || process.env.TAG_NAME || 'latest'
process.env.VUE_APP_TIMESTAMP = process.env.TIMESTAMP || '2022Q2'

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      fallback: {
        path: require.resolve( 'path-browserify' ),
      },
    },
  },
  publicPath: `/${process.env.ONTPUB_FAMILY || 'fibo'}/`,
  assetsDir: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}`,
  indexPath: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}/index.html`,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/global.scss";',
      },
    },
  },
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/fibo/ontology/.*api/search': {
        target: 'https://spec.edmcouncil.org',
      },
      '^/fibo/ontology/.*api/find': {
        target: 'https://spec.edmcouncil.org',
      },
      '^/fibo/ontology/.*api/module$': {
        target: 'https://spec.edmcouncil.org',
      },
      '^/fibo/ontology/.*api/hint': {
        target: 'https://spec.edmcouncil.org',
      },
      '^/fibo/ontology/.*api': {
        target: 'https://spec.edmcouncil.org',
      },
    },
  },
};
