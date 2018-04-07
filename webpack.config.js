const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: [HtmlWebpackPluginConfig, new FriendlyErrorsWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};
