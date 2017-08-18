
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-sourcemap',
    context: __dirname,
    entry: "./src/js/index.js",
    output: {
        path: "./build/js/",
        publicPath: '/build/js/',
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}