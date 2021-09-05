const webpack = require("webpack");

module.exports = (env) => {
  return {
    mode: "production",
    entry: "./index.js",
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: process.env.NODE_ENV === "debug",
      }),
    ],
  };
};
