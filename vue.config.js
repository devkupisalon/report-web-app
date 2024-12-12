const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 8001,
    disableHostCheck: true,
    public: '127.0.0.1:8001'
  }
})
