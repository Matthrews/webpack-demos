import "./index.scss";
import React from "react";

import name from "@/a";
import {str} from "./ts_demo.ts";

import {shared} from "@/shared";

import {Demo} from "./tsx_demo.tsx";

console.log('React', React)

console.log('shared', shared)

import('./b').then(({b}) => {
    console.log('import测试', b);
}).catch(err => {
    console.log('import测试', err);
})

console.log('TS测试', str);

console.log('TSX测试', Demo);


const hi = () => {
    console.log(name);
    console.log('Promise', Promise.resolve("test promise"));
};

hi();

console.log('欢迎来到前台页面！')
