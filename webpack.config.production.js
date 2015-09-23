var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './lib/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_URL': process.env.API_URL || 'http://api.freshfoodconnect.org'
      },
      '__DEVTOOLS__': false,
      '__CLIENT_HOST__': '"https://www.freshfoodconnect.org"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'Fresh Food Connect',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets/images/favicon.ico')
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: '404.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader')},
      {test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/}
    ]
  },
  cssnext: {
    browsers: 'last 2 versions',
    plugins: [
      require('postcss-nested')
    ]
  }
};
