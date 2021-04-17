/**
 * 导出一个返回 Promise 的函数
 * @param env
 * @param argv
 * @returns {Promise<unknown>}
 */
module.exports = function(env = {}, argv) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                // ...
            })
        }, 5000)
    })
}