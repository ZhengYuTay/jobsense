const path = require("path");
const webpack = require("webpack");

const root = process.cwd();
const src = path.join(root, "src");
const server = path.join(root, "server");

module.exports = {
  name: "server",
  target: "node",
  devtool: "eval",
  entry: path.resolve(__dirname, "../server/render.js"),
  output: {
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [src, server],
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "css-loader/locals",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".css"],
    modules: [src, "node_modules"]
  },
  plugins: [
    // REQUIRED: To make dynamic css work correctly
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
