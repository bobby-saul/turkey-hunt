module.exports = {
  entry: "./src/js/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: __dirname + "/www/",
    filename: "app.js",
  },
  devServer: {
    open: true,
    hot: false,
    static: {
      directory: __dirname + "/www",
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
