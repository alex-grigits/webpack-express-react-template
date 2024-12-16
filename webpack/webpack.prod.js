const path = require('node:path');
const zlib = require('node:zlib');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'client', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  stats: 'normal',
});
