const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  entry: "./src/client/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    libraryTarget: "var",
    library: "EntryPoint",
    publicPath: "/",
  },

  externals: {
    fs: "commonjs fs",
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./public",
  },
};
