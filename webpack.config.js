module.exports = {
  entry: {
    'display-ui': './src/display-ui-src.js',
    pdfviewer: './src/pdfviewer.js'
  },
  output: {
    filename: './build/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
