/*! For license information please see bundle.98b69de48af3ba4295de.js.LICENSE.txt */
!function () {
    "use strict";
    var e, t, r, n, o, i, u, a = {
        800: function (e, t, r) {
            var n = r(15), o = r.n(n), i = r(645), u = r.n(i)()(o());
            u.push([e.id, "body{background-color:green}", "", {
                version: 3,
                sources: ["webpack://./src/index.scss"],
                names: [],
                mappings: "AAAA,KACE,sBAAA",
                sourcesContent: ["body {\r\n  background-color: green;\r\n}\r\n\r\n"],
                sourceRoot: ""
            }]), t.Z = u
        }, 645: function (e) {
            e.exports = function (e) {
                var t = [];
                return t.toString = function () {
                    return this.map((function (t) {
                        var r = e(t);
                        return t[2] ? "@media ".concat(t[2], " {").concat(r, "}") : r
                    })).join("")
                }, t.i = function (e, r, n) {
                    "string" == typeof e && (e = [[null, e, ""]]);
                    var o = {};
                    if (n) for (var i = 0; i < this.length; i++) {
                        var u = this[i][0];
                        null != u && (o[u] = !0)
                    }
                    for (var a = 0; a < e.length; a++) {
                        var c = [].concat(e[a]);
                        n && o[c[0]] || (r && (c[2] ? c[2] = "".concat(r, " and ").concat(c[2]) : c[2] = r), t.push(c))
                    }
                }, t
            }
        }, 15: function (e) {
            function t(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            e.exports = function (e) {
                var r, n, o = (n = 4, function (e) {
                    if (Array.isArray(e)) return e
                }(r = e) || function (e, t) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                        var r = [], n = !0, o = !1, i = void 0;
                        try {
                            for (var u, a = e[Symbol.iterator](); !(n = (u = a.next()).done) && (r.push(u.value), !t || r.length !== t); n = !0) ;
                        } catch (e) {
                            o = !0, i = e
                        } finally {
                            try {
                                n || null == a.return || a.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return r
                    }
                }(r, n) || function (e, r) {
                    if (e) {
                        if ("string" == typeof e) return t(e, r);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? t(e, r) : void 0
                    }
                }(r, n) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()), i = o[1], u = o[3];
                if ("function" == typeof btoa) {
                    var a = btoa(unescape(encodeURIComponent(JSON.stringify(u)))),
                        c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),
                        f = "/*# ".concat(c, " */"), s = u.sources.map((function (e) {
                            return "/*# sourceURL=".concat(u.sourceRoot || "").concat(e, " */")
                        }));
                    return [i].concat(s).concat([f]).join("\n")
                }
                return [i].join("\n")
            }
        }, 418: function (e) {
            var t = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty,
                n = Object.prototype.propertyIsEnumerable;

            function o(e) {
                if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }

            e.exports = function () {
                try {
                    if (!Object.assign) return !1;
                    var e = new String("abc");
                    if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                    for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
                    if ("0123456789" !== Object.getOwnPropertyNames(t).map((function (e) {
                        return t[e]
                    })).join("")) return !1;
                    var n = {};
                    return "abcdefghijklmnopqrst".split("").forEach((function (e) {
                        n[e] = e
                    })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
                } catch (e) {
                    return !1
                }
            }() ? Object.assign : function (e, i) {
                for (var u, a, c = o(e), f = 1; f < arguments.length; f++) {
                    for (var s in u = Object(arguments[f])) r.call(u, s) && (c[s] = u[s]);
                    if (t) {
                        a = t(u);
                        for (var l = 0; l < a.length; l++) n.call(u, a[l]) && (c[a[l]] = u[a[l]])
                    }
                }
                return c
            }
        }, 408: function (e, t, r) {
            var n = r(418), o = 60103, i = 60106;
            t.Fragment = 60107, t.StrictMode = 60108, t.Profiler = 60114;
            var u = 60109, a = 60110, c = 60112;
            t.Suspense = 60113;
            var f = 60115, s = 60116;
            if ("function" == typeof Symbol && Symbol.for) {
                var l = Symbol.for;
                o = l("react.element"), i = l("react.portal"), t.Fragment = l("react.fragment"), t.StrictMode = l("react.strict_mode"), t.Profiler = l("react.profiler"), u = l("react.provider"), a = l("react.context"), c = l("react.forward_ref"), t.Suspense = l("react.suspense"), f = l("react.memo"), s = l("react.lazy")
            }
            var p = "function" == typeof Symbol && Symbol.iterator;

            function d(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            }

            var y = {
                isMounted: function () {
                    return !1
                }, enqueueForceUpdate: function () {
                }, enqueueReplaceState: function () {
                }, enqueueSetState: function () {
                }
            }, h = {};

            function v(e, t, r) {
                this.props = e, this.context = t, this.refs = h, this.updater = r || y
            }

            function m() {
            }

            function b(e, t, r) {
                this.props = e, this.context = t, this.refs = h, this.updater = r || y
            }

            v.prototype.isReactComponent = {}, v.prototype.setState = function (e, t) {
                if ("object" != typeof e && "function" != typeof e && null != e) throw Error(d(85));
                this.updater.enqueueSetState(this, e, t, "setState")
            }, v.prototype.forceUpdate = function (e) {
                this.updater.enqueueForceUpdate(this, e, "forceUpdate")
            }, m.prototype = v.prototype;
            var g = b.prototype = new m;
            g.constructor = b, n(g, v.prototype), g.isPureReactComponent = !0;
            var w = {current: null}, _ = Object.prototype.hasOwnProperty,
                S = {key: !0, ref: !0, __self: !0, __source: !0};

            function j(e, t, r) {
                var n, i = {}, u = null, a = null;
                if (null != t) for (n in void 0 !== t.ref && (a = t.ref), void 0 !== t.key && (u = "" + t.key), t) _.call(t, n) && !S.hasOwnProperty(n) && (i[n] = t[n]);
                var c = arguments.length - 2;
                if (1 === c) i.children = r; else if (1 < c) {
                    for (var f = Array(c), s = 0; s < c; s++) f[s] = arguments[s + 2];
                    i.children = f
                }
                if (e && e.defaultProps) for (n in c = e.defaultProps) void 0 === i[n] && (i[n] = c[n]);
                return {$$typeof: o, type: e, key: u, ref: a, props: i, _owner: w.current}
            }

            function k(e) {
                return "object" == typeof e && null !== e && e.$$typeof === o
            }

            var C = /\/+/g;

            function O(e, t) {
                return "object" == typeof e && null !== e && null != e.key ? function (e) {
                    var t = {"=": "=0", ":": "=2"};
                    return "$" + e.replace(/[=:]/g, (function (e) {
                        return t[e]
                    }))
                }("" + e.key) : t.toString(36)
            }

            function E(e, t, r, n, u) {
                var a = typeof e;
                "undefined" !== a && "boolean" !== a || (e = null);
                var c = !1;
                if (null === e) c = !0; else switch (a) {
                    case"string":
                    case"number":
                        c = !0;
                        break;
                    case"object":
                        switch (e.$$typeof) {
                            case o:
                            case i:
                                c = !0
                        }
                }
                if (c) return u = u(c = e), e = "" === n ? "." + O(c, 0) : n, Array.isArray(u) ? (r = "", null != e && (r = e.replace(C, "$&/") + "/"), E(u, t, r, "", (function (e) {
                    return e
                }))) : null != u && (k(u) && (u = function (e, t) {
                    return {$$typeof: o, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner}
                }(u, r + (!u.key || c && c.key === u.key ? "" : ("" + u.key).replace(C, "$&/") + "/") + e)), t.push(u)), 1;
                if (c = 0, n = "" === n ? "." : n + ":", Array.isArray(e)) for (var f = 0; f < e.length; f++) {
                    var s = n + O(a = e[f], f);
                    c += E(a, t, r, s, u)
                } else if ("function" == typeof (s = function (e) {
                    return null === e || "object" != typeof e ? null : "function" == typeof (e = p && e[p] || e["@@iterator"]) ? e : null
                }(e))) for (e = s.call(e), f = 0; !(a = e.next()).done;) c += E(a = a.value, t, r, s = n + O(a, f++), u); else if ("object" === a) throw t = "" + e, Error(d(31, "[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
                return c
            }

            function A(e, t, r) {
                if (null == e) return e;
                var n = [], o = 0;
                return E(e, n, "", "", (function (e) {
                    return t.call(r, e, o++)
                })), n
            }

            function $(e) {
                if (-1 === e._status) {
                    var t = e._result;
                    t = t(), e._status = 0, e._result = t, t.then((function (t) {
                        0 === e._status && (t = t.default, e._status = 1, e._result = t)
                    }), (function (t) {
                        0 === e._status && (e._status = 2, e._result = t)
                    }))
                }
                if (1 === e._status) return e._result;
                throw e._result
            }

            var P = {current: null};

            function R() {
                var e = P.current;
                if (null === e) throw Error(d(321));
                return e
            }

            var x = {
                ReactCurrentDispatcher: P,
                ReactCurrentBatchConfig: {transition: 0},
                ReactCurrentOwner: w,
                IsSomeRendererActing: {current: !1},
                assign: n
            };
            t.Children = {
                map: A, forEach: function (e, t, r) {
                    A(e, (function () {
                        t.apply(this, arguments)
                    }), r)
                }, count: function (e) {
                    var t = 0;
                    return A(e, (function () {
                        t++
                    })), t
                }, toArray: function (e) {
                    return A(e, (function (e) {
                        return e
                    })) || []
                }, only: function (e) {
                    if (!k(e)) throw Error(d(143));
                    return e
                }
            }, t.Component = v, t.PureComponent = b, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = x, t.cloneElement = function (e, t, r) {
                if (null == e) throw Error(d(267, e));
                var i = n({}, e.props), u = e.key, a = e.ref, c = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (a = t.ref, c = w.current), void 0 !== t.key && (u = "" + t.key), e.type && e.type.defaultProps) var f = e.type.defaultProps;
                    for (s in t) _.call(t, s) && !S.hasOwnProperty(s) && (i[s] = void 0 === t[s] && void 0 !== f ? f[s] : t[s])
                }
                var s = arguments.length - 2;
                if (1 === s) i.children = r; else if (1 < s) {
                    f = Array(s);
                    for (var l = 0; l < s; l++) f[l] = arguments[l + 2];
                    i.children = f
                }
                return {$$typeof: o, type: e.type, key: u, ref: a, props: i, _owner: c}
            }, t.createContext = function (e, t) {
                return void 0 === t && (t = null), (e = {
                    $$typeof: a,
                    _calculateChangedBits: t,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = {$$typeof: u, _context: e}, e.Consumer = e
            }, t.createElement = j, t.createFactory = function (e) {
                var t = j.bind(null, e);
                return t.type = e, t
            }, t.createRef = function () {
                return {current: null}
            }, t.forwardRef = function (e) {
                return {$$typeof: c, render: e}
            }, t.isValidElement = k, t.lazy = function (e) {
                return {$$typeof: s, _payload: {_status: -1, _result: e}, _init: $}
            }, t.memo = function (e, t) {
                return {$$typeof: f, type: e, compare: void 0 === t ? null : t}
            }, t.useCallback = function (e, t) {
                return R().useCallback(e, t)
            }, t.useContext = function (e, t) {
                return R().useContext(e, t)
            }, t.useDebugValue = function () {
            }, t.useEffect = function (e, t) {
                return R().useEffect(e, t)
            }, t.useImperativeHandle = function (e, t, r) {
                return R().useImperativeHandle(e, t, r)
            }, t.useLayoutEffect = function (e, t) {
                return R().useLayoutEffect(e, t)
            }, t.useMemo = function (e, t) {
                return R().useMemo(e, t)
            }, t.useReducer = function (e, t, r) {
                return R().useReducer(e, t, r)
            }, t.useRef = function (e) {
                return R().useRef(e)
            }, t.useState = function (e) {
                return R().useState(e)
            }, t.version = "17.0.1"
        }, 294: function (e, t, r) {
            e.exports = r(408)
        }, 379: function (e, t, r) {
            var n, o = function () {
                var e = {};
                return function (t) {
                    if (void 0 === e[t]) {
                        var r = document.querySelector(t);
                        if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
                            r = r.contentDocument.head
                        } catch (e) {
                            r = null
                        }
                        e[t] = r
                    }
                    return e[t]
                }
            }(), i = [];

            function u(e) {
                for (var t = -1, r = 0; r < i.length; r++) if (i[r].identifier === e) {
                    t = r;
                    break
                }
                return t
            }

            function a(e, t) {
                for (var r = {}, n = [], o = 0; o < e.length; o++) {
                    var a = e[o], c = t.base ? a[0] + t.base : a[0], f = r[c] || 0, s = "".concat(c, " ").concat(f);
                    r[c] = f + 1;
                    var l = u(s), p = {css: a[1], media: a[2], sourceMap: a[3]};
                    -1 !== l ? (i[l].references++, i[l].updater(p)) : i.push({
                        identifier: s,
                        updater: h(p, t),
                        references: 1
                    }), n.push(s)
                }
                return n
            }

            function c(e) {
                var t = document.createElement("style"), n = e.attributes || {};
                if (void 0 === n.nonce) {
                    var i = r.nc;
                    i && (n.nonce = i)
                }
                if (Object.keys(n).forEach((function (e) {
                    t.setAttribute(e, n[e])
                })), "function" == typeof e.insert) e.insert(t); else {
                    var u = o(e.insert || "head");
                    if (!u) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    u.appendChild(t)
                }
                return t
            }

            var f, s = (f = [], function (e, t) {
                return f[e] = t, f.filter(Boolean).join("\n")
            });

            function l(e, t, r, n) {
                var o = r ? "" : n.media ? "@media ".concat(n.media, " {").concat(n.css, "}") : n.css;
                if (e.styleSheet) e.styleSheet.cssText = s(t, o); else {
                    var i = document.createTextNode(o), u = e.childNodes;
                    u[t] && e.removeChild(u[t]), u.length ? e.insertBefore(i, u[t]) : e.appendChild(i)
                }
            }

            function p(e, t, r) {
                var n = r.css, o = r.media, i = r.sourceMap;
                if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), i && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), e.styleSheet) e.styleSheet.cssText = n; else {
                    for (; e.firstChild;) e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(n))
                }
            }

            var d = null, y = 0;

            function h(e, t) {
                var r, n, o;
                if (t.singleton) {
                    var i = y++;
                    r = d || (d = c(t)), n = l.bind(null, r, i, !1), o = l.bind(null, r, i, !0)
                } else r = c(t), n = p.bind(null, r, t), o = function () {
                    !function (e) {
                        if (null === e.parentNode) return !1;
                        e.parentNode.removeChild(e)
                    }(r)
                };
                return n(e), function (t) {
                    if (t) {
                        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                        n(e = t)
                    } else o()
                }
            }

            e.exports = function (e, t) {
                (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = (void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), n));
                var r = a(e = e || [], t);
                return function (e) {
                    if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                        for (var n = 0; n < r.length; n++) {
                            var o = u(r[n]);
                            i[o].references--
                        }
                        for (var c = a(e, t), f = 0; f < r.length; f++) {
                            var s = u(r[f]);
                            0 === i[s].references && (i[s].updater(), i.splice(s, 1))
                        }
                        r = c
                    }
                }
            }
        }
    }, c = {};

    function f(e) {
        if (c[e]) return c[e].exports;
        var t = c[e] = {id: e, exports: {}};
        return a[e](t, t.exports, f), t.exports
    }

    f.m = a, f.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return f.d(t, {a: t}), t
    }, f.d = function (e, t) {
        for (var r in t) f.o(t, r) && !f.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
    }, f.f = {}, f.e = function (e) {
        return Promise.all(Object.keys(f.f).reduce((function (t, r) {
            return f.f[r](e, t), t
        }), []))
    }, f.u = function (e) {
        return "bundle.89b6c0a03b4f70f72868.js"
    }, f.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), f.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, e = {}, t = "webpack-demo-4:", f.l = function (r, n, o, i) {
        if (e[r]) e[r].push(n); else {
            var u, a;
            if (void 0 !== o) for (var c = document.getElementsByTagName("script"), s = 0; s < c.length; s++) {
                var l = c[s];
                if (l.getAttribute("src") == r || l.getAttribute("data-webpack") == t + o) {
                    u = l;
                    break
                }
            }
            u || (a = !0, (u = document.createElement("script")).charset = "utf-8", u.timeout = 120, f.nc && u.setAttribute("nonce", f.nc), u.setAttribute("data-webpack", t + o), u.src = r), e[r] = [n];
            var p = function (t, n) {
                u.onerror = u.onload = null, clearTimeout(d);
                var o = e[r];
                if (delete e[r], u.parentNode && u.parentNode.removeChild(u), o && o.forEach((function (e) {
                    return e(n)
                })), t) return t(n)
            }, d = setTimeout(p.bind(null, void 0, {type: "timeout", target: u}), 12e4);
            u.onerror = p.bind(null, u.onerror), u.onload = p.bind(null, u.onload), a && document.head.appendChild(u)
        }
    }, f.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, function () {
        var e;
        f.g.importScripts && (e = f.g.location + "");
        var t = f.g.document;
        if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
            var r = t.getElementsByTagName("script");
            r.length && (e = r[r.length - 1].src)
        }
        if (!e) throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), f.p = e
    }(), function () {
        var e = {179: 0};
        f.f.j = function (t, r) {
            var n = f.o(e, t) ? e[t] : void 0;
            if (0 !== n) if (n) r.push(n[2]); else {
                var o = new Promise((function (r, o) {
                    n = e[t] = [r, o]
                }));
                r.push(n[2] = o);
                var i = f.p + f.u(t), u = new Error;
                f.l(i, (function (r) {
                    if (f.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0), n)) {
                        var o = r && ("load" === r.type ? "missing" : r.type), i = r && r.target && r.target.src;
                        u.message = "Loading chunk " + t + " failed.\n(" + o + ": " + i + ")", u.name = "ChunkLoadError", u.type = o, u.request = i, n[1](u)
                    }
                }), "chunk-" + t, t)
            }
        };
        var t = function (t, r) {
            for (var n, o, i = r[0], u = r[1], a = r[2], c = 0, s = []; c < i.length; c++) o = i[c], f.o(e, o) && e[o] && s.push(e[o][0]), e[o] = 0;
            for (n in u) f.o(u, n) && (f.m[n] = u[n]);
            for (a && a(f), t && t(r); s.length;) s.shift()()
        }, r = self.webpackChunkwebpack_demo_4 = self.webpackChunkwebpack_demo_4 || [];
        r.forEach(t.bind(null, 0)), r.push = t.bind(null, r.push.bind(r))
    }(), r = f(379), n = f.n(r), o = f(800), n()(o.Z, {
        insert: "head",
        singleton: !1
    }), o.Z.locals, i = f(294), u = f.e(670).then(f.bind(f, 670)).b, console.log("import测试", u), console.log("TS测试", "use typescript"), console.log("TSX测试", (function () {
        return i.createElement("div", null, "TSX Demo")
    })), console.log("matthew"), console.log("Promise", Promise.resolve("test promise"))
}();
//# sourceMappingURL=bundle.98b69de48af3ba4295de.js.map