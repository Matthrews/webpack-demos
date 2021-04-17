const path = require("path");
// const { AggressiveMergingPlugin } = require("../../").optimize;
const {optimize} = require('webpack');
const {AggressiveMergingPlugin} = optimize;

module.exports = {
    // mode: "development" || "production",
    entry: {
        pageA: "./pageA",
        pageB: "./pageB",
        pageC: "./pageC"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        // 手动配置内置插件AggressiveMergingPlugin
        new AggressiveMergingPlugin({
        	minSizeReduce: 1.5
        })
    ],
    optimization: {
        // To keep filename consistent between different modes (for example building only)
        chunkIds: "deterministic",
        minimize: true
    }
};
