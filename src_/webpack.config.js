module.exports = {
  entry: {
      'image_carousel': './image_carousel-src.js'
  },
  output : {
    filename: '../build/public/lib/[name].js'
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
