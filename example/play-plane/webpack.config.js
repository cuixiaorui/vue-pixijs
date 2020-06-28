const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const base = process.env.NODE_ENV === "production" ? "./" : "./";

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    publicPath: base,
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              publicPath: base + "/images",
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
