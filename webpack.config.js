// webpack.config.js
const path = require('path');

module.exports = {
  // Other webpack configuration options...

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      }
    ]
  }
};
