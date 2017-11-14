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
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'src/algorithms/index')
        ],
        use: ['babel-loader'],
        exclude: [
          path.join(__dirname, 'src/Worker')
        ]
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src/Worker'),
        use: ['worker-loader', 'babel-loader']
      },
      {
        test: /\.js$/,
        use: ['raw-loader'],
        include: path.join(__dirname, 'src/algorithms'),
        exclude: path.join(__dirname, 'src/algorithms/index')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff2?/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
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
