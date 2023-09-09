import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  isProxy,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  unref,
  useAttrs,
  watch
} from "./chunk-OH3DV4HH.js";
import "./chunk-5WWUZCGV.js";

// node_modules/.pnpm/registry.npmmirror.com+vue-draggable-plus@0.2.4/node_modules/vue-draggable-plus/dist/vue-draggable-plus.js
var $t = Object.defineProperty;
var Pe = Object.getOwnPropertySymbols;
var mt = Object.prototype.hasOwnProperty;
var vt = Object.prototype.propertyIsEnumerable;
var gt = (t, e, n) => e in t ? $t(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n;
var le = (t, e) => {
  for (var n in e || (e = {}))
    mt.call(e, n) && gt(t, n, e[n]);
  if (Pe)
    for (var n of Pe(e))
      vt.call(e, n) && gt(t, n, e[n]);
  return t;
};
var Ve = (t, e) => {
  var n = {};
  for (var o in t)
    mt.call(t, o) && e.indexOf(o) < 0 && (n[o] = t[o]);
  if (t != null && Pe)
    for (var o of Pe(t))
      e.indexOf(o) < 0 && vt.call(t, o) && (n[o] = t[o]);
  return n;
};
var Pt = "[vue-draggable-plus]: ";
function an(t) {
  console.warn(Pt + t);
}
function ln(t) {
  console.error(Pt + t);
}
function sn(t, e, n) {
  Array.isArray(t) && n >= 0 && n < t.length && t.splice(n, 0, t.splice(e, 1)[0]);
}
function un(t) {
  return t.replace(/-(\w)/g, (e, n) => n ? n.toUpperCase() : "");
}
function fn(t) {
  return Object.keys(t).reduce((e, n) => (typeof t[n] != "undefined" && (e[un(n)] = t[n]), e), {});
}
function cn(t, e) {
  if (Array.isArray(t))
    return t.splice(e, 1);
}
function dn(t, e, n) {
  if (Array.isArray(t))
    return t.splice(e, 0, n);
}
function hn(t) {
  return typeof t == "undefined";
}
function pn(t) {
  return typeof t == "string";
}
function yt(t, e, n) {
  const o = t.children[n];
  t.insertBefore(e, o);
}
function $e(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function gn(t, e = document) {
  var o;
  let n = null;
  return typeof (e == null ? void 0 : e.querySelector) == "function" ? n = (o = e == null ? void 0 : e.querySelector) == null ? void 0 : o.call(e, t) : n = document.querySelector(t), n || an(`Element not found: ${t}`), n;
}
function mn(t, e, n = null) {
  return function(...o) {
    return t.apply(n, o), e.apply(n, o);
  };
}
function vn(t, e) {
  const n = le({}, t);
  return Object.keys(e).forEach((o) => {
    n[o] ? n[o] = mn(t[o], e[o]) : n[o] = e[o];
  }), n;
}
function bn(t) {
  return t instanceof HTMLElement;
}
function yn(t, e) {
  Object.keys(t).forEach((n) => {
    e(n, t[n]);
  });
}
function wt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function q(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? wt(Object(n), true).forEach(function(o) {
      wn(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : wt(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Re(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Re = function(e) {
    return typeof e;
  } : Re = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Re(t);
}
function wn(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: true,
    configurable: true,
    writable: true
  }) : t[e] = n, t;
}
function Z() {
  return Z = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, Z.apply(this, arguments);
}
function En(t, e) {
  if (t == null)
    return {};
  var n = {}, o = Object.keys(t), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (n[r] = t[r]);
  return n;
}
function Sn(t, e) {
  if (t == null)
    return {};
  var n = En(t, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(t, o) && (n[o] = t[o]);
  }
  return n;
}
var _n = "1.15.0";
function J(t) {
  if (typeof window != "undefined" && window.navigator)
    return !!navigator.userAgent.match(t);
}
var Q = J(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Ie = J(/Edge/i);
var Et = J(/firefox/i);
var _e = J(/safari/i) && !J(/chrome/i) && !J(/android/i);
var xt = J(/iP(ad|od|hone)/i);
var Mt = J(/chrome/i) && J(/android/i);
var Ft = {
  capture: false,
  passive: false
};
function S(t, e, n) {
  t.addEventListener(e, n, !Q && Ft);
}
function E(t, e, n) {
  t.removeEventListener(e, n, !Q && Ft);
}
function Le(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch (n) {
        return false;
      }
    return false;
  }
}
function Dn(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function V(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && Le(t, e) : Le(t, e)) || o && t === n)
        return t;
      if (t === n)
        break;
    } while (t = Dn(t));
  }
  return null;
}
var St = /\s+/g;
function L(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var o = (" " + t.className + " ").replace(St, " ").replace(" " + e + " ", " ");
      t.className = (o + (n ? " " + e : "")).replace(St, " ");
    }
}
function h2(t, e, n) {
  var o = t && t.style;
  if (o) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function ge(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var o = h2(t, "transform");
      o && o !== "none" && (n = o + " " + n);
    } while (!e && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Xt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e), r = 0, i = o.length;
    if (n)
      for (; r < i; r++)
        n(o[r], r);
    return o;
  }
  return [];
}
function $() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function N(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, d, c;
    if (t !== window && t.parentNode && t !== $() ? (i = t.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, u = i.right, d = i.height, c = i.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (r = r || t.parentNode, !Q))
      do
        if (r && r.getBoundingClientRect && (h2(r, "transform") !== "none" || n && h2(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(h2(r, "border-top-width")), l -= m.left + parseInt(h2(r, "border-left-width")), s = a + i.height, u = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && t !== window) {
      var y = ge(r || t), v = y && y.a, w = y && y.d;
      y && (a /= w, l /= v, c /= v, d /= w, s = a + d, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: d
    };
  }
}
function _t(t, e, n) {
  for (var o = re(t, true), r = N(t)[e]; o; ) {
    var i = N(o)[n], a = void 0;
    if (n === "top" || n === "left" ? a = r >= i : a = r <= i, !a)
      return o;
    if (o === $())
      break;
    o = re(o, false);
  }
  return false;
}
function me(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== p.ghost && (o || a[i] !== p.dragged) && V(a[i], n.draggable, t, false)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function ct(t, e) {
  for (var n = t.lastElementChild; n && (n === p.ghost || h2(n, "display") === "none" || e && !Le(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function j(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== p.clone && (!e || Le(t, e)) && n++;
  return n;
}
function Dt(t) {
  var e = 0, n = 0, o = $();
  if (t)
    do {
      var r = ge(t), i = r.a, a = r.d;
      e += t.scrollLeft * i, n += t.scrollTop * a;
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function Tn(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === t[n][o])
          return Number(n);
    }
  return -1;
}
function re(t, e) {
  if (!t || !t.getBoundingClientRect)
    return $();
  var n = t, o = false;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h2(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return $();
        if (o || e)
          return n;
        o = true;
      }
    }
  while (n = n.parentNode);
  return $();
}
function On(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function qe(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var De;
function Rt(t, e) {
  return function() {
    if (!De) {
      var n = arguments, o = this;
      n.length === 1 ? t.call(o, n[0]) : t.apply(o, n), De = setTimeout(function() {
        De = void 0;
      }, e);
    }
  };
}
function Cn() {
  clearTimeout(De), De = void 0;
}
function Yt(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function kt(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(true) : n ? n(t).clone(true)[0] : t.cloneNode(true);
}
var G = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function In() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(h2(r, "display") === "none" || r === p.ghost)) {
            t.push({
              target: r,
              rect: N(r)
            });
            var i = q({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = ge(r, true);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(o) {
      t.push(o);
    },
    removeAnimationState: function(o) {
      t.splice(Tn(t, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var i = false, a = 0;
      t.forEach(function(l) {
        var s = 0, u = l.target, d = u.fromRect, c = N(u), m = u.prevFromRect, y = u.prevToRect, v = l.rect, w = ge(u, true);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && qe(m, c) && !qe(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = Nn(v, m, y, r.options)), qe(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = r.options.animation), r.animate(u, v, c, s)), s && (i = true, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), t = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        h2(o, "transition", ""), h2(o, "transform", "");
        var l = ge(this.el), s = l && l.a, u = l && l.d, d = (r.left - i.left) / (s || 1), c = (r.top - i.top) / (u || 1);
        o.animatingX = !!d, o.animatingY = !!c, h2(o, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = An(o), h2(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h2(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          h2(o, "transition", ""), h2(o, "transform", ""), o.animated = false, o.animatingX = false, o.animatingY = false;
        }, a);
      }
    }
  };
}
function An(t) {
  return t.offsetWidth;
}
function Nn(t, e, n, o) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * o.animation;
}
var ce = [];
var Ke = {
  initializeByDefault: true
};
var Ae = {
  mount: function(e) {
    for (var n in Ke)
      Ke.hasOwnProperty(n) && !(n in e) && (e[n] = Ke[n]);
    ce.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), ce.push(e);
  },
  pluginEvent: function(e, n, o) {
    var r = this;
    this.eventCanceled = false, o.cancel = function() {
      r.eventCanceled = true;
    };
    var i = e + "Global";
    ce.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](q({
        sortable: n
      }, o)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](q({
        sortable: n
      }, o)));
    });
  },
  initializePlugins: function(e, n, o, r) {
    ce.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, Z(o, u.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a != "undefined" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, n) {
    var o = {};
    return ce.forEach(function(r) {
      typeof r.eventProperties == "function" && Z(o, r.eventProperties.call(n[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, n, o) {
    var r;
    return ce.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(e[i.pluginName], o));
    }), r;
  }
};
function Pn(t) {
  var e = t.sortable, n = t.rootEl, o = t.name, r = t.targetEl, i = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, m = t.originalEvent, y = t.putSortable, v = t.extraEventProperties;
  if (e = e || n && n[G], !!e) {
    var w, T = e.options, R = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !Q && !Ie ? w = new CustomEvent(o, {
      bubbles: true,
      cancelable: true
    }) : (w = document.createEvent("Event"), w.initEvent(o, true, true)), w.to = a || n, w.from = l || n, w.item = r || n, w.clone = i, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = c, w.originalEvent = m, w.pullMode = y ? y.lastPutMode : void 0;
    var P = q(q({}, v), Ae.getEventProperties(o, e));
    for (var Y in P)
      w[Y] = P[Y];
    n && n.dispatchEvent(w), T[R] && T[R].call(e, w);
  }
}
var xn = ["evt"];
var H = function(e, n) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = Sn(o, xn);
  Ae.pluginEvent.bind(p)(e, n, q({
    dragEl: f,
    parentEl: C,
    ghostEl: g,
    rootEl: D,
    nextEl: fe,
    lastDownEl: Ye,
    cloneEl: O,
    cloneHidden: oe,
    dragStarted: we,
    putSortable: x,
    activeSortable: p.active,
    originalEvent: r,
    oldIndex: pe,
    oldDraggableIndex: Te,
    newIndex: W,
    newDraggableIndex: ne,
    hideGhostForTarget: Wt,
    unhideGhostForTarget: Gt,
    cloneNowHidden: function() {
      oe = true;
    },
    cloneNowShown: function() {
      oe = false;
    },
    dispatchSortableEvent: function(l) {
      X({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function X(t) {
  Pn(q({
    putSortable: x,
    cloneEl: O,
    targetEl: f,
    rootEl: D,
    oldIndex: pe,
    oldDraggableIndex: Te,
    newIndex: W,
    newDraggableIndex: ne
  }, t));
}
var f;
var C;
var g;
var D;
var fe;
var Ye;
var O;
var oe;
var pe;
var W;
var Te;
var ne;
var xe;
var x;
var he = false;
var We = false;
var Ge = [];
var se;
var z;
var Je;
var Ze;
var Tt;
var Ot;
var we;
var de;
var Oe;
var Ce = false;
var Me = false;
var ke;
var F;
var Qe = [];
var it = false;
var je = [];
var Ue = typeof document != "undefined";
var Fe = xt;
var Ct = Ie || Q ? "cssFloat" : "float";
var Mn = Ue && !Mt && !xt && "draggable" in document.createElement("div");
var Bt = function() {
  if (Ue) {
    if (Q)
      return false;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
}();
var Ht = function(e, n) {
  var o = h2(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = me(e, 0, n), a = me(e, 1, n), l = i && h2(i), s = a && h2(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + N(i).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + N(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && o[Ct] === "none" || a && o[Ct] === "none" && u + d > r) ? "vertical" : "horizontal";
};
var Fn = function(e, n, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, l = o ? n.left : n.top, s = o ? n.right : n.bottom, u = o ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + u / 2;
};
var Xn = function(e, n) {
  var o;
  return Ge.some(function(r) {
    var i = r[G].options.emptyInsertThreshold;
    if (!(!i || ct(r))) {
      var a = N(r), l = e >= a.left - i && e <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return o = r;
    }
  }), o;
};
var Lt = function(e) {
  function n(i, a) {
    return function(l, s, u, d) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || c))
        return true;
      if (i == null || i === false)
        return false;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, u, d), a)(l, s, u, d);
      var m = (a ? l : s).options.group.name;
      return i === true || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || Re(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = n(r.pull, true), o.checkPut = n(r.put), o.revertClone = r.revertClone, e.group = o;
};
var Wt = function() {
  !Bt && g && h2(g, "display", "none");
};
var Gt = function() {
  !Bt && g && h2(g, "display", "");
};
Ue && !Mt && document.addEventListener("click", function(t) {
  if (We)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), We = false, false;
}, true);
var ue = function(e) {
  if (f) {
    e = e.touches ? e.touches[0] : e;
    var n = Xn(e.clientX, e.clientY);
    if (n) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = n, o.preventDefault = void 0, o.stopPropagation = void 0, n[G]._onDragOver(o);
    }
  }
};
var Rn = function(e) {
  f && f.parentNode[G]._isOutsideThisEl(e.target);
};
function p(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = Z({}, e), t[G] = this;
  var n = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function() {
      return Ht(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: p.supportPointer !== false && "PointerEvent" in window && !_e,
    emptyInsertThreshold: 5
  };
  Ae.initializePlugins(this, t, n);
  for (var o in n)
    !(o in e) && (e[o] = n[o]);
  Lt(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? false : Mn, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(t, "pointerdown", this._onTapStart) : (S(t, "mousedown", this._onTapStart), S(t, "touchstart", this._onTapStart)), this.nativeDraggable && (S(t, "dragover", this), S(t, "dragenter", this)), Ge.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Z(this, In());
}
p.prototype = /** @lends Sortable.prototype */
{
  constructor: p,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (de = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, f) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = r.filter;
      if (jn(o), !f && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && _e && s && s.tagName.toUpperCase() === "SELECT") && (s = V(s, r.draggable, o, false), !(s && s.animated) && Ye !== s)) {
        if (pe = j(s), Te = j(s, r.draggable), typeof d == "function") {
          if (d.call(this, e, s, this)) {
            X({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: o,
              fromEl: o
            }), H("filter", n, {
              evt: e
            }), i && e.cancelable && e.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = V(u, c.trim(), o, false), c)
            return X({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: o,
              toEl: o
            }), H("filter", n, {
              evt: e
            }), true;
        }), d)) {
          i && e.cancelable && e.preventDefault();
          return;
        }
        r.handle && !V(u, r.handle, o, false) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, o) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (o && !f && o.parentNode === i) {
      var u = N(o);
      if (D = i, f = o, C = f.parentNode, fe = f.nextSibling, Ye = o, xe = a.group, p.dragged = f, se = {
        target: f,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Tt = se.clientX - u.left, Ot = se.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, f.style["will-change"] = "all", s = function() {
        if (H("delayEnded", r, {
          evt: e
        }), p.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Et && r.nativeDraggable && (f.draggable = true), r._triggerDragStart(e, n), X({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), L(f, a.chosenClass, true);
      }, a.ignore.split(",").forEach(function(d) {
        Xt(f, d.trim(), et);
      }), S(l, "dragover", ue), S(l, "mousemove", ue), S(l, "touchmove", ue), S(l, "mouseup", r._onDrop), S(l, "touchend", r._onDrop), S(l, "touchcancel", r._onDrop), Et && this.nativeDraggable && (this.options.touchStartThreshold = 4, f.draggable = true), H("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ie || Q))) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        S(l, "mouseup", r._disableDelayedDrag), S(l, "touchend", r._disableDelayedDrag), S(l, "touchcancel", r._disableDelayedDrag), S(l, "mousemove", r._delayedDragTouchMoveHandler), S(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && S(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    f && et(f), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    E(e, "mouseup", this._disableDelayedDrag), E(e, "touchend", this._disableDelayedDrag), E(e, "touchcancel", this._disableDelayedDrag), E(e, "mousemove", this._delayedDragTouchMoveHandler), E(e, "touchmove", this._delayedDragTouchMoveHandler), E(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : n ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(f, "dragend", this), S(D, "dragstart", this._onDragStart));
    try {
      document.selection ? Be(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch (o) {
    }
  },
  _dragStarted: function(e, n) {
    if (he = false, D && f) {
      H("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && S(document, "dragover", Rn);
      var o = this.options;
      !e && L(f, o.dragClass, false), L(f, o.ghostClass, true), p.active = this, e && this._appendGhost(), X({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (z) {
      this._lastX = z.clientX, this._lastY = z.clientY, Wt();
      for (var e = document.elementFromPoint(z.clientX, z.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(z.clientX, z.clientY), e !== n); )
        n = e;
      if (f.parentNode[G]._isOutsideThisEl(e), n)
        do {
          if (n[G]) {
            var o = void 0;
            if (o = n[G]._onDragOver({
              clientX: z.clientX,
              clientY: z.clientY,
              target: e,
              rootEl: n
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = n.parentNode);
      Gt();
    }
  },
  _onTouchMove: function(e) {
    if (se) {
      var n = this.options, o = n.fallbackTolerance, r = n.fallbackOffset, i = e.touches ? e.touches[0] : e, a = g && ge(g, true), l = g && a && a.a, s = g && a && a.d, u = Fe && F && Dt(F), d = (i.clientX - se.clientX + r.x) / (l || 1) + (u ? u[0] - Qe[0] : 0) / (l || 1), c = (i.clientY - se.clientY + r.y) / (s || 1) + (u ? u[1] - Qe[1] : 0) / (s || 1);
      if (!p.active && !he) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, true);
      }
      if (g) {
        a ? (a.e += d - (Je || 0), a.f += c - (Ze || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h2(g, "webkitTransform", m), h2(g, "mozTransform", m), h2(g, "msTransform", m), h2(g, "transform", m), Je = d, Ze = c, z = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : D, n = N(f, true, Fe, true, e), o = this.options;
      if (Fe) {
        for (F = e; h2(F, "position") === "static" && h2(F, "transform") === "none" && F !== document; )
          F = F.parentNode;
        F !== document.body && F !== document.documentElement ? (F === document && (F = $()), n.top += F.scrollTop, n.left += F.scrollLeft) : F = $(), Qe = Dt(F);
      }
      g = f.cloneNode(true), L(g, o.ghostClass, false), L(g, o.fallbackClass, true), L(g, o.dragClass, true), h2(g, "transition", ""), h2(g, "transform", ""), h2(g, "box-sizing", "border-box"), h2(g, "margin", 0), h2(g, "top", n.top), h2(g, "left", n.left), h2(g, "width", n.width), h2(g, "height", n.height), h2(g, "opacity", "0.8"), h2(g, "position", Fe ? "absolute" : "fixed"), h2(g, "zIndex", "100000"), h2(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h2(g, "transform-origin", Tt / parseInt(g.style.width) * 100 + "% " + Ot / parseInt(g.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (H("dragStart", this, {
      evt: e
    }), p.eventCanceled) {
      this._onDrop();
      return;
    }
    H("setupClone", this), p.eventCanceled || (O = kt(f), O.removeAttribute("id"), O.draggable = false, O.style["will-change"] = "", this._hideClone(), L(O, this.options.chosenClass, false), p.clone = O), o.cloneId = Be(function() {
      H("clone", o), !p.eventCanceled && (o.options.removeCloneOnHide || D.insertBefore(O, f), o._hideClone(), X({
        sortable: o,
        name: "clone"
      }));
    }), !n && L(f, i.dragClass, true), n ? (We = true, o._loopId = setInterval(o._emulateDragOver, 50)) : (E(document, "mouseup", o._onDrop), E(document, "touchend", o._onDrop), E(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, f)), S(document, "drop", o), h2(f, "transform", "translateZ(0)")), he = true, o._dragStartId = Be(o._dragStarted.bind(o, n, e)), S(document, "selectstart", o), we = true, _e && h2(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, o = e.target, r, i, a, l = this.options, s = l.group, u = p.active, d = xe === s, c = l.sort, m = x || u, y, v = this, w = false;
    if (it)
      return;
    function T(ye, Ut) {
      H(ye, v, q({
        evt: e,
        isOwner: d,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: m,
        target: o,
        completed: P,
        onMove: function(pt, Vt) {
          return Xe(D, n, f, r, pt, N(pt), e, Vt);
        },
        changed: Y
      }, Ut));
    }
    function R() {
      T("dragOverAnimationCapture"), v.captureAnimationState(), v !== m && m.captureAnimationState();
    }
    function P(ye) {
      return T("dragOverCompleted", {
        insertion: ye
      }), ye && (d ? u._hideClone() : u._showClone(v), v !== m && (L(f, x ? x.options.ghostClass : u.options.ghostClass, false), L(f, l.ghostClass, true)), x !== v && v !== p.active ? x = v : v === p.active && x && (x = null), m === v && (v._ignoreWhileAnimating = o), v.animateAll(function() {
        T("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (o === f && !f.animated || o === n && !o.animated) && (de = null), !l.dragoverBubble && !e.rootEl && o !== document && (f.parentNode[G]._isOutsideThisEl(e.target), !ye && ue(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = true;
    }
    function Y() {
      W = j(f), ne = j(f, l.draggable), X({
        sortable: v,
        name: "change",
        toEl: n,
        newIndex: W,
        newDraggableIndex: ne,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = V(o, l.draggable, n, true), T("dragOver"), p.eventCanceled)
      return w;
    if (f.contains(e.target) || o.animated && o.animatingX && o.animatingY || v._ignoreWhileAnimating === o)
      return P(false);
    if (We = false, u && !l.disabled && (d ? c || (a = C !== D) : x === this || (this.lastPutMode = xe.checkPull(this, u, f, e)) && s.checkPut(this, u, f, e))) {
      if (y = this._getDirection(e, o) === "vertical", r = N(f), T("dragOverValid"), p.eventCanceled)
        return w;
      if (a)
        return C = D, R(), this._hideClone(), T("revert"), p.eventCanceled || (fe ? D.insertBefore(f, fe) : D.appendChild(f)), P(true);
      var M = ct(n, l.draggable);
      if (!M || Hn(e, y, this) && !M.animated) {
        if (M === f)
          return P(false);
        if (M && n === e.target && (o = M), o && (i = N(o)), Xe(D, n, f, r, o, i, e, !!o) !== false)
          return R(), M && M.nextSibling ? n.insertBefore(f, M.nextSibling) : n.appendChild(f), C = n, Y(), P(true);
      } else if (M && Bn(e, y, this)) {
        var b = me(n, 0, l, true);
        if (b === f)
          return P(false);
        if (o = b, i = N(o), Xe(D, n, f, r, o, i, e, false) !== false)
          return R(), n.insertBefore(f, b), C = n, Y(), P(true);
      } else if (o.parentNode === n) {
        i = N(o);
        var _ = 0, k, B = f.parentNode !== n, I = !Fn(f.animated && f.toRect || r, o.animated && o.toRect || i, y), ie = y ? "top" : "left", ee = _t(o, "top", "top") || _t(f, "top", "top"), ve = ee ? ee.scrollTop : void 0;
        de !== o && (k = i[ie], Ce = false, Me = !I && l.invertSwap || B), _ = Ln(e, o, i, y, I ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Me, de === o);
        var K;
        if (_ !== 0) {
          var ae = j(f);
          do
            ae -= _, K = C.children[ae];
          while (K && (h2(K, "display") === "none" || K === g));
        }
        if (_ === 0 || K === o)
          return P(false);
        de = o, Oe = _;
        var be = o.nextElementSibling, te = false;
        te = _ === 1;
        var Ne = Xe(D, n, f, r, o, i, e, te);
        if (Ne !== false)
          return (Ne === 1 || Ne === -1) && (te = Ne === 1), it = true, setTimeout(kn, 30), R(), te && !be ? n.appendChild(f) : o.parentNode.insertBefore(f, te ? be : o), ee && Yt(ee, 0, ve - ee.scrollTop), C = f.parentNode, k !== void 0 && !Me && (ke = Math.abs(k - N(o)[ie])), Y(), P(true);
      }
      if (n.contains(f))
        return P(false);
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    E(document, "mousemove", this._onTouchMove), E(document, "touchmove", this._onTouchMove), E(document, "pointermove", this._onTouchMove), E(document, "dragover", ue), E(document, "mousemove", ue), E(document, "touchmove", ue);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    E(e, "mouseup", this._onDrop), E(e, "touchend", this._onDrop), E(e, "pointerup", this._onDrop), E(e, "touchcancel", this._onDrop), E(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, o = this.options;
    if (W = j(f), ne = j(f, o.draggable), H("drop", this, {
      evt: e
    }), C = f && f.parentNode, W = j(f), ne = j(f, o.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    he = false, Me = false, Ce = false, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), at(this.cloneId), at(this._dragStartId), this.nativeDraggable && (E(document, "drop", this), E(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), _e && h2(document.body, "user-select", ""), h2(f, "transform", ""), e && (we && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (D === C || x && x.lastPutMode !== "clone") && O && O.parentNode && O.parentNode.removeChild(O), f && (this.nativeDraggable && E(f, "dragend", this), et(f), f.style["will-change"] = "", we && !he && L(f, x ? x.options.ghostClass : this.options.ghostClass, false), L(f, this.options.chosenClass, false), X({
      sortable: this,
      name: "unchoose",
      toEl: C,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), D !== C ? (W >= 0 && (X({
      rootEl: C,
      name: "add",
      toEl: C,
      fromEl: D,
      originalEvent: e
    }), X({
      sortable: this,
      name: "remove",
      toEl: C,
      originalEvent: e
    }), X({
      rootEl: C,
      name: "sort",
      toEl: C,
      fromEl: D,
      originalEvent: e
    }), X({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: e
    })), x && x.save()) : W !== pe && W >= 0 && (X({
      sortable: this,
      name: "update",
      toEl: C,
      originalEvent: e
    }), X({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: e
    })), p.active && ((W == null || W === -1) && (W = pe, ne = Te), X({
      sortable: this,
      name: "end",
      toEl: C,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    H("nulling", this), D = f = C = g = fe = O = Ye = oe = se = z = we = W = ne = pe = Te = de = Oe = x = xe = p.dragged = p.ghost = p.clone = p.active = null, je.forEach(function(e) {
      e.checked = true;
    }), je.length = Je = Ze = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        f && (this._onDragOver(e), Yn(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, o = this.el.children, r = 0, i = o.length, a = this.options; r < i; r++)
      n = o[r], V(n, a.draggable, this.el, false) && e.push(n.getAttribute(a.dataIdAttr) || Gn(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var o = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var l = r.children[a];
      V(l, this.options.draggable, r, false) && (o[i] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(i) {
      o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return V(e, n || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var o = this.options;
    if (n === void 0)
      return o[e];
    var r = Ae.modifyOption(this, e, n);
    typeof r != "undefined" ? o[e] = r : o[e] = n, e === "group" && Lt(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    H("destroy", this);
    var e = this.el;
    e[G] = null, E(e, "mousedown", this._onTapStart), E(e, "touchstart", this._onTapStart), E(e, "pointerdown", this._onTapStart), this.nativeDraggable && (E(e, "dragover", this), E(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ge.splice(Ge.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!oe) {
      if (H("hideClone", this), p.eventCanceled)
        return;
      h2(O, "display", "none"), this.options.removeCloneOnHide && O.parentNode && O.parentNode.removeChild(O), oe = true;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (oe) {
      if (H("showClone", this), p.eventCanceled)
        return;
      f.parentNode == D && !this.options.group.revertClone ? D.insertBefore(O, f) : fe ? D.insertBefore(O, fe) : D.appendChild(O), this.options.group.revertClone && this.animate(f, O), h2(O, "display", ""), oe = false;
    }
  }
};
function Yn(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Xe(t, e, n, o, r, i, a, l) {
  var s, u = t[G], d = u.options.onMove, c;
  return window.CustomEvent && !Q && !Ie ? s = new CustomEvent("move", {
    bubbles: true,
    cancelable: true
  }) : (s = document.createEvent("Event"), s.initEvent("move", true, true)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = r || e, s.relatedRect = i || N(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function et(t) {
  t.draggable = false;
}
function kn() {
  it = false;
}
function Bn(t, e, n) {
  var o = N(me(n.el, 0, n.options, true)), r = 10;
  return e ? t.clientX < o.left - r || t.clientY < o.top && t.clientX < o.right : t.clientY < o.top - r || t.clientY < o.bottom && t.clientX < o.left;
}
function Hn(t, e, n) {
  var o = N(ct(n.el, n.options.draggable)), r = 10;
  return e ? t.clientX > o.right + r || t.clientX <= o.right && t.clientY > o.bottom && t.clientX >= o.left : t.clientX > o.right && t.clientY > o.top || t.clientX <= o.right && t.clientY > o.bottom + r;
}
function Ln(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX, u = o ? n.height : n.width, d = o ? n.top : n.left, c = o ? n.bottom : n.right, m = false;
  if (!a) {
    if (l && ke < u * r) {
      if (!Ce && (Oe === 1 ? s > d + u * i / 2 : s < c - u * i / 2) && (Ce = true), Ce)
        m = true;
      else if (Oe === 1 ? s < d + ke : s > c - ke)
        return -Oe;
    } else if (s > d + u * (1 - r) / 2 && s < c - u * (1 - r) / 2)
      return Wn(e);
  }
  return m = m || a, m && (s < d + u * i / 2 || s > c - u * i / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Wn(t) {
  return j(f) < j(t) ? 1 : -1;
}
function Gn(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function jn(t) {
  je.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var o = e[n];
    o.checked && je.push(o);
  }
}
function Be(t) {
  return setTimeout(t, 0);
}
function at(t) {
  return clearTimeout(t);
}
Ue && S(document, "touchmove", function(t) {
  (p.active || he) && t.cancelable && t.preventDefault();
});
p.utils = {
  on: S,
  off: E,
  css: h2,
  find: Xt,
  is: function(e, n) {
    return !!V(e, n, e, false);
  },
  extend: On,
  throttle: Rt,
  closest: V,
  toggleClass: L,
  clone: kt,
  index: j,
  nextTick: Be,
  cancelNextTick: at,
  detectDirection: Ht,
  getChild: me
};
p.get = function(t) {
  return t[G];
};
p.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (p.utils = q(q({}, p.utils), o.utils)), Ae.mount(o);
  });
};
p.create = function(t, e) {
  return new p(t, e);
};
p.version = _n;
var A = [];
var Ee;
var lt;
var st = false;
var tt;
var nt;
var ze;
var Se;
function zn() {
  function t() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(n) {
      var o = n.originalEvent;
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? S(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? S(document, "touchmove", this._handleFallbackAutoScroll) : S(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var o = n.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? E(document, "dragover", this._handleAutoScroll) : (E(document, "pointermove", this._handleFallbackAutoScroll), E(document, "touchmove", this._handleFallbackAutoScroll), E(document, "mousemove", this._handleFallbackAutoScroll)), It(), He(), Cn();
    },
    nulling: function() {
      ze = lt = Ee = st = Se = tt = nt = null, A.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, true);
    },
    _handleAutoScroll: function(n, o) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (ze = n, o || this.options.forceAutoScrollFallback || Ie || Q || _e) {
        ot(n, this.options, l, o);
        var s = re(l, true);
        st && (!Se || i !== tt || a !== nt) && (Se && It(), Se = setInterval(function() {
          var u = re(document.elementFromPoint(i, a), true);
          u !== s && (s = u, He()), ot(n, r.options, u, o);
        }, 10), tt = i, nt = a);
      } else {
        if (!this.options.bubbleScroll || re(l, true) === $()) {
          He();
          return;
        }
        ot(n, this.options, re(l, false), false);
      }
    }
  }, Z(t, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function He() {
  A.forEach(function(t) {
    clearInterval(t.pid);
  }), A = [];
}
function It() {
  clearInterval(Se);
}
var ot = Rt(function(t, e, n, o) {
  if (e.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, i = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = $(), u = false, d;
    lt !== n && (lt = n, He(), Ee = e.scroll, d = e.scrollFn, Ee === true && (Ee = re(n, true)));
    var c = 0, m = Ee;
    do {
      var y = m, v = N(y), w = v.top, T = v.bottom, R = v.left, P = v.right, Y = v.width, M = v.height, b = void 0, _ = void 0, k = y.scrollWidth, B = y.scrollHeight, I = h2(y), ie = y.scrollLeft, ee = y.scrollTop;
      y === s ? (b = Y < k && (I.overflowX === "auto" || I.overflowX === "scroll" || I.overflowX === "visible"), _ = M < B && (I.overflowY === "auto" || I.overflowY === "scroll" || I.overflowY === "visible")) : (b = Y < k && (I.overflowX === "auto" || I.overflowX === "scroll"), _ = M < B && (I.overflowY === "auto" || I.overflowY === "scroll"));
      var ve = b && (Math.abs(P - r) <= a && ie + Y < k) - (Math.abs(R - r) <= a && !!ie), K = _ && (Math.abs(T - i) <= a && ee + M < B) - (Math.abs(w - i) <= a && !!ee);
      if (!A[c])
        for (var ae = 0; ae <= c; ae++)
          A[ae] || (A[ae] = {});
      (A[c].vx != ve || A[c].vy != K || A[c].el !== y) && (A[c].el = y, A[c].vx = ve, A[c].vy = K, clearInterval(A[c].pid), (ve != 0 || K != 0) && (u = true, A[c].pid = setInterval((function() {
        o && this.layer === 0 && p.active._onTouchMove(ze);
        var be = A[this.layer].vy ? A[this.layer].vy * l : 0, te = A[this.layer].vx ? A[this.layer].vx * l : 0;
        typeof d == "function" && d.call(p.dragged.parentNode[G], te, be, t, ze, A[this.layer].el) !== "continue" || Yt(A[this.layer].el, te, be);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && m !== s && (m = re(m, false)));
    st = u;
  }
}, 30);
var jt = function(e) {
  var n = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = o || i;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function dt() {
}
dt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = me(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: jt
};
Z(dt, {
  pluginName: "revertOnSpill"
});
function ht() {
}
ht.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: jt
};
Z(ht, {
  pluginName: "removeOnSpill"
});
p.mount(new zn());
p.mount(ht, dt);
function Un(t) {
  return t == null ? t : JSON.parse(JSON.stringify(t));
}
function Vn(t) {
  getCurrentInstance() && onUnmounted(t);
}
function $n(t) {
  getCurrentInstance() ? onMounted(t) : t();
}
var At = Symbol("cloneElement");
function zt(...t) {
  var Y, M;
  const e = (Y = getCurrentInstance()) == null ? void 0 : Y.proxy, n = t[0];
  let [, o, r] = t;
  Array.isArray(unref(o)) || (r = o, o = null);
  let i = null;
  const { immediate: a = true, clone: l = Un } = (M = unref(r)) != null ? M : {};
  function s(b) {
    var _;
    b.item[At] = l(unref((_ = unref(o)) == null ? void 0 : _[b.oldIndex]));
  }
  function u(b) {
    const _ = b.item[At];
    hn(_) || ($e(b.item), dn(unref(o), b.newIndex, _));
  }
  function d(b) {
    const { from: _, item: k, oldIndex: B, pullMode: I, clone: ie } = b;
    if (I === "clone") {
      yt(_, k, B), $e(ie);
      return;
    }
    cn(unref(o), B);
  }
  function c(b) {
    const { from: _, item: k, oldIndex: B, newIndex: I } = b;
    $e(k), yt(_, k, B), sn(unref(o), B, I);
  }
  const m = {
    onUpdate: c,
    onStart: s,
    onAdd: u,
    onRemove: d
  };
  function y(b) {
    const _ = unref(n);
    return b || (b = pn(_) ? gn(_, e == null ? void 0 : e.$el) : _), b && !bn(b) && (b = b.$el), b || ln("Root element not found"), b;
  }
  function v() {
    var B;
    const I = (B = unref(r)) != null ? B : {}, { immediate: b, clone: _ } = I, k = Ve(I, ["immediate", "clone"]);
    return vn(
      o === null ? {} : m,
      k
    );
  }
  const w = (b) => {
    b = y(b), i && T.destroy(), i = new p(b, v());
  };
  watch(
    () => r,
    () => {
      i && yn(v(), (b, _) => {
        i == null || i.option(b, _);
      });
    },
    { deep: true }
  );
  const T = {
    option: (b, _) => i == null ? void 0 : i.option(b, _),
    destroy: () => {
      i == null || i.destroy(), i = null;
    },
    save: () => i == null ? void 0 : i.save(),
    toArray: () => i == null ? void 0 : i.toArray(),
    closest: (...b) => i == null ? void 0 : i.closest(...b)
  }, R = () => T == null ? void 0 : T.option("disabled", true), P = () => T == null ? void 0 : T.option("disabled", false);
  return $n(() => {
    a && w();
  }), Vn(T.destroy), le({ start: w, pause: R, resume: P }, T);
}
var ut = [
  "update",
  "start",
  "add",
  "remove",
  "choose",
  "unchoose",
  "end",
  "sort",
  "filter",
  "clone",
  "move",
  "change"
];
var qn = [
  "animation",
  "ghostClass",
  "group",
  "sort",
  "disabled",
  "store",
  "handle",
  "draggable",
  "swapThreshold",
  "invertSwap",
  "invertedSwapThreshold",
  "removeCloneOnHide",
  "direction",
  "chosenClass",
  "dragClass",
  "ignore",
  "filter",
  "preventOnFilter",
  "easing",
  "setData",
  "dropBubble",
  "dragoverBubble",
  "dataIdAttr",
  "delay",
  "delayOnTouchOnly",
  "touchStartThreshold",
  "forceFallback",
  "fallbackClass",
  "fallbackOnBody",
  "fallbackTolerance",
  "fallbackOffset",
  "supportPointer",
  "emptyInsertThreshold",
  "scroll",
  "forceAutoScrollFallback",
  "scrollSensitivity",
  "scrollSpeed",
  "bubbleScroll",
  "modelValue",
  "tag",
  "target",
  ...ut.map((t) => `on${t.replace(/^\S/, (e) => e.toUpperCase())}`)
];
var Qn = defineComponent({
  name: "VueDraggable",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: qn,
  emits: ["update:modelValue", ...ut],
  setup(t, { slots: e, emit: n, expose: o }) {
    const r = useAttrs(), i = ut.reduce((d, c) => {
      const m = `on${c.replace(/^\S/, (y) => y.toUpperCase())}`;
      return d[m] = (y) => n(c, y), d;
    }, {}), a = computed(() => {
      const y = toRefs(t), { modelValue: d } = y, c = Ve(y, ["modelValue"]), m = Object.entries(c).reduce((v, [w, T]) => {
        const R = unref(T);
        return R !== void 0 && (v[w] = R), v;
      }, {});
      return le(le({}, i), fn(le(le({}, r), m)));
    }), l = computed({
      get: () => t.modelValue,
      set: (d) => n("update:modelValue", d)
    }), s = ref(), u = reactive(
      zt(t.target || s, l, a)
    );
    return o(u), () => {
      if (e.default)
        return h(t.tag || "div", { ref: s }, e.default(u));
    };
  }
});
var Nt = {
  mounted: "mounted",
  unmounted: "unmounted"
};
var rt = /* @__PURE__ */ new WeakMap();
var eo = {
  [Nt.mounted](t, e) {
    const n = isProxy(e.value) ? [e.value] : e.value, o = zt(t, ...n);
    rt.set(t, o.destroy);
  },
  [Nt.unmounted](t) {
    var e;
    (e = rt.get(t)) == null || e(), rt.delete(t);
  }
};
export {
  Qn as VueDraggable,
  zt as useDraggable,
  eo as vDraggable
};
/*! Bundled license information:

vue-draggable-plus/dist/vue-draggable-plus.js:
  (**!
   * Sortable 1.15.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=vue-draggable-plus.js.map
