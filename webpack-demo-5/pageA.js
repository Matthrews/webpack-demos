// const a = require('./a.js');
// const common = require('./common.js')
//
// common(a)

require(["./common"], function(common) {
    common(require("./a"));
});
