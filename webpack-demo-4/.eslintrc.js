module.exports = {
  extends: ["react-app"], // 检查js和jsx
  rules: {
    // 2报错
    "react/jsx-uses-react": [2],
    // 提示要在JSX中手动引入React
    "react/react-in-jsx-scope": [2],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      // tsconfig.json不写会报错
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: ["airbnb-typescript"],
      rules: {
        "@typescript-eslint/object-curly-spacing": [0],
        "import/prefer-default-export": [0],
        "linebreak-style": [0, "error", "window"],
        "@typescript-eslint/quotes": [0], // 单双引号无所谓
        "no-console": [0]
      },
    },
  ],
};
