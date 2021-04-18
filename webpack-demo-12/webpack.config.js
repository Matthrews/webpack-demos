var path = require('path');

module.exports = {
    // mode: "development || "production",
    entry: {
        bundle: "./example",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    externals: {
        react: 'react',
        lodash : {
            commonjs: "lodash",
            amd: "lodash",
            root: "_" // 指向全局变量
        }
    },
    optimization: {
        chunkIds: "deterministic"
    }
};
