
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-sourcemap',
    context: __dirname,
    entry: __dirname+"/src/_js/index.js",
    output: {
        path: "./build/js/",
        publicPath: '/',
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