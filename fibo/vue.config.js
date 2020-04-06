process.env.VUE_APP_PRODUCT   = process.env.PRODUCT || process.env.ontology_publisher_current_product || 'htmlpages'
process.env.VUE_APP_BRANCH    = process.env.BRANCH || ( process.env.BRANCH_NAME === process.env.TAG_NAME ? 'master' : process.env.BRANCH_NAME || 'master')
process.env.VUE_APP_TAG       = process.env.TAG || process.env.TAG_NAME || 'latest'
process.env.VUE_APP_TIMESTAMP = process.env.TIMESTAMP || '2020Q1'

module.exports = {
  publicPath: `/${process.env.ONTPUB_FAMILY || 'fibo'}/`,
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
      '^/search/json': {
        target: 'http://172.30.1.116:9000',
      },
      '^/module/json$': {
        target: 'http://172.30.1.116:9000',
      },
      '^/hint': {
        target: 'http://172.30.1.116:9000',
      },
    },
  },
};
