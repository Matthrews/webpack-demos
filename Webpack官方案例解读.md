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

### Chunk 数据块 官方没起好名字，这一节讲的就是 Code Split

#### 基本的代码分割

参考：https://github.com/webpack/webpack/tree/master/examples/code-splitting

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
          minSize: 0, // 默认20kb(以 bytes 为单位)  不论大小，cacheGroup 被命中就缓存
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

#### explicit-vendor-chunk 暴露三方数据块为 DLL

1. 什么是 DLL
   使用过 Windows 系统的人应该会经常看到以 .dll 为后缀的文件，这些文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据。

要给 Web 项目构建接入动态链接库的思想，需要完成以下事情：

- 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
- 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
- 页面依赖的所有动态链接库需要被加载。

为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？
原因在于包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。
由于动态链接库中大多数包含的就是常用的第三方模块，例如 react、react-dom，只要不升级这些模块的版本，动态链接库就不用重新编译。

2. DllPlugin 和 DllReferencePlugin
   Webpack 已经内置了对动态链接库的支持，需要通过 2 个内置的插件接入，它们分别是：

- DllPlugin：用于打包出一个个单独的动态链接库文件。
- DllReferencePlugin：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。

通过引用 dll 的 manifest 文件来把依赖的名称映射到模块的 id 上，之后再在需要的时候通过内置的 `__webpack_require__` 函数来 `require`

通过这两个内置插件，可以做到拆分 bundles，提升构建速度

3. 使用插件前后打包如图
   ![前](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-8/imgs/before.png)
   ![后](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-8/imgs/after.png)

4. `webpack.config.js`配置如下

```js
module.exports = [
  {
    name: "vendor",
    // mode: "development || "production",
    entry: ["./vendor", "./vendor2"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "vendor.js",
      library: "vendor_[fullhash]",
    },
    plugins: [
      new webpack.DllPlugin({
        name: "vendor_[fullhash]",
        path: path.resolve(__dirname, "dist/manifest.json"),
      }),
    ],
  },

  {
    name: "app",
    // mode: "development || "production",
    dependencies: ["vendor"],
    entry: {
      pageA: "./pageA",
      pageB: "./pageB",
      pageC: "./pageC",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dist/manifest.json"),
      }),
    ],
  },
];
```

5. `manifest.json`如下

```json
{
  "name": "vendor_d5a5b2adcc613ffa868a",
  "content": {
    "./vendor2.js": {
      "id": 117,
      "buildMeta": {}
    },
    "./vendor.js": {
      "id": 965,
      "buildMeta": {}
    }
  }
}
```

6. 此外，DllPlugin 插件支持两种模式：作用于模式和映射模式，具体可以参考[DllPlugin](https://www.webpackjs.com/plugins/dll-plugin/)

7. 源代码 [webpack-demo-8](https://github.com/Matthrews/webpack-demos)

[官网举例](https://www.webpackjs.com/plugins/dll-plugin/)

#### code-splitting-specify-chunk-name 指定分割数据块名称

```js
import("./templates/foo" /* webpackChunkName: "chunk-foo" */).then(function (
  foo
) {
  console.log("foo:", foo);
});

require.ensure(
  [],
  function (require) {
    var foo = require("./templates/foo");
    console.log("foo:", foo);
  },
  "chunk-foo1"
);

require.ensure(
  [],
  function (require) {
    var bar = require("./templates/bar");
    console.log("bar:", bar);
  },
  "chunk-foo1"
);

var createContextVar = "r";
import(
  "./templates/ba" + createContextVar /* webpackChunkName: "chunk-bar-baz" */
).then(function (bar) {
  console.log("bar:", bar);
});
```

![打包截图](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-9/imgs/1.png)

源代码 [webpack-demo-9](https://github.com/Matthrews/webpack-demos)

#### 使用 bundle-loader 进行代码分割

1. 原理
   将 require 包裹在 require.ensure 的代码块中，实现按需加载,配置`lazy`可以实现懒加载

2. 使用

```js
// 当你引用 文件束 (bundle) 的时候，chunk 会被浏览器加载。
var waitForChunk = require("bundle-loader!./file.js");

// 为了等待 chunk 的加载完成 (而且为了拿到 exports 输出)
// 你需要异步去等待它
waitForChunk(function (file) {
  // 这里可以使用file，就像是用下面的代码require进来一样
  // var file = require("./file.js");
});
// 将 require 包裹在 require.ensure 的代码块中

// 当你引用文件束的时候，chunk 会被浏览器加载。如果你想它懒加载，请用：
var load = require("bundle-loader?lazy!./file.js");

// 文件束不会被加载，除非你调用了 call 函数
load(function (file) {});

// 你可能会给文件束设名称
require("bundle-loader?lazy&name=my-chunk!./file.js");
```

3. 使用`bundle-loader`前后打包截图
   ![bundle-loader](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-10/imgs/bundle-loader.png)

貌似作用不明显，而且使用`loader`之后`bundle`文件反而变大了，把`./file.js`换成`react`后很明显
![bundle-loader_react](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-10/imgs/bundle-loader_react.png)

4. 源代码 [webpack-demo-10](https://github.com/Matthrews/webpack-demos)

### 更优雅的代码分割——ES6

1. 使用

```js
import a from "a";

import("b").then(function (b) {
  console.log("b loaded", b);
});

function loadC(name) {
  return import("c/" + name);
}

Promise.all([loadC("1"), loadC("2")]).then(function (arr) {
  console.log("c/1 and c/2 loaded", arr);
});

async function getTemplate(templateName) {
  try {
    let template = await import(`./templates/${templateName}`);
    console.log(template);
  } catch (err) {
    console.error("template error");
    return new Error(err);
  }
}

getTemplate("foo");
getTemplate("bar");
getTemplate("baz");
```

2. 打包截图

![打包截图](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-11/imgs/import.png)

3. 源代码 [webpack-demo-11](https://github.com/Matthrews/webpack-demos)

### Externals

1. 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)

2. 用例

```js
// index.html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>

// webpack.config.js
externals: {
    react: 'react',
    lodash : {
        commonjs: "lodash",
        amd: "lodash",
        root: "_" // 指向全局变量
    }
}

// index.js
// 此时webpack解析到这里不会打包它
import _ from 'lodash';
import React from 'react';

console.log(_, React)

```

3. 使用 external 前后打包截图
   ![使用external前后打包截图](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-12/imgs/1.png)

4. 源代码 [webpack-demo-12](https://github.com/Matthrews/webpack-demos)

### HTTP2 Aggressive Splitting

1. webpack v5 中 AggressiveSplittingPlugin 已废弃，请使用 SplitChunksPlugin

**AggressiveSplittingPlugin 设计初衷**

1. AggressiveSplittingPlugin，用于将包分成多个较小的块以改善缓存。这最适合 HTTP2 Web 服务器，否则，请求数量增加会产生开销。

2. AggressiveSplittingPlugin 拆分每个块，直到达到指定的 maxSize。在此示例中，它尝试使用<50kB 的原始代码创建块，通常将其最小化为〜10kB。
   它按文件夹结构对模块进行分组，因为同一文件夹中的模块可能具有相似的重复文本，从而使它们高效地压缩在一起。它们也可能一起改变。

3. AggressiveSplittingPlugin 将其拆分记录在 webpack 记录中。下次运行时，它将尝试使用最后记录的拆分。
   由于一次运行与下一次运行之间对应用程序代码的更改通常仅在几个模块（或仅一个模块）中进行，因此，重新使用旧的拆分（以及可能仍在客户端缓存中的大块）非常有利。

只有大于指定的`minSize`的块才被存储到记录中。这样可以确保这些块随着应用程序的增长而填满，而不是为每次更改创建许多小块的记录。

如果模块发生更改，则其块声明为无效，然后放回到模块池中。从池中的所有模块创建新的块。

4. 这里需要权衡：

- 较小的 maxSize 会改善缓存，因为块更改的频率降低，并且在更新后可以更频繁地重用。

- 最大的 maxSize 可以改善压缩效果，因为 gzip 对于较大的文件效果更好。更有可能找到重复的字符串，等等。

- 随着请求数量的减少，向后兼容性（非 HTTP2 客户端）会随着 maxSize 的增大而提高。

5. 源代码 [webpack-demo-13](https://github.com/Matthrews/webpack-demos)

### Scope Hoisting

内置 ModuleConcatenationPlugin 插件生产条件下默认启用

[Webpack Scope Hoisting](https://zhuanlan.zhihu.com/p/162066537)

### Tree shaking

1. tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。
   它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export

2. 使用 tree shaking，你需要

- 使用 ES2015 模块语法（即 import 和 export）
- 处于生产模式
- 在项目 package.json 文件中，添加一个 "sideEffects" 入口
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin 或者 TerserPlugin）

3. 你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。
   灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

4. 副作用配置

```js
// 所有文件都有副作用，全都不可 tree-shaking
{
 "sideEffects": true
}
// 没有文件有副作用，全都可以 tree-shaking
{
 "sideEffects": false
}
// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
{
 "sideEffects": [
  "./src/file1.css",
  "./src/file2.js"
 ]
}
```

### 持久缓存

1. 通过`cache`配置，默认缓存将保存在`node_modules/.cache`，[详细介绍](https://github.com/webpack/changelog-v5/blob/master/guides/persistent-caching.md#:~:text=The%20persistent%20cache%20can%20be%20used%20for%20single,Writing%20to%20cache%20will%20write%20to%20both%20caches.)

2. `webpack.config.js`配置

```js
module.exports = (env = "development") => ({
  mode: env,
  entry: "./example",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[chunkhash].js",
    chunkFilename: "[chunkhash].js",
  },
  infrastructureLogging: {
    // Optional: print more verbose logging about caching
    level: "verbose",
  },
  cache: {
    type: "filesystem",

    // changing the cacheDirectory is optional,
    // by default it will be in `node_modules/.cache`
    cacheDirectory: path.resolve(__dirname, ".cache"),

    // Add additional dependencies to the build
    buildDependencies: {
      // recommended to invalidate cache on config changes
      // This also makes all dependencies of this file build dependencies
      config: [__filename],
      // By default webpack and loaders are build dependencies
    },
  },
});
```

3. 开发模式和生产模式打包
   试了一下，貌似生产模式默认就有 cache 优化，但官方说不是默认的
   ![开发模式](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-14/imgs/dev.png)
   ![生产模式](https://github.com/Matthrews/webpack-demos/blob/main/webpack-demo-14/imgs/prod.png)

4. 源代码 [webpack-demo-14](https://github.com/Matthrews/webpack-demos)

### Side Effects

### Source Map

### Web Worker
