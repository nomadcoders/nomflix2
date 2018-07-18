const path = require("path");

module.exports = {
  entry: "./index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "awesome-output.js"
  }
};
