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
    // proxy: 'http://localhost:8080',
    public: 'http://localhost:8080'  // 本地ip
  }
}
