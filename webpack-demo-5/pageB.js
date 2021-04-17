// const b = require('./b.js');
// const common = require('./common.js')
//
// common(b)


require(["./common"], function(common) {
    common(require("./b"));
});
