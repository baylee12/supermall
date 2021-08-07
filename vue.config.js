module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // 前端跨域方案
    // proxy: {
    //   '/backend': {
    //     target: 'http://localhost:9000/api/m5',
    //     pathRewrite: {'^/backend': ''}
    //   }
    // }
    // proxy: 'http://localhost:8080',
    // public: 'http://localhost:8080'  // 本地ip
  }
}
