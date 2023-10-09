const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js', // entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', // bundled/output file
  },
  debug: true,
  devtool: 'inline-source-map', // source map
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
}

