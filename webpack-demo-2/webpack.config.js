const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [new ESLintPlugin({ extensions: [".js", ".jsx"] })],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader?cacheDirectory=true",
          options: {
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-react", { runtime: "classic" }],
              ["@babel/preset-typescript"],
            ],
          },
        },
      },
    ],
  },
};
