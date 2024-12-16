const path = require('node:path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '..', 'client', 'index.js'),
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
