process.env.VUE_APP_TIMESTAMP = '2019Q4.1'
process.env.VUE_APP_BRANCH    = process.env.product_branch_tag && process.env.product_branch_tag.split('/',3)[1] || 'master'
process.env.VUE_APP_TAG       = process.env.product_branch_tag && process.env.product_branch_tag.split('/',3)[2] || 'latest'

module.exports = {
  publicPath: `/${process.env.ONTPUB_FAMILY || 'auto'}/`,
  assetsDir: process.env.product_branch_tag || 'htmlpages/master/latest',
  indexPath: `${process.env.product_branch_tag || 'htmlpages/master/latest'}/index.html`,
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
      // '^/auto/search/json$': {
      //   target: 'http://auto-viewer.spec.edmcouncil.org',
      // },
      // '^/auto/module/json$': {
      //   target: 'http://auto-viewer.spec.edmcouncil.org',
      // },
      // '^/auto/hint': {
      //   target: 'http://auto-viewer.spec.edmcouncil.org',
      // },
      '^/auto': {
        target: 'http://auto-viewer.spec.edmcouncil.org',
        changeOrigin: true,
        secure:false,
        pathRewrite: {'^/auto': '/'},
        //logLevel: 'debug'
      },
    },
  },
};
