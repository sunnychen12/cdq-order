const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    entry: {
        main: './src/main.js'
    },

    module: {
        noParse: /node_modules\/(jquey\.js)/,
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            //publicPath: 'images/'
                        }
                    }, 'css-loader', 'postcss-loader', //具体配置看postcss.config.js
                    'less-loader'
                ]
            }, //模板引擎
            {
                test: /.*-bg\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            outputPath: 'images/',
                            name:'[name].[ext]?[hash:5]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)(.*)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,

                            outputPath: 'font/icocustom/',
                            emitFile:false,//不生成文件
                            name:'[name].[ext]?[hash:5]'
                        }
                    }
                ]
            },
            {
                test: /\.(art)$/,
                exclude: /node_modules/,
                loader: 'underscore-template-loader',
                query: {
                    //attributes: ['img:src', 'img:data-large-img']
                    attributes: []//不处理图片
                }
            }
        ],
    },
    watchOptions:{
        poll:500,//监测修改的时间(ms)
        aggregateTimeout:500, //防止重复按键，500毫米内算按键一次
        //ignored:['projects/**/dist/**', 'node_modules']///不监测
        ignored:['node_modules']///不监测
    },
    optimization: {
        minimizer:[
            new OptimizeCSSAssetsPlugin()
        ]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
};