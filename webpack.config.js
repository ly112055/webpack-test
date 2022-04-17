// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// const webpack = require('webpack');
// const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const ESLintPlugin = require('eslint-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { webpack } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ESLintPlugin from 'eslint-webpack-plugin';

const config = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {},
      }),
    ],
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
    // alias: {
    //   "@images": path.resolve(__dirname, "src/assets/images"),
    // },
  },
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'), // 指定入口文件
  output: {
    // 打包后输出的目录
    path: path.resolve(__dirname, 'dist'),
    // filename: "my-webpack.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                require.resolve('@babel/preset-react'),
                [require.resolve('@babel/preset-env', { modules: false })],
              ],
              cacheDirectory: true, // 编译时加缓存
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html', // 打包后生成的文件名
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新
    new BundleAnalyzerPlugin(),
    new ESLintPlugin({
      fix: true, // 启动自动修复
      extensions: ['js', 'json', 'coffee'], // 指定需要检查的扩展名
      exclude: '/node_modules/',
    }),
  ],
  devServer: {
    port: 8088,
    hot: true,
  },
};

module.exports = config;
