var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, i) { t != Array.prototype && t != Object.prototype && (t[e] = i.value) }, $jscomp.getGlobal = function(t) { return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(t, e, i, r) {
        if (e) {
            for (i = $jscomp.global, t = t.split("."), r = 0; r < t.length - 1; r++) {
                var s = t[r];
                s in i || (i[s] = {}), i = i[s]
            }
            t = t[t.length - 1], r = i[t], e = e(r), e != r && null != e && $jscomp.defineProperty(i, t, { configurable: !0, writable: !0, value: e })
        }
    }, $jscomp.polyfill("Math.hypot", function(t) {
        return t ? t : function(t, e, i) {
            t = Number(t), e = Number(e);
            var r, s = Math.max(Math.abs(t), Math.abs(e));
            for (r = 2; r < arguments.length; r++) s = Math.max(s, Math.abs(arguments[r]));
            if (1e100 < s || 1e-100 > s) {
                t /= s, e /= s;
                var n = t * t + e * e;
                for (r = 2; r < arguments.length; r++) {
                    var o = Number(arguments[r]) / s;
                    n += o * o
                }
                return Math.sqrt(n) * s
            }
            for (n = t * t + e * e, r = 2; r < arguments.length; r++) o = Number(arguments[r]), n += o * o;
            return Math.sqrt(n)
        }
    }, "es6-impl", "es3"),
    function(t) {
        function e() {}

        function i(t) { if (!t || "object" != typeof t) return !1; var e = b(t) || at; return /object|function/.test(typeof e.Element) ? t instanceof e.Element : 1 === t.nodeType && "string" == typeof t.nodeName }

        function r(t) { return t === at || !(!t || !t.Window) && t instanceof t.Window }

        function s(t) { return n(t) && !0 && o(t.splice) }

        function n(t) { return !!t && "object" == typeof t }

        function o(t) { return "function" == typeof t }

        function a(t) { return "number" == typeof t }

        function h(t) { return "boolean" == typeof t }

        function p(t) { return "string" == typeof t }

        function l(t) { return !!p(t) && (ht.querySelector(t), !0) }

        function c(t, e) { for (var i in e) t[i] = e[i]; return t }

        function d(t, e) {
            for (var i in e) {
                var r, s = !1;
                for (r in jt)
                    if (0 === i.indexOf(r) && jt[r].test(i)) { s = !0; break }
                s || (t[i] = e[i])
            }
            return t
        }

        function u(t, e) { t.page = t.page || {}, t.page.x = e.page.x, t.page.y = e.page.y, t.client = t.client || {}, t.client.x = e.client.x, t.client.y = e.client.y, t.timeStamp = e.timeStamp }

        function g(t, e, i) { t.page.x = i.page.x - e.page.x, t.page.y = i.page.y - e.page.y, t.client.x = i.client.x - e.client.x, t.client.y = i.client.y - e.client.y, t.timeStamp = (new Date).getTime() - e.timeStamp, e = Math.max(t.timeStamp / 1e3, .001), t.page.speed = mt(t.page.x, t.page.y) / e, t.page.vx = t.page.x / e, t.page.vy = t.page.y / e, t.client.speed = mt(t.client.x, t.page.y) / e, t.client.vx = t.client.x / e, t.client.vy = t.client.y / e }

        function m(t) { return t instanceof at.Event || zt && at.Touch && t instanceof at.Touch }

        function v(t, e, i) { return i = i || {}, t = t || "page", i.x = e[t + "X"], i.y = e[t + "Y"], i }

        function f(t, e) { return e = e || {}, Yt && m(t) ? (v("screen", t, e), e.x += at.scrollX, e.y += at.scrollY) : v("page", t, e), e }

        function y(t, e) { return e = e || {}, Yt && m(t) ? v("screen", t, e) : v("client", t, e), e }

        function x(t) { return a(t.pointerId) ? t.pointerId : t.identifier }

        function E(t) { return t instanceof dt ? t.correspondingUseElement : t }

        function b(t) { return r(t) ? t : (t = t.ownerDocument || t, t.defaultView || t.parentWindow || at) }

        function S(t) { return (t = t instanceof lt ? t.getBoundingClientRect() : t.getClientRects()[0]) && { left: t.left, right: t.right, top: t.top, bottom: t.bottom, width: t.width || t.right - t.left, height: t.height || t.bottom - t.top } }

        function w(t) {
            var e = S(t);
            if (!It && e) {
                var i = (i = b(t)) || at;
                t = i.scrollX || i.document.documentElement.scrollLeft, i = i.scrollY || i.document.documentElement.scrollTop, e.left += t, e.right += t, e.top += i, e.bottom += i
            }
            return e
        }

        function z(t) { var e = []; return s(t) ? (e[0] = t[0], e[1] = t[1]) : "touchend" === t.type ? 1 === t.touches.length ? (e[0] = t.touches[0], e[1] = t.changedTouches[0]) : 0 === t.touches.length && (e[0] = t.changedTouches[0], e[1] = t.changedTouches[1]) : (e[0] = t.touches[0], e[1] = t.touches[1]), e }

        function D(t) {
            for (var e, i = { pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0 }, r = 0; r < t.length; r++)
                for (e in i) i[e] += t[r][e];
            for (e in i) i[e] /= t.length;
            return i
        }

        function T(t) {
            if (t.length || t.touches && 1 < t.touches.length) {
                t = z(t);
                var e = Math.min(t[0].pageX, t[1].pageX),
                    i = Math.min(t[0].pageY, t[1].pageY);
                return { x: e, y: i, left: e, top: i, width: Math.max(t[0].pageX, t[1].pageX) - e, height: Math.max(t[0].pageY, t[1].pageY) - i }
            }
        }

        function C(t, e) { e = e || St.deltaSource; var i = e + "X"; return e += "Y", t = z(t), mt(t[0][i] - t[1][i], t[0][e] - t[1][e]) }

        function M(t, e, i) { i = i || St.deltaSource; var r = i + "X"; return i += "Y", t = z(t), r = 180 * Math.atan((t[0][i] - t[1][i]) / (t[0][r] - t[1][r])) / Math.PI, a(e) && (e = (r - e) % 360, 315 < e ? r -= 360 + r / 360 | 0 : 135 < e ? r -= 180 + r / 360 | 0 : -315 > e ? r += 360 + r / 360 | 0 : -135 > e && (r += 180 + r / 360 | 0)), r }

        function P(t, e) { var r = t ? t.options.origin : St.origin; return "parent" === r ? r = k(e) : "self" === r ? r = t.getRect(e) : l(r) && (r = O(e, r) || { x: 0, y: 0 }), o(r) && (r = r(t && e)), i(r) && (r = w(r)), r.x = "x" in r ? r.x : r.left, r.y = "y" in r ? r.y : r.top, r }

        function A(t, e, i, r) { var s = 1 - t; return s * s * e + 2 * s * t * i + t * t * r }

        function _(t, e) {
            for (; e;) {
                if (e === t) return !0;
                e = e.parentNode
            }
            return !1
        }

        function O(t, e) {
            for (t = k(t); i(t);) {
                if (rt(t, e)) return t;
                t = k(t)
            }
            return null
        }

        function k(t) {
            if ((t = t.parentNode) && t instanceof pt)
                for (;
                    (t = t.host) && t && t instanceof pt;);
            return t
        }

        function X(t, e) { return t._context === e.ownerDocument || _(t._context, e) }

        function Y(t, e, r) { return !(!(t = t.options.ignoreFrom) || !i(r)) && (p(t) ? st(r, t, e) : !!i(t) && _(t, r)) }

        function I(t, e, r) { return !(t = t.options.allowFrom) || !!i(r) && (p(t) ? st(r, t, e) : !!i(t) && _(t, r)) }

        function R(t, e) { return !!e && (e = e.options.drag.axis, "xy" === t || "xy" === e || e === t) }

        function F(t, e) { return t = t.options, /^resize/.test(e) && (e = "resize"), t[e].snap && t[e].snap.enabled }

        function N(t, e) { return t = t.options, /^resize/.test(e) && (e = "resize"), t[e].restrict && t[e].restrict.enabled }

        function q(t, e, i) {
            for (var r = t.options, s = r[i.name].max, r = r[i.name].maxPerElement, n = 0, o = 0, a = 0, h = 0, p = xt.length; h < p; h++) {
                var l = xt[h],
                    c = l.prepared.name;
                if (l.interacting() && (n++, n >= Pt || l.target === t && (o += c === i.name | 0, o >= s || l.element === e && (a++, c !== i.name || a >= r)))) return !1
            }
            return 0 < Pt
        }

        function j() {
            if (this.prevDropElement = this.prevDropTarget = this.dropElement = this.dropTarget = this.element = this.target = null, this.prepared = { name: null, axis: null, edges: null }, this.matches = [], this.matchElements = [], this.inertiaStatus = { active: !1, smoothEnd: !1, ending: !1, startEvent: null, upCoords: {}, xe: 0, ye: 0, sx: 0, sy: 0, t0: 0, vx0: 0, vys: 0, duration: 0, resumeDx: 0, resumeDy: 0, lambda_v0: 0, one_ve_v0: 0, i: null }, o(Function.prototype.bind)) this.boundInertiaFrame = this.inertiaFrame.bind(this), this.boundSmoothEndFrame = this.smoothEndFrame.bind(this);
            else {
                var t = this;
                this.boundInertiaFrame = function() { return t.inertiaFrame() }, this.boundSmoothEndFrame = function() { return t.smoothEndFrame() }
            }
            this.activeDrops = { dropzones: [], elements: [], rects: [] }, this.pointers = [], this.pointerIds = [], this.downTargets = [], this.downTimes = [], this.holdTimers = [], this.prevCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, this.curCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, this.startCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, this.pointerDelta = { page: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 }, client: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 }, timeStamp: 0 }, this.downEvent = null, this.downPointer = {}, this.prevEvent = this._curEventTarget = this._eventTarget = null, this.tapTime = 0, this.prevTap = null, this.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }, this.restrictOffset = { left: 0, right: 0, top: 0, bottom: 0 }, this.snapOffsets = [], this.gesture = { start: { x: 0, y: 0 }, startDistance: 0, prevDistance: 0, distance: 0, scale: 1, startAngle: 0, prevAngle: 0 }, this.snapStatus = { x: 0, y: 0, dx: 0, dy: 0, realX: 0, realY: 0, snappedX: 0, snappedY: 0, targets: [], locked: !1, changed: !1 }, this.restrictStatus = { dx: 0, dy: 0, restrictedX: 0, restrictedY: 0, snap: null, restricted: !1, changed: !1 }, this.restrictStatus.snap = this.snapStatus, this.resizing = this.dragging = this.gesturing = this.pointerWasMoved = this.pointerIsDown = !1, this.resizeAxes = "xy", this.mouse = !1, xt.push(this)
        }

        function $(t, e, i) {
            var r = xt.length,
                s = /mouse/i.test(t.pointerType || e) || 4 === t.pointerType,
                n = x(t);
            if (/down|start/i.test(e))
                for (t = 0; t < r; t++) {
                    var o = xt[t],
                        a = i;
                    if (o.inertiaStatus.active && o.target.options[o.prepared.name].inertia.allowResume && o.mouse === s)
                        for (; a;) {
                            if (a === o.element) return o;
                            a = k(a)
                        }
                }
            if (s || !zt && !Dt) {
                for (t = 0; t < r; t++)
                    if (xt[t].mouse && !xt[t].inertiaStatus.active) return xt[t];
                for (t = 0; t < r; t++)
                    if (xt[t].mouse && (!/down/.test(e) || !xt[t].inertiaStatus.active)) return o;
                return o = new j, o.mouse = !0, o
            }
            for (t = 0; t < r; t++)
                if (-1 !== it(xt[t].pointerIds, n)) return xt[t];
            if (/up|end|out/i.test(e)) return null;
            for (t = 0; t < r; t++)
                if (o = xt[t], !(o.prepared.name && !o.target.options.gesture.enabled || o.interacting() || !s && o.mouse)) return o;
            return new j
        }

        function H(t) {
            return function(e) {
                var i, r, s = E(e.path ? e.path[0] : e.target),
                    n = E(e.currentTarget);
                if (zt && /touch/.test(e.type))
                    for (Mt = (new Date).getTime(), r = 0; r < e.changedTouches.length; r++) {
                        var o = e.changedTouches[r];
                        (i = $(o, e.type, s)) && (i._updateEventTargets(s, n), i[t](o, e, s, n))
                    } else {
                        if (!Dt && /mouse/.test(e.type)) {
                            for (r = 0; r < xt.length; r++)
                                if (!xt[r].mouse && xt[r].pointerIsDown) return;
                            if (500 > (new Date).getTime() - Mt) return
                        }(i = $(e, e.type, s)) && (i._updateEventTargets(s, n), i[t](e, e, s, n))
                    }
            }
        }

        function U(t, e, i, r, s, n) {
            var o = t.target,
                a = t.snapStatus,
                h = t.restrictStatus,
                p = t.pointers,
                l = (o && o.options || St).deltaSource,
                d = l + "X",
                u = l + "Y",
                g = o ? o.options : St,
                m = P(o, s),
                v = "start" === r,
                f = "end" === r,
                y = v ? t.startCoords : t.curCoords;
            s = s || t.element;
            var x = c({}, y.page);
            y = c({}, y.client), x.x -= m.x, x.y -= m.y, y.x -= m.x, y.y -= m.y;
            var E = g[i].snap && g[i].snap.relativePoints;
            !F(o, i) || v && E && E.length || (this.snap = { range: a.range, locked: a.locked, x: a.snappedX, y: a.snappedY, realX: a.realX, realY: a.realY, dx: a.dx, dy: a.dy }, a.locked && (x.x += a.dx, x.y += a.dy, y.x += a.dx, y.y += a.dy)), !N(o, i) || v && g[i].restrict.elementRect || !h.restricted || (x.x += h.dx, x.y += h.dy, y.x += h.dx, y.y += h.dy, this.restrict = { dx: h.dx, dy: h.dy }), this.pageX = x.x, this.pageY = x.y, this.clientX = y.x, this.clientY = y.y, this.x0 = t.startCoords.page.x - m.x, this.y0 = t.startCoords.page.y - m.y, this.clientX0 = t.startCoords.client.x - m.x, this.clientY0 = t.startCoords.client.y - m.y, this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.button = e.button, this.buttons = e.buttons, this.target = s, this.t0 = t.downTimes[0], this.type = i + (r || ""), this.interaction = t, this.interactable = o, s = t.inertiaStatus, s.active && (this.detail = "inertia"), n && (this.relatedTarget = n), f ? "client" === l ? (this.dx = y.x - t.startCoords.client.x, this.dy = y.y - t.startCoords.client.y) : (this.dx = x.x - t.startCoords.page.x, this.dy = x.y - t.startCoords.page.y) : v ? this.dy = this.dx = 0 : "inertiastart" === r ? (this.dx = t.prevEvent.dx, this.dy = t.prevEvent.dy) : "client" === l ? (this.dx = y.x - t.prevEvent.clientX, this.dy = y.y - t.prevEvent.clientY) : (this.dx = x.x - t.prevEvent.pageX, this.dy = x.y - t.prevEvent.pageY), t.prevEvent && "inertia" === t.prevEvent.detail && !s.active && g[i].inertia && g[i].inertia.zeroResumeDelta && (s.resumeDx += this.dx, s.resumeDy += this.dy, this.dx = this.dy = 0), "resize" === i && t.resizeAxes ? g.resize.square ? ("y" === t.resizeAxes ? this.dx = this.dy : this.dy = this.dx, this.axes = "xy") : (this.axes = t.resizeAxes, "x" === t.resizeAxes ? this.dy = 0 : "y" === t.resizeAxes && (this.dx = 0)) : "gesture" === i && (this.touches = [p[0], p[1]], v ? (this.distance = C(p, l), this.box = T(p), this.scale = 1, this.ds = 0, this.angle = M(p, void 0, l), this.da = 0) : f || e instanceof U ? (this.distance = t.prevEvent.distance, this.box = t.prevEvent.box, this.scale = t.prevEvent.scale, this.ds = this.scale - 1, this.angle = t.prevEvent.angle, this.da = this.angle - t.gesture.startAngle) : (this.distance = C(p, l), this.box = T(p), this.scale = this.distance / t.gesture.startDistance, this.angle = M(p, t.gesture.prevAngle, l), this.ds = this.scale - t.gesture.prevScale, this.da = this.angle - t.gesture.prevAngle)), v ? (this.timeStamp = t.downTimes[0], this.velocityY = this.velocityX = this.speed = this.duration = this.dt = 0) : "inertiastart" === r ? (this.timeStamp = t.prevEvent.timeStamp, this.dt = t.prevEvent.dt, this.duration = t.prevEvent.duration, this.speed = t.prevEvent.speed, this.velocityX = t.prevEvent.velocityX, this.velocityY = t.prevEvent.velocityY) : (this.timeStamp = (new Date).getTime(), this.dt = this.timeStamp - t.prevEvent.timeStamp, this.duration = this.timeStamp - t.downTimes[0], e instanceof U ? (e = this[d] - t.prevEvent[d], u = this[u] - t.prevEvent[u], i = this.dt / 1e3, this.speed = mt(e, u) / i, this.velocityX = e / i, this.velocityY = u / i) : (this.speed = t.pointerDelta[l].speed, this.velocityX = t.pointerDelta[l].vx, this.velocityY = t.pointerDelta[l].vy)), (f || "inertiastart" === r) && 600 < t.prevEvent.speed && 150 > this.timeStamp - t.prevEvent.timeStamp && (r = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI, 0 > r && (r += 360), f = 112.5 <= r && 247.5 > r, u = 202.5 <= r && 337.5 > r, this.swipe = { up: u, down: !u && 22.5 <= r && 157.5 > r, left: f, right: !f && (292.5 <= r || 67.5 > r), angle: r, speed: t.prevEvent.speed, velocity: { x: t.prevEvent.velocityX, y: t.prevEvent.velocityY } })
        }

        function W() { this.originalEvent.preventDefault() }

        function V(t) {
            var e = "";
            if ("drag" === t.name && (e = At.drag), "resize" === t.name)
                if (t.axis) e = At[t.name + t.axis];
                else if (t.edges) {
                for (var e = "resize", i = ["top", "bottom", "left", "right"], r = 0; 4 > r; r++) t.edges[i[r]] && (e += i[r]);
                e = At[e]
            }
            return e
        }

        function G(t, e, r) {
            var s = this.getRect(r),
                o = !1,
                h = null,
                p = c({}, e.curCoords.page);
            if (t = this.options, !s) return null;
            if (_t.resize && t.resize.enabled) {
                o = t.resize;
                var l = { left: !1, right: !1, top: !1, bottom: !1 };
                if (n(o.edges)) {
                    for (var d in l) {
                        var u = l,
                            g = d;
                        t: {
                            var m = d,
                                v = o.edges[d],
                                f = p,
                                y = e._eventTarget,
                                x = r,
                                E = s,
                                b = o.margin || Tt;
                            if (v) {
                                if (!0 === v) {
                                    var S = a(E.width) ? E.width : E.right - E.left,
                                        w = a(E.height) ? E.height : E.bottom - E.top;
                                    if (0 > S && ("left" === m ? m = "right" : "right" === m && (m = "left")), 0 > w && ("top" === m ? m = "bottom" : "bottom" === m && (m = "top")), "left" === m) { m = f.x < (0 <= S ? E.left : E.right) + b; break t }
                                    if ("top" === m) { m = f.y < (0 <= w ? E.top : E.bottom) + b; break t }
                                    if ("right" === m) { m = f.x > (0 <= S ? E.right : E.left) - b; break t }
                                    if ("bottom" === m) { m = f.y > (0 <= w ? E.bottom : E.top) - b; break t }
                                }
                                m = !!i(y) && (i(v) ? v === y : st(y, v, x))
                            } else m = !1
                        }
                        u[g] = m
                    }
                    l.left = l.left && !l.right, l.top = l.top && !l.bottom, o = l.left || l.right || l.top || l.bottom
                } else r = "y" !== t.resize.axis && p.x > s.right - Tt, s = "x" !== t.resize.axis && p.y > s.bottom - Tt, o = r || s, h = (r ? "x" : "") + (s ? "y" : "")
            }
            return t = o ? "resize" : _t.drag && t.drag.enabled ? "drag" : null, _t.gesture && 2 <= e.pointerIds.length && !e.dragging && !e.resizing && (t = "gesture"), t ? { name: t, axis: h, edges: l } : null
        }

        function L(t, e) { if (!n(t)) return null; var i = t.name; return e = e.options, ("resize" === i && e.resize.enabled || "drag" === i && e.drag.enabled || "gesture" === i && e.gesture.enabled) && _t[i] ? t : null }

        function K(t, e) {
            var r = {},
                s = bt[t.type],
                n = E(t.path ? t.path[0] : t.target),
                o = n;
            e = !!e;
            for (var a in t) r[a] = t[a];
            for (r.originalEvent = t, r.preventDefault = W; i(o);) {
                for (t = 0; t < s.selectors.length; t++)
                    if (a = s.contexts[t], rt(o, s.selectors[t]) && _(a, n) && _(a, o)) { a = s.listeners[t], r.currentTarget = o; for (var h = 0; h < a.length; h++) a[h][1] === e && a[h][0](r) }
                o = k(o)
            }
        }

        function B(t) { return K.call(this, t, !0) }

        function J(t, e) { return yt.get(t, e) || new Q(t, e) }

        function Q(t, e) {
            if (this._element = t, this._iEvents = this._iEvents || {}, l(t)) {
                this.selector = t;
                var r = (t = e && e.context) ? b(t) : at;
                t && (r.Node ? t instanceof r.Node : i(t) || t === r.document) && (this._context = t)
            } else r = b(t), i(t, r) && (Dt ? (qt.add(this._element, nt.down, $t.pointerDown), qt.add(this._element, nt.move, $t.pointerHover)) : (qt.add(this._element, "mousedown", $t.pointerDown), qt.add(this._element, "mousemove", $t.pointerHover), qt.add(this._element, "touchstart", $t.pointerDown), qt.add(this._element, "touchmove", $t.pointerHover)));
            this._doc = r.document, -1 === it(ft, this._doc) && et(this._doc), yt.push(this), this.set(e)
        }

        function Z(t, e) { var i = !1; return function() { return i || (at.console.warn(e), i = !0), t.apply(this, arguments) } }

        function tt(t) { for (var e = 0; e < xt.length; e++) xt[e].pointerEnd(t, t) }

        function et(t) {
            if (-1 === it(ft, t)) {
                var e, i = t.defaultView || t.parentWindow;
                for (e in bt) qt.add(t, e, K), qt.add(t, e, B, !0);
                Dt ? (nt = gt === i.MSPointerEvent ? { up: "MSPointerUp", down: "MSPointerDown", over: "mouseover", out: "mouseout", move: "MSPointerMove", cancel: "MSPointerCancel" } : { up: "pointerup", down: "pointerdown", over: "pointerover", out: "pointerout", move: "pointermove", cancel: "pointercancel" }, qt.add(t, nt.down, $t.selectorDown), qt.add(t, nt.move, $t.pointerMove), qt.add(t, nt.over, $t.pointerOver), qt.add(t, nt.out, $t.pointerOut), qt.add(t, nt.up, $t.pointerUp), qt.add(t, nt.cancel, $t.pointerCancel), qt.add(t, nt.move, $t.autoScrollMove)) : (qt.add(t, "mousedown", $t.selectorDown), qt.add(t, "mousemove", $t.pointerMove), qt.add(t, "mouseup", $t.pointerUp), qt.add(t, "mouseover", $t.pointerOver), qt.add(t, "mouseout", $t.pointerOut), qt.add(t, "touchstart", $t.selectorDown), qt.add(t, "touchmove", $t.pointerMove), qt.add(t, "touchend", $t.pointerUp), qt.add(t, "touchcancel", $t.pointerCancel), qt.add(t, "mousemove", $t.autoScrollMove), qt.add(t, "touchmove", $t.autoScrollMove)), qt.add(i, "blur", tt);
                try {
                    if (i.frameElement) {
                        var r = i.frameElement.ownerDocument,
                            s = r.defaultView;
                        qt.add(r, "mouseup", $t.pointerEnd), qt.add(r, "touchend", $t.pointerEnd), qt.add(r, "touchcancel", $t.pointerEnd), qt.add(r, "pointerup", $t.pointerEnd), qt.add(r, "MSPointerUp", $t.pointerEnd), qt.add(s, "blur", tt)
                    }
                } catch (t) { J.windowParentError = t }
                qt.add(t, "dragstart", function(t) { for (var e = 0; e < xt.length; e++) { var i = xt[e]; if (i.element && (i.element === t.target || _(i.element, t.target))) { i.checkAndPreventDefault(t, i.target, i.element); break } } }), qt.useAttachEvent && (qt.add(t, "selectstart", function(t) {
                    var e = xt[0];
                    e.currentAction() && e.checkAndPreventDefault(t)
                }), qt.add(t, "dblclick", H("ie8Dblclick"))), ft.push(t)
            }
        }

        function it(t, e) {
            for (var i = 0, r = t.length; i < r; i++)
                if (t[i] === e) return i;
            return -1
        }

        function rt(e, i, r) { return ot ? ot(e, i, r) : (at !== t && (i = i.replace(/\/deep\//g, " ")), e[Rt](i)) }

        function st(t, e, r) { for (; i(t);) { if (rt(t, e)) return !0; if (t = k(t), t === r) return rt(t, e) } return !1 }
        if (t) {
            var nt, ot, at = function() { var e = t.document.createTextNode(""); return e.ownerDocument !== t.document && "function" == typeof t.wrap && t.wrap(e) === e ? t.wrap(t) : t }(),
                ht = at.document,
                pt = at.DocumentFragment || e,
                lt = at.SVGElement || e,
                ct = at.SVGSVGElement || e,
                dt = at.SVGElementInstance || e,
                ut = at.HTMLElement || at.Element,
                gt = at.PointerEvent || at.MSPointerEvent,
                mt = Math.hypot || function(t, e) { return Math.sqrt(t * t + e * e) },
                vt = {},
                ft = [],
                yt = [],
                xt = [],
                Et = !1,
                bt = {},
                St = { base: { accept: null, actionChecker: null, styleCursor: !0, preventDefault: "auto", origin: { x: 0, y: 0 }, deltaSource: "page", allowFrom: null, ignoreFrom: null, _context: ht, dropChecker: null }, drag: { enabled: !1, manualStart: !0, max: 1 / 0, maxPerElement: 1, snap: null, restrict: null, inertia: null, autoScroll: null, axis: "xy" }, drop: { enabled: !1, accept: null, overlap: "pointer" }, resize: { enabled: !1, manualStart: !1, max: 1 / 0, maxPerElement: 1, snap: null, restrict: null, inertia: null, autoScroll: null, square: !1, preserveAspectRatio: !1, axis: "xy", margin: NaN, edges: null, invert: "none" }, gesture: { manualStart: !1, enabled: !1, max: 1 / 0, maxPerElement: 1, restrict: null }, perAction: { manualStart: !1, max: 1 / 0, maxPerElement: 1, snap: { enabled: !1, endOnly: !1, range: 1 / 0, targets: null, offsets: null, relativePoints: null }, restrict: { enabled: !1, endOnly: !1 }, autoScroll: { enabled: !1, container: null, margin: 60, speed: 300 }, inertia: { enabled: !1, resistance: 10, minSpeed: 100, endSpeed: 10, allowResume: !0, zeroResumeDelta: !0, smoothEndDuration: 300 } }, _holdDuration: 600 },
                wt = {
                    interaction: null,
                    i: null,
                    x: 0,
                    y: 0,
                    scroll: function() {
                        var t = wt.interaction.target.options[wt.interaction.prepared.name].autoScroll,
                            e = t.container || b(wt.interaction.element),
                            i = (new Date).getTime(),
                            s = (i - wt.prevTimeX) / 1e3,
                            n = (i - wt.prevTimeY) / 1e3;
                        if (t.velocity) {
                            var o = t.velocity.x;
                            t = t.velocity.y
                        } else o = t = t.speed;
                        s *= o, n *= t, (1 <= s || 1 <= n) && (r(e) ? e.scrollBy(wt.x * s, wt.y * n) : e && (e.scrollLeft += wt.x * s, e.scrollTop += wt.y * n), 1 <= s && (wt.prevTimeX = i), 1 <= n && (wt.prevTimeY = i)), wt.isScrolling && (Nt(wt.i), wt.i = Ft(wt.scroll))
                    },
                    isScrolling: !1,
                    prevTimeX: 0,
                    prevTimeY: 0,
                    start: function(t) { wt.isScrolling = !0, Nt(wt.i), wt.interaction = t, wt.prevTimeX = (new Date).getTime(), wt.prevTimeY = (new Date).getTime(), wt.i = Ft(wt.scroll) },
                    stop: function() { wt.isScrolling = !1, Nt(wt.i) }
                },
                zt = "ontouchstart" in at || at.DocumentTouch && ht instanceof at.DocumentTouch,
                Dt = gt && !/Chrome/.test(navigator.userAgent),
                Tt = zt || Dt ? 20 : 10,
                Ct = 1,
                Mt = 0,
                Pt = 1 / 0,
                At = ht.all && !at.atob ? { drag: "move", resizex: "e-resize", resizey: "s-resize", resizexy: "se-resize", resizetop: "n-resize", resizeleft: "w-resize", resizebottom: "s-resize", resizeright: "e-resize", resizetopleft: "se-resize", resizebottomright: "se-resize", resizetopright: "ne-resize", resizebottomleft: "ne-resize", gesture: "" } : { drag: "move", resizex: "ew-resize", resizey: "ns-resize", resizexy: "nwse-resize", resizetop: "ns-resize", resizeleft: "ew-resize", resizebottom: "ns-resize", resizeright: "ew-resize", resizetopleft: "nwse-resize", resizebottomright: "nwse-resize", resizetopright: "nesw-resize", resizebottomleft: "nesw-resize", gesture: "" },
                _t = { drag: !0, resize: !0, gesture: !0 },
                Ot = "onmousewheel" in ht ? "mousewheel" : "wheel",
                kt = "dragstart dragmove draginertiastart dragend dragenter dragleave dropactivate dropdeactivate dropmove drop resizestart resizemove resizeinertiastart resizeend gesturestart gesturemove gestureinertiastart gestureend down move up cancel tap doubletap hold".split(" "),
                Xt = {},
                Yt = "Opera" == navigator.appName && zt && navigator.userAgent.match("Presto"),
                It = /iP(hone|od|ad)/.test(navigator.platform) && /OS 7[^\d]/.test(navigator.appVersion),
                Rt = "matches" in Element.prototype ? "matches" : "webkitMatchesSelector" in Element.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in Element.prototype ? "mozMatchesSelector" : "oMatchesSelector" in Element.prototype ? "oMatchesSelector" : "msMatchesSelector",
                Ft = t.requestAnimationFrame,
                Nt = t.cancelAnimationFrame,
                qt = function() {
                    function t(e, i, r, n) {
                        var c, d = it(h, e),
                            u = p[d],
                            g = r;
                        if (u && u.events) {
                            if (s) {
                                var m = l[d],
                                    v = it(m.supplied, r);
                                g = m.wrapped[v]
                            }
                            if ("all" === i)
                                for (i in u.events) u.events.hasOwnProperty(i) && t(e, i, "all");
                            else {
                                if (u.events[i]) {
                                    var f = u.events[i].length;
                                    if ("all" === r) { for (c = 0; c < f; c++) t(e, i, u.events[i][c], !!n); return }
                                    for (c = 0; c < f; c++)
                                        if (u.events[i][c] === r) { e[o](a + i, g, n || !1), u.events[i].splice(c, 1), s && m && (m.useCount[v]--, 0 === m.useCount[v] && (m.supplied.splice(v, 1), m.wrapped.splice(v, 1), m.useCount.splice(v, 1))); break }
                                    u.events[i] && 0 === u.events[i].length && (u.events[i] = null, u.typeCount--)
                                }
                                u.typeCount || (p.splice(d, 1), h.splice(d, 1), l.splice(d, 1))
                            }
                        }
                    }

                    function e() { this.returnValue = !1 }

                    function i() { this.cancelBubble = !0 }

                    function r() { this.immediatePropagationStopped = this.cancelBubble = !0 }
                    var s = "attachEvent" in at && !("addEventListener" in at),
                        n = s ? "attachEvent" : "addEventListener",
                        o = s ? "detachEvent" : "removeEventListener",
                        a = s ? "on" : "",
                        h = [],
                        p = [],
                        l = [];
                    return {
                        add: function(t, o, c, d) {
                            var u = it(h, t),
                                g = p[u];
                            if (g || (g = { events: {}, typeCount: 0 }, u = h.push(t) - 1, p.push(g), l.push(s ? { supplied: [], wrapped: [], useCount: [] } : null)), g.events[o] || (g.events[o] = [], g.typeCount++), -1 === it(g.events[o], c)) {
                                if (s) {
                                    var u = l[u],
                                        m = it(u.supplied, c),
                                        v = u.wrapped[m] || function(s) { s.immediatePropagationStopped || (s.target = s.srcElement, s.currentTarget = t, s.preventDefault = s.preventDefault || e, s.stopPropagation = s.stopPropagation || i, s.stopImmediatePropagation = s.stopImmediatePropagation || r, /mouse|click/.test(s.type) && (s.pageX = s.clientX + b(t).document.documentElement.scrollLeft, s.pageY = s.clientY + b(t).document.documentElement.scrollTop), c(s)) };
                                    d = t[n](a + o, v, !!d), -1 === m ? (u.supplied.push(c), u.wrapped.push(v), u.useCount.push(1)) : u.useCount[m]++
                                } else d = t[n](o, c, d || !1);
                                return g.events[o].push(c), d
                            }
                        },
                        remove: t,
                        useAttachEvent: s,
                        _elements: h,
                        _targets: p,
                        _attachedListeners: l
                    }
                }(),
                jt = { webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/ };
            j.prototype = {
                getPageXY: function(t, e) { return f(t, e, this) },
                getClientXY: function(t, e) { return y(t, e, this) },
                setEventXY: function(t, e) { e = 1 < e.length ? D(e) : e[0], f(e, vt, this), t.page.x = vt.x, t.page.y = vt.y, y(e, vt, this), t.client.x = vt.x, t.client.y = vt.y, t.timeStamp = (new Date).getTime() },
                pointerOver: function(t, e, r) {
                    function s(t, e) { t && i(r) && X(t, r) && !Y(t, r, r) && I(t, r, r) && rt(r, e) && (n.push(t), o.push(r)) }
                    if (!this.prepared.name && this.mouse) {
                        var n = [],
                            o = [],
                            a = this.element;
                        this.addPointer(t), !this.target || !Y(this.target, this.element, r) && I(this.target, this.element, r) || (this.element = this.target = null, this.matches = [], this.matchElements = []);
                        var h = yt.get(r),
                            p = h && !Y(h, r, r) && I(h, r, r) && L(h.getAction(t, e, this, r), h);
                        p && !q(h, r, p) && (p = null), p ? (this.target = h, this.element = r, this.matches = [], this.matchElements = []) : (yt.forEachSelector(s), this.validateSelector(t, e, n, o) ? (this.matches = n, this.matchElements = o, this.pointerHover(t, e, this.matches, this.matchElements), qt.add(r, Dt ? nt.move : "mousemove", $t.pointerHover)) : this.target && (_(a, r) ? (this.pointerHover(t, e, this.matches, this.matchElements), qt.add(this.element, Dt ? nt.move : "mousemove", $t.pointerHover)) : (this.element = this.target = null, this.matches = [], this.matchElements = [])))
                    }
                },
                pointerHover: function(t, e, i, r, s, n) {
                    if (i = this.target, !this.prepared.name && this.mouse) {
                        var o;
                        this.setEventXY(this.curCoords, [t]), s ? o = this.validateSelector(t, e, s, n) : i && (o = L(i.getAction(this.pointers[0], e, this, this.element), this.target)), i && i.options.styleCursor && (i._doc.documentElement.style.cursor = o ? V(o) : "")
                    } else this.prepared.name && this.checkAndPreventDefault(e, i, this.element)
                },
                pointerOut: function(t, e, i) { this.prepared.name || (yt.get(i) || qt.remove(i, Dt ? nt.move : "mousemove", $t.pointerHover), this.target && this.target.options.styleCursor && !this.interacting() && (this.target._doc.documentElement.style.cursor = "")) },
                selectorDown: function(t, e, r, s) {
                    function n(t, e, i) { i = ot ? i.querySelectorAll(e) : void 0, X(t, h) && !Y(t, h, r) && I(t, h, r) && rt(h, e, i) && (o.matches.push(t), o.matchElements.push(h)) }
                    var o = this,
                        a = qt.useAttachEvent ? c({}, e) : e,
                        h = r,
                        p = this.addPointer(t);
                    if (this.holdTimers[p] = setTimeout(function() { o.pointerHold(qt.useAttachEvent ? a : t, a, r, s) }, St._holdDuration), this.pointerIsDown = !0, this.inertiaStatus.active && this.target.selector)
                        for (; i(h);) {
                            if (h === this.element && L(this.target.getAction(t, e, this, this.element), this.target).name === this.prepared.name) return Nt(this.inertiaStatus.i), this.inertiaStatus.active = !1, void this.collectEventTargets(t, e, r, "down");
                            h = k(h)
                        }
                    if (!this.interacting()) {
                        for (this.setEventXY(this.curCoords, [t]), this.downEvent = e; i(h) && !l;) {
                            this.matches = [], this.matchElements = [], yt.forEachSelector(n);
                            var l = this.validateSelector(t, e, this.matches, this.matchElements);
                            h = k(h)
                        }
                        if (l) return this.prepared.name = l.name, this.prepared.axis = l.axis, this.prepared.edges = l.edges, this.collectEventTargets(t, e, r, "down"), this.pointerDown(t, e, r, s, l);
                        this.downTimes[p] = (new Date).getTime(), this.downTargets[p] = r, d(this.downPointer, t), u(this.prevCoords, this.curCoords), this.pointerWasMoved = !1
                    }
                    this.collectEventTargets(t, e, r, "down")
                },
                pointerDown: function(t, e, i, r, s) {
                    if (!s && !this.inertiaStatus.active && this.pointerWasMoved && this.prepared.name) this.checkAndPreventDefault(e, this.target, this.element);
                    else {
                        this.pointerIsDown = !0, this.downEvent = e;
                        var n, o = this.addPointer(t);
                        if (1 < this.pointerIds.length && this.target._element === this.element) {
                            var a = L(s || this.target.getAction(t, e, this, this.element), this.target);
                            q(this.target, this.element, a) && (n = a), this.prepared.name = null
                        } else this.prepared.name || (a = yt.get(r)) && !Y(a, r, i) && I(a, r, i) && (n = L(s || a.getAction(t, e, this, r), a, i)) && q(a, r, n) && (this.target = a, this.element = r);
                        var h = (a = this.target) && a.options;
                        !a || !s && this.prepared.name ? this.inertiaStatus.active && r === this.element && L(a.getAction(t, e, this, this.element), a).name === this.prepared.name && (Nt(this.inertiaStatus.i), this.inertiaStatus.active = !1, this.checkAndPreventDefault(e, a, this.element)) : (n = n || L(s || a.getAction(t, e, this, r), a, this.element), this.setEventXY(this.startCoords, this.pointers), n && (h.styleCursor && (a._doc.documentElement.style.cursor = V(n)), this.resizeAxes = "resize" === n.name ? n.axis : null, "gesture" === n && 2 > this.pointerIds.length && (n = null), this.prepared.name = n.name, this.prepared.axis = n.axis, this.prepared.edges = n.edges, this.snapStatus.snappedX = this.snapStatus.snappedY = this.restrictStatus.restrictedX = this.restrictStatus.restrictedY = NaN, this.downTimes[o] = (new Date).getTime(), this.downTargets[o] = i, d(this.downPointer, t), u(this.prevCoords, this.startCoords), this.pointerWasMoved = !1, this.checkAndPreventDefault(e, a, this.element)))
                    }
                },
                setModifications: function(t, e) {
                    var i = this.target,
                        r = !0,
                        s = F(i, this.prepared.name) && (!i.options[this.prepared.name].snap.endOnly || e);
                    return e = N(i, this.prepared.name) && (!i.options[this.prepared.name].restrict.endOnly || e), s ? this.setSnapping(t) : this.snapStatus.locked = !1, e ? this.setRestriction(t) : this.restrictStatus.restricted = !1, s && this.snapStatus.locked && !this.snapStatus.changed ? r = e && this.restrictStatus.restricted && this.restrictStatus.changed : e && this.restrictStatus.restricted && !this.restrictStatus.changed && (r = !1), r
                },
                setStartOffsets: function(t, e, i) {
                    t = e.getRect(i);
                    var r = P(e, i);
                    if (i = e.options[this.prepared.name].snap, e = e.options[this.prepared.name].restrict, t) {
                        this.startOffset.left = this.startCoords.page.x - t.left, this.startOffset.top = this.startCoords.page.y - t.top, this.startOffset.right = t.right - this.startCoords.page.x, this.startOffset.bottom = t.bottom - this.startCoords.page.y;
                        var s = "width" in t ? t.width : t.right - t.left,
                            n = "height" in t ? t.height : t.bottom - t.top
                    } else this.startOffset.left = this.startOffset.top = this.startOffset.right = this.startOffset.bottom = 0;
                    if (this.snapOffsets.splice(0), r = i && "startCoords" === i.offset ? { x: this.startCoords.page.x - r.x, y: this.startCoords.page.y - r.y } : i && i.offset || { x: 0, y: 0 }, t && i && i.relativePoints && i.relativePoints.length)
                        for (var o = 0; o < i.relativePoints.length; o++) this.snapOffsets.push({ x: this.startOffset.left - s * i.relativePoints[o].x + r.x, y: this.startOffset.top - n * i.relativePoints[o].y + r.y });
                    else this.snapOffsets.push(r);
                    t && e.elementRect ? (this.restrictOffset.left = this.startOffset.left - s * e.elementRect.left, this.restrictOffset.top = this.startOffset.top - n * e.elementRect.top, this.restrictOffset.right = this.startOffset.right - s * (1 - e.elementRect.right), this.restrictOffset.bottom = this.startOffset.bottom - n * (1 - e.elementRect.bottom)) : this.restrictOffset.left = this.restrictOffset.top = this.restrictOffset.right = this.restrictOffset.bottom = 0
                },
                start: function(t, e, i) { this.interacting() || !this.pointerIsDown || this.pointerIds.length < ("gesture" === t.name ? 2 : 1) || (-1 === it(xt, this) && xt.push(this), this.prepared.name || this.setEventXY(this.startCoords, this.pointers), this.prepared.name = t.name, this.prepared.axis = t.axis, this.prepared.edges = t.edges, this.target = e, this.element = i, this.setStartOffsets(t.name, e, i), this.setModifications(this.startCoords.page), this.prevEvent = this[this.prepared.name + "Start"](this.downEvent)) },
                pointerMove: function(t, e, r, s, n) {
                    if (this.inertiaStatus.active) {
                        s = this.inertiaStatus.upCoords.page;
                        var o = this.inertiaStatus.upCoords.client;
                        this.setEventXY(this.curCoords, [{ pageX: s.x + this.inertiaStatus.sx, pageY: s.y + this.inertiaStatus.sy, clientX: o.x + this.inertiaStatus.sx, clientY: o.y + this.inertiaStatus.sy }])
                    } else this.recordPointer(t), this.setEventXY(this.curCoords, this.pointers);
                    s = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y;
                    var o = this.mouse ? 0 : it(this.pointerIds, x(t));
                    if (this.pointerIsDown && !this.pointerWasMoved) {
                        var a = this.curCoords.client.x - this.startCoords.client.x,
                            h = this.curCoords.client.y - this.startCoords.client.y;
                        this.pointerWasMoved = mt(a, h) > Ct
                    }
                    if (s || this.pointerIsDown && !this.pointerWasMoved || (this.pointerIsDown && clearTimeout(this.holdTimers[o]), this.collectEventTargets(t, e, r, "move")), this.pointerIsDown)
                        if (s && this.pointerWasMoved && !n) this.checkAndPreventDefault(e, this.target, this.element);
                        else if (g(this.pointerDelta, this.prevCoords, this.curCoords), this.prepared.name) {
                        if (this.pointerWasMoved && (!this.inertiaStatus.active || t instanceof U && /inertiastart/.test(t.type))) {
                            if (!this.interacting() && (g(this.pointerDelta, this.prevCoords, this.curCoords), "drag" === this.prepared.name)) {
                                a = Math.abs(a), h = Math.abs(h), s = this.target.options.drag.axis;
                                var p = a > h ? "x" : a < h ? "y" : "xy";
                                if ("xy" !== p && "xy" !== s && s !== p) {
                                    this.prepared.name = null;
                                    for (var l = r; i(l);) {
                                        if ((h = yt.get(l)) && h !== this.target && !h.options.drag.manualStart && "drag" === h.getAction(this.downPointer, this.downEvent, this, l).name && R(p, h)) { this.prepared.name = "drag", this.target = h, this.element = l; break }
                                        l = k(l)
                                    }
                                    if (!this.prepared.name) {
                                        var c = this;
                                        for (h = function(t, e, i) { if (i = ot ? i.querySelectorAll(e) : void 0, t !== c.target && X(t, r) && !t.options.drag.manualStart && !Y(t, l, r) && I(t, l, r) && rt(l, e, i) && "drag" === t.getAction(c.downPointer, c.downEvent, c, l).name && R(p, t) && q(t, l, "drag")) return t }, l = r; i(l);) {
                                            if (a = yt.forEachSelector(h)) { this.prepared.name = "drag", this.target = a, this.element = l; break }
                                            l = k(l)
                                        }
                                    }
                                }
                            }
                            if ((h = !!this.prepared.name && !this.interacting()) && (this.target.options[this.prepared.name].manualStart || !q(this.target, this.element, this.prepared))) return void this.stop(e);
                            this.prepared.name && this.target && (h && this.start(this.prepared, this.target, this.element), (this.setModifications(this.curCoords.page, n) || h) && (this.prevEvent = this[this.prepared.name + "Move"](e)), this.checkAndPreventDefault(e, this.target, this.element))
                        }
                        u(this.prevCoords, this.curCoords),
                            (this.dragging || this.resizing) && this.autoScrollMove(t)
                    }
                },
                dragStart: function(t) { var e = new U(this, t, "drag", "start", this.element); return this.dragging = !0, this.target.fire(e), this.activeDrops.dropzones = [], this.activeDrops.elements = [], this.activeDrops.rects = [], this.dynamicDrop || this.setActiveDrops(this.element), t = this.getDropEvents(t, e), t.activate && this.fireActiveDrops(t.activate), e },
                dragMove: function(t) {
                    var e = this.target,
                        i = new U(this, t, "drag", "move", this.element),
                        r = this.getDrop(i, t, this.element);
                    return this.dropTarget = r.dropzone, this.dropElement = r.element, t = this.getDropEvents(t, i), e.fire(i), t.leave && this.prevDropTarget.fire(t.leave), t.enter && this.dropTarget.fire(t.enter), t.move && this.dropTarget.fire(t.move), this.prevDropTarget = this.dropTarget, this.prevDropElement = this.dropElement, i
                },
                resizeStart: function(t) {
                    if (t = new U(this, t, "resize", "start", this.element), this.prepared.edges) {
                        var e = this.target.getRect(this.element);
                        if (this.target.options.resize.square || this.target.options.resize.preserveAspectRatio) {
                            var i = c({}, this.prepared.edges);
                            i.top = i.top || i.left && !i.bottom, i.left = i.left || i.top && !i.right, i.bottom = i.bottom || i.right && !i.top, i.right = i.right || i.bottom && !i.left, this.prepared._linkedEdges = i
                        } else this.prepared._linkedEdges = null;
                        this.target.options.resize.preserveAspectRatio && (this.resizeStartAspectRatio = e.width / e.height), this.resizeRects = { start: e, current: c({}, e), restricted: c({}, e), previous: c({}, e), delta: { left: 0, right: 0, width: 0, top: 0, bottom: 0, height: 0 } }, t.rect = this.resizeRects.restricted, t.deltaRect = this.resizeRects.delta
                    }
                    return this.target.fire(t), this.resizing = !0, t
                },
                resizeMove: function(t) {
                    t = new U(this, t, "resize", "move", this.element);
                    var e = this.prepared.edges,
                        i = this.target.options.resize.invert,
                        r = "reposition" === i || "negate" === i;
                    if (e) {
                        var s = t.dx,
                            n = t.dy,
                            o = this.resizeRects.start,
                            a = this.resizeRects.current,
                            h = this.resizeRects.restricted,
                            p = this.resizeRects.delta,
                            l = c(this.resizeRects.previous, h),
                            d = e;
                        if (this.target.options.resize.preserveAspectRatio) {
                            var u = this.resizeStartAspectRatio,
                                e = this.prepared._linkedEdges;
                            d.left && d.bottom || d.right && d.top ? n = -s / u : d.left || d.right ? n = s / u : (d.top || d.bottom) && (s = n * u)
                        } else this.target.options.resize.square && (e = this.prepared._linkedEdges, d.left && d.bottom || d.right && d.top ? n = -s : d.left || d.right ? n = s : (d.top || d.bottom) && (s = n));
                        e.top && (a.top += n), e.bottom && (a.bottom += n), e.left && (a.left += s), e.right && (a.right += s), r ? (c(h, a), "reposition" === i && (h.top > h.bottom && (e = h.top, h.top = h.bottom, h.bottom = e), h.left > h.right && (e = h.left, h.left = h.right, h.right = e))) : (h.top = Math.min(a.top, o.bottom), h.bottom = Math.max(a.bottom, o.top), h.left = Math.min(a.left, o.right), h.right = Math.max(a.right, o.left)), h.width = h.right - h.left, h.height = h.bottom - h.top;
                        for (var g in h) p[g] = h[g] - l[g];
                        t.edges = this.prepared.edges, t.rect = h, t.deltaRect = p
                    }
                    return this.target.fire(t), t
                },
                gestureStart: function(t) { return t = new U(this, t, "gesture", "start", this.element), t.ds = 0, this.gesture.startDistance = this.gesture.prevDistance = t.distance, this.gesture.startAngle = this.gesture.prevAngle = t.angle, this.gesture.scale = 1, this.gesturing = !0, this.target.fire(t), t },
                gestureMove: function(t) { return this.pointerIds.length ? (t = new U(this, t, "gesture", "move", this.element), t.ds = t.scale - this.gesture.scale, this.target.fire(t), this.gesture.prevAngle = t.angle, this.gesture.prevDistance = t.distance, 1 / 0 === t.scale || null === t.scale || void 0 === t.scale || isNaN(t.scale) || (this.gesture.scale = t.scale), t) : this.prevEvent },
                pointerHold: function(t, e, i) { this.collectEventTargets(t, e, i, "hold") },
                pointerUp: function(t, e, i, r) {
                    var s = this.mouse ? 0 : it(this.pointerIds, x(t));
                    clearTimeout(this.holdTimers[s]), this.collectEventTargets(t, e, i, "up"), this.collectEventTargets(t, e, i, "tap"), this.pointerEnd(t, e, i, r), this.removePointer(t)
                },
                pointerCancel: function(t, e, i, r) {
                    var s = this.mouse ? 0 : it(this.pointerIds, x(t));
                    clearTimeout(this.holdTimers[s]), this.collectEventTargets(t, e, i, "cancel"), this.pointerEnd(t, e, i, r), this.removePointer(t)
                },
                ie8Dblclick: function(t, e, i) { this.prevTap && e.clientX === this.prevTap.clientX && e.clientY === this.prevTap.clientY && i === this.prevTap.target && (this.downTargets[0] = i, this.downTimes[0] = (new Date).getTime(), this.collectEventTargets(t, e, i, "tap")) },
                pointerEnd: function(t, e, i, r) {
                    var s = this.target,
                        n = s && s.options,
                        o = n && this.prepared.name && n[this.prepared.name].inertia,
                        a = this.inertiaStatus;
                    if (this.interacting()) {
                        if (a.active && !a.ending) return;
                        var h, p = (new Date).getTime(),
                            l = !1,
                            d = F(s, this.prepared.name) && n[this.prepared.name].snap.endOnly,
                            g = N(s, this.prepared.name) && n[this.prepared.name].restrict.endOnly,
                            m = 0,
                            v = 0,
                            n = this.dragging ? "x" === n.drag.axis ? Math.abs(this.pointerDelta.client.vx) : "y" === n.drag.axis ? Math.abs(this.pointerDelta.client.vy) : this.pointerDelta.client.speed : this.pointerDelta.client.speed,
                            o = (h = o && o.enabled && "gesture" !== this.prepared.name && e !== a.startEvent) && 50 > p - this.curCoords.timeStamp && n > o.minSpeed && n > o.endSpeed;
                        if (h && !o && (d || g) && (h = {}, h.snap = h.restrict = h, d && (this.setSnapping(this.curCoords.page, h), h.locked && (m += h.dx, v += h.dy)), g && (this.setRestriction(this.curCoords.page, h), h.restricted && (m += h.dx, v += h.dy)), m || v) && (l = !0), o || l) return u(a.upCoords, this.curCoords), this.pointers[0] = a.startEvent = new U(this, e, this.prepared.name, "inertiastart", this.element), a.t0 = p, s.fire(a.startEvent), o ? (a.vx0 = this.pointerDelta.client.vx, a.vy0 = this.pointerDelta.client.vy, a.v0 = n, this.calcInertia(a), e = c({}, this.curCoords.page), s = P(s, this.element), e.x = e.x + a.xe - s.x, e.y = e.y + a.ye - s.y, s = { useStatusXY: !0, x: e.x, y: e.y, dx: 0, dy: 0, snap: null }, s.snap = s, m = v = 0, d && (e = this.setSnapping(this.curCoords.page, s), e.locked && (m += e.dx, v += e.dy)), g && (s = this.setRestriction(this.curCoords.page, s), s.restricted && (m += s.dx, v += s.dy)), a.modifiedXe += m, a.modifiedYe += v, a.i = Ft(this.boundInertiaFrame)) : (a.smoothEnd = !0, a.xe = m, a.ye = v, a.sx = a.sy = 0, a.i = Ft(this.boundSmoothEndFrame)), void(a.active = !0);
                        (d || g) && this.pointerMove(t, e, i, r, !0)
                    }
                    this.dragging ? (a = new U(this, e, "drag", "end", this.element), g = this.getDrop(a, e, this.element), this.dropTarget = g.dropzone, this.dropElement = g.element, g = this.getDropEvents(e, a), g.leave && this.prevDropTarget.fire(g.leave), g.enter && this.dropTarget.fire(g.enter), g.drop && this.dropTarget.fire(g.drop), g.deactivate && this.fireActiveDrops(g.deactivate), s.fire(a)) : this.resizing ? (a = new U(this, e, "resize", "end", this.element), s.fire(a)) : this.gesturing && (a = new U(this, e, "gesture", "end", this.element), s.fire(a)), this.stop(e)
                },
                collectDrops: function(t) {
                    var e, r = [],
                        s = [];
                    for (t = t || this.element, e = 0; e < yt.length; e++)
                        if (yt[e].options.drop.enabled) {
                            var n = yt[e],
                                o = n.options.drop.accept;
                            if (!(i(o) && o !== t || p(o) && !rt(t, o)))
                                for (var o = n.selector ? n._context.querySelectorAll(n.selector) : [n._element], a = 0, h = o.length; a < h; a++) {
                                    var l = o[a];
                                    l !== t && (r.push(n), s.push(l))
                                }
                        }
                    return { dropzones: r, elements: s }
                },
                fireActiveDrops: function(t) {
                    var e;
                    for (e = 0; e < this.activeDrops.dropzones.length; e++) {
                        var i = this.activeDrops.dropzones[e],
                            r = this.activeDrops.elements[e];
                        r !== s && (t.target = r, i.fire(t));
                        var s = r
                    }
                },
                setActiveDrops: function(t) { for (t = this.collectDrops(t, !0), this.activeDrops.dropzones = t.dropzones, this.activeDrops.elements = t.elements, this.activeDrops.rects = [], t = 0; t < this.activeDrops.dropzones.length; t++) this.activeDrops.rects[t] = this.activeDrops.dropzones[t].getRect(this.activeDrops.elements[t]) },
                getDrop: function(t, e, i) {
                    var r = [];
                    Et && this.setActiveDrops(i);
                    for (var s = 0; s < this.activeDrops.dropzones.length; s++) {
                        var n = this.activeDrops.elements[s];
                        r.push(this.activeDrops.dropzones[s].dropCheck(t, e, this.target, i, n, this.activeDrops.rects[s]) ? n : null)
                    }
                    i = (e = r[0]) ? 0 : -1;
                    for (var o, a, s = [], n = 1; n < r.length; n++)
                        if ((t = r[n]) && t !== e)
                            if (e) {
                                if (t.parentNode !== t.ownerDocument)
                                    if (e.parentNode === t.ownerDocument) e = t, i = n;
                                    else {
                                        if (!s.length)
                                            for (o = e; o.parentNode && o.parentNode !== o.ownerDocument;) s.unshift(o), o = o.parentNode;
                                        if (e instanceof ut && t instanceof lt && !(t instanceof ct)) {
                                            if (t === e.parentNode) continue;
                                            o = t.ownerSVGElement
                                        } else o = t;
                                        for (a = []; o.parentNode !== o.ownerDocument;) a.unshift(o), o = o.parentNode;
                                        for (o = 0; a[o] && a[o] === s[o];) o++;
                                        for (o = [a[o - 1], a[o], s[o]], a = o[0].lastChild; a;) {
                                            if (a === o[1]) { e = t, i = n, s = []; break }
                                            if (a === o[2]) break;
                                            a = a.previousSibling
                                        }
                                    }
                            } else e = t, i = n;
                    return r = i, { dropzone: this.activeDrops.dropzones[r] || null, element: this.activeDrops.elements[r] || null }
                },
                getDropEvents: function(t, e) { return t = { enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null }, this.dropElement !== this.prevDropElement && (this.prevDropTarget && (t.leave = { target: this.prevDropElement, dropzone: this.prevDropTarget, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, timeStamp: e.timeStamp, type: "dragleave" }, e.dragLeave = this.prevDropElement, e.prevDropzone = this.prevDropTarget), this.dropTarget && (t.enter = { target: this.dropElement, dropzone: this.dropTarget, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, timeStamp: e.timeStamp, type: "dragenter" }, e.dragEnter = this.dropElement, e.dropzone = this.dropTarget)), "dragend" === e.type && this.dropTarget && (t.drop = { target: this.dropElement, dropzone: this.dropTarget, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, timeStamp: e.timeStamp, type: "drop" }, e.dropzone = this.dropTarget), "dragstart" === e.type && (t.activate = { target: null, dropzone: null, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, timeStamp: e.timeStamp, type: "dropactivate" }), "dragend" === e.type && (t.deactivate = { target: null, dropzone: null, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, timeStamp: e.timeStamp, type: "dropdeactivate" }), "dragmove" === e.type && this.dropTarget && (t.move = { target: this.dropElement, dropzone: this.dropTarget, relatedTarget: e.target, draggable: e.interactable, dragEvent: e, interaction: this, dragmove: e, timeStamp: e.timeStamp, type: "dropmove" }, e.dropzone = this.dropTarget), t },
                currentAction: function() { return this.dragging && "drag" || this.resizing && "resize" || this.gesturing && "gesture" || null },
                interacting: function() { return this.dragging || this.resizing || this.gesturing },
                clearTargets: function() { this.dropTarget = this.dropElement = this.prevDropTarget = this.prevDropElement = this.target = this.element = null },
                stop: function(t) {
                    if (this.interacting()) {
                        wt.stop(), this.matches = [], this.matchElements = [];
                        var e = this.target;
                        e.options.styleCursor && (e._doc.documentElement.style.cursor = ""), t && o(t.preventDefault) && this.checkAndPreventDefault(t, e, this.element), this.dragging && (this.activeDrops.dropzones = this.activeDrops.elements = this.activeDrops.rects = null)
                    }
                    for (this.clearTargets(), this.pointerIsDown = this.snapStatus.locked = this.dragging = this.resizing = this.gesturing = !1, this.prepared.name = this.prevEvent = null, t = this.inertiaStatus.resumeDx = this.inertiaStatus.resumeDy = 0; t < this.pointers.length; t++) - 1 === it(this.pointerIds, x(this.pointers[t])) && this.pointers.splice(t, 1)
                },
                inertiaFrame: function() {
                    var t = this.inertiaStatus,
                        e = this.target.options[this.prepared.name].inertia.resistance,
                        i = (new Date).getTime() / 1e3 - t.t0;
                    if (i < t.te) {
                        if (i = 1 - (Math.exp(-e * i) - t.lambda_v0) / t.one_ve_v0, t.modifiedXe === t.xe && t.modifiedYe === t.ye) t.sx = t.xe * i, t.sy = t.ye * i;
                        else {
                            var r = t.ye,
                                s = t.modifiedYe;
                            e = A(i, 0, t.xe, t.modifiedXe), i = A(i, 0, r, s), t.sx = e, t.sy = i
                        }
                        this.pointerMove(t.startEvent, t.startEvent), t.i = Ft(this.boundInertiaFrame)
                    } else t.ending = !0, t.sx = t.modifiedXe, t.sy = t.modifiedYe, this.pointerMove(t.startEvent, t.startEvent), this.pointerEnd(t.startEvent, t.startEvent), t.active = t.ending = !1
                },
                smoothEndFrame: function() {
                    var t = this.inertiaStatus,
                        e = (new Date).getTime() - t.t0,
                        i = this.target.options[this.prepared.name].inertia.smoothEndDuration;
                    if (e < i) {
                        var r = e / i;
                        t.sx = -t.xe * r * (r - 2) + 0, e /= i, t.sy = -t.ye * e * (e - 2) + 0, this.pointerMove(t.startEvent, t.startEvent), t.i = Ft(this.boundSmoothEndFrame)
                    } else t.ending = !0, t.sx = t.xe, t.sy = t.ye, this.pointerMove(t.startEvent, t.startEvent), this.pointerEnd(t.startEvent, t.startEvent), t.smoothEnd = t.active = t.ending = !1
                },
                addPointer: function(t) {
                    var e = x(t),
                        i = this.mouse ? 0 : it(this.pointerIds, e);
                    return -1 === i && (i = this.pointerIds.length), this.pointerIds[i] = e, this.pointers[i] = t, i
                },
                removePointer: function(t) { t = x(t), t = this.mouse ? 0 : it(this.pointerIds, t), -1 !== t && (this.pointers.splice(t, 1), this.pointerIds.splice(t, 1), this.downTargets.splice(t, 1), this.downTimes.splice(t, 1), this.holdTimers.splice(t, 1)) },
                recordPointer: function(t) { var e = this.mouse ? 0 : it(this.pointerIds, x(t)); - 1 !== e && (this.pointers[e] = t) },
                collectEventTargets: function(t, e, r, s) {
                    function n(t, e, n) { n = ot ? n.querySelectorAll(e) : void 0, t._iEvents[s] && i(p) && X(t, p) && !Y(t, p, r) && I(t, p, r) && rt(p, e, n) && (a.push(t), h.push(p)) }
                    var o = this.mouse ? 0 : it(this.pointerIds, x(t));
                    if ("tap" !== s || !this.pointerWasMoved && this.downTargets[o] && this.downTargets[o] === r) {
                        for (var a = [], h = [], p = r; p;) J.isSet(p) && J(p)._iEvents[s] && (a.push(J(p)), h.push(p)), yt.forEachSelector(n), p = k(p);
                        (a.length || "tap" === s) && this.firePointers(t, e, r, a, h, s)
                    }
                },
                firePointers: function(t, e, i, r, s, n) {
                    var o = this.mouse ? 0 : it(this.pointerIds, x(t)),
                        a = {};
                    if ("doubletap" === n ? a = t : (d(a, e), e !== t && d(a, t), a.preventDefault = W, a.stopPropagation = U.prototype.stopPropagation, a.stopImmediatePropagation = U.prototype.stopImmediatePropagation, a.interaction = this, a.timeStamp = (new Date).getTime(), a.originalEvent = e, a.originalPointer = t, a.type = n, a.pointerId = x(t), a.pointerType = this.mouse ? "mouse" : Dt ? p(t.pointerType) ? t.pointerType : [, , "touch", "pen", "mouse"][t.pointerType] : "touch"), "tap" === n) {
                        a.dt = a.timeStamp - this.downTimes[o];
                        var h = a.timeStamp - this.tapTime,
                            l = !!(this.prevTap && "doubletap" !== this.prevTap.type && this.prevTap.target === a.target && 500 > h);
                        a.double = l, this.tapTime = a.timeStamp
                    }
                    for (t = 0; t < r.length && (a.currentTarget = s[t], a.interactable = r[t], r[t].fire(a), !(a.immediatePropagationStopped || a.propagationStopped && s[t + 1] !== a.currentTarget)); t++);
                    l ? (r = {}, c(r, a), r.dt = h, r.type = "doubletap", this.collectEventTargets(r, e, i, "doubletap"), this.prevTap = r) : "tap" === n && (this.prevTap = a)
                },
                validateSelector: function(t, e, i, r) {
                    for (var s = 0, n = i.length; s < n; s++) {
                        var o = i[s],
                            a = r[s],
                            h = L(o.getAction(t, e, this, a), o);
                        if (h && q(o, a, h)) return this.target = o, this.element = a, h
                    }
                },
                setSnapping: function(t, e) {
                    var i, r = this.target.options[this.prepared.name].snap,
                        s = [];
                    if (e = e || this.snapStatus, e.useStatusXY) t = { x: e.x, y: e.y };
                    else {
                        var n = P(this.target, this.element);
                        t = c({}, t), t.x -= n.x, t.y -= n.y
                    }
                    e.realX = t.x, e.realY = t.y, t.x -= this.inertiaStatus.resumeDx, t.y -= this.inertiaStatus.resumeDy;
                    for (var h = r.targets ? r.targets.length : 0, p = 0; p < this.snapOffsets.length; p++) {
                        var l = t.x - this.snapOffsets[p].x,
                            d = t.y - this.snapOffsets[p].y;
                        for (i = 0; i < h; i++)(n = o(r.targets[i]) ? r.targets[i](l, d, this) : r.targets[i]) && s.push({ x: a(n.x) ? n.x + this.snapOffsets[p].x : l, y: a(n.y) ? n.y + this.snapOffsets[p].y : d, range: a(n.range) ? n.range : r.range })
                    }
                    var r = null,
                        p = !1,
                        u = 0,
                        g = 0;
                    for (i = d = l = 0, h = s.length; i < h; i++) {
                        n = s[i];
                        var m = n.range,
                            v = n.x - t.x,
                            f = n.y - t.y,
                            y = mt(v, f),
                            x = y <= m;
                        1 / 0 === m && p && 1 / 0 !== g && (x = !1), r && !(x ? p && 1 / 0 !== m ? y / m < u / g : 1 / 0 === m && 1 / 0 !== g || y < u : !p && y < u) || (1 / 0 === m && (x = !0), r = n, u = y, g = m, p = x, l = v, d = f, e.range = m)
                    }
                    return r ? (s = e.snappedX !== r.x || e.snappedY !== r.y, e.snappedX = r.x, e.snappedY = r.y) : (s = !0, e.snappedX = NaN, e.snappedY = NaN), e.dx = l, e.dy = d, e.changed = s || p && !e.locked, e.locked = p, e
                },
                setRestriction: function(t, e) {
                    var r = this.target,
                        s = r && r.options[this.prepared.name].restrict,
                        n = s && s.restriction;
                    return n ? (e = e || this.restrictStatus, s = s = e.useStatusXY ? { x: e.x, y: e.y } : c({}, t), e.snap && e.snap.locked && (s.x += e.snap.dx || 0, s.y += e.snap.dy || 0), s.x -= this.inertiaStatus.resumeDx, s.y -= this.inertiaStatus.resumeDy, e.dx = 0, e.dy = 0, e.restricted = !1, p(n) && (n = "parent" === n ? k(this.element) : "self" === n ? r.getRect(this.element) : O(this.element, n), !n) ? e : (o(n) && (n = n(s.x, s.y, this.element)), i(n) && (n = w(n)), (t = n) ? "x" in n && "y" in n ? (r = Math.max(Math.min(t.x + t.width - this.restrictOffset.right, s.x), t.x + this.restrictOffset.left), t = Math.max(Math.min(t.y + t.height - this.restrictOffset.bottom, s.y), t.y + this.restrictOffset.top)) : (r = Math.max(Math.min(t.right - this.restrictOffset.right, s.x), t.left + this.restrictOffset.left), t = Math.max(Math.min(t.bottom - this.restrictOffset.bottom, s.y), t.top + this.restrictOffset.top)) : (r = s.x, t = s.y), e.dx = r - s.x, e.dy = t - s.y, e.changed = e.restrictedX !== r || e.restrictedY !== t, e.restricted = !(!e.dx && !e.dy), e.restrictedX = r, e.restrictedY = t, e)) : e
                },
                checkAndPreventDefault: function(t, e, i) { if (e = e || this.target) { e = e.options; var r = e.preventDefault; "auto" === r && i && !/^(input|select|textarea)$/i.test(t.target.nodeName) ? /down|start/i.test(t.type) && "drag" === this.prepared.name && "xy" !== e.drag.axis || e[this.prepared.name] && e[this.prepared.name].manualStart && !this.interacting() || t.preventDefault() : "always" === r && t.preventDefault() } },
                calcInertia: function(t) {
                    var e = this.target.options[this.prepared.name].inertia,
                        i = e.resistance,
                        r = -Math.log(e.endSpeed / t.v0) / i;
                    t.x0 = this.prevEvent.pageX, t.y0 = this.prevEvent.pageY, t.t0 = t.startEvent.timeStamp / 1e3, t.sx = t.sy = 0, t.modifiedXe = t.xe = (t.vx0 - r) / i, t.modifiedYe = t.ye = (t.vy0 - r) / i, t.te = r, t.lambda_v0 = i / t.v0, t.one_ve_v0 = 1 - e.endSpeed / t.v0
                },
                autoScrollMove: function(t) {
                    var e;
                    if (e = this.interacting()) { e = this.prepared.name; var i = this.target.options; /^resize/.test(e) && (e = "resize"), e = i[e].autoScroll && i[e].autoScroll.enabled }
                    if (e)
                        if (this.inertiaStatus.active) wt.x = wt.y = 0;
                        else {
                            var s = this.target.options[this.prepared.name].autoScroll,
                                n = s.container || b(this.element);
                            if (r(n)) {
                                var o = t.clientX < wt.margin;
                                e = t.clientY < wt.margin, i = t.clientX > n.innerWidth - wt.margin, t = t.clientY > n.innerHeight - wt.margin
                            } else n = S(n), o = t.clientX < n.left + wt.margin, e = t.clientY < n.top + wt.margin, i = t.clientX > n.right - wt.margin, t = t.clientY > n.bottom - wt.margin;
                            wt.x = i ? 1 : o ? -1 : 0, wt.y = t ? 1 : e ? -1 : 0, wt.isScrolling || (wt.margin = s.margin, wt.speed = s.speed, wt.start(this))
                        }
                },
                _updateEventTargets: function(t, e) { this._eventTarget = t, this._curEventTarget = e }
            }, U.prototype = { preventDefault: e, stopImmediatePropagation: function() { this.immediatePropagationStopped = this.propagationStopped = !0 }, stopPropagation: function() { this.propagationStopped = !0 } };
            for (var $t = {}, Ht = "dragStart dragMove resizeStart resizeMove gestureStart gestureMove pointerOver pointerOut pointerHover selectorDown pointerDown pointerMove pointerUp pointerCancel pointerEnd addPointer removePointer recordPointer autoScrollMove".split(" "), Ut = 0, Wt = Ht.length; Ut < Wt; Ut++) {
                var Vt = Ht[Ut];
                $t[Vt] = H(Vt)
            }
            yt.indexOfElement = function(t, e) { e = e || ht; for (var i = 0; i < this.length; i++) { var r = this[i]; if (r.selector === t && r._context === e || !r.selector && r._element === t) return i } return -1 }, yt.get = function(t, e) { return this[this.indexOfElement(t, e && e.context)] }, yt.forEachSelector = function(t) { for (var e = 0; e < this.length; e++) { var i = this[e]; if (i.selector && (i = t(i, i.selector, i._context, e, this), void 0 !== i)) return i } }, Q.prototype = {
                    setOnEvents: function(t, e) { return "drop" === t ? (o(e.ondrop) && (this.ondrop = e.ondrop), o(e.ondropactivate) && (this.ondropactivate = e.ondropactivate), o(e.ondropdeactivate) && (this.ondropdeactivate = e.ondropdeactivate), o(e.ondragenter) && (this.ondragenter = e.ondragenter), o(e.ondragleave) && (this.ondragleave = e.ondragleave), o(e.ondropmove) && (this.ondropmove = e.ondropmove)) : (t = "on" + t, o(e.onstart) && (this[t + "start"] = e.onstart), o(e.onmove) && (this[t + "move"] = e.onmove), o(e.onend) && (this[t + "end"] = e.onend), o(e.oninertiastart) && (this[t + "inertiastart"] = e.oninertiastart)), this },
                    draggable: function(t) { return n(t) ? (this.options.drag.enabled = !1 !== t.enabled, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^x$|^y$|^xy$/.test(t.axis) ? this.options.drag.axis = t.axis : null === t.axis && delete this.options.drag.axis, this) : h(t) ? (this.options.drag.enabled = t, this) : this.options.drag },
                    setPerAction: function(t, e) { for (var i in e) i in St[t] && (n(e[i]) ? (this.options[t][i] = c(this.options[t][i] || {}, e[i]), n(St.perAction[i]) && "enabled" in St.perAction[i] && (this.options[t][i].enabled = !1 !== e[i].enabled)) : h(e[i]) && n(St.perAction[i]) ? this.options[t][i].enabled = e[i] : void 0 !== e[i] && (this.options[t][i] = e[i])) },
                    dropzone: function(t) { return n(t) ? (this.options.drop.enabled = !1 !== t.enabled, this.setOnEvents("drop", t), /^(pointer|center)$/.test(t.overlap) ? this.options.drop.overlap = t.overlap : a(t.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)), "accept" in t && (this.options.drop.accept = t.accept), "checker" in t && (this.options.drop.checker = t.checker), this) : h(t) ? (this.options.drop.enabled = t, this) : this.options.drop },
                    dropCheck: function(t, e, i, r, s, n) {
                        var o = !1;
                        if (!(n = n || this.getRect(s))) return !!this.options.drop.checker && this.options.drop.checker(t, e, o, this, s, i, r);
                        var h = this.options.drop.overlap;
                        if ("pointer" === h) {
                            var p = f(t),
                                o = P(i, r);
                            p.x += o.x, p.y += o.y, o = p.x > n.left && p.x < n.right, p = p.y > n.top && p.y < n.bottom, o = o && p
                        }
                        if (p = i.getRect(r), "center" === h) var o = p.left + p.width / 2,
                            l = p.top + p.height / 2,
                            o = o >= n.left && o <= n.right && l >= n.top && l <= n.bottom;
                        return a(h) && (o = Math.max(0, Math.min(n.right, p.right) - Math.max(n.left, p.left)) * Math.max(0, Math.min(n.bottom, p.bottom) - Math.max(n.top, p.top)) / (p.width * p.height) >= h), this.options.drop.checker && (o = this.options.drop.checker(t, e, o, this, s, i, r)), o
                    },
                    dropChecker: function(t) { return o(t) ? (this.options.drop.checker = t, this) : null === t ? (delete this.options.getRect, this) : this.options.drop.checker },
                    accept: function(t) { return i(t) || l(t) ? (this.options.drop.accept = t, this) : null === t ? (delete this.options.drop.accept, this) : this.options.drop.accept },
                    resizable: function(t) { return n(t) ? (this.options.resize.enabled = !1 !== t.enabled, this.setPerAction("resize", t), this.setOnEvents("resize", t), /^x$|^y$|^xy$/.test(t.axis) ? this.options.resize.axis = t.axis : null === t.axis && (this.options.resize.axis = St.resize.axis), h(t.preserveAspectRatio) ? this.options.resize.preserveAspectRatio = t.preserveAspectRatio : h(t.square) && (this.options.resize.square = t.square), this) : h(t) ? (this.options.resize.enabled = t, this) : this.options.resize },
                    squareResize: function(t) { return h(t) ? (this.options.resize.square = t, this) : null === t ? (delete this.options.resize.square, this) : this.options.resize.square },
                    gesturable: function(t) { return n(t) ? (this.options.gesture.enabled = !1 !== t.enabled, this.setPerAction("gesture", t), this.setOnEvents("gesture", t), this) : h(t) ? (this.options.gesture.enabled = t, this) : this.options.gesture },
                    autoScroll: function(t) { return n(t) ? t = c({ actions: ["drag", "resize"] }, t) : h(t) && (t = { actions: ["drag", "resize"], enabled: t }), this.setOptions("autoScroll", t) },
                    snap: function(t) { return t = this.setOptions("snap", t), t === this ? this : t.drag },
                    setOptions: function(t, e) {
                        var i, r = e && s(e.actions) ? e.actions : ["drag"];
                        if (n(e) || h(e)) {
                            for (i = 0; i < r.length; i++) {
                                var o = /resize/.test(r[i]) ? "resize" : r[i];
                                n(this.options[o]) && (o = this.options[o][t], n(e) ? (c(o, e), o.enabled = !1 !== e.enabled, "snap" === t && ("grid" === o.mode ? o.targets = [J.createSnapGrid(c({ offset: o.gridOffset || { x: 0, y: 0 } }, o.grid || {}))] : "anchor" === o.mode ? o.targets = o.anchors : "path" === o.mode && (o.targets = o.paths), "elementOrigin" in e && (o.relativePoints = [e.elementOrigin]))) : h(e) && (o.enabled = e))
                            }
                            return this
                        }
                        for (e = {}, r = ["drag", "resize", "gesture"], i = 0; i < r.length; i++) t in St[r[i]] && (e[r[i]] = this.options[r[i]][t]);
                        return e
                    },
                    inertia: function(t) { return t = this.setOptions("inertia", t), t === this ? this : t.drag },
                    getAction: function(t, e, i, r) { var s = this.defaultActionChecker(t, i, r); return this.options.actionChecker ? this.options.actionChecker(t, e, s, this, r, i) : s },
                    defaultActionChecker: G,
                    actionChecker: function(t) { return o(t) ? (this.options.actionChecker = t, this) : null === t ? (delete this.options.actionChecker, this) : this.options.actionChecker },
                    getRect: function(t) { return t = t || this._element, this.selector && !i(t) && (t = this._context.querySelector(this.selector)), w(t) },
                    rectChecker: function(t) { return o(t) ? (this.getRect = t, this) : null === t ? (delete this.options.getRect, this) : this.getRect },
                    styleCursor: function(t) { return h(t) ? (this.options.styleCursor = t, this) : null === t ? (delete this.options.styleCursor, this) : this.options.styleCursor },
                    preventDefault: function(t) { return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : h(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault },
                    origin: function(t) { return l(t) || n(t) ? (this.options.origin = t, this) : this.options.origin },
                    deltaSource: function(t) { return "page" === t || "client" === t ? (this.options.deltaSource = t, this) : this.options.deltaSource },
                    restrict: function(t) {
                        if (!n(t)) return this.setOptions("restrict", t);
                        for (var e, i = ["drag", "resize", "gesture"], r = 0; r < i.length; r++) {
                            var s = i[r];
                            s in t && (e = c({ actions: [s], restriction: t[s] }, t), e = this.setOptions("restrict", e))
                        }
                        return e
                    },
                    context: function() { return this._context },
                    _context: ht,
                    ignoreFrom: function(t) { return l(t) || i(t) ? (this.options.ignoreFrom = t, this) : this.options.ignoreFrom },
                    allowFrom: function(t) { return l(t) || i(t) ? (this.options.allowFrom = t, this) : this.options.allowFrom },
                    element: function() { return this._element },
                    fire: function(t) {
                        if (!t || !t.type || -1 === it(kt, t.type)) return this;
                        var e, i = "on" + t.type;
                        if (t.type in this._iEvents) {
                            var r = this._iEvents[t.type],
                                s = 0;
                            for (e = r.length; s < e && !t.immediatePropagationStopped; s++) r[s](t)
                        }
                        if (o(this[i]) && this[i](t), t.type in Xt && (r = Xt[t.type]))
                            for (s = 0, e = r.length; s < e && !t.immediatePropagationStopped; s++) r[s](t);
                        return this
                    },
                    on: function(t, e, i) {
                        var r;
                        if (p(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s(t)) { for (r = 0; r < t.length; r++) this.on(t[r], e, i); return this }
                        if (n(t)) { for (r in t) this.on(r, t[r], e); return this }
                        if ("wheel" === t && (t = Ot), i = !!i, -1 !== it(kt, t)) t in this._iEvents ? this._iEvents[t].push(e) : this._iEvents[t] = [e];
                        else if (this.selector) {
                            if (!bt[t])
                                for (bt[t] = { selectors: [], contexts: [], listeners: [] }, r = 0; r < ft.length; r++) qt.add(ft[r], t, K), qt.add(ft[r], t, B, !0);
                            for (t = bt[t], r = t.selectors.length - 1; 0 <= r && (t.selectors[r] !== this.selector || t.contexts[r] !== this._context); r--); - 1 === r && (r = t.selectors.length, t.selectors.push(this.selector), t.contexts.push(this._context), t.listeners.push([])), t.listeners[r].push([e, i])
                        } else qt.add(this._element, t, e, i);
                        return this
                    },
                    off: function(t, e, i) {
                        var r;
                        if (p(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s(t)) { for (r = 0; r < t.length; r++) this.off(t[r], e, i); return this }
                        if (n(t)) { for (var o in t) this.off(o, t[o], e); return this }
                        if (o = -1, i = !!i, "wheel" === t && (t = Ot), -1 !== it(kt, t))(i = this._iEvents[t]) && -1 !== (o = it(i, e)) && this._iEvents[t].splice(o, 1);
                        else if (this.selector) {
                            var a = bt[t],
                                h = !1;
                            if (!a) return this;
                            for (o = a.selectors.length - 1; 0 <= o; o--)
                                if (a.selectors[o] === this.selector && a.contexts[o] === this._context) { var l = a.listeners[o]; for (r = l.length - 1; 0 <= r; r--) { var c = l[r][1]; if (l[r][0] === e && c === i) { l.splice(r, 1), l.length || (a.selectors.splice(o, 1), a.contexts.splice(o, 1), a.listeners.splice(o, 1), qt.remove(this._context, t, K), qt.remove(this._context, t, B, !0), a.selectors.length || (bt[t] = null)), h = !0; break } } if (h) break }
                        } else qt.remove(this._element, t, e, i);
                        return this
                    },
                    set: function(t) {
                        n(t) || (t = {}), this.options = c({}, St.base);
                        var e, i = ["drag", "drop", "resize", "gesture"],
                            r = ["draggable", "dropzone", "resizable", "gesturable"],
                            s = c(c({}, St.perAction), t[o] || {});
                        for (e = 0; e < i.length; e++) {
                            var o = i[e];
                            this.options[o] = c({}, St[o]), this.setPerAction(o, s), this[r[e]](t[o])
                        }
                        for (o = "accept actionChecker allowFrom deltaSource dropChecker ignoreFrom origin preventDefault rectChecker styleCursor".split(" "), e = 0, Wt = o.length; e < Wt; e++) i = o[e], this.options[i] = St.base[i], i in t && this[i](t[i]);
                        return this
                    },
                    unset: function() {
                        if (qt.remove(this._element, "all"), p(this.selector))
                            for (var t in bt)
                                for (var e = bt[t]; 0 < e.selectors.length;) { e.selectors[0] === this.selector && e.contexts[0] === this._context && (e.selectors.splice(0, 1), e.contexts.splice(0, 1), e.listeners.splice(0, 1), e.selectors.length || (bt[t] = null)), qt.remove(this._context, t, K), qt.remove(this._context, t, B, !0); break } else qt.remove(this, "all"), this.options.styleCursor && (this._element.style.cursor = "");
                        return this.dropzone(!1), yt.splice(it(yt, this), 1), J
                    }
                }, Q.prototype.snap = Z(Q.prototype.snap, "Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping"), Q.prototype.restrict = Z(Q.prototype.restrict, "Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction"), Q.prototype.inertia = Z(Q.prototype.inertia, "Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia"), Q.prototype.autoScroll = Z(Q.prototype.autoScroll, "Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll"), Q.prototype.squareResize = Z(Q.prototype.squareResize, "Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square"), Q.prototype.accept = Z(Q.prototype.accept, "Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead"), Q.prototype.dropChecker = Z(Q.prototype.dropChecker, "Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead"), Q.prototype.context = Z(Q.prototype.context, "Interactable#context as a method is deprecated. It will soon be a DOM Node instead"), J.isSet = function(t, e) { return -1 !== yt.indexOfElement(t, e && e.context) }, J.on = function(t, e, i) { if (p(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s(t)) { for (var r = 0; r < t.length; r++) J.on(t[r], e, i); return J } if (n(t)) { for (r in t) J.on(r, t[r], e); return J } return -1 !== it(kt, t) ? Xt[t] ? Xt[t].push(e) : Xt[t] = [e] : qt.add(ht, t, e, i), J }, J.off = function(t, e, i) {
                    if (p(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), s(t)) { for (var r = 0; r < t.length; r++) J.off(t[r], e, i); return J }
                    if (n(t)) { for (r in t) J.off(r, t[r], e); return J }
                    if (-1 === it(kt, t)) qt.remove(ht, t, e, i);
                    else {
                        var o;
                        t in Xt && -1 !== (o = it(Xt[t], e)) && Xt[t].splice(o, 1)
                    }
                    return J
                }, J.enableDragging = Z(function(t) { return null !== t && void 0 !== t ? (_t.drag = t, J) : _t.drag }, "interact.enableDragging is deprecated and will soon be removed."), J.enableResizing = Z(function(t) { return null !== t && void 0 !== t ? (_t.resize = t, J) : _t.resize }, "interact.enableResizing is deprecated and will soon be removed."), J.enableGesturing = Z(function(t) { return null !== t && void 0 !== t ? (_t.gesture = t, J) : _t.gesture }, "interact.enableGesturing is deprecated and will soon be removed."), J.eventTypes = kt, J.debug = function() { var t = xt[0] || new j; return { interactions: xt, target: t.target, dragging: t.dragging, resizing: t.resizing, gesturing: t.gesturing, prepared: t.prepared, matches: t.matches, matchElements: t.matchElements, prevCoords: t.prevCoords, startCoords: t.startCoords, pointerIds: t.pointerIds, pointers: t.pointers, addPointer: $t.addPointer, removePointer: $t.removePointer, recordPointer: $t.recordPointer, snap: t.snapStatus, restrict: t.restrictStatus, inertia: t.inertiaStatus, downTime: t.downTimes[0], downEvent: t.downEvent, downPointer: t.downPointer, prevEvent: t.prevEvent, Interactable: Q, interactables: yt, pointerIsDown: t.pointerIsDown, defaultOptions: St, defaultActionChecker: G, actionCursors: At, dragMove: $t.dragMove, resizeMove: $t.resizeMove, gestureMove: $t.gestureMove, pointerUp: $t.pointerUp, pointerDown: $t.pointerDown, pointerMove: $t.pointerMove, pointerHover: $t.pointerHover, eventTypes: kt, events: qt, globalEvents: Xt, delegatedEvents: bt, prefixedPropREs: jt } }, J.getPointerAverage = D, J.getTouchBBox = T, J.getTouchDistance = C, J.getTouchAngle = M, J.getElementRect = w, J.getElementClientRect = S, J.matchesSelector = rt, J.closest = O, J.margin = Z(function(t) { return a(t) ? (Tt = t, J) : Tt }, "interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead."), J.supportsTouch = function() { return zt }, J.supportsPointerEvent = function() { return Dt }, J.stop = function(t) { for (var e = xt.length - 1; 0 <= e; e--) xt[e].stop(t); return J }, J.dynamicDrop = function(t) { return h(t) ? (Et = t, J) : Et }, J.pointerMoveTolerance = function(t) { return a(t) ? (Ct = t, this) : Ct }, J.maxInteractions = function(t) { return a(t) ? (Pt = t, this) : Pt }, J.createSnapGrid = function(t) {
                    return function(e, i) {
                        var r = 0,
                            s = 0;
                        return n(t.offset) && (r = t.offset.x, s = t.offset.y), { x: Math.round((e - r) / t.x) * t.x + r, y: Math.round((i - s) / t.y) * t.y + s, range: t.range }
                    }
                }, et(ht), Rt in Element.prototype && o(Element.prototype[Rt]) || (ot = function(t, e, i) {
                    i = i || t.parentNode.querySelectorAll(e), e = 0;
                    for (var r = i.length; e < r; e++)
                        if (i[e] === t) return !0;
                    return !1
                }),
                function() {
                    for (var e = 0, i = ["ms", "moz", "webkit", "o"], r = 0; r < i.length && !t.requestAnimationFrame; ++r) Ft = t[i[r] + "RequestAnimationFrame"], Nt = t[i[r] + "CancelAnimationFrame"] || t[i[r] + "CancelRequestAnimationFrame"];
                    Ft || (Ft = function(t) {
                        var i = (new Date).getTime(),
                            r = Math.max(0, 16 - (i - e)),
                            s = setTimeout(function() { t(i + r) }, r);
                        return e = i + r, s
                    }), Nt || (Nt = function(t) { clearTimeout(t) })
                }(), "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = J), exports.interact = J) : "function" == typeof define && define.amd ? define("interact", function() { return J }) : t.interact = J
        }
    }("undefined" == typeof window ? void 0 : window);