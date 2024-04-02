const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let mode = "development";
 
if (process.env.NODE_ENV === "production") {
  mode = "production";
}
 
module.exports = {
  mode: mode,
  entry: {
    'bundle-invoice': './src/index',
    'styles-invoice': './Content/style.scss',
  },
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: '../../Content/fonts/',
      //     },
      //   }],
      // },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules\/!(framework-ui-components|framework-plugins)/],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 9090,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8081",
        // pathRewrite: { "^/api": "/api/" },
      },
    ],
    static: [
      {
        directory: path.join(__dirname, '/'),
        serveIndex: true,
        watch: true,
      },
    ],
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true,
    },
  },
};