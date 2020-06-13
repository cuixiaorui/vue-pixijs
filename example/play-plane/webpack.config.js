
const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: path.resolve(__dirname,"./index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
              outputPath:"images"
            }
          },
        ],
      },
    ],
  },
};
