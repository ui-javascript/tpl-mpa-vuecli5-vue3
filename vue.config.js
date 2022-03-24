const path = require("path")
const { defineConfig } = require('@vue/cli-service')
// const HtmlWebpackPlugin = require("html-webpack-plugin")

const isEnvProd = (process.env.NODE_ENV === 'production')
const isEnvDev = (process.env.NODE_ENV === 'development')

function resolve(dir) {
  return path.join(__dirname, dir)
}

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

if (Object.keys(entries).length > 1 && CONFIG.showNav) {
  for (let index in entries) {
    Object.assign(entries[index], {
      _browserPage: pages.browserPages,
    })
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  pages: entries,
  publicPath: './',
  outputDir: 'docs',
  devServer: {
    port: CONFIG.port,
    // @fix 暴露地址 
    // https://github.com/vuejs/vue-cli/issues/6996
    host: '0.0.0.0',
    // disableHostCheck: true,
    client: {
      webSocketURL: `ws://0.0.0.0:${CONFIG.port}/ws`,
    },
    allowedHosts: 'all',
  },
  runtimeCompiler: true,
  configureWebpack: {
    // plugins: [],
    resolve: {
      alias: {
        '@': resolve('src'),
        // @TODO 目前这个变量仅仅给vue-element-admin使用
        // --> 所以src内使用到^/store的地方代码都有耦合
        // 当前项目最外层路径
        // '^': resolve('src'),
        // @fix runtime -> compiler模式
        // https://blog.csdn.net/wxl1555/article/details/83187647
        // 'vue$': 'vue/dist/vue.esm.js',
        'vue$': 'vue/dist/vue.esm-bundler.js',
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'less',
        // less所在文件路径
        // patterns: [path.resolve(__dirname, './src/assets/css/base.less')] 
    }
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
    //   .use(HtmlWebpackPlugin)
    //   .tap(args => {
    //     args.title = 'Your new title'
    //     return args
    //   })

    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //       options.compilerOptions.preserveWhitespace = true
    //       return options;
    //   });

    // 开发环境 cheap-source-map
    config
      .when(isEnvDev,
        config => config.devtool('cheap-source-map')
      )

  },
})
