const path = require('path')

module.exports = {
  productionSourceMap: false,
  outputDir: path.resolve(__dirname, "../dist"),
  devServer: {
    proxy: {
      "/upload": {
        target: "http://localhost:5008",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/upload': '/upload'
        }
      },
    },
  },
}