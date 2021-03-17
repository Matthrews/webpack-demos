/*! For license information please see main.js.LICENSE.txt */
!(function () {
  "use strict";
  var e,
    t,
    r = {
      418: function (e) {
        var t = Object.getOwnPropertySymbols,
          r = Object.prototype.hasOwnProperty,
          n = Object.prototype.propertyIsEnumerable;
        function o(e) {
          if (null == e)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          return Object(e);
        }
        e.exports = (function () {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
              return !1;
            for (var t = {}, r = 0; r < 10; r++)
              t["_" + String.fromCharCode(r)] = r;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function (e) {
                  return t[e];
                })
                .join("")
            )
              return !1;
            var n = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                n[e] = e;
              }),
              "abcdefghijklmnopqrst" ===
                Object.keys(Object.assign({}, n)).join("")
            );
          } catch (e) {
            return !1;
          }
        })()
          ? Object.assign
          : function (e, u) {
              for (var i, c, a = o(e), f = 1; f < arguments.length; f++) {
                for (var l in (i = Object(arguments[f])))
                  r.call(i, l) && (a[l] = i[l]);
                if (t) {
                  c = t(i);
                  for (var s = 0; s < c.length; s++)
                    n.call(i, c[s]) && (a[c[s]] = i[c[s]]);
                }
              }
              return a;
            };
      },
      408: function (e, t, r) {
        var n = r(418),
          o = 60103,
          u = 60106;
        (t.Fragment = 60107), (t.StrictMode = 60108), (t.Profiler = 60114);
        var i = 60109,
          c = 60110,
          a = 60112;
        t.Suspense = 60113;
        var f = 60115,
          l = 60116;
        if ("function" == typeof Symbol && Symbol.for) {
          var s = Symbol.for;
          (o = s("react.element")),
            (u = s("react.portal")),
            (t.Fragment = s("react.fragment")),
            (t.StrictMode = s("react.strict_mode")),
            (t.Profiler = s("react.profiler")),
            (i = s("react.provider")),
            (c = s("react.context")),
            (a = s("react.forward_ref")),
            (t.Suspense = s("react.suspense")),
            (f = s("react.memo")),
            (l = s("react.lazy"));
        }
        var p = "function" == typeof Symbol && Symbol.iterator;
        function y(e) {
          for (
            var t =
                "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
              r = 1;
            r < arguments.length;
            r++
          )
            t += "&args[]=" + encodeURIComponent(arguments[r]);
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        var d = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          h = {};
        function b(e, t, r) {
          (this.props = e),
            (this.context = t),
            (this.refs = h),
            (this.updater = r || d);
        }
        function v() {}
        function m(e, t, r) {
          (this.props = e),
            (this.context = t),
            (this.refs = h),
            (this.updater = r || d);
        }
        (b.prototype.isReactComponent = {}),
          (b.prototype.setState = function (e, t) {
            if ("object" != typeof e && "function" != typeof e && null != e)
              throw Error(y(85));
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (b.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (v.prototype = b.prototype);
        var g = (m.prototype = new v());
        (g.constructor = m), n(g, b.prototype), (g.isPureReactComponent = !0);
        var _ = { current: null },
          w = Object.prototype.hasOwnProperty,
          j = { key: !0, ref: !0, __self: !0, __source: !0 };
        function O(e, t, r) {
          var n,
            u = {},
            i = null,
            c = null;
          if (null != t)
            for (n in (void 0 !== t.ref && (c = t.ref),
            void 0 !== t.key && (i = "" + t.key),
            t))
              w.call(t, n) && !j.hasOwnProperty(n) && (u[n] = t[n]);
          var a = arguments.length - 2;
          if (1 === a) u.children = r;
          else if (1 < a) {
            for (var f = Array(a), l = 0; l < a; l++) f[l] = arguments[l + 2];
            u.children = f;
          }
          if (e && e.defaultProps)
            for (n in (a = e.defaultProps)) void 0 === u[n] && (u[n] = a[n]);
          return {
            $$typeof: o,
            type: e,
            key: i,
            ref: c,
            props: u,
            _owner: _.current,
          };
        }
        function S(e) {
          return "object" == typeof e && null !== e && e.$$typeof === o;
        }
        var k = /\/+/g;
        function E(e, t) {
          return "object" == typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function P(e, t, r, n, i) {
          var c = typeof e;
          ("undefined" !== c && "boolean" !== c) || (e = null);
          var a = !1;
          if (null === e) a = !0;
          else
            switch (c) {
              case "string":
              case "number":
                a = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case o:
                  case u:
                    a = !0;
                }
            }
          if (a)
            return (
              (i = i((a = e))),
              (e = "" === n ? "." + E(a, 0) : n),
              Array.isArray(i)
                ? ((r = ""),
                  null != e && (r = e.replace(k, "$&/") + "/"),
                  P(i, t, r, "", function (e) {
                    return e;
                  }))
                : null != i &&
                  (S(i) &&
                    (i = (function (e, t) {
                      return {
                        $$typeof: o,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      i,
                      r +
                        (!i.key || (a && a.key === i.key)
                          ? ""
                          : ("" + i.key).replace(k, "$&/") + "/") +
                        e
                    )),
                  t.push(i)),
              1
            );
          if (((a = 0), (n = "" === n ? "." : n + ":"), Array.isArray(e)))
            for (var f = 0; f < e.length; f++) {
              var l = n + E((c = e[f]), f);
              a += P(c, t, r, l, i);
            }
          else if (
            "function" ==
            typeof (l = (function (e) {
              return null === e || "object" != typeof e
                ? null
                : "function" == typeof (e = (p && e[p]) || e["@@iterator"])
                ? e
                : null;
            })(e))
          )
            for (e = l.call(e), f = 0; !(c = e.next()).done; )
              a += P((c = c.value), t, r, (l = n + E(c, f++)), i);
          else if ("object" === c)
            throw (
              ((t = "" + e),
              Error(
                y(
                  31,
                  "[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t
                )
              ))
            );
          return a;
        }
        function C(e, t, r) {
          if (null == e) return e;
          var n = [],
            o = 0;
          return (
            P(e, n, "", "", function (e) {
              return t.call(r, e, o++);
            }),
            n
          );
        }
        function $(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()),
              (e._status = 0),
              (e._result = t),
              t.then(
                function (t) {
                  0 === e._status &&
                    ((t = t.default), (e._status = 1), (e._result = t));
                },
                function (t) {
                  0 === e._status && ((e._status = 2), (e._result = t));
                }
              );
          }
          if (1 === e._status) return e._result;
          throw e._result;
        }
        var R = { current: null };
        function x() {
          var e = R.current;
          if (null === e) throw Error(y(321));
          return e;
        }
        var A = {
          ReactCurrentDispatcher: R,
          ReactCurrentBatchConfig: { transition: 0 },
          ReactCurrentOwner: _,
          IsSomeRendererActing: { current: !1 },
          assign: n,
        };
        (t.Children = {
          map: C,
          forEach: function (e, t, r) {
            C(
              e,
              function () {
                t.apply(this, arguments);
              },
              r
            );
          },
          count: function (e) {
            var t = 0;
            return (
              C(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              C(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!S(e)) throw Error(y(143));
            return e;
          },
        }),
          (t.Component = b),
          (t.PureComponent = m),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = A),
          (t.cloneElement = function (e, t, r) {
            if (null == e) throw Error(y(267, e));
            var u = n({}, e.props),
              i = e.key,
              c = e.ref,
              a = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((c = t.ref), (a = _.current)),
                void 0 !== t.key && (i = "" + t.key),
                e.type && e.type.defaultProps)
              )
                var f = e.type.defaultProps;
              for (l in t)
                w.call(t, l) &&
                  !j.hasOwnProperty(l) &&
                  (u[l] = void 0 === t[l] && void 0 !== f ? f[l] : t[l]);
            }
            var l = arguments.length - 2;
            if (1 === l) u.children = r;
            else if (1 < l) {
              f = Array(l);
              for (var s = 0; s < l; s++) f[s] = arguments[s + 2];
              u.children = f;
            }
            return {
              $$typeof: o,
              type: e.type,
              key: i,
              ref: c,
              props: u,
              _owner: a,
            };
          }),
          (t.createContext = function (e, t) {
            return (
              void 0 === t && (t = null),
              ((e = {
                $$typeof: c,
                _calculateChangedBits: t,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
              }).Provider = { $$typeof: i, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = O),
          (t.createFactory = function (e) {
            var t = O.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: a, render: e };
          }),
          (t.isValidElement = S),
          (t.lazy = function (e) {
            return {
              $$typeof: l,
              _payload: { _status: -1, _result: e },
              _init: $,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: f, type: e, compare: void 0 === t ? null : t };
          }),
          (t.useCallback = function (e, t) {
            return x().useCallback(e, t);
          }),
          (t.useContext = function (e, t) {
            return x().useContext(e, t);
          }),
          (t.useDebugValue = function () {}),
          (t.useEffect = function (e, t) {
            return x().useEffect(e, t);
          }),
          (t.useImperativeHandle = function (e, t, r) {
            return x().useImperativeHandle(e, t, r);
          }),
          (t.useLayoutEffect = function (e, t) {
            return x().useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return x().useMemo(e, t);
          }),
          (t.useReducer = function (e, t, r) {
            return x().useReducer(e, t, r);
          }),
          (t.useRef = function (e) {
            return x().useRef(e);
          }),
          (t.useState = function (e) {
            return x().useState(e);
          }),
          (t.version = "17.0.1");
      },
      294: function (e, t, r) {
        e.exports = r(408);
      },
    },
    n = {};
  function o(e) {
    if (n[e]) return n[e].exports;
    var t = (n[e] = { exports: {} });
    return r[e](t, t.exports, o), t.exports;
  }
  (o.m = r),
    (o.d = function (e, t) {
      for (var r in t)
        o.o(t, r) &&
          !o.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (o.f = {}),
    (o.e = function (e) {
      return Promise.all(
        Object.keys(o.f).reduce(function (t, r) {
          return o.f[r](e, t), t;
        }, [])
      );
    }),
    (o.u = function (e) {
      return e + ".js";
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (e = {}),
    (t = "webpack-demo-2:"),
    (o.l = function (r, n, u, i) {
      if (e[r]) e[r].push(n);
      else {
        var c, a;
        if (void 0 !== u)
          for (
            var f = document.getElementsByTagName("script"), l = 0;
            l < f.length;
            l++
          ) {
            var s = f[l];
            if (
              s.getAttribute("src") == r ||
              s.getAttribute("data-webpack") == t + u
            ) {
              c = s;
              break;
            }
          }
        c ||
          ((a = !0),
          ((c = document.createElement("script")).charset = "utf-8"),
          (c.timeout = 120),
          o.nc && c.setAttribute("nonce", o.nc),
          c.setAttribute("data-webpack", t + u),
          (c.src = r)),
          (e[r] = [n]);
        var p = function (t, n) {
            (c.onerror = c.onload = null), clearTimeout(y);
            var o = e[r];
            if (
              (delete e[r],
              c.parentNode && c.parentNode.removeChild(c),
              o &&
                o.forEach(function (e) {
                  return e(n);
                }),
              t)
            )
              return t(n);
          },
          y = setTimeout(
            p.bind(null, void 0, { type: "timeout", target: c }),
            12e4
          );
        (c.onerror = p.bind(null, c.onerror)),
          (c.onload = p.bind(null, c.onload)),
          a && document.head.appendChild(c);
      }
    }),
    (o.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (function () {
      var e;
      o.g.importScripts && (e = o.g.location + "");
      var t = o.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var r = t.getElementsByTagName("script");
        r.length && (e = r[r.length - 1].src);
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (o.p = e);
    })(),
    (function () {
      var e = { 179: 0 };
      o.f.j = function (t, r) {
        var n = o.o(e, t) ? e[t] : void 0;
        if (0 !== n)
          if (n) r.push(n[2]);
          else {
            var u = new Promise(function (r, o) {
              n = e[t] = [r, o];
            });
            r.push((n[2] = u));
            var i = o.p + o.u(t),
              c = new Error();
            o.l(
              i,
              function (r) {
                if (o.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0), n)) {
                  var u = r && ("load" === r.type ? "missing" : r.type),
                    i = r && r.target && r.target.src;
                  (c.message =
                    "Loading chunk " + t + " failed.\n(" + u + ": " + i + ")"),
                    (c.name = "ChunkLoadError"),
                    (c.type = u),
                    (c.request = i),
                    n[1](c);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = function (t, r) {
          for (
            var n, u, i = r[0], c = r[1], a = r[2], f = 0, l = [];
            f < i.length;
            f++
          )
            (u = i[f]), o.o(e, u) && e[u] && l.push(e[u][0]), (e[u] = 0);
          for (n in c) o.o(c, n) && (o.m[n] = c[n]);
          for (a && a(o), t && t(r); l.length; ) l.shift()();
        },
        r = (self.webpackChunkwebpack_demo_2 =
          self.webpackChunkwebpack_demo_2 || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })(),
    (function () {
      var e = o(294);
      function t(e) {
        return (t =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function n(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function u(e, t) {
        return (u =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function i(e, r) {
        return !r || ("object" !== t(r) && "function" != typeof r)
          ? (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : r;
      }
      function c(e) {
        return (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      var a = (function (t) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && u(e, t);
          })(p, t);
          var o,
            a,
            f,
            l,
            s =
              ((f = p),
              (l = (function () {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (e) {
                  return !1;
                }
              })()),
              function () {
                var e,
                  t = c(f);
                if (l) {
                  var r = c(this).constructor;
                  e = Reflect.construct(t, arguments, r);
                } else e = t.apply(this, arguments);
                return i(this, e);
              });
          function p() {
            return r(this, p), s.apply(this, arguments);
          }
          return (
            (o = p),
            (a = [
              {
                key: "render",
                value: function () {
                  return e.createElement("div", null, "hi, 我是App");
                },
              },
            ]) && n(o.prototype, a),
            p
          );
        })(e.Component),
        f = o.e(390).then(o.bind(o, 390));
      console.log(a),
        console.log("matthew"),
        console.log("a"),
        console.log(f),
        console.log(Promise.resolve("trst promise")),
        console.log("Message", msg);
    })();
})();
