// vue.config.js
const fs = require('fs');
const path = require('path');

let httpsConfig = false;

// Solo usar certificados en modo desarrollo
if (process.env.NODE_ENV === 'development') {
  httpsConfig = {
    key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
  };
}

module.exports = {
  devServer: {
    https: httpsConfig,
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
