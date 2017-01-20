const path = require('path');
const webpack = require('webpack');
const IS_PROD = process.argv.indexOf('-p') > -1;
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const StringReplacePlugin = require('string-replace-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const TOKENS = {
  VERSION: JSON.stringify(require('./package.json').version).replace(/['"]+/g, '')
};

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './demo/entry.ts',
  output: {
    filename: 'demo.js',
    path: IS_PROD ? './demo' : '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: /node_modules/
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
    extensions: ['.ts', '.js'],
    alias: {
      'angular-stormpath$': path.resolve(__dirname, 'src/index.ts')
    }
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo',
    proxy: [
      {
        context: [
          '/forgot',
          '/login',
          '/logout',
          '/me',
          '/oauth',
          '/register'
        ],
        target: 'http://localhost:3000',
        secure: false
      }
    ]
  },
  plugins: [
    new TsConfigPathsPlugin(),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    ),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
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

function root(__path) {
  return path.join(__dirname, __path);
}
