const { override, addWebpackPlugin } = require('customize-cra')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { aliasDangerous, configPaths } = require('react-app-rewire-alias/lib/aliasDangerous')
 
module.exports = override(
  addWebpackPlugin(new ImageminWebpWebpackPlugin()),
  aliasDangerous(configPaths('./tsconfig.paths.json'))
)