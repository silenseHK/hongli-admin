const path = require("path")
const resolve = function(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"))
    config.optimization.runtimeChunk("single")
  },
  devServer: {
    host: "localhost",
    port: "8081",
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true,
    },
    // proxy: {
      // [process.env.VUE_APP_BASE_API]: {
      //   target: process.env.VUE_APP_BASE_API,
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     ["^" + process.env.VUE_APP_BASE_API]: "",
      //   },
      // },
    // },
  },
  //打包去掉console.log
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  //   }
  // },
}
