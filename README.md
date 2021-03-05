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
 - url-loader： 当文件大小未超过limit的时候，默认使用base64处理图盘输出dataURL
    - 共支持6个配置项：limit, mimetype, encoding(默认base64), generator(自定义encodeing过程), fallback(兜底loader), esModule(默认ES模块)
 - 解决入口文件过大的warning
   - 移除不必要的库：lodash
   - 懒加载大图片


