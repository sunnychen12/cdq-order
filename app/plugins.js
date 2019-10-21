const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getChildrenDir = require('./src/common/getChildrenDir');

let pages = getChildrenDir(path.join(__dirname, './src/pages'));

let pluginsArray=[];
pluginsArray.push(new CleanWebpackPlugin());
pluginsArray.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "static/css/[name].css"
}));
pluginsArray.push(new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, './src/static'),
        to: 'static',
        ignore: ['.*']
    }
]));


function getPluginsConfig(){
    console.log(process.env.NODE_ENV);
    pages.forEach(function(page){
        pluginsArray.push(
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                inject: process.env.NODE_ENV=='development',
                template: './src/pages/'+page+'/index.html',
            })
        )
        /*if(type=='development'){
            pluginsArray.push(
                new HtmlWebpackPlugin({
                    filename: `${page}.html`,
                    template: './src/pages/'+page+'/index.html',
                })
            )
        }
        else{
            pluginsArray.push(
                new HtmlWebpackPlugin({
                    filename: `${page}.html`,
                    inject:false,
                    template: './src/pages/'+page+'/index.html',
                })
            )
        }*/
    });

    return pluginsArray
}

module.exports=getPluginsConfig;
