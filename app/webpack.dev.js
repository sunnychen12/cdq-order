const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const getPluginsConfig = require('./plugins');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
	port: 9999,
    host:'localhost'
  },
  plugins: getPluginsConfig()
});
