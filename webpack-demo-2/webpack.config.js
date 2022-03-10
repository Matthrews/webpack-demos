const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  plugins: [new ESLintPlugin({ extensions: [".js", ".jsx", ".ts", ".tsx"] })],
  resolve: {
    alias: {
      // "@": path.join(__dirname, "src/"), // 最好用绝对路径 或者resolve(__dirname, "./src/")
      "@": path.resolve(__dirname, "./src/components/"),
    },
  },
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
