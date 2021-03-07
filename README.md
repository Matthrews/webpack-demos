### webpack从入门到精通

#### 使用webpack打包JS文件

 - 配置entry和output
 - 配置style loaders
   - 配置module解析规则，让webpack识别less,scss,css文件
 - 配置build模式
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
- 使用 HtmlWebpackPlugin 快速生成html并引入打包后的bundle.js
- 开发模式下配置watch: `webpack --progress --color --watch` 让webpack实时监听变化并编译(得安装`webpack-dev-server`)
- 配置`webpack-dev-server`: `"webpack serve`并在 webpack.config.js中配置devServer实时监听编译并刷新页面(后者通过socket.io服务实现)

#### 使用loader处理图片文件
 - url-loader： 当文件大小未超过limit的时候，默认使用base64处理图片输出dataURL
    - 共支持6个配置项：limit, mimetype, encoding(默认base64), generator(自定义encodeing过程), fallback(兜底loader), esModule(默认ES模块)
 - 解决入口文件过大的warning
   - 移除不必要的库：lodash
   - 懒加载大图片
 - file-loader: 解析通过inport/require引入的文件成为url并把文件资源弹射到dist/build目录
   - 编译结果如下：`asset src/product.png 3.63 MiB [emitted] [from: src/product.png] [big]`
   - 查看dom元素图片src为：`http://localhost:9000/src/product.png`

   - 使用函数方式自定义图片解析name以及资源目录
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
   - 查看dom元素图片src为：`http://localhost:9000/assets/65207b55b0e6a18f6bf48d0557d98ca5.png`

   - 使用outputPath自定义目标文件输出路径，如果name里面有路径的话，会产生叠加效果
   - 结果输出：`asset images/assets/65207b55b0e6a18f6bf48d0557d98ca5.png 3.63 MiB [emitted] [from: src/product.png] [big]`
   - 使用postTransformPublicPath可以动态拼接资源路径，一般在CDN场景使用较多

 - url-loader 补充：当不设置limit的时候，遇到大文件编译之后会生成两个文件，一个是入口js文件，一个是大文件base64编码的js文件，首次请求大文件很耗时，详情参考：https://github.com/Matthrews/webpack-demos/commit/43703b255a76c2f4493d161542e780b085533271#commitcomment-47929310
 - 对比file-loader发现file-loader对首屏时间较为友好： https://github.com/Matthrews/webpack-demos/commit/43703b255a76c2f4493d161542e780b085533271#commitcomment-47929686

  - url-loader和file-loader总结：
    - url-loader基于file-loader封装，url-loader内置了file-loader
    - url-loader工作分两种情况：
       1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
       2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader
    - file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
    - 建议url-loader设置limit以优化性能


#### 使用plugin处理图片文件

 - 使用image-minimizer-webpack-plugin进行图片压缩
 - 使用optipng进行无损压缩，压缩前：3.63MB，压缩后：2.74MB
 - 使用pngquant进行有损压缩，压缩前：3.63MB，压缩后：1.8MB
 - 踩坑，安装imagemin-optipng此类的库可能会失败：`Error: Command failed: xxx is not recognized as an internal or external command`,此时使用
   ```js
    <!-- 安装dependencies -->
    npm install --ignore-scripts  
    <!-- 安装devDependencies -->
    npm install --only=dev --ignore-scripts
    <!-- 设置环境变量，后面run buikld使用 -->
    set NODE_ENV=production
   ```
 - 如果在Windows上使用的话，还可能会报错`/node_modules/optipng/vendor/optipng.exe ENOENT`，这时候就得官网下载optipng，然后make(Windows上make要安装MinGW编译器)，最终生成optipng.exe 然后拷贝到报错对应目录
 - Mac和Linux上就不会有上述问题了





