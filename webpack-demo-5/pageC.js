// const a = require('./a.js');
// const b = require('./b.js')
//
// console.log(a + b);

require(["./a"], function(a) {
    console.log(a + require("./b"));
});
