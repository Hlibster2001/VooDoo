// const path = require('path')
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index.js',
//     clean: true
//   },
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'src'),
//     },
//     port: 3000,
//     open: true,
//     hot: true,
//     compress: true,
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "src/index.html",
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         include: path.resolve(__dirname, 'src'),
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
//       {
//         test: /\.html$/,
//         loader: "html-loader",
//       },
//     ],
//   },
// }

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
};
