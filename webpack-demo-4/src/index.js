import "./index.scss";

import name from "@/a";
import {str} from "./ts_demo.ts";

import {Demo} from "./tsx_demo.tsx";

const {b} = import('./b')  // 动态加载, 按需引入

console.log('import测试', b);

console.log('TS测试', str);

console.log('TSX测试', Demo);


const hi = () => {
    console.log(name);
    console.log('Promise', Promise.resolve("test promise"));
};

hi();
