process.env.VUE_APP_PRODUCT   = process.env.PRODUCT || process.env.ontology_publisher_current_product || 'htmlpages'
process.env.VUE_APP_BRANCH    = (process.env.BRANCH || ( process.env.BRANCH_NAME === process.env.TAG_NAME ? 'master' : process.env.BRANCH_NAME || 'master')).toLowerCase()
process.env.VUE_APP_TAG       = process.env.TAG || process.env.TAG_NAME || 'latest'
process.env.VUE_APP_TIMESTAMP = process.env.TIMESTAMP || '2020Q1'

module.exports = {
  publicPath: `/${process.env.ONTPUB_FAMILY || 'auto'}/`,
  assetsDir: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}`,
  indexPath: `${process.env.VUE_APP_PRODUCT}/${process.env.VUE_APP_BRANCH}/${process.env.VUE_APP_TAG}/index.html`,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/global.scss";',
      },
    },
  },
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/auto/ontology/api/search$': {
        target: 'https://auto-viewer.spec.edmcouncil.org',
        // changeOrigin: true,
        // secure:false,
        // pathRewrite: {'^/auto': '/'},
        //logLevel: 'debug'
      },
      '^/auto/ontology/api/module$': {
        target: 'https://auto-viewer.spec.edmcouncil.org',
        // changeOrigin: true,
        // secure:false,
        // pathRewrite: {'^/auto': '/'},
        //logLevel: 'debug'
      },
      '^/auto/ontology/api/hint': {
        target: 'https://auto-viewer.spec.edmcouncil.org',
        // changeOrigin: true,
        // secure:false,
        // pathRewrite: {'^/auto': '/'},
        //logLevel: 'debug'
      },
    },
  },
};
