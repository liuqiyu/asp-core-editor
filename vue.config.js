/*
 * @Description: webpack 配置
 * @Author: liuqiyu
 * @Date: 2019-10-09 14:47:52
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-17 10:59:50
 */
const path = require('path')
const webpack = require('webpack')
const defaultSettings = require('./src/settings.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '拓扑编辑器' // page title

const port = 9420 // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // assetsDir: 'static',
  productionSourceMap: false, // 关闭map配置
  devServer: {
    port, // 代理端口
    open: true, // 是否自动打开浏览器
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5858', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        static: resolve('public/static')
      }
    },
    // dll  为了节约编译的时间，这时间我们需要告诉 webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间
    // plugins: [
    //   new webpack.DllReferencePlugin({
    //     context: process.cwd(),
    //     manifest: require('./public/vendor/vendor-manifest.json')
    //   })
    // ],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 100000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 100000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
    // externals: {
    //   'mxgraph': 'mxgraph'
    // }
  },
  // 删除moment除zh-cn中文包外的其它语言包，无需在代码中手动引入zh-cn语言包。
  chainWebpack: config => {
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    return config
  }
}
