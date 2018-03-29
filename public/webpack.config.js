
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "inline-sourcemap",
  context: __dirname,
  entry: [__dirname + "/src/_js/index.js", __dirname + "/src/_sass/app.scss"],
  output: {
    path: __dirname + "/build/",
    publicPath: "/",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015"]
        }
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              outputPath:"/css/"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.css",
      disable: false,
      allChunks: true
    })
  ]
};