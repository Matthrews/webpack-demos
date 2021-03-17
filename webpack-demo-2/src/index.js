import { a } from "./a"; // 直接引入
const b = import("./b"); // 动态引入，也按需加载

const hi = () => {
  console.log("matthew");
  console.log(a);
  console.log(b);
  console.log(Promise.resolve("trst promise"));
};

hi();

console.log("Message", msg);
