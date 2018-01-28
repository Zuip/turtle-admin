var webpack = require('webpack');

module.exports = {
  entry: './ui-src/js/app.js',
  devtool: 'source-map',
  output: {
    filename: './public/app.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
         loader: 'babel-loader',
         query: {
             presets: ['es2015']
         }
  	  }
    ]
  }
}
