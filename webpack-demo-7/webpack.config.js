const path = require("path");

module.exports = {
    // mode: "development" || "production",
    entry: {
        pageA: "./pageA",
        pageB: "./pageB",
        pageC: "./pageC"
    },
    optimization: {
        chunkIds: "named",
        splitChunks: {
            // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。
            // 但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置
            cacheGroups: {
                commons: {
                    // async(默认)  提取异步加载的模块到一个文件
                    // initial  提取异步和同步加载模块到不同文件
                    // all  提取异步和同步加载模块到一个文件
                    chunks: "initial",  // 决定要提取哪些模块
                    minChunks: 2,  // 模块最小引用数，超过才会被提取
                    maxInitialRequests: 5, // 入口点的最大并行请求数，默认30
                    minSize: 0 // 默认20kb(以 bytes 为单位)
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,  // 使用兼容不同平台的正则表达式
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    }
};
