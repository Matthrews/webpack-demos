const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  plugins: [new ESLintPlugin({ extensions: [".js", ".jsx", ".ts", ".tsx"] })],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import '~@/common.scss';`,
              sassOptions: { includePaths: [__dirname] },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
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
