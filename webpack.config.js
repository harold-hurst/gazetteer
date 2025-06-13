const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Set the entry point to your HTML file
  entry: './index.html',  // Change this path as needed

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),  // Folder to store bundled files
    filename: 'bundle.js',  // Output JS bundle file
  },

  // Configure modules (loaders) to process different file types
  module: {
    rules: [
      {
        test: /\.css$/,  // Handle .css files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,  // Handle .html files
        use: {
          loader: 'html-loader',  // This loader will handle HTML files
          options: { minimize: true },  // Minify HTML for production
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,  // Handle image files
        use: ['file-loader'],
      },
    ],
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Use this HTML as the template
      inject: 'body',  // Inject the JS bundle at the bottom of the body tag
    }),
  ],

  // Development configuration
  mode: 'development',  // Change to 'production' for production builds
};
