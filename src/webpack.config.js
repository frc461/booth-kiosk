var path = require('path');

module.exports = {
  entry: {
      'image_carousel': './image_carousel-src.js',
      'home' : './home-src.js',
      'fullscreen_pdf' : './fullscreen_pdf-src.js',
      'overlay' : './overlay-src.js',
      'video' : './video-src.js',
      'composer' : './composer-src.js'
  },
  output : {
    path: path.join(__dirname, '../build/public/lib/'),
    publicPath: '../build/public/lib/',
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
