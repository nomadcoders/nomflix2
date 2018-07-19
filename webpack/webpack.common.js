const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const MODE = process.env.npm_lifecycle_event;

const PATHS = {
  entry: path.join(__dirname, "../src/index.js")
};

const commonConfig = {
  entry: ["babel-polyfill", PATHS.entry],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html"
    })
  ]
};

if (MODE === "dev") {
  module.exports = Object.assign({}, commonConfig, devConfig);
} else if (MODE === "build") {
  module.exports = Object.assign({}, commonConfig, prodConfig);
}
