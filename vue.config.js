module.exports = {
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8082,
    proxy: {
      '/ele': {
        // 服务器地址
        target: 'http://127.0.0.1:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/ele': '',
        },
      },
    },
  },
};
