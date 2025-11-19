// vue.config.js
const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    hhttps: process.env.NODE_ENV !== 'production' ? {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
    } : false,
    proxy: {
      '^/api': {
        target: 'https://wsapi.wslab.qzz.io',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}