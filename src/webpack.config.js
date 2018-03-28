var path = require('path');

module.exports = {
  entry: {
      'selector': './selector-src.js',
      'navbar' : './navbar-src.js',
      'menu' : './menu-src.js',
      'image-carousel' : './image-carousel-src.js',
      'fullscreen-image-slider' : './fullscreen-image-slider-src.js'
  },
  output : {
    path: path.join(__dirname, '../web_resources/js/lib/'),
    publicPath: '../resources/js/lib/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
