const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    main: './main.js',
    dev: [
     'webpack/hot/dev-server',
     'webpack-dev-server/client?http://localhost:8080',
   ]
  },

  output:{
    filename:"[name]-bundle.js",
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(frag|vert)$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
