if (process.env.NODE_ENV === 'production') {
  var express = require('express'),
      port = (process.env.PORT || 8080),
      app = express()

  app.use(express.static(__dirname + '/dist'))

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.listen(port, () => {
    console.log('Our app is running on port ' + port)
  })
} else {
  var path = require('path')
  var webpack = require('webpack')
  var WebpackDevServer = require('webpack-dev-server')
  var config = require('./webpack.config')

  new WebpackDevServer(webpack(config), {
    contentBase: path.join(__dirname, './dist'),
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(4000, 'localhost', function (err) {
    if (err) console.log(err)
    console.log('Listening at localhost:4000')
})
}
