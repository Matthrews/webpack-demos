---
date: 2021-04-17

author: matthew

tag: webpack, example

source: https://github.com/webpack/webpack

---

## Webpack4 官方案例解读

[TOC]

> 注：从 webpack-demo-5 开始为官方案列，官方案列在 webpack/examples 里

### Aggressive Merging 高效合并

1. 通过内置插件 AggressiveMergingPlugin 实现

2. 原理：从不同合并代码组合中寻找最优组合，指标为组合转化比：improvement = (aSize + bSize) / abSize，很明显，越大说明此种组合最优

3. 核心源码(部分删减)

```js
  apply(compiler) {
    const options = this.options;
    const minSizeReduce = this.options.minSizeReduce || 1.5;

    compiler.hooks.thisCompilation.tap(
      "AggressiveMergingPlugin",
      compilation => {
        compilation.hooks.optimizeChunks.tap(
          {
            name: "AggressiveMergingPlugin",
            stage: STAGE_ADVANCED
          },
          chunks => {
            const chunkGraph = compilation.chunkGraph;
            /** @type {{a: Chunk, b: Chunk, improvement: number}[]} */
            let combinations = [];
            for (const a of chunks) {
              // if (a.canBeInitial()) continue;
              for (const b of chunks) {
                // if (b.canBeInitial()) continue;
                // if (b === a) break;
                // if (!chunkGraph.canChunksBeIntegrated(a, b)) {continue;}
                const aSize = chunkGraph.getChunkSize(b, {chunkOverhead: 0});
                const bSize = chunkGraph.getChunkSize(a, {chunkOverhead: 0});
                const abSize = chunkGraph.getIntegratedChunksSize(b, a, {chunkOverhead: 0});
                const improvement = (aSize + bSize) / abSize;
                combinations.push({a, b, improvement});
              }
            }

            combinations.sort((a, b) => {
              return b.improvement - a.improvement;
            });

            const pair = combinations[0];

            console.log('得到最终提高率最大的chunk', pair)

            if (!pair) return;
            if (pair.improvement < minSizeReduce) return;

            chunkGraph.integrateChunks(pair.b, pair.a);
            compilation.chunks.delete(pair.a);
            return true;
          }
        );
      }
    );
  }
```

4. production 模式下，该内置插件会生效，默认的 minSizeReduce 值为 1.5，当然我们也可以手动配置该插件
   以下分别为开发模式下未配置该插件，开发模式下配置该插件，生产模式下打包后截图(注：生产模式下不止这一个内置插件起作用)
   ![开发模式下未配置该插件打包](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-5/imgs/%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F%E4%B8%8B%E6%9C%AA%E9%85%8D%E7%BD%AE%E8%AF%A5%E6%8F%92%E4%BB%B6.png)
   ![开发模式下配置该插件打包](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-5/imgs/%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F%E4%B8%8B%E9%85%8D%E7%BD%AE%E8%AF%A5%E6%8F%92%E4%BB%B6.png)
   ![生产模式下打包](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-5/imgs/%E7%94%9F%E4%BA%A7%E6%A8%A1%E5%BC%8F%E4%B8%8B.png)

5. 源代码 [webpack-demo-5](https://github.com/Matthrews/webpack-demos)

### Chunk 数据块

#### chunkhash 数据块哈希

1. 通过`optimization.runtimeChunk`配置，原理是将入口文件里的仅含 runtime 的文件(`runtime~main.xx.js`)单独打包出来，这样就可以充分对入口文件`main.js`进行长期缓存，而多出来的`runtime`文件可以通过`inline`的方式插入`html`，这样在请求数不变的基础上还实现了长期缓存。

2. 先看看配置前的状况
   ![使用runtimeChunk之前](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-6/imgs/%E4%BD%BF%E7%94%A8runtimeChunk%E4%B9%8B%E5%89%8D.png)

显然我们可以发现，当我们修改`acyns1.js`(打包结果为`114.xx.js`文件)之后，因为入口文件(此处为`main.xx.js`文件)引入了`acyns1.js`文件，所以当`acyns1.js`文件发生变化时，`main.xx.js`文件也会修改，这意味着重新发起请求，那么是否可以实现修改`acyns1.js`只会引起本文件 hash 值修改而不会影响到`main.xx.js`文件呢？答案是肯定的。

3. 配置`runtimeChunk`后`webpack.config.js`配置如下

   ```js
   module.exports = {
     // mode: "development || "production",
     entry: {
       main: "./example",
     },
     optimization: {
       runtimeChunk: true,
     },
     output: {
       path: path.join(__dirname, "dist"),
       filename: "[name].[chunkhash].js",
       chunkFilename: "[name].[chunkhash].js",
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: "./template.html",
       }),
       new ScriptExtHtmlWebpackPlugin({
         inline: /runtime~.+\.js$/, //正则匹配runtime文件名
       }),
     ],
   };
   ```

   通过`ScriptExtHtmlWebpackPlugin`插件完成 runtime 文件内联到 html 中，如下图

   ![内联js](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-6/imgs/%E5%86%85%E8%81%94js.png)

4. 再次修改`acyns1.js`文件后，打包截图如下

   ![使用runtimeChunk之后](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-6/imgs/%E4%BD%BF%E7%94%A8runtimeChunk%E4%B9%8B%E5%90%8E.png)

5. 源代码 [webpack-demo-6](https://github.com/Matthrews/webpack-demos)

#### common-chunk-and-vendor-chunk 公共数据块和三方数据块提取

1. 通过`optimization.splitChunks`配置，将公共的数据块和三方数据块抽离，减少入口文件大小

2. 从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks(或者内置插件 SplitChunksPlugin)

3. webpack 将根据以下条件自动拆分 chunks：

   - 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
   - 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
   - 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
   - 当加载初始化页面时，并发请求的最大数量小于或等于 30
   - 当尝试满足最后两个条件时，最好使用较大的 chunks。

4. 生产环境下内置 SplitChunksPlugin 默认配置如下

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

5. 以多页面为例，如下是各页面以及依赖模块

- `pageA`
  - `utility1`
  - `utility2`
- `pageB`
  - `utility2`
  - `utility3`
- `pageC`
  - `utility2`
  - `utility3`

6. 配置`splitChunks`后`webpack.config.js`配置如下

```js
module.exports = {
  // mode: "development" || "production",
  entry: {
    pageA: "./pageA",
    pageB: "./pageB",
    pageC: "./pageC",
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
          chunks: "initial", // 决定要提取哪些模块
          minChunks: 2, // 模块最小引用数，超过才会被提取
          maxInitialRequests: 5, // 入口点的最大并行请求数，默认30
          minSize: 0, // 默认20kb(以 bytes 为单位)
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 使用兼容不同平台的正则表达式
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
};
```

7. 配置前后打包如下图
   ![使用splitChunks提取公共部分](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-7/imgs/%E4%BD%BF%E7%94%A8splitChunks%E6%8F%90%E5%8F%96%E5%85%AC%E5%85%B1%E9%83%A8%E5%88%86.png)

8. 源代码 [webpack-demo-7](https://github.com/Matthrews/webpack-demos)

#### explicit-vendor-chunk

#### extra-async-chunk-advanced

#### extra-async-chunk

#### code-splitting-specify-chunk-name

#### named-chunks]

#### two-explicit-vendor-chunks

### Code Split

### Code Splitting

### Coffee Script

### CommonJS

### DLL

### Externals

### Harmony

### HTTP2 Aggressive Splitting

### Hybrid Routing

### Loader

### Mixed

### Multi Compiler

### Multi Part Library

### Multiple Entry Points

### Require Context

### Require Resolve

### Scope Hoisting

### Side Effects

### Source Map

### Web Worker

### Requests

### Building an Example
