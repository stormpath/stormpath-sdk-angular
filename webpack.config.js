const path = require('path');
const webpack = require('webpack');
const IS_PROD = process.argv.indexOf('-p') > -1;
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './demo/entry.ts',
  output: {
    filename: 'demo.js',
    path: IS_PROD ? './demo' : ''
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
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo',
    proxy: {
      '/forgot': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/login': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/logout': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/me': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/register': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    ),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development'),
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        }
      }
    })
  ]
};

function root(__path) {
  return path.join(__dirname, __path);
}
