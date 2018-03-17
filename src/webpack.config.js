var path = require('path');

module.exports = {
  entry: {
      'selector': './selector-src.js'
  },
  output : {
    path: path.join(__dirname, '../resources/js/lib/'),
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
