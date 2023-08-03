const nodeExternals = require('webpack-node-externals');
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: { main: './src/index.ts' },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js', // <-- Important
    libraryTarget: 'this' // <-- Important
  },
  target: 'node', // <-- Important
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: [nodeExternals()] // <-- Important
};