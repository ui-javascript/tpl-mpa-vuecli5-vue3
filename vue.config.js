const { defineConfig } = require('@vue/cli-service')

// const isEnvProd = (process.env.NODE_ENV === 'production')
const isEnvDev = (process.env.NODE_ENV === 'development')

// 构建工具类
const utils = require("./mpa.utils")

// 配置
const CONFIG = require("./mpa.config")

// 获取多页面信息
let pages = utils.getEntry(CONFIG.entry)

console.log(pages)

// 给html添加参数, 用于生成多页面路径的导航
// @fix 2019-11-16 pages是对象类型 不是数组 改为Object.keys().length
const entries = pages.entries

// if (!isEnvProd && Object.keys(entries).length > 1 && CONFIG.showNav) {
//   for (let index in entries) {
//     Object.assign(entries[index], {
//       _browserPage: pages.browserPages,
//     })
//   }
// }

module.exports = defineConfig({
  transpileDependencies: true,
  pages: entries,
  publicPath: './',
  outputDir: 'docs',
  devServer: {
    host: '0.0.0.0',
    port: CONFIG.port,
    // https://github.com/vuejs/vue-cli/issues/6996
    // disableHostCheck: true,
    client: {
      webSocketURL: `ws://0.0.0.0:${CONFIG.port}/ws`,
   },
    allowedHosts: 'all',
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       modifyVars: {
  //         // less vars，customize ant design theme

  //         // 'primary-color': '#F5222D',
  //         // 'link-color': '#F5222D',
  //         // 'border-radius-base': '4px'
  //       },
  //       // do not remove this line
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  chainWebpack: config => {

    // TODO: need test
    // config.plugins.delete('preload')
    // TODO: need test
    // config.plugins.delete('prefetch')


    // config
    //   .plugin('html')
    //   .tap(args => {
    //     args[0]._browserPage = pages._browserPage
    //     return args
    //   })

    // 开发环境 cheap-source-map
    config
      .when(isEnvDev,
        config => config.devtool('cheap-source-map')
      )

  },
})
