const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const getPluginsConfig = require('./plugins');

module.exports = merge(common, {
  mode: 'production',
  plugins: getPluginsConfig()
});
