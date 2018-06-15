var webpack = require('webpack');

module.exports = {
  entry: './ui-src/js/app.js',
  devtool: 'source-map',
  output: {
    filename: './public/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
         loader: 'babel-loader',
         query: {
             presets: ['es2015']
         }
  	  },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  }
}
