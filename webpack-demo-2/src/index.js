// import { a } from "@/a"; // 直接引入
import App from "./App.jsx";

import { str } from "./ts_demo.ts";

import { Demo } from "./tsx_demo.tsx";

import DemoA from "@/Demo.tsx";
import ss from "@/c.tsx";

console.log("TSX", Demo);

console.log("测试Alias", DemoA, ss);

const b = import("./b"); // 动态引入，也按需加载

console.log(App);

console.log(str);

const hi = () => {
  console.log("matthew");
  // console.log(a);
  console.log(b);
  console.log(Promise.resolve("test promise"));
};

hi();

const msg = "hello";

console.log("Message", msg);
