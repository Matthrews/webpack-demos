import { a } from "./a"; // 直接引入
import App from "./App.jsx";

const b = import("./b"); // 动态引入，也按需加载

console.log(App);

const hi = () => {
  console.log("matthew");
  console.log(a);
  console.log(b);
  console.log(Promise.resolve("trst promise"));
};

hi();

const msg = "hello";

console.log("Message", msg);
