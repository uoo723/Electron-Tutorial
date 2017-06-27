'use strict';

const path = require('path');
const webpack = require('webpack');
// const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

module.exports = {
    // target: 'electron-main',
    entry: {
        app: ['webpack/hot/dev-server', './src/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/dist/'
    },
    devServer: {
        contentBase: './dist',
        publicPath: 'http://localhost:8080/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader'},
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
