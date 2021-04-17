const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * 导出一个 Function 的配置
 * @param env
 * @param argv
 * @returns {{devtool: (undefined|string), plugins: []}}
 */
module.exports = function (env = {}, argv) {
    const plugins = [];

    const isProduction = env['production'];

    // 在生成环境才压缩
    if (isProduction) {
        plugins.push(
            // 压缩输出的 JS 代码
            new UglifyJsPlugin()
        )
    }

    return {
        plugins: plugins,
        // 在生成环境不输出 Source Map
        devtool: isProduction ? undefined : 'source-map',
    };
}