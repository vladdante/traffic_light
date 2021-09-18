const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env = {}) => ({
  context: path.resolve(__dirname, 'src'),
  mode: env.production ? 'production' : 'development',
  entry: { app: './app.js' },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:6].bundle.js",
    publicPath: process.env.BASE_URL,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.production }
          },
          'css-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src/public'),
    publicPath: process.env.BASE_URL,
    index: './index.html',
    hot: true,
    stats: 'minimal',
    quiet: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
  }
})
