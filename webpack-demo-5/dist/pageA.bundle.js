/*! For license information please see pageA.bundle.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./pageA.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{eval("// const a = require('./a.js');\r\n// const common = require('./common.js')\r\n//\r\n// common(a)\r\n\r\n__webpack_require__.e(/*! AMD require */ 456).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! ./common */ \"./common.js\")]; (function(common) {\r\n    common(__webpack_require__(/*! ./a */ \"./a.js\"));\r\n}).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);\r\n\n\n//# sourceURL=webpack:///./pageA.js?")}},__webpack_module_cache__={},inProgress;function __webpack_require__(e){var _=__webpack_module_cache__[e];if(void 0!==_)return _.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((_,r)=>(__webpack_require__.f[r](e,_),_)),[])),__webpack_require__.u=e=>e+".chunk.js",__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),inProgress={},__webpack_require__.l=(e,_,r,a)=>{if(inProgress[e])inProgress[e].push(_);else{var c,o;if(void 0!==r)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e){c=u;break}}c||(o=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,__webpack_require__.nc&&c.setAttribute("nonce",__webpack_require__.nc),c.src=e),inProgress[e]=[_];var t=(_,r)=>{c.onerror=c.onload=null,clearTimeout(p);var a=inProgress[e];if(delete inProgress[e],c.parentNode&&c.parentNode.removeChild(c),a&&a.forEach((e=>e(r))),_)return _(r)},p=setTimeout(t.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=t.bind(null,c.onerror),c.onload=t.bind(null,c.onload),o&&document.head.appendChild(c)}},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var _=__webpack_require__.g.document;if(!e&&_&&(_.currentScript&&(e=_.currentScript.src),!e)){var r=_.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={424:0};__webpack_require__.f.j=(_,r)=>{var a=__webpack_require__.o(e,_)?e[_]:void 0;if(0!==a)if(a)r.push(a[2]);else{var c=new Promise(((r,c)=>a=e[_]=[r,c]));r.push(a[2]=c);var o=__webpack_require__.p+__webpack_require__.u(_),n=new Error;__webpack_require__.l(o,(r=>{if(__webpack_require__.o(e,_)&&(0!==(a=e[_])&&(e[_]=void 0),a)){var c=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;n.message="Loading chunk "+_+" failed.\n("+c+": "+o+")",n.name="ChunkLoadError",n.type=c,n.request=o,a[1](n)}}),"chunk-"+_,_)}};var _=(_,r)=>{var a,c,[o,n,i]=r,u=0;for(a in n)__webpack_require__.o(n,a)&&(__webpack_require__.m[a]=n[a]);for(i&&i(__webpack_require__),_&&_(r);u<o.length;u++)c=o[u],__webpack_require__.o(e,c)&&e[c]&&e[c][0](),e[o[u]]=0},r=self.webpackChunk=self.webpackChunk||[];r.forEach(_.bind(null,0)),r.push=_.bind(null,r.push.bind(r))})();var __webpack_exports__=__webpack_require__("./pageA.js")})();