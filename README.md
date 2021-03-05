### webpack从入门到精通

#### 使用webpack打包JS文件

 - 配置entry和output
 - 配置style loaders
   - 配置module解析规则，让webpack识别less,scss,css文件
 - 配置build模式
   - development 模式打包后的代码可读，以`dist/bundle-3bdae7b9ad0372a45c69.js`为例，打包后核心代码如下：
   ```js
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


