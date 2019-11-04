const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 8888 // dev port

module.exports = {
  publicPath: './',
  devServer: {
    port // 代理端口
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
        static: resolve('public/static')
      }
    }
  }
}
