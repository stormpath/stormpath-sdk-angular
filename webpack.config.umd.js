const path = require('path');
const webpack = require('webpack');
const IS_PROD = process.argv.indexOf('-p') > -1;
const StringReplacePlugin = require('string-replace-webpack-plugin');
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const TOKENS = {
  VERSION: JSON.stringify(require('./package.json').version).replace(/['"]+/g, '')
};
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist', 'umd'),
    filename: './stormpath-sdk-angular.js',
    libraryTarget: 'umd',
    library: 'Stormpath'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
      },
      /* Replace version from package.json */
      {
        test: /\.config.ts$/,
        loader: StringReplacePlugin.replace({
          replacements: [{
            pattern: /\${(.*)}/g,
            replacement: function (match, p1, offset, string) {
              return TOKENS[p1];
            }
          }]
        })
      },
      /* Embed files. */
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader',
        exclude: /\.async\.(html|css)$/
      },
      /* Async loading. */
      {
        test: /\.async\.(html|css)$/,
        loaders: ['file?name=[name].[hash].[ext]', 'extract']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development'),
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    // the LoaderOptionsPlugin is necessary to configure tslint, but causes issues with StringReplacePlugin
    // https://github.com/wbuchwalter/tslint-loader/issues/38
    /*new LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        }
      }
    }),*/
    new StringReplacePlugin()
  ]
};
