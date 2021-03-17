module.exports = {
  extends: ["react-app"],
  rules: {
    // 2报错
    "react/jsx-uses-react": [2],
    // 提示要在JSX中手动引入React
    "react/react-in-jsx-scope": [2],
  },
};
