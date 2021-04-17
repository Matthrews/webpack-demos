/**
 * 导出多份配置
 * Webpack 3.1.0 版本才开始支持
 * 以上配置会导致 Webpack 针对这三份配置执行三次不同的构建
 * @type {({}|(function(): {})|(function(): *))[]}
 */
module.exports = [
    // 采用 Object 描述的一份配置
    {
        // ...
    },
    // 采用函数描述的一份配置
    function () {
        return {
            // ...
        }
    },
    // 采用异步函数描述的一份配置
    function () {
        return Promise();
    }
]