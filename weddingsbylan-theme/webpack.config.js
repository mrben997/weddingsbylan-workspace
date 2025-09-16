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
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
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
  // Entry point chính cho React app
  entry: {
    main: './src/index.tsx'
  },
  plugins: [
    // HTML file chính cho React app
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/index.html'] // Ignore index.html since HtmlWebpackPlugin handles it
          }
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
    historyApiFallback: true // Bật để hỗ trợ React Router
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  mode: 'development' // đổi sang 'production' khi build thật
}
