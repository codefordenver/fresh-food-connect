var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './lib/index'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"', // want this to still be a string after webpack replaces the value
        'USE_LOCAL_SERVER': process.env.USE_LOCAL_SERVER || false
      },
      '__DEVTOOLS__': true, // <-- disables / enables redux-debugging-sidebar
      '__CLIENT_HOST__': '"http://localhost:4000"'
    }),
    new ExtractTextPlugin('app.css', {allChunks: true}),
    new HtmlWebpackPlugin({
      title: 'Fresh Food Connect',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
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
