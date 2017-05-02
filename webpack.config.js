/**
 * Created by Administrator on 2017/4/28.
 */
const path = require('path');
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/assets',
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
        new webpack.BannerPlugin('This file is create by Roidder'),//文件头部出现了我们指定的注释信息
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,//任何一个模块在 output 文件中被加载 2 次及以上, 该模块就会被打包在 common.js
        }),

        //创建一个htmlWebpackPlugin对象，并传入值
        /*new htmlWebpackPlugin({
            template: 'index.html', //生成html文件的模板文件
            filename: 'index.html', //目标文件的名称
            inject: false,  //插入html文档中的位置，value分别为 true，false，head，body
            title: 'mdzz~~~', // 传入的html的title
            // excludeChunks: ['b', 'c'] // 引入的除b.js 与c.js以外的js文件
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'b.html',
            inject: false,
            title: 'this is b.html',
            excludeChunks: ['a', 'c']
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'c.html',
            inject: false,
            title: 'this is c.html',
            excludeChunks: ['a', 'b']
        })*/
    ],

    devServer: {//开发服务器
        contentBase: path.resolve(__dirname, './src'),  // New
        port: 8888
    },
}