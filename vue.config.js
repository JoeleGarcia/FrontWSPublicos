// vue.config.js
const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
    },
    proxy: {
      '^/api': {
        target: 'https://localhost:7258',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}