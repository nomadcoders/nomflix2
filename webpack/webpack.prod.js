const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  output: path.resolve(__dirname, "../dist")
};

module.exports = {
  mode: "production",
  output: {
    path: PATHS.output,
    filename: "[name].js"
  },
  plugins: [new CleanWebpackPlugin(PATHS.output, { root: process.cwd() })]
};
