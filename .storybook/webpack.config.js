const path = require("path");

module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts',
      '.react.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // Transform all .js or .ts files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
};