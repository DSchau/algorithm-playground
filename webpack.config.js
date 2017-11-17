const path = require('path');
const webpack = require('webpack');
const assign = require('webpack-config-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig({ environment } = {}) {
  const base = {
    devtool: 'source-map',
    entry: {
      bundle: ['./src/index'],
      vendor: ['react', 'react-dom', 'codemirror']
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
            /\.worker.js$/,
            'proxy-polyfill'
          ]
        },
        {
          test: /\.worker\.js$/,
          include: path.join(__dirname, 'src'),
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
        template: 'public/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(environment)
      })
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom'
    },
    stats: {
      children: false
    }
  };

  return assign(base, require(`./webpack.config.${environment}`));
};
