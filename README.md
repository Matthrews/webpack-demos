### webpack 从入门到精通

#### 使用 webpack 打包 JS 文件

- 配置 entry 和 output
- 配置 style loaders
  - 配置 module 解析规则，让 webpack 识别 less,scss,css 文件
- 配置 build 模式

  - development 模式打包后的代码可读，以`dist/bundle-3bdae7b9ad0372a45c69.js`为例，打包后核心代码如下：

  ```js
       var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
       // Module
       ___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: #ddd;\n  color: green;\n  display: flex;\n}\nbody div {\n  border: 1px solid red;\n}\n", "",{"version":3,"sources":["webpack://./src/index.less"],"names":[],"mappings":"AAAA;EACE,gBAAA;EACA,YAAA;EACA,aAAA;AACF;AAJA;EAMI,qBAAA;AACJ","sourcesContent":["body {\n  background: #ddd;\n  color     : green;\n  display   : flex;\n\n  div {\n    border: 1px solid red;\n  }\n}"],"sourceRoot":""}]);
       // Exports
       const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);

       const Component = () => {
           var $div = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div />');

           $div.html(['Hello', 'World!'], ' ')
           return $div;
       }

       jquery__WEBPACK_IMPORTED_MODULE_1___default()(document.body).append(Component())
       })();

       })()
  ```

  - production 模式下打包后文件不可读，但经过压缩混淆后文件变得很小：`dist/bundle-9232b5bb95400f7ccbe0.js`
  - development 模式下打包后: `asset bundle-3bdae7b9ad0372a45c69.js 834 KiB`
  - production 模式下打包后: `asset bundle-9232b5bb95400f7ccbe0.js 162 KiB`

- 使用 HtmlWebpackPlugin 快速生成 html 并引入打包后的 bundle.js
- 开发模式下配置 watch: `webpack --progress --color --watch` 让 webpack 实时监听变化并编译(得安装`webpack-dev-server`)
- 配置`webpack-dev-server`: `"webpack serve`并在 webpack.config.js 中配置 devServer 实时监听编译并刷新页面(后者通过 socket.io 服务实现)

#### 使用 loader 处理图片文件

- url-loader： 当文件大小未超过 limit 的时候，默认使用 base64 处理图片输出 dataURL
  - 共支持 6 个配置项：limit, mimetype, encoding(默认 base64), generator(自定义 encode 过程), fallback(兜底 loader), esModule(默认 ES 模块)
- 解决入口文件过大的 warning
  - 移除不必要的库：lodash
  - 懒加载大图片
- file-loader: 解析通过 import/require 引入的文件成为 url 并把文件资源弹射到 dist/build 目录

  - 编译结果如下：`asset src/product.png 3.63 MiB [emitted] [from: src/product.png] [big]`
  - 查看 dom 元素图片 src 为：`http://localhost:9000/src/product.png`

  - 使用函数方式自定义图片解析 name 以及资源目录

  ```js
   // 函数式配置
   name(resourcePath, resourceQuery) {
       // `resourcePath` - `/absolute/path/to/file.js`
       // `resourceQuery` - `?foo=bar`
       console.log('file-loader output name', resourcePath, resourceQuery);

       if (process.env.NODE_ENV === 'development') {
           return '[path][name].[ext]';
       }

       return 'assets/[contenthash].[ext]';
   }
  ```

  - 编译结果如下：`asset assets/65207b55b0e6a18f6bf48d0557d98ca5.png 3.63 MiB [emitted] [from: src/product.png] [big]`
  - 查看 dom 元素图片 src 为：`http://localhost:9000/assets/65207b55b0e6a18f6bf48d0557d98ca5.png`

  - 使用 outputPath 自定义目标文件输出路径，如果 name 里面有路径的话，会产生叠加效果
  - 结果输出：`asset images/assets/65207b55b0e6a18f6bf48d0557d98ca5.png 3.63 MiB [emitted] [from: src/product.png] [big]`
  - 使用 postTransformPublicPath 可以动态拼接资源路径，一般在 CDN 场景使用较多

- url-loader 补充：当不设置 limit 的时候，遇到大文件编译之后会生成两个文件，一个是入口 js 文件，一个是大文件 base64 编码的 js 文件，首次请求大文件很耗时，详情参考：https://github.com/Matthrews/webpack-demos/commit/43703b255a76c2f4493d161542e780b085533271#commitcomment-47929310
- 对比 file-loader 发现 file-loader 对首屏时间较为友好： https://github.com/Matthrews/webpack-demos/commit/43703b255a76c2f4493d161542e780b085533271#commitcomment-47929686

- url-loader 和 file-loader 总结：
  - url-loader 基于 file-loader 封装，url-loader 内置了 file-loader
  - url-loader 工作分两种情况： 1.文件大小小于 limit 参数，url-loader 将会把文件转为 DataURL； 2.文件大小大于 limit，url-loader 会调用 file-loader 进行处理，参数也会直接传给 file-loader
  - file-loader 可以解析项目中的 url 引入（不仅限于 css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
  - 建议 url-loader 设置 limit 以优化性能

#### 使用 plugin 处理图片文件

- 使用 image-minimizer-webpack-plugin 进行图片压缩
- 使用 optipng 进行无损压缩，压缩前：3.63MB，压缩后：2.74MB
- 使用 pngquant 进行有损压缩，压缩前：3.63MB，压缩后：1.8MB
- 踩坑，安装 imagemin-optipng 此类的库可能会失败：`Error: Command failed: xxx is not recognized as an internal or external command`,此时使用
  ```js
   <!-- 安装dependencies -->
   npm install --ignore-scripts
   <!-- 安装devDependencies -->
   npm install --only=dev --ignore-scripts
   <!-- 设置环境变量，后面run buikld使用 -->
   set NODE_ENV=production
  ```
- 如果在 Windows 上使用的话，还可能会报错`/node_modules/optipng/vendor/optipng.exe ENOENT`，这时候就得官网下载 optipng，然后 make(Windows 上 make 要安装 MinGW 编译器)，最终生成 optipng.exe 然后拷贝到报错对应目录
- Mac 和 Linux 上就不会有上述问题了

### 配置系列

#### 让 Webpack 支持 IE

- webpack5 开始默认不支持 IE
- 配置`.browserslistrc`
- 并不完全支持 IE，因为 IE 没有 Promise，想要支持需要配置 polyfill

#### 让 Webpack 支持 JSX

- webpack 本身可以打包 JS，但是我们可以配置 babel-loader 让其使用更高级的功能
- 过程是 webpack 调用 babel-loader 对 JS 进行打包
- 使用`@babel/preset-react`支持 jsx

#### 让 Webpack 支持 ESLint

- 配置`.eslintrc`
- 使用`eslint-webpack-plugin`插件

#### 让 Webpack 支持 TS

- 配置`@babel/preset-typescript`

#### 让 Webpack 支持 TSX

#### 让 JS 和 TS 支持 @alias

- `webpack.config`配置模块解析别名

#### 让 ESLint 支持 TypeScript

- TSLint 作者不继续维护了，所以我们使用`airbnb-typescript`
- 配置`.eslintrc`让其使用`airbnb-typescript`处理 ts 语法问题

#### 让 Webpack 支持 SCSS 并支持自动 import 全局文件

- 支持 SCSS 需要引入响应 sass-loader
- 支持自动导入全局 scss 需要配置 sass-loader 的配置项

#### SCSS 分享变量给 JS

- 使用场景：使用 JS 创建动态 HTML 的时候想要使用 SCSS 里面的一些变量
- 解决方案：首先在 SCSS 文件里面 export 变量，然后配置 **css-loader** 配置项

#### SASS v.s. SCSS v.s. LESS v.s. Stylus

- Ruby 社区首先推出 SASS(没大括号)，后来改为 SCSS(加大括号)
- Twitter 社区继 Boostrap 之后推出 Less
- [Stylus](https://stylus.bootcss.com/)

##### 使用 Stylus
