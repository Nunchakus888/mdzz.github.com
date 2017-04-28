/**
 * Created by Administrator on 2017/4/28.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './app.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist/assets'),
        publicPath: '/assets',
    },
    module: {
        rules: [
            {
                test: /\.js$/,//排除指定的文件目录里的js文件 /^((?!my_legacy_code).)*\.js$/ 剩余的(js文件)则由 Babel 处理.
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }

        ],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,//任何一个模块在 output 文件中被加载 2 次及以上, 该模块就会被打包在 common.js
        }),
    ],

    devServer: {//开发服务器
        contentBase: path.resolve(__dirname, './src'),  // New
        port: 9998
    },
}