const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options.js',
    popup: './src/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  externals: {
    ramda: 'R'
  },
  module: {},
  devtool: 'source-map'
};
