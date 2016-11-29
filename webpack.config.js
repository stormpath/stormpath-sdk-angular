const webpack = require('webpack');
const IS_PROD = process.argv.indexOf('-p') > -1;

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './demo/entry.ts',
  output: {
    filename: 'demo.js',
    path: IS_PROD ? './demo' : ''
  },
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint-loader?emitErrors=false&failOnHint=false', exclude: /node_modules/
    }],
    loaders: [
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
    extensions: ['', '.ts', '.js']
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
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development'),
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
