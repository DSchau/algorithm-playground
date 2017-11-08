const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ env }) => ({
  devtool: 'source-map',
  entry: {
    bundle: ['./src/index']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.join(__dirname, 'public/index.html')
    })
  ]
});
