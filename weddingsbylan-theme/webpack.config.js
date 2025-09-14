const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  output: {
    filename: '[name].[contenthash].js', // [name] sẽ tương ứng với key trong entry
    path: path.resolve(__dirname, 'dist'),
    clean: true, // tự động xóa file cũ
    publicPath: '/' // Đặt publicPath nếu cần thiết, ví dụ khi deploy lên server
  },
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, // hoặc 'style-loader' nếu muốn nhúng trực tiếp vào HTML
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false // Tắt xử lý tự động của html-loader
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash][ext][query]'
        }
      }
    ]
  },
  // Multiple entry points
  entry: {
    home: './src/pages/home/index.js',
    photography: './src/pages/photography/index.js'
    // services: './src/pages/services/index.js',
    // contact: './src/pages/contact/index.js'
  },
  plugins: [
    // Tạo HTML cho từng trang
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/photography/index.html',
      filename: 'photography.html',
      chunks: ['photography']
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/services/services.html',
    //   filename: 'services.html',
    //   chunks: ['services']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/pages/contact/contact.html',
    //   filename: 'contact.html',
    //   chunks: ['contact']
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'), // hoặc đơn giản là: to: 'public'
          noErrorOnMissing: true
        }
      ]
    })
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
        serveIndex: true // Cho phép serve index.html từ public
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/'
      }
    ],
    port: 8080,
    // open: true, // Chỉ cần open: true, không cần target
    hot: true,
    historyApiFallback: false // Tắt historyApiFallback để không redirect
  },
  mode: 'development' // đổi sang 'production' khi build thật
}
