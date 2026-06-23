const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true,
  },
  // 👇 AGREGA ESTA SECCIÓN AQUÍ
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 3000,
    open: true, // Abre el navegador automáticamente
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imagenes/[name][ext]'
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/styles.css' }),
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' }),
    new HtmlWebpackPlugin({ template: './src/categorias.html', filename: 'categorias.html' }),
    new HtmlWebpackPlugin({ template: './src/tutoriales.html', filename: 'tutoriales.html' }),
    new HtmlWebpackPlugin({ template: './src/registro.html', filename: 'registro.html' }),
    new HtmlWebpackPlugin({ template: './src/tutoriales/looknoche.html', filename: 'tutoriales/looknoche.html' }),
    new HtmlWebpackPlugin({ template: './src/tutoriales/skincare.html', filename: 'tutoriales/skincare.html' }),
  ],
};