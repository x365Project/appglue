const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputDirectory = 'dist';

module.exports = {
    entry: [
        './src/index.ts'
    ],
    output: {
        path: path.join(__dirname, outputDirectory),
        libraryTarget: 'umd',
        filename: './index.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory])
    ],
};
