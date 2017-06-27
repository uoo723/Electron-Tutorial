'use strict';

const path = require('path');
const webpack = require('webpack');
// const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

module.exports = {
    // target: 'electron-main',
    entry: {
        app: ['webpack/hot/dev-server', './src/index.js'],
        // main: './main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/dist/'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
            }
        ]
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
