// lib_min.js

!function(t, i, s) {
    function e(s, e) {
        this.wrapper = "string" == typeof s ? i.querySelector(s) : s,
        this.scroller = this.wrapper.children[0],
        this.scrollerStyle = this.scroller.style,
        this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: .334,
            disablePointer: !h.hasPointer,
            disableTouch: h.hasPointer || !h.hasTouch,
            disableMouse: h.hasPointer || h.hasTouch,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0,
            bindToWrapper: "undefined" == typeof t.onmousedown
        };
        for (var o in e)
            this.options[o] = e[o];
        this.translateZ = this.options.HWCompositing && h.hasPerspective ? " translateZ(0)" : "",
        this.options.useTransition = h.hasTransition && this.options.useTransition,
        this.options.useTransform = h.hasTransform && this.options.useTransform,
        this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough,
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
        this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY,
        this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX,
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
        this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? h.ease[this.options.bounceEasing] || h.ease.circular : this.options.bounceEasing,
        this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
        this.options.tap === !0 && (this.options.tap = "tap"),
        "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1),
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
        this.x = 0,
        this.y = 0,
        this.directionX = 0,
        this.directionY = 0,
        this._events = {},
        this._init(),
        this.refresh(),
        this.scrollTo(this.options.startX, this.options.startY),
        this.enable()
    }
    function o(t, s, e) {
        var o = i.createElement("div"),
            n = i.createElement("div");
        return e === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (e === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (e === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", s || (o.style.pointerEvents = "none"), o.appendChild(n), o
    }
    function n(s, e) {
        this.wrapper = "string" == typeof e.el ? i.querySelector(e.el) : e.el,
        this.wrapperStyle = this.wrapper.style,
        this.indicator = this.wrapper.children[0],
        this.indicatorStyle = this.indicator.style,
        this.scroller = s,
        this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var o in e)
            this.options[o] = e[o];
        if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (h.addEvent(this.indicator, "touchstart", this), h.addEvent(t, "touchend", this)), this.options.disablePointer || (h.addEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.addEvent(t, h.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (h.addEvent(this.indicator, "mousedown", this), h.addEvent(t, "mouseup", this))), this.options.fade) {
            this.wrapperStyle[h.style.transform] = this.scroller.translateZ;
            var n = h.style.transitionDuration;
            this.wrapperStyle[n] = h.isBadAndroid ? "0.0001ms" : "0ms";
            var a = this;
            h.isBadAndroid && r(function() {
                "0.0001ms" === a.wrapperStyle[n] && (a.wrapperStyle[n] = "0s")
            }),
            this.wrapperStyle.opacity = "0"
        }
    }
    var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
            t.setTimeout(i, 1e3 / 60)
        },
        h = function() {
            function e(t) {
                return r === !1 ? !1 : "" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1)
            }
            var o = {},
                n = i.createElement("div").style,
                r = function() {
                    for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], s = 0, e = i.length; e > s; s++)
                        if (t = i[s] + "ransform", t in n)
                            return i[s].substr(0, i[s].length - 1);
                    return !1
                }();
            o.getTime = Date.now || function() {
                return (new Date).getTime()
            },
            o.extend = function(t, i) {
                for (var s in i)
                    t[s] = i[s]
            },
            o.addEvent = function(t, i, s, e) {
                t.addEventListener(i, s, !!e)
            },
            o.removeEvent = function(t, i, s, e) {
                t.removeEventListener(i, s, !!e)
            },
            o.prefixPointerEvent = function(i) {
                return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
            },
            o.momentum = function(t, i, e, o, n, r) {
                var h,
                    a,
                    l = t - i,
                    c = s.abs(l) / e;
                return r = void 0 === r ? 6e-4 : r, h = t + c * c / (2 * r) * (0 > l ? -1 : 1), a = c / r, o > h ? (h = n ? o - n / 2.5 * (c / 8) : o, l = s.abs(h - t), a = l / c) : h > 0 && (h = n ? n / 2.5 * (c / 8) : 0, l = s.abs(t) + h, a = l / c), {
                    destination: s.round(h),
                    duration: a
                }
            };
            var h = e("transform");
            return o.extend(o, {
                hasTransform: h !== !1,
                hasPerspective: e("perspective") in n,
                hasTouch: "ontouchstart" in t,
                hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                hasTransition: e("transition") in n
            }), o.isBadAndroid = function() {
                var i = t.navigator.appVersion;
                if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
                    var s = i.match(/Safari\/(\d+.\d)/);
                    return s && "object" == typeof s && s.length >= 2 ? parseFloat(s[1]) < 535.19 : !0
                }
                return !1
            }(), o.extend(o.style = {}, {
                transform: h,
                transitionTimingFunction: e("transitionTimingFunction"),
                transitionDuration: e("transitionDuration"),
                transitionDelay: e("transitionDelay"),
                transformOrigin: e("transformOrigin")
            }), o.hasClass = function(t, i) {
                var s = new RegExp("(^|\\s)" + i + "(\\s|$)");
                return s.test(t.className)
            }, o.addClass = function(t, i) {
                if (!o.hasClass(t, i)) {
                    var s = t.className.split(" ");
                    s.push(i),
                    t.className = s.join(" ")
                }
            }, o.removeClass = function(t, i) {
                if (o.hasClass(t, i)) {
                    var s = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                    t.className = t.className.replace(s, " ")
                }
            }, o.offset = function(t) {
                for (var i = -t.offsetLeft, s = -t.offsetTop; t = t.offsetParent;)
                    i -= t.offsetLeft,
                    s -= t.offsetTop;
                return {
                    left: i,
                    top: s
                }
            }, o.preventDefaultException = function(t, i) {
                for (var s in i)
                    if (i[s].test(t[s]))
                        return !0;
                return !1
            }, o.extend(o.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }), o.extend(o.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(t) {
                        return t * (2 - t)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(t) {
                        return s.sqrt(1 - --t * t)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(t) {
                        var i = 4;
                        return (t -= 1) * t * ((i + 1) * t + i) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(t) {
                        var i = .22,
                            e = .4;
                        return 0 === t ? 0 : 1 == t ? 1 : e * s.pow(2, -10 * t) * s.sin((t - i / 4) * (2 * s.PI) / i) + 1
                    }
                }
            }), o.tap = function(t, s) {
                var e = i.createEvent("Event");
                e.initEvent(s, !0, !0),
                e.pageX = t.pageX,
                e.pageY = t.pageY,
                t.target.dispatchEvent(e)
            }, o.click = function(t) {
                var s,
                    e = t.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(e.tagName) || (s = i.createEvent("MouseEvents"), s.initMouseEvent("click", !0, !0, t.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), s._constructed = !0, e.dispatchEvent(s))
            }, o
        }();
    e.prototype = {
        version: "5.2.0",
        _init: function() {
            this._initEvents(),
            (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
            this.options.mouseWheel && this._initWheel(),
            this.options.snap && this._initSnap(),
            this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0),
            clearTimeout(this.resizeTimeout),
            this.resizeTimeout = null,
            this._execEvent("destroy")
        },
        _transitionEnd: function(t) {
            t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(t) {
            if (1 != h.eventType[t.type]) {
                var i;
                if (i = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2, 0 !== i)
                    return
            }
            if (this.enabled && (!this.initiated || h.eventType[t.type] === this.initiated)) {
                !this.options.preventDefault || h.isBadAndroid || h.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                var e,
                    o = t.touches ? t.touches[0] : t;
                this.initiated = h.eventType[t.type],
                this.moved = !1,
                this.distX = 0,
                this.distY = 0,
                this.directionX = 0,
                this.directionY = 0,
                this.directionLocked = 0,
                this.startTime = h.getTime(),
                this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, e = this.getComputedPosition(), this._translate(s.round(e.x), s.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")),
                this.startX = this.x,
                this.startY = this.y,
                this.absStartX = this.x,
                this.absStartY = this.y,
                this.pointX = o.pageX,
                this.pointY = o.pageY,
                this._execEvent("beforeScrollStart")
            }
        },
        _move: function(t) {
            if (this.enabled && h.eventType[t.type] === this.initiated) {
                this.options.preventDefault && t.preventDefault();
                var i,
                    e,
                    o,
                    n,
                    r = t.touches ? t.touches[0] : t,
                    a = r.pageX - this.pointX,
                    l = r.pageY - this.pointY,
                    c = h.getTime();
                if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += a, this.distY += l, o = s.abs(this.distX), n = s.abs(this.distY), !(c - this.endTime > 300 && 10 > o && 10 > n)) {
                    if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough)
                            t.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough)
                            return void (this.initiated = !1);
                        l = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough)
                            t.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough)
                            return void (this.initiated = !1);
                        a = 0
                    }
                    a = this.hasHorizontalScroll ? a : 0,
                    l = this.hasVerticalScroll ? l : 0,
                    i = this.x + a,
                    e = this.y + l,
                    (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX),
                    (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + l / 3 : e > 0 ? 0 : this.maxScrollY),
                    this.directionX = a > 0 ? -1 : 0 > a ? 1 : 0,
                    this.directionY = l > 0 ? -1 : 0 > l ? 1 : 0,
                    this.moved || this._execEvent("scrollStart"),
                    this.moved = !0,
                    this._translate(i, e),
                    c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(t) {
            if (this.enabled && h.eventType[t.type] === this.initiated) {
                this.options.preventDefault && !h.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                var i,
                    e,
                    o = (t.changedTouches ? t.changedTouches[0] : t, h.getTime() - this.startTime),
                    n = s.round(this.x),
                    r = s.round(this.y),
                    a = s.abs(n - this.startX),
                    l = s.abs(r - this.startY),
                    c = 0,
                    p = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = h.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(n, r), !this.moved)
                        return this.options.tap && h.tap(t, this.options.tap), this.options.click && h.click(t), void this._execEvent("scrollCancel");
                    if (this._events.flick && 200 > o && 100 > a && 100 > l)
                        return void this._execEvent("flick");
                    if (this.options.momentum && 300 > o && (i = this.hasHorizontalScroll ? h.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                        destination: n,
                        duration: 0
                    }, e = this.hasVerticalScroll ? h.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                        destination: r,
                        duration: 0
                    }, n = i.destination, r = e.destination, c = s.max(i.duration, e.duration), this.isInTransition = 1), this.options.snap) {
                        var d = this._nearestSnap(n, r);
                        this.currentPage = d,
                        c = this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - d.x), 1e3), s.min(s.abs(r - d.y), 1e3)), 300),
                        n = d.x,
                        r = d.y,
                        this.directionX = 0,
                        this.directionY = 0,
                        p = this.options.bounceEasing
                    }
                    return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (p = h.ease.quadratic), void this.scrollTo(n, r, c, p)) : void this._execEvent("scrollEnd")
                }
            }
        },
        _resize: function() {
            var t = this;
            clearTimeout(this.resizeTimeout),
            this.resizeTimeout = setTimeout(function() {
                t.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(t) {
            var i = this.x,
                s = this.y;
            return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? s = 0 : this.y < this.maxScrollY && (s = this.maxScrollY), i == this.x && s == this.y ? !1 : (this.scrollTo(i, s, t, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth,
            this.wrapperHeight = this.wrapper.clientHeight,
            this.scrollerWidth = this.scroller.offsetWidth,
            this.scrollerHeight = this.scroller.offsetHeight,
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
            this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth),
            this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight),
            this.endTime = 0,
            this.directionX = 0,
            this.directionY = 0,
            this.wrapperOffset = h.offset(this.wrapper),
            this._execEvent("refresh"),
            this.resetPosition()
        },
        on: function(t, i) {
            this._events[t] || (this._events[t] = []),
            this._events[t].push(i)
        },
        off: function(t, i) {
            if (this._events[t]) {
                var s = this._events[t].indexOf(i);
                s > -1 && this._events[t].splice(s, 1)
            }
        },
        _execEvent: function(t) {
            if (this._events[t]) {
                var i = 0,
                    s = this._events[t].length;
                if (s)
                    for (; s > i; i++)
                        this._events[t][i].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(t, i, s, e) {
            t = this.x + t,
            i = this.y + i,
            s = s || 0,
            this.scrollTo(t, i, s, e)
        },
        scrollTo: function(t, i, s, e) {
            e = e || h.ease.circular,
            this.isInTransition = this.options.useTransition && s > 0;
            var o = this.options.useTransition && e.style;
            !s || o ? (o && (this._transitionTimingFunction(e.style), this._transitionTime(s)), this._translate(t, i)) : this._animate(t, i, s, e.fn)
        },
        scrollToElement: function(t, i, e, o, n) {
            if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                var r = h.offset(t);
                r.left -= this.wrapperOffset.left,
                r.top -= this.wrapperOffset.top,
                e === !0 && (e = s.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                o === !0 && (o = s.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                r.left -= e || 0,
                r.top -= o || 0,
                r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left,
                r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top,
                i = void 0 === i || null === i || "auto" === i ? s.max(s.abs(this.x - r.left), s.abs(this.y - r.top)) : i,
                this.scrollTo(r.left, r.top, i, n)
            }
        },
        _transitionTime: function(t) {
            t = t || 0;
            var i = h.style.transitionDuration;
            if (this.scrollerStyle[i] = t + "ms", !t && h.isBadAndroid) {
                this.scrollerStyle[i] = "0.0001ms";
                var s = this;
                r(function() {
                    "0.0001ms" === s.scrollerStyle[i] && (s.scrollerStyle[i] = "0s")
                })
            }
            if (this.indicators)
                for (var e = this.indicators.length; e--;)
                    this.indicators[e].transitionTime(t)
        },
        _transitionTimingFunction: function(t) {
            if (this.scrollerStyle[h.style.transitionTimingFunction] = t, this.indicators)
                for (var i = this.indicators.length; i--;)
                    this.indicators[i].transitionTimingFunction(t)
        },
        _translate: function(t, i) {
            if (this.options.useTransform ? this.scrollerStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = s.round(t), i = s.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                for (var e = this.indicators.length; e--;)
                    this.indicators[e].updatePosition()
        },
        _initEvents: function(i) {
            var s = i ? h.removeEvent : h.addEvent,
                e = this.options.bindToWrapper ? this.wrapper : t;
            s(t, "orientationchange", this),
            s(t, "resize", this),
            this.options.click && s(this.wrapper, "click", this, !0),
            this.options.disableMouse || (s(this.wrapper, "mousedown", this), s(e, "mousemove", this), s(e, "mousecancel", this), s(e, "mouseup", this)),
            h.hasPointer && !this.options.disablePointer && (s(this.wrapper, h.prefixPointerEvent("pointerdown"), this), s(e, h.prefixPointerEvent("pointermove"), this), s(e, h.prefixPointerEvent("pointercancel"), this), s(e, h.prefixPointerEvent("pointerup"), this)),
            h.hasTouch && !this.options.disableTouch && (s(this.wrapper, "touchstart", this), s(e, "touchmove", this), s(e, "touchcancel", this), s(e, "touchend", this)),
            s(this.scroller, "transitionend", this),
            s(this.scroller, "webkitTransitionEnd", this),
            s(this.scroller, "oTransitionEnd", this),
            s(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var i,
                s,
                e = t.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (e = e[h.style.transform].split(")")[0].split(", "), i = +(e[12] || e[4]), s = +(e[13] || e[5])) : (i = +e.left.replace(/[^-\d.]/g, ""), s = +e.top.replace(/[^-\d.]/g, "")), {
                x: i,
                y: s
            }
        },
        _initIndicators: function() {
            function t(t) {
                if (h.indicators)
                    for (var i = h.indicators.length; i--;)
                        t.call(h.indicators[i])
            }
            var i,
                s = this.options.interactiveScrollbars,
                e = "string" != typeof this.options.scrollbars,
                r = [],
                h = this;
            this.indicators = [],
            this.options.scrollbars && (this.options.scrollY && (i = {
                el: o("v", s, this.options.scrollbars),
                interactive: s,
                defaultScrollbars: !0,
                customStyle: e,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                el: o("h", s, this.options.scrollbars),
                interactive: s,
                defaultScrollbars: !0,
                customStyle: e,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            }, this.wrapper.appendChild(i.el), r.push(i))),
            this.options.indicators && (r = r.concat(this.options.indicators));
            for (var a = r.length; a--;)
                this.indicators.push(new n(this, r[a]));
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                t(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                t(function() {
                    this.fade(1, !0)
                })
            })),
            this.on("refresh", function() {
                t(function() {
                    this.refresh()
                })
            }),
            this.on("destroy", function() {
                t(function() {
                    this.destroy()
                }),
                delete this.indicators
            })
        },
        _initWheel: function() {
            h.addEvent(this.wrapper, "wheel", this),
            h.addEvent(this.wrapper, "mousewheel", this),
            h.addEvent(this.wrapper, "DOMMouseScroll", this),
            this.on("destroy", function() {
                clearTimeout(this.wheelTimeout),
                this.wheelTimeout = null,
                h.removeEvent(this.wrapper, "wheel", this),
                h.removeEvent(this.wrapper, "mousewheel", this),
                h.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(t) {
            if (this.enabled) {
                t.preventDefault();
                var i,
                    e,
                    o,
                    n,
                    r = this;
                if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    r.options.snap || r._execEvent("scrollEnd"),
                    r.wheelTimeout = void 0
                }, 400), "deltaX" in t)
                    1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, e = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, e = -t.deltaY);
                else if ("wheelDeltaX" in t)
                    i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                    e = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in t)
                    i = e = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in t))
                        return;
                    i = e = -t.detail / 3 * this.options.mouseWheelSpeed
                }
                if (i *= this.options.invertWheelDirection, e *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = e, e = 0), this.options.snap)
                    return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : 0 > i && o++, e > 0 ? n-- : 0 > e && n++, void this.goToPage(o, n);
                o = this.x + s.round(this.hasHorizontalScroll ? i : 0),
                n = this.y + s.round(this.hasVerticalScroll ? e : 0),
                this.directionX = i > 0 ? -1 : 0 > i ? 1 : 0,
                this.directionY = e > 0 ? -1 : 0 > e ? 1 : 0,
                o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX),
                n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY),
                this.scrollTo(o, n, 0)
            }
        },
        _initSnap: function() {
            this.currentPage = {},
            "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
            this.on("refresh", function() {
                var t,
                    i,
                    e,
                    o,
                    n,
                    r,
                    h = 0,
                    a = 0,
                    l = 0,
                    c = this.options.snapStepX || this.wrapperWidth,
                    p = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0)
                        for (e = s.round(c / 2), o = s.round(p / 2); l > -this.scrollerWidth;) {
                            for (this.pages[h] = [], t = 0, n = 0; n > -this.scrollerHeight;)
                                this.pages[h][t] = {
                                    x: s.max(l, this.maxScrollX),
                                    y: s.max(n, this.maxScrollY),
                                    width: c,
                                    height: p,
                                    cx: l - e,
                                    cy: n - o
                                },
                                n -= p,
                                t++;
                            l -= c,
                            h++
                        }
                    else
                        for (r = this.options.snap, t = r.length, i = -1; t > h; h++)
                            (0 === h || r[h].offsetLeft <= r[h - 1].offsetLeft) && (a = 0, i++),
                            this.pages[a] || (this.pages[a] = []),
                            l = s.max(-r[h].offsetLeft, this.maxScrollX),
                            n = s.max(-r[h].offsetTop, this.maxScrollY),
                            e = l - s.round(r[h].offsetWidth / 2),
                            o = n - s.round(r[h].offsetHeight / 2),
                            this.pages[a][i] = {
                                x: l,
                                y: n,
                                width: r[h].offsetWidth,
                                height: r[h].offsetHeight,
                                cx: e,
                                cy: o
                            },
                            l > this.maxScrollX && a++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                    this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }),
            this.on("flick", function() {
                var t = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.x - this.startX), 1e3), s.min(s.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
            })
        },
        _nearestSnap: function(t, i) {
            if (!this.pages.length)
                return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
            var e = 0,
                o = this.pages.length,
                n = 0;
            if (s.abs(t - this.absStartX) < this.snapThresholdX && s.abs(i - this.absStartY) < this.snapThresholdY)
                return this.currentPage;
            for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); o > e; e++)
                if (t >= this.pages[e][0].cx) {
                    t = this.pages[e][0].x;
                    break
                }
            for (o = this.pages[e].length; o > n; n++)
                if (i >= this.pages[0][n].cy) {
                    i = this.pages[0][n].y;
                    break
                }
            return e == this.currentPage.pageX && (e += this.directionX, 0 > e ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), n == this.currentPage.pageY && (n += this.directionY, 0 > n ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                x: t,
                y: i,
                pageX: e,
                pageY: n
            }
        },
        goToPage: function(t, i, e, o) {
            o = o || this.options.bounceEasing,
            t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0),
            i >= this.pages[t].length ? i = this.pages[t].length - 1 : 0 > i && (i = 0);
            var n = this.pages[t][i].x,
                r = this.pages[t][i].y;
            e = void 0 === e ? this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - this.x), 1e3), s.min(s.abs(r - this.y), 1e3)), 300) : e,
            this.currentPage = {
                x: n,
                y: r,
                pageX: t,
                pageY: i
            },
            this.scrollTo(n, r, e, o)
        },
        next: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            s++,
            s >= this.pages.length && this.hasVerticalScroll && (s = 0, e++),
            this.goToPage(s, e, t, i)
        },
        prev: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            s--,
            0 > s && this.hasVerticalScroll && (s = 0, e--),
            this.goToPage(s, e, t, i)
        },
        _initKeys: function(i) {
            var s,
                e = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
            if ("object" == typeof this.options.keyBindings)
                for (s in this.options.keyBindings)
                    "string" == typeof this.options.keyBindings[s] && (this.options.keyBindings[s] = this.options.keyBindings[s].toUpperCase().charCodeAt(0));
            else
                this.options.keyBindings = {};
            for (s in e)
                this.options.keyBindings[s] = this.options.keyBindings[s] || e[s];
            h.addEvent(t, "keydown", this),
            this.on("destroy", function() {
                h.removeEvent(t, "keydown", this)
            })
        },
        _key: function(t) {
            if (this.enabled) {
                var i,
                    e = this.options.snap,
                    o = e ? this.currentPage.pageX : this.x,
                    n = e ? this.currentPage.pageY : this.y,
                    r = h.getTime(),
                    a = this.keyTime || 0,
                    l = .25;
                switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this.isInTransition = !1), this.keyAcceleration = 200 > r - a ? s.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
                case this.options.keyBindings.pageUp:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? o += e ? 1 : this.wrapperWidth : n += e ? 1 : this.wrapperHeight;
                    break;
                case this.options.keyBindings.pageDown:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= e ? 1 : this.wrapperWidth : n -= e ? 1 : this.wrapperHeight;
                    break;
                case this.options.keyBindings.end:
                    o = e ? this.pages.length - 1 : this.maxScrollX,
                    n = e ? this.pages[0].length - 1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    o = 0,
                    n = 0;
                    break;
                case this.options.keyBindings.left:
                    o += e ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.up:
                    n += e ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.right:
                    o -= e ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.down:
                    n -= e ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                default:
                    return
                }
                if (e)
                    return void this.goToPage(o, n);
                o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0),
                n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0),
                this.scrollTo(o, n, 0),
                this.keyTime = r
            }
        },
        _animate: function(t, i, s, e) {
            function o() {
                var d,
                    u,
                    m,
                    f = h.getTime();
                return f >= p ? (n.isAnimating = !1, n._translate(t, i), void (n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (f = (f - c) / s, m = e(f), d = (t - a) * m + a, u = (i - l) * m + l, n._translate(d, u), void (n.isAnimating && r(o)))
            }
            var n = this,
                a = this.x,
                l = this.y,
                c = h.getTime(),
                p = c + s;
            this.isAnimating = !0,
            o()
        },
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "pointerdown":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "pointermove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "pointerup":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "pointercancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t);
                break;
            case "orientationchange":
            case "resize":
                this._resize();
                break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(t);
                break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._wheel(t);
                break;
            case "keydown":
                this._key(t);
                break;
            case "click":
                this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
            }
        }
    },
    n.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "pointerdown":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "pointermove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "pointerup":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "pointercancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t)
            }
        },
        destroy: function() {
            this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null),
            this.options.interactive && (h.removeEvent(this.indicator, "touchstart", this), h.removeEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.removeEvent(this.indicator, "mousedown", this), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), h.removeEvent(t, "touchend", this), h.removeEvent(t, h.prefixPointerEvent("pointerup"), this), h.removeEvent(t, "mouseup", this)),
            this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(i) {
            var s = i.touches ? i.touches[0] : i;
            i.preventDefault(),
            i.stopPropagation(),
            this.transitionTime(),
            this.initiated = !0,
            this.moved = !1,
            this.lastPointX = s.pageX,
            this.lastPointY = s.pageY,
            this.startTime = h.getTime(),
            this.options.disableTouch || h.addEvent(t, "touchmove", this),
            this.options.disablePointer || h.addEvent(t, h.prefixPointerEvent("pointermove"), this),
            this.options.disableMouse || h.addEvent(t, "mousemove", this),
            this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(t) {
            var i,
                s,
                e,
                o,
                n = t.touches ? t.touches[0] : t;
            h.getTime();
            this.moved || this.scroller._execEvent("scrollStart"),
            this.moved = !0,
            i = n.pageX - this.lastPointX,
            this.lastPointX = n.pageX,
            s = n.pageY - this.lastPointY,
            this.lastPointY = n.pageY,
            e = this.x + i,
            o = this.y + s,
            this._pos(e, o),
            t.preventDefault(),
            t.stopPropagation()
        },
        _end: function(i) {
            if (this.initiated) {
                if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                    var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        o = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.scroller.x - e.x), 1e3), s.min(s.abs(this.scroller.y - e.y), 1e3)), 300);
                    this.scroller.x == e.x && this.scroller.y == e.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, o, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(t) {
            t = t || 0;
            var i = h.style.transitionDuration;
            if (this.indicatorStyle[i] = t + "ms", !t && h.isBadAndroid) {
                this.indicatorStyle[i] = "0.0001ms";
                var s = this;
                r(function() {
                    "0.0001ms" === s.indicatorStyle[i] && (s.indicatorStyle[i] = "0s")
                })
            }
        },
        transitionTimingFunction: function(t) {
            this.indicatorStyle[h.style.transitionTimingFunction] = t
        },
        refresh: function() {
            this.transitionTime(),
            this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
            this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (h.addClass(this.wrapper, "iScrollBothScrollbars"), h.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (h.removeClass(this.wrapper, "iScrollBothScrollbars"), h.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = s.max(s.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
            this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = s.max(s.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
            this.updatePosition()
        },
        updatePosition: function() {
            var t = this.options.listenX && s.round(this.sizeRatioX * this.scroller.x) || 0,
                i = this.options.listenY && s.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = s.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = s.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = s.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = s.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")),
            this.x = t,
            this.y = i,
            this.scroller.options.useTransform ? this.indicatorStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
        },
        _pos: function(t, i) {
            0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX),
            0 > i ? i = 0 : i > this.maxPosY && (i = this.maxPosY),
            t = this.options.listenX ? s.round(t / this.sizeRatioX) : this.scroller.x,
            i = this.options.listenY ? s.round(i / this.sizeRatioY) : this.scroller.y,
            this.scroller.scrollTo(t, i)
        },
        fade: function(t, i) {
            if (!i || this.visible) {
                clearTimeout(this.fadeTimeout),
                this.fadeTimeout = null;
                var s = t ? 250 : 500,
                    e = t ? 0 : 300;
                t = t ? "1" : "0",
                this.wrapperStyle[h.style.transitionDuration] = s + "ms",
                this.fadeTimeout = setTimeout(function(t) {
                    this.wrapperStyle.opacity = t,
                    this.visible = +t
                }.bind(this, t), e)
            }
        }
    },
    e.utils = h,
    "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
        return e
    }) : t.iScroll = e
}(window, document, Math);

(function(g) {
    var f = g.document;
    if (!location.hash && g.addEventListener) {
        window.scrollTo(0, 1);
        var k = 1,
            j = function() {
                return g.pageYOffset || f.compatMode === "CSS1Compat" && f.documentElement.scrollTop || f.body.scrollTop || 0
            },
            h = setInterval(function() {
                if (f.body) {
                    clearInterval(h);
                    k = j();
                    g.scrollTo(0, k === 1 ? 0 : 1)
                }
            }, 15);
        g.addEventListener("load", function() {
            setTimeout(function() {
                if (j() < 20) {
                    g.scrollTo(0, k === 1 ? 0 : 1)
                }
            }, 0)
        })
    }
})(this);
(function(c) {
    function b(g, f, k, h) {
        if ("addEventListener" in g) {
            try {
                g.addEventListener(f, k, h)
            } catch (j) {
                if ("object" == typeof k && k.handleEvent) {
                    g.addEventListener(f, function(d) {
                        k.handleEvent.call(k, d)
                    }, h)
                } else {
                    throw j
                }
            }
        } else {
            "attachEvent" in g && ("object" == typeof k && k.handleEvent ? g.attachEvent("on" + f, function() {
                k.handleEvent.call(k)
            }) : g.attachEvent("on" + f, k))
        }
    }
    function a(g, f, k, h) {
        if ("removeEventListener" in g) {
            try {
                g.removeEventListener(f, k, h)
            } catch (j) {
                if ("object" == typeof k && k.handleEvent) {
                    g.removeEventListener(f, function(d) {
                        k.handleEvent.call(k, d)
                    }, h)
                } else {
                    throw j
                }
            }
        } else {
            "detachEvent" in g && ("object" == typeof k && k.handleEvent ? g.detachEvent("on" + f, function() {
                k.handleEvent.call(k)
            }) : g.detachEvent("on" + f, k))
        }
    }
    window.MBP = window.MBP || {};
    MBP.iOSversion = function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var d = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/) || "0000";
            return [parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3] || 0, 10)]
        }
        return [0, 0, 0]
    };
    MBP.viewportmeta = c.querySelector && c.querySelector('meta[name="viewport"]');
    MBP.ua = navigator.userAgent;
    MBP.scaleFix = function() {
        MBP.viewportmeta && /iPhone|iPad|iPod/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua) && 7 > MBP.iOSversion()[0] && (MBP.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0", c.addEventListener("gesturestart", MBP.gestureStart, !1))
    };
    MBP.gestureStart = function() {
        MBP.viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
    };
    MBP.BODY_SCROLL_TOP = !1;
    MBP.getScrollTop = function() {
        return window.pageYOffset || "CSS1Compat" === c.compatMode && c.documentElement.scrollTop || c.body.scrollTop || 0
    };
    MBP.hideUrlBar = function() {
        var d = window;
        location.hash || !1 === MBP.BODY_SCROLL_TOP || d.scrollTo(0, 1 === MBP.BODY_SCROLL_TOP ? 0 : 1)
    };
    MBP.hideUrlBarOnLoad = function() {
        var e = window,
            d = e.document,
            f;
        !location.hash && e.addEventListener && (window.scrollTo(0, 1), MBP.BODY_SCROLL_TOP = 1, f = setInterval(function() {
            d.body && (clearInterval(f), MBP.BODY_SCROLL_TOP = MBP.getScrollTop(), MBP.hideUrlBar())
        }, 15), e.addEventListener("load", function() {
            setTimeout(function() {
                20 > MBP.getScrollTop() && MBP.hideUrlBar()
            }, 0)
        }))
    };
    MBP.fastButton = function(f, e, h) {
        this.handler = e;
        this.pressedClass = "undefined" === typeof h ? "pressed" : h;
        if (f.length && 1 < f.length) {
            for (var g in f) {
                this.addClickEvent(f[g])
            }
        } else {
            this.addClickEvent(f)
        }
    };
    MBP.fastButton.prototype.handleEvent = function(d) {
        d = d || window.event;
        switch (d.type) {
        case "touchstart":
            this.onTouchStart(d);
            break;
        case "touchmove":
            this.onTouchMove(d);
            break;
        case "touchend":
            this.onClick(d);
            break;
        case "click":
            this.onClick(d)
        }
    };
    MBP.fastButton.prototype.onTouchStart = function(e) {
        var d = e.target || e.srcElement;
        e.stopPropagation();
        d.addEventListener("touchend", this, !1);
        c.body.addEventListener("touchmove", this, !1);
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        d.className += " " + this.pressedClass
    };
    MBP.fastButton.prototype.onTouchMove = function(d) {
        (10 < Math.abs(d.touches[0].clientX - this.startX) || 10 < Math.abs(d.touches[0].clientY - this.startY)) && this.reset(d)
    };
    MBP.fastButton.prototype.onClick = function(e) {
        e = e || window.event;
        var d = e.target || e.srcElement;
        e.stopPropagation && e.stopPropagation();
        this.reset(e);
        this.handler.apply(e.currentTarget, [e]);
        "touchend" == e.type && MBP.preventGhostClick(this.startX, this.startY);
        d.className = d.className.replace(new RegExp(" ?" + this.pressedClass, "gi"), "")
    };
    MBP.fastButton.prototype.reset = function(d) {
        d = d.target || d.srcElement;
        a(d, "touchend", this, !1);
        a(c.body, "touchmove", this, !1);
        d.className = d.className.replace(new RegExp(" ?" + this.pressedClass, "gi"), "")
    };
    MBP.fastButton.prototype.addClickEvent = function(d) {
        b(d, "touchstart", this, !1);
        b(d, "click", this, !1)
    };
    MBP.preventGhostClick = function(e, d) {
        MBP.coords.push(e, d);
        window.setTimeout(function() {
            MBP.coords.splice(0, 2)
        }, 2500)
    };
    MBP.ghostClickHandler = function(f) {
        if (!MBP.hadTouchEvent && MBP.dodgyAndroid) {
            f.stopPropagation(),
            f.preventDefault()
        } else {
            for (var e = 0, h = MBP.coords.length; e < h; e += 2) {
                var g = MBP.coords[e + 1];
                25 > Math.abs(f.clientX - MBP.coords[e]) && 25 > Math.abs(f.clientY - g) && (f.stopPropagation(), f.preventDefault())
            }
        }
    };
    MBP.dodgyAndroid = "ontouchstart" in window && -1 != navigator.userAgent.indexOf("Android 2.3");
    c.addEventListener && c.addEventListener("click", MBP.ghostClickHandler, !0);
    b(c.documentElement, "touchstart", function() {
        MBP.hadTouchEvent = !0
    }, !1);
    MBP.coords = [];
    MBP.autogrow = function(g, e) {
        function k(d) {
            d = this.scrollHeight;
            d > this.clientHeight && (this.style.height = d + 3 * h + "px")
        }
        var j = e ? e : 12,
            h = g.currentStyle ? g.currentStyle.lineHeight : getComputedStyle(g, null).lineHeight,
            h = -1 == h.indexOf("px") ? j : parseInt(h, 10);
        g.style.overflow = "hidden";
        g.addEventListener ? g.addEventListener("input", k, !1) : g.attachEvent("onpropertychange", k)
    };
    MBP.enableActive = function() {
        c.addEventListener("touchstart", function() {}, !1)
    };
    MBP.preventScrolling = function() {
        c.addEventListener("touchmove", function(d) {
            "range" !== d.target.type && d.preventDefault()
        }, !1)
    };
    MBP.preventZoom = function() {
        for (var e = c.querySelectorAll("input, select, textarea"), d = 0, d = 0; d < e.length; d++) {
            e[d].onfocus = function() {
                MBP.viewportmeta.content = "width=device-width,initial-scale=1,maximum-scale=1"
            },
            e[d].onblur = function() {
                MBP.viewportmeta.content = "width=device-width,initial-scale=1,maximum-scale=10"
            }
        }
    };
    MBP.startupImage = function() {
        var f,
            d,
            h,
            g;
        d = window.devicePixelRatio;
        h = c.getElementsByTagName("head")[0];
        "iPad" === navigator.platform ? (f = 2 === d ? "img/startup/startup-tablet-portrait-retina.png" : "img/startup/startup-tablet-portrait.png", d = 2 === d ? "img/startup/startup-tablet-landscape-retina.png" : "img/startup/startup-tablet-landscape.png", g = c.createElement("link"), g.setAttribute("rel", "apple-touch-startup-image"), g.setAttribute("media", "screen and (orientation: portrait)"), g.setAttribute("href", f), h.appendChild(g), f = c.createElement("link"), f.setAttribute("rel", "apple-touch-startup-image"), f.setAttribute("media", "screen and (orientation: landscape)"), f.setAttribute("href", d), h.appendChild(f)) : (f = 568 === screen.height ? "img/startup/startup-retina-4in.png" : 2 === d ? "img/startup/startup-retina.png" : "img/startup/startup.png", g = c.createElement("link"), g.setAttribute("rel", "apple-touch-startup-image"), g.setAttribute("href", f), h.appendChild(g));
        568 === screen.height && MBP.viewportmeta && (MBP.viewportmeta.content = MBP.viewportmeta.content.replace(/\bwidth\s*=\s*320\b/, "width=320.1").replace(/\bwidth\s*=\s*device-width\b/, ""))
    }
})(document);
$.fn.synchHeights = function() {
    var g = this;
    var e = h(g);
    f(g, e);
    function h(a) {
        var b = 0,
            c;
        a.each(function() {
            c = $(this);
            if (c.height() > b) {
                b = c.height()
            }
        });
        return b
    }
    function f(a, b) {
        if ($.browser && $.browser.msie && $.browser.version == 6) {
            a.css({
                height: b
            })
        }
        a.css({
            "min-height": b
        })
    }
    return this
};
jQuery.fn.tabs = function() {
    return $(this).each(function() {
        var p = $(this);
        var v = $("ul.nav-links", p);
        var r = $("div.tabs-content", p);
        var w = "tab-";
        var q = "-enhanced";
        var n = 0,
            l;
        var t = v.find("li");
        var m = v.find("li").length;
        switch (m) {
        case 2:
            t.css({
                "max-width": "49%"
            });
            break;
        case 3:
            t.css({
                "max-width": "32%"
            });
            break;
        case 4:
            t.css({
                "max-width": "24%"
            });
            break;
        case 5:
            t.css({
                "max-width": "19%"
            });
            break
        }
        var u = v.find("li a");
        u.each(function() {
            l = $(this);
            if (l.height() > n) {
                n = l.height()
            }
        });
        $("> div", r).each(function() {
            $(this).addClass("tabs-panel").attr("role", "tabpanel").attr("aria-labelledby", w + $(this).attr("id")).attr("id", $(this).attr("id") + q)
        });
        $("li", v).each(function() {
            var b = $(this).find("a").attr("href").split("#")[1];
            $(this).attr("role", "tab").attr("id", w + b).parent().attr("role", "tablist");
            var a = $(this).find("a");
            if (a.height() > n) {
                n = a.height()
            }
            a.css({
                height: n
            })
        });
        function o(a) {
            v.find("li.tabs-selected").removeClass("tabs-selected").find("a").attr("tabindex", -1);
            $(a).attr("tabindex", 0).parent("li").addClass("tabs-selected");
            r.find("> div.tabs-panel-selected").removeClass("tabs-panel-selected").attr("aria-hidden", true);
            $thisID = $(a).attr("href") + q;
            r.find($thisID).addClass("tabs-panel-selected").attr("aria-hidden", false)
        }
        v.find("a").click(function() {
            o($(this));
            $(this).focus();
            return false
        }).keydown(function(a) {
            var c = $(this).parent();
            var b = true;
            switch (a.keyCode) {
            case 37:
            case 38:
                if (c.prev().size() > 0) {
                    o(c.prev().find("a"));
                    c.prev().find("a").eq(0).focus();
                    b = false
                }
                break;
            case 39:
            case 40:
                if (c.next().size() > 0) {
                    o(c.next().find("a"));
                    c.next().find("a").eq(0).focus();
                    b = false
                }
                break;
            case 35:
                o(v.find("a:last"));
                v.find("li:last a").eq(0).focus();
                b = false;
                break;
            case 36:
                o(v.find("a:first"));
                v.find("li:first a").eq(0).focus();
                b = false;
                break
            }
            return b
        });
        if (v.find("a.js-open").length) {
            o(v.find("a.js-open"))
        } else {
            o(v.find("a:first"))
        }
    })
};
var starRating = {
    create: function(b) {
        if ($.browser && $.browser.msie && parseInt($.browser.version, 10) <= 7) {
            return
        }
        $(b).each(function() {
            var a = $("<div></div>");
            $(this).find("input:radio").each(function(g) {
                var f = $(this).parent().text();
                var h = $('<a href="#"></a>').attr("title", f).text(f);
                starRating.addHandlers(h);
                a.append(h);
                if ($(this).is(":checked")) {
                    h.prevAll().andSelf().addClass("rating")
                }
            });
            $(this).append(a).find("label").hide()
        })
    },
    addHandlers: function(b) {
        $(b).click(function(e) {
            var f = $(this);
            var a = $(this).parent();
            a.parent().find("input:radio[value=" + f.text() + "]").attr("checked", true);
            a.children().removeClass("rating");
            f.prevAll().andSelf().addClass("rating");
            e.preventDefault()
        }).hover(function() {
            $(this).prevAll().andSelf().addClass("rating-over")
        }, function() {
            $(this).siblings().andSelf().removeClass("rating-over")
        })
    }
};
(function(b) {
    b.flexslider = function(f, a) {
        var e = f;
        e.init = function() {
            e.vars = b.extend({}, b.flexslider.defaults, a);
            e.data("flexslider", true);
            e.container = b(".slides", e);
            e.slides = b(".slides > li", e);
            e.count = e.slides.length;
            e.animating = false;
            e.currentSlide = e.vars.slideToStart;
            e.animatingTo = e.currentSlide;
            e.atEnd = (e.currentSlide == 0) ? true : false;
            e.eventType = ("ontouchstart" in document.documentElement) ? "touchstart" : "click";
            e.cloneCount = 0;
            e.cloneOffset = 0;
            e.manualPause = false;
            e.vertical = (e.vars.slideDirection == "vertical");
            e.prop = (e.vertical) ? "top" : "marginLeft";
            e.args = {};
            e.transitions = "webkitTransition" in document.body.style;
            if (e.transitions) {
                e.prop = "-webkit-transform"
            }
            if (e.vars.controlsContainer != "") {
                e.controlsContainer = b(e.vars.controlsContainer).eq(b(".slides").index(e.container));
                e.containerExists = e.controlsContainer.length > 0
            }
            if (e.vars.manualControls != "") {
                e.manualControls = b(e.vars.manualControls, ((e.containerExists) ? e.controlsContainer : e));
                e.manualExists = e.manualControls.length > 0
            }
            if (e.vars.randomize) {
                e.slides.sort(function() {
                    return ( Math.round(Math.random()) - 0.5)
                });
                e.container.empty().append(e.slides)
            }
            if (e.vars.animation.toLowerCase() == "slide") {
                if (e.transitions) {
                    e.setTransition(0)
                }
                e.css({
                    overflow: "hidden"
                });
                if (e.vars.animationLoop) {
                    e.cloneCount = 2;
                    e.cloneOffset = 1;
                    e.container.append(e.slides.filter(":first").clone().addClass("clone")).prepend(e.slides.filter(":last").clone().addClass("clone"))
                }
                e.newSlides = b(".slides > li", e);
                var G = (-1 * (e.currentSlide + e.cloneOffset));
                if (e.vertical) {
                    e.newSlides.css({
                        display: "block",
                        width: "100%",
                        "float": "left"
                    });
                    e.container.height((e.count + e.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        e.css({
                            position: "relative"
                        }).height(e.slides.filter(":first").height());
                        e.args[e.prop] = (e.transitions) ? "translate3d(0," + G * e.height() + "px,0)" : G * e.height() + "px";
                        e.container.css(e.args)
                    }, 100)
                } else {
                    e.args[e.prop] = (e.transitions) ? "translate3d(" + G * e.width() + "px,0,0)" : G * e.width() + "px";
                    e.container.width((e.count + e.cloneCount) * 200 + "%").css(e.args);
                    setTimeout(function() {
                        e.newSlides.width(e.width()).css({
                            "float": "left",
                            display: "block"
                        })
                    }, 100)
                }
            } else {
                e.transitions = false;
                e.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%"
                }).eq(e.currentSlide).fadeIn(e.vars.animationDuration)
            }
            if (e.vars.controlNav) {
                if (e.manualExists) {
                    e.controlNav = e.manualControls
                } else {
                    var M = b('<ol class="flex-control-nav"></ol>');
                    var A = 1;
                    for (var z = 0; z < e.count; z++) {
                        M.append("<li><a>" + A + "</a></li>");
                        A++
                    }
                    if (e.containerExists) {
                        b(e.controlsContainer).append(M);
                        e.controlNav = b(".flex-control-nav li a", e.controlsContainer)
                    } else {
                        e.append(M);
                        e.controlNav = b(".flex-control-nav li a", e)
                    }
                }
                e.controlNav.eq(e.currentSlide).addClass("active");
                e.controlNav.bind(e.eventType, function(g) {
                    g.preventDefault();
                    if (!b(this).hasClass("active")) {
                        (e.controlNav.index(b(this)) > e.currentSlide) ? e.direction = "next" : e.direction = "prev";
                        e.flexAnimate(e.controlNav.index(b(this)), e.vars.pauseOnAction)
                    }
                })
            }
            if (e.vars.directionNav) {
                var j = b('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + e.vars.prevText + '</a></li><li><a class="next" href="#">' + e.vars.nextText + "</a></li></ul>");
                if (e.containerExists) {
                    b(e.controlsContainer).append(j);
                    e.directionNav = b(".flex-direction-nav li a", e.controlsContainer)
                } else {
                    e.append(j);
                    e.directionNav = b(".flex-direction-nav li a", e)
                }
                if (!e.vars.animationLoop) {
                    if (e.currentSlide == 0) {
                        e.directionNav.filter(".prev").addClass("disabled")
                    } else {
                        if (e.currentSlide == e.count - 1) {
                            e.directionNav.filter(".next").addClass("disabled")
                        }
                    }
                }
                e.directionNav.bind(e.eventType, function(h) {
                    h.preventDefault();
                    var g = (b(this).hasClass("next")) ? e.getTarget("next") : e.getTarget("prev");
                    if (e.canAdvance(g)) {
                        e.flexAnimate(g, e.vars.pauseOnAction)
                    }
                })
            }
            if (e.vars.keyboardNav && b("ul.slides").length == 1) {
                function J(h) {
                    if (e.animating) {
                        return
                    } else {
                        if (h.keyCode != 39 && h.keyCode != 37) {
                            return
                        } else {
                            if (h.keyCode == 39) {
                                var g = e.getTarget("next")
                            } else {
                                if (h.keyCode == 37) {
                                    var g = e.getTarget("prev")
                                }
                            }
                            if (e.canAdvance(g)) {
                                e.flexAnimate(g, e.vars.pauseOnAction)
                            }
                        }
                    }
                }
                b(document).bind("keyup", J)
            }
            if (e.vars.mousewheel) {
                e.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
                e.bind(e.mousewheelEvent, function(k) {
                    k.preventDefault();
                    k = k ? k : window.event;
                    var h = k.detail ? k.detail * -1 : k.wheelDelta / 40,
                        g = (h < 0) ? e.getTarget("next") : e.getTarget("prev");
                    if (e.canAdvance(g)) {
                        e.flexAnimate(g, e.vars.pauseOnAction)
                    }
                })
            }
            if (e.vars.slideshow) {
                if (e.vars.pauseOnHover && e.vars.slideshow) {
                    e.hover(function() {
                        e.pause()
                    }, function() {
                        if (!e.manualPause) {
                            e.resume()
                        }
                    })
                }
                e.animatedSlides = setInterval(e.animateSlides, e.vars.slideshowSpeed)
            }
            if (e.vars.pausePlay) {
                var C = b('<div class="flex-pauseplay"><span></span></div>');
                if (e.containerExists) {
                    e.controlsContainer.append(C);
                    e.pausePlay = b(".flex-pauseplay span", e.controlsContainer)
                } else {
                    e.append(C);
                    e.pausePlay = b(".flex-pauseplay span", e)
                }
                var F = (e.vars.slideshow) ? "pause" : "play";
                e.pausePlay.addClass(F).text((F == "pause") ? e.vars.pauseText : e.vars.playText);
                e.pausePlay.bind(e.eventType, function(g) {
                    g.preventDefault();
                    if (b(this).hasClass("pause")) {
                        e.pause();
                        e.manualPause = true
                    } else {
                        e.resume();
                        e.manualPause = false
                    }
                })
            }
            if ("ontouchstart" in document.documentElement) {
                var d,
                    y,
                    H,
                    B,
                    E,
                    c,
                    D = false;
                e.each(function() {
                    if ("ontouchstart" in document.documentElement) {
                        this.addEventListener("touchstart", K, false)
                    }
                });
                function K(g) {
                    if (e.animating) {
                        g.preventDefault()
                    } else {
                        if (g.touches.length == 1) {
                            e.pause();
                            B = (e.vertical) ? e.height() : e.width();
                            c = Number(new Date());
                            H = (e.vertical) ? (e.currentSlide + e.cloneOffset) * e.height() : (e.currentSlide + e.cloneOffset) * e.width();
                            d = (e.vertical) ? g.touches[0].pageY : g.touches[0].pageX;
                            y = (e.vertical) ? g.touches[0].pageX : g.touches[0].pageY;
                            e.setTransition(0);
                            this.addEventListener("touchmove", I, false);
                            this.addEventListener("touchend", L, false)
                        }
                    }
                }
                function I(g) {
                    E = (e.vertical) ? d - g.touches[0].pageY : d - g.touches[0].pageX;
                    D = (e.vertical) ? (Math.abs(E) < Math.abs(g.touches[0].pageX - y)) : (Math.abs(E) < Math.abs(g.touches[0].pageY - y));
                    if (!D) {
                        g.preventDefault();
                        if (e.vars.animation == "slide" && e.transitions) {
                            if (!e.vars.animationLoop) {
                                E = E / ((e.currentSlide == 0 && E < 0 || e.currentSlide == e.count - 1 && E > 0) ? (Math.abs(E) / B + 2) : 1)
                            }
                            e.args[e.prop] = (e.vertical) ? "translate3d(0," + (-H - E) + "px,0)" : "translate3d(" + (-H - E) + "px,0,0)";
                            e.container.css(e.args)
                        }
                    }
                }
                function L(g) {
                    e.animating = false;
                    if (e.animatingTo == e.currentSlide && !D && !(E == null)) {
                        var h = (E > 0) ? e.getTarget("next") : e.getTarget("prev");
                        if (e.canAdvance(h) && Number(new Date()) - c < 550 && Math.abs(E) > 20 || Math.abs(E) > B / 2) {
                            e.flexAnimate(h, e.vars.pauseOnAction)
                        } else {
                            e.flexAnimate(e.currentSlide, e.vars.pauseOnAction)
                        }
                    }
                    this.removeEventListener("touchmove", I, false);
                    this.removeEventListener("touchend", L, false);
                    d = null;
                    y = null;
                    E = null;
                    H = null
                }
            }
            if (e.vars.animation.toLowerCase() == "slide") {
                b(window).resize(function() {
                    if (!e.animating) {
                        if (e.vertical) {
                            e.height(e.slides.filter(":first").height());
                            e.args[e.prop] = (-1 * (e.currentSlide + e.cloneOffset)) * e.slides.filter(":first").height() + "px";
                            if (e.transitions) {
                                e.setTransition(0);
                                e.args[e.prop] = (e.vertical) ? "translate3d(0," + e.args[e.prop] + ",0)" : "translate3d(" + e.args[e.prop] + ",0,0)"
                            }
                            e.container.css(e.args)
                        } else {
                            e.newSlides.width(e.width());
                            e.args[e.prop] = (-1 * (e.currentSlide + e.cloneOffset)) * e.width() + "px";
                            if (e.transitions) {
                                e.setTransition(0);
                                e.args[e.prop] = (e.vertical) ? "translate3d(0," + e.args[e.prop] + ",0)" : "translate3d(" + e.args[e.prop] + ",0,0)"
                            }
                            e.container.css(e.args)
                        }
                    }
                })
            }
            e.vars.start(e)
        };
        e.flexAnimate = function(c, d) {
            if (!e.animating) {
                e.animating = true;
                e.animatingTo = c;
                e.vars.before(e);
                if (d) {
                    e.pause()
                }
                if (e.vars.controlNav) {
                    e.controlNav.removeClass("active").eq(c).addClass("active")
                }
                e.atEnd = (c == 0 || c == e.count - 1) ? true : false;
                if (!e.vars.animationLoop && e.vars.directionNav) {
                    if (c == 0) {
                        e.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")
                    } else {
                        if (c == e.count - 1) {
                            e.directionNav.removeClass("disabled").filter(".next").addClass("disabled")
                        } else {
                            e.directionNav.removeClass("disabled")
                        }
                    }
                }
                if (!e.vars.animationLoop && c == e.count - 1) {
                    e.pause();
                    e.vars.end(e)
                }
                if (e.vars.animation.toLowerCase() == "slide") {
                    var h = (e.vertical) ? e.slides.filter(":first").height() : e.slides.filter(":first").width();
                    if (e.currentSlide == 0 && c == e.count - 1 && e.vars.animationLoop && e.direction != "next") {
                        e.slideString = "0px"
                    } else {
                        if (e.currentSlide == e.count - 1 && c == 0 && e.vars.animationLoop && e.direction != "prev") {
                            e.slideString = (-1 * (e.count + 1)) * h + "px"
                        } else {
                            e.slideString = (-1 * (c + e.cloneOffset)) * h + "px"
                        }
                    }
                    e.args[e.prop] = e.slideString;
                    if (e.transitions) {
                        e.setTransition(e.vars.animationDuration);
                        e.args[e.prop] = (e.vertical) ? "translate3d(0," + e.slideString + ",0)" : "translate3d(" + e.slideString + ",0,0)";
                        e.container.css(e.args).one("webkitTransitionEnd transitionend", function() {
                            e.wrapup(h)
                        })
                    } else {
                        e.container.animate(e.args, e.vars.animationDuration, function() {
                            e.wrapup(h)
                        })
                    }
                } else {
                    e.slides.eq(e.currentSlide).fadeOut(e.vars.animationDuration);
                    e.slides.eq(c).fadeIn(e.vars.animationDuration, function() {
                        e.wrapup()
                    })
                }
            }
        };
        e.wrapup = function(c) {
            if (e.vars.animation == "slide") {
                if (e.currentSlide == 0 && e.animatingTo == e.count - 1 && e.vars.animationLoop) {
                    e.args[e.prop] = (-1 * e.count) * c + "px";
                    if (e.transitions) {
                        e.setTransition(0);
                        e.args[e.prop] = (e.vertical) ? "translate3d(0," + e.args[e.prop] + ",0)" : "translate3d(" + e.args[e.prop] + ",0,0)"
                    }
                    e.container.css(e.args)
                } else {
                    if (e.currentSlide == e.count - 1 && e.animatingTo == 0 && e.vars.animationLoop) {
                        e.args[e.prop] = -1 * c + "px";
                        if (e.transitions) {
                            e.setTransition(0);
                            e.args[e.prop] = (e.vertical) ? "translate3d(0," + e.args[e.prop] + ",0)" : "translate3d(" + e.args[e.prop] + ",0,0)"
                        }
                        e.container.css(e.args)
                    }
                }
            }
            e.animating = false;
            e.currentSlide = e.animatingTo;
            e.vars.after(e)
        };
        e.animateSlides = function() {
            if (!e.animating) {
                e.flexAnimate(e.getTarget("next"))
            }
        };
        e.pause = function() {
            clearInterval(e.animatedSlides);
            if (e.vars.pausePlay) {
                e.pausePlay.removeClass("pause").addClass("play").text(e.vars.playText)
            }
        };
        e.resume = function() {
            e.animatedSlides = setInterval(e.animateSlides, e.vars.slideshowSpeed);
            if (e.vars.pausePlay) {
                e.pausePlay.removeClass("play").addClass("pause").text(e.vars.pauseText)
            }
        };
        e.canAdvance = function(c) {
            if (!e.vars.animationLoop && e.atEnd) {
                if (e.currentSlide == 0 && c == e.count - 1 && e.direction != "next") {
                    return false
                } else {
                    if (e.currentSlide == e.count - 1 && c == 0 && e.direction == "next") {
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                return true
            }
        };
        e.getTarget = function(c) {
            e.direction = c;
            if (c == "next") {
                return (e.currentSlide == e.count - 1) ? 0 : e.currentSlide + 1
            } else {
                return (e.currentSlide == 0) ? e.count - 1 : e.currentSlide - 1
            }
        };
        e.setTransition = function(c) {
            e.container.css({
                "-webkit-transition-duration": (c / 1000) + "s"
            })
        };
        e.init()
    };
    b.flexslider.defaults = {
        animation: "fade",
        slideDirection: "horizontal",
        slideshow: true,
        slideshowSpeed: 7000,
        animationDuration: 600,
        directionNav: true,
        controlNav: true,
        keyboardNav: true,
        mousewheel: false,
        prevText: "Previous",
        nextText: "Next",
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        randomize: false,
        slideToStart: 0,
        animationLoop: true,
        pauseOnAction: true,
        pauseOnHover: false,
        controlsContainer: "",
        manualControls: "",
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {}
    };
    b.fn.flexslider = function(a) {
        return this.each(function() {
            if (b(this).find(".slides li").length == 1) {
                b(this).find(".slides li").fadeIn(400)
            } else {
                if (b(this).data("flexslider") != true) {
                    new b.flexslider(b(this), a)
                }
            }
        })
    }
})(jQuery);
(function(f) {
    f.tools = f.tools || {
        version: "v1.2.7"
    },
    f.tools.overlay = {
        addEffect: function(j, c, k) {
            h[j] = [c, k]
        },
        conf: {
            close: null,
            closeOnClick: !0,
            closeOnEsc: !0,
            closeSpeed: "fast",
            effect: "default",
            fixed: f && f.browser && (!f.browser.msie || f.browser.version) > 6,
            left: "center",
            load: !1,
            mask: null,
            oneInstance: !0,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var e = [],
        h = {};
    f.tools.overlay.addEffect("default", function(a, l) {
        var k = this.getConf(),
            j = f(window);
        k.fixed || (a.top += j.scrollTop(), a.left += j.scrollLeft()),
        a.position = k.fixed ? "fixed" : "absolute",
        this.getOverlay().css(a).fadeIn(k.speed, l)
    }, function(b) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, b)
    });
    function g(w, v) {
        var u = this,
            t = w.add(u),
            r = f(window),
            q,
            p,
            o,
            c = f.tools.expose && (v.mask || v.expose),
            b = Math.random().toString().slice(10);
        c && (typeof c == "string" && (c = {
            color: c
        }), c.closeOnClick = c.closeOnEsc = !1);
        var a = v.target || w.attr("rel");
        p = a ? f(a) : null || w;
        if (!p.length) {
            throw "Could not find Overlay: " + a
        }
        w && w.index(p) == -1 && w.click(function(d) {
            u.load(d);
            return d.preventDefault()
        }),
        f.extend(u, {
            load: function(x) {
                if (u.isOpened()) {
                    return u
                }
                var j = h[v.effect];
                if (!j) {
                    throw 'Overlay: cannot find effect : "' + v.effect + '"'
                }
                v.oneInstance && f.each(e, function() {
                    this.close(x)
                }),
                x = x || f.Event(),
                x.type = "onBeforeLoad",
                t.trigger(x);
                if (x.isDefaultPrevented()) {
                    return u
                }
                o = !0,
                c && f(p).expose(c);
                var y = v.top,
                    m = v.left,
                    l = p.outerWidth({
                        margin: !0
                    }),
                    k = p.outerHeight({
                        margin: !0
                    });
                typeof y == "string" && (y = y == "center" ? Math.max((r.height() - k) / 2, 0) : parseInt(y, 10) / 100 * r.height()),
                m == "center" && (m = Math.max((r.width() - l) / 2, 0)),
                j[0].call(u, {
                    top: y,
                    left: m
                }, function() {
                    o && (x.type = "onLoad", t.trigger(x))
                }),
                c && v.closeOnClick && f.mask.getMask().one("click", u.close),
                v.closeOnClick && f(document).on("click." + b, function(d) {
                    f(d.target).parents(p).length || u.close(d)
                }),
                v.closeOnEsc && f(document).on("keydown." + b, function(d) {
                    d.keyCode == 27 && u.close(d)
                });
                return u
            },
            close: function(d) {
                if (!u.isOpened()) {
                    return u
                }
                d = d || f.Event(),
                d.type = "onBeforeClose",
                t.trigger(d);
                if (!d.isDefaultPrevented()) {
                    o = !1,
                    h[v.effect][1].call(u, function() {
                        d.type = "onClose",
                        t.trigger(d)
                    }),
                    f(document).off("click." + b + " keydown." + b),
                    c && f.mask.close();
                    return u
                }
            },
            getOverlay: function() {
                return p
            },
            getTrigger: function() {
                return w
            },
            getClosers: function() {
                return q
            },
            isOpened: function() {
                return o
            },
            getConf: function() {
                return v
            }
        }),
        f.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(d, j) {
            f.isFunction(v[j]) && f(u).on(j, v[j]),
            u[j] = function(k) {
                k && f(u).on(j, k);
                return u
            }
        }),
        q = p.find(v.close || ".close"),
        !q.length && !v.close && (q = f('<a class="close"></a>'), p.prepend(q)),
        q.click(function(d) {
            u.close(d)
        }),
        v.load && u.load()
    }
    f.fn.overlay = function(b) {
        var a = this.data("overlay");
        if (a) {
            return a
        }
        f.isFunction(b) && (b = {
            onBeforeLoad: b
        }),
        b = f.extend(!0, {}, f.tools.overlay.conf, b),
        this.each(function() {
            a = new g(f(this), b),
            e.push(a),
            f(this).data("overlay", a)
        });
        return b.api ? a : this
    }
})(jQuery);
(function(r) {
    r.tools = r.tools || {
        version: "v1.2.7"
    };
    var q;
    q = r.tools.expose = {
        conf: {
            maskId: "exposeMask",
            loadSpeed: "slow",
            closeSpeed: "fast",
            closeOnClick: !0,
            closeOnEsc: !0,
            zIndex: 9998,
            opacity: 0.8,
            startOpacity: 0,
            color: "#fff",
            onLoad: null,
            onClose: null
        }
    };
    function p() {
        if (r.browser.msie) {
            var a = r(document).height(),
                d = r(window).height();
            return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, a - d < 20 ? d : a]
        }
        return [r(document).width(), r(document).height()]
    }
    function o(a) {
        if (a) {
            return a.call(r.mask)
        }
    }
    var n,
        m,
        l,
        k,
        j;
    r.mask = {
        load: function(c, b) {
            if (l) {
                return this
            }
            typeof c == "string" && (c = {
                color: c
            }),
            c = c || k,
            k = c = r.extend(r.extend({}, q.conf), c),
            n = r("#" + c.maskId),
            n.length || (n = r("<div/>").attr("id", c.maskId), r("body").append(n));
            var a = p();
            n.css({
                position: "absolute",
                top: 0,
                left: 0,
                width: a[0],
                height: a[1],
                display: "none",
                opacity: c.startOpacity,
                zIndex: c.zIndex
            }),
            c.color && n.css("backgroundColor", c.color);
            if (o(c.onBeforeLoad) === !1) {
                return this
            }
            c.closeOnEsc && r(document).on("keydown.mask", function(d) {
                d.keyCode == 27 && r.mask.close(d)
            }),
            c.closeOnClick && n.on("click.mask", function(d) {
                r.mask.close(d)
            }),
            r(window).on("resize.mask", function() {
                r.mask.fit()
            }),
            b && b.length && (j = b.eq(0).css("zIndex"), r.each(b, function() {
                var d = r(this);
                /relative|absolute|fixed/i.test(d.css("position")) || d.css("position", "relative")
            }), m = b.css({
                zIndex: Math.max(c.zIndex + 1, j == "auto" ? 0 : j)
            })),
            n.css({
                display: "block"
            }).fadeTo(c.loadSpeed, c.opacity, function() {
                r.mask.fit(),
                o(c.onLoad),
                l = "full"
            }),
            l = !0;
            return this
        },
        close: function() {
            if (l) {
                if (o(k.onBeforeClose) === !1) {
                    return this
                }
                n.fadeOut(k.closeSpeed, function() {
                    o(k.onClose),
                    m && m.css({
                        zIndex: j
                    }),
                    l = !1
                }),
                r(document).off("keydown.mask"),
                n.off("click.mask"),
                r(window).off("resize.mask")
            }
            return this
        },
        fit: function() {
            if (l) {
                var b = p();
                n.css({
                    width: b[0],
                    height: b[1]
                })
            }
        },
        getMask: function() {
            return n
        },
        isLoaded: function(b) {
            return b ? l == "full" : l
        },
        getConf: function() {
            return k
        },
        getExposed: function() {
            return m
        }
    },
    r.fn.mask = function(a) {
        r.mask.load(a);
        return this
    },
    r.fn.expose = function(a) {
        r.mask.load(a, this);
        return this
    }
})(jQuery);
var productMultimedia;
function setupMultiMedia() {
    try {
        productMultimedia = new ProductMultimedia(multiMediaJSON);
        if (productMultimedia.multiMediaData.HasProduct360) {
            $("li#360 a").attr("href", "javascript:productMultimedia.showSelectionContainer('div#carousal360','li#360')");
            $("ul#container360 a").each(function(a, d) {
                $(d).attr("href", "javascript:productMultimedia.showSelectedItem('" + d.id + "','360')")
            });
            $("div.videoWrapper a.btnNext").attr("href", "javascript:productMultimedia.nextProduct360()");
            $("div.videoWrapper a.btnPrev").attr("href", "javascript:productMultimedia.prevProduct360()");
            $("div#carousal360 li.imgNext a").attr("href", "javascript:productMultimedia.nextProduct360Carousal()");
            $("div#carousal360 li.imgPrev a").attr("href", "javascript:productMultimedia.prevProduct360Carousal()")
        }
        if (productMultimedia.multiMediaData.HasPictures) {
            $("li#picture a").attr("href", "javascript:productMultimedia.showSelectionContainer('div#carousalPictures','li#picture')");
            $("ul#containerPicture a").each(function(a, d) {
                $(d).attr("href", "javascript:productMultimedia.showSelectedItem('" + d.id + "','picture')")
            });
            $("div.imageGallery a.btnNext").attr("href", "javascript:productMultimedia.nextImage()");
            $("div.imageGallery a.btnPrev").attr("href", "javascript:productMultimedia.prevImage()");
            $("div#carousalPictures li.imgNext a").attr("href", "javascript:productMultimedia.nextImageCarousal()");
            $("div#carousalPictures li.imgPrev a").attr("href", "javascript:productMultimedia.prevImageCarousal()")
        }
        if (productMultimedia.multiMediaData.HasVideos) {
            $("li#video a").attr("href", "javascript:productMultimedia.showSelectionContainer('div#carousalVideos','li#video')");
            $("ul#containerVideo a").each(function(a, d) {
                $(d).attr("href", "javascript:productMultimedia.showSelectedItem('" + d.id + "','video')")
            });
            $("div.videoGallery a.btnNext").attr("href", "javascript:productMultimedia.nextVideo()");
            $("div.videoGallery a.btnPrev").attr("href", "javascript:productMultimedia.prevVideo()");
            $("div#carousalVideos li.imgNext a").attr("href", "javascript:productMultimedia.nextVideoCarousal()");
            $("div#carousalVideos li.imgPrev a").attr("href", "javascript:productMultimedia.prevVideoCarousal()")
        }
        $("div.zoomControls").show()
    } catch (b) {
        alert(b)
    }
}
function ProductMultimedia(c) {
    this.multiMediaData = null;
    this.currentImage = 0;
    this.currentVideo = 0;
    this.currentProduct360 = 0;
    this.seenProduct360 = false;
    this.currentProduct360Carousal = 1;
    this.currentImageCarousal = 1;
    this.currentVideoCarousal = 1;
    try {
        if (c != "") {
            this.multiMediaData = jQuery.parseJSON(c);
            if (this.multiMediaData.HasProduct360) {
                $("li#360").css("display", "inline-block")
            }
            if (this.multiMediaData.HasPictures) {
                $("li#picture").css("display", "inline-block");
                $("div.imageGallery .imgPictureDisplay").smoothZoom({
                    width: "100%",
                    height: "100%",
                    responsive: true,
                    full_BROWSER_SIZE: "yes",
                    zoom_BUTTONS_SHOW: false,
                    pan_BUTTONS_SHOW: false,
                    button_ICON_IMAGE: "/images/assets/zoom_icons.png",
                    zoom_MAX: 300,
                    animation_SPEED_ZOOM: 0.00005,
                    border_TRANSPARENCY: 0,
                    use_3D_Transform: false
                })
            }
            if (this.multiMediaData.HasVideos) {
                $("li#video").css("display", "inline-block")
            }
            this.setupNextPrev();
            this.setupNextPrevCarousal()
        }
    } catch (d) {
        alert(d)
    }
}
ProductMultimedia.prototype.showSelectionContainer = function(d, c) {
    $("div.imageGalleryNavBox").hide();
    $(d).show();
    $("ul#overlayNav li").removeClass("on");
    $(c).addClass("on");
    if (d == "div#carousal360") {
        this.showSelectedItem($("ul#container360 a")[0].id, "360")
    } else {
        if (d == "div#carousalPictures") {
            this.showSelectedItem($("ul#containerPicture a")[0].id, "picture")
        } else {
            if (d == "div#carousalVideos") {
                this.showSelectedItem($("ul#containerVideo a")[0].id, "video")
            }
        }
    }
    this.setupNextPrev();
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.clearVideos = function() {
    var b = "/images/assets/px.gif";
    if ($("div.videoGallery iframe.youtube").length > 0) {
        $("div.videoGallery iframe.youtube")[0].src = b
    }
    if ($("div.videoGallery iframe.videomark").length > 0) {
        $("div.videoGallery iframe.videomark")[0].src = b
    }
};
ProductMultimedia.prototype.showSelectedItem = function(n, l) {
    var h = "";
    var k = "";
    var m = "";
    $("div.videoWrapper").hide();
    $("div.imageGallery").hide();
    $("div.videoGallery").hide();
    var j = "/images/assets/px.gif";
    if ($("div.videoGallery iframe.youtube").length > 0) {
        $("div.videoGallery iframe.youtube")[0].src = j
    }
    if ($("div.videoGallery iframe.videomark").length > 0) {
        $("div.videoGallery iframe.videomark")[0].src = j
    }
    if (l == "picture") {
        $("div.imageGallery img").smoothZoom("destroy");
        $("div.imageGallery img").smoothZoom("destroy");
        $("ul#containerPicture li").removeClass("selected");
        $("#" + n).parent("li").addClass("selected");
        for (var o = 0; o < this.multiMediaData.Pictures.length; o++) {
            if (this.multiMediaData.Pictures[o].ID == n) {
                h = this.multiMediaData.Pictures[o].URL;
                this.currentImage = o;
                break
            }
        }
        $("div.imageGallery .imgPictureDisplay")[0].src = h;
        $("div.imageGallery").show();
        $("div.imageGallery .imgPictureDisplay").show();
        $("div.imageGallery .imgPictureDisplay").smoothZoom({
            width: "100%",
            height: "100%",
            responsive: true,
            full_BROWSER_SIZE: "yes",
            zoom_BUTTONS_SHOW: false,
            pan_BUTTONS_SHOW: false,
            button_ICON_IMAGE: "/images/assets/zoom_icons.png",
            zoom_MAX: 300,
            border_TRANSPARENCY: 0,
            use_3D_Transform: false,
            animation_SPEED_ZOOM: 0.00005
        })
    }
    if (l == "video") {
        $("ul#containerVideo li").removeClass("selected");
        $("#" + n).parent("li").addClass("selected");
        for (o = 0; o < this.multiMediaData.Videos.length; o++) {
            if (this.multiMediaData.Videos[o].ID == n) {
                h = this.multiMediaData.Videos[o].URL;
                m = this.multiMediaData.Videos[o].Type;
                this.currentVideo = o;
                break
            }
        }
        if (m == "YOUTUBE") {
            $("div.videoGallery iframe.youtube")[0].src = h;
            $("div.videoGallery iframe.youtube").show();
            $("div.videoGallery iframe.videomark").hide();
            $("div.videoGallery").show()
        } else {
            $("div.videoGallery iframe.videomark")[0].src = h;
            $("div.videoGallery iframe.videomark").show();
            $("div.videoGallery iframe.youtube").hide();
            $("div.videoGallery").show()
        }
    }
    if (l == "360") {
        $("ul#container360 li").removeClass("selected");
        $("#" + n).parent("li").addClass("selected");
        for (o = 0; o < this.multiMediaData.Product360URLs.length; o++) {
            if (this.multiMediaData.Product360URLs[o].ID == n) {
                h = this.multiMediaData.Product360URLs[o].URL;
                k = this.multiMediaData.Product360URLs[o].Path;
                this.currentProduct360 = o;
                break
            }
        }
        this.showProduct360(h, k)
    }
    this.setupNextPrev();
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.nextImage = function() {
    this.currentImage++;
    var d = "picture" + (this.currentImage + 1);
    this.showSelectedItem(d, "picture");
    var c = this.totalCarousal(this.currentImage + 1);
    if (c != this.currentImageCarousal) {
        this.currentImageCarousal = c;
        this.displayCarousal("ul#containerPicture", this.multiMediaData.PictureThumbs, "picture", this.currentImage, this.currentImageCarousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.prevImage = function() {
    this.currentImage--;
    var d = "picture" + (this.currentImage + 1);
    this.showSelectedItem(d, "picture");
    var c = this.totalCarousal(this.currentImage + 1);
    if (c != this.currentImageCarousal) {
        this.currentImageCarousal = c;
        this.displayCarousal("ul#containerPicture", this.multiMediaData.PictureThumbs, "picture", this.currentImage, this.currentImageCarousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.nextImageCarousal = function() {
    this.currentImageCarousal++;
    this.displayCarousal("ul#containerPicture", this.multiMediaData.PictureThumbs, "picture", this.currentImage, this.currentImageCarousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.prevImageCarousal = function() {
    this.currentImageCarousal--;
    this.displayCarousal("ul#containerPicture", this.multiMediaData.PictureThumbs, "picture", this.currentImage, this.currentImageCarousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.displayCarousal = function(k, o, l, h, j) {
    var n = (j - 1) * 6;
    var m;
    $(k).fadeOut("fast", function() {
        $(k + " img").each(function() {
            var a = $(this).closest("a");
            var c = $(this).closest("li");
            m = n + 1;
            if (n < o.length) {
                c.show();
                var b = o[n];
                $(this).attr("src", b.URL);
                $(this).attr("title", b.Type);
                $(this).attr("alt", b.Type);
                a.attr("id", l + m);
                a.attr("href", "javascript:productMultimedia.showSelectedItem('" + l + m + "','" + l + "')");
                if ((h + 1) == (m)) {
                    c.addClass("selected")
                } else {
                    c.removeClass("selected")
                }
            } else {
                c.hide()
            }
            n++
        });
        $(k).fadeIn()
    })
};
ProductMultimedia.prototype.nextVideo = function() {
    this.currentVideo++;
    var d = "video" + (this.currentVideo + 1);
    this.showSelectedItem(d, "video");
    var c = this.totalCarousal(this.currentVideo + 1);
    if (c != this.currentVideoCarousal) {
        this.currentVideoCarousal = c;
        this.displayCarousal("ul#containerVideo", this.multiMediaData.VideoThumbs, "video", this.currentVideo, this.currentVideoCarousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.prevVideo = function() {
    this.currentVideo--;
    var d = "360" + (this.currentVideo + 1);
    this.showSelectedItem(d, "360");
    var c = this.totalCarousal(this.currentVideo + 1);
    if (c != this.currentVideoCarousal) {
        this.currentVideoCarousal = c;
        this.displayCarousal("ul#containerVideo", this.multiMediaData.VideoThumbs, "video", this.currentVideo, this.currentVideoCarousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.nextVideoCarousal = function() {
    this.currentVideoCarousal++;
    this.displayCarousal("ul#containerVideo", this.multiMediaData.VideoThumbs, "video", this.currentVideo, this.currentVideoCarousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.prevVideoCarousal = function() {
    this.currentVideoCarousal--;
    this.displayCarousal("ul#containerVideo", this.multiMediaData.VideoThumbs, "video", this.currentVideo, this.currentVideoCarousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.nextProduct360 = function() {
    this.currentProduct360++;
    var d = "360" + (this.currentProduct360 + 1);
    this.showSelectedItem(d, "360");
    var c = this.totalCarousal(this.currentProduct360 + 1);
    if (c != this.currentProduct360Carousal) {
        this.currentProduct360Carousal = c;
        this.displayCarousal("ul#container360", this.multiMediaData.Product360Thumbs, "360", this.currentProduct360, this.currentProduct360Carousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.prevProduct360 = function() {
    this.currentProduct360--;
    var d = "360" + (this.currentProduct360 + 1);
    this.showSelectedItem(d, "360");
    var c = this.totalCarousal(this.currentProduct360 + 1);
    if (c != this.currentProduct360Carousal) {
        this.currentProduct360Carousal = c;
        this.displayCarousal("ul#container360", this.multiMediaData.Product360Thumbs, "360", this.currentProduct360, this.currentProduct360Carousal);
        this.setupNextPrevCarousal()
    }
};
ProductMultimedia.prototype.nextProduct360Carousal = function() {
    this.currentProduct360Carousal++;
    this.displayCarousal("ul#container360", this.multiMediaData.Product360Thumbs, "360", this.currentProduct360, this.currentProduct360Carousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.prevProduct360Carousal = function() {
    this.currentProduct360Carousal--;
    this.displayCarousal("ul#container360", this.multiMediaData.Product360Thumbs, "360", this.currentProduct360, this.currentProduct360Carousal);
    this.setupNextPrevCarousal()
};
ProductMultimedia.prototype.setupNextPrev = function() {
    $("div.imageGallery a.btnNext").show();
    $("div.imageGallery a.btnPrev").show();
    $("div.videoGallery a.btnNext").show();
    $("div.videoGallery a.btnPrev").show();
    $("div.videoWrapper a.btnNext").show();
    $("div.videoWrapper a.btnPrev").show();
    if (this.currentImage == 0) {
        $("div.imageGallery a.btnPrev").hide()
    }
    if (this.currentImage >= this.multiMediaData.Pictures.length - 1) {
        $("div.imageGallery a.btnNext").hide()
    }
    if (this.currentVideo == 0) {
        $("div.videoGallery a.btnPrev").hide()
    }
    if (this.currentVideo >= this.multiMediaData.Videos.length - 1) {
        $("div.videoGallery a.btnNext").hide()
    }
    if (this.currentProduct360 == 0) {
        $("div.videoWrapper a.btnPrev").hide()
    }
    if (this.currentProduct360 >= this.multiMediaData.Product360URLs.length - 1) {
        $("div.videoWrapper a.btnNext").hide()
    }
};
ProductMultimedia.prototype.setupNextPrevCarousal = function() {
    $("div#carousalPictures li.imgNext").show();
    $("div#carousalPictures li.imgPrev").show();
    $("div#carousal360 li.imgNext").show();
    $("div#carousal360 li.imgPrev").show();
    $("div#carousalVideos li.imgNext").show();
    $("div#carousalVideos li.imgPrev").show();
    if (this.currentImageCarousal == 1) {
        $("div#carousalPictures li.imgPrev").hide()
    }
    var e = this.totalCarousal(this.multiMediaData.PictureThumbs.length);
    if (this.currentImageCarousal >= e) {
        $("div#carousalPictures li.imgNext").hide()
    }
    $("div#carousalPictures p.status").html(this.currentImageCarousal + " of " + e);
    if (this.currentProduct360Carousal == 1) {
        $("div#carousal360 li.imgPrev").hide()
    }
    var d = this.totalCarousal(this.multiMediaData.Product360Thumbs.length);
    if (this.currentProduct360Carousal >= d) {
        $("div#carousal360 li.imgNext").hide()
    }
    $("div#carousal360 p.status").html(this.currentProduct360Carousal + " of " + d);
    if (this.currentVideoCarousal == 1) {
        $("div#carousalVideos li.imgPrev").hide()
    }
    var f = this.totalCarousal(this.multiMediaData.VideoThumbs.length);
    if (this.currentVideoCarousal >= f) {
        $("div#carousalVideos li.imgNext").hide()
    }
    $("div#carousalVideos p.status").html(this.currentVideoCarousal + " of " + f)
};
ProductMultimedia.prototype.totalCarousal = function(d) {
    var c = Math.floor(d / 6);
    if (d % 6 != 0) {
        c += 1
    }
    return c
};
ProductMultimedia.prototype.elementToCarousalIndex = function(d) {
    var c = d % 6;
    return c
};
ProductMultimedia.prototype.showProduct360 = function(f, g) {
    var e = "";
    if (swfobject.hasFlashPlayerVersion("8")) {
        ProductMultimedia.showFlash360(f)
    } else {
        e = "<div id='Frame'></div>";
        $("div#swfContainer").html();
        $("div#swfContainer").html(e);
        var h = {
            centerInWindow: false,
            xmlPath: "",
            objPath: ""
        };
        h.xmlPath = g;
        h.objPath = g + "Images/";
        $("#Frame").animate360(h)
    }
    $("div.videoWrapper").show()
};
ProductMultimedia.showFlash360 = function(k) {
    var f = {
        data: k,
        width: "600",
        height: "400"
    };
    var j = {
        menu: "false"
    };
    var h = "swfContainer";
    if ($.browser && $.browser.msie && $.browser.version.split(".")[0] == 7) {
        $("#" + h).append($('<div id="swfContainerContainer" />'));
        h = "swfcontainerContainer"
    }
    var g = swfobject.createSWF(f, j, h)
};
function VideoGallery(c) {
    this.multiMediaData = null;
    this.currentVideo = 0;
    this.parent = this;
    try {
        if (c != "") {
            this.multiMediaData = jQuery.parseJSON(c);
            if (this.multiMediaData.HasVideos) {
                $("li#video").css("display", "inline-block")
            }
            this.setupNextPrev()
        }
    } catch (d) {
        alert(d)
    }
}
VideoGallery.prototype.nextVideo = function() {
    this.currentVideo++;
    var b = $("ul#containerVideo a")[this.currentVideo].id;
    this.showSelectedItem(b, "video")
};
VideoGallery.prototype.prevVideo = function() {
    this.currentVideo--;
    var b = $("ul#containerVideo a")[this.currentVideo].id;
    this.showSelectedItem(b, "video")
};
VideoGallery.prototype.setupNextPrev = function() {
    $("div.videoGallery a.btnNext").show();
    $("div.videoGallery a.btnPrev").show();
    if (this.currentVideo == 0) {
        $("div.videoGallery a.btnPrev").hide()
    }
    if (this.currentVideo >= this.multiMediaData.Videos.length - 1) {
        $("div.videoGallery a.btnNext").hide()
    }
};
VideoGallery.prototype.showSelectedItem = function(e, g) {
    var f = "";
    var h = "";
    if (g == "video") {
        $("#" + e).addClass("selected");
        for (i = 0; i < this.multiMediaData.Videos.length; i++) {
            if (this.multiMediaData.Videos[i].ID == e) {
                f = this.multiMediaData.Videos[i].URL;
                h = this.multiMediaData.Videos[i].Type;
                this.currentVideo = i;
                break
            }
        }
        if (h == "YOUTUBE") {
            $("div.videoGallery iframe.youtube")[0].src = f;
            $("div.videoGallery iframe.youtube").show();
            $("div.videoGallery iframe.videomark").hide();
            $("div.videoGallery").show()
        } else {
            $("div.videoGallery iframe.videomark")[0].src = f;
            $("div.videoGallery iframe.videomark").show();
            $("div.videoGallery iframe.youtube").hide();
            $("div.videoGallery").show()
        }
    }
    this.setupNextPrev()
};
var videoGallery;
function setupVideoGallery() {
    videoGallery = new VideoGallery(multiMediaJSON);
    $("div.videoGallery a.btnNext").attr("href", "javascript:videoGallery.nextVideo()");
    $("div.videoGallery a.btnPrev").attr("href", "javascript:videoGallery.prevVideo()");
    $("ul#containerVideo a").each(function(d, c) {
        $(c).attr("href", "javascript:videoGallery.showSelectedItem('" + c.id + "','video')")
    })
}
$.fn.treeNav = function() {
    return $(this).each(function() {
        if (!$(this).parents(".tree").length) {
            var b = $(this);
            b.find(">li>a").append("<i></i>");
            b.find("ul").addClass("tree-group-collapsed");
            b.find("li:has(ul)").find(">a").addClass("tree-parent tree-parent-collapsed")
        }
        b.find("li.js-opened").find("a.tree-parent").removeClass("tree-parent-collapsed").next().removeClass("tree-group-collapsed");
        b.find("a.tree-parent i").click(function() {
            if ($(this).parent("a").is(".tree-parent-collapsed")) {
                $(this).parent("a").removeClass("tree-parent-collapsed").next().hide().removeClass("tree-group-collapsed").slideDown(150, function() {
                    $(this).removeAttr("style")
                })
            } else {
                $(this).parent("a").addClass("tree-parent-collapsed").next().slideUp(150, function() {
                    $(this).addClass("tree-group-collapsed").removeAttr("style")
                })
            }
            return false
        })
    })
};
jQuery(document).ready(function(f) {
    var e = /\.(pdf)$/i;
    var d = "";
    if (jQuery("base").attr("href") != undefined) {
        d = jQuery("base").attr("href")
    }
    jQuery("a").each(function() {
        var a = jQuery(this).attr("href");
        if (a && (a.match(/^https?\:/i)) && (!a.match(document.domain))) {
            jQuery(this).click(function() {
                var b = a.replace(/^https?\:\/\//i, "");
                _gaq.push(["_trackEvent", "External", "Click", b]);
                if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
                    setTimeout(function() {
                        location.href = a
                    }, 200);
                    return false
                }
            })
        } else {
            if (a && a.match(/^mailto\:/i)) {
                jQuery(this).click(function() {
                    var b = a.replace(/^mailto\:/i, "");
                    _gaq.push(["_trackEvent", "Email", "Click", b])
                })
            } else {
                if (a && a.match(e)) {
                    jQuery(this).click(function() {
                        var b = (/[.]/.exec(a)) ? /[^.]+$/.exec(a) : undefined;
                        var c = a;
                        _gaq.push(["_trackEvent", "Download", "Click-" + b, c]);
                        if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
                            setTimeout(function() {
                                location.href = d + a
                            }, 200);
                            return false
                        }
                    })
                }
            }
        }
    })
});
var GoogleEventTracking = {
    youtube: {
        onStateChange: function(c) {
            var d = "";
            switch (c) {
            case -1:
                d = "unstarted";
                break;
            case 0:
                d = "ended";
                break;
            case 1:
                d = "playing";
                break;
            case 2:
                d = "paused";
                break;
            case 3:
                d = "buffering";
                break;
            case 5:
                d = "video-cued";
                break
            }
            return d
        }
    },
    multimediamodule: {
        push: function(d, c) {
            if (!c.length) {
                c = ""
            }
            if (d.length) {
                _gaq.push(["_trackEvent", "MultiMedia", c + d, document.URL])
            }
        },
        bind: function(f, e, d) {
            if (f.length && e.length) {
                $(f).mousedown(function() {
                    GoogleEventTracking.multimediamodule.push(e, d)
                })
            }
        },
        bindusingidastype: function(c, d) {
            if (c.length) {
                $(c).mousedown(function() {
                    GoogleEventTracking.multimediamodule.push($(this).attr("id"), d)
                })
            }
        },
        bindmultiple: function(d, c) {
            if (d.length) {
                for (i = 0; i < d.length; i++) {
                    GoogleEventTracking.multimediamodule.bind(d[i][0], d[i][1], c)
                }
            }
        },
        flash: function(b) {
            GoogleEventTracking.push(GoogleEventTracking.youtube.onStateChange(b), "video-")
        },
        flashsetup: function() {},
        setup: function(e) {
            e += "-";
            GoogleEventTracking.multimediamodule.push("Load", e);
            GoogleEventTracking.multimediamodule.bind("#overlay .close", "Close", e);
            var g = [["#360 a", "360"], ["#picture a", "Picture"], ["#video a", "Video"]];
            GoogleEventTracking.multimediamodule.bindmultiple(g, "Tab-");
            var f = [["#overlay .controls .btnNext", "Next"], ["#overlay .controls .btnPrev", "Prev"]];
            GoogleEventTracking.multimediamodule.bindmultiple(f, "Item-");
            GoogleEventTracking.multimediamodule.bindusingidastype("#container360 a", "Selected-");
            GoogleEventTracking.multimediamodule.bindusingidastype("#containerPicture a", "Selected-");
            GoogleEventTracking.multimediamodule.bindusingidastype("#containerVideo a", "Selected-");
            var h = [["#overlay .zoom .zoomIn a", "ZoomIn"], ["#overlay .zoom .zoomOut a", "ZoomOut"], ["#overlay .zoomMove .moveLeft a", "MoveLeft"], ["#overlay .zoomMove .moveRight a", "MoveRight"], ["#overlay .zoomMove .moveUp a", "MoveUp"], ["#overlay .zoomMove .moveDown a", "MoveDown"], ["#overlay .zoomControls .button a", "Reset"]];
            GoogleEventTracking.multimediamodule.bindmultiple(h, e)
        }
    }
};
CookieBannerHandler = function(C) {
    function r(a) {
        this.url = a.url || "/";
        this.location = a.location || "top";
        this.mode = a.mode || "fadein";
        this.offset = a.mode || 0;
        this.cookiename = a.cookiename || "eucookielaw";
        this.cookievalue = a.cookievalue || "set";
        this.cookievaluefalse = a.cookievaluefalse || "";
        this.cookielifespan = a.cookielifespan || 182;
        this.htmlsnippeturl = a.htmlsnippeturl || "/";
        this.htmlsnippetdiv = a.htmlsnippetdiv || "";
        this.defaultdivid = a.defaultdivid || "eucookielawcontainer";
        this.targetdivid = a.targetdivid || "";
        this.buttoncsssel = a.buttoncsssel || "";
        this.buttonnocsssel = a.buttonnocsssel || "";
        this.forcereload = a.forcereload || true;
        this.checkcsssel = a.checkcsssel || "";
        this.checkfailalert = a.checkfailalert || false;
        this.deletecookiesgoogleanalytic = a.deletecookiesgoogleanalytic || "";
        this.displaytimeout = a.displaytimeout || 0
    }
    this.Settings = new r(C);
    function q() {
        var c,
            d,
            a,
            b = document.cookie.split(";");
        for (c = 0; c < b.length; c++) {
            d = b[c].substr(0, b[c].indexOf("="));
            a = b[c].substr(b[c].indexOf("=") + 1);
            d = d.replace(/^\s+|\s+$/g, "");
            if (d == this.Settings.cookiename) {
                return unescape(a)
            }
        }
    }
    function u() {
        var a = q(this.Settings.cookiename);
        if ((a != null) && ((a == this.Settings.cookievalue) || (a == this.Settings.cookievaluefalse))) {
            return true
        }
        return false
    }
    function D(b) {
        var a = q(b);
        if (a != null) {
            document.cookie = (b + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/")
        }
    }
    function y(c) {
        var d = new Date();
        d.setDate(d.getDate() + this.Settings.cookielifespan);
        var b = (c) ? this.Settings.cookievalue : this.Settings.cookievaluefalse;
        var a = escape(b) + ((this.Settings.cookielifespan == null) ? "" : "; expires=" + d.toUTCString()) + "; path=/";
        document.cookie = (this.Settings.cookiename + "=" + a);
        if (!c && this.Settings.deletecookiesgoogleanalytic) {
            z()
        }
    }
    function z() {
        var a = ["__utma", "__utmb", "__utmc", "__umtz", "___utmv", "___utmx"];
        for (i = 0; i < a.length; i++) {
            D(a[i])
        }
    }
    function v() {
        if (this.Settings.htmlsnippeturl == "/") {
            return
        }
        if (this.Settings.buttoncsssel == "") {
            return
        }
        var a = '<div id="' + this.Settings.defaultdivid + '"</div>';
        switch (this.Settings.location) {
        case "top":
            $("body").prepend(a);
            break;
        case "bottom":
        case "center":
            $("body").append(a);
            break
        }
        var c = "#" + this.Settings.defaultdivid;
        switch (this.Settings.mode) {
        case "banner":
            w();
            break;
        case "fadein":
            $(c).hide();
            if (this.Settings.location == "top") {
                E()
            }
            if (this.Settings.location == "bottom") {
                B()
            }
            break
        }
        if (this.Settings.displaytimeout > 0) {
            var b = this.Settings.displaytimeout * 1000;
            setTimeout(function() {
                x(true)
            }, b)
        }
    }
    function A() {
        $(this.Settings.buttoncsssel).click(function() {
            x(true)
        });
        if (this.Settings.buttonnocsssel != "") {
            $(this.Settings.buttonnocsssel).click(function() {
                x(false)
            })
        }
    }
    function w() {
        var a = "#" + this.Settings.defaultdivid;
        $(a).load(this.Settings.htmlsnippeturl, function() {
            A()
        })
    }
    function E() {
        var a = "#" + this.Settings.defaultdivid;
        $(a).load(this.Settings.htmlsnippeturl, function() {
            A();
            var b = -($(a).height() * 2);
            $(a).css("position", "fixed").css("top", b).css("z-index", 10000).show().animate({
                top: 0
            }, 1500, function() {})
        })
    }
    function B() {
        var a = "#" + this.Settings.defaultdivid;
        $(a).load(this.Settings.htmlsnippeturl, function() {
            A();
            var b = -($(a).height() * 2);
            $(a).css("position", "fixed").css("bottom", b).css("z-index", 10000).show().animate({
                bottom: 0
            }, 1500, function() {})
        })
    }
    function x(b) {
        if (this.Settings.checkcsssel != "") {
            var a = $(this.Settings.checkcsssel + ":checked").length;
            if (a < 1) {
                if (this.Settings.checkfailalert) {
                    alert(this.Settings.checkfailalert)
                }
                return false
            }
        }
        y(b);
        t();
        return false
    }
    function t() {
        var a = "#" + this.Settings.defaultdivid;
        $(a).remove();
        if (this.forcereload) {
            window.location.reload()
        }
    }
    if (!C) {
        return
    }
    var F = new r(C);
    if (u()) {
        return
    }
    v()
};
(function(f) {
    function b(h) {
        var d = h || window.event,
            m = [].slice.call(arguments, 1),
            k = 0,
            l = 0,
            j = 0;
        h = f.event.fix(d);
        h.type = "mousewheel";
        d.wheelDelta && (k = d.wheelDelta / 120);
        d.detail && (k = -d.detail / 3);
        j = k;
        void 0 !== d.axis && d.axis === d.HORIZONTAL_AXIS && (j = 0, l = -1 * k);
        void 0 !== d.wheelDeltaY && (j = d.wheelDeltaY / 120);
        void 0 !== d.wheelDeltaX && (l = -1 * d.wheelDeltaX / 120);
        m.unshift(h, k, l, j);
        return (f.event.dispatch || f.event.handle).apply(this, m)
    }
    var g = ["DOMMouseScroll", "mousewheel"];
    if (f.event.fixHooks) {
        for (var a = g.length; a;) {
            f.event.fixHooks[g[--a]] = f.event.mouseHooks
        }
    }
    f.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var c = g.length; c;) {
                    this.addEventListener(g[--c], b, !1)
                }
            } else {
                this.onmousewheel = b
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var c = g.length; c;) {
                    this.removeEventListener(g[--c], b, !1)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    f.fn.extend({
        mousewheel: function(c) {
            return c ? this.bind("mousewheel", c) : this.trigger("mousewheel")
        },
        unmousewheel: function(c) {
            return this.unbind("mousewheel", c)
        }
    })
})(jQuery);
var jaaulde = window.jaaulde || {};
jaaulde.utils = jaaulde.utils || {};
jaaulde.utils.cookies = function() {
    var g,
        c,
        k,
        j,
        a = {
            expiresAt: null,
            path: "/",
            domain: null,
            secure: !1
        };
    g = function(b) {
        var e,
            d;
        "object" !== typeof b || null === b ? e = a : (e = {
            expiresAt: a.expiresAt,
            path: a.path,
            domain: a.domain,
            secure: a.secure
        }, "object" === typeof b.expiresAt && b.expiresAt instanceof Date ? e.expiresAt = b.expiresAt : "number" === typeof b.hoursToLive && 0 !== b.hoursToLive && (d = new Date, d.setTime(d.getTime() + 3600000 * b.hoursToLive), e.expiresAt = d), "string" === typeof b.path && "" !== b.path && (e.path = b.path), "string" === typeof b.domain && "" !== b.domain && (e.domain = b.domain), !0 === b.secure && (e.secure = b.secure));
        return e
    };
    c = function(b) {
        b = g(b);
        return ("object" === typeof b.expiresAt && b.expiresAt instanceof Date ? "; expires=" + b.expiresAt.toGMTString() : "") + "; path=" + b.path + ("string" === typeof b.domain ? "; domain=" + b.domain : "") + (!0 === b.secure ? "; secure" : "")
    };
    k = function() {
        var u = {},
            r,
            n,
            q,
            t,
            p = document.cookie.split(";"),
            o;
        for (r = 0; r < p.length; r += 1) {
            n = p[r].split("=");
            q = n[0].replace(/^\s*/, "").replace(/\s*$/, "");
            try {
                t = decodeURIComponent(n[1])
            } catch (m) {
                t = n[1]
            }
            if ("object" === typeof JSON && null !== JSON && "function" === typeof JSON.parse) {
                try {
                    o = t,
                    t = JSON.parse(t)
                } catch (l) {
                    t = o
                }
            }
            u[q] = t
        }
        return u
    };
    j = function() {};
    j.prototype.get = function(e) {
        var h,
            f,
            d = k();
        if ("string" === typeof e) {
            h = "undefined" !== typeof d[e] ? d[e] : null
        } else {
            if ("object" === typeof e && null !== e) {
                for (f in h = {}, e) {
                    h[e[f]] = "undefined" !== typeof d[e[f]] ? d[e[f]] : null
                }
            } else {
                h = d
            }
        }
        return h
    };
    j.prototype.filter = function(f) {
        var l,
            d = {},
            h = k();
        "string" === typeof f && (f = RegExp(f));
        for (l in h) {
            l.match(f) && (d[l] = h[l])
        }
        return d
    };
    j.prototype.set = function(e, f, d) {
        if ("object" !== typeof d || null === d) {
            d = {}
        }
        if ("undefined" === typeof f || null === f) {
            f = "",
            d.hoursToLive = -8760
        } else {
            if ("string" !== typeof f) {
                if ("object" === typeof JSON && null !== JSON && "function" === typeof JSON.stringify) {
                    f = JSON.stringify(f)
                } else {
                    throw Error("cookies.set() received non-string value and could not serialize.")
                }
            }
        }
        d = c(d);
        document.cookie = e + "=" + encodeURIComponent(f) + d
    };
    j.prototype.del = function(f, l) {
        var e = {},
            h;
        if ("object" !== typeof l || null === l) {
            l = {}
        }
        "boolean" === typeof f && !0 === f ? e = this.get() : "string" === typeof f && (e[f] = !0);
        for (h in e) {
            "string" === typeof h && "" !== h && this.set(h, null, l)
        }
    };
    j.prototype.test = function() {
        var b = !1;
        this.set("cT", "data");
        "data" === this.get("cT") && (this.del("cT"), b = !0);
        return b
    };
    j.prototype.setOptions = function(b) {
        "object" !== typeof b && (b = null);
        a = g(b)
    };
    return new j
}();
(function() {
    window.jQuery && function(a) {
        a.cookies = jaaulde.utils.cookies;
        a.each({
            cookify: function(b) {
                return this.each(function() {
                    var j,
                        h = ["name", "id"],
                        f,
                        g = a(this),
                        k;
                    for (j in h) {
                        if (!isNaN(j) && (f = g.attr(h[j]), "string" === typeof f && "" !== f)) {
                            g.is(":checkbox, :radio") ? g.attr("checked") && (k = g.val()) : k = g.is(":input") ? g.val() : g.html();
                            if ("string" !== typeof k || "" === k) {
                                k = null
                            }
                            a.cookies.set(f, k, b);
                            break
                        }
                    }
                })
            },
            cookieFill: function() {
                return this.each(function() {
                    var g,
                        k,
                        j = ["name", "id"],
                        c,
                        f = a(this);
                    for (k = function() {
                        g = j.pop();
                        return !!g
                    }; k();) {
                        if (c = f.attr(g), "string" === typeof c && "" !== c) {
                            k = a.cookies.get(c);
                            null !== k && (f.is(":checkbox, :radio") ? f.val() === k ? f.attr("checked", "checked") : f.removeAttr("checked") : f.is(":input") ? f.val(k) : f.html(k));
                            break
                        }
                    }
                })
            },
            cookieBind: function(b) {
                return this.each(function() {
                    var c = a(this);
                    c.cookieFill().change(function() {
                        c.cookify(b)
                    })
                })
            }
        }, function(b) {
            a.fn[b] = this
        })
    }(window.jQuery)
})();
(function(a) {
    a.decodeQuery = function(r) {
        function j() {
            if ("" != t) {
                if (q = decodeURIComponent(q), t = decodeURIComponent(t), "[]" == t.substr(t.length - 2)) {
                    t = t.substr(0, t.length - 2),
                    p[t] instanceof Array || (p[t] = []),
                    p[t].push(q)
                } else {
                    if ("]" == t.substr(t.length - 1) && -1 != t.indexOf("[")) {
                        var c = t.substring(t.indexOf("[") + 1, t.length - 1);
                        t = t.substr(0, t.indexOf("["));
                        "object" != typeof p[t] && (p[t] = {});
                        p[t][c] = q
                    } else {
                        p[t] = q
                    }
                }
            }
            m = !0;
            q = t = ""
        }
        r || (r = window.location.search);
        "?" == r.charAt(0) && (r = r.substr(1));
        for (var p = {}, o, t = "", q = "", m = !0, l = 0, n = r.length; l < n; l++) {
            o = r.charAt(l),
            "&" == o ? j() : m ? "=" == o ? m = !1 : t += o : q += o
        }
        j();
        return p
    }
})($);
$(function(f) {
    function g() {
        if (window.getComputedStyle) {
            var a = window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace('"', "", "g").replace('"', "", "g");
            a != b && (h.trigger("breakpoint", {
                oldBreakpoint: b,
                newBreakpoint: a
            }), b = a)
        } else {
            h.trigger("breakpoint", {
                oldBreakpoint: b,
                newBreakpoint: "desktop"
            })
        }
    }
    var b,
        h = f(window);
    h.on("resize orientationchange deviceorientation initbreakpoint", g);
    setTimeout(g, 20)
});
function MediaOverlay(f, e) {
    var h = this;
    f = $(f);
    var g = f.find(".content");
    f.data("overlay", this);
    f.find(".close").click(function(b) {
        b.preventDefault();
        h.hide()
    });
    this.show = function(a) {
        f.css("display", "block");
        g.load(a);
        e && (e.set_paused(!0, "mediaOverlay"), e.element.addClass("mediaOverlayOpen"))
    };
    this.hide = function() {
        f.css("display", "none");
        g.empty();
        e && (e.set_paused(!1, "mediaOverlay"), e.element.removeClass("mediaOverlayOpen"))
    }
}
(function(g, d) {
    function c(k, j) {
        var p,
            e,
            m,
            l = k.nodeName.toLowerCase();
        return "area" === l ? (p = k.parentNode, e = p.name, k.href && e && "map" === p.nodeName.toLowerCase() ? (m = g("img[usemap=#" + e + "]")[0], !!m && f(m)) : !1) : (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" === l ? k.href || j : j) && f(k)
    }
    function f(a) {
        return g.expr.filters.visible(a) && !g(a).parents().addBack().filter(function() {
                return "hidden" === g.css(this, "visibility")
            }).length
    }
    var h = 0,
        b = /^ui-id-\d+$/;
    g.ui = g.ui || {},
    g.extend(g.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    g.fn.extend({
        focus: function(a) {
            return function(e, j) {
                return "number" == typeof e ? this.each(function() {
                    var k = this;
                    setTimeout(function() {
                        g(k).focus(),
                        j && j.call(k)
                    }, e)
                }) : a.apply(this, arguments)
            }
        }(g.fn.focus),
        scrollParent: function() {
            var a;
            return a = g.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(g.css(this, "position")) && /(auto|scroll)/.test(g.css(this, "overflow") + g.css(this, "overflow-y") + g.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(g.css(this, "overflow") + g.css(this, "overflow-y") + g.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !a.length ? g(document) : a
        },
        zIndex: function(j) {
            if (j !== d) {
                return this.css("zIndex", j)
            }
            if (this.length) {
                for (var k, l, e = g(this[0]); e.length && e[0] !== document;) {
                    if (k = e.css("position"), ("absolute" === k || "relative" === k || "fixed" === k) && (l = parseInt(e.css("zIndex"), 10), !isNaN(l) && 0 !== l)) {
                        return l
                    }
                    e = e.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++h)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                b.test(this.id) && g(this).removeAttr("id")
            })
        }
    }),
    g.extend(g.expr[":"], {
        data: g.expr.createPseudo ? g.expr.createPseudo(function(a) {
            return function(e) {
                return !!g.data(e, a)
            }
        }) : function(e, a, j) {
            return !!g.data(e, j[3])
        },
        focusable: function(a) {
            return c(a, !isNaN(g.attr(a, "tabindex")))
        },
        tabbable: function(a) {
            var e = g.attr(a, "tabindex"),
                j = isNaN(e);
            return (j || e >= 0) && c(a, !j)
        }
    }),
    g("<a>").outerWidth(1).jquery || g.each(["Width", "Height"], function(j, k) {
        function p(o, a, q, r) {
            return g.each(e, function() {
                a -= parseFloat(g.css(o, "padding" + this)) || 0,
                q && (a -= parseFloat(g.css(o, "border" + this + "Width")) || 0),
                r && (a -= parseFloat(g.css(o, "margin" + this)) || 0)
            }), a
        }
        var e = "Width" === k ? ["Left", "Right"] : ["Top", "Bottom"],
            m = k.toLowerCase(),
            l = {
                innerWidth: g.fn.innerWidth,
                innerHeight: g.fn.innerHeight,
                outerWidth: g.fn.outerWidth,
                outerHeight: g.fn.outerHeight
            };
        g.fn["inner" + k] = function(a) {
            return a === d ? l["inner" + k].call(this) : this.each(function() {
                g(this).css(m, p(this, a) + "px")
            })
        },
        g.fn["outer" + k] = function(n, a) {
            return "number" != typeof n ? l["outer" + k].call(this, n) : this.each(function() {
                g(this).css(m, p(this, n, !0, a) + "px")
            })
        }
    }),
    g.fn.addBack || (g.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }),
    g("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (g.fn.removeData = function(a) {
        return function(e) {
            return arguments.length ? a.call(this, g.camelCase(e)) : a.call(this)
        }
    }(g.fn.removeData)),
    g.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    g.support.selectstart = "onselectstart" in document.createElement("div"),
    g.fn.extend({
        disableSelection: function() {
            return this.bind((g.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    g.extend(g.ui, {
        plugin: {
            add: function(k, j, l) {
                var m,
                    e = g.ui[k].prototype;
                for (m in l) {
                    e.plugins[m] = e.plugins[m] || [],
                    e.plugins[m].push([j, l[m]])
                }
            },
            call: function(l, j, a) {
                var k,
                    m = l.plugins[j];
                if (m && l.element[0].parentNode && 11 !== l.element[0].parentNode.nodeType) {
                    for (k = 0; m.length > k; k++) {
                        l.options[m[k][0]] && m[k][1].apply(l.element, a)
                    }
                }
            }
        },
        hasScroll: function(e, a) {
            if ("hidden" === g(e).css("overflow")) {
                return !1
            }
            var j = a && "left" === a ? "scrollLeft" : "scrollTop",
                k = !1;
            return e[j] > 0 ? !0 : (e[j] = 1, k = e[j] > 0, e[j] = 0, k)
        }
    })
})(jQuery);
(function(d, b) {
    var a = 0,
        c = Array.prototype.slice,
        f = d.cleanData;
    d.cleanData = function(h) {
        for (var g, j = 0; null != (g = h[j]); j++) {
            try {
                d(g).triggerHandler("remove")
            } catch (e) {}
        }
        f(h)
    },
    d.widget = function(m, v, j) {
        var q,
            g,
            e,
            p,
            k = {},
            t = m.split(".")[0];
        m = m.split(".")[1],
        q = t + "-" + m,
        j || (j = v, v = d.Widget),
        d.expr[":"][q.toLowerCase()] = function(h) {
            return !!d.data(h, q)
        },
        d[t] = d[t] || {},
        g = d[t][m],
        e = d[t][m] = function(l, h) {
            return this._createWidget ? (arguments.length && this._createWidget(l, h), b) : new e(l, h)
        },
        d.extend(e, g, {
            version: j.version,
            _proto: d.extend({}, j),
            _childConstructors: []
        }),
        p = new v,
        p.options = d.widget.extend({}, p.options),
        d.each(j, function(h, l) {
            return d.isFunction(l) ? (k[h] = function() {
                var o = function() {
                        return v.prototype[h].apply(this, arguments)
                    },
                    n = function(r) {
                        return v.prototype[h].apply(this, r)
                    };
                return function() {
                    var u,
                        w = this._super,
                        r = this._superApply;
                    return this._super = o, this._superApply = n, u = l.apply(this, arguments), this._super = w, this._superApply = r, u
                }
            }(), b) : (k[h] = l, b)
        }),
        e.prototype = d.widget.extend(p, {
            widgetEventPrefix: g ? p.widgetEventPrefix || m : m
        }, k, {
            constructor: e,
            namespace: t,
            widgetName: m,
            widgetFullName: q
        }),
        g ? (d.each(g._childConstructors, function(l, h) {
            var n = h.prototype;
            d.widget(n.namespace + "." + n.widgetName, e, h._proto)
        }), delete g._childConstructors) : v._childConstructors.push(e),
        d.widget.bridge(m, e)
    },
    d.widget.extend = function(g) {
        for (var m, e, l = c.call(arguments, 1), k = 0, j = l.length; j > k; k++) {
            for (m in l[k]) {
                e = l[k][m],
                l[k].hasOwnProperty(m) && e !== b && (g[m] = d.isPlainObject(e) ? d.isPlainObject(g[m]) ? d.widget.extend({}, g[m], e) : d.widget.extend({}, e) : e)
            }
        }
        return g
    },
    d.widget.bridge = function(g, h) {
        var e = h.prototype.widgetFullName || g;
        d.fn[g] = function(n) {
            var m = "string" == typeof n,
                k = c.call(arguments, 1),
                j = this;
            return n = !m && k.length ? d.widget.extend.apply(null, [n].concat(k)) : n, m ? this.each(function() {
                var l,
                    o = d.data(this, e);
                return o ? d.isFunction(o[n]) && "_" !== n.charAt(0) ? (l = o[n].apply(o, k), l !== o && l !== b ? (j = l && l.jquery ? j.pushStack(l.get()) : l, !1) : b) : d.error("no such method '" + n + "' for " + g + " widget instance") : d.error("cannot call methods on " + g + " prior to initialization; attempted to call method '" + n + "'")
            }) : this.each(function() {
                var l = d.data(this, e);
                l ? l.option(n || {})._init() : d.data(this, e, new h(n, this))
            }), j
        }
    },
    d.Widget = function() {},
    d.Widget._childConstructors = [],
    d.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, g) {
            g = d(g || this.defaultElement || this)[0],
            this.element = d(g),
            this.uuid = a++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = d.widget.extend({}, this.options, this._getCreateOptions(), e),
            this.bindings = d(),
            this.hoverable = d(),
            this.focusable = d(),
            g !== this && (d.data(g, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(h) {
                    h.target === g && this.destroy()
                }
            }), this.document = d(g.style ? g.ownerDocument : g.document || g), this.window = d(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: d.noop,
        _getCreateEventData: d.noop,
        _create: d.noop,
        _init: d.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(d.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: d.noop,
        widget: function() {
            return this.element
        },
        option: function(g, h) {
            var l,
                e,
                k,
                j = g;
            if (0 === arguments.length) {
                return d.widget.extend({}, this.options)
            }
            if ("string" == typeof g) {
                if (j = {}, l = g.split("."), g = l.shift(), l.length) {
                    for (e = j[g] = d.widget.extend({}, this.options[g]), k = 0; l.length - 1 > k; k++) {
                        e[l[k]] = e[l[k]] || {},
                        e = e[l[k]]
                    }
                    if (g = l.pop(), 1 === arguments.length) {
                        return e[g] === b ? null : e[g]
                    }
                    e[g] = h
                } else {
                    if (1 === arguments.length) {
                        return this.options[g] === b ? null : this.options[g]
                    }
                    j[g] = h
                }
            }
            return this._setOptions(j), this
        },
        _setOptions: function(h) {
            var g;
            for (g in h) {
                this._setOption(g, h[g])
            }
            return this
        },
        _setOption: function(h, g) {
            return this.options[h] = g, "disabled" === h && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!g).attr("aria-disabled", g), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(g, h, k) {
            var e,
                j = this;
            "boolean" != typeof g && (k = h, h = g, g = !1),
            k ? (h = e = d(h), this.bindings = this.bindings.add(h)) : (k = h, h = this.element, e = this.widget()),
            d.each(k, function(v, q) {
                function p() {
                    return g || j.options.disabled !== !0 && !d(this).hasClass("ui-state-disabled") ? ("string" == typeof q ? j[q] : q).apply(j, arguments) : b
                }
                "string" != typeof q && (p.guid = q.guid = q.guid || p.guid || d.guid++);
                var m = v.match(/^(\w+)\s*(.*)$/),
                    o = m[1] + j.eventNamespace,
                    t = m[2];
                t ? e.delegate(t, o, p) : h.bind(o, p)
            })
        },
        _off: function(h, g) {
            g = (g || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            h.unbind(g).undelegate(g)
        },
        _delay: function(k, h) {
            function g() {
                return ("string" == typeof k ? j[k] : k).apply(j, arguments)
            }
            var j = this;
            return setTimeout(g, h || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function(g) {
                    d(g.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(g) {
                    d(g.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function(g) {
                    d(g.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(g) {
                    d(g.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(h, g, j) {
            var l,
                e,
                k = this.options[h];
            if (j = j || {}, g = d.Event(g), g.type = (h === this.widgetEventPrefix ? h : this.widgetEventPrefix + h).toLowerCase(), g.target = this.element[0], e = g.originalEvent) {
                for (l in e) {
                    l in g || (g[l] = e[l])
                }
            }
            return this.element.trigger(g, j), !(d.isFunction(k) && k.apply(this.element[0], [g].concat(j)) === !1 || g.isDefaultPrevented())
        }
    },
    d.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(g, e) {
        d.Widget.prototype["_" + g] = function(j, m, h) {
            "string" == typeof m && (m = {
                effect: m
            });
            var l,
                k = m ? m === !0 || "number" == typeof m ? e : m.effect || e : g;
            m = m || {},
            "number" == typeof m && (m = {
                duration: m
            }),
            l = !d.isEmptyObject(m),
            m.complete = h,
            m.delay && j.delay(m.delay),
            l && d.effects && d.effects.effect[k] ? j[g](m) : k !== g && j[k] ? j[k](m.duration, m.easing, h) : j.queue(function(n) {
                d(this)[g](),
                h && h.call(j[0]),
                n()
            })
        }
    })
})(jQuery);
(function(b) {
    var a = !1;
    b(document).mouseup(function() {
        a = !1
    }),
    b.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function(d) {
                return c._mouseDown(d)
            }).bind("click." + this.widgetName, function(d) {
                return !0 === b.data(d.target, c.widgetName + ".preventClickEvent") ? (b.removeData(d.target, c.widgetName + ".preventClickEvent"), d.stopImmediatePropagation(), !1) : undefined
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(d) {
            if (!a) {
                this._mouseStarted && this._mouseUp(d),
                this._mouseDownEvent = d;
                var e = this,
                    f = 1 === d.which,
                    c = "string" == typeof this.options.cancel && d.target.nodeName ? b(d.target).closest(this.options.cancel).length : !1;
                return f && !c && this._mouseCapture(d) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(d) && this._mouseDelayMet(d) && (this._mouseStarted = this._mouseStart(d) !== !1, !this._mouseStarted) ? (d.preventDefault(), !0) : (!0 === b.data(d.target, this.widgetName + ".preventClickEvent") && b.removeData(d.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(g) {
                    return e._mouseMove(g)
                }, this._mouseUpDelegate = function(g) {
                    return e._mouseUp(g)
                }, b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), d.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function(c) {
            return b.ui.ie && (!document.documentMode || 9 > document.documentMode) && !c.button ? this._mouseUp(c) : this._mouseStarted ? (this._mouseDrag(c), c.preventDefault()) : (this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== !1, this._mouseStarted ? this._mouseDrag(c) : this._mouseUp(c)), !this._mouseStarted)
        },
        _mouseUp: function(c) {
            return b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, c.target === this._mouseDownEvent.target && b.data(c.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(c)), !1
        },
        _mouseDistanceMet: function(c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
})(jQuery);
(function(x, C) {
    function q(d, c, a) {
        return [parseFloat(d[0]) * (g.test(d[0]) ? c / 100 : 1), parseFloat(d[1]) * (g.test(d[1]) ? a / 100 : 1)]
    }
    function D(c, a) {
        return parseInt(x.css(c, a), 10) || 0
    }
    function k(c) {
        var a = c[0];
        return 9 === a.nodeType ? {
            width: c.width(),
            height: c.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : x.isWindow(a) ? {
            width: c.width(),
            height: c.height(),
            offset: {
                top: c.scrollTop(),
                left: c.scrollLeft()
            }
        } : a.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: a.pageY,
                left: a.pageX
            }
        } : {
            width: c.outerWidth(),
            height: c.outerHeight(),
            offset: c.offset()
        }
    }
    x.ui = x.ui || {};
    var A,
        j = Math.max,
        b = Math.abs,
        v = Math.round,
        m = /left|center|right/,
        B = /top|center|bottom/,
        z = /[\+\-]\d+(\.[\d]+)?%?/,
        y = /^\w+/,
        g = /%$/,
        w = x.fn.position;
    x.position = {
        scrollbarWidth: function() {
            if (A !== C) {
                return A
            }
            var a,
                c,
                e = x("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                d = e.children()[0];
            return x("body").append(e), a = d.offsetWidth, e.css("overflow", "scroll"), c = d.offsetWidth, a === c && (c = e[0].clientWidth), e.remove(), A = a - c
        },
        getScrollInfo: function(e) {
            var d = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                f = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                h = "scroll" === d || "auto" === d && e.width < e.element[0].scrollWidth,
                c = "scroll" === f || "auto" === f && e.height < e.element[0].scrollHeight;
            return {
                width: c ? x.position.scrollbarWidth() : 0,
                height: h ? x.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(c) {
            var a = x(c || window),
                d = x.isWindow(a[0]),
                e = !!a[0] && 9 === a[0].nodeType;
            return {
                element: a,
                isWindow: d,
                isDocument: e,
                offset: a.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: a.scrollLeft(),
                scrollTop: a.scrollTop(),
                width: d ? a.width() : a.outerWidth(),
                height: d ? a.height() : a.outerHeight()
            }
        }
    },
    x.fn.position = function(F) {
        if (!F || !F.of) {
            return w.apply(this, arguments)
        }
        F = x.extend({}, F);
        var o,
            c,
            d,
            f,
            E,
            l,
            u = x(F.of),
            h = x.position.getWithinInfo(F.within),
            n = x.position.getScrollInfo(h),
            r = (F.collision || "flip").split(" "),
            e = {};
        return l = k(u), u[0].preventDefault && (F.at = "left top"), c = l.width, d = l.height, f = l.offset, E = x.extend({}, f), x.each(["my", "at"], function() {
            var t,
                a,
                p = (F[this] || "").split(" ");
            1 === p.length && (p = m.test(p[0]) ? p.concat(["center"]) : B.test(p[0]) ? ["center"].concat(p) : ["center", "center"]),
            p[0] = m.test(p[0]) ? p[0] : "center",
            p[1] = B.test(p[1]) ? p[1] : "center",
            t = z.exec(p[0]),
            a = z.exec(p[1]),
            e[this] = [t ? t[0] : 0, a ? a[0] : 0],
            F[this] = [y.exec(p[0])[0], y.exec(p[1])[0]]
        }), 1 === r.length && (r[1] = r[0]), "right" === F.at[0] ? E.left += c : "center" === F.at[0] && (E.left += c / 2), "bottom" === F.at[1] ? E.top += d : "center" === F.at[1] && (E.top += d / 2), o = q(e.at, c, d), E.left += o[0], E.top += o[1], this.each(function() {
            var t,
                G,
                O = x(this),
                L = O.outerWidth(),
                K = O.outerHeight(),
                I = D(this, "marginLeft"),
                N = D(this, "marginTop"),
                a = L + I + D(this, "marginRight") + n.width,
                H = K + N + D(this, "marginBottom") + n.height,
                J = x.extend({}, E),
                p = q(e.my, O.outerWidth(), O.outerHeight());
            "right" === F.my[0] ? J.left -= L : "center" === F.my[0] && (J.left -= L / 2),
            "bottom" === F.my[1] ? J.top -= K : "center" === F.my[1] && (J.top -= K / 2),
            J.left += p[0],
            J.top += p[1],
            x.support.offsetFractions || (J.left = v(J.left), J.top = v(J.top)),
            t = {
                marginLeft: I,
                marginTop: N
            },
            x.each(["left", "top"], function(M, P) {
                x.ui.position[r[M]] && x.ui.position[r[M]][P](J, {
                    targetWidth: c,
                    targetHeight: d,
                    elemWidth: L,
                    elemHeight: K,
                    collisionPosition: t,
                    collisionWidth: a,
                    collisionHeight: H,
                    offset: [o[0] + p[0], o[1] + p[1]],
                    my: F.my,
                    at: F.at,
                    within: h,
                    elem: O
                })
            }),
            F.using && (G = function(S) {
                var P = f.left - J.left,
                    R = P + c - L,
                    T = f.top - J.top,
                    M = T + d - K,
                    Q = {
                        target: {
                            element: u,
                            left: f.left,
                            top: f.top,
                            width: c,
                            height: d
                        },
                        element: {
                            element: O,
                            left: J.left,
                            top: J.top,
                            width: L,
                            height: K
                        },
                        horizontal: 0 > R ? "left" : P > 0 ? "right" : "center",
                        vertical: 0 > M ? "top" : T > 0 ? "bottom" : "middle"
                    };
                L > c && c > b(P + R) && (Q.horizontal = "center"),
                K > d && d > b(T + M) && (Q.vertical = "middle"),
                Q.important = j(b(P), b(R)) > j(b(T), b(M)) ? "horizontal" : "vertical",
                F.using.call(this, S, Q)
            }),
            O.offset(x.extend(J, {
                using: G
            }))
        })
    },
    x.ui.position = {
        fit: {
            left: function(u, F) {
                var o,
                    G = F.within,
                    d = G.isWindow ? G.scrollLeft : G.offset.left,
                    E = G.width,
                    c = u.left - F.collisionPosition.marginLeft,
                    p = d - c,
                    f = c + F.collisionWidth - E - d;
                F.collisionWidth > E ? p > 0 && 0 >= f ? (o = u.left + p + F.collisionWidth - E - d, u.left += p - o) : u.left = f > 0 && 0 >= p ? d : p > f ? d + E - F.collisionWidth : d : p > 0 ? u.left += p : f > 0 ? u.left -= f : u.left = j(u.left - c, u.left)
            },
            top: function(u, F) {
                var o,
                    G = F.within,
                    d = G.isWindow ? G.scrollTop : G.offset.top,
                    E = F.within.height,
                    c = u.top - F.collisionPosition.marginTop,
                    p = d - c,
                    f = c + F.collisionHeight - E - d;
                F.collisionHeight > E ? p > 0 && 0 >= f ? (o = u.top + p + F.collisionHeight - E - d, u.top += p - o) : u.top = f > 0 && 0 >= p ? d : p > f ? d + E - F.collisionHeight : d : p > 0 ? u.top += p : f > 0 ? u.top -= f : u.top = j(u.top - c, u.top)
            }
        },
        flip: {
            left: function(K, P) {
                var H,
                    Q,
                    F = P.within,
                    N = F.offset.left + F.scrollLeft,
                    E = F.width,
                    I = F.isWindow ? F.scrollLeft : F.offset.left,
                    G = K.left - P.collisionPosition.marginLeft,
                    O = G - I,
                    M = G + P.collisionWidth - E - I,
                    L = "left" === P.my[0] ? -P.elemWidth : "right" === P.my[0] ? P.elemWidth : 0,
                    r = "left" === P.at[0] ? P.targetWidth : "right" === P.at[0] ? -P.targetWidth : 0,
                    J = -2 * P.offset[0];
                0 > O ? (H = K.left + L + r + J + P.collisionWidth - E - N, (0 > H || b(O) > H) && (K.left += L + r + J)) : M > 0 && (Q = K.left - P.collisionPosition.marginLeft + L + r + J - I, (Q > 0 || M > b(Q)) && (K.left += L + r + J))
            },
            top: function(L, Q) {
                var I,
                    R,
                    F = Q.within,
                    O = F.offset.top + F.scrollTop,
                    E = F.height,
                    J = F.isWindow ? F.scrollTop : F.offset.top,
                    H = L.top - Q.collisionPosition.marginTop,
                    P = H - J,
                    N = H + Q.collisionHeight - E - J,
                    M = "top" === Q.my[1],
                    r = M ? -Q.elemHeight : "bottom" === Q.my[1] ? Q.elemHeight : 0,
                    K = "top" === Q.at[1] ? Q.targetHeight : "bottom" === Q.at[1] ? -Q.targetHeight : 0,
                    G = -2 * Q.offset[1];
                0 > P ? (R = L.top + r + K + G + Q.collisionHeight - E - O, L.top + r + K + G > P && (0 > R || b(P) > R) && (L.top += r + K + G)) : N > 0 && (I = L.top - Q.collisionPosition.marginTop + r + K + G - J, L.top + r + K + G > N && (I > 0 || N > b(I)) && (L.top += r + K + G))
            }
        },
        flipfit: {
            left: function() {
                x.ui.position.flip.left.apply(this, arguments),
                x.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                x.ui.position.flip.top.apply(this, arguments),
                x.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var e,
            d,
            f,
            p,
            c,
            l = document.getElementsByTagName("body")[0],
            h = document.createElement("div");
        e = document.createElement(l ? "div" : "body"),
        f = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        },
        l && x.extend(f, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (c in f) {
            e.style[c] = f[c]
        }
        e.appendChild(h),
        d = l || document.documentElement,
        d.insertBefore(e, d.firstChild),
        h.style.cssText = "position: absolute; left: 10.7432222px;",
        p = x(h).offset().left,
        x.support.offsetFractions = p > 10 && 11 > p,
        e.innerHTML = "",
        d.removeChild(e)
    }()
})(jQuery);
(function(a) {
    a.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var d,
                c,
                e,
                g = this.element[0].nodeName.toLowerCase(),
                b = "textarea" === g,
                f = "input" === g;
            this.isMultiLine = b ? !0 : f ? !1 : this.element.prop("isContentEditable"),
            this.valueMethod = this.element[b || f ? "val" : "text"],
            this.isNewMenu = !0,
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(j) {
                    if (this.element.prop("readOnly")) {
                        return d = !0, e = !0, c = !0, undefined
                    }
                    d = !1,
                    e = !1,
                    c = !1;
                    var h = a.ui.keyCode;
                    switch (j.keyCode) {
                    case h.PAGE_UP:
                        d = !0,
                        this._move("previousPage", j);
                        break;
                    case h.PAGE_DOWN:
                        d = !0,
                        this._move("nextPage", j);
                        break;
                    case h.UP:
                        d = !0,
                        this._keyEvent("previous", j);
                        break;
                    case h.DOWN:
                        d = !0,
                        this._keyEvent("next", j);
                        break;
                    case h.ENTER:
                    case h.NUMPAD_ENTER:
                        this.menu.active && (d = !0, j.preventDefault(), this.menu.select(j));
                        break;
                    case h.TAB:
                        this.menu.active && this.menu.select(j);
                        break;
                    case h.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term), this.close(j), j.preventDefault());
                        break;
                    default:
                        c = !0,
                        this._searchTimeout(j)
                    }
                },
                keypress: function(h) {
                    if (d) {
                        return d = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && h.preventDefault(), undefined
                    }
                    if (!c) {
                        var j = a.ui.keyCode;
                        switch (h.keyCode) {
                        case j.PAGE_UP:
                            this._move("previousPage", h);
                            break;
                        case j.PAGE_DOWN:
                            this._move("nextPage", h);
                            break;
                        case j.UP:
                            this._keyEvent("previous", h);
                            break;
                        case j.DOWN:
                            this._keyEvent("next", h)
                        }
                    }
                },
                input: function(h) {
                    return e ? (e = !1, h.preventDefault(), undefined) : (this._searchTimeout(h), undefined)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(h) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(h), this._change(h), undefined)
                }
            }),
            this._initSource(),
            this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"),
            this._on(this.menu.element, {
                mousedown: function(j) {
                    j.preventDefault(),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var h = this.menu.element[0];
                    a(j.target).closest(".ui-menu-item").length || this._delay(function() {
                        var k = this;
                        this.document.one("mousedown", function(l) {
                            l.target === k.element[0] || l.target === h || a.contains(h, l.target) || k.close()
                        })
                    })
                },
                menufocus: function(j, h) {
                    if (this.isNewMenu && (this.isNewMenu = !1, j.originalEvent && /^mouse/.test(j.originalEvent.type))) {
                        return this.menu.blur(), this.document.one("mousemove", function() {
                            a(j.target).trigger(j.originalEvent)
                        }), undefined
                    }
                    var k = h.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", j, {
                        item: k
                    }) ? j.originalEvent && /^key/.test(j.originalEvent.type) && this._value(k.value) : this.liveRegion.text(k.value)
                },
                menuselect: function(l, j) {
                    var h = j.item.data("ui-autocomplete-item"),
                        k = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = k, this._delay(function() {
                        this.previous = k,
                        this.selectedItem = h
                    })),
                    !1 !== this._trigger("select", l, {
                        item: h
                    }) && this._value(h.value),
                    this.term = this._value(),
                    this.close(l),
                    this.selectedItem = h
                }
            }),
            this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(c, b) {
            this._super(c, b),
            "source" === c && this._initSource(),
            "appendTo" === c && this.menu.element.appendTo(this._appendTo()),
            "disabled" === c && b && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var b = this.options.appendTo;
            return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b || (b = this.element.closest(".ui-front")), b.length || (b = this.document[0].body), b
        },
        _initSource: function() {
            var c,
                b,
                d = this;
            a.isArray(this.options.source) ? (c = this.options.source, this.source = function(e, f) {
                f(a.ui.autocomplete.filter(c, e.term))
            }) : "string" == typeof this.options.source ? (b = this.options.source, this.source = function(e, f) {
                d.xhr && d.xhr.abort(),
                d.xhr = a.ajax({
                    url: b,
                    data: e,
                    dataType: "json",
                    success: function(g) {
                        f(g)
                    },
                    error: function() {
                        f([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(b) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, b))
            }, this.options.delay)
        },
        search: function(c, b) {
            return c = null != c ? c : this._value(), this.term = this._value(), c.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(c) : undefined
        },
        _search: function(b) {
            this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: b
            }, this._response())
        },
        _response: function() {
            var b = ++this.requestIndex;
            return a.proxy(function(c) {
                b === this.requestIndex && this.__response(c),
                this.pending--,
                this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(b) {
            b && (b = this._normalize(b)),
            this._trigger("response", null, {
                content: b
            }),
            !this.options.disabled && b && b.length && !this.cancelSearch ? (this._suggest(b), this._trigger("open")) : this._close()
        },
        close: function(b) {
            this.cancelSearch = !0,
            this._close(b)
        },
        _close: function(b) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", b))
        },
        _change: function(b) {
            this.previous !== this._value() && this._trigger("change", b, {
                item: this.selectedItem
            })
        },
        _normalize: function(b) {
            return b.length && b[0].label && b[0].value ? b : a.map(b, function(c) {
                return "string" == typeof c ? {
                    label: c,
                    value: c
                } : a.extend({
                    label: c.label || c.value,
                    value: c.value || c.label
                }, c)
            })
        },
        _suggest: function(c) {
            var b = this.menu.element.empty();
            this._renderMenu(b, c),
            this.isNewMenu = !0,
            this.menu.refresh(),
            b.show(),
            this._resizeMenu(),
            b.position(a.extend({
                of: this.element
            }, this.options.position)),
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var b = this.menu.element;
            b.outerWidth(Math.max(b.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(c, b) {
            var d = this;
            a.each(b, function(g, f) {
                d._renderItemData(c, f)
            })
        },
        _renderItemData: function(c, b) {
            return this._renderItem(c, b).data("ui-autocomplete-item", b)
        },
        _renderItem: function(c, b) {
            return a("<li>").append(a("<a>").text(b.label)).appendTo(c)
        },
        _move: function(c, b) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(c) || this.menu.isLastItem() && /^next/.test(c) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[c](b), undefined) : (this.search(null, b), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(c, b) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(c, b), b.preventDefault())
        }
    }),
    a.extend(a.ui.autocomplete, {
        escapeRegex: function(b) {
            return b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(c, b) {
            var d = RegExp(a.ui.autocomplete.escapeRegex(b), "i");
            return a.grep(c, function(f) {
                return d.test(f.label || f.value || f)
            })
        }
    }),
    a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(b) {
                    return b + (b > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(c) {
            var b;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (b = c && c.length ? this.options.messages.results(c.length) : this.options.messages.noResults, this.liveRegion.text(b))
        }
    })
})(jQuery);
(function(g, d) {
    function c() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        g.extend(this._defaults, this.regional[""]),
        this.dpDiv = f(g("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function f(e) {
        var a = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(a, "mouseout", function() {
            g(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && g(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && g(this).removeClass("ui-datepicker-next-hover")
        }).delegate(a, "mouseover", function() {
            g.datepicker._isDisabledDatepicker(b.inline ? e.parent()[0] : b.input[0]) || (g(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), g(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && g(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && g(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function j(e, a) {
        g.extend(e, a);
        for (var k in a) {
            null == a[k] && (e[k] = a[k])
        }
        return e
    }
    g.extend(g.ui, {
        datepicker: {
            version: "1.10.4"
        }
    });
    var b,
        h = "datepicker";
    g.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            return j(this._defaults, a || {}), this
        },
        _attachDatepicker: function(l, k) {
            var m,
                o,
                e;
            m = l.nodeName.toLowerCase(),
            o = "div" === m || "span" === m,
            l.id || (this.uuid += 1, l.id = "dp" + this.uuid),
            e = this._newInst(g(l), o),
            e.settings = g.extend({}, k || {}),
            "input" === m ? this._connectDatepicker(l, e) : o && this._inlineDatepicker(l, e)
        },
        _newInst: function(e, a) {
            var k = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: k,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: a,
                dpDiv: a ? f(g("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, a) {
            var k = g(e);
            a.append = g([]),
            a.trigger = g([]),
            k.hasClass(this.markerClassName) || (this._attachments(k, a), k.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(a), g.data(e, h, a), a.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(l, k) {
            var m,
                u,
                e,
                q = this._get(k, "appendText"),
                p = this._get(k, "isRTL");
            k.append && k.append.remove(),
            q && (k.append = g("<span class='" + this._appendClass + "'>" + q + "</span>"), l[p ? "before" : "after"](k.append)),
            l.unbind("focus", this._showDatepicker),
            k.trigger && k.trigger.remove(),
            m = this._get(k, "showOn"),
            ("focus" === m || "both" === m) && l.focus(this._showDatepicker),
            ("button" === m || "both" === m) && (u = this._get(k, "buttonText"), e = this._get(k, "buttonImage"), k.trigger = g(this._get(k, "buttonImageOnly") ? g("<img/>").addClass(this._triggerClass).attr({
                src: e,
                alt: u,
                title: u
            }) : g("<button type='button'></button>").addClass(this._triggerClass).html(e ? g("<img/>").attr({
                src: e,
                alt: u,
                title: u
            }) : u)), l[p ? "before" : "after"](k.trigger), k.trigger.click(function() {
                return g.datepicker._datepickerShowing && g.datepicker._lastInput === l[0] ? g.datepicker._hideDatepicker() : g.datepicker._datepickerShowing && g.datepicker._lastInput !== l[0] ? (g.datepicker._hideDatepicker(), g.datepicker._showDatepicker(l[0])) : g.datepicker._showDatepicker(l[0]), !1
            }))
        },
        _autoSize: function(q) {
            if (this._get(q, "autoSize") && !q.inline) {
                var m,
                    l,
                    p,
                    u,
                    k = new Date(2009, 11, 20),
                    r = this._get(q, "dateFormat");
                r.match(/[DM]/) && (m = function(a) {
                    for (l = 0, p = 0, u = 0; a.length > u; u++) {
                        a[u].length > l && (l = a[u].length, p = u)
                    }
                    return p
                }, k.setMonth(m(this._get(q, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), k.setDate(m(this._get(q, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - k.getDay())),
                q.input.attr("size", this._formatDate(q, k).length)
            }
        },
        _inlineDatepicker: function(e, a) {
            var k = g(e);
            k.hasClass(this.markerClassName) || (k.addClass(this.markerClassName).append(a.dpDiv), g.data(e, h, a), this._setDate(a, this._getDefaultDate(a), !0), this._updateDatepicker(a), this._updateAlternate(a), a.settings.disabled && this._disableDatepicker(e), a.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(y, n, z, w, e) {
            var o,
                m,
                x,
                q,
                v,
                k = this._dialogInst;
            return k || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = g("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), g("body").append(this._dialogInput), k = this._dialogInst = this._newInst(this._dialogInput, !1), k.settings = {}, g.data(this._dialogInput[0], h, k)), j(k.settings, w || {}), n = n && n.constructor === Date ? this._formatDate(k, n) : n, this._dialogInput.val(n), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, this._pos || (m = document.documentElement.clientWidth, x = document.documentElement.clientHeight, q = document.documentElement.scrollLeft || document.body.scrollLeft, v = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [m / 2 - 100 + q, x / 2 - 150 + v]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), k.settings.onSelect = z, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), g.blockUI && g.blockUI(this.dpDiv), g.data(this._dialogInput[0], h, k), this
        },
        _destroyDatepicker: function(e) {
            var a,
                k = g(e),
                l = g.data(e, h);
            k.hasClass(this.markerClassName) && (a = e.nodeName.toLowerCase(), g.removeData(e, h), "input" === a ? (l.append.remove(), l.trigger.remove(), k.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === a || "span" === a) && k.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(l) {
            var k,
                m,
                o = g(l),
                e = g.data(l, h);
            o.hasClass(this.markerClassName) && (k = l.nodeName.toLowerCase(), "input" === k ? (l.disabled = !1, e.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === k || "span" === k) && (m = o.children("." + this._inlineClass), m.children().removeClass("ui-state-disabled"), m.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = g.map(this._disabledInputs, function(a) {
                return a === l ? null : a
            }))
        },
        _disableDatepicker: function(l) {
            var k,
                m,
                o = g(l),
                e = g.data(l, h);
            o.hasClass(this.markerClassName) && (k = l.nodeName.toLowerCase(), "input" === k ? (l.disabled = !0, e.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === k || "span" === k) && (m = o.children("." + this._inlineClass), m.children().addClass("ui-state-disabled"), m.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = g.map(this._disabledInputs, function(a) {
                return a === l ? null : a
            }), this._disabledInputs[this._disabledInputs.length] = l)
        },
        _isDisabledDatepicker: function(k) {
            if (!k) {
                return !1
            }
            for (var a = 0; this._disabledInputs.length > a; a++) {
                if (this._disabledInputs[a] === k) {
                    return !0
                }
            }
            return !1
        },
        _getInst: function(e) {
            try {
                return g.data(e, h)
            } catch (a) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(n, q, k) {
            var v,
                t,
                p,
                e,
                m = this._getInst(n);
            return 2 === arguments.length && "string" == typeof q ? "defaults" === q ? g.extend({}, g.datepicker._defaults) : m ? "all" === q ? g.extend({}, m.settings) : this._get(m, q) : null : (v = q || {}, "string" == typeof q && (v = {}, v[q] = k), m && (this._curInst === m && this._hideDatepicker(), t = this._getDateDatepicker(n, !0), p = this._getMinMaxDate(m, "min"), e = this._getMinMaxDate(m, "max"), j(m.settings, v), null !== p && v.dateFormat !== d && v.minDate === d && (m.settings.minDate = this._formatDate(m, p)), null !== e && v.dateFormat !== d && v.maxDate === d && (m.settings.maxDate = this._formatDate(m, e)), "disabled" in v && (v.disabled ? this._disableDatepicker(n) : this._enableDatepicker(n)), this._attachments(g(n), m), this._autoSize(m), this._setDate(m, t), this._updateAlternate(m), this._updateDatepicker(m)), d)
        },
        _changeDatepicker: function(l, k, a) {
            this._optionDatepicker(l, k, a)
        },
        _refreshDatepicker: function(k) {
            var a = this._getInst(k);
            a && this._updateDatepicker(a)
        },
        _setDateDatepicker: function(l, k) {
            var a = this._getInst(l);
            a && (this._setDate(a, k), this._updateDatepicker(a), this._updateAlternate(a))
        },
        _getDateDatepicker: function(l, k) {
            var a = this._getInst(l);
            return a && !a.inline && this._setDateFromField(a, k), a ? this._getDate(a) : null
        },
        _doKeyDown: function(l) {
            var k,
                m,
                u,
                e = g.datepicker._getInst(l.target),
                q = !0,
                p = e.dpDiv.is(".ui-datepicker-rtl");
            if (e._keyEvent = !0, g.datepicker._datepickerShowing) {
                switch (l.keyCode) {
                case 9:
                    g.datepicker._hideDatepicker(),
                    q = !1;
                    break;
                case 13:
                    return u = g("td." + g.datepicker._dayOverClass + ":not(." + g.datepicker._currentClass + ")", e.dpDiv), u[0] && g.datepicker._selectDay(l.target, e.selectedMonth, e.selectedYear, u[0]), k = g.datepicker._get(e, "onSelect"), k ? (m = g.datepicker._formatDate(e), k.apply(e.input ? e.input[0] : null, [m, e])) : g.datepicker._hideDatepicker(), !1;
                case 27:
                    g.datepicker._hideDatepicker();
                    break;
                case 33:
                    g.datepicker._adjustDate(l.target, l.ctrlKey ? -g.datepicker._get(e, "stepBigMonths") : -g.datepicker._get(e, "stepMonths"), "M");
                    break;
                case 34:
                    g.datepicker._adjustDate(l.target, l.ctrlKey ? +g.datepicker._get(e, "stepBigMonths") : +g.datepicker._get(e, "stepMonths"), "M");
                    break;
                case 35:
                    (l.ctrlKey || l.metaKey) && g.datepicker._clearDate(l.target),
                    q = l.ctrlKey || l.metaKey;
                    break;
                case 36:
                    (l.ctrlKey || l.metaKey) && g.datepicker._gotoToday(l.target),
                    q = l.ctrlKey || l.metaKey;
                    break;
                case 37:
                    (l.ctrlKey || l.metaKey) && g.datepicker._adjustDate(l.target, p ? 1 : -1, "D"),
                    q = l.ctrlKey || l.metaKey,
                    l.originalEvent.altKey && g.datepicker._adjustDate(l.target, l.ctrlKey ? -g.datepicker._get(e, "stepBigMonths") : -g.datepicker._get(e, "stepMonths"), "M");
                    break;
                case 38:
                    (l.ctrlKey || l.metaKey) && g.datepicker._adjustDate(l.target, -7, "D"),
                    q = l.ctrlKey || l.metaKey;
                    break;
                case 39:
                    (l.ctrlKey || l.metaKey) && g.datepicker._adjustDate(l.target, p ? -1 : 1, "D"),
                    q = l.ctrlKey || l.metaKey,
                    l.originalEvent.altKey && g.datepicker._adjustDate(l.target, l.ctrlKey ? +g.datepicker._get(e, "stepBigMonths") : +g.datepicker._get(e, "stepMonths"), "M");
                    break;
                case 40:
                    (l.ctrlKey || l.metaKey) && g.datepicker._adjustDate(l.target, 7, "D"),
                    q = l.ctrlKey || l.metaKey;
                    break;
                default:
                    q = !1
                }
            } else {
                36 === l.keyCode && l.ctrlKey ? g.datepicker._showDatepicker(this) : q = !1
            }
            q && (l.preventDefault(), l.stopPropagation())
        },
        _doKeyPress: function(k) {
            var l,
                m,
                e = g.datepicker._getInst(k.target);
            return g.datepicker._get(e, "constrainInput") ? (l = g.datepicker._possibleChars(g.datepicker._get(e, "dateFormat")), m = String.fromCharCode(null == k.charCode ? k.keyCode : k.charCode), k.ctrlKey || k.metaKey || " " > m || !l || l.indexOf(m) > -1) : d
        },
        _doKeyUp: function(e) {
            var a,
                k = g.datepicker._getInst(e.target);
            if (k.input.val() !== k.lastVal) {
                try {
                    a = g.datepicker.parseDate(g.datepicker._get(k, "dateFormat"), k.input ? k.input.val() : null, g.datepicker._getFormatConfig(k)),
                    a && (g.datepicker._setDateFromField(k), g.datepicker._updateAlternate(k), g.datepicker._updateDatepicker(k))
                } catch (l) {}
            }
            return !0
        },
        _showDatepicker: function(n) {
            if (n = n.target || n, "input" !== n.nodeName.toLowerCase() && (n = g("input", n.parentNode)[0]), !g.datepicker._isDisabledDatepicker(n) && g.datepicker._lastInput !== n) {
                var m,
                    q,
                    k,
                    v,
                    u,
                    p,
                    e;
                m = g.datepicker._getInst(n),
                g.datepicker._curInst && g.datepicker._curInst !== m && (g.datepicker._curInst.dpDiv.stop(!0, !0), m && g.datepicker._datepickerShowing && g.datepicker._hideDatepicker(g.datepicker._curInst.input[0])),
                q = g.datepicker._get(m, "beforeShow"),
                k = q ? q.apply(n, [n, m]) : {},
                k !== !1 && (j(m.settings, k), m.lastVal = null, g.datepicker._lastInput = n, g.datepicker._setDateFromField(m), g.datepicker._inDialog && (n.value = ""), g.datepicker._pos || (g.datepicker._pos = g.datepicker._findPos(n), g.datepicker._pos[1] += n.offsetHeight), v = !1, g(n).parents().each(function() {
                    return v |= "fixed" === g(this).css("position"), !v
                }), u = {
                    left: g.datepicker._pos[0],
                    top: g.datepicker._pos[1]
                }, g.datepicker._pos = null, m.dpDiv.empty(), m.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), g.datepicker._updateDatepicker(m), u = g.datepicker._checkOffset(m, u, v), m.dpDiv.css({
                    position: g.datepicker._inDialog && g.blockUI ? "static" : v ? "fixed" : "absolute",
                    display: "none",
                    left: u.left + "px",
                    top: u.top + "px"
                }), m.inline || (p = g.datepicker._get(m, "showAnim"), e = g.datepicker._get(m, "duration"), m.dpDiv.zIndex(g(n).zIndex() + 1), g.datepicker._datepickerShowing = !0, g.effects && g.effects.effect[p] ? m.dpDiv.show(p, g.datepicker._get(m, "showOptions"), e) : m.dpDiv[p || "show"](p ? e : null), g.datepicker._shouldFocusInput(m) && m.input.focus(), g.datepicker._curInst = m))
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4,
            b = e,
            e.dpDiv.empty().append(this._generateHTML(e)),
            this._attachHandlers(e),
            e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var a,
                k = this._getNumberOfMonths(e),
                m = k[1],
                l = 17;
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            m > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + m).css("width", l * m + "em"),
            e.dpDiv[(1 !== k[0] || 1 !== k[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            e === g.datepicker._curInst && g.datepicker._datepickerShowing && g.datepicker._shouldFocusInput(e) && e.input.focus(),
            e.yearshtml && (a = e.yearshtml, setTimeout(function() {
                a === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),
                a = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
        },
        _checkOffset: function(w, q, x) {
            var m = w.dpDiv.outerWidth(),
                v = w.dpDiv.outerHeight(),
                k = w.input ? w.input.outerWidth() : 0,
                e = w.input ? w.input.outerHeight() : 0,
                u = document.documentElement.clientWidth + (x ? 0 : g(document).scrollLeft()),
                p = document.documentElement.clientHeight + (x ? 0 : g(document).scrollTop());
            return q.left -= this._get(w, "isRTL") ? m - k : 0, q.left -= x && q.left === w.input.offset().left ? g(document).scrollLeft() : 0, q.top -= x && q.top === w.input.offset().top + e ? g(document).scrollTop() : 0, q.left -= Math.min(q.left, q.left + m > u && u > m ? Math.abs(q.left + m - u) : 0), q.top -= Math.min(q.top, q.top + v > p && p > v ? Math.abs(v + e) : 0), q
        },
        _findPos: function(e) {
            for (var a, k = this._getInst(e), l = this._get(k, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || g.expr.filters.hidden(e));) {
                e = e[l ? "previousSibling" : "nextSibling"]
            }
            return a = g(e).offset(), [a.left, a.top]
        },
        _hideDatepicker: function(l) {
            var k,
                m,
                p,
                e,
                o = this._curInst;
            !o || l && o !== g.data(l, h) || this._datepickerShowing && (k = this._get(o, "showAnim"), m = this._get(o, "duration"), p = function() {
                g.datepicker._tidyDialog(o)
            }, g.effects && (g.effects.effect[k] || g.effects[k]) ? o.dpDiv.hide(k, g.datepicker._get(o, "showOptions"), m, p) : o.dpDiv["slideDown" === k ? "slideUp" : "fadeIn" === k ? "fadeOut" : "hide"](k ? m : null, p), k || p(), this._datepickerShowing = !1, e = this._get(o, "onClose"), e && e.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), g.blockUI && (g.unblockUI(), g("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if (g.datepicker._curInst) {
                var a = g(e.target),
                    k = g.datepicker._getInst(a[0]);
                (a[0].id !== g.datepicker._mainDivId && 0 === a.parents("#" + g.datepicker._mainDivId).length && !a.hasClass(g.datepicker.markerClassName) && !a.closest("." + g.datepicker._triggerClass).length && g.datepicker._datepickerShowing && (!g.datepicker._inDialog || !g.blockUI) || a.hasClass(g.datepicker.markerClassName) && g.datepicker._curInst !== k) && g.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(l, k, m) {
            var o = g(l),
                e = this._getInst(o[0]);
            this._isDisabledDatepicker(o[0]) || (this._adjustInstDate(e, k + ("M" === m ? this._get(e, "showCurrentAtPos") : 0), m), this._updateDatepicker(e))
        },
        _gotoToday: function(e) {
            var a,
                k = g(e),
                l = this._getInst(k[0]);
            this._get(l, "gotoCurrent") && l.currentDay ? (l.selectedDay = l.currentDay, l.drawMonth = l.selectedMonth = l.currentMonth, l.drawYear = l.selectedYear = l.currentYear) : (a = new Date, l.selectedDay = a.getDate(), l.drawMonth = l.selectedMonth = a.getMonth(), l.drawYear = l.selectedYear = a.getFullYear()),
            this._notifyChange(l),
            this._adjustDate(k)
        },
        _selectMonthYear: function(l, k, m) {
            var o = g(l),
                e = this._getInst(o[0]);
            e["selected" + ("M" === m ? "Month" : "Year")] = e["draw" + ("M" === m ? "Month" : "Year")] = parseInt(k.options[k.selectedIndex].value, 10),
            this._notifyChange(e),
            this._adjustDate(o)
        },
        _selectDay: function(l, k, m, q) {
            var e,
                p = g(l);
            g(q).hasClass(this._unselectableClass) || this._isDisabledDatepicker(p[0]) || (e = this._getInst(p[0]), e.selectedDay = e.currentDay = g("a", q).html(), e.selectedMonth = e.currentMonth = k, e.selectedYear = e.currentYear = m, this._selectDate(l, this._formatDate(e, e.currentDay, e.currentMonth, e.currentYear)))
        },
        _clearDate: function(e) {
            var a = g(e);
            this._selectDate(a, "")
        },
        _selectDate: function(l, k) {
            var m,
                o = g(l),
                e = this._getInst(o[0]);
            k = null != k ? k : this._formatDate(e),
            e.input && e.input.val(k),
            this._updateAlternate(e),
            m = this._get(e, "onSelect"),
            m ? m.apply(e.input ? e.input[0] : null, [k, e]) : e.input && e.input.trigger("change"),
            e.inline ? this._updateDatepicker(e) : (this._hideDatepicker(), this._lastInput = e.input[0], "object" != typeof e.input[0] && e.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(l) {
            var k,
                m,
                o,
                e = this._get(l, "altField");
            e && (k = this._get(l, "altFormat") || this._get(l, "dateFormat"), m = this._getDate(l), o = this.formatDate(k, m, this._getFormatConfig(l)), g(e).each(function() {
                g(this).val(o)
            }))
        },
        noWeekends: function(k) {
            var a = k.getDay();
            return [a > 0 && 6 > a, ""]
        },
        iso8601Week: function(l) {
            var k,
                a = new Date(l.getTime());
            return a.setDate(a.getDate() + 4 - (a.getDay() || 7)), k = a.getTime(), a.setMonth(0), a.setDate(1), Math.floor(Math.round((k - a) / 86400000) / 7) + 1
        },
        parseDate: function(L, C, H) {
            if (null == L || null == C) {
                throw "Invalid arguments"
            }
            if (C = "object" == typeof C ? "" + C : C + "", "" === C) {
                return null
            }
            var S,
                G,
                E,
                M,
                J = 0,
                A = (H ? H.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                P = "string" != typeof A ? A : (new Date).getFullYear() % 100 + parseInt(A, 10),
                Q = (H ? H.dayNamesShort : null) || this._defaults.dayNamesShort,
                F = (H ? H.dayNames : null) || this._defaults.dayNames,
                O = (H ? H.monthNamesShort : null) || this._defaults.monthNamesShort,
                I = (H ? H.monthNames : null) || this._defaults.monthNames,
                N = -1,
                z = -1,
                T = -1,
                e = -1,
                R = !1,
                q = function(k) {
                    var a = L.length > S + 1 && L.charAt(S + 1) === k;
                    return a && S++, a
                },
                K = function(o) {
                    var m = q(o),
                        l = "@" === o ? 14 : "!" === o ? 20 : "y" === o && m ? 4 : "o" === o ? 3 : 2,
                        p = RegExp("^\\d{1," + l + "}"),
                        k = C.substring(J).match(p);
                    if (!k) {
                        throw "Missing number at position " + J
                    }
                    return J += k[0].length, parseInt(k[0], 10)
                },
                t = function(l, u, k) {
                    var p = -1,
                        m = g.map(q(l) ? k : u, function(n, a) {
                            return [[a, n]]
                        }).sort(function(n, a) {
                            return -(n[1].length - a[1].length)
                        });
                    if (g.each(m, function(o, a) {
                        var r = a[1];
                        return C.substr(J, r.length).toLowerCase() === r.toLowerCase() ? (p = a[0], J += r.length, !1) : d
                    }), -1 !== p) {
                        return p + 1
                    }
                    throw "Unknown name at position " + J
                },
                B = function() {
                    if (C.charAt(J) !== L.charAt(S)) {
                        throw "Unexpected literal at position " + J
                    }
                    J++
                };
            for (S = 0; L.length > S; S++) {
                if (R) {
                    "'" !== L.charAt(S) || q("'") ? B() : R = !1
                } else {
                    switch (L.charAt(S)) {
                    case "d":
                        T = K("d");
                        break;
                    case "D":
                        t("D", Q, F);
                        break;
                    case "o":
                        e = K("o");
                        break;
                    case "m":
                        z = K("m");
                        break;
                    case "M":
                        z = t("M", O, I);
                        break;
                    case "y":
                        N = K("y");
                        break;
                    case "@":
                        M = new Date(K("@")),
                        N = M.getFullYear(),
                        z = M.getMonth() + 1,
                        T = M.getDate();
                        break;
                    case "!":
                        M = new Date((K("!") - this._ticksTo1970) / 10000),
                        N = M.getFullYear(),
                        z = M.getMonth() + 1,
                        T = M.getDate();
                        break;
                    case "'":
                        q("'") ? B() : R = !0;
                        break;
                    default:
                        B()
                    }
                }
            }
            if (C.length > J && (E = C.substr(J), !/^\s+/.test(E))) {
                throw "Extra/unparsed characters found in date: " + E
            }
            if (-1 === N ? N = (new Date).getFullYear() : 100 > N && (N += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (P >= N ? 0 : -100)), e > -1) {
                for (z = 1, T = e;;) {
                    if (G = this._getDaysInMonth(N, z - 1), G >= T) {
                        break
                    }
                    z++,
                    T -= G
                }
            }
            if (M = this._daylightSavingAdjust(new Date(N, z - 1, T)), M.getFullYear() !== N || M.getMonth() + 1 !== z || M.getDate() !== T) {
                throw "Invalid date"
            }
            return M
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 10000000 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(x, C, v) {
            if (!C) {
                return ""
            }
            var D,
                p = (v ? v.dayNamesShort : null) || this._defaults.dayNamesShort,
                A = (v ? v.dayNames : null) || this._defaults.dayNames,
                m = (v ? v.monthNamesShort : null) || this._defaults.monthNamesShort,
                k = (v ? v.monthNames : null) || this._defaults.monthNames,
                w = function(e) {
                    var a = x.length > D + 1 && x.charAt(D + 1) === e;
                    return a && D++, a
                },
                q = function(o, l, a) {
                    var n = "" + l;
                    if (w(o)) {
                        for (; a > n.length;) {
                            n = "0" + n
                        }
                    }
                    return n
                },
                B = function(o, l, a, n) {
                    return w(o) ? n[l] : a[l]
                },
                y = "",
                z = !1;
            if (C) {
                for (D = 0; x.length > D; D++) {
                    if (z) {
                        "'" !== x.charAt(D) || w("'") ? y += x.charAt(D) : z = !1
                    } else {
                        switch (x.charAt(D)) {
                        case "d":
                            y += q("d", C.getDate(), 2);
                            break;
                        case "D":
                            y += B("D", C.getDay(), p, A);
                            break;
                        case "o":
                            y += q("o", Math.round((new Date(C.getFullYear(), C.getMonth(), C.getDate()).getTime() - new Date(C.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            y += q("m", C.getMonth() + 1, 2);
                            break;
                        case "M":
                            y += B("M", C.getMonth(), m, k);
                            break;
                        case "y":
                            y += w("y") ? C.getFullYear() : (10 > C.getYear() % 100 ? "0" : "") + C.getYear() % 100;
                            break;
                        case "@":
                            y += C.getTime();
                            break;
                        case "!":
                            y += 10000 * C.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            w("'") ? y += "'" : z = !0;
                            break;
                        default:
                            y += x.charAt(D)
                        }
                    }
                }
            }
            return y
        },
        _possibleChars: function(m) {
            var k,
                a = "",
                l = !1,
                o = function(e) {
                    var n = m.length > k + 1 && m.charAt(k + 1) === e;
                    return n && k++, n
                };
            for (k = 0; m.length > k; k++) {
                if (l) {
                    "'" !== m.charAt(k) || o("'") ? a += m.charAt(k) : l = !1
                } else {
                    switch (m.charAt(k)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        a += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        o("'") ? a += "'" : l = !0;
                        break;
                    default:
                        a += m.charAt(k)
                    }
                }
            }
            return a
        },
        _get: function(k, a) {
            return k.settings[a] !== d ? k.settings[a] : this._defaults[a]
        },
        _setDateFromField: function(u, m) {
            if (u.input.val() !== u.lastVal) {
                var l = this._get(u, "dateFormat"),
                    p = u.lastVal = u.input ? u.input.val() : null,
                    w = this._getDefaultDate(u),
                    k = w,
                    v = this._getFormatConfig(u);
                try {
                    k = this.parseDate(l, p, v) || w
                } catch (q) {
                    p = m ? "" : p
                }
                u.selectedDay = k.getDate(),
                u.drawMonth = u.selectedMonth = k.getMonth(),
                u.drawYear = u.selectedYear = k.getFullYear(),
                u.currentDay = p ? k.getDate() : 0,
                u.currentMonth = p ? k.getMonth() : 0,
                u.currentYear = p ? k.getFullYear() : 0,
                this._adjustInstDate(u)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(l, k, m) {
            var q = function(n) {
                    var a = new Date;
                    return a.setDate(a.getDate() + n), a
                },
                e = function(v) {
                    try {
                        return g.datepicker.parseDate(g.datepicker._get(l, "dateFormat"), v, g.datepicker._getFormatConfig(l))
                    } catch (x) {}
                    for (var A = (v.toLowerCase().match(/^c/) ? g.datepicker._getDate(l) : null) || new Date, u = A.getFullYear(), z = A.getMonth(), y = A.getDate(), w = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, t = w.exec(v); t;) {
                        switch (t[2] || "d") {
                        case "d":
                        case "D":
                            y += parseInt(t[1], 10);
                            break;
                        case "w":
                        case "W":
                            y += 7 * parseInt(t[1], 10);
                            break;
                        case "m":
                        case "M":
                            z += parseInt(t[1], 10),
                            y = Math.min(y, g.datepicker._getDaysInMonth(u, z));
                            break;
                        case "y":
                        case "Y":
                            u += parseInt(t[1], 10),
                            y = Math.min(y, g.datepicker._getDaysInMonth(u, z))
                        }
                        t = w.exec(v)
                    }
                    return new Date(u, z, y)
                },
                p = null == k || "" === k ? m : "string" == typeof k ? e(k) : "number" == typeof k ? isNaN(k) ? m : q(k) : new Date(k.getTime());
            return p = p && "Invalid Date" == "" + p ? m : p, p && (p.setHours(0), p.setMinutes(0), p.setSeconds(0), p.setMilliseconds(0)), this._daylightSavingAdjust(p)
        },
        _daylightSavingAdjust: function(a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
        },
        _setDate: function(q, m, l) {
            var p = !m,
                u = q.selectedMonth,
                k = q.selectedYear,
                r = this._restrictMinMax(q, this._determineDate(q, m, new Date));
            q.selectedDay = q.currentDay = r.getDate(),
            q.drawMonth = q.selectedMonth = q.currentMonth = r.getMonth(),
            q.drawYear = q.selectedYear = q.currentYear = r.getFullYear(),
            u === q.selectedMonth && k === q.selectedYear || l || this._notifyChange(q),
            this._adjustInstDate(q),
            q.input && q.input.val(p ? "" : this._formatDate(q))
        },
        _getDate: function(k) {
            var a = !k.currentYear || k.input && "" === k.input.val() ? null : this._daylightSavingAdjust(new Date(k.currentYear, k.currentMonth, k.currentDay));
            return a
        },
        _attachHandlers: function(e) {
            var a = this._get(e, "stepMonths"),
                k = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var l = {
                    prev: function() {
                        g.datepicker._adjustDate(k, -a, "M")
                    },
                    next: function() {
                        g.datepicker._adjustDate(k, +a, "M")
                    },
                    hide: function() {
                        g.datepicker._hideDatepicker()
                    },
                    today: function() {
                        g.datepicker._gotoToday(k)
                    },
                    selectDay: function() {
                        return g.datepicker._selectDay(k, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return g.datepicker._selectMonthYear(k, this, "M"), !1
                    },
                    selectYear: function() {
                        return g.datepicker._selectMonthYear(k, this, "Y"), !1
                    }
                };
                g(this).bind(this.getAttribute("data-event"), l[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(aY) {
            var aI,
                aU,
                aJ,
                aP,
                a2,
                aO,
                aK,
                aV,
                aR,
                aH,
                aZ,
                a0,
                aN,
                aX,
                aQ,
                aW,
                aG,
                a3,
                aD,
                a1,
                aE,
                aS,
                aF,
                ax,
                ag,
                an,
                ah,
                ay,
                am,
                ar,
                aA,
                ak,
                at,
                aC,
                av,
                aw,
                al,
                aT,
                ad,
                ai = new Date,
                ao = this._daylightSavingAdjust(new Date(ai.getFullYear(), ai.getMonth(), ai.getDate())),
                ab = this._get(aY, "isRTL"),
                az = this._get(aY, "showButtonPanel"),
                aq = this._get(aY, "hideIfNoPrevNext"),
                ap = this._get(aY, "navigationAsDateFormat"),
                aL = this._getNumberOfMonths(aY),
                ae = this._get(aY, "showCurrentAtPos"),
                af = this._get(aY, "stepMonths"),
                aj = 1 !== aL[0] || 1 !== aL[1],
                au = this._daylightSavingAdjust(aY.currentDay ? new Date(aY.currentYear, aY.currentMonth, aY.currentDay) : new Date(9999, 9, 9)),
                ac = this._getMinMaxDate(aY, "min"),
                aB = this._getMinMaxDate(aY, "max"),
                aa = aY.drawMonth - ae,
                aM = aY.drawYear;
            if (0 > aa && (aa += 12, aM--), aB) {
                for (aI = this._daylightSavingAdjust(new Date(aB.getFullYear(), aB.getMonth() - aL[0] * aL[1] + 1, aB.getDate())), aI = ac && ac > aI ? ac : aI; this._daylightSavingAdjust(new Date(aM, aa, 1)) > aI;) {
                    aa--,
                    0 > aa && (aa = 11, aM--)
                }
            }
            for (aY.drawMonth = aa, aY.drawYear = aM, aU = this._get(aY, "prevText"), aU = ap ? this.formatDate(aU, this._daylightSavingAdjust(new Date(aM, aa - af, 1)), this._getFormatConfig(aY)) : aU, aJ = this._canAdjustMonth(aY, -1, aM, aa) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + aU + "'><span class='ui-icon ui-icon-circle-triangle-" + (ab ? "e" : "w") + "'>" + aU + "</span></a>" : aq ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + aU + "'><span class='ui-icon ui-icon-circle-triangle-" + (ab ? "e" : "w") + "'>" + aU + "</span></a>", aP = this._get(aY, "nextText"), aP = ap ? this.formatDate(aP, this._daylightSavingAdjust(new Date(aM, aa + af, 1)), this._getFormatConfig(aY)) : aP, a2 = this._canAdjustMonth(aY, 1, aM, aa) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + aP + "'><span class='ui-icon ui-icon-circle-triangle-" + (ab ? "w" : "e") + "'>" + aP + "</span></a>" : aq ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + aP + "'><span class='ui-icon ui-icon-circle-triangle-" + (ab ? "w" : "e") + "'>" + aP + "</span></a>", aO = this._get(aY, "currentText"), aK = this._get(aY, "gotoCurrent") && aY.currentDay ? au : ao, aO = ap ? this.formatDate(aO, aK, this._getFormatConfig(aY)) : aO, aV = aY.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(aY, "closeText") + "</button>", aR = az ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (ab ? aV : "") + (this._isInRange(aY, aK) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aO + "</button>" : "") + (ab ? "" : aV) + "</div>" : "", aH = parseInt(this._get(aY, "firstDay"), 10), aH = isNaN(aH) ? 0 : aH, aZ = this._get(aY, "showWeek"), a0 = this._get(aY, "dayNames"), aN = this._get(aY, "dayNamesMin"), aX = this._get(aY, "monthNames"), aQ = this._get(aY, "monthNamesShort"), aW = this._get(aY, "beforeShowDay"), aG = this._get(aY, "showOtherMonths"), a3 = this._get(aY, "selectOtherMonths"), aD = this._getDefaultDate(aY), a1 = "", aS = 0; aL[0] > aS; aS++) {
                for (aF = "", this.maxRows = 4, ax = 0; aL[1] > ax; ax++) {
                    if (ag = this._daylightSavingAdjust(new Date(aM, aa, aY.selectedDay)), an = " ui-corner-all", ah = "", aj) {
                        if (ah += "<div class='ui-datepicker-group", aL[1] > 1) {
                            switch (ax) {
                            case 0:
                                ah += " ui-datepicker-group-first",
                                an = " ui-corner-" + (ab ? "right" : "left");
                                break;
                            case aL[1] - 1:
                                ah += " ui-datepicker-group-last",
                                an = " ui-corner-" + (ab ? "left" : "right");
                                break;
                            default:
                                ah += " ui-datepicker-group-middle",
                                an = ""
                            }
                        }
                        ah += "'>"
                    }
                    for (ah += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + an + "'>" + (/all|left/.test(an) && 0 === aS ? ab ? a2 : aJ : "") + (/all|right/.test(an) && 0 === aS ? ab ? aJ : a2 : "") + this._generateMonthYearHeader(aY, aa, aM, ac, aB, aS > 0 || ax > 0, aX, aQ) + "</div><table class='ui-datepicker-calendar'><thead><tr>", ay = aZ ? "<th class='ui-datepicker-week-col'>" + this._get(aY, "weekHeader") + "</th>" : "", aE = 0; 7 > aE; aE++) {
                        am = (aE + aH) % 7,
                        ay += "<th" + ((aE + aH + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + a0[am] + "'>" + aN[am] + "</span></th>"
                    }
                    for (ah += ay + "</tr></thead><tbody>", ar = this._getDaysInMonth(aM, aa), aM === aY.selectedYear && aa === aY.selectedMonth && (aY.selectedDay = Math.min(aY.selectedDay, ar)), aA = (this._getFirstDayOfMonth(aM, aa) - aH + 7) % 7, ak = Math.ceil((aA + ar) / 7), at = aj ? this.maxRows > ak ? this.maxRows : ak : ak, this.maxRows = at, aC = this._daylightSavingAdjust(new Date(aM, aa, 1 - aA)), av = 0; at > av; av++) {
                        for (ah += "<tr>", aw = aZ ? "<td class='ui-datepicker-week-col'>" + this._get(aY, "calculateWeek")(aC) + "</td>" : "", aE = 0; 7 > aE; aE++) {
                            al = aW ? aW.apply(aY.input ? aY.input[0] : null, [aC]) : [!0, ""],
                            aT = aC.getMonth() !== aa,
                            ad = aT && !a3 || !al[0] || ac && ac > aC || aB && aC > aB,
                            aw += "<td class='" + ((aE + aH + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aT ? " ui-datepicker-other-month" : "") + (aC.getTime() === ag.getTime() && aa === aY.selectedMonth && aY._keyEvent || aD.getTime() === aC.getTime() && aD.getTime() === ag.getTime() ? " " + this._dayOverClass : "") + (ad ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aT && !aG ? "" : " " + al[1] + (aC.getTime() === au.getTime() ? " " + this._currentClass : "") + (aC.getTime() === ao.getTime() ? " ui-datepicker-today" : "")) + "'" + (aT && !aG || !al[2] ? "" : " title='" + al[2].replace(/'/g, "'") + "'") + (ad ? "" : " data-handler='selectDay' data-event='click' data-month='" + aC.getMonth() + "' data-year='" + aC.getFullYear() + "'") + ">" + (aT && !aG ? " " : ad ? "<span class='ui-state-default'>" + aC.getDate() + "</span>" : "<a class='ui-state-default" + (aC.getTime() === ao.getTime() ? " ui-state-highlight" : "") + (aC.getTime() === au.getTime() ? " ui-state-active" : "") + (aT ? " ui-priority-secondary" : "") + "' href='#'>" + aC.getDate() + "</a>") + "</td>",
                            aC.setDate(aC.getDate() + 1),
                            aC = this._daylightSavingAdjust(aC)
                        }
                        ah += aw + "</tr>"
                    }
                    aa++,
                    aa > 11 && (aa = 0, aM++),
                    ah += "</tbody></table>" + (aj ? "</div>" + (aL[0] > 0 && ax === aL[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                    aF += ah
                }
                a1 += aF
            }
            return a1 += aR, aY._keyEvent = !1, a1
        },
        _generateMonthYearHeader: function(K, x, G, z, D, O, C, A) {
            var H,
                F,
                w,
                L,
                M,
                B,
                J,
                E,
                I = this._get(K, "changeMonth"),
                q = this._get(K, "changeYear"),
                P = this._get(K, "showMonthAfterYear"),
                k = "<div class='ui-datepicker-title'>",
                N = "";
            if (O || !I) {
                N += "<span class='ui-datepicker-month'>" + C[x] + "</span>"
            } else {
                for (H = z && z.getFullYear() === G, F = D && D.getFullYear() === G, N += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", w = 0; 12 > w; w++) {
                    (!H || w >= z.getMonth()) && (!F || D.getMonth() >= w) && (N += "<option value='" + w + "'" + (w === x ? " selected='selected'" : "") + ">" + A[w] + "</option>")
                }
                N += "</select>"
            }
            if (P || (k += N + (!O && I && q ? "" : " ")), !K.yearshtml) {
                if (K.yearshtml = "", O || !q) {
                    k += "<span class='ui-datepicker-year'>" + G + "</span>"
                } else {
                    for (L = this._get(K, "yearRange").split(":"), M = (new Date).getFullYear(), B = function(l) {
                        var a = l.match(/c[+\-].*/) ? G + parseInt(l.substring(1), 10) : l.match(/[+\-].*/) ? M + parseInt(l, 10) : parseInt(l, 10);
                        return isNaN(a) ? M : a
                    }, J = B(L[0]), E = Math.max(J, B(L[1] || "")), J = z ? Math.max(J, z.getFullYear()) : J, E = D ? Math.min(E, D.getFullYear()) : E, K.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; E >= J; J++) {
                        K.yearshtml += "<option value='" + J + "'" + (J === G ? " selected='selected'" : "") + ">" + J + "</option>"
                    }
                    K.yearshtml += "</select>",
                    k += K.yearshtml,
                    K.yearshtml = null
                }
            }
            return k += this._get(K, "yearSuffix"), P && (k += (!O && I && q ? "" : " ") + N), k += "</div>"
        },
        _adjustInstDate: function(q, m, l) {
            var p = q.drawYear + ("Y" === l ? m : 0),
                u = q.drawMonth + ("M" === l ? m : 0),
                k = Math.min(q.selectedDay, this._getDaysInMonth(p, u)) + ("D" === l ? m : 0),
                r = this._restrictMinMax(q, this._daylightSavingAdjust(new Date(p, u, k)));
            q.selectedDay = r.getDate(),
            q.drawMonth = q.selectedMonth = r.getMonth(),
            q.drawYear = q.selectedYear = r.getFullYear(),
            ("M" === l || "Y" === l) && this._notifyChange(q)
        },
        _restrictMinMax: function(m, k) {
            var a = this._getMinMaxDate(m, "min"),
                l = this._getMinMaxDate(m, "max"),
                o = a && a > k ? a : k;
            return l && o > l ? l : o
        },
        _notifyChange: function(k) {
            var a = this._get(k, "onChangeMonthYear");
            a && a.apply(k.input ? k.input[0] : null, [k.selectedYear, k.selectedMonth + 1, k])
        },
        _getNumberOfMonths: function(k) {
            var a = this._get(k, "numberOfMonths");
            return null == a ? [1, 1] : "number" == typeof a ? [1, a] : a
        },
        _getMinMaxDate: function(k, a) {
            return this._determineDate(k, this._get(k, a + "Date"), null)
        },
        _getDaysInMonth: function(k, a) {
            return 32 - this._daylightSavingAdjust(new Date(k, a, 32)).getDate()
        },
        _getFirstDayOfMonth: function(k, a) {
            return new Date(k, a, 1).getDay()
        },
        _canAdjustMonth: function(p, m, l, o) {
            var q = this._getNumberOfMonths(p),
                k = this._daylightSavingAdjust(new Date(l, o + (0 > m ? m : q[0] * q[1]), 1));
            return 0 > m && k.setDate(this._getDaysInMonth(k.getFullYear(), k.getMonth())), this._isInRange(p, k)
        },
        _isInRange: function(u, w) {
            var p,
                x,
                m = this._getMinMaxDate(u, "min"),
                v = this._getMinMaxDate(u, "max"),
                l = null,
                k = null,
                q = this._get(u, "yearRange");
            return q && (p = q.split(":"), x = (new Date).getFullYear(), l = parseInt(p[0], 10), k = parseInt(p[1], 10), p[0].match(/[+\-].*/) && (l += x), p[1].match(/[+\-].*/) && (k += x)), (!m || w.getTime() >= m.getTime()) && (!v || w.getTime() <= v.getTime()) && (!l || w.getFullYear() >= l) && (!k || k >= w.getFullYear())
        },
        _getFormatConfig: function(k) {
            var a = this._get(k, "shortYearCutoff");
            return a = "string" != typeof a ? a : (new Date).getFullYear() % 100 + parseInt(a, 10), {
                shortYearCutoff: a,
                dayNamesShort: this._get(k, "dayNamesShort"),
                dayNames: this._get(k, "dayNames"),
                monthNamesShort: this._get(k, "monthNamesShort"),
                monthNames: this._get(k, "monthNames")
            }
        },
        _formatDate: function(m, k, a, l) {
            k || (m.currentDay = m.selectedDay, m.currentMonth = m.selectedMonth, m.currentYear = m.selectedYear);
            var o = k ? "object" == typeof k ? k : this._daylightSavingAdjust(new Date(l, a, k)) : this._daylightSavingAdjust(new Date(m.currentYear, m.currentMonth, m.currentDay));
            return this.formatDate(this._get(m, "dateFormat"), o, this._getFormatConfig(m))
        }
    }),
    g.fn.datepicker = function(e) {
        if (!this.length) {
            return this
        }
        g.datepicker.initialized || (g(document).mousedown(g.datepicker._checkExternalClick), g.datepicker.initialized = !0),
        0 === g("#" + g.datepicker._mainDivId).length && g("body").append(g.datepicker.dpDiv);
        var a = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? g.datepicker["_" + e + "Datepicker"].apply(g.datepicker, [this[0]].concat(a)) : this.each(function() {
            "string" == typeof e ? g.datepicker["_" + e + "Datepicker"].apply(g.datepicker, [this].concat(a)) : g.datepicker._attachDatepicker(this, e)
        }) : g.datepicker["_" + e + "Datepicker"].apply(g.datepicker, [this[0]].concat(a))
    },
    g.datepicker = new c,
    g.datepicker.initialized = !1,
    g.datepicker.uuid = (new Date).getTime(),
    g.datepicker.version = "1.10.4"
})(jQuery);
(function(a) {
    a.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.mouseHandled = !1,
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function(b) {
                this.options.disabled && b.preventDefault()
            }, this)),
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
            this._on({
                "mousedown .ui-menu-item > a": function(b) {
                    b.preventDefault()
                },
                "click .ui-state-disabled > a": function(b) {
                    b.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(c) {
                    var b = a(c.target).closest(".ui-menu-item");
                    !this.mouseHandled && b.not(".ui-state-disabled").length && (this.select(c), c.isPropagationStopped() || (this.mouseHandled = !0), b.has(".ui-menu").length ? this.expand(c) : !this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(c) {
                    var b = a(c.currentTarget);
                    b.siblings().children(".ui-state-active").removeClass("ui-state-active"),
                    this.focus(c, b)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(d, c) {
                    var b = this.active || this.element.children(".ui-menu-item").eq(0);
                    c || this.focus(d, b)
                },
                blur: function(b) {
                    this._delay(function() {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b),
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var b = a(this);
                b.data("ui-menu-submenu-carat") && b.remove()
            }),
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(d) {
            function c(h) {
                return h.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var f,
                k,
                b,
                j,
                g,
                e = !0;
            switch (d.keyCode) {
            case a.ui.keyCode.PAGE_UP:
                this.previousPage(d);
                break;
            case a.ui.keyCode.PAGE_DOWN:
                this.nextPage(d);
                break;
            case a.ui.keyCode.HOME:
                this._move("first", "first", d);
                break;
            case a.ui.keyCode.END:
                this._move("last", "last", d);
                break;
            case a.ui.keyCode.UP:
                this.previous(d);
                break;
            case a.ui.keyCode.DOWN:
                this.next(d);
                break;
            case a.ui.keyCode.LEFT:
                this.collapse(d);
                break;
            case a.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(d);
                break;
            case a.ui.keyCode.ENTER:
            case a.ui.keyCode.SPACE:
                this._activate(d);
                break;
            case a.ui.keyCode.ESCAPE:
                this.collapse(d);
                break;
            default:
                e = !1,
                k = this.previousFilter || "",
                b = String.fromCharCode(d.keyCode),
                j = !1,
                clearTimeout(this.filterTimer),
                b === k ? j = !0 : b = k + b,
                g = RegExp("^" + c(b), "i"),
                f = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return g.test(a(this).children("a").text())
                }),
                f = j && -1 !== f.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : f,
                f.length || (b = String.fromCharCode(d.keyCode), g = RegExp("^" + c(b), "i"), f = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return g.test(a(this).children("a").text())
                })),
                f.length ? (this.focus(d, f), f.length > 1 ? (this.previousFilter = b, this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                }, 1000)) : delete this.previousFilter) : delete this.previousFilter
            }
            e && d.preventDefault()
        },
        _activate: function(b) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(b) : this.select(b))
        },
        refresh: function() {
            var c,
                b = this.options.icons.submenu,
                d = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
            d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var e = a(this),
                    f = e.prev("a"),
                    g = a("<span>").addClass("ui-menu-icon ui-icon " + b).data("ui-menu-submenu-carat", !0);
                f.attr("aria-haspopup", "true").prepend(g),
                e.attr("aria-labelledby", f.attr("id"))
            }),
            c = d.add(this.element),
            c.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            c.children(":not(.ui-menu-item)").each(function() {
                var e = a(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }),
            c.children(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(c, b) {
            "icons" === c && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu),
            this._super(c, b)
        },
        focus: function(f, c) {
            var b,
                d;
            this.blur(f, f && "focus" === f.type),
            this._scrollIntoView(c),
            this.active = c.first(),
            d = this.active.children("a").addClass("ui-state-focus"),
            this.options.role && this.element.attr("aria-activedescendant", d.attr("id")),
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
            f && "keydown" === f.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay),
            b = c.children(".ui-menu"),
            b.length && f && /^mouse/.test(f.type) && this._startOpening(b),
            this.activeMenu = c.parent(),
            this._trigger("focus", f, {
                item: c
            })
        },
        _scrollIntoView: function(d) {
            var c,
                e,
                h,
                b,
                g,
                f;
            this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, e = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, h = d.offset().top - this.activeMenu.offset().top - c - e, b = this.activeMenu.scrollTop(), g = this.activeMenu.height(), f = d.height(), 0 > h ? this.activeMenu.scrollTop(b + h) : h + f > g && this.activeMenu.scrollTop(b + h - g + f))
        },
        blur: function(c, b) {
            b || clearTimeout(this.timer),
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", c, {
                item: this.active
            }))
        },
        _startOpening: function(b) {
            clearTimeout(this.timer),
            "true" === b.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(b)
            }, this.delay))
        },
        _open: function(c) {
            var b = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(c.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            c.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(b)
        },
        collapseAll: function(c, b) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var d = b ? this.element : a(c && c.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element),
                this._close(d),
                this.blur(c),
                this.activeMenu = d
            }, this.delay)
        },
        _close: function(b) {
            b || (b = this.active ? this.active.parent() : this.element),
            b.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(c) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            b && b.length && (this._close(), this.focus(c, b))
        },
        expand: function(c) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            b && b.length && (this._open(b.parent()), this._delay(function() {
                this.focus(c, b)
            }))
        },
        next: function(b) {
            this._move("next", "first", b)
        },
        previous: function(b) {
            this._move("prev", "last", b)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(f, c, b) {
            var d;
            this.active && (d = "first" === f || "last" === f ? this.active["first" === f ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[f + "All"](".ui-menu-item").eq(0)),
            d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[c]()),
            this.focus(b, d)
        },
        nextPage: function(c) {
            var b,
                d,
                e;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return b = a(this), 0 > b.offset().top - d - e
            }), this.focus(c, b)) : this.focus(c, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(c), undefined)
        },
        previousPage: function(c) {
            var b,
                d,
                e;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return b = a(this), b.offset().top - d + e > 0
            }), this.focus(c, b)) : this.focus(c, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(c), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(c) {
            this.active = this.active || a(c.target).closest(".ui-menu-item");
            var b = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(c, !0),
            this._trigger("select", c, b)
        }
    })
})(jQuery);
(function(b) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
            this._refresh(),
            this._setOption("disabled", this.options.disabled),
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue()
        },
        _createHandles: function() {
            var e,
                d,
                f = this.options,
                h = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                c = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                g = [];
            for (d = f.values && f.values.length || 1, h.length > d && (h.slice(d).remove(), h = h.slice(0, d)), e = h.length; d > e; e++) {
                g.push(c)
            }
            this.handles = h.add(b(g.join("")).appendTo(this.element)),
            this.handle = this.handles.eq(0),
            this.handles.each(function(j) {
                b(this).data("ui-slider-handle-index", j)
            })
        },
        _createRange: function() {
            var d = this.options,
                c = "";
            d.range ? (d.range === !0 && (d.values ? d.values.length && 2 !== d.values.length ? d.values = [d.values[0], d.values[0]] : b.isArray(d.values) && (d.values = d.values.slice(0)) : d.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = b("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === d.range || "max" === d.range ? " ui-slider-range-" + d.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            var c = this.handles.add(this.range).filter("a");
            this._off(c),
            this._on(c, this._handleEvents),
            this._hoverable(c),
            this._focusable(c)
        },
        _destroy: function() {
            this.handles.remove(),
            this.range && this.range.remove(),
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
            this._mouseDestroy()
        },
        _mouseCapture: function(v) {
            var j,
                w,
                f,
                p,
                e,
                d,
                k,
                g,
                q = this,
                m = this.options;
            return m.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), j = {
                x: v.pageX,
                y: v.pageY
            }, w = this._normValueFromMouse(j), f = this._valueMax() - this._valueMin() + 1, this.handles.each(function(h) {
                var c = Math.abs(w - q.values(h));
                (f > c || f === c && (h === q._lastChangedValue || q.values(h) === m.min)) && (f = c, p = b(this), e = h)
            }), d = this._start(v, e), d === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = e, p.addClass("ui-state-active").focus(), k = p.offset(), g = !b(v.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = g ? {
                left: 0,
                top: 0
            } : {
                left: v.pageX - k.left - p.width() / 2,
                top: v.pageY - k.top - p.height() / 2 - (parseInt(p.css("borderTopWidth"), 10) || 0) - (parseInt(p.css("borderBottomWidth"), 10) || 0) + (parseInt(p.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(v, e, w), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(f) {
            var d = {
                    x: f.pageX,
                    y: f.pageY
                },
                c = this._normValueFromMouse(d);
            return this._slide(f, this._handleIndex, c), !1
        },
        _mouseStop: function(c) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(c, this._handleIndex), this._change(c, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(h) {
            var f,
                d,
                g,
                j,
                c;
            return "horizontal" === this.orientation ? (f = this.elementSize.width, d = h.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (f = this.elementSize.height, d = h.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), g = d / f, g > 1 && (g = 1), 0 > g && (g = 0), "vertical" === this.orientation && (g = 1 - g), j = this._valueMax() - this._valueMin(), c = this._valueMin() + g * j, this._trimAlignValue(c)
        },
        _start: function(f, d) {
            var c = {
                handle: this.handles[d],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (c.value = this.values(d), c.values = this.values()), this._trigger("start", f, c)
        },
        _slide: function(h, f, d) {
            var g,
                j,
                c;
            this.options.values && this.options.values.length ? (g = this.values(f ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === f && d > g || 1 === f && g > d) && (d = g), d !== this.values(f) && (j = this.values(), j[f] = d, c = this._trigger("slide", h, {
                handle: this.handles[f],
                value: d,
                values: j
            }), g = this.values(f ? 0 : 1), c !== !1 && this.values(f, d))) : d !== this.value() && (c = this._trigger("slide", h, {
                handle: this.handles[f],
                value: d
            }), c !== !1 && this.value(d))
        },
        _stop: function(f, d) {
            var c = {
                handle: this.handles[d],
                value: this.value()
            };
            this.options.values && this.options.values.length && (c.value = this.values(d), c.values = this.values()),
            this._trigger("stop", f, c)
        },
        _change: function(f, d) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[d],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(d), c.values = this.values()),
                this._lastChangedValue = d,
                this._trigger("change", f, c)
            }
        },
        value: function(c) {
            return arguments.length ? (this.options.value = this._trimAlignValue(c), this._refreshValue(), this._change(null, 0), undefined) : this._value()
        },
        values: function(e, d) {
            var f,
                g,
                c;
            if (arguments.length > 1) {
                return this.options.values[e] = this._trimAlignValue(d), this._refreshValue(), this._change(null, e), undefined
            }
            if (!arguments.length) {
                return this._values()
            }
            if (!b.isArray(arguments[0])) {
                return this.options.values && this.options.values.length ? this._values(e) : this.value()
            }
            for (f = this.options.values, g = arguments[0], c = 0; f.length > c; c += 1) {
                f[c] = this._trimAlignValue(g[c]),
                this._change(null, c)
            }
            this._refreshValue()
        },
        _setOption: function(d, c) {
            var e,
                f = 0;
            switch ("range" === d && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), b.isArray(this.options.values) && (f = this.options.values.length), b.Widget.prototype._setOption.apply(this, arguments), d) {
            case "orientation":
                this._detectOrientation(),
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                this._refreshValue();
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0, this._refreshValue(), e = 0; f > e; e += 1) {
                    this._change(null, e)
                }
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0,
                this._refreshValue(),
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _value: function() {
            var c = this.options.value;
            return c = this._trimAlignValue(c)
        },
        _values: function(g) {
            var d,
                c,
                f;
            if (arguments.length) {
                return d = this.options.values[g], d = this._trimAlignValue(d)
            }
            if (this.options.values && this.options.values.length) {
                for (c = this.options.values.slice(), f = 0; c.length > f; f += 1) {
                    c[f] = this._trimAlignValue(c[f])
                }
                return c
            }
            return []
        },
        _trimAlignValue: function(g) {
            if (this._valueMin() >= g) {
                return this._valueMin()
            }
            if (g >= this._valueMax()) {
                return this._valueMax()
            }
            var d = this.options.step > 0 ? this.options.step : 1,
                c = (g - this._valueMin()) % d,
                f = g - c;
            return 2 * Math.abs(c) >= d && (f += c > 0 ? d : -d), parseFloat(f.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var p,
                g,
                q,
                e,
                k,
                d = this.options.range,
                c = this.options,
                j = this,
                f = this._animateOff ? !1 : c.animate,
                m = {};
            this.options.values && this.options.values.length ? this.handles.each(function(h) {
                g = 100 * ((j.values(h) - j._valueMin()) / (j._valueMax() - j._valueMin())),
                m["horizontal" === j.orientation ? "left" : "bottom"] = g + "%",
                b(this).stop(1, 1)[f ? "animate" : "css"](m, c.animate),
                j.options.range === !0 && ("horizontal" === j.orientation ? (0 === h && j.range.stop(1, 1)[f ? "animate" : "css"]({
                    left: g + "%"
                }, c.animate), 1 === h && j.range[f ? "animate" : "css"]({
                    width: g - p + "%"
                }, {
                    queue: !1,
                    duration: c.animate
                })) : (0 === h && j.range.stop(1, 1)[f ? "animate" : "css"]({
                    bottom: g + "%"
                }, c.animate), 1 === h && j.range[f ? "animate" : "css"]({
                    height: g - p + "%"
                }, {
                    queue: !1,
                    duration: c.animate
                }))),
                p = g
            }) : (q = this.value(), e = this._valueMin(), k = this._valueMax(), g = k !== e ? 100 * ((q - e) / (k - e)) : 0, m["horizontal" === this.orientation ? "left" : "bottom"] = g + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](m, c.animate), "min" === d && "horizontal" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                width: g + "%"
            }, c.animate), "max" === d && "horizontal" === this.orientation && this.range[f ? "animate" : "css"]({
                width: 100 - g + "%"
            }, {
                queue: !1,
                duration: c.animate
            }), "min" === d && "vertical" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                height: g + "%"
            }, c.animate), "max" === d && "vertical" === this.orientation && this.range[f ? "animate" : "css"]({
                height: 100 - g + "%"
            }, {
                queue: !1,
                duration: c.animate
            }))
        },
        _handleEvents: {
            keydown: function(d) {
                var e,
                    h,
                    c,
                    g,
                    f = b(d.target).data("ui-slider-handle-index");
                switch (d.keyCode) {
                case b.ui.keyCode.HOME:
                case b.ui.keyCode.END:
                case b.ui.keyCode.PAGE_UP:
                case b.ui.keyCode.PAGE_DOWN:
                case b.ui.keyCode.UP:
                case b.ui.keyCode.RIGHT:
                case b.ui.keyCode.DOWN:
                case b.ui.keyCode.LEFT:
                    if (d.preventDefault(), !this._keySliding && (this._keySliding = !0, b(d.target).addClass("ui-state-active"), e = this._start(d, f), e === !1)) {
                        return
                    }
                }
                switch (g = this.options.step, h = c = this.options.values && this.options.values.length ? this.values(f) : this.value(), d.keyCode) {
                case b.ui.keyCode.HOME:
                    c = this._valueMin();
                    break;
                case b.ui.keyCode.END:
                    c = this._valueMax();
                    break;
                case b.ui.keyCode.PAGE_UP:
                    c = this._trimAlignValue(h + (this._valueMax() - this._valueMin()) / a);
                    break;
                case b.ui.keyCode.PAGE_DOWN:
                    c = this._trimAlignValue(h - (this._valueMax() - this._valueMin()) / a);
                    break;
                case b.ui.keyCode.UP:
                case b.ui.keyCode.RIGHT:
                    if (h === this._valueMax()) {
                        return
                    }
                    c = this._trimAlignValue(h + g);
                    break;
                case b.ui.keyCode.DOWN:
                case b.ui.keyCode.LEFT:
                    if (h === this._valueMin()) {
                        return
                    }
                    c = this._trimAlignValue(h - g)
                }
                this._slide(d, f, c)
            },
            click: function(c) {
                c.preventDefault()
            },
            keyup: function(d) {
                var c = b(d.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(d, c), this._change(d, c), b(d.target).removeClass("ui-state-active"))
            }
        }
    })
})(jQuery);

/*!
 * jQuery UI Touch Punch 0.2.3
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
Netcel = {};
jQuery(function(a) {
    Netcel.defaultJquery = a;
    Netcel.Class.init(a);
    Netcel.inited = !0;
    Netcel.dispatchEvent({
        type: "inited"
    })
});
(function(b) {
    "undefined" == typeof console && (console = {
        log: function() {},
        error: function() {}
    });
    b.fn.classList = function() {
        return 0 < this.length ? this[0].className.split(/\s+/) : []
    };
    b.fn.findAll = function(f) {
        return this.find(f).add(this.filter(f))
    };
    b.fn.keyboardDisable = function(g, f) {
        g ? this.addClass("_kbDisabled_") : this.removeClass("_kbDisabled_");
        this.find("*").addBack().filter("undefined" == typeof f ? "a, input, select, textarea, button" : f).each(function() {
            var h = b(this);
            if (g) {
                "undefined" == typeof h.attr("data-tabindex") && h.attr("data-tabindex", h.attr("tabindex") + "").attr("tabindex", -1)
            } else {
                if (0 == h.closest("._kbDisabled_").length) {
                    var j = h.attr("data-tabindex");
                    h.removeAttr("data-tabindex");
                    "undefined" == j ? h.removeAttr("tabindex") : h.attr("tabindex", j)
                }
            }
        });
        return this
    };
    (function(w, u, t) {
        function r() {
            h = u[o](function() {
                q.each(function() {
                    var f = w(this),
                        l = f.width(),
                        k = f.height(),
                        g = w.data(this, n);
                    g && g.w && l === g.w && k === g.h || g && g.w && f.trigger(j, [g.w = l, g.h = k])
                });
                r()
            }, p[x])
        }
        var q = w([]),
            p = w.resize = w.extend(w.resize, {}),
            h,
            o = "setTimeout",
            j = "resize",
            n = j + "-special-event",
            x = "delay";
        p[x] = 250;
        p.throttleWindow = !0;
        w.event.special[j] = {
            setup: function() {
                if (!p.throttleWindow && this[o]) {
                    return !1
                }
                var f = w(this);
                q = q.add(f);
                w.data(this, n, {
                    w: f.width(),
                    h: f.height()
                });
                1 === q.length && r()
            },
            teardown: function() {
                if (!p.throttleWindow && this[o]) {
                    return !1
                }
                var f = w(this);
                q = q.not(f);
                f.removeData(n);
                q.length || clearTimeout(h)
            },
            add: function(f) {
                function k(y, B, A) {
                    var z = w(this),
                        v = w.data(this, n);
                    v.w = B !== t ? B : z.width();
                    v.h = A !== t ? A : z.height();
                    g.apply(this, arguments)
                }
                if (!p.throttleWindow && this[o]) {
                    return !1
                }
                var g;
                if (w.isFunction(f)) {
                    return g = f, k
                }
                g = f.handler;
                f.handler = k
            }
        }
    })(jQuery, this);
    b.fn.filterNode = function(f) {
        return this.find("*").filter(function() {
            return this.nodeName.toLowerCase() === f.toLowerCase()
        })
    };
    b.fn.nAnimate = function(k) {
        if (1 < this.length) {
            for (var j = 0; j < this.length; j++) {
                var q = b(this[j]);
                q.nAnimate.apply(q, arguments)
            }
            return this
        }
        var p = {
            duration: 400,
            easing: "swing",
            queue: !0,
            complete: null
        };
        2 == arguments.length && "object" == typeof arguments[1] && (p = b.extend(p, arguments[1]));
        var o = p.queue,
            q = {};
        if (arguments.callee.hasCss) {
            var n,
                h = arguments.callee.cssAnimProps,
                l;
            for (l in k) {
                if (n = p.specialEasing && p.specialEasing[l] ? p.specialEasing[l] : p.easing, !0 !== p.queue || "swing" != n && "linear" != n || !h[l]) {
                    q[l] = k[l],
                    delete k[l]
                } else {
                    if (h[l] instanceof Array) {
                        for (j = 0; j < h[l].length; j++) {
                            k["-" + h[l][j] + "-" + l] = {
                                value: k[l],
                                easing: "swing" == n ? "ease" : n
                            }
                        }
                    }
                    k[l] = {
                        value: k[l],
                        easing: "swing" == n ? "ease" : n
                    }
                }
            }
        } else {
            q = k,
            k = {}
        }
        o ? (j = function(F) {
            var E = arguments.callee.props,
                D = E.$,
                C = E.self,
                B = E.options,
                A = !1,
                z = !1;
            B.queue = !1;
            if (D.isEmptyObject(E.cssProperties)) {
                A = !0
            } else {
                for (var y, x = B.duration / 1000 + "s", J, v = {}, m = ["", "-webkit-", "-ms-", "-o-", "-moz-"], H = "", G = 0; G < m.length; G++) {
                    J = "";
                    var H = m[G],
                        I;
                    for (I in E.cssProperties) {
                        "-" != I.charAt(0) && ("" == H || h[I] instanceof Array) && ("" != J && (J += ", "), y = E.cssProperties[I], J += H + I + " " + x + " " + y.easing, "" == H && (v[I] = y.value))
                    }
                    "" != J && C.css(H + "transition", J)
                }
                y = function(f) {
                    var t = arguments.callee,
                        r = t.self,
                        g = t.options;
                    t.cssProperties[f.originalEvent.propertyName] && (A = !0, arguments.callee.self.off("mozTransitionEnd webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", arguments.callee), r.css({
                        transition: "",
                        "-moz-transition": "",
                        "-webkit-transition": "",
                        "-o-transition": "o",
                        "-ms-transition": ""
                    }), g.complete && g.complete.apply(r[0], []), setTimeout(function() {
                        A && z && F()
                    }, 20))
                };
                y.self = C;
                y.options = B;
                y.cssProperties = E.cssProperties;
                C.on("mozTransitionEnd webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", y);
                C.css(v)
            }
            D.isEmptyObject(E.fallbackProperties) ? z = !0 : (D = function() {
                null != arguments.callee.complete && arguments.callee.complete.apply(arguments.callee.self, []);
                z = !0;
                A && z && F()
            }, D.complete = B.complete, D.self = C[0], B.complete = D, C.animate(E.fallbackProperties, B))
        }, j.props = {
            self: this,
            cssProperties: k,
            fallbackProperties: q,
            options: p,
            $: b
        }, this.queue(!0 === o ? "fx" : o, j)) : (j = b.makeArray(arguments), j[0] = q, this.animate.apply(this, j));
        return this
    };
    var e = document.createElement("div").style;
    b.fn.nAnimate.hasCss = "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "OTransition" in e;
    b.fn.nAnimate.cssAnimProps = {
        bottom: 1,
        height: 1,
        left: 1,
        letterSpacing: 1,
        lineHeight: 1,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
        marginTop: 1,
        maxHeight: 1,
        maxWidth: 1,
        minHeight: 1,
        minWidth: 1,
        outlineWidth: 1,
        paddingBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 1,
        right: 1,
        textIndent: 1,
        textShadow: 1,
        top: 1,
        width: 1,
        wordSpacing: 1,
        zIndex: 1,
        transform: ["webkit", "moz", "o", "ms"]
    };
    var d = {
        parseOptions: function(g) {
            g = g ? "" + g : "";
            g = b("<div/>").html(g).text();
            var f;
            try {
                return g ? ("{" != g.charAt(0) && (g = "{" + g + "}"), f = b.parseJSON(g)) : f = {}, f ? f : {}
            } catch (h) {
                Netcel.error(h, g)
            }
            return {}
        },
        defaultInit: function(E, D, C, B, A, z, x, y, u, w, F) {
            for (var o = E("." + D.prototype._cssname + ":not(.ncj-widget-active)"), t, m, j = 0; j < o.length; j++) {
                m = E(o[j]),
                t = Netcel.getElementOptions(E, m, D.prototype._attrname),
                new D(E, m, t, C, B, A, z, x, y, u, w, F)
            }
        },
        getElementOptions: function(g, f, j, h) {
            f = g(f);
            g = f.attr(j + (h ? "" : "-options"));
            void 0 !== g || h || (g = f.attr("data-options"));
            return Netcel.parseOptions(g)
        },
        error: function() {
            try {
                console.error.apply(console, arguments)
            } catch (f) {}
        },
        log: function() {
            var g = b("#log");
            if (0 < g.length) {
                for (var f = "", j = 0; j < arguments.length; j++) {
                    f += Netcel.debug(arguments[j], 4),
                    j + 1 < arguments.length && (f += ", ")
                }
                g.append(f + "<br />");
                g.prop({
                    scrollTop: g.prop("scrollHeight")
                })
            } else {
                if (null != console && null != console.log) {
                    try {
                        "Microsoft Internet Explorer" == navigator.appName ? console.log(Netcel.debug(arguments)) : console.log.apply(console, arguments)
                    } catch (h) {}
                }
            }
        },
        debug: function(t, r, q) {
            var p = "",
                o = function(f) {
                    f = "undefined" == typeof f ? 0 : parseInt(f);
                    return Netcel.StringUtil.repeat(indent, n * (q + f))
                };
            r = b.extend({
                lineBreaks: "\n",
                maxDepth: 3,
                indent: "\t"
            }, r);
            lineBreaks = r.lineBreaks;
            maxDepth = r.maxDepth;
            q = q ? q : 0;
            indent = "" == lineBreaks ? "" : r.indent;
            var n = indent.length;
            if (q > maxDepth) {
                return ""
            }
            if (null === t) {
                return o() + "null"
            }
            if (void 0 === t) {
                return o() + "undefined"
            }
            switch (typeof t) {
            case "object":
                if (t instanceof Array) {
                    if (0 == t.length) {
                        p += "[]"
                    } else {
                        if (q == maxDepth) {
                            p += "[MAX-DEPTH]"
                        } else {
                            for (var p = "[" + lineBreaks, h = 0; h < t.length; h++) {
                                p += o(1) + arguments.callee(t[h], r, q + 1),
                                h + 1 < t.length && (p += ", " + lineBreaks)
                            }
                            p += "]"
                        }
                    }
                } else {
                    if (q == maxDepth) {
                        p += "{MAX-DEPTH}"
                    } else {
                        var h = "{" + lineBreaks,
                            k = !0,
                            j;
                        for (j in t) {
                            k = !1,
                            h += o(1) + j + ":" + arguments.callee(t[j], r, q + 1) + ", " + lineBreaks
                        }
                        h = k ? "{}" : h.substr(0, h.length - (2 + lineBreaks.length)) + lineBreaks + o() + "}";
                        p += h
                    }
                }
                break;
            case "function":
                p = "function()";
                break;
            case "string":
                p = '"' + t.toString() + '"';
                break;
            default:
                p = t.toString()
            }
            return p
        },
        NumberUtil: {
            numberWrap: function(g, f, h) {
                return (g - f) % (h - f) + f
            },
            clamp: function(g, f, j) {
                if (f > j) {
                    var h = j;
                    j = f;
                    f = h
                }
                return g > j ? j : g < f ? f : g
            },
            interpolate: function(g, f, h) {
                return (f - g) * h + g
            },
            isNumber: function(f) {
                return !isNaN(f - 0) && null != f
            },
            toNumber: function(f) {
                return Netcel.NumberUtil.isNumber(f) ? f - 0 : 0
            },
            isInt: function(f) {
                return parseFloat(f) != parseInt(f) || isNaN(f + 0) || null == f ? !1 : !0
            },
            log: function(g, f) {
                return Math.log(g) / Math.log(f)
            },
            round: function(g, f) {
                var h = Math.pow(10, f);
                return Math.round(g * h) / h
            }
        },
        StringUtil: {
            pad: function(g, f, k, j) {
                if (g.length >= f) {
                    return g
                }
                var h = 0;
                if (j) {
                    for (; g.length < f;) {
                        g += k.charAt(h++ % k.length)
                    }
                } else {
                    for (; g.length < f;) {
                        g = k.charAt(h++ % k.length) + g
                    }
                }
                return g
            },
            trim: function(g) {
                if (g instanceof Array) {
                    for (var f = 0; f < g.length; f++) {
                        g[f] = Netcel.StringUtil.trim(g[f])
                    }
                } else {
                    if (String.prototype.trim) {
                        return g.trim()
                    }
                    g = g.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                }
                return g
            },
            repeat: function(g, f) {
                for (var h = ""; h.length < f;) {
                    h += g
                }
                return h.substr(0, f)
            },
            replaceCallback: function(g, f, k) {
                for (var j = "", h = 0; (result = g.exec(f)) && (result.index > h && (j += f.substr(h, result.index - h)), h = result.index + result[0].length, j += k(result, f), g.global);) {}
                h < f.length - 1 && (j += f.substr(h));
                return j
            }
        },
        XMLUtil: {
            isNode: function(g, f) {
                return void 0 !== g.nodeName && g.nodeName.toLowerCase() == f
            }
        },
        Class: {}
    };
    Netcel = d;
    var c = {
        init: function(g) {
            if (!Netcel.Class._isInitied) {
                Netcel.Class._$ = g;
                Netcel.Class._isInited = !0;
                for (var f = 0; f < Netcel.Class._allClasses.length; f++) {
                    Netcel.Class._allClasses[f].__init__ instanceof Function && Netcel.Class._allClasses[f].__init__.call(Netcel.Class._allClasses[f], g)
                }
            }
        },
        _allClasses: [],
        _isInited: !1,
        _$: null,
        create: function() {
            var j = null,
                h = [],
                p;
            for (p = 0; p < arguments.length; p++) {
                h.push(arguments[p])
            }
            [].concat(h);
            var o = h.shift().split(".");
            "Netcel" == o[0] && o.shift();
            h[0] instanceof Function && (j = h.shift());
            var n = !1;
            !0 === h[0] && (n = !0, h.shift());
            var l = function() {
                    if (null != this._$super) {
                        for (var g, f = this._$super, r, q = this; null != f;) {
                            r = {
                                _$superPrototype: f
                            };
                            q.$super = r;
                            for (g in f) {
                                f[g] instanceof Function && (r[g] = b.proxy(f[g], this))
                            }
                            q = r;
                            f = f._$super
                        }
                        this.__$canonicalSuper = this.$super
                    }
                    this.initialize.apply(this, arguments)
                },
                m = null,
                k;
            if (j) {
                m = {};
                null != j.prototype._$super && (m._$super = j.prototype._$super);
                for (k in j.prototype) {
                    j.prototype[k] instanceof Function && (l.prototype[k] = j.prototype[k], m[k] = l.prototype[k])
                }
                j.__init__ && (l.__init__ = j.__init__);
                l.prototype._$super = m;
                l.$parent = j
            }
            for (p = 0; p < h.length; p++) {
                if (h[p]) {
                    if (n) {
                        for (k in h[p]) {
                            l.prototype[k] = function() {
                                if (this.__$canonicalSuper && arguments.callee._$superPrototype) {
                                    for (var g = this.$super, f = this.__$canonicalSuper; f._$superPrototype != arguments.callee._$superPrototype;) {
                                        f = f.$super
                                    }
                                    this.$super = f
                                }
                                f = arguments.callee.func.apply(this, arguments);
                                this.__$canonicalSuper && arguments.callee._$superPrototype && (this.$super = g);
                                return f
                            },
                            l.prototype[k]._$superPrototype = m,
                            l.prototype[k].func = h[p][k]
                        }
                    } else {
                        Netcel.Class.extend(l, h[p])
                    }
                }
            }
            l.prototype.initialize || (l.prototype.initialize = function() {});
            l.prototype.constructor = l;
            l.prototype.__init__ && (l.__init__ = l.prototype.__init__, delete l.prototype.__init__, Netcel.Class._isInited && l.__init__(Netcel.Class._$));
            Netcel.Class._allClasses.push(l);
            l.prototype._classnameParts = o;
            l.prototype._classname = "Netcel." + o.join(".");
            l.prototype._cssname = "ncj-" + o.join("-").toLowerCase();
            l.prototype._attrname = "data-nc-" + o.join("-").toLowerCase();
            l.prototype._constructor = l;
            j = Netcel;
            for (p = 0; p < o.length - 1; p++) {
                void 0 == j[o[p]] && (j[o[p]] = {}),
                j = j[o[p]]
            }
            return j[o[o.length - 1]] = l
        },
        extend: function(h, g) {
            var m = [],
                l,
                k;
            for (l in g) {
                m.push(l)
            }
            l = 0;
            for (k = m.length; l < k; l++) {
                var j = m[l];
                h.prototype[j] = g[j]
            }
            return this
        }
    };
    d.Class = c;
    var a = c.create("EventDispatcher", {
        initialize: function() {
            this._listeners = {}
        },
        addEventListener: function(g, f, k) {
            g = this._checkEvents(g);
            for (var j, h = 0; h < g.length; h++) {
                j = g[h],
                this._listeners.hasOwnProperty(j) ? this._listeners[j].push([f, k]) : this._listeners[j] = [[f, k]]
            }
        },
        hasEventListener: function(f) {
            return this._listeners.hasOwnProperty(f) && 0 < this._listeners[f].length
        },
        removeEventListener: function(g, f) {
            if (void 0 == f) {
                f = g;
                g = [];
                for (j in this._listeners) {
                    g.push(j)
                }
                this.removeEventListener(g, f)
            } else {
                g = this._checkEvents(g);
                for (var j, h = 0; h < g.length; h++) {
                    if (j = g[h], this._listeners[j]) {
                        for (h in this._listeners[j]) {
                            if (this._listeners[j][h][0] == f) {
                                this._listeners[j].splice(h, 1);
                                break
                            }
                        }
                    }
                }
                return !0
            }
            return !1
        },
        dispatchEvent: function(f) {
            "string" == typeof f && (f = {
                type: f
            });
            if (f.type && this._listeners.hasOwnProperty(f.type)) {
                for (i in f.currentTarget = this, this._listeners[f.type]) {
                    "function" == typeof this._listeners[f.type][i][0] && this._listeners[f.type][i][0].call(this._listeners[f.type][i][1], f)
                }
            }
        },
        _checkEvents: function(f) {
            "string" == typeof f && (f = f.split(" "));
            return f
        }
    });
    NetcelClass = c.create("Netcel", a, {});
    Netcel = new NetcelClass;
    for (e in d) {
        Netcel[e] = d[e]
    }
    Netcel.Class = c;
    Netcel.Class.getInheritanceChain = function(g) {
        g.prototype || (g = g.constructor);
        var f = [];
        do {
            f.push(g.prototype._classname)
        } while (g = g.$parent);
        return f
    };
    Netcel.Class.is = function(g, f) {
        g.prototype || (g = g.constructor);
        do {
            if (g == f) {
                return !0
            }
        } while (g = g.$parent);
        return !1
    };
    Netcel.Shared = {
        ResizingMixin: {
            _resizing_init: function(g, f, h) {
                if (f || h) {
                    this._resizing_element = g;
                    this._resizing_horizontal = f;
                    if (this._resizing_vertical = h) {
                        this._resizing_height = g.outerHeight()
                    }
                    f && (this._resizing_width = g.outerWidth());
                    g = function(o) {
                        var j = arguments.callee.self,
                            u = j._resizing_horizontal,
                            q = j._resizing_vertical,
                            r = j._resizing_element,
                            m = !1,
                            p = -1,
                            t = -1;
                        u && (p = r.outerWidth(), p != j._resizing_width && (m = !0));
                        q && (t = r.outerHeight(), t != j._resizing_height && (m = !0));
                        m && j._onResized && j._onResized(p, t);
                        j._resizing_width = p;
                        j._resizing_height = t;
                        o && "number" != typeof o || !u && !q || window.requestAnimFrame(arguments.callee)
                    };
                    g.self = this;
                    window.requestAnimFrame(g);
                    b(window).resize(g)
                }
            }
        },
        FilteringItemMixin: {
            _filteringItem_init: function(f) {
                this._filteringItem_items = [];
                this._filteringItem_allFilters = [];
                this._filteringItem_props = f;
                this._filteringItem_all = "__all__";
                this._filteringItem_filter = f.filter || this._filteringItem_all
            },
            _filteringItem_get_allFilters: function() {
                return this._filteringItem_allFilters
            },
            _filteringItem_get_filter: function() {
                return this._filteringItem_filter
            },
            _filteringItem_addItem: function(g) {
                var f = this._filteringItem_props;
                switch (f.initItem) {
                case "element":
                    g._filterableItem_init(g.element.attr(f.filterAttr || "data-tags"))
                }
                this._filteringItem_items.push(g);
                this._filteringItem_filterItem(g);
                this._filteringItem_updateFilters();
                this.dispatchEvent && this.dispatchEvent({
                    type: "filtering_itemAdded"
                })
            },
            _filteringItem_removeItem: function(g) {
                for (var f = this._filteringItem_items, h = 0; h < f.length; h++) {
                    if (f[h] == g) {
                        f.splice(h, 1);
                        return
                    }
                }
                this._filteringItem_updateFilters();
                this.dispatchEvent && this.dispatchEvent({
                    type: "filtering_itemRemoved"
                })
            },
            _filteringItem_filterItems: function(g) {
                var f = this._filteringItem_filter;
                this._filteringItem_filter = g;
                for (var j = this._filteringItem_items, h = 0; h < j.length; h++) {
                    this._filteringItem_filterItem(j[h])
                }
                this.dispatchEvent && this.dispatchEvent({
                    type: "filtering_filterChanged",
                    from: f,
                    to: g
                })
            },
            _filteringItem_filterItem: function(f) {
                this._filteringItem_filter != this._filteringItem_all ? f._filterableItem_set_filtered(!f._filterableItem_matchFilter(this._filteringItem_filter)) : f._filterableItem_set_filtered(!1)
            },
            _filteringItem_updateFilters: function() {
                for (var t = {}, r = this._filteringItem_items, q, p, o = 0; o < r.length; o++) {
                    if (p = r[o]._filterableItem_get_filterValues()) {
                        for (q = 0; q < p.length; q++) {
                            p[q] && (t[p[q]] = !0)
                        }
                    }
                }
                r = {};
                q = this._filteringItem_allFilters;
                p = [];
                for (o = 0; o < q.length; o++) {
                    r[q[o]] = !0,
                    p[o] = q[o]
                }
                var n = !1,
                    k = [],
                    m = [],
                    j;
                for (j in t) {
                    r[j] ? r[j] = !1 : (q.push(j), k.push(j), n = !0)
                }
                for (j in r) {
                    if (!0 === r[j]) {
                        for (o = 0; o < q.length; o++) {
                            if (q[o] === j) {
                                q.splice(o, 1);
                                m.push(j);
                                n = !0;
                                break
                            }
                        }
                    }
                }
                n && this.dispatchEvent && this.dispatchEvent({
                    type: "filtering_filtersChanged",
                    from: p,
                    to: q,
                    added: k,
                    removed: m
                })
            }
        },
        FilterableItemMixin: {
            _filterableItem_init: function(f) {
                this._filterableItem_filtered = !1;
                this._filterableItem_filterValues = "string" == typeof f ? f.split(",") : f
            },
            _filterableItem_matchFilter: function(g) {
                if (this._filterableItem_filterValues) {
                    for (var f = 0; f < g.length; f++) {
                        for (var h = 0; h < this._filterableItem_filterValues.length; h++) {
                            if (g[f] == this._filterableItem_filterValues[h]) {
                                return !0
                            }
                        }
                    }
                }
                return !1
            },
            _filterableItem_get_filtered: function() {
                return this._filterableItem_filtered
            },
            _filterableItem_set_filtered: function(f) {
                this._filterableItem_filtered != f && (this.set_visible && this.set_visible(!f), this._filterableItem_filtered = f, this._onFiltered && this._onFiltered(), this.dispatchEvent && this.dispatchEvent({
                    type: "filterable_filterChanged"
                }))
            },
            _filterableItem_get_filterValues: function() {
                return this._filterableItem_filterValues
            }
        },
        VisibilityMixin: {
            _visibility_init: function(g, f) {
                var h = this;
                this._visibility_visible = !0;
                this._visibility_$ = g;
                this._visibility_fadeInOptions = g.extend({}, f.transition, f.transitionIn);
                this._visibility_fadeOutOptions = g.extend({}, f.transition, f.transitionOut);
                this._visibility_fadeOutOptions._complete = this._visibility_fadeOutOptions.complete;
                this._visibility_fadeOutOptions.complete = function() {
                    h._visibility_fadeOutOptions._complete && h._visibility_fadeOutOptions._complete();
                    h.element.css("display", "none")
                }
            },
            get_visible: function() {
                return this._visibility_visible
            },
            set_visible: function(g, f) {
                g != this._visibility_visible && (this.element.stop(!0), g ? (this._y = this._x = -1, f ? this.element.css({
                    display: "",
                    opacity: 1
                }) : this.element.css({
                    display: "",
                    opacity: 0
                }).animate({
                    opacity: 1
                }, this._visibility_fadeInOptions)) : f ? this.element.css({
                    display: "none",
                    opacity: 0
                }) : this.element.animate({
                    opacity: 0
                }, this._visibility_fadeOutOptions), this._visibility_visible = g)
            }
        },
        UpdatingMixin: {
            get_frameRate: function() {
                return this._updating_fps
            },
            set_frameRate: function(g) {
                -1 != this._updating_updateId && (clearInterval(this._updating_updateId), this._updating_updateId = -1);
                this._updating_fps = g;
                var f = this;
                -1 == g ? (this._updating_onAnimFrameProxy = function() {
                    f._updating_onAnimFrame()
                }, this._updating_onAnimFrame()) : 0 < g && (this._updateId = setInterval(function() {
                    f._onUpdate()
                }, 1000 / g))
            },
            _updating_onAnimFrame: function() {
                this._onUpdate();
                -1 == this._updating_fps && window.requestAnimFrame(this._updating_onAnimFrameProxy)
            }
        },
        ProxyAnimationMixin: {
            _initProxyAnimation: function(g, f) {
                this._animationProxy_$ = g;
                var j = "backgroundPosition left right top bottom marginTop marginLeft marginBottom marginRight".split(" ");
                this._animationProxy_proxy = g("<div/>");
                this._animationProxy_proxy[0].obj = this;
                this._animationProxy_propertiesMap = {};
                this._animationProxy_propertiesMapInv = {};
                for (var h = 0; h < f.length; h++) {
                    this._animationProxy_propertiesMap[f[h]] = j[h],
                    this._animationProxy_propertiesMapInv[j[h]] = f[h]
                }
            },
            animate: function(h, g, m, l) {
                var k = this._animationProxy_$;
                "object" != typeof g && (g = {
                    duration: g,
                    easing: m,
                    complete: l
                });
                g.complete instanceof Function && (g.complete = k.proxy(g.complete, this));
                g.step = k.proxy(this._animationProxy_step, this, g.step);
                m = {};
                l = {};
                for (var j in h) {
                    null != this._animationProxy_propertiesMap[j] && (m[this._animationProxy_propertiesMap[j]] = this[j] + ("string" == typeof this[j] ? "" : k.browser.mozilla ? "%" : "px"), l[this._animationProxy_propertiesMap[j]] = h[j])
                }
                k(this._animationProxy_proxy).css(m);
                k(this._animationProxy_proxy).animate(l, g);
                return this
            },
            _animationProxy_step: function(g, f, h) {
                this[this._animationProxy_propertiesMapInv[h.prop]] = f;
                null != g && g.apply(this, [f, h])
            },
            clearQueue: function(f) {
                this._animationProxy_proxy.clearQueue(f);
                return this
            },
            delay: function(g, f) {
                this._animationProxy_proxy.delay(g, f);
                return this
            },
            dequeue: function(f) {
                this._animationProxy_proxy.dequeue(f);
                return this
            },
            queue: function(g, f) {
                this._animationProxy_proxy.queue(g, f);
                return this
            }
        }
    };
    window.requestAnimFrame = function(f) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(g) {
                window.setTimeout(g, 1000 / 60)
            }
    }();
    Netcel.Class.create("Widget", Netcel.EventDispatcher, {
        initialize: function(g, f, k, j) {
            Netcel.EventDispatcher.prototype.initialize.apply(this, []);
            this._$ = g;
            this._options = g.extend({}, j, k);
            this.element = g(f);
            this.element.addClass("ncj-widget-active");
            this._options.ns || (this._options.ns = this._cssname);
            var h = this;
            g.each(Netcel.Class.getInheritanceChain(this), function() {
                Netcel.Widget.widgets[this] || (Netcel.Widget.widgets[this] = []);
                Netcel.Widget.widgets[this].push(h)
            })
        },
        _createElementIfNotPresent: function(h, g, m, l, k) {
            k = k || this._$;
            l = k.extend({}, {
                addMethod: "append"
            }, l);
            m = k(m ? m : this.element);
            var j = m.find("." + h);
            0 == j.length && (j = k(g), j.addClass(h), m[l.addMethod](j));
            return j
        },
        __init__: function(f) {
            Netcel.defaultInit(f, this)
        }
    });
    Netcel.Widget.widgets = {};
    Netcel.Widget.getWidgetsFor = function(x, w) {
        var v = b(x),
            u,
            t,
            r,
            j,
            q,
            o,
            p = [],
            h = [];
        if ("string" == typeof w) {
            p = w.split(" ")
        } else {
            if (w instanceof Array) {
                p = w
            } else {
                if (w instanceof Function && void 0 != w.prototype._classname) {
                    p = [w.prototype._classname]
                } else {
                    for (t in Netcel.Widget.widgets) {
                        p.push(t)
                    }
                }
            }
        }
        for (t = 0; t < p.length; t++) {
            if (u = p[t], "string" == typeof u ? "Netcel." != u.substr(0, 7) && (u = "Netcel." + u) : u = u.prototype._classname, (q = Netcel.Widget.widgets[u]) && 0 < q.length) {
                for (r = 0; r < v.length; r++) {
                    for (u = v[r], j = 0; j < q.length; j++) {
                        o = q[j],
                        o.element[0] == u && -1 == b.inArray(o, h) && h.push(o)
                    }
                }
            }
        }
        return h
    };
    Netcel.Array = {
        indexOf: function(g, f) {
            for (var h = 0; h < g.length; h++) {
                if (g[h] === f) {
                    return h
                }
            }
            return -1
        }
    };
    Netcel.getUniqueId = function(g) {
        var f;
        do {
            f = g + Math.floor(10000000 * Math.random())
        } while (0 < b("#" + f).length);
        return f
    };
    b.fn.widget = function(f) {
        return 0 < this.length ? (result = Netcel.Widget.getWidgetsFor(this[0], f), b.isArray(f) || "undefined" == typeof f ? result : 0 < result.length ? result[0] : null) : "undefined" == typeof f || b.isArray(f) ? [] : null
    };
    b("html").removeClass("no-js")
})(jQuery);
Netcel.Class.create("Html.Metrics", {
    initialize: function(e, c, f) {
        c = c ? c : Netcel.defaultJquery;
        this.noCache = f;
        this.element = c(e);
        this.refresh()
    },
    offset: function() {
        if (this.noCache || null === this._offset) {
            this._offset = this.element.offset()
        }
        return this._offset
    },
    width: function() {
        if (this.noCache || null === this._width) {
            this._width = this._parseCSSValue(this.element.width())
        }
        return this._width
    },
    height: function() {
        if (this.noCache || null === this._height) {
            this._height = this._parseCSSValue(this.element.height())
        }
        return this._height
    },
    innerWidth: function() {
        if (this.noCache || null === this._innerWidth) {
            this._innerWidth = this._parseCSSValue(this.element.innerWidth())
        }
        return this._innerWidth
    },
    innerHeight: function() {
        if (this.noCache || null === this._innerHeight) {
            this._innerHeight = this._parseCSSValue(this.element.innerHeight())
        }
        return this._innerHeight
    },
    outerWidth: function() {
        if (this.noCache || null === this._outerWidth) {
            this._outerWidth = this._parseCSSValue(this.element.outerWidth())
        }
        return this._outerWidth
    },
    outerHeight: function() {
        if (this.noCache || null === this._outerHeight) {
            this._outerHeight = this._parseCSSValue(this.element.outerHeight())
        }
        return this._outerHeight
    },
    fullWidth: function() {
        if (this.noCache || null === this._fullWidth) {
            this._fullWidth = this._parseCSSValue(this.element.outerWidth(!0))
        }
        return this._fullWidth
    },
    fullHeight: function() {
        if (this.noCache || null === this._fullHeight) {
            this._fullHeight = this._parseCSSValue(this.element.outerHeight(!0))
        }
        return this._fullHeight
    },
    marginTop: function() {
        if (this.noCache || null === this._marginTop) {
            this._marginTop = this._parseCSSValue(this.element.css("margin-top"))
        }
        return this._marginTop
    },
    marginRight: function() {
        if (this.noCache || null === this._marginRight) {
            this._marginRight = this._parseCSSValue(this.element.css("margin-right"))
        }
        return this._marginRight
    },
    marginBottom: function() {
        if (this.noCache || null === this._marginBottom) {
            this._marginBottom = this._parseCSSValue(this.element.css("margin-bottom"))
        }
        return this._marginBottom
    },
    marginLeft: function() {
        if (this.noCache || null === this._marginLeft) {
            this._marginLeft = this._parseCSSValue(this.element.css("margin-left"))
        }
        return this._marginLeft
    },
    paddingTop: function() {
        if (this.noCache || null === this._paddingTop) {
            this._paddingTop = this._parseCSSValue(this.element.css("padding-top"))
        }
        return this._paddingTop
    },
    paddingRight: function() {
        if (this.noCache || null === this._paddingRight) {
            this._paddingRight = this._parseCSSValue(this.element.css("padding-right"))
        }
        return this._paddingRight
    },
    paddingBottom: function() {
        if (this.noCache || null === this._paddingBottom) {
            this._paddingBottom = this._parseCSSValue(this.element.css("padding-bottom"))
        }
        return this._paddingBottom
    },
    paddingLeft: function() {
        if (this.noCache || null === this._paddingLeft) {
            this._paddingLeft = this._parseCSSValue(this.element.css("padding-left"))
        }
        return this._paddingLeft
    },
    borderTop: function() {
        if (this.noCache || null === this._borderTop) {
            this._borderTop = this._getBorderWidth(this.element.css("border-top-width"), !0)
        }
        return this._borderTop
    },
    borderRight: function() {
        if (this.noCache || null === this._borderRight) {
            this._borderRight = this._getBorderWidth(this.element.css("border-right-width"), !1)
        }
        return this._borderRight
    },
    borderBottom: function() {
        if (this.noCache || null === this._borderBottom) {
            this._borderBottom = this._getBorderWidth(this.element.css("border-bottom-width"), !0)
        }
        return this._borderBottom
    },
    borderLeft: function() {
        if (this.noCache || null === this._borderLeft) {
            this._borderLeft = this._getBorderWidth(this.element.css("border-left-width"), !1)
        }
        return this._borderLeft
    },
    size: function(d) {
        var c = this.element.offset();
        switch (d) {
        case "border":
            return {
                x: c.left - (this.marginLeft() + this.borderLeft() + this.paddingLeft()),
                y: c.top - (this.marginTop() + this.borderTop() + this.paddingTop()),
                width: this.width(),
                height: this.height()
            };
        case "padding":
            return {
                x: c.left - (this.marginLeft() + this.borderLeft()),
                y: c.top - (this.marginTop() + this.borderTop()),
                width: this.innerWidth(),
                height: this.innerWidth()
            };
        case "inner":
            return {
                x: c.left - this.marginLeft(),
                y: c.top - this.marginTop(),
                width: this.outerWidth(),
                height: this.outerHeight()
            };
        default:
            return {
                x: c.left,
                y: c.top,
                width: this.fullWidth(),
                height: this.fullHeight()
            }
        }
    },
    _getBorderWidth: function(d, c) {
        switch (d) {
        case "thin":
            d = this._isBorder(c) ? 1 : 0;
            break;
        case "medium":
            d = this._isBorder(c) ? 3 : 0;
            break;
        case "thick":
            d = this._isBorder(c) ? 5 : 0
        }
        return this._parseCSSValue(d, 10)
    },
    _isBorder: function(d) {
        var c = d ? this.outerWidth() - this.innerWidth() : this.outerHeight() - this.innerHeight();
        return c -= d ? this.marginTop() + this.marginBottom() : this.marginLeft() + this.marginRight()
    },
    _parseCSSValue: function(b) {
        return "auto" == b ? 0 : parseInt(b, 10)
    },
    localToGlobal: function(g, f, j) {
        "object" == typeof g && (f = g.y, g = g.x);
        var k = {
                x: null,
                y: null
            },
            h = this.offset();
        k.x = g + h.left + this.borderLeft();
        k.y = f + h.top + this.borderTop();
        j && (k.x += this.paddingLeft(), k.y += this.paddingTop());
        return k
    },
    globalToLocal: function(g, f, j) {
        "object" == typeof g && (f = g.y, g = g.x);
        var k = {
                x: null,
                y: null
            },
            h = this.offset();
        k.x = g - h.left - this.borderLeft();
        k.y = f - h.top - this.borderTop();
        j && (k.x -= this.paddingLeft(), k.y -= this.paddingTop());
        return k
    },
    refresh: function() {
        this.noCache || (this._borderLeft = this._borderBottom = this._borderRight = this._borderTop = this._paddingLeft = this._paddingBottom = this._paddingRight = this._paddingTop = this._marginLeft = this._marginBottom = this._marginRight = this._marginTop = this._fullHeight = this._fullWidth = this._outerHeight = this._outerWidth = this._innerHeight = this._innerWidth = this._height = this._width = this._offset = null)
    }
});
Netcel.Html.getViewport = function(e) {
    e = e ? e : Netcel.defaultJquery;
    var c = window.pageXOffset || document.body.scrollLeft,
        f = window.pageYOffset || document.body.scrollTop;
    e = e(window);
    return {
        x: c,
        y: f,
        width: e.width(),
        height: e.height()
    }
};
Netcel.Html.Metrics.screenToPage = function(d, c) {
    "object" == typeof d && (c = d.y, d = d.x);
    return {
        x: d + (window.pageXOffset || document.body.scrollLeft),
        y: c + (window.pageYOffset || document.body.scrollTop)
    }
};
Netcel.Html.Metrics.pageToScreen = function(e, c) {
    "object" == typeof e && (c = e.y, e = e.x);
    var f = Netcel.Html.getPageScroll();
    return {
        x: e - f.x,
        y: c - f.y
    }
};
Netcel.Html.getPageScroll = function() {
    return {
        x: document.documentElement.scrollLeft || window.pageXOffset,
        y: document.documentElement.scrollTop || window.pageYOffset
    }
};
Netcel.Html.setPageScroll = function(d, c) {
    "object" == typeof d ? (c = d.y, d = d.x) : (void 0 === c, c = d, d = null);
    isNaN(d) || (d = Math.max(0, d), window.pageXOffset = d, document.documentElement.scrollLeft = d, document.body.scrollLeft = d);
    isNaN(c) || (c = Math.max(0, c), window.pageYOffset = c, document.documentElement.scrollTop = c, document.body.scrollTop = c)
};
Netcel.Html.getMetrics = function(g, f, j) {
    f = f ? f : Netcel.defaultJquery;
    g = f(g);
    var k;
    if (1 < g.length) {
        k = [];
        for (var h = 0; h < g.length; h++) {
            k.push(new Netcel.Html.Metrics(g[h], f, j))
        }
    } else {
        k = 0 == g.length ? null : new Netcel.Html.Metrics(g, f, j)
    }
    return k
};
Netcel.Html.getRealImageSizes = function(h, g) {
    g = h(g);
    for (var l, m, k = [], j = 0; j < g.length; j++) {
        l = h(g[j]),
        l.is("img") ? (m = new Image, m.src = l.attr("src"), k[j] = m) : k[j] = null
    }
    return k
};
Netcel.UI = {
    DraggableMixin: {
        _initDraggable: function(h, m, g) {
            g = this._draggable_options = h.extend({}, {
                transform: !0,
                scale_threshold: 0.1,
                rotation_threshold: 15,
                drag: !0,
                drag_min_distance: 20,
                drag_direction: "any",
                swipe: !0,
                swipe_time: 200,
                swipe_min_distance: 20,
                swipe_direction: "any",
                tap: !0,
                tap_double: !0,
                tap_max_interval: 300,
                tap_max_distance: 10,
                tap_double_distance: 20,
                hold: !0,
                hold_timeout: 500,
                target: this,
                css_hacks: !0,
                preventDownDefault: "mouse",
                preventUpDefault: !1,
                preventMoveDefault: !1
            }, g);
            this._draggable_$ = h;
            m = this._draggable_element = h(m);
            this._draggable_mouseUpProxy = h.proxy(this._draggable_onMouseUp, this);
            this._draggable_mouseMoveProxy = h.proxy(this._draggable_onMouseMove, this);
            this._draggable_mouseDownProxy = h.proxy(this._draggable_onMouseDown, this);
            this._draggable_dragStartProxy = h.proxy(this._draggable_onDragStart, this);
            this._draggable_pos = {};
            this._draggable_fingers = {};
            this._draggable_gesture = null;
            this._draggable_has_touch = "ontouchstart" in window;
            this._draggable_interaction_type = null;
            m.bind("mousedown touchstart", this._draggable_mouseDownProxy);
            m.bind("click tap", this._draggable_mouseUpProxy);
            m.bind("dragstart", this._draggable_dragStartProxy);
            if (g.css_hacks) {
                h = ["webkit", "moz", "ms", "o", ""];
                g = {
                    userSelect: "none",
                    touchCallout: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                };
                for (var l = "", k = 0; k < h.length; k++) {
                    for (var j in g) {
                        l = j,
                        h[k] && (l = h[k] + l.substring(0, 1).toUpperCase() + l.substring(1)),
                        m.css(l, g[j])
                    }
                }
            }
        },
        _draggable_countFingers: function(b) {
            b.originalEvent && (b = b.originalEvent);
            return b.touches ? b.touches.length : 1
        },
        _draggable_isTransform: function(h) {
            var m = this._draggable_options;
            if (m.transform) {
                if (2 != this._draggable_countFingers(h)) {
                    return !1
                }
                var g = this._draggable_pos,
                    l = this._draggable_calculateRotation(g.start, g.move),
                    k = this._draggable_calculateScale(g.start, g.move);
                if ("drag" != this._draggable_gesture && ("transform" == this._draggable_gesture || Math.abs(1 - k) > m.scale_threshold || Math.abs(l) > m.rotation_threshold)) {
                    try {
                        this._draggable_gesture = "transform",
                        g.center = {
                            x: (g.move[0].x + g.move[1].x) / 2,
                            y: (g.move[0].y + g.move[1].y) / 2
                        },
                        this._draggable_first && (m.target._onTransformStart instanceof Function && m.target._onTransformStart(this._draggable_event_start, g.center, k, l, g.move), this._draggable_first = !1),
                        m.target._onTransforming instanceof Function && m.target._onTransforming(h, g.center, k, l, g.move)
                    } catch (j) {
                        Netcel.log("error", j.toString().substr(0, 100))
                    }
                    return !0
                }
            }
            return !1
        },
        _draggable_isDrag: function(h) {
            if ("cancelled" != this._draggable_gesture) {
                var m = this._draggable_options,
                    g = this._draggable_pos,
                    l = g.move[0].x - g.start[0].x,
                    g = g.move[0].y - g.start[0].y,
                    k = Math.sqrt(l * l + g * g);
                if (m.drag && k > m.drag_min_distance || "drag" == this._draggable_gesture) {
                    if (this._draggable_first) {
                        switch (m.drag_direction) {
                        case "horizontal":
                            if (Math.abs(l) <= Math.abs(g)) {
                                this._draggable_gesture = "cancelled";
                                return
                            }
                            break;
                        case "vertical":
                            if (Math.abs(l) >= Math.abs(g)) {
                                this._draggable_gesture = "cancelled";
                                return
                            }
                        }
                        m.target._onDragStart instanceof Function && m.target._onDragStart(this._draggable_event_start, this._draggable_getPageCoords(h));
                        if ("touchmove" == h.type.toLowerCase()) {
                            var j = this;
                            this._draggable_touchEndTimeout = setTimeout(function() {
                                j._draggable_onMouseUp(h)
                            }, 500);
                            this._draggable_element.on("touchstart", this._draggable_preventDefault);
                            $(window).on("touchstart", this._draggable_mouseUpProxy)
                        }
                        this._draggable_gesture = "drag";
                        this._draggable_first = !1
                    }
                    m.target._onDragging instanceof Function && m.target._onDragging(h, this._draggable_getPageCoords(h))
                }
            }
        },
        _draggable_preventDefault: function() {
            return !1
        },
        _draggable_isTap: function(j) {
            var o = this._draggable_options,
                h = this._draggable_pos,
                n = this._draggable_prev_tap_pos,
                m = (new Date).getTime(),
                l = m - this._draggable_touch_start_time;
            if (o.hold && !(o.hold && o.hold_timeout > l)) {
                return !1
            }
            l = !1;
            if (n && o.tap_double && "tap" == this._draggable_prev_gesture && this._draggable_touch_start_time - this._draggable_prev_tap_end_time < o.tap_max_interval) {
                var l = Math.abs(n[0].x - h.start[0].x),
                    k = Math.abs(n[0].y - h.start[0].y),
                    l = n && h.start && Math.max(l, k) < o.tap_double_distance
            }
            l ? (this._draggable_gesture = "double_tap", this._draggable_prev_tap_end_time = null, o.target._onDoubleTap instanceof Function && o.target._onDoubleTap(j, h.start[0])) : (l = h.move ? Math.abs(h.move[0].x - h.start[0].x) : 0, k = h.move ? Math.abs(h.move[0].y - h.start[0].y) : 0, _distance = Math.max(l, k), _distance < o.tap_max_distance && (this._draggable_gesture = "tap", this._draggable_prev_tap_end_time = m, this._draggable_prev_tap_pos = h.start, o.tap && o.target._onTap instanceof Function && o.target._onTap(j, h.start[0])))
        },
        _draggable_isSwipe: function(k) {
            var q = this._draggable_options,
                j = this._draggable_pos;
            if (j.move) {
                var p = j.move[0].x - j.start[0].x,
                    o = j.move[0].y - j.start[0].y,
                    n = Math.sqrt(p * p + o * o),
                    m = (new Date).getTime() - this._draggable_touch_start_time;
                if (q.swipe && q.swipe_time > m && n > q.swipe_min_distance) {
                    var m = this._draggable_getAngle(j.start[0], j.move[0]),
                        l = this._draggable_getDirectionFromAngle(m);
                    q.target._onSwipe && q.target._onSwipe(k, j.move[0], l, n, p, o, m)
                }
            }
        },
        _draggable_getDirectionFromAngle: function(e) {
            e = {
                down: 45 <= e && 135 > e,
                left: 135 <= e || -135 >= e,
                up: -45 > e && -135 < e,
                right: -45 <= e && 45 >= e
            };
            var f,
                d;
            for (d in e) {
                if (e[d]) {
                    f = d;
                    break
                }
            }
            return f
        },
        _draggable_calculateScale: function(g, k) {
            if (2 == g.length && 2 == k.length) {
                var f,
                    j;
                f = g[0].x - g[1].x;
                j = g[0].y - g[1].y;
                var h = Math.sqrt(f * f + j * j);
                f = k[0].x - k[1].x;
                j = k[0].y - k[1].y;
                return Math.sqrt(f * f + j * j) / h
            }
            return 0
        },
        _draggable_getAngle: function(b, d) {
            return 180 * Math.atan2(d.y - b.y, d.x - b.x) / Math.PI
        },
        _draggable_calculateRotation: function(g, k) {
            if (2 == g.length && 2 == k.length) {
                var f,
                    j;
                f = g[0].x - g[1].x;
                j = g[0].y - g[1].y;
                var h = 180 * Math.atan2(j, f) / Math.PI;
                f = k[0].x - k[1].x;
                j = k[0].y - k[1].y;
                return 180 * Math.atan2(j, f) / Math.PI - h
            }
            return 0
        },
        _draggable_preventDownDefault: function(b) {
            var d = this._draggable_options;
            return b && b.originalEvent && b.originalEvent.__uiIgnore ? !1 : !0 === d.preventDownDefault ? !0 : !1 === d.preventDownDefault ? !1 : this._draggable_interaction_type == d.preventDownDefault
        },
        _draggable_preventMoveDefault: function(b) {
            var d = this._draggable_options;
            return !0 === d.preventMoveDefault ? !0 : !1 === d.preventMoveDefault ? !1 : "function" === typeof d.preventMoveDefault ? !!d.preventMoveDefault(b, this) : this._draggable_interaction_type == d.preventMoveDefault
        },
        _draggable_preventUpDefault: function() {
            var b = this._draggable_options;
            return !0 === b.preventUpDefault ? !0 : !1 === b.preventUpDefault ? !1 : this._draggable_interaction_type == b.preventUpDefault
        },
        _draggable_onDragStart: function(b) {
            b.preventDefault();
            b.stopImmediatePropagation();
            return !1
        },
        _draggable_onMouseDown: function(f) {
            if (!this._draggable_interaction_type) {
                switch (f.type) {
                case "touchstart":
                    this._draggable_interaction_type = "touch";
                    break;
                case "mousedown":
                    this._draggable_interaction_type = "mouse";
                    break;
                default:
                    this._draggable_interaction_type = "unknown"
                }
            }
            var h = this._draggable_$,
                e = this._draggable_pos,
                g = this._draggable_options;
            e.move = e.start = this._draggable_getPageCoords(f, !1, !0);
            this._draggable_touch_start_time = (new Date).getTime();
            this._draggable_fingers = this._draggable_countFingers(f);
            this._draggable_first = !0;
            this._draggable_event_start = f;
            this._draggable_gesture = "";
            h(window).on("mouseup touchend touchcancel dragend click tap touchleave", this._draggable_mouseUpProxy).on("drag mousemove touchmove", this._draggable_mouseMoveProxy);
            this._draggable_element.on("mouseup touchend touchcancel dragend click tap touchleave", this._draggable_mouseUpProxy);
            g.target._onPress instanceof Function && g.target._onPress(f, this._draggable_getPageCoords(f));
            this._draggable_element.focus();
            this._draggable_preventDownDefault(f) && (f.preventDefault(), f.stopImmediatePropagation())
        },
        _draggable_onMouseMove: function(b) {
            this._draggable_pos.move = this._draggable_getPageCoords(b, !1, !0);
            this._draggable_touchEndTimeout && (clearTimeout(this._draggable_touchEndTimeout), this._draggable_touchEndTimeout = null);
            this._draggable_isTransform(b) || this._draggable_isDrag(b);
            this._draggable_preventMoveDefault(b) && (b.preventDefault(), b.stopImmediatePropagation())
        },
        _draggable_onMouseUp: function(h) {
            var m = this._draggable_$,
                g = this._draggable_gesture,
                l = this._draggable_options;
            this._draggable_preventUpDefault() && (h.preventDefault(), h.stopImmediatePropagation());
            "transform" != g && null !== g && this._draggable_isTap(h);
            g = this._draggable_gesture;
            m(window).off("mouseup touchend touchcancel dragend click tap touchleave", this._draggable_mouseUpProxy).off("mousemove touchmove drag", this._draggable_mouseMoveProxy).off("touchstart", this._draggable_mouseUpProxy);
            this._draggable_element.off("mouseup touchend touchcancel dragend click tap touchleave", this._draggable_mouseUpProxy);
            this._draggable_element.off("touchstart", this._draggable_preventDefault);
            if ((this._draggable_isDragging || "dragend" != h.type) && this._draggable_gesture) {
                if (this._draggable_isDragging = !1, this._draggable_gesture = null, this._draggable_isSwipe(h), "drag" == g && l.target._onDragEnd instanceof Function && l.target._onDragEnd(h, this._draggable_getPageCoords(h, !0)), "transform" == g && l.target._onTransformEnd instanceof Function && l.target._onTransformEnd(h), l.target._onRelease instanceof Function && l.target._onRelease(h), this._draggable_prev_gesture = g, "mouseup" == h.type) {
                    if (this._draggable_interaction_type = null, g && l[g]) {
                        var k = this,
                            j = function(b) {
                                b.preventDefault();
                                b.stopImmediatePropagation();
                                k._draggable_element.unbind("click", j)
                            };
                        this._draggable_element.bind("click", j)
                    }
                } else {
                    k = this,
                    m(document).bind("mouseup", function(b) {
                        k._draggable_interaction_type = null;
                        m(document).unbind("mouseup", arguments.callee)
                    })
                }
            }
        },
        _draggable_getPageCoords: function(g, k, f) {
            var j = this._draggable_$;
            if (null != g && null != g.originalEvent) {
                if (f) {
                    f = g.originalEvent ? g.originalEvent : g;
                    if (this._draggable_has_touch && 0 != f.type.indexOf("mouse")) {
                        g = [];
                        for (var j = 0, h = f.touches.length; j < h; j++) {
                            k = f.touches[j],
                            g.push({
                                x: k.pageX,
                                y: k.pageY
                            })
                        }
                        return g
                    }
                    return [this._draggable_getPageCoords(g, k, !1)]
                }
                return null != g.originalEvent.touches ? (f = k ? g.originalEvent.changedTouches : g.originalEvent.touches, {
                    x: f[0].pageX,
                    y: f[0].pageY
                }) : void 0 !== g.originalEvent.pageX ? {
                    x: g.originalEvent.pageX,
                    y: g.originalEvent.pageY
                } : {
                    x: g.originalEvent.screenX + j(window).scrollLeft(),
                    y: g.originalEvent.screenY + j(window).scrollTop()
                }
            }
            return {
                x: 0,
                y: 0
            }
        }
    }
};
Netcel.Class.create("UI.SlideBar", Netcel.Widget, Netcel.EventDispatcher, {
    initialize: function(e, f, d) {
        this.$super.initialize(e, f, d, {
            ns: "ncj-ui-slidebar",
            matchSize: !0,
            vertical: !1,
            handleInsideArea: !1,
            min: 0,
            max: 100,
            step: 0,
            initial: 0,
            keySpeed: 1
        });
        if ("input" == this.element[0].nodeName.toLowerCase()) {
            this.element.wrap("<div />");
            this.input = f;
            this.element = this.input.parent();
            f = this.input.classList();
            for (d = 0; d < f.length; d++) {
                this.element.addClass(f[d]),
                this.input.removeClass(f[d])
            }
            this._options.matchSize && this.element.css({
                width: this.input.width() + "px",
                height: this.input.height() + "px"
            });
            this.input.css("display", "none")
        }
        this._area = this._createIfNotFound("." + this._options.ns + "-area", '<div class="' + this._options.ns + '-area" />');
        this._handle = this._createIfNotFound("." + this._options.ns + "-handle", '<button type="button" class="' + this._options.ns + '-handle" />');
        this._less = this._createIfNotFound("." + this._options.ns + "-less", '<div class="' + this._options.ns + '-less" />');
        this._more = this._createIfNotFound("." + this._options.ns + "-more", '<div class="' + this._options.ns + '-more" />');
        this._minElement = this._createIfNotFound("." + this._options.ns + "-min", null);
        this._maxElement = this._createIfNotFound("." + this._options.ns + "-max", null);
        this._currentElement = this._createIfNotFound("." + this._options.ns + "-current", null);
        this._areaMetrics = new Netcel.Html.Metrics(this._area, this._$, !0);
        this._handleMetrics = new Netcel.Html.Metrics(this._handle, this._$, !0);
        "absolute" != this._area.css("position") && this._area.css("position", "relative");
        "absolute" != this._handle.css("position") && this._handle.css("position", "absolute");
        this._handle.css({
            cursor: "pointer"
        });
        this._less.css({
            position: "absolute"
        });
        this._more.css({
            position: "absolute"
        });
        this._area.css({
            cursor: "pointer"
        });
        this.isVertical ? (this._less.css({
            bottom: 0
        }), this._more.css({
            top: 0
        })) : (this._less.css({
            left: 0
        }), this._more.css({
            right: 0
        }));
        this._handle.attr("tabindex", 0);
        0 == this._area.parent().length && this.element.append(this._area);
        this._area.append(this._less).append(this._handle).append(this._more);
        this._onHandleDragProxy = e.proxy(this._onHandleDrag, this);
        this._onHandleReleaseProxy = e.proxy(this._onHandleRelease, this);
        this._handle.on("mousedown", e.proxy(this._onHandlePress, this));
        this._handle.on("click", e.proxy(this._onHandleClick, this));
        this._handle.on("keydown", e.proxy(this._onHandleKeyDown, this));
        this._area.on("click", e.proxy(this._onAreaClick, this));
        this._handleClickOff = this._step = this._max = this._min = 0;
        this.numberFormattingCallback = null;
        this.set_min(this._options.min);
        this.set_max(this._options.max);
        this.set_step(this._options.step);
        this._doSetValue(this._options.initial);
        this._onResizeProxy = e.proxy(this._onResize, this);
        this.element.resize(this._onResizeProxy);
        e(document).on("resize", this._onResizeProxy)
    },
    getValueFromFraction: function(b) {
        return this.get_min() + this.get_range() * b
    },
    getFractionFromValue: function(b) {
        return (b - this.get_min()) / this.get_range()
    },
    isVertical: function() {
        return this._options.vertical
    },
    _onResize: function(b) {
        this._positionHandle()
    },
    _onHandlePress: function(e) {
        var f = this._$;
        this._handle.focus();
        e.preventDefault();
        try {
            document.activeElement && (document.activeElement = this._handle[0])
        } catch (d) {}
        this._handleClickOff = -this._handleMetrics.globalToLocal(e.pageX, e.pageY)[this.isVertical() ? "y" : "x"];
        f(document).on("mousemove", this._onHandleDragProxy);
        f(document).on("mouseup", this._onHandleReleaseProxy);
        this.dispatchEvent({
            type: "onstartdrag"
        })
    },
    _onHandleDrag: function(b) {
        this._setValueToEventPosition(b, this._handleClickOff);
        b.preventDefault()
    },
    _onHandleRelease: function(b) {
        this._handleClickOff = 0;
        $(document).off("mousemove", this._onHandleDragProxy);
        $(document).off("mouseup", this._onHandleReleaseProxy);
        this.dispatchEvent({
            type: "onenddrag"
        })
    },
    _onHandleKeyDown: function(e) {
        var f = 0,
            d = 0 == this.get_step() ? this._options.keySpeed : this._options.keySpeed * this.get_step();
        switch (e.keyCode) {
        case 37:
        case 40:
            f = -d;
            break;
        case 38:
        case 39:
            f = d
        }
        0 != f && (0 > this.get_range() && (f *= -1), d = this.get_value(), f += d, this._options.keySkipValueCallback instanceof Function && (f = this._options.keySkipValueCallback(f, d)), this._doSetValue(f));
        e.preventDefault()
    },
    _onAreaClick: function(b) {
        this._setValueToEventPosition(b);
        this._handle.focus()
    },
    _onHandleClick: function(b) {
        this._handle.focus()
    },
    _doSetValue: function(e, f) {
        if (Netcel.NumberUtil.isNumber(e) && (this.input && this.input.val(e), e = Netcel.NumberUtil.clamp(this._snapValueToStep(Netcel.NumberUtil.toNumber(e)), this.get_min(), this.get_max()), e != this._value)) {
            var d = null;
            void 0 != this._value && (d = this._value);
            this._value = e;
            this._positionHandle();
            this._currentElement && this._currentElement.html(this.numberFormattingCallback ? this.numberFormattingCallback(this._value) : this._value);
            null === d || f || this.dispatchEvent({
                type: "onchange",
                oldValue: d,
                value: e
            })
        }
    },
    get_value: function() {
        return this._value
    },
    set_value: function(b) {
        this._doSetValue(b, !0)
    },
    get_range: function() {
        return this.get_max() - this.get_min()
    },
    get_min: function() {
        return this._min
    },
    set_min: function(b) {
        this._min = b;
        this._snapValueToStep();
        this._positionHandle();
        this._minElement && this._minElement.html(this.numberFormattingCallback ? this.numberFormattingCallback(this._min) : this._min)
    },
    get_max: function() {
        return this._max
    },
    set_max: function(b) {
        this._max = b;
        this._snapValueToStep();
        this._positionHandle();
        this._maxElement && this._maxElement.html(this.numberFormattingCallback ? this.numberFormattingCallback(this._max) : this._max)
    },
    get_step: function() {
        return this._step
    },
    set_step: function(b) {
        this._step = b;
        this._snapValueToStep();
        this._positionHandle()
    },
    get_areaSize: function() {
        return this.isVertical() ? this._area.height() : this._area.width()
    },
    _setValueToEventPosition: function(e, f) {
        var d = f ? f : 0;
        this.isVertical() ? (d += this._areaMetrics.globalToLocal(e.pageX, e.pageY, !0).y, d = 1 - d / this.get_areaSize()) : (d += this._areaMetrics.globalToLocal(e.pageX, e.pageY, !0).x, d /= this.get_areaSize());
        d = Netcel.NumberUtil.clamp(d, 0, 1);
        this._doSetValue(this.getValueFromFraction(d))
    },
    _positionHandle: function() {
        var e = "",
            f = this.isVertical(),
            e = this.getFractionFromValue(this._value);
        f && (e = 1 - e);
        var d = this.get_areaSize() * e,
            e = d + "px";
        this._handle.css(f ? "margin-top" : "margin-left", e);
        this.isVertical() ? (this._less.css({
            height: e
        }), this._more.css({
            height: d - this.get_areaSize() + "px"
        })) : (this._less.css({
            width: e
        }), this._more.css({
            width: d - this.get_areaSize() + "px"
        }))
    },
    _snapValueToStep: function(b) {
        var d = !1;
        void 0 === b && (d = !0, b = this._value);
        0 != this.get_step() && (b = Math.round((b - this.get_min()) / this.get_step()) * this.get_step() + this.get_min());
        d && (this._value = b);
        return b
    },
    _createIfNotFound: function(e, f) {
        var d = this.element.find(e);
        return 0 == d.length ? $(f) : d
    },
    __init__: function(b) {
        Netcel.defaultInit(b, Netcel.UI.SlideBar)
    }
});
Netcel.Class.create("UI.ProgressBar", Netcel.Widget, {
    initialize: function(b, d) {
        this.$super.initialize(b, null, d, {
            smooth: !0,
            autoremove: !0,
            noReduce: !1
        });
        this._element = b('<div class="' + this._cssname + '"><div class="' + this._cssname + '-mask" style="overflow:hidden; width:0;"><div class="' + this._cssname + '-bar"></div></div></div>');
        this._mask = this._element.find("." + this._cssname + "-mask");
        this._progress = 0
    },
    setProgress: function(g, k) {
        var f,
            j = this._$;
        f = Math.max(0, Math.min(1, g / k));
        this._options.noReduce && f < this.get_progress() && (f = this.get_progress());
        this._progress = f;
        if (this._options.smooth) {
            var h = this;
            this._mask.animate({
                width: 100 * f + "%"
            }, {
                queue: !1,
                step: function(d, c) {
                    h.dispatchEvent({
                        type: "onmove",
                        to: d / 100
                    })
                },
                complete: 1 == f ? j.proxy(this.destroy, this) : null
            })
        } else {
            this._mask.css("width", 100 * f + "%"),
            this.dispatchEvent({
                type: "onmove",
                to: f
            }),
            1 <= f && this.destroy()
        }
    },
    listen: function(b) {
        this._dispatcher = b;
        b.addEventListener("progress", this._onProgress, this)
    },
    destroy: function(b) {
        var d = this._$;
        this._options.smooth && !b ? this._element.animate({
            opacity: 0
        }, {
            complete: d.proxy(this._doDestroy, this),
            duration: 250
        }) : this._doDestroy()
    },
    get_progress: function() {
        return this._progress
    },
    _onProgress: function(b) {
        this.setProgress(b.current, b.total)
    },
    _doDestroy: function() {
        this._dispatcher && (this._dispatcher.removeEventListener("progress", this._onProgress), this._dispatcher = null);
        this._element && (this._element.remove(), this._element = null);
        this.destroyed = !0
    }
});
Netcel.Easer = {
    defaultOptions: {
        time: 1,
        transition: "easeInOutQuad",
        delay: 0,
        onComplete: null,
        onCompleteParams: [],
        onStart: null,
        onStartParams: [],
        onUpdate: null,
        onUpdateParams: [],
        overwrite: !0,
        rounded: !1
    },
    _activeEases: [],
    addEase: function(h, g) {
        g = this.mergeOptions(g, this.defaultOptions);
        g.base && (g = this.mergeOptions(g, base));
        var m = {},
            l = {};
        for (s in g) {
            switch (s) {
            case "time":
                l.time = parseFloat(g[s]);
                break;
            case "transition":
                l.transition = g[s] instanceof Function ? g[s] : this.transitions[g[s]];
                break;
            case "base":
                break;
            case "delay":
                l.delay = parseFloat(g[s]);
                break;
            case "onComplete":
                l.onComplete = g[s];
                break;
            case "onCompleteParams":
                l.onCompleteParams = g[s];
                break;
            case "onStart":
                l.onStart = g[s];
                break;
            case "onStartParams":
                l.onStartParams = g[s];
                break;
            case "onUpdate":
                l.onUpdate = g[s];
                break;
            case "onUpdateParams":
                l.onUpdateParams = g[s];
                break;
            case "overwrite":
                break;
            case "rounded":
                l.rounded = !0 == g[s];
                break;
            default:
                m[s] = g[s]
            }
        }
        h instanceof Array || (h = [h]);
        for (var k = 0; k < h.length; k++) {
            for (var j in m) {
                this._registerEase(new Netcel.Easer.Ease(h[k], j, m[j], l))
            }
        }
    },
    _registerEase: function(b) {
        this._activeEases.push(b);
        1 == this._activeEases.length && (this._onUpdateProxy || (this._onUpdateProxy = function() {
            arguments.callee.func.apply(arguments.callee.context, arguments.callee.args)
        }, this._onUpdateProxy.func = this._onUpdate, this._onUpdateProxy.context = this, this._onUpdateProxy.args = []), window.requestAnimFrame(this._onUpdateProxy))
    },
    _onUpdate: function() {
        for (var d = (new Date).valueOf(), c = this._activeEases.length - 1; -1 < c; --c) {
            this._activeEases[c].update(d) && this._activeEases.splice(c, 1)
        }
        0 < this._activeEases.length && window.requestAnimFrame(this._onUpdateProxy)
    },
    mergeOptions: function(g, f) {
        var k = {};
        if (f.base) {
            var j = f.base;
            delete f.base;
            f = this.mergeOptions(f, j)
        }
        g.base && (j = g.base, delete g.base, g = this.mergeOptions(g, j));
        for (var h in f) {
            void 0 === g[h] && (k[h] = f[h])
        }
        for (h in g) {
            k[h] = g[h]
        }
        return k
    },
    transitions: {
        linear: function(f, e, h, g) {
            return e + f / g * h
        },
        easeInQuad: function(f, e, h, g) {
            return h * (f /= g) * f + e
        },
        easeOutQuad: function(f, e, h, g) {
            return -h * (f /= g) * (f - 2) + e
        },
        easeInOutQuad: function(f, e, h, g) {
            return 1 > (f /= g / 2) ? h / 2 * f * f + e : -h / 2 * (--f * (f - 2) - 1) + e
        },
        easeInCubic: function(f, e, h, g) {
            return h * (f /= g) * f * f + e
        },
        easeOutCubic: function(f, e, h, g) {
            return h * ((f = f / g - 1) * f * f + 1) + e
        },
        easeInOutCubic: function(f, e, h, g) {
            return 1 > (f /= g / 2) ? h / 2 * f * f * f + e : h / 2 * ((f -= 2) * f * f + 2) + e
        },
        easeInQuart: function(f, e, h, g) {
            return h * (f /= g) * f * f * f + e
        },
        easeOutQuart: function(f, e, h, g) {
            return -h * ((f = f / g - 1) * f * f * f - 1) + e
        },
        easeInOutQuart: function(f, e, h, g) {
            return 1 > (f /= g / 2) ? h / 2 * f * f * f * f + e : -h / 2 * ((f -= 2) * f * f * f - 2) + e
        },
        easeInQuint: function(f, e, h, g) {
            return h * (f /= g) * f * f * f * f + e
        },
        easeOutQuint: function(f, e, h, g) {
            return h * ((f = f / g - 1) * f * f * f * f + 1) + e
        },
        easeInOutQuint: function(f, e, h, g) {
            return 1 > (f /= g / 2) ? h / 2 * f * f * f * f * f + e : h / 2 * ((f -= 2) * f * f * f * f + 2) + e
        },
        easeInSine: function(f, e, h, g) {
            return -h * Math.cos(f / g * (Math.PI / 2)) + h + e
        },
        easeOutSine: function(f, e, h, g) {
            return h * Math.sin(f / g * (Math.PI / 2)) + e
        },
        easeInOutSine: function(f, e, h, g) {
            return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + e
        },
        easeInExpo: function(f, e, h, g) {
            return 0 == f ? e : h * Math.pow(2, 10 * (f / g - 1)) + e
        },
        easeOutExpo: function(f, e, h, g) {
            return f == g ? e + h : h * (-Math.pow(2, -10 * f / g) + 1) + e
        },
        easeInOutExpo: function(f, e, h, g) {
            return 0 == f ? e : f == g ? e + h : 1 > (f /= g / 2) ? h / 2 * Math.pow(2, 10 * (f - 1)) + e : h / 2 * (-Math.pow(2, -10 * --f) + 2) + e
        },
        easeInCirc: function(f, e, h, g) {
            return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + e
        },
        easeOutCirc: function(f, e, h, g) {
            return h * Math.sqrt(1 - (f = f / g - 1) * f) + e
        },
        easeInOutCirc: function(f, e, h, g) {
            return 1 > (f /= g / 2) ? -h / 2 * (Math.sqrt(1 - f * f) - 1) + e : h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + e
        },
        easeInElastic: function(j, h, o, n) {
            var m = 1.70158,
                l = 0,
                k = o;
            if (0 == j) {
                return h
            }
            if (1 == (j /= n)) {
                return h + o
            }
            l || (l = 0.3 * n);
            k < Math.abs(o) ? (k = o, m = l / 4) : m = l / (2 * Math.PI) * Math.asin(o / k);
            return -(k * Math.pow(2, 10 * (j -= 1)) * Math.sin((j * n - m) * 2 * Math.PI / l)) + h
        },
        easeOutElastic: function(j, h, o, n) {
            var m = 1.70158,
                l = 0,
                k = o;
            if (0 == j) {
                return h
            }
            if (1 == (j /= n)) {
                return h + o
            }
            l || (l = 0.3 * n);
            k < Math.abs(o) ? (k = o, m = l / 4) : m = l / (2 * Math.PI) * Math.asin(o / k);
            return k * Math.pow(2, -10 * j) * Math.sin((j * n - m) * 2 * Math.PI / l) + o + h
        },
        easeInOutElastic: function(j, h, o, n) {
            var m = 1.70158,
                l = 0,
                k = o;
            if (0 == j) {
                return h
            }
            if (2 == (j /= n / 2)) {
                return h + o
            }
            l || (l = n * 0.3 * 1.5);
            k < Math.abs(o) ? (k = o, m = l / 4) : m = l / (2 * Math.PI) * Math.asin(o / k);
            return 1 > j ? -0.5 * k * Math.pow(2, 10 * (j -= 1)) * Math.sin((j * n - m) * 2 * Math.PI / l) + h : 0.5 * k * Math.pow(2, -10 * (j -= 1)) * Math.sin((j * n - m) * 2 * Math.PI / l) + o + h
        },
        easeInBack: function(g, f, k, j, h) {
            void 0 == h && (h = 1.70158);
            return k * (g /= j) * g * ((h + 1) * g - h) + f
        },
        easeOutBack: function(g, f, k, j, h) {
            void 0 == h && (h = 1.70158);
            return k * ((g = g / j - 1) * g * ((h + 1) * g + h) + 1) + f
        },
        easeInOutBack: function(g, f, k, j, h) {
            void 0 == h && (h = 1.70158);
            return 1 > (g /= j / 2) ? k / 2 * g * g * (((h *= 1.525) + 1) * g - h) + f : k / 2 * ((g -= 2) * g * (((h *= 1.525) + 1) * g + h) + 2) + f
        },
        easeInBounce: function(f, e, h, g) {
            return h - Netcel.Easer.transitions.easeOutBounce(g - f, 0, h, g) + e
        },
        easeOutBounce: function(f, e, h, g) {
            return (f /= g) < 1 / 2.75 ? h * 7.5625 * f * f + e : f < 2 / 2.75 ? h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + e : f < 2.5 / 2.75 ? h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + e : h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + e
        },
        easeInOutBounce: function(f, e, h, g) {
            return f < g / 2 ? 0.5 * Netcel.Easer.transitions.easeInBounce(2 * f, 0, h, g) + e : 0.5 * Netcel.Easer.transitions.easeOutBounce(2 * f - g, 0, h, g) + 0.5 * h + e
        }
    }
};
Netcel.Class.create("Easer.Ease", {
    initialize: function(f, e, h, g) {
        this._item = f;
        this._property = e;
        this._targetValue = h;
        this._initValue = this.get_item_value();
        this._deltaValue = this._targetValue - this._initValue;
        this._options = g;
        this._startTime = (new Date).valueOf();
        this._started = !1;
        console.log(this._initValue, this._targetValue)
    },
    update: function(d) {
        var c = this._options;
        d = (d - this._startTime) / 1000 - c.delay;
        if (0 < d) {
            if (d > c.time) {
                return this.set_item_value(this._targetValue), c.onComplete && c.onComplete.apply(item, this.options.onCompleteParams), !0
            }
            this.set_item_value(c.transition(d, this._initValue, this._deltaValue, c.time));
            this._started || (this._started = !0, c.onStart && c.onStart.apply(item, c.onStartParams));
            c.onUpdate && c.onUpdate.apply(item, c.onUpdateParams)
        }
        return !1
    },
    get_item_value: function() {
        var d = this._item,
            c = this._property;
        return d["get_" + c] instanceof Function ? d["get_" + c]() : d[c]
    },
    set_item_value: function(e) {
        var d = this._item,
            f = this._property;
        e = this._options.rounded ? Math.round(e) : e;
        if (d["set_" + f] instanceof Function) {
            d["set_" + f](e)
        } else {
            d[f] = e
        }
    },
    get_item: function() {
        return this._item
    },
    get_property: function() {
        return this._property
    }
});
Netcel.Class.create("SimpleSlider", Netcel.Widget, true, Netcel.Shared.FilteringItemMixin, Netcel.Shared.ResizingMixin, Netcel.UI.DraggableMixin, {
    initialize: function(t, r, k) {
        var u = {
            prevButtonLabel: "«",
            nextButtonLabel: "»",
            scrollPage: true,
            initIndex: 0,
            animationParams: {
                duration: 600
            },
            initMode: "horizontal",
            matchContentSize: false,
            swipeIgnoreSelector: null
        };
        this.$super.initialize(t, r, k, u);
        r = this.element;
        k = this._options;
        this._mode = k.initMode;
        r.css("position", "relative");
        var q = this._list = r.children("ul, ol");
        q.css({
            "list-style": "none",
            margin: 0,
            padding: 0
        }).addClass(k.ns + "-list").wrap(t("<div />").css({
            overflow: "hidden",
            position: "relative",
            height: "100%"
        }));
        if (q.css("position") == "static") {
            q.css("position", "relative")
        }
        var p = this._viewport = q.parent();
        var o = this._prevButton = t('<input type="button" tabindex="0" class="' + k.ns + "-ctrl-prev " + k.ns + '-ctrls">').appendTo(r).prop("value", k.prevButtonLabel);
        var l = this._nextButton = t('<input type="button" tabindex="0" class="' + k.ns + "-ctrl-next " + k.ns + '-ctrls">').appendTo(r).prop("value", k.nextButtonLabel);
        q.css({
            left: 0,
            top: 0
        });
        l.click(t.proxy(this.next, this, false));
        o.click(t.proxy(this.prev, this, false));
        var n = this._allFrames = q.children("li");
        this._frames = [];
        var m = this;
        n.each(function() {
            m.addItem(this, true)
        });
        this._index = k.initIndex;
        this._resizing_init(p, true, true);
        this._initDraggable(t, r, {
            preventDownDefault: "mouse",
            tap: false,
            hold: false
        });
        if (k.swipeIgnoreSelector) {
            r.find(k.swipeIgnoreSelector).on("mousedown", function(a) {
                a.originalEvent.__uiIgnore = true
            })
        }
        var m = this;
        t(window).load(function() {
            m._onResized(p.width(), p.height())
        })
    },
    set_mode: function(f) {
        if (f == "vertical" || f == "horizontal" && f != this._mode) {
            var d = this._list,
                e = this._allFrames;
            if (this._options.matchContentSize) {
                d.css({
                    width: "",
                    height: ""
                })
            }
            if (f == "vertical") {
                e.css("left", 0);
                d.css({
                    width: "auto",
                    left: "auto"
                })
            } else {
                e.css("top", 0);
                d.css({
                    height: "",
                    top: 0
                })
            }
            d.css({
                transition: "",
                webkitTransition: "",
                mozTransition: "",
                oTransition: "",
                msTransition: ""
            }).stop(true);
            this._mode = f;
            this._onResized(this._viewport.width(), this._viewport.height())
        }
    },
    getIndexPage: function(b) {
        return Math.floor(b / this.get_itemsPerPage())
    },
    getPageStartIndex: function(b) {
        return b * this.get_itemsPerPage()
    },
    getIndexPageIndex: function(b) {
        return this.getPageStartIndex(this.getIndexPage(b))
    },
    clear: function() {
        if (this._allFrames) {
            this._allFrames.remove();
            this._allFrames = null
        }
        this._frames.length = 0;
        this.set_index(0, true);
        this._onResized(this.element.width(), this._viewport.height())
    },
    addItem: function(e, f) {
        var d = this._$;
        e = d(e).css({
            position: "absolute",
            display: "block"
        }).appendTo(this._list);
        if (!this._allFrames) {
            this._allFrames = e
        } else {
            this._allFrames = this._allFrames.add(e)
        }
        this._frames.push(e);
        if (!f) {
            this._onResized(this._viewport.width(), this._viewport.height())
        }
    },
    next: function(b) {
        if (this._options.scrollPage) {
            this.nextPage(b)
        } else {
            this.nextItem(b)
        }
    },
    prev: function(b) {
        if (this._options.scrollPage) {
            this.prevPage(b)
        } else {
            this.prevItem(b)
        }
    },
    nextItem: function(b) {
        this.set_index(this.get_index() + 1, b)
    },
    nextPage: function(b) {
        if (this.isNextPage()) {
            this.set_index(this.get_index() + this.get_itemsPerPage(), b)
        }
    },
    prevItem: function(b) {
        this.set_index(this.get_index() - 1, b)
    },
    prevPage: function(b) {
        if (this.isPrevPage()) {
            this.set_index(this.get_index() - this.get_itemsPerPage(), b)
        }
    },
    get_index: function() {
        return this._index
    },
    isNextPage: function() {
        return (this.get_index() + this.get_itemsPerPage()) < this.get_numFrames()
    },
    isPrevPage: function() {
        return this._index > 0
    },
    set_index: function(B, G) {
        var r = this._options;
        B = Netcel.NumberUtil.toNumber(B);
        B = B < 0 ? 0 : B >= this.get_numFrames() ? this.get_numFrames() - 1 : B;
        if (B != this._index) {
            if (this._index < 0) {
                this._index = 0
            }
            var x = this._index;
            var t = (-this._itemSpacing * B) + "px";
            var A = this._list,
                w = this._allFrames,
                z = this._frames,
                C = this._$;
            var F = this.get_itemsPerPage();
            var y = this._mode == "horizontal" ? "left" : "top";
            if (G) {
                A.css(y, t);
                if (w) {
                    w.css("display", "none")
                }
                for (var D = B; D < B + F; D++) {
                    if (z[D]) {
                        z[D].css("display", "")
                    }
                }
                this.dispatchEvent({
                    type: "setIndex",
                    index: B,
                    oldIndex: x
                })
            } else {
                var x = this._index;
                A.queue(function(a) {
                    if (w) {
                        w.css("display", "none")
                    }
                    for (var b = Math.min(x, B); b < Math.max(x, B) + F; b++) {
                        if (z[b]) {
                            z[b].css("display", "")
                        }
                    }
                    a()
                });
                var H = C.extend({}, this._options.animationParams);
                var u = this;
                H.complete = function() {
                    if (w) {
                        w.css("display", "none")
                    }
                    for (var a = B; a < B + F; a++) {
                        if (z[a]) {
                            z[a].css("display", "")
                        }
                    }
                    u.dispatchEvent({
                        type: "setIndex",
                        index: B,
                        oldIndex: x
                    })
                };
                var v = {};
                v[y] = t;
                A.nAnimate(v, H)
            }
            this._index = B
        }
        var E = r.ns + "-ctrl-disabled";
        if (this.isPrevPage()) {
            this._prevButton.removeClass(E)
        } else {
            this._prevButton.addClass(E)
        }
        if (this.isNextPage()) {
            this._nextButton.removeClass(E)
        } else {
            this._nextButton.addClass(E)
        }
    },
    get_itemsPerPage: function() {
        return this._itemsPerPage
    },
    get_numFrames: function() {
        return this._frames.length
    },
    _onSwipe: function(j, k, n, l, o, h, m) {
        if (this._mode == "horizontal") {
            if (n == "right") {
                this.prev()
            } else {
                if (n == "left") {
                    this.next()
                }
            }
        } else {
            if (n == "down") {
                this.prev()
            } else {
                if (n == "up") {
                    this.next()
                }
            }
        }
    },
    _onResized: function(A, F) {
        var v = this._list,
            u = this._frames;
        var t,
            y,
            D,
            z;
        if (this._mode == "horizontal") {
            t = "left";
            y = "width";
            D = A;
            z = "_width"
        } else {
            t = "top";
            y = "height";
            D = F;
            z = "_height"
        }
        if (!D) {
            D = this[z]
        } else {
            this[z] = A
        }
        D += 2;
        var E = this._calculateItemsPerPage(D);
        var B = Math.ceil(D / E);
        for (var C = 0; C < u.length; C++) {
            u[C].css(t, (B * C) + "px")
        }
        v.css(y, B * u.length);
        if (this._mode == "vertical") {
            this._resizing_height = B * u.length
        }
        this._itemSpacing = B;
        var q = Math.round(this._index / E) * E;
        this._index = -1;
        this.set_index(q, true);
        if (this._options.matchContentSize) {
            var w;
            var x;
            var r = 0;
            if (this._mode == "horizontal") {
                w = "outerHeight";
                x = "height"
            } else {
                w = "outerWidth";
                x = "width"
            }
            for (C = 0; C < u.length; C++) {
                r = Math.max(r, u[C][w]())
            }
            v[x](r)
        }
    },
    _calculateItemsPerPage: function(b) {
        return this._itemsPerPage = Math.floor(b / this._calculateItemMaxSize())
    },
    _calculateItemMaxSize: function() {
        var d = this._frames;
        var f = 5;
        for (var e = 0; e < d.length; e++) {
            f = Math.max(f, d[e][(this._mode == "horizontal" ? "outerWidth" : "outerHeight")]())
        }
        return f
    }
});
Netcel.Class.create("ImageZoom", Netcel.Widget, Netcel.UI.DraggableMixin, Netcel.Shared.UpdatingMixin, Netcel.Analytics ? Netcel.Analytics.AnalyticsMixin : null, {
    initialize: function(h, f, m) {
        this.$super.initialize(h, f, m, {
            minScale: 1,
            maxScale: 10,
            initScale: 1,
            wheelScaleSpeed: 0.25,
            onResizeMaintainScale: !0,
            easeSpeed: 3,
            defaultScaleX: 0.5,
            defaultScaleY: 0.5,
            _numDragSamples: 2,
            throwSpeedMod: 10,
            autoloadImages: !1,
            lodImages: [],
            overview: !0,
            controlMoveSpeed: 20,
            controlZoomSpeed: 0.1,
            tabIndex: 0,
            keyMoveSpeed: 20,
            keyScaleSpeed: 0.1,
            doubleTapScale: 2,
            centerIfSpace: !0,
            allowScrollAtDefaultScale: !0
        });
        this._scaleCenterX = this._options.defaultScaleX;
        this._scaleCenterY = this._options.defaultScaleY;
        m = this._holder = f.find("." + this._options.ns + "-holder");
        var l = this._image = this._holder.children("img");
        this._holderMetrics = Netcel.Html.getMetrics(m, h, !0);
        this._imageMetrics = Netcel.Html.getMetrics(l, h, !0);
        this._images = [];
        this._loadingImages = [];
        this._images[0] = {
            image: l[0],
            width: -1,
            height: -1,
            src: l.attr("src")
        };
        for (var k, j = 0; j < this._options.lodImages.length; j++) {
            k = this._options.lodImages[j];
            if ("string" == typeof k) {
                k = {
                    image: null,
                    width: -1,
                    height: -1,
                    src: k
                }
            } else {
                if (null == k.src) {
                    continue
                }
            }
            k.loaded = null;
            if (this._options.autoloadImages) {
                this._loadImage(k)
            } else {
                if (1 > k.width || 1 > k.height) {
                    continue
                }
            }
            this._images.push(k)
        }
        this.element.keydown(h.proxy(this._onKeyPress, this));
        this._initDraggable(h, m, {
            preventMoveDefault: this._options.allowScrollAtDefaultScale ? h.proxy(this._checkPreventMoveDefault, this) : !0
        });
        this._onControlEndProxy = h.proxy(this._onControlEnd, this);
        this._up = f.find("." + this._options.ns + "-up").bind("mousedown touchstart", h.proxy(this._onUpStart, this));
        this._right = f.find("." + this._options.ns + "-right").bind("mousedown touchstart", h.proxy(this._onRightStart, this));
        this._down = f.find("." + this._options.ns + "-down").bind("mousedown touchstart", h.proxy(this._onDownStart, this));
        this._left = f.find("." + this._options.ns + "-left").bind("mousedown touchstart", h.proxy(this._onLeftStart, this));
        this._zoomIn = f.find("." + this._options.ns + "-zoomIn").bind("mousedown touchstart", h.proxy(this._onZoomInStart, this));
        this._zoomOut = f.find("." + this._options.ns + "-zoomOut").bind("mousedown touchstart", h.proxy(this._onZoomOutStart, this));
        m.css("overflow", "hidden");
        void 0 == f.attr("tabIndex") && f.attr("tabIndex", this._options.tabIndex);
        "absolute" != m.css("position") && m.css("position", "relative");
        l.css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0
        });
        this._isImageInited = !1;
        this.set_minScale(this._options.minScale);
        this.set_maxScale(this._options.maxScale);
        this.set_frameRate(30);
        f.bind("mousedown", function(b) {
            f.focus()
        })
    },
    _checkPreventMoveDefault: function(b) {
        b = b.originalEvent || b;
        return !("touchmove" === b.type && 1 === this.get_scale() && 1 === b.touches.length)
    },
    _loadImage: function(b) {
        b.image = new Image;
        b.image.src = b.src;
        b.loaded = !1;
        this._loadingImages.push(b)
    },
    _getScale: function(g, f, k, j, h) {
        g = k / g;
        f = j / f;
        return g > f ? h ? g : f : h ? f : g
    },
    _doSetScale: function(z) {
        for (var y = this.get_imageWidth(), x = this.get_imageHeight(), w = this._imageWidth = this._baseImageWidth * this._scaleAdjust * z, v = this._imageHeight = this._baseImageHeight * this._scaleAdjust * z, t = 10000000, q, p = 10000000, j, r, u, o = 0; o < this._images.length; o++) {
            u = this._images[o],
            -1 != u.width && -1 != u.height && (r = u.width > w ? u.width / w : w / u.width, u.image && !0 === u.loaded ? r < t && (t = r, q = u.image) : !this._options.autoloadImages && r < p && (p = r, j = u))
        }
        p < t && this._loadImage(j);
        q && q.src != this._image[0].src && (this._image[0].src = q.src);
        y = w - y;
        x = v - x;
        this._image.css({
            width: w
        });
        this.set_x(this.get_x() - y * this._scaleCenterX, !0);
        this.set_y(this.get_y() - x * this._scaleCenterY, !0);
        this._scale = z
    },
    _doSetX: function(b) {
        this._image.css({
            left: b + "px"
        });
        this._x = b
    },
    _doSetY: function(b) {
        this._image.css({
            top: b + "px"
        });
        this._y = b
    },
    _overviewScale: function() {
        return this._overview.innerWidth() * (1 - this.get_holderWidth() / this.get_imageWidth()) / (this.get_imageWidth() - this.get_holderWidth())
    },
    _scaleAtCenter: function(e, d) {
        e = e || this._options.defaultScaleX;
        d = d || this._options.defaultScaleY;
        var f = this._imageMetrics.globalToLocal(this._holderMetrics.localToGlobal(this.get_holderWidth() * e, this.get_holderHeight() * d));
        this._scaleCenterX = f.x / this._imageMetrics.width();
        this._scaleCenterY = f.y / this._imageMetrics.height()
    },
    get_scale: function() {
        return this._scale
    },
    set_scale: function(d, c) {
        Netcel.NumberUtil.isNumber(d) && (d = Netcel.NumberUtil.clamp(Netcel.NumberUtil.toNumber(d), this.get_minScale(), this.get_maxScale()), c ? (this._targetScale = null, this._doSetScale(d)) : this._targetScale = d)
    },
    get_minScale: function() {
        return this._minScale
    },
    set_minScale: function(b) {
        this._minScale = b;
        this.set_scale(this.get_scale(), !0)
    },
    get_maxScale: function() {
        return this._maxScale
    },
    set_maxScale: function(b) {
        this._maxScale = b;
        this.set_scale(this.get_scale(), !0)
    },
    get_x: function() {
        return this._x
    },
    set_x: function(d, c) {
        Netcel.NumberUtil.isNumber(d) && (d = Netcel.NumberUtil.clamp(Netcel.NumberUtil.toNumber(d), this.get_minX(), this.get_maxX()), c ? (this._targetX = null, this._doSetX(d)) : this._targetX = d)
    },
    get_y: function() {
        return this._y
    },
    set_y: function(d, c) {
        Netcel.NumberUtil.isNumber(d) && (d = Netcel.NumberUtil.clamp(Netcel.NumberUtil.toNumber(d), this.get_minY(), this.get_maxY()), c ? (this._targetY = null, this._doSetY(d)) : this._targetY = d)
    },
    _getBaseX: function() {
        var d = 0,
            c = this.get_imageWidth();
        this._options.centerIfSpace && c < this._holderWidth && (d = 0.5 * (this._holderWidth - c));
        return d
    },
    _getBaseY: function() {
        var d = 0,
            c = this.get_imageHeight();
        this._options.centerIfSpace && c < this._holderHeight && (d = 0.5 * (this._holderHeight - c));
        return d
    },
    get_minX: function() {
        return Math.min(this._getBaseX(), this._holderWidth - this.get_imageWidth())
    },
    get_minY: function() {
        return Math.min(this._getBaseY(), this._holderHeight - this.get_imageHeight())
    },
    get_maxX: function() {
        return Math.max(0, Math.min(this._getBaseX(), this._holderWidth - this.get_imageWidth()))
    },
    get_maxY: function() {
        return Math.max(0, Math.min(this._getBaseY(), this._holderHeight - this.get_imageHeight()))
    },
    get_imageWidth: function() {
        return this._imageWidth
    },
    get_imageHeight: function() {
        return this._imageHeight
    },
    get_holderWidth: function() {
        return this._holderWidth
    },
    get_holderHeight: function() {
        return this._holderHeight
    },
    _onUpdate: function() {
        if (!this._isImageInited && this._image[0].complete) {
            this._initImage()
        } else {
            if (!this._isImageInited) {
                return
            }
        }
        for (var f = this._loadingImages, e = !1, h = f.length - 1; -1 < h; --h) {
            !1 === f[h].loaded && f[h].image.complete && (f[h].loaded = !0, f[h].width = f[h].image.width, f[h].height = f[h].image.height, f.splice(h, 1), e = !0)
        }
        switch (this._controlAction) {
        case "up":
            this.set_y(this.get_y() + this._options.controlMoveSpeed);
            break;
        case "right":
            this.set_x(this.get_x() - this._options.controlMoveSpeed);
            break;
        case "down":
            this.set_y(this.get_y() - this._options.controlMoveSpeed);
            break;
        case "left":
            this.set_x(this.get_x() + this._options.controlMoveSpeed);
            break;
        case "zoomIn":
            this._scaleAtCenter();
            this.set_scale(this.get_scale() * (1 + this._options.controlZoomSpeed));
            break;
        case "zoomOut":
            this._scaleAtCenter(),
            this.set_scale(this.get_scale() / (1 + this._options.controlZoomSpeed))
        }
        if (null != this._targetScale) {
            var g = this.get_scale();
            0.01 > Math.abs(g - this._targetScale) ? (this._doSetScale(this._targetScale), this._targetScale = null) : this._doSetScale(g + (this._targetScale - g) / this._options.easeSpeed)
        } else {
            e && this._doSetScale(this.get_scale())
        }
        null != this._targetX && (f = this.get_x(), 1 > Math.abs(f - this._targetX) ? (this._doSetX(this._targetX), this._targetX = null) : this._doSetX(f + (this._targetX - f) / this._options.easeSpeed));
        null != this._targetY && (f = this.get_y(), 1 > Math.abs(f - this._targetY) ? (this._doSetY(this._targetY), this._targetY = null) : this._doSetY(f + (this._targetY - f) / this._options.easeSpeed));
        this._visible && (f = Math.round(this.get_holderWidth() / this.get_imageWidth() * 100), e = Math.round(this.get_holderHeight() / this.get_imageHeight() * 100), g = this._overviewScale(), h = -this.get_x() * g, g *= -this.get_y(), this._visible.css({
            width: f + "%",
            height: e + "%",
            left: h + "px",
            top: g + "px"
        }))
    },
    _onKeyPress: function(b) {
        switch (b.keyCode) {
        case 37:
            this.set_x(this.get_x() + this._options.keyMoveSpeed);
            break;
        case 39:
            this.set_x(this.get_x() - this._options.keyMoveSpeed);
            break;
        case 40:
            this.set_y(this.get_y() - this._options.keyMoveSpeed);
            break;
        case 38:
            this.set_y(this.get_y() + this._options.keyMoveSpeed);
            break;
        case 61:
        case 107:
        case 187:
            this._scaleAtCenter();
            this.set_scale(this.get_scale() * (1 + this._options.keyScaleSpeed));
            break;
        case 173:
        case 189:
        case 109:
            this._scaleAtCenter();
            this.set_scale(this.get_scale() / (1 + this._options.keyScaleSpeed));
            break;
        default:
            return
        }
        b.preventDefault()
    },
    _initImage: function(g) {
        this._isImageInited = !0;
        g = this._$;
        var f = this._image,
            k = this._holder;
        f.removeAttr("height");
        f.removeAttr("width");
        f.css({
            width: "auto",
            height: "auto"
        });
        var j = f[0];
        if (0 == j.width || 0 == j.height) {
            if (void 0 == this._waitForImageId) {
                var h = this;
                this._waitForImageId = setInterval(function() {
                    h._initImage()
                }, 200)
            }
        } else {
            this._baseImageWidth = j.width,
            this._baseImageHeight = j.height,
            this._imageRatio = j.width / j.height,
            this._images[0].image = new Image,
            this._images[0].image.src = this._image.attr("src"),
            this._images[0].width = this._baseImageWidth,
            this._images[0].height = this._baseImageHeight,
            this._images[0].loaded = !0,
            j = g.proxy(this._onMousewheel, this),
            k.resize(g.proxy(this._onHolderResize, this)),
            k.mousewheel(j),
            this._onHolderResize(null, !0),
            this.set_x(0, !0),
            this.set_y(0, !0),
            this.set_scale(this._options.initScale, !0),
            this.set_x(0.5 * (this._holderWidth - this.get_imageWidth()), !0),
            this.set_y(0.5 * (this._holderHeight - this.get_imageHeight()), !0),
            f.animate({
                opacity: 1
            }, {
                duration: 1000
            }),
            this._options.overview && (f = !0 === this._options.overview ? f.attr("src") : this._options.overview, k = this._overview = g('<div class="' + this._options.ns + '-overview" />'), k.append(g('<img src="' + f + '" alt="" />').css({
                width: "100%",
                display: "block"
            })), this.element.append(k), "absolute" != k.css("position") && k.css("position", "relative"), this._visible = g('<div class="' + this._options.ns + '-visible" />').css({
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 3
            }), k.append(this._visible), k.mousewheel(j), g.extend(k, Netcel.UI.DraggableMixin), k._initDraggable(g, this._visible, {
                drag_min_distance: 1,
                transform: !1,
                tap: !1,
                target: this
            }), k.bind("click", g.proxy(this._onOverviewClick, this)), this._visible.bind("click", function(b) {
                b.stopPropagation()
            }), this._overviewMetrics = Netcel.Html.getMetrics(k, g, !0))
        }
    },
    _onOverviewClick: function(e) {
        var d = this._overviewMetrics,
            f = d.globalToLocal(e.pageX, e.pageY);
        e = f.x / d.width();
        d = f.y / d.height();
        this.set_x(-(e * this.get_imageWidth() - 0.5 * this.get_holderWidth()));
        this.set_y(-(d * this.get_imageHeight() - 0.5 * this.get_holderHeight()))
    },
    _onUpStart: function(b) {
        this._controlAction = "up";
        this._listenControlEnd(b)
    },
    _onRightStart: function(b) {
        this._controlAction = "right";
        this._listenControlEnd(b)
    },
    _onDownStart: function(b) {
        this._controlAction = "down";
        this._listenControlEnd(b)
    },
    _onLeftStart: function(b) {
        this._controlAction = "left";
        this._listenControlEnd(b)
    },
    _onZoomInStart: function(b) {
        this._controlAction = "zoomIn";
        this._listenControlEnd(b)
    },
    _onZoomOutStart: function(b) {
        this._controlAction = "zoomOut";
        this._listenControlEnd(b)
    },
    _listenControlEnd: function(d) {
        var c = this._$;
        c("body").bind("mouseup touchend", this._onControlEndProxy);
        d.preventDefault()
    },
    _onControlEnd: function(d) {
        var c = this._$;
        c("body").unbind("mouseup touchend", this._onControlEndProxy).blur();
        c(d.target).blur();
        this._controlAction = null
    },
    _onMousewheel: function(f, e, h, g) {
        this._options.allowScrollAtDefaultScale && 1 == this.get_scale() || (f.preventDefault(), g = (h = f.currentTarget != this._holder[0]) ? this._overviewMetrics : this._imageMetrics, f = g.globalToLocal(f.pageX, f.pageY), h ? this._scaleAtCenter() : (this._scaleCenterX = f.x / g.width(), this._scaleCenterY = f.y / g.height()), this.get_scale(), 0 < e ? this.set_scale(this.get_scale() * (1 + this._options.wheelScaleSpeed)) : this.set_scale(this.get_scale() / (1 + this._options.wheelScaleSpeed)))
    },
    _onDragStart: function(d, c) {
        this._clickX = c.x;
        this._clickY = c.y;
        this._dragStartX = this.get_x();
        this._dragStartY = this.get_y();
        this._lastDrag = {
            x: c.x,
            y: c.y,
            dx: 0,
            dy: 0,
            time: d.timeStamp
        };
        this._currentlyDragging = d.currentTarget;
        this.element.focus();
        d.preventDefault()
    },
    _onDragging: function(g, f) {
        var k = f.x - this._clickX,
            j = f.y - this._clickY;
        this._lastDrag.dx = f.x - this._lastDrag.x;
        this._lastDrag.dy = f.y - this._lastDrag.y;
        this._lastDrag.x = f.x;
        this._lastDrag.y = f.y;
        this._lastDrag.time = g.timeStamp;
        if (this._currentlyDragging == this._holder[0]) {
            this.set_x(this._dragStartX + k, !0),
            this.set_y(this._dragStartY + j, !0)
        } else {
            var h = this._overviewScale();
            this.set_x(this._dragStartX - k / h, !0);
            this.set_y(this._dragStartY - j / h, !0)
        }
    },
    _onDragEnd: function(e, d) {
        if (this._lastDrag) {
            var f = Math.max(16, e.timeStamp - this._lastDrag.time);
            50 > f && (f = 16 / f, this.set_x(this.get_x() + this._lastDrag.dx * this._options.throwSpeedMod * f), this.set_y(this.get_y() + this._lastDrag.dy * this._options.throwSpeedMod * f));
            e.preventDefault()
        }
    },
    _onTransformStart: function(d, c) {
        this._startScale = this.get_scale()
    },
    _onTransforming: function(e, d, f) {
        e = this._imageMetrics;
        d = e.globalToLocal(d);
        this._scaleAtCenter(d.x / e.width(), d.y / e.height());
        this.set_scale(this._startScale * f, !0)
    },
    _onDoubleTap: function(b) {
        this.get_scale() != this._options.initScale ? this.set_scale(this._options.initScale) : this.set_scale(this._options.doubleTapScale);
        b.preventDefault()
    },
    _onHolderResize: function(g, f) {
        var k = this._holderWidth,
            j = this._holderHeight,
            h = this._scaleAdjust;
        this._holderWidth = this._holder.innerWidth();
        this._holderHeight = this._holder.innerHeight();
        this._scaleAdjust = this._getScale(this._baseImageWidth, this._baseImageHeight, this._holderWidth, this._holderHeight);
        !0 !== f && k && this._options.onResizeMaintainScale && (h *= this.get_scale() / this._scaleAdjust, this.set_scale(h, !0), k = this._imageMetrics.globalToLocal(this._holderMetrics.localToGlobal(k * this._options.defaultScaleX, j * this._options.defaultScaleY)), j = this._imageMetrics.globalToLocal(this._holderMetrics.localToGlobal(this.get_holderWidth() * this._options.defaultScaleX, this.get_holderHeight() * this._options.defaultScaleY)), this.set_x(this.get_x() + 1 * (j.x - k.x), !0), this.set_y(this.get_y() + 1 * (j.y - k.y), !0))
    }
});
Netcel.Class.create("Spinner", Netcel.Widget, !0, Netcel.UI.DraggableMixin, Netcel.Shared.UpdatingMixin, Netcel.Analytics ? Netcel.Analytics.AnalyticsMixin : null, {
    initialize: function(j, p, h, q) {
        var o = {
                time: 2,
                transition: "easeInOutQuad"
            },
            n = {
                time: 2,
                transition: "easeInOutQuad"
            };
        this.$super.initialize(j, p, h, {
            initialSpinSpeed: 32,
            spinFriction: 0.96,
            minSpinSpeed: 2,
            keyboardSpinSpeed: 10,
            tabIndex: 0,
            _numDragSamples: 5,
            dragRotationSpeed: 1,
            dragRotationSpeedY: 1,
            loadbar: !0,
            frameRate: 30,
            initRow: 0,
            rowAngle: 30,
            hotspots: !1,
            hotspotFlashUrl: "/swf/getimagepixel.swf",
            hotspotsIcon: !1,
            beginReturnDelay: 1,
            restAngleX: -1,
            restAngleY: -1,
            restAngleXProps: {
                base: o
            },
            restAngleYProps: {
                base: n
            }
        });
        p = this.element.wrap(j('<div tabindex="' + this._options.tabIndex + '" style="position:relative;" class="clearfix" />')).parent();
        this.element[0]._spinner = this;
        this._image = this.element;
        this.element = p;
        h = this._options;
        h.restAngleXProps = Netcel.Easer.mergeOptions(h.restAngleXProps, o);
        h.restAngleYProps = Netcel.Easer.mergeOptions(h.restAngleYProps, n);
        var m = this._image;
        p = this.element;
        this._isUserInteracting = !1;
        this._beginReturnProxy = j.proxy(this._beginReturn, this);
        this.set_row(h.initRow);
        this._sequence = q instanceof Function ? q.apply(this) : q;
        this._numImagesLoaded = 0;
        var l = j.proxy(this._imageLoaded, this);
        this._spinSpeed = this._angleY = this._angleX = 0;
        this._ff = this._hasInteracted = !1;
        this._imageSizes = {};
        j.each(this._sequence, function(b, a) {
            j.each(a, function(f, d) {
                img = a == h.initRow && 0 == f ? m : j("<img />").attr("src", d);
                img.load(l);
                img[0]._baseSrc = d;
                img[0].complete && img.trigger("load")
            })
        });
        this.element.keydown(j.proxy(this._onKeyPress, this));
        this._initDraggable(j, this.element, {
            preventMoveDefault: !0
        });
        this._options.loadbar && this.get_numImagesLoaded() != this.get_numFrames() && (this._loadbar = q = new Netcel.UI.ProgressBar(j, h.loadbarOptions ? h.loadbarOptions : {}), q.listen(this), this.element.append(q._element));
        this._initAnayltics && this._initAnayltics(j, this._image, {
            events: "firstinteraction"
        });
        this._lastMousePosition = {
            x: -1,
            y: -1
        };
        this._options.hotspots && this._initHotspots()
    },
    _interact: function() {
        var b = {};
        this._isUserInteracting = !0;
        this._returnPositionTId && (clearTimeout(this._returnPositionTId), delete this._returnPositionTId);
        this._analytics_options && (b = {
            type: "event",
            category: "Spinner",
            label: this._analytics_options.id,
            value: null,
            nonInteraction: null,
            callback: null
        });
        this._hasInteracted || (this._hasInteracted = !0, b.action = "firstinteraction", this.dispatchEvent({
            type: "firstinteraction",
            analytics: b
        }));
        b.action = "interaction";
        this.dispatchEvent({
            type: "interaction",
            analytics: b
        })
    },
    _setImage: function() {
        var f = this._angleX % 360;
        0 > f && (f = 360 + f);
        var g = this.get_row(),
            e = this._sequence[g],
            f = Math.floor(f / (360 / e.length)),
            e = e[f];
        if (e != this._currentImage) {
            if (this._ff) {
                var h = this._oldHolder;
                this._oldHolder = this._holder;
                this._holder = h;
                h.css("zIndex", this._holderZIndex++);
                h.img.attr("src", e);
                this._currentImageObj = h.img
            } else {
                this._image.attr("src", e),
                this._currentImageObj = this._image
            }
            this._currentImage = e;
            this._frame = f;
            this._setHotspot(g, f);
            this._showHotspotAt(this._lastMousePosition.x, this._lastMousePosition.y)
        }
    },
    _setHotspot: function(t, p) {
        var r = this._options;
        if (r.hotspots) {
            var q = this._options.hotspots[t][p],
                o = this,
                n = this._$;
            if (this._hasCanvas) {
                var m = n("<canvas />")[0],
                    j = m.getContext("2d");
                o._canvasImageData = !1;
                var h = new Image;
                h.src = q;
                h = n(h);
                h.bind("load", function(l) {
                    m.width = this.width;
                    m.height = this.height;
                    j.drawImage(this, 0, 0);
                    var e = o._canvasImageData = j.getImageData(0, 0, m.width, m.height);
                    h.unbind("load");
                    if (r.hotspotsIcon) {
                        l = o._imageSizes[o._sequence[t][p]];
                        if (!l.hotspotPositions) {
                            for (var k = {}, b, d = [], g = 0, a; g < m.height; g += 3) {
                                for (a = 0; a < m.width; a += 3) {
                                    if (b = e.data[4 * (g * m.width + a)]) {
                                        k[b] || (d.push(b), k[b] = {
                                            x: 0,
                                            y: 0,
                                            n: 0
                                        }),
                                        b = k[b],
                                        b.x += a,
                                        b.y += g,
                                        b.n++
                                    }
                                }
                            }
                            for (e = 0; e < d.length; e++) {
                                b = k[d[e]],
                                b.x = 100 * (Math.floor(b.x / b.n) / m.width),
                                b.y = 100 * (Math.floor(b.y / b.n) / m.height)
                            }
                            l.hotspotPositions = k
                        }
                        o._setHotspotsIcons(l.hotspotPositions)
                    }
                    o._pendingImageData && o._showHotspotAt(o._pendingImageData.x, o._pendingImageData.y)
                });
                h[0].complete && h.trigger("load")
            } else {
                "none" != this._flashStatus && ("initing" != this._flashStatus ? this._pixelFlash.loadImage(q) : console.log("wait for flash: " + this._flashStatus))
            }
        }
    },
    _initHotspots: function() {
        function e() {
            if (swfobject && swfobject.hasFlashPlayerVersion("10")) {
                c._flashStatus = "initing";
                var b,
                    g;
                do {
                    b = "_nc_" + Math.floor(100000 * Math.random()) + "_pixelCallback"
                } while (window[b]);
                do {
                    g = "nc___" + Math.floor(100000 * Math.random()) + "_flash"
                } while (f("#" + g).length);
                window[b] = function(h, k, j) {
                    switch (h) {
                    case "getpixel.ready":
                        c._flashStatus = "inited";
                        break;
                    case "imageReady":
                        c._flashStatus = "ready";
                        h = c._imageSizes[c._sequence[c.get_row()][c._frame]];
                        h.hotspotPositions = j;
                        c._setHotspotsIcons(h.hotspotPositions);
                        break;
                    case "log":
                        Netcel.log("log: ", k)
                    }
                };
                var d = document.location.toString(),
                    d = d.substring(0, d.lastIndexOf("/") + 1);
                f("body").append(f('<div id="' + g + '" />'));
                swfobject.embedSWF(c._options.hotspotFlashUrl, g, "100", "100", "10", null, {
                    callback: b,
                    base: d
                }, {
                    base: d
                }, {
                    base: d
                }, function(h) {
                    c._pixelFlash = h.ref
                });
                return !0
            }
            return !1
        }
        var f = this._$,
            c = this;
        c._flashStatus = "none";
        this._hotspotIcons = [];
        if (function() {
            var b = f("<canvas />")[0];
            return b && b.getContext instanceof Function ? c._hasCanvas = !0 : !1
        }() || e()) {
            this._tooltip = f('<div class="' + this._cssname + '-tooltip gradient" />').css("position", "absolute"),
            this.element.append(this._tooltip),
            this._metrics = new Netcel.Html.Metrics(this.element, f, !0),
            this.element.bind("mousemove", f.proxy(this._onMouseMoveHotspot, this)),
            this.element.bind("click", f.proxy(this._onClickHotspot, this))
        }
    },
    _getHotpotIdAt: function(h, l) {
        if (this._options.hotspots) {
            var g = this._currentImageObj;
            if (!g) {
                return
            }
            var m = this._imageSizes[g.attr("src")],
                k = Math.floor(h * (m.width / g[0].width)),
                j = Math.floor(l * (m.height / g[0].height)),
                g = !1;
            this._hasCanvas ? (m = this._canvasImageData) ? (k = 4 * (m.width * j + k), g = {}, g.a = m.data[k + 3], g.r = m.data[k], g.g = m.data[k + 1], g.b = m.data[k + 2], g.colour = 16777216 * g.a + (g.r << 16) + (g.g << 8) + g.b) : this._pendingImageData = {
                x: h,
                y: l
            } : "none" != this._flashStatus && ("ready" == this._flashStatus ? g = this._pixelFlash.getPixelColourAt(k, j, !0) : this._pendingImageData = {
                x: h,
                y: l
            });
            if (g) {
                return g.r
            }
        }
        return 0
    },
    _getHotspotAt: function(f, g) {
        var e = this._options;
        if (e.hotspots) {
            var h = this._getHotpotIdAt(f, g);
            return h && e.hotspotsInfo[h] ? e.hotspotsInfo[h] : !1
        }
    },
    _showHotspotAt: function(e, f) {
        this._pendingImageData = null;
        if (this._options.hotspots) {
            var c = this._getHotspotAt(e, f);
            c ? (this._currentTooltip = null, this._currentTooltip = c, this._tooltip.text(c.text), this._tooltip.css({
                left: e + 15,
                top: f,
                display: "block",
                zIndex: 10000
            }), c.url ? this.element.css("cursor", "pointer") : this.element.css("cursor", "")) : (this._tooltip.css("display", "none"), this.element.css("cursor", ""))
        }
    },
    _setHotspotsIcons: function(f) {
        var g = this._$,
            e;
        if (this._options.hotspotsIcon) {
            var h = 0;
            this.element.find("." + this._cssname + "-icon").remove();
            for (h in f) {
                isNaN(h + 1) || (e = f[h], icons = g('<div class="' + this._cssname + '-icon" />').css({
                    top: e.y + "%",
                    left: e.x + "%",
                    zIndex: 9999,
                    position: "absolute"
                }), this._hotspotIcons.push(icons), this.element.append(icons))
            }
        }
    },
    _beginReturn: function() {
        var b = this._options;
        if (-1 < b.restAngleX) {
            var c = b.restAngleX;
            180 < Math.abs(c - this.get_angleX()) && (c = 360 - c);
            Netcel.Easer.addEase(this, {
                angleX: c,
                base: b.restAngleXProps
            })
        }
        -1 < b.restAngleY && Netcel.Easer.addEase(this, {
            angleY: b.restAngleY,
            base: b.restAngleYProps
        })
    },
    get_numImagesLoaded: function() {
        return this._numImagesLoaded
    },
    get_numFramesPerRow: function() {
        return this._sequence[0].length
    },
    get_numFrames: function() {
        return this._sequence.length * this.get_numFramesPerRow()
    },
    get_row: function() {
        return this._row
    },
    set_row: function(b) {
        this._row = b
    },
    get_rows: function() {
        return this._sequence.length
    },
    set_angleX: function(b) {
        this._angleX = b % 360;
        0 > this._angleX && (this._angleX = 360 + this._angleX);
        this._setImage()
    },
    get_angleX: function() {
        return this._angleX
    },
    get_angleY: function() {
        return this._angleY
    },
    set_angleY: function(b) {
        this._angleY = Netcel.NumberUtil.clamp(b, 0, (this.get_rows() - 1) * this._options.rowAngle);
        this.set_row(Netcel.NumberUtil.clamp(Math.floor(this._angleY / this._options.rowAngle), 0, this.get_rows() - 1));
        this._setImage()
    },
    _onMouseMoveHotspot: function(b) {
        this._lastMousePosition = b = this._metrics.globalToLocal(b.pageX, b.pageY);
        this._showHotspotAt(b.x, b.y)
    },
    _onClickHotspot: function(b) {
        b = this._metrics.globalToLocal(b.pageX, b.pageY);
        (b = this._getHotspotAt(b.x, b.y)) && b.url && window.open(b.url, b.target ? b.target : "_self")
    },
    _onDragStart: function(b, c) {
        this._clickX = c.x;
        this._clickY = c.y;
        this._spinSpeed = 0;
        b.preventDefault();
        this.element.focus();
        this._dragStartAngleX = this.get_angleX();
        this._dragStartAngleY = this.get_angleY();
        this._lastDrags = [];
        this._interact()
    },
    _onDragEnd: function(f) {
        var g = this._lastDrags.pop();
        if (this._lastDrags && 0 < this._lastDrags.length) {
            for (var e = 0, h = 0; h < this._lastDrags.length; h++) {
                e += this._lastDrags[h]
            }
            e /= this._lastDrags.length;
            this._spinSpeed = Math.max(-100, Math.min(100, -0.5 * (g - e)))
        }
        f.preventDefault()
    },
    _onDragging: function(g, j) {
        var f = j.x,
            k = f - this._clickX,
            h = -1 * this._options.dragRotationSpeed;
        this._lastDrags.push(f);
        this._lastDrags.length > this._options._numDragSamples && this._lastDrags.shift();
        this.set_angleX(this._dragStartAngleX + k * h);
        f = this._options.dragRotationSpeedY;
        k = j.y - this._clickY;
        this.set_angleY(this._dragStartAngleY + k * f);
        this._interact()
    },
    _onKeyPress: function(b) {
        switch (b.keyCode) {
        case 37:
            this._spinSpeed = 0;
            this.set_angleX(this.get_angleX() + this._options.keyboardSpinSpeed);
            break;
        case 39:
            this._spinSpeed = 0;
            this.set_angleX(this.get_angleX() - this._options.keyboardSpinSpeed);
            break;
        case 40:
            this.set_angleY(this.get_angleY() - this._options.rowAngle);
            break;
        case 38:
            this.set_angleY(this.get_angleY() + this._options.rowAngle);
            break;
        default:
            return
        }
        b.preventDefault();
        b.stopPropagation();
        this._interact()
    },
    _imageLoaded: function(b) {
        this._numImagesLoaded++;
        var c = this._$;
        this._imageSizes[c(b.currentTarget).attr("src")] = {
            width: b.currentTarget.width,
            height: b.currentTarget.height
        };
        this.dispatchEvent({
            type: "progress",
            current: this.get_numImagesLoaded(),
            total: this.get_numFrames()
        });
        c(b.target).unbind("load");
        this.get_numImagesLoaded() == this.get_numFrames() && setTimeout(c.proxy(this._onLoaded, this), 700)
    },
    _onLoaded: function() {
        this._isLoaded = !0;
        this._spinSpeed = this._options.initialSpinSpeed;
        this.dispatchEvent({
            type: "complete"
        });
        this.set_frameRate(this._options.frameRate)
    },
    _onUpdate: function() {
        this._spinSpeed > this._options.minSpinSpeed || this._spinSpeed < -this._options.minSpinSpeed ? this._spinSpeed *= this._options.spinFriction : (this._spinSpeed = 0, this._isUserInteracting && (this._isUserInteracting = !1, this._returnPositionTId = setTimeout(this._beginReturnProxy, 1000 * this._options.beginReturnDelay)));
        0 != this._spinSpeed && this.set_angleX(this.get_angleX() + this._spinSpeed)
    },
    createImageSequence: function(t, p, r, q, o, n) {
        var m = [];
        o || (o = 0);
        for (var j = 0; j < q; j++) {
            m[j] = [];
            for (var h = p; h <= r; h++) {
                m[j].push(t.split("%c").join(Netcel.StringUtil.pad(h + "", o, "0")).split("%r").join(Netcel.StringUtil.pad(j + "", o, "0")))
            }
            n && m[j].reverse()
        }
        return m
    },
    __init__: function(b) {
        Netcel.defaultInit(b, Netcel.Spinner, function() {
            var c = Netcel.parseOptions(this._image.attr("data-spinner-sequence"));
            if (c.pattern) {
                return Netcel.Spinner.prototype.createImageSequence.apply(null, c.pattern)
            }
            if (c.list) {
                return c.list
            }
        })
    }
});
Netcel.Class.create("SpinnerXML", Netcel.Spinner, !0, {
    initialize: function(a, c, d) {
        this._options = d;
        a.ajax({
            url: d.xml,
            dataType: "xml",
            success: a.proxy(function(b) {
                var m = this._options;
                b = a(b);
                var j = a(b).find("vrobject input"),
                    l = j.attr("columns") - 1,
                    k = j.attr("rows"),
                    j = Netcel.Spinner.prototype.createImageSequence.apply(null, [m.imgBase + "img_0_%r_%c.jpg", 0, l, k, 1, m.reverse]),
                    h = m.spinner || {};
                b = b.find("vrobject qthotspots");
                if (0 < b.length && "0" != b.attr("enabled")) {
                    for (h.hotspots = Netcel.Spinner.prototype.createImageSequence.apply(null, [m.imgBase + "hs_0_%r_%c.png", 0, l, k, 1, m.reverse]), m = b.find("hotspot"), h.hotspotsInfo = [null], b = 0; b < m.length; b++) {
                        l = a(m[b]),
                        h.hotspotsInfo[Netcel.NumberUtil.toNumber(l.attr("id"))] = {
                            text: l.attr("title"),
                            url: l.attr("url"),
                            target: l.attr("target")
                        }
                    }
                }
                this.$super.initialize(a, c, h, j)
            }, this),
            error: function() {}
        })
    },
    __init__: function(a) {
        Netcel.defaultInit(a, Netcel.SpinnerXML)
    }
});

// Megaslides

Netcel.Class.create(
'MegaSlides',
Netcel.Widget,
Netcel.UI.DraggableMixin,
Netcel.Shared.UpdatingMixin,
{
    initialize: function($, element, options) {


        var defaultOptions = {
            startingFrame: 1,
            transition: 'fade',
            //values fade|horizontal|vertical (TODO)
            transitionTime: 0.5,
            //time in seconds
            transitionMethod: 'linear',
            cycleRate: 5,
            //time in seconds, 0 = no cycle,
            hoverPausesCycle: true,
            focusPausesCycle: true,
            paginationEvent: 'click',
            tabIndex: 0,
            heightTransitionTime: 0.25,
            startPaused: false,
            blockInactiveInput: true,
            blockZIndex: 1000,
            viewportOverflowHidden: false,
            preventFrameChangeMidChange: true,

            swipeInput: 'horizontal',

            //horizontal/vertical options
            smoothLoop: true,
            framesToShow: 0,

            //fade options
            frontIndex: 1001,
            swappingIndex: 0,
            behindIndex: -1,

            momentumFriction: 0.94,
            //momentum properties
            momentumThreshold: 5
        }

        this.$super.initialize($, element, options, defaultOptions);

        element = this.element;
        options = this._options;

        //get the frames
        var list = element.children('.' + options.ns + '-slides').wrap('<div class="' + options.ns + '-viewport" />');
        var viewport = this._viewport = list.parent();
        var frames = list.find('> li').addClass(options.ns + '-slides-slide');
        var frame;
        this._list = list;
        this._allFrames = frames;
        this._frames = [];

        for (var i = 0; i < frames.length; i++) {
            frame = $(frames[i]);
            this._frames[i] = frame;

            if (!frame.attr('id')) {
                //give frame an ID
                frame.attr('id', Netcel.getUniqueId('frame'))
            }

            frame.attr('data-frameNumber', i + 1);
        }

        //init vars
        var self = this;

        this._paused = !!options.startPaused;
        this._locks = {}; //stores list of things locking the carousel

        if (options.swipeInput) {
            this._initDraggable($, this.element, {
                tap: false,
                transform: false,
                swipe: false,
                tap_double: false,
                hold: false,
                drag_direction: options.swipeInput
            });
        }

        //init the pagination
        var paginationProxy = $.proxy(this._onPaginationClicked, this);

        var customPagination = this.element.children('.' + options.ns + '-custom-pagination');

        if (customPagination.length > 0) {
            this._allPaginationItems = customPagination
            .find('.' + options.ns + '-pagination-item')
            .each(function() {




            })
            .on(this._options.paginationEvent, paginationProxy);

            pagination = customPagination;
        } else {
            //standard pagination
            var pagination = this._pagination = this._createElementIfNotPresent(options.ns + '-pagination', '<ol />');

            var paginationItem;
            this._paginationItems = [];

            for (var i = 0; i < this._frames.length; i++) {
                paginationItem = $('<li />', {
                    "class": options.ns + '-pagination-item'
                })
                .append(
                $('<a/>', {
                    href: '#' + this._frames[i].attr('id')
                })
                .append('<span>' + (i + 1) + '</span>')
                ); //$( '<li class="'+options.ns+'-pagination-item"><a href="#'+this._frames[i].attr('id')+'"><span>'+(i+1)+'</span></a></li>' );
                paginationItem.bind(this._options.paginationEvent, paginationProxy);

                pagination.append(paginationItem);
                this._paginationItems[i] = paginationItem;
            }

            this._allPaginationItems = pagination.find('.' + options.ns + '-pagination-item');

            if (pagination.attr('tabIndex') == undefined) {
                pagination.attr('tabIndex', this._options.tabIndex);
            }

            //bind keyboard interaction (TODO make this optional/configurable?)
            self._pagination.keydown($.proxy(self._onKeyDown, self));
        }

        //init next/prev buttons
        var directionNav = this.directionNav = this._createElementIfNotPresent(options.ns + '-direction-nav', '<ul />');
        var prevBtn = this._createElementIfNotPresent(options.ns + '-prev', '<li class="' + options.ns + '-prev"><a href="#">Previous</a></li>', directionNav);
        var nextBtn = this._createElementIfNotPresent(options.ns + '-next', '<li class="' + options.ns + '-next"><a href="#">Next</a></li>', directionNav);

        prevBtn.click(function() {
            self.prev();
            return false;
        });
        nextBtn.click(function() {
            self.next();
            return false;
        });

        //init styles
        list.css({
            display: "block",
            listStyle: "none outside none",
            margin: 0,
            padding: 0
        });
        viewport.css({
            position: 'relative',
            overflow: 'hidden'
        }); //

        //init the transition methods
        if (!(options.transition instanceof Function)) {
            self['_' + options.transition + 'Init'](self);
        }

        //init the first frame
        self._currentFrame = 0;

        self.set_frame(self._options.startingFrame);

        if (options.blockInactiveInput) {
            this.addEventListener('changeFrame', this._blockInactiveInput, this);
            this.addEventListener('changedFrame', this._blockInactiveInput, this);

            this._blockInactiveInput({
                type: 'changedFrame'
            });
        }

        //init hover pausing cycling
        if (self._options.cycleRate > 0 && self._options.hoverPausesCycle) {
            self.element.hover($.proxy(self._onHoverIn, self), $.proxy(self._onHoverOut, self));
        }

        //init focus pausing cycling
        if (self._options.cycleRate > 0 && self._options.focusPausesCycle) {
            self._viewport.focusin($.proxy(self._onFocusIn, self));
            self._viewport.focusout($.proxy(self._onFocusOut, self));
        }

        var setFocus = function(evt) {
            if (evt.target.nodeName.toLowerCase() != 'a') {
                pagination.focus();
            }
            return true;
        };

        frames.bind('click', setFocus);
        self._allPaginationItems.bind('click', setFocus);
        viewport.unbind('mousedown');
        //frames.bind('mousedown', $.proxy(self._onMouseDown, self));
        //viewport.mousedown($.proxy(self._onMouseDown, self));

        //this.addEventListener('mousedown', this._onMouseDown, this);
        $(window).on('resize deviceorientation orientationchange', function() {
            self._onUpdate()
        });
        element.find('img').load(function() {
            self._onElementResized(this._width);
        });

        if (this.get_frames() == 1) {
            //if only one frame
            directionNav.hide();
            pagination.hide();
        }

        //listen to nested carousels
        this.element.on('_nc_resized', function(e) {
            if (e.target != e.currentTarget) {
                self._onElementResized(self._width)
            }
        });
    },
    /*public methods*/
    next: function(instant) {
        var frame = this.get_frame();

        if (frame == this.get_frames()) {
            if (this._smoothLoop) {
                frame++;
            } else {
                frame = 1;
            }
        } else {
            frame++;
        }

        this.set_frame(frame, instant);
    },
    prev: function(instant) {
        var frame = this.get_frame();

        if (frame == 1) {
            if (this._smoothLoop) {
                frame--;
            } else {
                frame = this.get_frames();
            }
        } else {
            frame--;
        }

        this.set_frame(frame, instant);
    },
    /*getters/setters*/
    get_paused: function(by) {
        return typeof (by) == 'undefined' ? this._paused : !!this._locks[by];
    },
    set_paused: function(value, by) {
        value = !!value;

        var currentValue = this.get_paused(by);

        if (value != currentValue) {

            if (typeof (by) == 'undefined') {
                this._paused = value;
            } else {
                this._locks[by] = value;
            }

            if (value) {
                this._stopCycle();
            } else {
                this._doCycle();
            }


        }

        this.dispatchEvent({
            type: 'pause',
            target: this,
            paused: !this._canCycle(),
            by: by,
            value: value
        });
    },
    get_frames: function() {
        return this._frames.length;
    },
    get_frame: function() {
        return this._currentFrame;
    },
    set_frame: function(newFrame, instant, forceChange) {
        if (this._options.preventFrameChangeMidChange && this._transitioningFrame === true) {
            return;
        }

        if (this._options.transitionTime <= 0) {
            instant = true;
        }

        this._stopCycle();

        if (this._set_frame(newFrame, instant, false, forceChange)) {
            //update pagination
            this._updatePagination();
        }
    },
    /*internal methods*/
    _blockInactiveInput: function(e) {
        this._allFrames.keyboardDisable(true).block({
            message: null,
            overlayCSS: {
                opacity: 0,
                cursor: 'default',
                zIndex: this._options.blockZIndex
            }
        });

        if (e.type == 'changedFrame') {
            this._allFrames.filter('.' + this._options.ns + '-active-frame').keyboardDisable(false).unblock();
        }
    },
    _set_frame: function(newFrame, instant, suppressEvent, forceChange) {
        //does not dispatch events, or have any side effects, just sets the frame
        //returns true if frame changed, false if not
        //Netcel.log( '_set_frame', newFrame, instant, suppressCompleteEvent );
        var options = this._options;
        var oldFrame = this.get_frame();
        var realFrame;
        this._suppressCompleteEvent = suppressEvent;

        //validate frame number
        if (this._smoothLoop) {
            if (newFrame <= 0) {
                newFrame = 0; //zero means looping from beginning to end
                realFrame = this.get_frames();
            }
            else if (newFrame > this.get_frames()) {
                newFrame = this.get_frames() + 1;
                realFrame = 1; //n+1 = looping from end to beginning
            }
            else {
                realFrame = newFrame;
            }
        }
        else {
            if (newFrame < 1) {
                newFrame = 1;
            }
            else if (newFrame > this.get_frames()) {
                newFrame = this.get_frames();
            }

            realFrame = newFrame;
        }

        if (forceChange || newFrame != oldFrame || this._virtualFrame != this._currentFrame) {
            this._allFrames.removeClass(options.ns + '-active-frame');

            //dispatch event
            if (!suppressEvent && oldFrame != 0) {
                this.dispatchEvent({
                    type: 'changeFrame',
                    oldFrame: oldFrame,
                    newFrame: realFrame,
                    instant: instant
                });
            }

            if (options.transition instanceof Function) {
                options.transition(newFrame, instant, this);
            }
            else {
                //use string for function name

                this._transitioningFrame = true;

                if (this['_' + (options.transition) + 'Transition'] instanceof Function) {
                    this['_' + (options.transition) + 'Transition'](newFrame, instant, this);
                } else {
                    throw new Error('transition method "' + options.transition + '" is not valid');
                }
            }

            this._lastFrame = oldFrame;
            this._currentFrame = realFrame;
            this._virtualFrame = newFrame;

            if (instant || oldFrame == 0) {
                this._onChangeComplete();
            }

            return true;
        }

        return false;
    },
    _updatePagination: function() {
        if (this.get_frame() > 0) {
            var selectedClass = this._options.ns + '-pagination-item-selected';
            var currentFrameId = this._frames[this.get_frame() - 1].attr('id');

            this._allPaginationItems.removeClass(selectedClass);

            this._allPaginationItems.findAll('a[href=#' + currentFrameId + '], a[data-frameId=#' + currentFrameId + ']').closest('.' + this._options.ns + '-pagination-item').addClass(selectedClass);
        }
    },
    /*-transition methods*/
    _fadeInit: function() {
        this._allFrames.css({
            left: 0,
            position: "absolute",
            right: 0,
            zIndex: -1
        });
        this._onFadeChangeCompleteProxy = $.proxy(this._onFadeChangeComplete, this);

        this.addEventListener('resize', this._onFadeUpdate, this);

        this.set_frameRate(-1);

    },
    _fadeTransition: function(newFrame, instant) {
        var oldFrame = this.get_frame();
        var frames = this._frames;
        var options = this._options;
        var self = this;

        this._allFrames.stop(true); //stop what's happening

        if (instant || oldFrame == 0) {
            for (var i = 0; i < frames.length; i++) {
                frames[i].css({
                    display: ((i + 1) == newFrame) ? '' : 'none',
                    zIndex: ((i + 1) == newFrame) ? options.frontIndex : options.behindIndex
                });
            }

        } else {
            //not an instant transition
            var currentFrameObj = frames[oldFrame - 1];
            var newFrameObj = frames[newFrame - 1];

            this._allFrames.css({
                'zIndex': options.behindIndex,
                opacity: 1,
                display: 'none'
            }); //move everything to the back and make it visible

            currentFrameObj.css({
                'zIndex': options.swappingIndex,
                display: ''
            });
            newFrameObj.css(
            {
                zIndex: options.frontIndex,
                opacity: 0,
                display: ''
            }
            ).nAnimate(
            {
                opacity: 1
            }
            ,
            {
                duration: (options.transitionTime * 1000),
                easing: options.transitionMethod,
                queue: true,
                complete: function() {
                    self._onFadeChangeComplete(currentFrameObj);


                }
            }
            );
        }

    },
    _verticalInit: function() {

    },
    _verticalTransition: function(newFrame, instant) {

    },
    _horizontalInit: function() {
        var options = this._options;

        //init vars
        this._frameSizeIndex = [];

        //set up html
        this._list.css({
            overflow: 'hidden',
            zoom: 1,
            width: (110 * this._get_virtual_frames()) + '%',
            position: 'absolute'
        });
        this._allFrames.css({
            display: 'block',
            'float': 'left'
        });

        if (this.get_frames() > 1 && (options.smoothLoop || options.framesToShow > 0)) {
            var framesToShow = options.framesToShow + (options.smoothLoop ? 1 : 0);
            var allFrames = this._allFrames;
            var nFrames = this._allFrames.length;

            for (var i = 0; i < framesToShow; i++) {
                var start = this._cloneFrame(this._allFrames[nFrames - ((i % nFrames) + 1)], true); //$().clone().prependTo( this._list ).addClass( 'clone' );
                var end = this._cloneFrame(this._allFrames[i % nFrames]); //$(this._allFrames[i%nFrames]).clone().appendTo( this._list ).addClass( 'clone' );

                allFrames = start.add(allFrames).add(end);
            }

            this._allFrames = allFrames;

            if (options.smoothLoop) {
                this._smoothLoop = true; //record that smoothLooping is being used
                this.addEventListener('_int_changedFrame', this._changedFrameSmoothLoop, this);
            }
        }

        if (options.framesToShow > 0) {
            this._framesToShow = options.framesToShow; //record that this option is being applied

            if (!options.viewportOverflowHidden) {
                this._viewport.css('overflow', 'visible');
            }
        }

        //check feature support
        this._checkTransformSupport();

        this.addEventListener('_resized', this._updateHorizontalSizes, this);

        var self = this;

        this.set_frameRate(-1);
    },
    _horizontalTransitionGetOffset: function(frame) {
        var options = this._options;

        var frameElementIndex = frame + options.framesToShow + (this._smoothLoop ? 1 : 0);
        var offset = (this._viewport.width() - $(this._allFrames[frameElementIndex - 1]).width()) * 0.5

        return -(this._get_frames_offset(frameElementIndex) - offset); //(  + ( newFrame-1 ) ) * this._width;
    },
    _horizontalTransitionOffsetObject: function(targetOffset) {
        if (false && this._has3DTransforms) {
            return {
                transform: 'matrix(1,0,0,1,' + targetOffset + ',0)'
            }; //'translate3d('+-targetOffset+'px,0,0)'
        } else if (this._has2DTransforms) {
            return {
                transform: 'translate(' + targetOffset + 'px,0)'
            }
        } else {
            return {
                left: targetOffset + 'px'
            }
        }
    },
    _horizontalTransition: function(newFrame, instant) {
        var oldFrame = this.get_frame();
        var frames = this._frames;
        var options = this._options;
        var self = this;
        var list = this._list;

        this._allFrames.stop(true); //stop what's happening

        var targetOffset = this._horizontalTransitionGetOffset(newFrame);

        var targetObject = this._horizontalTransitionOffsetObject(targetOffset);

        if (instant || oldFrame == 0) {
            //list.css( 'transform', 'translate3d('+ targetOffset +'px,0,0)' );
            list.css(targetObject);

        } else {
            //not an instant transition
            list.nAnimate(targetObject,
            {
                duration: (options.transitionTime * 1000),
                easing: options.transitionMethod,
                queue: true,
                complete: function() {
                    self._onChangeComplete();
                }
            });
        }
    },
    _updateHorizontalSizes: function() {
        this._allFrames.css('width', this._width);

        //update sizes index
        this._frameSizeIndex.length = 0;
        var offset = 0,
            curFrameObj,
            allFrames = this._allFrames;

        for (var i = 0; i < allFrames.length; i++) {
            curFrameObj = $(allFrames[i]);

            this._frameSizeIndex.push(offset);

            offset += curFrameObj.outerWidth();
        }

        //update slide position
        var frame = this.get_frame();

        if (this.get_frame() > 0) {
            this._set_frame(frame, true, true, true);
        }
    },
    _cloneFrame: function(frameObj, prepend) {
        frameObj = $(frameObj);
        var clone = frameObj.clone()

        var frameId;
        var cloneId = Netcel.getUniqueId('cloneFrame');

        if (frameObj.attr('id')) {
            frameId = frameObj.attr('id');
        } else {
            frameObj.attr('id', (frameId = Netcel.getUniqueId('frame')));
        }

        clone
        .attr('id', cloneId)
        .attr('data-cloneOf', frameId)
        .addClass('clone');

        if (prepend) {
            clone.prependTo(this._list);
        } else {
            clone.appendTo(this._list);
        }

        return clone;
    },
    _get_frames_offset: function(index) {
        return this._frameSizeIndex[index - 1];
    },
    _get_virtual_frames: function() {
        var options = this._options;

        switch (options.transition) {
        case 'vertical':
        case 'horizontal':
            return this.get_frames() + (options.smoothLoop ? 2 : 0) + (options.framesToShow * 2);
        default:
            return this.get_frames();
        }
    },
    _transitionHeight: function(height, instant) {
        this._viewport.stop(true).height(height);























    },
    //doesn't work if not instant
    /*if( true||instant ){
    				
    			}else{
                    var optionsObj = {queue:false,duration:(this._options.heightTransitionTime*1000)};
                    
                    if( this._framesToShow > 0 )
                    {
                        optionsObj.step = function() {
                            $(this).css("overflow","visible");
                        } 

                        optionsObj.complete = function() {
                            $(this).css("overflow","visible");
                        }
                    }
                    
    				this._viewport.stop(true).animate( //TODO fix bug with nAnimate here
    					{ height:height+'px'},
    					optionsObj
    				);
    			}*/
    _onUpdate: function() {
        var newWidth = this.element.width();

        if (newWidth != this._width) {
            //update size
            var oldWidth = this._width;
            this._width = newWidth;

            this._onElementResized(oldWidth);
        }
    },
    _onElementResized: function(oldWidth) {

        //called when the element is resized
        this.dispatchEvent({
            type: '_resized',
            target: this
        });

        //update height
        var oldHeight = this._height
        var maxHeight = 0;

        this._allFrames.each(function() {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });

        this._height = maxHeight;

        if (maxHeight != oldHeight) {
            this._transitionHeight(maxHeight, typeof (oldWidth) == 'undefined');
        }

        this.dispatchEvent({
            type: 'resized',
            target: this,
            width: this._width,
            height: this._height,
            oldWidth: oldWidth
        });

        this.element.trigger('_nc_resized');
    },
    _checkTransformSupport: function() {
        var el = document.createElement('p'),
            has2d,
            has3d,
            transforms = {
                'webkitTransform': '-webkit-transform',
                //'OTransform':'-o-transform',
                'msTransform': '-ms-transform',
                //'MozTransform':'-moz-transform',
                'transform': 'transform'
            };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = "translate(1px,1px)";
                has2d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        this._has2DTransforms = (has2d !== undefined && has2d.length > 0 && has2d !== "none");
        this._has3DTransforms = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    },
    /*-cycling methods*/
    _canCycle: function() {
        if (this.get_frames() > 1 && !this._paused && !this._cycleId && this._options.cycleRate > 0 && !this._hovering && !this._focusing) {
            //now check locks
            var locks = this._locks;

            for (var s in locks) {
                if (locks[s]) {
                    return false;
                }
            }

            //if you get here, can cycle
            return true;
        }

        return false;
    },
    _doCycle: function() {
        //start cycling (only if not currently cycling)
        if (this._canCycle()) {
            this._cycleId = setTimeout($.proxy(this.next, this), this._options.cycleRate * 1000);
        }
    },
    _stopCycle: function() {
        if (this._cycleId) {
            clearInterval(this._cycleId);
            delete this._cycleId;
        }
    },
    /*event handlers*/
    _onPaginationClicked: function(e) {

        //var targetFrame = $( ( target.is( 'a' ) ? target : target.find( 'a' ) ).attr( 'href' ) );
        var linkElement = $(e.currentTarget).findAll('a');
        var frameId = linkElement.attr('data-frameId') || linkElement.attr('href');
        var targetFrame = $(frameId);
        var targetFrameNum = parseInt(targetFrame.attr('data-frameNumber'));

        var url;

        if (targetFrameNum != this.get_frame() || e.type != 'click' || !$(e.currentTarget).attr('data-click-link')) {
            e.preventDefault();
            this.set_frame(targetFrameNum);
        }
    },
    _onFadeChangeComplete: function(completedElement) {
        this._$(completedElement).css('display', 'none');
        this._onChangeComplete();
    },
    _changedFrameSmoothLoop: function(e) {
        if (typeof (this._virtualFrame) != 'undefined' && this._virtualFrame != this._currentFrame) {
            //Netcel.log( '_changedFrameSmoothLoop', this._virtualFrame, this._currentFrame );
            this._set_frame(this._currentFrame, true, true);
        }
    },
    _onChangeComplete: function() {
        var newFrame = this.get_frame();
        if (newFrame > 0 && newFrame < this.get_frames(), this._frames[this.get_frame() - 1]) {
            this._frames[this.get_frame() - 1].addClass(this._options.ns + '-active-frame');
        }
        this._transitioningFrame = false;
        this._doCycle();

        if (!this._suppressCompleteEvent) {
            this.dispatchEvent({
                type: '_int_changedFrame',
                newFrame: newFrame,
                oldFrame: this._lastFrame
            });

            this.dispatchEvent({
                type: 'changedFrame',
                newFrame: newFrame,
                oldFrame: this._lastFrame
            });
        }

        this._suppressCompleteEvent = false;
    },
    _onFocusIn: function(evt) {
        this._focusing = true;
        this._stopCycle();
    },
    _onFocusOut: function(evt) {
        this._focusing = false;
        this._doCycle();
    },
    _onHoverIn: function(evt) {
        this._hovering = true;
        this._stopCycle();
    },
    _onHoverOut: function(evt) {
        this._hovering = false;
        this._doCycle();
    },
    _onKeyDown: function(evt) {
        switch (evt.keyCode + '') {
        case '37':
            this.prev();
            break;
        case '39':
            this.next();
            break;
        }
    },
    _isDragStart: function() {
        return this.is_drag_start;
    },
    _onDragStart: function(evt, position) {
        if (!this._transitioningFrame && this._dragStart == null)//only if not currently transitioning
        {
            this.element.block({
                message: null,
                overlayCSS: {
                    opacity: 0,
                    cursor: 'default',
                    zIndex: this._options.blockZIndex
                }
            })
            this._drags = []

            this._dragStart = position;
            this.set_paused(true, 'dragging');

            this._dragStartTime = this._lastDragTime = (new Date()).getTime() / 1000;
        }
    },
    _onDragging: function(evt, position) {
        if (this._dragStart == null) {
            return;
        }
        console.log('Dragging');
        var d = 0,
            options = this._options;

        switch (options.swipeInput) {
        case 'horizontal':
            d = position.x - this._dragStart.x;
            break;
        case 'vertical':
            d = position.y - this._dragStart.y;
            break;
        }

        var now = (new Date()).getTime() / 1000;
        //var dragTime = now - this._lastDragTime;

        this._drag_delta = d;
        this._drags.push({
            delta: d,
            time: now
        });

        //TODO only implemented for horizontal (need to make generic/extensible)
        switch (options.transition) {
        case 'horizontal':
            this._horizontalDragPosition(d);
            break;
        default:
            return;
        }

        evt.preventDefault();


    },
    //console.log( 'drag: '+position.x+', '+position.y );
    _horizontalDragPositionAdjusted: function(dragAmount) {
        var targetOffset = this._horizontalTransitionGetOffset(this.get_frame()) + dragAmount;

        //endOffset -= this._frames[this.get_frames()-1].width();

        //console.log( 'b:'+targetOffset );
        //wrap value
        return this._horizontalPositionAdjusted(targetOffset);
    },
    _horizontalPositionAdjusted: function(position) {
        var startOffset = this._horizontalTransitionGetOffset(1);
        var endOffset = this._horizontalTransitionGetOffset(this.get_frames());
        var contentWidth = endOffset - startOffset - this._frames[this.get_frames() - 1].width();

        while (position > startOffset) {
            position += contentWidth;
        }
        //console.log( 'c:'+targetOffset+', '+endOffset );
        while (position < endOffset) {
            position -= contentWidth;
        }

        return position;
    },
    _horizontalDragPosition: function(dragAmount) {
        var targetOffset = this._horizontalDragPositionAdjusted(dragAmount);

        //apply offset
        var targetObject = this._horizontalTransitionOffsetObject(targetOffset);
        this._horizontal_drag_offset = targetOffset;

        //move
        this._list.css(targetObject);
    },
    _onDragEnd: function(evt, position) {
        if (this._dragStart == null) {
            return;
        }
        //Netcel.log( 'drag end!' );
        //
        //trigger dragging

        //unblock
        //this.element.unblock();

        //alert( 'dragend' );
        console.log('Drag end');
        switch (this._options.transition) {
        case 'horizontal':
            //momentum
            if (this._drags.length > 1)//TODO not taking time into account?
            {
                var nAvg = 5;
                var start = this._drags[Math.max(0, this._drags.length - (1 + nAvg))];
                var end = this._drags[this._drags.length - 1]

                var totalTime = end.time - start.time;
                var totalDelta = end.delta - start.delta;

                if (totalTime > 0) {
                    this._momentum = totalDelta / totalTime;
                    this._momentum /= 60; //adjust for update framerate
                }
                else {
                    this._momentum = 0;
                }

                //limit momentum
                this._momentum = this._momentum < -100 ? -100 : this._momentum > 100 ? 100 : this._momentum;

                var self = this;
                //Netcel.log( this._drags );
                //Netcel.log( start, end );
                //Netcel.log("momentum: "+this._momentum);
                window.requestAnimFrame(function() {
                    self._onHorizontalMomentumUpdate();
                });
            }
            else {
                this._momentum = 0;
                var self = this;

                //need to ensure this code becomes async
                setTimeout(function() {
                    self._onHorizontalMomentumEnd();
                }, 0);
            }
            break;
        }
        var carousel_type = this._viewport.parents('div[datalayer-carousel-type]').attr('datalayer-carousel-type');
        var swipe_direction = '';

        var startPos = this._horizontalDragPositionAdjusted(0);
        var curPos = startPos + this._drag_delta;
        // console.log('Start pos: ' + startPos);
        // console.log('Current pos: ' + curPos);
        if (startPos > curPos) {
            swipe_direction = 'Right Swipe';
        } else if (startPos < curPos) {
            swipe_direction = 'Left Swipe';
        }
        // console.log('swipe_direction ', {
        //     swipe_direction,
        //     frame:  this.get_frame()
        // })
        var _this = this;

        if (swipe_direction && this._lastFrame != this.get_frame()) {
            setTimeout(function() {
                DELONGHI.datalayer.sliderOnClicked({
                    carousel_type: carousel_type,
                    selector_type: swipe_direction,
                    slide_number: _this.get_frame()
                });
            }, 1000)
        }
    },
    _onHorizontalMomentumUpdate: function() {
        var momentumThresh = this._options.momentumThreshold;
        var momentumMod = this._options.momentumFriction;
        this._momentum *= momentumMod;

        if (this._isAtNextFrame()) {
            this._momentum *= 0.75; //jam on the brakes
        }

        if (Math.abs(this._momentum) < momentumThresh || isNaN(this._momentum)) {
            this._onHorizontalMomentumEnd();
        }
        else {
            this._drag_delta += this._momentum;

            //move
            this._horizontalDragPosition(this._drag_delta);

            //next frame
            var self = this;
            window.requestAnimFrame(function() {
                self._onHorizontalMomentumUpdate();
            });
        }
    },
    _isAtNextFrame: function() {

        var startPos = this._horizontalDragPositionAdjusted(0);
        var curPos = startPos + this._drag_delta;
        var width = this._frames[this.get_frame() - 1].width();

        return (curPos + width < startPos) || (curPos - width > startPos);
    },
    _horizontalGetClosestFrame: function(targetOffset, doMove) {
        var frameStart,
            d;
        var closestIndex = -1;
        var closestDistance = 10000000000000;

        //go to closest item
        for (var i = 1; i <= this.get_frames(); i++) {
            frameStart = this._horizontalTransitionGetOffset(i);
            //frameWidth = this._frames[i-1].width();

            d = Math.abs(frameStart - targetOffset);

            if (d < closestDistance) {
                closestDistance = d;
                closestIndex = i;
            }
        }

        //check for going backwards
        if (targetOffset > this._horizontalTransitionGetOffset(1)) {
            var contentWidth = (this._horizontalTransitionGetOffset(this.get_frames()) - this._horizontalTransitionGetOffset(1)) - this._frames[this.get_frames() - 1].width();

            targetOffset += contentWidth;

            for (i = 1; i <= this.get_frames(); i++) {
                frameStart = this._horizontalTransitionGetOffset(i);
                //frameWidth = this._frames[i-1].width();

                d = Math.abs(frameStart - targetOffset);

                if (d < closestDistance) {
                    closestDistance = d;
                    closestIndex = i;

                    //move carousel
                    if (doMove) {
                        this._list.css(this._horizontalTransitionOffsetObject(targetOffset));
                    }
                }
            }
        }

        return closestIndex;
    },
    _onHorizontalMomentumEnd: function() {
        //Netcel.log( "momentum end" );
        this.element.unblock();

        var options = this._options;
        this._dragStart = null;
        this.set_paused(false, 'dragging');

        var targetOffset = this._horizontal_drag_offset;


        var closestIndex = this._horizontalGetClosestFrame(targetOffset, true);

        if (closestIndex == -1) {
            closestIndex = this.get_frame();
        }

        //if you're on EXACTLY the right pixel, don't do anything! 
        if (this._horizontal_drag_offset != this._horizontalTransitionGetOffset(closestIndex)) {
            var transitionTime = options.transitionTime;
            options.transitionTime = 0.25; //bodge to make this faster than normal transition

            this.set_frame(closestIndex, false, true); //set the frame

            options.transitionTime = transitionTime;
        }
        else {

        }
    }
}
);

//Tabs

Netcel.Class.create("Tabs", Netcel.Widget, {
    initialize: function(v, x, w) {
        this.$super.initialize(v, x, w, {
            navClassPrefix: "-nav",
            contentClassPrefix: "-content",
            panelClassPrefix: "-panel",
            selectedClassPrefix: "-selected",
            defaultTab: 0,
            autoRotate: !1,
            rotationTime: 5
        });
        w = this._options;
        x = this.element;
        var u = w.ns + w.navClassPrefix,
            q = w.ns + w.contentClassPrefix,
            o = w.ns + w.panelClassPrefix,
            p = w.ns + w.selectedClassPrefix,
            r = x.find("." + u),
            t = x.find("." + q);
        x = t.find("> div");
        var n = w.autoRotate;
        this._tabNav = r;
        this._tabContent = t;
        this._tabPanel = x;
        this._navClass = u;
        this._contentClass = q;
        this._panelClass = o;
        this._selectedClass = p;
        this._tabIDsuffix = "-enhanced";
        v("body").is("[role]") || v("body").attr("role", "application");
        u = r.find("li");
        u.each(function() {
            var b = v(this).find("a").attr("href").replace("#", "");
            v(this).attr({
                role: "tab",
                id: "tab-" + b,
                role: "tabslist"
            }).find("a").attr("tabindex", "-1")
        });
        if (!Netcel.NumberUtil.isNumber(w.defaultTab)) {
            q = !1;
            for (t = 0; t < x.length; t++) {
                if (x[t].id == w.defaultTab) {
                    q = !0;
                    w.defaultTab = t;
                    break
                }
            }
            if (!q) {
                throw Error("Cannot find default tab: " + w.defaultTab)
            }
        }
        x.each(function() {
            var b = v(this).attr("id");
            v(this).attr({
                role: "tabpanel",
                "aria-hidden": !0,
                id: b + "-enhanced",
                "aria-labelledby": "tab-" + b
            }).addClass(o)
        });
        v(u[w.defaultTab]).addClass(p).find("a").attr("tabindex", 0);
        v(x[w.defaultTab]).attr("aria-hidden", !1).addClass(p);
        r.find("li a").click(v.proxy(this._tabNavClick, this)).keydown(v.proxy(this._tabNavKeyDown, this));
        x.keydown(v.proxy(this._tabPanelKeyDown, this));
        if (n) {
            var j = setInterval(function() {
                var b = r.find("li." + p);
                b.next().find("a").length ? selectTab(b.next().find("a")) : selectTab(r.find("li:first a"))
            }, 1000 * w.rotationTime)
        }
        n && r.find("a").bind("mouseover click keydown focus", function() {
            clearInterval(j)
        })
    },
    _selectTab: function(h) {
        var f = this._$;
        h = f(h);
        var e = this._tabIDsuffix,
            g = this._selectedClass,
            e = h.attr("href").replace("#", "") + e;
        this._tabNav.find("li." + g).removeClass(g).find("a").attr("tabindex", -1);
        h.attr("tabindex", 0).parent("li").addClass(g);
        this._tabContent.find("." + g).removeClass(g).attr("aria-hidden", !0);
        f("#" + e).addClass(g).attr("aria-hidden", !1)
    },
    _tabNavClick: function(d) {
        var b = this._$;
        this._selectTab(b(d.currentTarget));
        b(d.currentTarget).focus();
        return !1
    },
    _tabNavKeyDown: function(f) {
        var e = this._$,
            e = e(f.currentTarget).parent(),
            d = !0;
        switch (f.keyCode) {
        case 37:
        case 38:
            0 < e.prev().size() ? (this._selectTab(e.prev().find("a")), e.prev().find("a").eq(0).focus()) : (this._selectTab(e.parent().find("a:last")), e.parent().find("a:last").eq(0).focus());
            d = !1;
            break;
        case 39:
        case 40:
            0 < e.next().size() ? (this._selectTab(e.next().find("a")), e.next().find("a").eq(0).focus()) : (this._selectTab(e.parent().find("a:first")), e.parent().find("a:first").eq(0).focus());
            d = !1;
            break;
        case 36:
            this._selectTab(e.parent().find("a:first"));
            e.parent().find("a:first").eq(0).focus();
            d = !1;
            break;
        case 35:
            this._selectTab(e.parent().find("a:last")),
            e.parent().find("a:last").eq(0).focus(),
            d = !1
        }
        return d
    },
    _tabPanelKeyDown: function(a) {
        !a.ctrlKey || 37 != a.keyCode && 38 != a.keyCode || this._tabNav.find("li." + this._selectedClass + " a").focus()
    }
});
Netcel.Class.create("ToolTip", Netcel.Widget, Netcel.Shared.UpdatingMixin, Netcel.Analytics ? Netcel.Analytics.AnalyticsMixin : null, {
    initialize: function(f, h, c) {
        this.$super.initialize(f, h, c, {
            activateOnHover: !0,
            activateOnFocus: !0,
            activateOnClick: !1,
            preventDefault: !1,
            text: null,
            textTarget: null,
            fps: -1,
            positions: "br bc tc rc lc rb rt tr lt bl tl lb",
            preferOnscreenHorz: !0,
            elementPosition: "inner",
            hideDelay: 1,
            showAnimParams: {
                duration: 200
            },
            hideAnimParams: {
                duration: 400
            },
            popupClasses: "",
            analytics_id: null,
            group: "main",
            cloneContent: !0
        });
        c = this._options;
        h = this.element;
        c.positions = c.positions.split(" ");
        var e = this._popup = f('<div role="tooltip" aria-hidden="true" class="' + c.ns + "-popup " + c.popupClasses + '"></div>').css({
                display: "none",
                position: "absolute",
                opacity: 0
            }),
            g = null;
        c.textTarget && 0 < (g = f(c.textTarget)).length ? c.cloneContent ? e.html(g.html()) : e.append(g) : c.text ? e.html(c.text) : (e.text(h.attr("title")), h.attr("title", null));
        f("body").append(e);
        if (c.activateOnHover) {
            h.on("touchstart mouseenter", f.proxy(this._onHover, this))
        }
        if (c.activateOnClick) {
            h.on("click", f.proxy(this._onClick, this))
        } else {
            h.on("click", function(b) {
                b.preventDefault()
            })
        }
        if (c.activateOnFocus) {
            h.on("focus", f.proxy(this._onFocus, this))
        }
        this._onBlurHandler = f.proxy(this._onBlur, this);
        this._mouseOverHandler = f.proxy(this._mouseOver, this);
        this._touchstartHandler = f.proxy(this._touchstart, this);
        this._hidePopupProxy = f.proxy(this._hidePopup, this);
        this._shownPopupProxy = f.proxy(this._shownPopup, this);
        this._hasInteracted = this._isFocused = this._isHiding = this._isShowing = this._isPopupVisible = !1;
        this._metrics = new Netcel.Html.Metrics(h, f, !0);
        this._popupMetrics = new Netcel.Html.Metrics(e, f, !0);
        this._lastPosition = "";
        this.set_frameRate(c.fps);
        this._initAnayltics && this._initAnayltics(f, h[0], {
            events: "firstinteraction interaction",
            id: c.analytics_id
        });
        c.group && Netcel.ToolTip._dispatcher.addEventListener(c.group, this._onGroupToolTipShown, this)
    },
    _onGroupToolTipShown: function(b) {
        b.target != this && this._hidePopup()
    },
    _onHover: function(b) {
        "touchstart" === b.type && (b.preventDefault(), b.stopImmediatePropagation());
        "touchstart" === b.type && this._isPopupVisible && !this._isShowing ? this._doHide(!0) : this._showPopup();
        b = this._$;
        b(document).on("mouseover", this._mouseOverHandler).on("touchstart", this._touchstartHandler)
    },
    _onClick: function(b) {
        this._showPopup();
        var c = this._options;
        c.preventDefault && b.preventDefault();
        if (!c.activateOnFocus) {
            this.element.on("blur", this._onBlurHandler)
        }
    },
    _onFocus: function(b) {
        this._isFocused = !0;
        this._showPopup();
        this.element.on("blur", this._onBlurHandler)
    },
    _onBlur: function(b) {
        this._isFocused = !1;
        this._doHide()
    },
    _touchstart: function(b) {
        var c = this._$;
        this._popup.is(b.target) || c.contains(this._popup[0], b.target) || this._doHide(!0)
    },
    _mouseOver: function(b) {
        var c = this._$;
        this.element.is(b.target) || this._popup.is(b.target) || c.contains(this.element[0], b.target) || c.contains(this._popup[0], b.target) ? this._preventHide() : this._isFocused || this._doHide()
    },
    _onUpdate: function() {
        this._isPopupVisible && this._positionPopup()
    },
    _showPopup: function(e) {
        if (!this._isPopupVisible || e) {
            var f = this._options,
                c = !1;
            f.group && Netcel.ToolTip._dispatcher.dispatchEvent(f.group);
            !this._isPopupVisible && e && (c = !0);
            this._isShowing = this._isPopupVisible = !0;
            this._popup.css({
                display: ""
            }).stop(!0).attr("aria-hidden", "false");
            f.showAnimParams.complete = this._shownPopupProxy;
            this._popup.animate({
                opacity: 1
            }, this._options.showAnimParams);
            this._positionPopup();
            this._interact();
            c && (e = this._$, e(document).on("mouseover", this._mouseOverHandler).on("touchstart", this._touchstartHandler))
        }
    },
    _shownPopup: function() {
        this._isShowing = !1
    },
    _doHide: function(e) {
        if (this._isPopupVisible && !this._isHiding) {
            var f = this._options,
                c = this._popup;
            f.hideAnimParams.complete = this._hidePopupProxy;
            c.stop(!0);
            this._isShowing || e || c.delay(1000 * f.hideDelay);
            c.animate({
                opacity: 0
            }, f.hideAnimParams);
            this._isHiding = !0;
            this._isShowing = !1;
            $(document).off("touchstart", this._touchstartHandler)
        }
    },
    _preventHide: function() {
        this._isHiding && (this._isHiding = !1, this._showPopup(!0))
    },
    _hidePopup: function() {
        if (this._isPopupVisible) {
            var b = this._$;
            this._isPopupVisible = this._isShowing = this._isHiding = !1;
            this._popup.css("display", "none").attr("aria-hidden", "true");
            this.element.off("blur", this._onBlurHandler);
            b(document).off("mouseover", this._mouseOverHandler).off("touchstart", this._touchstartHandler)
        }
    },
    _positionPopup: function() {
        var Q = this._options,
            N = Q.positions,
            P,
            H = !1,
            E,
            z,
            y,
            o,
            O;
        if (this.element.is(":visible")) {
            "" != this._lastPosition && this._popup.removeClass(Q.ns + "-popup-" + this._lastPosition);
            var M = Netcel.Html.getViewport(),
                J = this._metrics.size(Q.elementPosition),
                L = this._popupMetrics.fullWidth(),
                K = this._popupMetrics.fullHeight(),
                I = Math.round(J.y),
                C = Math.round(J.x + J.width),
                D = Math.round(J.y + J.height),
                B = Math.round(J.x),
                G = this._oldViewport,
                F = this._oldBounds,
                A = this._oldPopupWidth,
                j = this._oldPopupHeight;
            "" != this._lastPosition && this._popup.addClass(Q.ns + "-popup-" + this._lastPosition);
            if ("" == this._lastPosition || null == this._oldViewport || M.x != G.x || M.y != G.y || M.width != G.width || M.height != G.height || M.x != F.x || M.y != F.y || M.width != F.width || M.height != F.height || L != A || K != j) {
                this._oldViewport = M;
                this._oldBounds = J;
                this._oldPopupWidth = L;
                this._oldPopupHeight = K;
                for (G = 0; G < N.length; G++) {
                    P = N[G].toLowerCase();
                    switch (P) {
                    case "tr":
                        O = {
                            left: B,
                            top: I - K
                        };
                        break;
                    case "tl":
                        O = {
                            left: C - L,
                            top: I - K
                        };
                        break;
                    case "rb":
                        O = {
                            left: C,
                            top: I
                        };
                        break;
                    case "rt":
                        O = {
                            left: C,
                            top: D - K
                        };
                        break;
                    case "br":
                        O = {
                            left: B,
                            top: D
                        };
                        break;
                    case "bl":
                        O = {
                            left: C - L,
                            top: D
                        };
                        break;
                    case "lb":
                        O = {
                            left: B - L,
                            top: I
                        };
                        break;
                    case "lt":
                        O = {
                            left: B - L,
                            top: D - K
                        };
                        break;
                    case "tc":
                        O = {
                            left: B - (L - J.width) / 2,
                            top: I - K
                        };
                        break;
                    case "rc":
                        O = {
                            left: C,
                            top: I - (K - J.height) / 2
                        };
                        break;
                    case "bc":
                        O = {
                            left: B - (L - J.width) / 2,
                            top: D
                        };
                        break;
                    case "lc":
                        O = {
                            left: C - L,
                            top: I - (K - J.height) / 2
                        }
                    }
                    if (H = O.left >= M.x && O.left + L <= M.x + M.width && O.top >= M.y && O.top + K <= M.y + M.height) {
                        break
                    } else {
                        if (F = O.left < M.x || O.left + L > M.x + M.width, A = Math.max(0, (Math.min(O.left + L, M.x + M.width) - Math.max(O.left, M.x)) * (Math.min(O.top + K, M.y + M.height) - Math.max(O.top, M.y))), A = L * K - A, !E || !F && z || F == z && A < y) {
                            E = P,
                            o = O,
                            z = F,
                            y = A
                        }
                    }
                }
                H ? (this._lastUsedPositionCss = O, this._lastUsedPosition = P) : Q.preferOnscreenHorz && z ? (I = I - M.y > D - (M.y + M.height) ? I.popupHeight : D, O = {
                    left: Math.round((M.width - L) / 2) + "px",
                    top: I + "px"
                }, P = "cust") : (O = o, P = E);
                P != this._lastPosition && ("" != this._lastPosition && this._popup.removeClass(Q.ns + "-popup-" + this._lastPosition), this._popup.addClass(Q.ns + "-popup-" + P), this._lastPosition = P);
                O.left += "px";
                O.top += "px";
                this._popup.css(O)
            }
        } else {
            this._hidePopup()
        }
    },
    _interact: function() {
        var b = {};
        this._analytics_options && (b = {
            type: "event",
            category: "ToolTip",
            label: this._analytics_options.id,
            value: null,
            nonInteraction: null,
            callback: null
        });
        this._hasInteracted || (this._hasInteracted = !0, b.action = "firstinteraction", this.dispatchEvent({
            type: "firstinteraction",
            analytics: b
        }));
        b.action = "interaction";
        this.dispatchEvent({
            type: "interaction",
            analytics: b
        })
    },
    __init__: function(b) {
        Netcel.ToolTip._dispatcher = new Netcel.EventDispatcher;
        Netcel.defaultInit(b, this)
    }
});
(function() {
    (function(j) {
        function a(D, E) {
            var z,
                v,
                y = D == window,
                x = E && void 0 !== E.message ? E.message : void 0;
            E = j.extend({}, j.blockUI.defaults, E || {});
            if (!E.ignoreIfBlocked || !j(D).data("blockUI.isBlocked")) {
                E.overlayCSS = j.extend({}, j.blockUI.defaults.overlayCSS, E.overlayCSS || {});
                z = j.extend({}, j.blockUI.defaults.css, E.css || {});
                E.onOverlayClick && (E.overlayCSS.cursor = "pointer");
                v = j.extend({}, j.blockUI.defaults.themedCSS, E.themedCSS || {});
                x = void 0 === x ? E.message : x;
                y && g && C(window, {
                    fadeOut: 0
                });
                if (x && "string" != typeof x && (x.parentNode || x.jquery)) {
                    var u = x.jquery ? x[0] : x,
                        A = {};
                    j(D).data("blockUI.history", A);
                    A.el = u;
                    A.parent = u.parentNode;
                    A.display = u.style.display;
                    A.position = u.style.position;
                    A.parent && A.parent.removeChild(u)
                }
                j(D).data("blockUI.onUnblock", E.onUnblock);
                var A = E.baseZ,
                    t;
                t = B || E.forceIframe ? j('<iframe class="blockUI" style="z-index:' + A++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + E.iframeSrc + '"></iframe>') : j('<div class="blockUI" style="display:none"></div>');
                u = E.theme ? j('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + A++ + ';display:none"></div>') : j('<div class="blockUI blockOverlay" style="z-index:' + A++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
                E.theme && y ? (A = '<div class="blockUI ' + E.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (A + 10) + ';display:none;position:fixed">', E.title && (A += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (E.title || " ") + "</div>"), A += '<div class="ui-widget-content ui-dialog-content"></div></div>') : E.theme ? (A = '<div class="blockUI ' + E.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (A + 10) + ';display:none;position:absolute">', E.title && (A += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (E.title || " ") + "</div>"), A += '<div class="ui-widget-content ui-dialog-content"></div>', A += "</div>") : A = y ? '<div class="blockUI ' + E.blockMsgClass + ' blockPage" style="z-index:' + (A + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + E.blockMsgClass + ' blockElement" style="z-index:' + (A + 10) + ';display:none;position:absolute"></div>';
                A = j(A);
                x && (E.theme ? (A.css(v), A.addClass("ui-widget-content")) : A.css(z));
                E.theme || u.css(E.overlayCSS);
                u.css("position", y ? "fixed" : "absolute");
                (B || E.forceIframe) && t.css("opacity", 0);
                z = [t, u, A];
                var c = y ? j("body") : j(D);
                j.each(z, function() {
                    this.appendTo(c)
                });
                E.theme && E.draggable && j.fn.draggable && A.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                });
                v = h && (!j.support.boxModel || 0 < j("object,embed", y ? null : D).length);
                if (o || v) {
                    y && E.allowBodyStretch && j.support.boxModel && j("html,body").css("height", "100%");
                    if ((o || !j.support.boxModel) && !y) {
                        v = parseInt(j.css(D, "borderTopWidth"), 10) || 0;
                        var n = parseInt(j.css(D, "borderLeftWidth"), 10) || 0,
                            l = v ? "(0 - " + v + ")" : 0,
                            F = n ? "(0 - " + n + ")" : 0
                    }
                    j.each(z, function(p, G) {
                        var r = G[0].style;
                        r.position = "absolute";
                        if (2 > p) {
                            y ? r.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + E.quirksmodeOffsetHack + ') + "px"') : r.setExpression("height", 'this.parentNode.offsetHeight + "px"'),
                            y ? r.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : r.setExpression("width", 'this.parentNode.offsetWidth + "px"'),
                            F && r.setExpression("left", F),
                            l && r.setExpression("top", l)
                        } else {
                            if (E.centerY) {
                                y && r.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
                                r.marginTop = 0
                            } else {
                                if (!E.centerY && y) {
                                    var q = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + (E.css && E.css.top ? parseInt(E.css.top, 10) : 0) + ') + "px"';
                                    r.setExpression("top", q)
                                }
                            }
                        }
                    })
                }
                x && (E.theme ? A.find(".ui-widget-content").append(x) : A.append(x), (x.jquery || x.nodeType) && j(x).show());
                (B || E.forceIframe) && E.showOverlay && t.show();
                if (E.fadeIn) {
                    z = E.onBlock ? E.onBlock : w,
                    t = E.showOverlay && !x ? z : w,
                    z = x ? z : w,
                    E.showOverlay && u._fadeIn(E.fadeIn, t),
                    x && A._fadeIn(E.fadeIn, z)
                } else {
                    if (E.showOverlay && u.show(), x && A.show(), E.onBlock) {
                        E.onBlock()
                    }
                }
                m(1, D, E);
                y ? (g = A[0], f = j(E.focusableElements, g), E.focusInput && setTimeout(k, 20)) : e(A[0], E.centerX, E.centerY);
                E.timeout && (x = setTimeout(function() {
                    y ? j.unblockUI(E) : j(D).unblock(E)
                }, E.timeout), j(D).data("blockUI.timeout", x))
            }
        }
        function C(c, l) {
            var t,
                p = c == window,
                r = j(c),
                q = r.data("blockUI.history"),
                n = r.data("blockUI.timeout");
            n && (clearTimeout(n), r.removeData("blockUI.timeout"));
            l = j.extend({}, j.blockUI.defaults, l || {});
            m(0, c, l);
            null === l.onUnblock && (l.onUnblock = r.data("blockUI.onUnblock"), r.removeData("blockUI.onUnblock"));
            var u;
            u = p ? j("body").children().filter(".blockUI").add("body > .blockUI") : r.find(">.blockUI");
            l.cursorReset && (1 < u.length && (u[1].style.cursor = l.cursorReset), 2 < u.length && (u[2].style.cursor = l.cursorReset));
            p && (g = f = null);
            l.fadeOut ? (t = u.length, u.fadeOut(l.fadeOut, function() {
                0 === --t && d(u, q, l, c)
            })) : d(u, q, l, c)
        }
        function d(c, l, q, n) {
            var p = j(n);
            c.each(function(t, r) {
                this.parentNode && this.parentNode.removeChild(this)
            });
            l && l.el && (l.el.style.display = l.display, l.el.style.position = l.position, l.parent && l.parent.appendChild(l.el), p.removeData("blockUI.history"));
            p.data("blockUI.static") && p.css("position", "static");
            if ("function" == typeof q.onUnblock) {
                q.onUnblock(n, q)
            }
            c = j(document.body);
            l = c.width();
            q = c[0].style.width;
            c.width(l - 1).width(l);
            c[0].style.width = q
        }
        function m(c, l, p) {
            var n = l == window;
            l = j(l);
            if (c || (!n || g) && (n || l.data("blockUI.isBlocked"))) {
                l.data("blockUI.isBlocked", c),
                n && p.bindEvents && (!c || p.showOverlay) && (c ? j(document).bind("mousedown mouseup keydown keypress keyup touchstart touchend touchmove", p, b) : j(document).unbind("mousedown mouseup keydown keypress keyup touchstart touchend touchmove", b))
            }
        }
        function b(c) {
            if ("keydown" === c.type && c.keyCode && 9 == c.keyCode && g && c.data.constrainTabKey) {
                var l = f,
                    n = c.shiftKey && c.target === l[0];
                if (!c.shiftKey && c.target === l[l.length - 1] || n) {
                    return setTimeout(function() {
                        k(n)
                    }, 10), !1
                }
            }
            l = c.data;
            c = j(c.target);
            if (c.hasClass("blockOverlay") && l.onOverlayClick) {
                l.onOverlayClick()
            }
            return 0 < c.parents("div." + l.blockMsgClass).length ? !0 : 0 === c.parents().children().filter("div.blockUI").length
        }
        function k(c) {
            f && (c = f[!0 === c ? f.length - 1 : 0]) && c.focus()
        }
        function e(c, l, r) {
            var n = c.parentNode,
                q = c.style,
                p = (n.offsetWidth - c.offsetWidth) / 2 - (parseInt(j.css(n, "borderLeftWidth"), 10) || 0);
            c = (n.offsetHeight - c.offsetHeight) / 2 - (parseInt(j.css(n, "borderTopWidth"), 10) || 0);
            l && (q.left = 0 < p ? p + "px" : "0");
            r && (q.top = 0 < c ? c + "px" : "0")
        }
        j.fn._fadeIn = j.fn.fadeIn;
        var w = j.noop || function() {},
            B = /MSIE/.test(navigator.userAgent),
            o = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent),
            h = j.isFunction(document.createElement("div").style.setExpression);
        j.blockUI = function(c) {
            a(window, c)
        };
        j.unblockUI = function(c) {
            C(window, c)
        };
        j.growlUI = function(c, l, r, n) {
            var q = j('<div class="growlUI"></div>');
            c && q.append("<h1>" + c + "</h1>");
            l && q.append("<h2>" + l + "</h2>");
            void 0 === r && (r = 3000);
            var p = function(t) {
                t = t || {};
                j.blockUI({
                    message: q,
                    fadeIn: "undefined" !== typeof t.fadeIn ? t.fadeIn : 700,
                    fadeOut: "undefined" !== typeof t.fadeOut ? t.fadeOut : 1000,
                    timeout: "undefined" !== typeof t.timeout ? t.timeout : r,
                    centerY: !1,
                    showOverlay: !1,
                    onUnblock: n,
                    css: j.blockUI.defaults.growlCSS
                })
            };
            p();
            q.css("opacity");
            q.mouseover(function() {
                p({
                    fadeIn: 0,
                    timeout: 30000
                });
                var t = j(".blockMsg");
                t.stop();
                t.fadeTo(300, 1)
            }).mouseout(function() {
                j(".blockMsg").fadeOut(1000)
            })
        };
        j.fn.block = function(c) {
            if (this[0] === window) {
                return j.blockUI(c), this
            }
            var l = j.extend({}, j.blockUI.defaults, c || {});
            this.each(function() {
                var n = j(this);
                l.ignoreIfBlocked && n.data("blockUI.isBlocked") || n.unblock({
                    fadeOut: 0
                })
            });
            return this.each(function() {
                "static" == j.css(this, "position") && (this.style.position = "relative", j(this).data("blockUI.static", !0));
                this.style.zoom = 1;
                a(this, c)
            })
        };
        j.fn.unblock = function(c) {
            return this[0] === window ? (j.unblockUI(c), this) : this.each(function() {
                C(this, c)
            })
        };
        j.blockUI.version = 2.6;
        j.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: 0.6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: 0.6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1000,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        };
        var g = null,
            f = []
    })(jQuery)
})();
(function(Y, d, M, X, b) {
    function e(w) {
        w = w.split(")");
        var v = Y.trim,
            p = -1,
            q = w.length - 1,
            r,
            m,
            n = c ? new Float32Array(6) : [],
            u = c ? new Float32Array(6) : [],
            l = c ? new Float32Array(6) : [1, 0, 0, 1, 0, 0];
        n[0] = n[3] = l[0] = l[3] = 1;
        for (n[1] = n[2] = n[4] = n[5] = 0; ++p < q;) {
            r = w[p].split("(");
            m = v(r[0]);
            r = r[1];
            u[0] = u[3] = 1;
            u[1] = u[2] = u[4] = u[5] = 0;
            switch (m) {
            case Q + "X":
                u[4] = parseInt(r, 10);
                break;
            case Q + "Y":
                u[5] = parseInt(r, 10);
                break;
            case Q:
                r = r.split(",");
                u[4] = parseInt(r[0], 10);
                u[5] = parseInt(r[1] || 0, 10);
                break;
            case k:
                r = j(r);
                u[0] = X.cos(r);
                u[1] = X.sin(r);
                u[2] = -X.sin(r);
                u[3] = X.cos(r);
                break;
            case U + "X":
                u[0] = +r;
                break;
            case U + "Y":
                u[3] = r;
                break;
            case U:
                r = r.split(",");
                u[0] = r[0];
                u[3] = 1 < r.length ? r[1] : r[0];
                break;
            case O + "X":
                u[2] = X.tan(j(r));
                break;
            case O + "Y":
                u[1] = X.tan(j(r));
                break;
            case f:
                r = r.split(","),
                u[0] = r[0],
                u[1] = r[1],
                u[2] = r[2],
                u[3] = r[3],
                u[4] = parseInt(r[4], 10),
                u[5] = parseInt(r[5], 10)
            }
            l[0] = n[0] * u[0] + n[2] * u[1];
            l[1] = n[1] * u[0] + n[3] * u[1];
            l[2] = n[0] * u[2] + n[2] * u[3];
            l[3] = n[1] * u[2] + n[3] * u[3];
            l[4] = n[0] * u[4] + n[2] * u[5] + n[4];
            l[5] = n[1] * u[4] + n[3] * u[5] + n[5];
            n = [l[0], l[1], l[2], l[3], l[4], l[5]]
        }
        return l
    }
    function V(m) {
        var l,
            q,
            r,
            u = m[0],
            n = m[1],
            p = m[2],
            v = m[3];
        u * v - n * p ? (l = X.sqrt(u * u + n * n), u /= l, n /= l, r = u * p + n * v, p -= u * r, v -= n * r, q = X.sqrt(p * p + v * v), r /= q, u * (v / q) < n * (p / q) && (u = -u, n = -n, r = -r, l = -l)) : l = q = r = 0;
        return [[Q, [+m[4], +m[5]]], [k, X.atan2(n, u)], [O + "X", X.atan(r)], [U, [l, q]]]
    }
    function a(A, z) {
        var v = {
                start: [],
                end: []
            },
            w = -1,
            x,
            r,
            u,
            y;
        ("none" == A || o.test(A)) && (A = "");
        ("none" == z || o.test(z)) && (z = "");
        A && (z && !z.indexOf("matrix") && S(A).join() == S(z.split(")")[0]).join()) && (v.origin = A, A = "", z = z.slice(z.indexOf(")") + 1));
        if (A || z) {
            if (A && z && A.replace(/(?:\([^)]*\))|\s/g, "") != z.replace(/(?:\([^)]*\))|\s/g, "")) {
                v.start = V(e(A)),
                v.end = V(e(z))
            } else {
                for (A && (A = A.split(")")) && (x = A.length), z && (z = z.split(")")) && (x = z.length); ++w < x - 1;) {
                    A[w] && (r = A[w].split("("));
                    z[w] && (u = z[w].split("("));
                    y = Y.trim((r || u)[0]);
                    for (var q = v.start, p = h(y, r ? r[1] : 0), l = void 0; l = p.shift();) {
                        q.push(l)
                    }
                    q = v.end;
                    y = h(y, u ? u[1] : 0);
                    for (p = void 0; p = y.shift();) {
                        q.push(p)
                    }
                }
            }
            return v
        }
    }
    function h(m, l) {
        var n = +!m.indexOf(U),
            p,
            q = m.replace(/e[XY]/, "e");
        switch (m) {
        case Q + "Y":
        case U + "Y":
            l = [n, l ? parseFloat(l) : n];
            break;
        case Q + "X":
        case Q:
        case U + "X":
            p = 1;
        case U:
            l = l ? (l = l.split(",")) && [parseFloat(l[0]), parseFloat(1 < l.length ? l[1] : m == U ? p || l[0] : n + "")] : [n, n];
            break;
        case O + "X":
        case O + "Y":
        case k:
            l = l ? j(l) : 0;
            break;
        case f:
            return V(l ? S(l) : [1, 0, 0, 1, 0, 0])
        }
        return [[q, l]]
    }
    function j(l) {
        return ~l.indexOf("deg") ? parseInt(l, 10) * (2 * X.PI / 360) : ~l.indexOf("grad") ? parseInt(l, 10) * (X.PI / 200) : parseFloat(l)
    }
    function S(l) {
        l = /([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(l);
        return [l[1], l[2], l[3], l[4], l[5], l[6]]
    }
    M = M.createElement("div").style;
    var R = ["OTransform", "msTransform", "WebkitTransform", "MozTransform"],
        P = R.length,
        W,
        N,
        c = "Float32Array" in d,
        T,
        g,
        t = /Matrix([^)]*)/,
        o = /^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,
        Q = "translate",
        k = "rotate",
        U = "scale",
        O = "skew",
        f = "matrix";
    for (; P--;) {
        R[P] in M && (Y.support.transform = W = R[P], Y.support.transformOrigin = W + "Origin")
    }
    W || (Y.support.matrixFilter = N = "" === M.filter);
    Y.cssNumber.transform = Y.cssNumber.transformOrigin = !0;
    W && "transform" != W ? (Y.cssProps.transform = W, Y.cssProps.transformOrigin = W + "Origin", "MozTransform" == W ? T = {
        get: function(m, l) {
            return l ? Y.css(m, W).split("px").join("") : m.style[W]
        },
        set: function(m, l) {
            m.style[W] = /matrix\([^)p]*\)/.test(l) ? l.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, f + "$1$2px,$3px") : l
        }
    } : /^1\.[0-5](?:\.|$)/.test(Y.fn.jquery) && (T = {
        get: function(m, l) {
            return l ? Y.css(m, W.replace(/^ms/, "Ms")) : m.style[W]
        }
    })) : N && (T = {
        get: function(m, l, n) {
            var p = l && m.currentStyle ? m.currentStyle : m.style;
            p && t.test(p.filter) ? (l = RegExp.$1.split(","), l = [l[0].split("=")[1], l[2].split("=")[1], l[1].split("=")[1], l[3].split("=")[1]]) : l = [1, 0, 0, 1];
            Y.cssHooks.transformOrigin ? (m = Y._data(m, "transformTranslate", b), l[4] = m ? m[0] : 0, l[5] = m ? m[1] : 0) : (l[4] = p ? parseInt(p.left, 10) || 0 : 0, l[5] = p ? parseInt(p.top, 10) || 0 : 0);
            return n ? l : f + "(" + l + ")"
        },
        set: function(m, l, p) {
            var q = m.style,
                r,
                n;
            p || (q.zoom = 1);
            l = e(l);
            p = ["Matrix(M11=" + l[0], "M12=" + l[2], "M21=" + l[1], "M22=" + l[3], "SizingMethod='auto expand'"].join();
            n = (r = m.currentStyle) && r.filter || q.filter || "";
            q.filter = t.test(n) ? n.replace(t, p) : n + " progid:DXImageTransform.Microsoft." + p + ")";
            if (Y.cssHooks.transformOrigin) {
                Y.cssHooks.transformOrigin.set(m, l)
            } else {
                if (r = Y.transform.centerOrigin) {
                    q["margin" == r ? "marginLeft" : "left"] = -(m.offsetWidth / 2) + m.clientWidth / 2 + "px",
                    q["margin" == r ? "marginTop" : "top"] = -(m.offsetHeight / 2) + m.clientHeight / 2 + "px"
                }
                q.left = l[4] + "px";
                q.top = l[5] + "px"
            }
        }
    });
    T && (Y.cssHooks.transform = T);
    g = T && T.get || Y.css;
    Y.fx.step.transform = function(w) {
        var v = w.elem,
            p = w.start,
            q = w.end,
            r = w.pos,
            m = "",
            n,
            u,
            l,
            x;
        p && "string" !== typeof p || (p || (p = g(v, W)), N && (v.style.zoom = 1), q = q.split("+=").join(p), Y.extend(w, a(p, q)), p = w.start, q = w.end);
        for (n = p.length; n--;) {
            switch (u = p[n], l = q[n], x = 0, u[0]) {
            case Q:
                x = "px";
            case U:
                x || (x = "");
                m = u[0] + "(" + X.round(100000 * (u[1][0] + (l[1][0] - u[1][0]) * r)) / 100000 + x + "," + X.round(100000 * (u[1][1] + (l[1][1] - u[1][1]) * r)) / 100000 + x + ")" + m;
                break;
            case O + "X":
            case O + "Y":
            case k:
                m = u[0] + "(" + X.round(100000 * (u[1] + (l[1] - u[1]) * r)) / 100000 + "rad)" + m
            }
        }
        w.origin && (m = w.origin + m);
        T && T.set ? T.set(v, m, 1) : v.style[W] = m
    };
    Y.transform = {
        centerOrigin: "margin"
    }
})(jQuery, window, document, Math);
(function(o, n, k) {
    n = k.createElement("div").style;
    k = ["O", "ms", "Webkit", "Moz"];
    for (var m, l = k.length, j = "transform transformOrigin transformStyle perspective perspectiveOrigin backfaceVisibility".split(" "), q, p = k.length; l--;) {
        k[l] + (j[0].slice(0, 1).toUpperCase() + j[0].slice(1)) in n && (m = k[l])
    }
    if (m) {
        for (; p--;) {
            q = m + (j[p].slice(0, 1).toUpperCase() + j[p].slice(1)),
            q in n && (o.cssNumber[j[p]] = !0, o.cssProps[j[p]] = q, "MozTransform" === q && (o.cssHooks[j[p]] = {
                get: function(c, d) {
                    return d ? o.css(c, q).split("px").join("") : c.style[q]
                },
                set: function(c, d) {
                    /matrix\([^)p]*\)/.test(d) && (d = d.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, "matrix$1$2px,$3px"));
                    c.style[q] = d
                }
            }))
        }
    }
})(jQuery, window, document);

// end lib_min.js

// Iscroll lib
!function(t, i, s) {
    function e(s, e) {
        this.wrapper = "string" == typeof s ? i.querySelector(s) : s,
        this.scroller = this.wrapper.children[0],
        this.scrollerStyle = this.scroller.style,
        this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: .334,
            disablePointer: !h.hasPointer,
            disableTouch: h.hasPointer || !h.hasTouch,
            disableMouse: h.hasPointer || h.hasTouch,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0,
            bindToWrapper: "undefined" == typeof t.onmousedown
        };
        for (var o in e)
            this.options[o] = e[o];
        this.translateZ = this.options.HWCompositing && h.hasPerspective ? " translateZ(0)" : "",
        this.options.useTransition = h.hasTransition && this.options.useTransition,
        this.options.useTransform = h.hasTransform && this.options.useTransform,
        this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough,
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
        this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY,
        this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX,
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
        this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? h.ease[this.options.bounceEasing] || h.ease.circular : this.options.bounceEasing,
        this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
        this.options.tap === !0 && (this.options.tap = "tap"),
        "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1),
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
        this.x = 0,
        this.y = 0,
        this.directionX = 0,
        this.directionY = 0,
        this._events = {},
        this._init(),
        this.refresh(),
        this.scrollTo(this.options.startX, this.options.startY),
        this.enable()
    }
    function o(t, s, e) {
        var o = i.createElement("div"),
            n = i.createElement("div");
        return e === !0 && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (e === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (e === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", s || (o.style.pointerEvents = "none"), o.appendChild(n), o
    }
    function n(s, e) {
        this.wrapper = "string" == typeof e.el ? i.querySelector(e.el) : e.el,
        this.wrapperStyle = this.wrapper.style,
        this.indicator = this.wrapper.children[0],
        this.indicatorStyle = this.indicator.style,
        this.scroller = s,
        this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var o in e)
            this.options[o] = e[o];
        if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (h.addEvent(this.indicator, "touchstart", this), h.addEvent(t, "touchend", this)), this.options.disablePointer || (h.addEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.addEvent(t, h.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (h.addEvent(this.indicator, "mousedown", this), h.addEvent(t, "mouseup", this))), this.options.fade) {
            this.wrapperStyle[h.style.transform] = this.scroller.translateZ;
            var n = h.style.transitionDuration;
            this.wrapperStyle[n] = h.isBadAndroid ? "0.0001ms" : "0ms";
            var a = this;
            h.isBadAndroid && r(function() {
                "0.0001ms" === a.wrapperStyle[n] && (a.wrapperStyle[n] = "0s")
            }),
            this.wrapperStyle.opacity = "0"
        }
    }
    var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
            t.setTimeout(i, 1e3 / 60)
        },
        h = function() {
            function e(t) {
                return r === !1 ? !1 : "" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1)
            }
            var o = {},
                n = i.createElement("div").style,
                r = function() {
                    for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], s = 0, e = i.length; e > s; s++)
                        if (t = i[s] + "ransform", t in n)
                            return i[s].substr(0, i[s].length - 1);
                    return !1
                }();
            o.getTime = Date.now || function() {
                return (new Date).getTime()
            },
            o.extend = function(t, i) {
                for (var s in i)
                    t[s] = i[s]
            },
            o.addEvent = function(t, i, s, e) {
                t.addEventListener(i, s, !!e)
            },
            o.removeEvent = function(t, i, s, e) {
                t.removeEventListener(i, s, !!e)
            },
            o.prefixPointerEvent = function(i) {
                return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
            },
            o.momentum = function(t, i, e, o, n, r) {
                var h,
                    a,
                    l = t - i,
                    c = s.abs(l) / e;
                return r = void 0 === r ? 6e-4 : r, h = t + c * c / (2 * r) * (0 > l ? -1 : 1), a = c / r, o > h ? (h = n ? o - n / 2.5 * (c / 8) : o, l = s.abs(h - t), a = l / c) : h > 0 && (h = n ? n / 2.5 * (c / 8) : 0, l = s.abs(t) + h, a = l / c), {
                    destination: s.round(h),
                    duration: a
                }
            };
            var h = e("transform");
            return o.extend(o, {
                hasTransform: h !== !1,
                hasPerspective: e("perspective") in n,
                hasTouch: "ontouchstart" in t,
                hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                hasTransition: e("transition") in n
            }), o.isBadAndroid = function() {
                var i = t.navigator.appVersion;
                if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
                    var s = i.match(/Safari\/(\d+.\d)/);
                    return s && "object" == typeof s && s.length >= 2 ? parseFloat(s[1]) < 535.19 : !0
                }
                return !1
            }(), o.extend(o.style = {}, {
                transform: h,
                transitionTimingFunction: e("transitionTimingFunction"),
                transitionDuration: e("transitionDuration"),
                transitionDelay: e("transitionDelay"),
                transformOrigin: e("transformOrigin")
            }), o.hasClass = function(t, i) {
                var s = new RegExp("(^|\\s)" + i + "(\\s|$)");
                return s.test(t.className)
            }, o.addClass = function(t, i) {
                if (!o.hasClass(t, i)) {
                    var s = t.className.split(" ");
                    s.push(i),
                    t.className = s.join(" ")
                }
            }, o.removeClass = function(t, i) {
                if (o.hasClass(t, i)) {
                    var s = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                    t.className = t.className.replace(s, " ")
                }
            }, o.offset = function(t) {
                for (var i = -t.offsetLeft, s = -t.offsetTop; t = t.offsetParent;)
                    i -= t.offsetLeft,
                    s -= t.offsetTop;
                return {
                    left: i,
                    top: s
                }
            }, o.preventDefaultException = function(t, i) {
                for (var s in i)
                    if (i[s].test(t[s]))
                        return !0;
                return !1
            }, o.extend(o.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }), o.extend(o.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(t) {
                        return t * (2 - t)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(t) {
                        return s.sqrt(1 - --t * t)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(t) {
                        var i = 4;
                        return (t -= 1) * t * ((i + 1) * t + i) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(t) {
                        var i = .22,
                            e = .4;
                        return 0 === t ? 0 : 1 == t ? 1 : e * s.pow(2, -10 * t) * s.sin((t - i / 4) * (2 * s.PI) / i) + 1
                    }
                }
            }), o.tap = function(t, s) {
                var e = i.createEvent("Event");
                e.initEvent(s, !0, !0),
                e.pageX = t.pageX,
                e.pageY = t.pageY,
                t.target.dispatchEvent(e)
            }, o.click = function(t) {
                var s,
                    e = t.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(e.tagName) || (s = i.createEvent("MouseEvents"), s.initMouseEvent("click", !0, !0, t.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), s._constructed = !0, e.dispatchEvent(s))
            }, o
        }();
    e.prototype = {
        version: "5.2.0",
        _init: function() {
            this._initEvents(),
            (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
            this.options.mouseWheel && this._initWheel(),
            this.options.snap && this._initSnap(),
            this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0),
            clearTimeout(this.resizeTimeout),
            this.resizeTimeout = null,
            this._execEvent("destroy")
        },
        _transitionEnd: function(t) {
            t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(t) {
            if (1 != h.eventType[t.type]) {
                var i;
                if (i = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2, 0 !== i)
                    return
            }
            if (this.enabled && (!this.initiated || h.eventType[t.type] === this.initiated)) {
                !this.options.preventDefault || h.isBadAndroid || h.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                var e,
                    o = t.touches ? t.touches[0] : t;
                this.initiated = h.eventType[t.type],
                this.moved = !1,
                this.distX = 0,
                this.distY = 0,
                this.directionX = 0,
                this.directionY = 0,
                this.directionLocked = 0,
                this.startTime = h.getTime(),
                this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, e = this.getComputedPosition(), this._translate(s.round(e.x), s.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")),
                this.startX = this.x,
                this.startY = this.y,
                this.absStartX = this.x,
                this.absStartY = this.y,
                this.pointX = o.pageX,
                this.pointY = o.pageY,
                this._execEvent("beforeScrollStart")
            }
        },
        _move: function(t) {
            if (this.enabled && h.eventType[t.type] === this.initiated) {
                this.options.preventDefault && t.preventDefault();
                var i,
                    e,
                    o,
                    n,
                    r = t.touches ? t.touches[0] : t,
                    a = r.pageX - this.pointX,
                    l = r.pageY - this.pointY,
                    c = h.getTime();
                if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += a, this.distY += l, o = s.abs(this.distX), n = s.abs(this.distY), !(c - this.endTime > 300 && 10 > o && 10 > n)) {
                    if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough)
                            t.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough)
                            return void (this.initiated = !1);
                        l = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough)
                            t.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough)
                            return void (this.initiated = !1);
                        a = 0
                    }
                    a = this.hasHorizontalScroll ? a : 0,
                    l = this.hasVerticalScroll ? l : 0,
                    i = this.x + a,
                    e = this.y + l,
                    (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX),
                    (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + l / 3 : e > 0 ? 0 : this.maxScrollY),
                    this.directionX = a > 0 ? -1 : 0 > a ? 1 : 0,
                    this.directionY = l > 0 ? -1 : 0 > l ? 1 : 0,
                    this.moved || this._execEvent("scrollStart"),
                    this.moved = !0,
                    this._translate(i, e),
                    c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(t) {
            if (this.enabled && h.eventType[t.type] === this.initiated) {
                this.options.preventDefault && !h.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                var i,
                    e,
                    o = (t.changedTouches ? t.changedTouches[0] : t, h.getTime() - this.startTime),
                    n = s.round(this.x),
                    r = s.round(this.y),
                    a = s.abs(n - this.startX),
                    l = s.abs(r - this.startY),
                    c = 0,
                    p = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = h.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(n, r), !this.moved)
                        return this.options.tap && h.tap(t, this.options.tap), this.options.click && h.click(t), void this._execEvent("scrollCancel");
                    if (this._events.flick && 200 > o && 100 > a && 100 > l)
                        return void this._execEvent("flick");
                    if (this.options.momentum && 300 > o && (i = this.hasHorizontalScroll ? h.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                        destination: n,
                        duration: 0
                    }, e = this.hasVerticalScroll ? h.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                        destination: r,
                        duration: 0
                    }, n = i.destination, r = e.destination, c = s.max(i.duration, e.duration), this.isInTransition = 1), this.options.snap) {
                        var d = this._nearestSnap(n, r);
                        this.currentPage = d,
                        c = this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - d.x), 1e3), s.min(s.abs(r - d.y), 1e3)), 300),
                        n = d.x,
                        r = d.y,
                        this.directionX = 0,
                        this.directionY = 0,
                        p = this.options.bounceEasing
                    }
                    return n != this.x || r != this.y ? ((n > 0 || n < this.maxScrollX || r > 0 || r < this.maxScrollY) && (p = h.ease.quadratic), void this.scrollTo(n, r, c, p)) : void this._execEvent("scrollEnd")
                }
            }
        },
        _resize: function() {
            var t = this;
            clearTimeout(this.resizeTimeout),
            this.resizeTimeout = setTimeout(function() {
                t.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(t) {
            var i = this.x,
                s = this.y;
            return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? s = 0 : this.y < this.maxScrollY && (s = this.maxScrollY), i == this.x && s == this.y ? !1 : (this.scrollTo(i, s, t, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth,
            this.wrapperHeight = this.wrapper.clientHeight,
            this.scrollerWidth = this.scroller.offsetWidth,
            this.scrollerHeight = this.scroller.offsetHeight,
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
            this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth),
            this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight),
            this.endTime = 0,
            this.directionX = 0,
            this.directionY = 0,
            this.wrapperOffset = h.offset(this.wrapper),
            this._execEvent("refresh"),
            this.resetPosition()
        },
        on: function(t, i) {
            this._events[t] || (this._events[t] = []),
            this._events[t].push(i)
        },
        off: function(t, i) {
            if (this._events[t]) {
                var s = this._events[t].indexOf(i);
                s > -1 && this._events[t].splice(s, 1)
            }
        },
        _execEvent: function(t) {
            if (this._events[t]) {
                var i = 0,
                    s = this._events[t].length;
                if (s)
                    for (; s > i; i++)
                        this._events[t][i].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(t, i, s, e) {
            t = this.x + t,
            i = this.y + i,
            s = s || 0,
            this.scrollTo(t, i, s, e)
        },
        scrollTo: function(t, i, s, e) {
            e = e || h.ease.circular,
            this.isInTransition = this.options.useTransition && s > 0;
            var o = this.options.useTransition && e.style;
            !s || o ? (o && (this._transitionTimingFunction(e.style), this._transitionTime(s)), this._translate(t, i)) : this._animate(t, i, s, e.fn)
        },
        scrollToElement: function(t, i, e, o, n) {
            if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                var r = h.offset(t);
                r.left -= this.wrapperOffset.left,
                r.top -= this.wrapperOffset.top,
                e === !0 && (e = s.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                o === !0 && (o = s.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                r.left -= e || 0,
                r.top -= o || 0,
                r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left,
                r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top,
                i = void 0 === i || null === i || "auto" === i ? s.max(s.abs(this.x - r.left), s.abs(this.y - r.top)) : i,
                this.scrollTo(r.left, r.top, i, n)
            }
        },
        _transitionTime: function(t) {
            t = t || 0;
            var i = h.style.transitionDuration;
            if (this.scrollerStyle[i] = t + "ms", !t && h.isBadAndroid) {
                this.scrollerStyle[i] = "0.0001ms";
                var s = this;
                r(function() {
                    "0.0001ms" === s.scrollerStyle[i] && (s.scrollerStyle[i] = "0s")
                })
            }
            if (this.indicators)
                for (var e = this.indicators.length; e--;)
                    this.indicators[e].transitionTime(t)
        },
        _transitionTimingFunction: function(t) {
            if (this.scrollerStyle[h.style.transitionTimingFunction] = t, this.indicators)
                for (var i = this.indicators.length; i--;)
                    this.indicators[i].transitionTimingFunction(t)
        },
        _translate: function(t, i) {
            if (this.options.useTransform ? this.scrollerStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = s.round(t), i = s.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                for (var e = this.indicators.length; e--;)
                    this.indicators[e].updatePosition()
        },
        _initEvents: function(i) {
            var s = i ? h.removeEvent : h.addEvent,
                e = this.options.bindToWrapper ? this.wrapper : t;
            s(t, "orientationchange", this),
            s(t, "resize", this),
            this.options.click && s(this.wrapper, "click", this, !0),
            this.options.disableMouse || (s(this.wrapper, "mousedown", this), s(e, "mousemove", this), s(e, "mousecancel", this), s(e, "mouseup", this)),
            h.hasPointer && !this.options.disablePointer && (s(this.wrapper, h.prefixPointerEvent("pointerdown"), this), s(e, h.prefixPointerEvent("pointermove"), this), s(e, h.prefixPointerEvent("pointercancel"), this), s(e, h.prefixPointerEvent("pointerup"), this)),
            h.hasTouch && !this.options.disableTouch && (s(this.wrapper, "touchstart", this), s(e, "touchmove", this), s(e, "touchcancel", this), s(e, "touchend", this)),
            s(this.scroller, "transitionend", this),
            s(this.scroller, "webkitTransitionEnd", this),
            s(this.scroller, "oTransitionEnd", this),
            s(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var i,
                s,
                e = t.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (e = e[h.style.transform].split(")")[0].split(", "), i = +(e[12] || e[4]), s = +(e[13] || e[5])) : (i = +e.left.replace(/[^-\d.]/g, ""), s = +e.top.replace(/[^-\d.]/g, "")), {
                x: i,
                y: s
            }
        },
        _initIndicators: function() {
            function t(t) {
                if (h.indicators)
                    for (var i = h.indicators.length; i--;)
                        t.call(h.indicators[i])
            }
            var i,
                s = this.options.interactiveScrollbars,
                e = "string" != typeof this.options.scrollbars,
                r = [],
                h = this;
            this.indicators = [],
            this.options.scrollbars && (this.options.scrollY && (i = {
                el: o("v", s, this.options.scrollbars),
                interactive: s,
                defaultScrollbars: !0,
                customStyle: e,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            }, this.wrapper.appendChild(i.el), r.push(i)), this.options.scrollX && (i = {
                el: o("h", s, this.options.scrollbars),
                interactive: s,
                defaultScrollbars: !0,
                customStyle: e,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            }, this.wrapper.appendChild(i.el), r.push(i))),
            this.options.indicators && (r = r.concat(this.options.indicators));
            for (var a = r.length; a--;)
                this.indicators.push(new n(this, r[a]));
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                t(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                t(function() {
                    this.fade(1, !0)
                })
            })),
            this.on("refresh", function() {
                t(function() {
                    this.refresh()
                })
            }),
            this.on("destroy", function() {
                t(function() {
                    this.destroy()
                }),
                delete this.indicators
            })
        },
        _initWheel: function() {
            h.addEvent(this.wrapper, "wheel", this),
            h.addEvent(this.wrapper, "mousewheel", this),
            h.addEvent(this.wrapper, "DOMMouseScroll", this),
            this.on("destroy", function() {
                clearTimeout(this.wheelTimeout),
                this.wheelTimeout = null,
                h.removeEvent(this.wrapper, "wheel", this),
                h.removeEvent(this.wrapper, "mousewheel", this),
                h.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(t) {
            if (this.enabled) {
                t.preventDefault();
                var i,
                    e,
                    o,
                    n,
                    r = this;
                if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    r.options.snap || r._execEvent("scrollEnd"),
                    r.wheelTimeout = void 0
                }, 400), "deltaX" in t)
                    1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, e = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, e = -t.deltaY);
                else if ("wheelDeltaX" in t)
                    i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                    e = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in t)
                    i = e = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in t))
                        return;
                    i = e = -t.detail / 3 * this.options.mouseWheelSpeed
                }
                if (i *= this.options.invertWheelDirection, e *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = e, e = 0), this.options.snap)
                    return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : 0 > i && o++, e > 0 ? n-- : 0 > e && n++, void this.goToPage(o, n);
                o = this.x + s.round(this.hasHorizontalScroll ? i : 0),
                n = this.y + s.round(this.hasVerticalScroll ? e : 0),
                this.directionX = i > 0 ? -1 : 0 > i ? 1 : 0,
                this.directionY = e > 0 ? -1 : 0 > e ? 1 : 0,
                o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX),
                n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY),
                this.scrollTo(o, n, 0)
            }
        },
        _initSnap: function() {
            this.currentPage = {},
            "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
            this.on("refresh", function() {
                var t,
                    i,
                    e,
                    o,
                    n,
                    r,
                    h = 0,
                    a = 0,
                    l = 0,
                    c = this.options.snapStepX || this.wrapperWidth,
                    p = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0)
                        for (e = s.round(c / 2), o = s.round(p / 2); l > -this.scrollerWidth;) {
                            for (this.pages[h] = [], t = 0, n = 0; n > -this.scrollerHeight;)
                                this.pages[h][t] = {
                                    x: s.max(l, this.maxScrollX),
                                    y: s.max(n, this.maxScrollY),
                                    width: c,
                                    height: p,
                                    cx: l - e,
                                    cy: n - o
                                },
                                n -= p,
                                t++;
                            l -= c,
                            h++
                        }
                    else
                        for (r = this.options.snap, t = r.length, i = -1; t > h; h++)
                            (0 === h || r[h].offsetLeft <= r[h - 1].offsetLeft) && (a = 0, i++),
                            this.pages[a] || (this.pages[a] = []),
                            l = s.max(-r[h].offsetLeft, this.maxScrollX),
                            n = s.max(-r[h].offsetTop, this.maxScrollY),
                            e = l - s.round(r[h].offsetWidth / 2),
                            o = n - s.round(r[h].offsetHeight / 2),
                            this.pages[a][i] = {
                                x: l,
                                y: n,
                                width: r[h].offsetWidth,
                                height: r[h].offsetHeight,
                                cx: e,
                                cy: o
                            },
                            l > this.maxScrollX && a++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                    this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }),
            this.on("flick", function() {
                var t = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.x - this.startX), 1e3), s.min(s.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
            })
        },
        _nearestSnap: function(t, i) {
            if (!this.pages.length)
                return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
            var e = 0,
                o = this.pages.length,
                n = 0;
            if (s.abs(t - this.absStartX) < this.snapThresholdX && s.abs(i - this.absStartY) < this.snapThresholdY)
                return this.currentPage;
            for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); o > e; e++)
                if (t >= this.pages[e][0].cx) {
                    t = this.pages[e][0].x;
                    break
                }
            for (o = this.pages[e].length; o > n; n++)
                if (i >= this.pages[0][n].cy) {
                    i = this.pages[0][n].y;
                    break
                }
            return e == this.currentPage.pageX && (e += this.directionX, 0 > e ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), n == this.currentPage.pageY && (n += this.directionY, 0 > n ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                x: t,
                y: i,
                pageX: e,
                pageY: n
            }
        },
        goToPage: function(t, i, e, o) {
            o = o || this.options.bounceEasing,
            t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0),
            i >= this.pages[t].length ? i = this.pages[t].length - 1 : 0 > i && (i = 0);
            var n = this.pages[t][i].x,
                r = this.pages[t][i].y;
            e = void 0 === e ? this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - this.x), 1e3), s.min(s.abs(r - this.y), 1e3)), 300) : e,
            this.currentPage = {
                x: n,
                y: r,
                pageX: t,
                pageY: i
            },
            this.scrollTo(n, r, e, o)
        },
        next: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            s++,
            s >= this.pages.length && this.hasVerticalScroll && (s = 0, e++),
            this.goToPage(s, e, t, i)
        },
        prev: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            s--,
            0 > s && this.hasVerticalScroll && (s = 0, e--),
            this.goToPage(s, e, t, i)
        },
        _initKeys: function(i) {
            var s,
                e = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
            if ("object" == typeof this.options.keyBindings)
                for (s in this.options.keyBindings)
                    "string" == typeof this.options.keyBindings[s] && (this.options.keyBindings[s] = this.options.keyBindings[s].toUpperCase().charCodeAt(0));
            else
                this.options.keyBindings = {};
            for (s in e)
                this.options.keyBindings[s] = this.options.keyBindings[s] || e[s];
            h.addEvent(t, "keydown", this),
            this.on("destroy", function() {
                h.removeEvent(t, "keydown", this)
            })
        },
        _key: function(t) {
            if (this.enabled) {
                var i,
                    e = this.options.snap,
                    o = e ? this.currentPage.pageX : this.x,
                    n = e ? this.currentPage.pageY : this.y,
                    r = h.getTime(),
                    a = this.keyTime || 0,
                    l = .25;
                switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this.isInTransition = !1), this.keyAcceleration = 200 > r - a ? s.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
                case this.options.keyBindings.pageUp:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? o += e ? 1 : this.wrapperWidth : n += e ? 1 : this.wrapperHeight;
                    break;
                case this.options.keyBindings.pageDown:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= e ? 1 : this.wrapperWidth : n -= e ? 1 : this.wrapperHeight;
                    break;
                case this.options.keyBindings.end:
                    o = e ? this.pages.length - 1 : this.maxScrollX,
                    n = e ? this.pages[0].length - 1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    o = 0,
                    n = 0;
                    break;
                case this.options.keyBindings.left:
                    o += e ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.up:
                    n += e ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.right:
                    o -= e ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.down:
                    n -= e ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                default:
                    return
                }
                if (e)
                    return void this.goToPage(o, n);
                o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0),
                n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollY && (n = this.maxScrollY, this.keyAcceleration = 0),
                this.scrollTo(o, n, 0),
                this.keyTime = r
            }
        },
        _animate: function(t, i, s, e) {
            function o() {
                var d,
                    u,
                    m,
                    f = h.getTime();
                return f >= p ? (n.isAnimating = !1, n._translate(t, i), void (n.resetPosition(n.options.bounceTime) || n._execEvent("scrollEnd"))) : (f = (f - c) / s, m = e(f), d = (t - a) * m + a, u = (i - l) * m + l, n._translate(d, u), void (n.isAnimating && r(o)))
            }
            var n = this,
                a = this.x,
                l = this.y,
                c = h.getTime(),
                p = c + s;
            this.isAnimating = !0,
            o()
        },
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "pointerdown":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "pointermove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "pointerup":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "pointercancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t);
                break;
            case "orientationchange":
            case "resize":
                this._resize();
                break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(t);
                break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._wheel(t);
                break;
            case "keydown":
                this._key(t);
                break;
            case "click":
                this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
            }
        }
    },
    n.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "pointerdown":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "pointermove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "pointerup":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "pointercancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t)
            }
        },
        destroy: function() {
            this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null),
            this.options.interactive && (h.removeEvent(this.indicator, "touchstart", this), h.removeEvent(this.indicator, h.prefixPointerEvent("pointerdown"), this), h.removeEvent(this.indicator, "mousedown", this), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), h.removeEvent(t, "touchend", this), h.removeEvent(t, h.prefixPointerEvent("pointerup"), this), h.removeEvent(t, "mouseup", this)),
            this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(i) {
            var s = i.touches ? i.touches[0] : i;
            i.preventDefault(),
            i.stopPropagation(),
            this.transitionTime(),
            this.initiated = !0,
            this.moved = !1,
            this.lastPointX = s.pageX,
            this.lastPointY = s.pageY,
            this.startTime = h.getTime(),
            this.options.disableTouch || h.addEvent(t, "touchmove", this),
            this.options.disablePointer || h.addEvent(t, h.prefixPointerEvent("pointermove"), this),
            this.options.disableMouse || h.addEvent(t, "mousemove", this),
            this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(t) {
            var i,
                s,
                e,
                o,
                n = t.touches ? t.touches[0] : t;
            h.getTime();
            this.moved || this.scroller._execEvent("scrollStart"),
            this.moved = !0,
            i = n.pageX - this.lastPointX,
            this.lastPointX = n.pageX,
            s = n.pageY - this.lastPointY,
            this.lastPointY = n.pageY,
            e = this.x + i,
            o = this.y + s,
            this._pos(e, o),
            t.preventDefault(),
            t.stopPropagation()
        },
        _end: function(i) {
            if (this.initiated) {
                if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), h.removeEvent(t, "touchmove", this), h.removeEvent(t, h.prefixPointerEvent("pointermove"), this), h.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                    var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        o = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.scroller.x - e.x), 1e3), s.min(s.abs(this.scroller.y - e.y), 1e3)), 300);
                    this.scroller.x == e.x && this.scroller.y == e.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, o, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(t) {
            t = t || 0;
            var i = h.style.transitionDuration;
            if (this.indicatorStyle[i] = t + "ms", !t && h.isBadAndroid) {
                this.indicatorStyle[i] = "0.0001ms";
                var s = this;
                r(function() {
                    "0.0001ms" === s.indicatorStyle[i] && (s.indicatorStyle[i] = "0s")
                })
            }
        },
        transitionTimingFunction: function(t) {
            this.indicatorStyle[h.style.transitionTimingFunction] = t
        },
        refresh: function() {
            this.transitionTime(),
            this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
            this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (h.addClass(this.wrapper, "iScrollBothScrollbars"), h.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (h.removeClass(this.wrapper, "iScrollBothScrollbars"), h.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = s.max(s.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
            this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = s.max(s.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
            this.updatePosition()
        },
        updatePosition: function() {
            var t = this.options.listenX && s.round(this.sizeRatioX * this.scroller.x) || 0,
                i = this.options.listenY && s.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = s.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = s.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = s.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = s.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")),
            this.x = t,
            this.y = i,
            this.scroller.options.useTransform ? this.indicatorStyle[h.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
        },
        _pos: function(t, i) {
            0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX),
            0 > i ? i = 0 : i > this.maxPosY && (i = this.maxPosY),
            t = this.options.listenX ? s.round(t / this.sizeRatioX) : this.scroller.x,
            i = this.options.listenY ? s.round(i / this.sizeRatioY) : this.scroller.y,
            this.scroller.scrollTo(t, i)
        },
        fade: function(t, i) {
            if (!i || this.visible) {
                clearTimeout(this.fadeTimeout),
                this.fadeTimeout = null;
                var s = t ? 250 : 500,
                    e = t ? 0 : 300;
                t = t ? "1" : "0",
                this.wrapperStyle[h.style.transitionDuration] = s + "ms",
                this.fadeTimeout = setTimeout(function(t) {
                    this.wrapperStyle.opacity = t,
                    this.visible = +t
                }.bind(this, t), e)
            }
        }
    },
    e.utils = h,
    "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
        return e
    }) : t.IScroll = e
}(window, document, Math);
//# sourceMappingURL=./iscroll.min.js.map
// End - Iscroll

// cart.js
$(function(f) {
    window.DataLayerCartItemHandler = window.DataLayerCartItemHandler || {};
    var d = new (function() {
        function A(ab) {
            var Z,
                aa = document.createElement("p").style,
                Y = ["ms", "O", "Moz", "Webkit"];
            if (aa[ab] == "") {
                return ab
            }
            ab = ab.charAt(0).toUpperCase() + ab.slice(1);
            for (Z = Y.length; Z > -1; Z--) {
                if (aa[Y[Z] + ab] == "") {
                    return ( Y[Z] + ab)
                }
            }
        }
        var F = "/Service/cartservice.asmx/";
        var k = f(".cartBtn");
        var N = f("#masterHeadMobile .section, .cartHolder").eq(0);
        var w = f(".cart");
        var X = f('<div class="cart-overlay" />').append(w).appendTo(N);
        var n = X.find(".cart-items");
        var y = X.find(".cart-item").detach();
        var v = f('<div class="cart-pending"></div>').appendTo(X);
        var t = this;
        var J = false;
        var G = false;
        var P = [];
        var z = true;
        var x = A("transition");
        var V = null;
        if (x) {
            V = x == "transition" ? "transitionend" : x.charAt(0).toLowerCase() + x.slice(1) + "End";
            v.on(V, f.proxy(L, this))
        }
        var W = false;
        X.find(".cart-close").click(f.proxy(function(Y) {
            Y.preventDefault();
            this.showCart(false)
        }, this));
        var S = f.parseJSON(X.find(".cart").attr("data-init-cart") || "[]");
        X.find(".cart").attr("data-init-cart", null);
        k.click(f.proxy(function(Y) {
            Y.preventDefault();
            this.showCart();
            this.onRefreshCart()
        }, this));
        f("body").on("click", ".add-cart-item  .add-to-cart", f.proxy(p, this));
        function p(ag) {
            ag.preventDefault();
            var ah = f(ag.currentTarget).closest(".add-cart-item");
            var ab = ah.attr("data-pageid");
            var af = ah.attr("data-item-id");
            var Z = parseInt(ah.attr("data-maxamount"), 10) || 1;
            var Y = ah.attr("data-maxamounterror");
            var ad = parseInt(ah.find(".quantity").val(), 10) || 1;
            var aa = this.findInCart(af);
            var ac = aa != null ? parseInt(aa.Quantity, 10) : 0;
            var ae = ah.find(".error");
            if ((ad + ac) > Z) {
                ae.css({
                    visibility: "visible",
                    opacity: 0
                });
                ae.addClass("is-hidden");
                setTimeout(function() {
                    ae.animate({
                        opacity: 1
                    });
                    ae.removeClass("is-hidden")
                }, 1)
            } else {
                ae.animate({
                    opacity: 0
                });
                ae.addClass("is-hidden");
                this.addToCart(af, ab, ad, ah)
            }
            if (f(ag.currentTarget).hasClass("compare-close")) {
                f("#overlay a.close").click()
            }
        }
        function K(Y) {
            Y.preventDefault();
            var Z = f(Y.target).closest(".cart-item");
            this.removeFromCart(Z)
        }
        var H = f.proxy(K, this);
        function E(aa, Y, ab, Z) {
            if (aa && aa.d && aa.d.MessageStatus && aa.d.MessageStatus.IsSuccess) {
                if (aa.d.CartDataLayer.AddToCart) {
                    window.UpdateCartToDataLayer(aa.d.CartDataLayer.AddToCart)
                }
                o(aa.d.CartContent);
                this.showCart(true);
                window.DataLayerCartItemHandler(CartAction.UPDATE)
            } else {
                C("dataError", null, aa)
            }
            i(Z)
        }
        function m(aa, ab, Z, Y) {
            C("requestFailed", Z);
            q(false);
            i(Y)
        }
        function i(Y) {
            G = false;
            if (Y) {
                Y.removeClass("cart-pending-current")
            }
            O()
        }
        function C(aa, Y, Z) {
            alert("Unable to complete your request, please check your internet connection.")
        }
        var u = f.proxy(E, this);
        var l = f.proxy(m, this);
        this.addToCart = function(ac, Y, ab, Z) {
            q(true, Z);
            var aa = {
                productCode: ac,
                pageid: Y,
                quantity: ab,
                antiForgery: false
            };
            R(F + "AddToCart", aa, Z)
        };
        this.findInCart = function(Z) {
            for (var Y = 0; Y < S.length; Y++) {
                if (S[Y].SKU == Z) {
                    return S[Y]
                }
            }
            return null
        };
        this.removeFromCart = function(Y) {
            var ab = Y.data("item-id");
            var Z = this.findInCart(ab);
            if (Z) {
                q(true);
                var aa = {
                    productCode: ab,
                    pageid: Z.PageId,
                    antiForgery: true
                };
                R(F + "RemoveFromBasket", aa, window.DataLayerCartItemHandler(CartAction.REMOVE, Y))
            }
        };
        function R(Y, aa, Z, ab) {
            P.push({
                url: Y,
                data: aa,
                element: Z
            });
            O(ab)
        }
        function O(ab) {
            if (!G && P.length > 0) {
                var Z = P.shift();
                var Y = Z.url;
                var aa = Z.data;
                G = true;
                q(true);
                f.ajax(Y, {
                    data: JSON.stringify(aa),
                    dataType: "json",
                    type: "POST",
                    beforeSend: B,
                    complete: I,
                    contentType: "application/json; charset=utf-8"
                }).done(function(ad, ac, ae) {
                    u(ad, ac, ae, Z.element);
                    if (ab) {
                        ab()
                    }
                }).fail(function(ad, ae, ac) {
                    l(ad, ae, ac, Z.element)
                })
            }
        }
        function s(Y) {
            if (Y.keyCode === 27) {
                t.showCart(false)
            }
        }
        this.onRefreshCart = function() {
            if (!W || !z) {
                return
            }
            if (!X.find(".cart-items-wrapper").hasClass("cart-refreshing")) {
                X.find(".cart-items-wrapper").addClass("cart-refreshing")
            }
            f.ajax(F + "GetMiniCart", {
                data: null,
                dataType: "json",
                type: "POST",
                beforeSend: B,
                complete: I,
                contentType: "application/json; charset=utf-8"
            }).done(function(Z, Y, aa) {
                o(Z.d, true);
                X.find(".cart-items-wrapper").removeClass("cart-refreshing");
                z = false
            }).fail(function(Z, aa, Y) {
                X.find(".cart-items-wrapper").removeClass("cart-refreshing")
            })
        };
        this.showCart = function(Y) {
            if (typeof (Y) === "undefined") {
                Y = !W
            }
            if (Y != W) {
                if (Y) {
                    X.stop(true).css({
                        display: "block",
                        opacity: 0
                    }).animate({
                        opacity: 1
                    });
                    f("body").append('<div class="cart-overlay__mask"></div>');
                    f(window).on("keypress keydown keyup", s)
                } else {
                    X.stop(true).animate({
                        opacity: 0
                    }, {
                        complete: function() {
                            X.css("display", "none")
                        }
                    });
                    f(".cart-overlay__mask").remove();
                    f(window).off("keypress keydown keyup", s)
                }
                W = Y
            }
        };
        var o = f.proxy(function(ac, Y) {
            if (!ac) {
                return
            }
            q(P.length != 0);
            n.empty();
            var aa = [];
            var Z = [];
            var af;
            var ae;
            var ad = ac.LineItems || [];
            var ag = [];
            if (ac.DataLayer) {
                ag = JSON.parse(ac.DataLayer)
            }
            for (var ab = 0; ab < ad.length; ab++) {
                af = ad[ab];
                ae = this.findInCart(af.SKU);
                if (Y || ae) {
                    Z.push(af)
                } else {
                    aa.push(af)
                }
            }
            for (ab = 0; ab < aa.length; ab++) {
                D(aa[ab], true, ag)
            }
            for (ab = 0; ab < Z.length; ab++) {
                D(Z[ab], false, ag)
            }
            S = ad;
            M(ac.TotalItemsQuantity || 0);
            X.find(".cart-subtotal-amount").text((ac.FormattedTotalPrice || 0) + "");
            X.find(".cart-num-items-amount").text((ac.TotalItemsQuantity || 0) + "")
        }, this);
        function q(Y, Z) {
            J = Y;
            if (Y) {
                X.addClass("cart-pending");
                v.addClass("cart-show");
                f(".add-cart-item").addClass("cart-pending");
                if (Z) {
                    Z.addClass("cart-pending-current")
                }
            } else {
                X.removeClass("cart-pending");
                v.addClass("cart-hide");
                f(".add-cart-item").removeClass("cart-pending");
                L()
            }
        }
        function L(Y) {
            if ((!Y || Y.originalEvent.propertyName == "opacity") && (!x || v.css("opacity") == 0)) {
                v.removeClass("cart-show cart-hide")
            }
        }
        function M(Y) {
            var Z = k.closest(".cartBtnHolder");
            0 < Y ? Z.removeClass("no-item") : Z.addClass("no-item");
            k.find(".cartBtn-number-of-items").text(Y + "")
        }
        function U(Z, Y) {
            Y.attr("data-item-name", Z.name);
            Y.attr("data-item-price", Z.price);
            Y.attr("data-item-category", Z.category);
            Y.attr("data-item-variant", Z.variant);
            Y.attr("data-item-dimension4", Z.dimension4);
            Y.attr("data-item-dimension5", Z.dimension5)
        }
        function j(Y, Z) {
            return Y.filter(function(aa) {
                return aa.id === Z
            })
        }
        function D(ac, Y, Z) {
            var aa = y.clone();
            aa.attr("data-item-id", ac.SKU);
            aa.attr("data-item-qty", ac.Quantity);
            if (Z) {
                var ab = j(Z, ac.SKU);
                if (ab && ab.length > 0) {
                    U(ab.shift(), aa)
                }
            }
            if (Y) {
                aa.addClass("cart-item-changed")
            }
            aa.find(".cart-name").text(ac.Title);
            aa.find(".cart-name").attr("href", ac.Url);
            aa.find("img").attr("src", ac.Image).attr("alt", ac.ImageAlt);
            aa.find(".cart-price").text(ac.FormattedSubTotalPrice);
            aa.find(".cart-qty").text(ac.Quantity + "");
            aa.find(".cart-remove").click(H);
            if (ac.Warning) {
                aa.find(".basket-warning").html(ac.Warning)
            } else {
                aa.find(".basket-warning").hide()
            }
            n.append(aa)
        }
        var r = "tokenKey";
        function B(aa, Z) {
            if (Z.data) {
                var Y = f.parseJSON(Z.data);
                if (Y.antiForgery) {
                    f.cookies.del(r);
                    f.cookies.set(r, T())
                }
            }
        }
        function I(aa) {
            var Y = {};
            try {
                Y = JSON.parse(aa.responseText)
            } catch (Z) {}
            if (Y.d && Y.d.MessageStatus && Y.d.MessageStatus.TokenKey) {
                Q(Y.d.MessageStatus.TokenKey);
                f.cookies.del(r)
            }
        }
        function Q(Y) {
            if (Y) {
                f("input.tokenKey").val(Y)
            }
        }
        function T() {
            return f("input.tokenKey").val()
        }
        o(S, true)
    })();
    f(".hideUpdate .quantity-field").on("change keypress", function(i) {
        f(this).closest("td").addClass("showUpdate")
    });
    f(".input-numeric").on("keydown", function(i) {
        if (!(i.which == 0 || i.which == 8 || i.which == 9 || i.which == 37 || i.which == 39 || i.which == 46 || (i.which >= 48 && i.which <= 57) || (i.which >= 96 && i.which <= 105))) {
            i.preventDefault()
        }
    }).on("input change paste", function(j) {
        var i = f(this).val();
        var k = i.replace(/[^0-9]/g, "");
        if (i != k) {
            f(this).val(k)
        }
    });
    var a = !!("ontouchstart" in window || navigator.msMaxTouchPoints);
    var h = [];
    var c = false;
    function b() {
        f(".add-iscroll").each(function() {
            var i = new iScroll(this, {
                hideScrollbar: false,
                bounce: false,
                onBeforeScrollStart: function(m) {
                    var l = m.target;
                    while (l.nodeType != 1) {
                        l = l.parentNode
                    }
                    var k = l.tagName.toUpperCase();
                    if (k == "INPUT") {
                        var j = f(l);
                        if (j.attr("type") == "checkbox") {
                            j.attr("checked", !j.attr("checked"))
                        }
                    }
                    m.preventDefault()
                }
            });
            i.__elem = f(this).children();
            i.__elemH = i.__elem.height();
            h.push(i);
            f(this).addClass("iscrolled").mousewheel(function(l, o, k, j) {
                l.preventDefault();
                var n = 0;
                var m = i.y + j * 120;
                m = Math.min(0, Math.max(i.maxScrollY, m));
                i.scrollTo(n, m, 400, false)
            })
        });
        c = setInterval(g, 1000)
    }
    function e() {
        if (c !== false) {
            clearInterval(c);
            c = false
        }
        for (var j = 0; j < h.length; j++) {
            h[j].__elem.parent().removeClass("iscrolled").unmousewheel();
            h[j].__elemH = h[j].__elem = null;
            h[j].destroy();
            h[j] = null
        }
        h.length = 0
    }
    function g() {
        for (var k = 0; k < h.length; k++) {
            var j = h[k].__elem.height();
            if (h[k].__elemH != j) {
                h[k].refresh();
                h[k].__elemH = j
            }
        }
    }
    if (a) {
        f(window).on("breakpoint", function(i, j) {
            if (j.oldBreakpoint == "desktop") {
                b()
            } else {
                if (j.newBreakpoint == "desktop") {
                    e()
                }
            }
        })
    }
});
// end cart.js

// lib2_min.js

(function() {
    var a = 640 < $(window).width();
    $(".ncj-megaslides.mobile, .ncj-megaslides.not-mobile").each(function() {
        $this = $(this);
        a != $this.hasClass("not-mobile") && $this.remove()
    })
})();
$(function(a) {
    function i() {
        var b = [];
        a(".ncj-megaslides.mobile, .ncj-megaslides.not-mobile").each(function() {
            b.push(a(this).widget(Netcel.MegaSlides))
        });
        Netcel.removeEventListener("inited", i);
        Netcel.MegaSlides.__init__(a);
        a(".ncj-megaslides-slides > .clone .ncj-megaslides").each(function() {
            var e = a(this),
                g = "#" + e.closest(".ncj-megaslides-slides-slide").attr("data-cloneof") + " .ncj-megaslides",
                g = a(g).widget(Netcel.MegaSlides),
                f = e.widget(Netcel.MegaSlides);
            f.set_paused(!0);
            g.addEventListener("changeFrame", function(k) {
                f.set_frame(k.newFrame, k.instant)
            })
        });
        a(".ncj-megaslides-slides >:not( .clone ) .ncj-megaslides").each(function() {
            var f = a(this),
                l = f.parent().closest(".ncj-megaslides.ncj-widget-active").widget(Netcel.MegaSlides),
                k = f.widget(Netcel.MegaSlides),
                g = f.closest(".ncj-megaslides-slides-slide");
            g.is(".ncj-megaslides-active-frame") || k.set_paused(!0);
            l.addEventListener("changeFrame", function(e) {
                k.set_paused(!0)
            });
            l.addEventListener("changedFrame", function(e) {
                k.set_paused(!g.hasClass("ncj-megaslides-active-frame"))
            });
            k.addEventListener("pause", function(e) {
                "mediaOverlay" == e.by && l.set_paused(e.value, "child-mediaOverlay")
            })
        });
        a(".ncj-megaslides").has(".triggerMediaOverlay").each(function() {
            var g = a('<div class="mediaOverlay"><div class="fade"></div><a href="#" class="close">X</a><div class="content"></div></div>').appendTo(c),
                n = new MediaOverlay(g, k),
                m = a(this),
                l = m.hasClass("mobile"),
                k = m.widget(Netcel.MegaSlides);
            m.find(">div>ul>li.slide:not(.clone)").filter(":not(:has( .ncj-megaslides ))").has(".triggerMediaOverlay").each(function() {
                var e = a(this),
                    o;
                if (!l && e.has(".triggerMediaOverlay.innerMediaOverlay")) {
                    var f = a('<div class="mediaOverlay"><div class="fade"></div><a href="#" class="close">X</a><div class="content"></div></div>').addClass("innerMediaOverlay");
                    e.attr("data-holder-class") ? e.closest("." + e.attr("data-holder-class")).append(f) : m.is(":has(.fade-slides)") ? m.append(f) : e.append(f);
                    o = new MediaOverlay(f, k)
                }
                e.find(".triggerMediaOverlay").click(function(p) {
                    p.preventDefault();
                    p.stopImmediatePropagation();
                    !l && a(this).hasClass("innerMediaOverlay") && 640 <= a(window).width() ? o.show(this.href) : n.show(this.href)
                })
            })
        })
    }
    function h(e) {
        var b = a(this);
        if ("touchstart" == e.type) {
            b.data("isTouch", !0)
        } else {
            if (b.data("isTouch")) {
                return
            }
        }
        b.hasClass(j) || (b.data("marginTop") || b.data("marginTop", b.css("marginTop")), b.addClass(j).animate({
            marginTop: -Math.min(b.closest(".overlay-holder").height(), b.outerHeight())
        }, {
            queue: !1,
            complete: function() {
                b.find("a:not(h3 a)").each(function() {
                    a(this).keyboardDisable(!1)
                })
            }
        }))
    }
    function d(e) {
        var b = a(this);
        b.data("isTouch") && "mouseleave" == e.type || b.hasClass(j) && b.removeClass(j).find("a:not(h3 a)").each(function() {
            a(this).keyboardDisable(!0)
        }).end().stop(!0).animate({
            marginTop: b.data("marginTop")
        }, {
            queue: !1,
            complete: function() {
                b.data("isTouch", !1)
            }
        })
    }
    var c = a("body");
    Netcel.inited ? i() : Netcel.addEventListener("inited", i);
    carouselInitialized.emit('CarouselInitialized', '.ncj-megaslides');
    var j = "_nc_open";
    a.fn.tap = function(e) {
        this.on("touchstart", function(b) {
            e.apply(this, [b])
        });
        return this
    };
    a(".slide-overlay").filter(":not(.opened)").hover(function(e) {
        var f = this;
        setTimeout(function() {
            h.apply(f, [e])
        }, 1)
    }, d).focusin(h).focusout(d).find("h3").tap(function(e) {
        var b = a(this).parent();
        b.hasClass(j) ? d.apply(b[0], [e]) : h.apply(b[0], [e]);
        e.preventDefault()
    }).find("a").click(function() {
        return !1
    }).css("cursor", "default").find(".icon").css("cursor", "default").end().end().end().find("a:not(h3 a)").each(function() {
        a(this).keyboardDisable(!0)
    }).end().end();
    a(".slide-overlay.opened").each(function() {
        a(this).css("margin-top", -a(this).outerHeight())
    });
    a(".slide-news-links .showHideBtn").on("touchstart click", function(e) {
        var b = a(this).closest(".slide-news-links-wrapper");
        b.hasClass("opened") ? b.stop(!0).animate({
            left: "73.7704918%"
        }).removeClass("opened") : b.stop(!0).animate({
            left: "10%"
        }).addClass("opened");
        e.preventDefault()
    })
});
function setupMultiMedia(B) {
    if (window.multiMediaData) {
        var z = [],
            E = window.multiMediaData,
            y = [],
            C,
            x,
            D,
            w = null;
        B.find(".imgPictureDisplay");
        var G = B.find(".videoIframe").attr("src"),
            F = B.find(".videoIframe").clone(),
            A,
            j = B.find(".controls.prev"),
            i = B.find(".controls.next");
        if (E.HasPictures) {
            for (C = 0, x = E.Pictures.length; C < x; C++) {
                D = E.Pictures[C],
                D = {
                    id: D.ID,
                    type: "image",
                    url: D.URL
                },
                y.push(D.id),
                z.push(D)
            }
        }
        if (E.HasVideos) {
            for (C = 0, x = E.Videos.length; C < x; C++) {
                D = E.Videos[C],
                D = {
                    id: D.ID,
                    type: "video",
                    videoType: "YOUTUBE" == D.Type ? "YOUTUBE" : "OTHER_VIDEO",
                    url: D.URL
                },
                y.push(D.id),
                z.push(D)
            }
        }
        if (E.HasProduct360) {
            for (C = 0, x = E.Product360URLs.length; C < x; C++) {
                D = E.Product360URLs[C],
                D = {
                    id: D.ID,
                    type: "spinner",
                    path: D.Path,
                    swfUrl: D.URL
                },
                y.push(D.id),
                z.push(D)
            }
        }
        var o = function(f) {
                if (f != w) {
                    v.element.find("li").removeClass("selected").filter('[data-media-id="' + f.id + '"]').addClass("selected");
                    var h = B.find(".galleryContentWrapper"),
                        g = h.find(".galleryWrapper"),
                        e = function() {
                            a();
                            g.css("display", "none");
                            h.removeClass("active-image active-video active-spinner").addClass("active-" + f.type);
                            switch (f.type) {
                            case "image":
                                var c = $('<div class="ncj-imagezoom"><div class="ncj-imagezoom-holder"><img src="' + f.url + '" alt="" /></div></div>').appendTo(B.find(".imageWrapperInner"));
                                A = new Netcel.ImageZoom($, c, {
                                    overview: !1
                                });
                                break;
                            case "video":
                                B.find(".videoIframe").attr("src", f.url);
                                break;
                            case "spinner":
                                if ($("#spinnerSwfContainer").empty(), $("#spinnerHtmlContainer").empty(), swfobject.hasFlashPlayerVersion("8")) {
                                    var c = {
                                            data: f.swfUrl,
                                            width: "100%",
                                            height: "100%",
                                            wmode: "opaque"
                                        },
                                        d = "spinnerSwfContainer";
                                    $.browser && $.browser.msie && 7 == $.browser.version.split(".")[0] && ($("#" + d).append($('<div id="spinnerSwfContainerContainer" />')), d = "spinnerSwfContainerContainer");
                                    swfobject.createSWF(c, {
                                        menu: "false",
                                        wmode: "opaque"
                                    }, d)
                                }
                            }
                            g.filter("." + f.type + "Wrapper").css({
                                display: ""
                            });
                            h.stop(!0).animate({
                                opacity: 1
                            }, {
                                duration: 400
                            })
                        };
                    null != w ? h.stop(!0).animate({
                        opacity: 0
                    }, {
                        duration: 400,
                        complete: e
                    }) : e(!0);
                    w = f;
                    e = $.inArray(w.id, y);
                    0 == e ? j.addClass("disabled") : j.removeClass("disabled");
                    e + 1 == z.length ? i.addClass("disabled") : i.removeClass("disabled");
                    v.set_index(v.getIndexPageIndex(e))
                }
            },
            a = function(b) {
                B.find(".imageWrapperInner").empty();
                B.find("iframe").attr("src", G);
                B.find(".videoIframe").parent().append(F.clone()).end().remove();
                A && (A.set_frameRate(0), A = null)
            },
            H = function(b) {
                b = $.inArray(b, y);
                return -1 == b ? null : z[b]
            };
        B.find(".imageWrapper");
        E = B.find(".zoomControls");
        E.find("[data-action]").on("mousedown touchstart", function(b) {
            if (null != A) {
                switch (b.preventDefault(), $(this).attr("data-action")) {
                case "zoomIn":
                    A._onZoomInStart(b);
                    break;
                case "zoomOut":
                    A._onZoomOutStart(b);
                    break;
                case "moveUp":
                    A._onUpStart(b);
                    break;
                case "moveRight":
                    A._onRightStart(b);
                    break;
                case "moveDown":
                    A._onDownStart(b);
                    break;
                case "moveLeft":
                    A._onLeftStart(b)
                }
            }
        });
        E.find(".reset").click(function(b) {
            b.preventDefault();
            null != A && A.set_scale(1)
        });
        E = H(B.find(".multimediaGallerySlider li.selected").attr("data-media-id"));
        B.on("dispose", a);
        C = B.find(".ncj-simpleslider");
        var v = C.hasClass("ncj-widget-active") ? C.widget(Netcel.SimpleSlider) : new Netcel.SimpleSlider($, C, {
            initIndex: $.inArray(E.id, y)
        });
        v.element.find("li a").click(function(b) {
            b.preventDefault();
            b = $(this).parent();
            o(H(b.attr("data-media-id")))
        });
        j.click(function(b) {
            b.preventDefault();
            b = $.inArray(w.id, y);
            0 < b && (b--, o(-1 == b ? null : z[b]))
        });
        i.click(function(b) {
            b.preventDefault();
            b = $.inArray(w.id, y);
            b + 1 < z.length && (b++, o(-1 == b ? null : z[b]))
        });
        o(E);
        GoogleEventTracking.multimediamodule.setup()
    }
}
$(function(a) {
    function h(x) {
        var v = a(this),
            r = v.data("hoverZoomImage"),
            u = v.data("hoverZoomHolder"),
            q = v.data("hoverZoomIndicator"),
            w = r.offset();
        if (x.pageX < w.left || x.pageY < w.top || x.pageX > w.left + r.width() || x.pageY > w.top + r.height()) {
            u.hide(),
            q.hide()
        } else {
            u.show();
            q.show();
            v.data("zoomMousePosition", {
                x: x.pageX,
                y: x.pageY
            });
            var o = v.data("hoverZoomImage"),
                u = v.data("hoverZoomHolder"),
                r = v.data("hoverZoomIndicator");
            x = v.data("hoverZoomHolderImage");
            var v = v.data("zoomMousePosition"),
                t = u.width(),
                s = u.height(),
                u = o.width(),
                b = o.height(),
                q = x.width(),
                w = x.height(),
                j = o.offset(),
                o = o.offsetParent().offset(),
                i = u / q,
                t = Math.round(i * t),
                s = Math.round(i * s);
            r.css({
                width: t + "px",
                height: s + "px",
                left: Math.floor(v.x - o.left - t / 2) + "px",
                top: Math.floor(v.y - o.top - s / 2) + "px"
            });
            r = (v.y - s / 2 - j.top) / b;
            r = {
                left: Math.round(-((v.x - t / 2 - j.left) / u * q)) + "px",
                top: Math.round(-(r * w)) + "px"
            };
            x.css(r)
        }
    }
    if (0 != a(".hoverZoom").length) {
        var e = 0,
            d = !1;
        a(".hoverZoom").on("touchstart touchend touchmove", function(b) {
            e = b.originalEvent.touches.length
        }).on("touchstart", function() {
            d = !0;
            a(this).trigger("mouseleave")
        }).mouseenter(function(b) {
            if (!(0 < e.length)) {
                if (d) {
                    d = !1
                } else {
                    a(this).on("mousemove", h)
                }
            }
        }).mouseleave(function(b) {
            b = a(this);
            b.off("mousemove", h);
            b.data("hoverZoomIndicator").hide();
            b.data("hoverZoomHolder").hide()
        }).each(function() {
            var b = a(this);
            0 == b.find(".hoverZoomIndicator").length && b.append('<div class="hoverZoomIndicator"></div>');
            0 == b.find(".hoverZoomHolder").length && b.append('<div class="hoverZoomHolder"></div>');
            b.find(".hoverZoomHolder").append(b.find(".hoverZoomImage").clone().addClass("hoverZoomImageClone").removeClass("hoverZoomImage").css({
                width: "auto",
                height: "auto"
            }));
            b.data("hoverZoomImage", b.find(".hoverZoomImage")).data("hoverZoomIndicator", b.find(".hoverZoomIndicator")).data("hoverZoomHolder", b.find(".hoverZoomHolder")).data("hoverZoomHolderImage", b.find(".hoverZoomImageClone"));
            b.find(".hoverZoomImage").data("hoverZoomHolderImage", b.find(".hoverZoomImageClone"))
        });
        a(window).on("set-product-image", function(b, j) {
            a(".heroImg .hoverZoomImage").attr("src", j.src).attr("alt", j.alt).data("hoverZoomHolderImage").attr("src", j.src);
            var k = a(".heroImg .hoverZoomImage").closest(".triggerOverlay").parent().children("input"),
                i = a('<a href="" />').attr("href", k.val())[0],
                g = a.decodeQuery(i.search);
            g.elementid = j.index;
            g.tab = "picture";
            i.search = "?" + a.param(g);
            k.val(i.href)
        });
        a.decodeQuery()
    }
});
jQuery(function(d) {
    var j,
        i,
        h = null;
    d(window).on("breakpoint", function(b, f) {
        var g = "mobile" != f.newBreakpoint;
        if (g !== h) {
            j = j || d(".mediaGalleryCarousel .ncj-simpleslider ").widget(Netcel.SimpleSlider);
            var c = g ? "vertical" : "horizontal";
            j ? j.set_mode(c) : i || (i = c, Netcel.addEventListener("inited", function() {
                j = j || d(".mediaGalleryCarousel .ncj-simpleslider").widget(Netcel.SimpleSlider);
                j.set_mode(i)
            }));
            h = g
        }
    });
    d(".mediaGalleryCarousel .ncj-simpleslider.ncj-widget-active li.imageItem a").click(function(b) {
        b.preventDefault();
        b.stopPropagation();
        b = d(this);
        b.closest(".ncj-simpleslider").find(".selected").removeClass("selected");
        b.parent().addClass("selected");
        d(window).trigger("set-product-image", {
            src: b.attr("data-img-src"),
            alt: b.attr("alt"),
            index: b.parent().attr("data-index")
        })
    });
    if (d("html").hasClass("ie7")) {
        var e = d(".largeHero .ncj-simpleslider.multimediaGallerySlider");
        e.height(e.parent().height())
    }
});

//FileValidation.js

(function(b) {
    b.fileValidator = function(d) {
        var f = [];
        var g = d.onInvalid;
        for (var e in b.fileValidator.validations) {
            if (!d[e]) {
                continue
            }
            f.push(b.fileValidator.validations[e](d[e], g))
        }
        return function(k) {
            for (var j = 0, h = f.length; j < h; j++) {
                f[j].call(this, k)
            }
        }
    };
    b.fileValidator.validations = {
        maxSize: function(e, d) {
            if (typeof e == "string") {
                e = b.fileValidator.sizeToBytes(e)
            }
            return function(f) {
                if (f.size > e) {
                    d.call(this, "maxSize", f)
                }
            }
        },
        type: function(f, d) {
            var e;
            if (typeof f == "function") {
                e = f
            } else {
                if (f.constructor === RegExp) {
                    e = function(g) {
                        return g.match(f)
                    }
                } else {
                    e = function(j) {
                        var k = false;
                        var i = f.split("|");
                        for (var g = 0; g < i.length; ++g) {
                            var h = i[g];
                            k = ~j.indexOf(h);
                            if (k) {
                                break
                            }
                        }
                        return k
                    }
                }
            }
            return function(g) {
                if (!e(g.type)) {
                    d.call(this, "type", g)
                }
            }
        }
    };
    b.fn.fileValidator = function(e) {
        var d = b.extend({
            maxSize: null,
            type: null,
            onValidation: b.fileValidator.doNothing,
            onInvalid: b.fileValidator.doNothing
        }, e);
        return this.each(function() {
            var g = b(this);
            var f = b.fileValidator(b.extend({}, d, g.data()));
            g.bind("change", function(l) {
                var k = this.files || [];
                d.onValidation.call(this, k);
                for (var j = 0, h = k.length; j < h; j++) {
                    f.call(this, k[j])
                }
            })
        })
    };
    b.fileValidator.doNothing = function a() {};
    b.fileValidator.sizeToBytes = function c(d) {
        var e = 1;
        if (~d.indexOf("k")) {
            e = 1024
        } else {
            if (~d.indexOf("m")) {
                e = 1024 * 1024
            } else {
                if (~d.indexOf("g")) {
                    e = 1024 * 1024 * 1024
                }
            }
        }
        return parseInt(d, 10) * e
    }
})(jQuery);
$(document).ready(function() {
    $("input[type=file]").fileValidator({
        onValidation: function(a) {
            $(this).attr("class", "input-file");
            $("span#fileUploadValidator").hide()
        },
        onInvalid: function(b, a) {
            $(this).addClass("file-error")
        }
    })
});

//menuAim
(function(e, c, a, g) {
    var d = "menuAim",
        f = {
            triggerEvent: "hover",
            rowSelector: "> li",
            handle: "> a",
            submenuSelector: "*",
            submenuDirection: "right",
            openClassName: "open",
            tolerance: 75,
            activationDelay: 300,
            mouseLocsTracked: 3,
            defaultDelay: 300,
            enterCallback: e.noop,
            activateCallback: e.noop,
            deactivateCallback: e.noop,
            exitCallback: e.noop,
            exitMenuCallback: e.noop
        };
    function b(i, h) {
        this.el = i;
        this.options = e.extend({}, f, h);
        this._defaults = f;
        this._name = d;
        this.init()
    }
    b.prototype = {
        init: function() {
            this.activeRow = null,
            this.mouseLocs = [],
            this.lastDelayLoc = null,
            this.timeoutId = null,
            this.openDelayId = null,
            this.isOnClick = e.inArray(this.options.triggerEvent, ["both", "click"]) > -1,
            this.isOnHover = e.inArray(this.options.triggerEvent, ["both", "hover"]) > -1;
            if (this.isOnHover) {
                this._hoverTriggerOn()
            }
            if (this.isOnClick) {
                this._clickTriggerOn()
            }
        },
        _mouseMoveDocument: function(h) {
            obj = h.data.obj;
            obj.mouseLocs.push({
                x: h.pageX,
                y: h.pageY
            });
            if (obj.mouseLocs.length > obj.options.mouseLocsTracked) {
                obj.mouseLocs.shift()
            }
        },
        _mouseLeaveMenu: function(h) {
            obj = h.data.obj;
            if (obj.timeoutId) {
                clearTimeout(obj.timeoutId)
            }
            if (obj.openDelayId) {
                clearTimeout(obj.openDelayId)
            }
            obj._possiblyDeactivate(obj.activeRow);
            obj.options.exitMenuCallback(this)
        },
        _mouseEnterRow: function(h) {
            obj = h.data.obj;
            if (obj.timeoutId) {
                clearTimeout(obj.timeoutId)
            }
            obj.options.enterCallback(this);
            obj._possiblyActivate(this)
        },
        _mouseLeaveRow: function(h) {
            h.data.obj.options.exitCallback(this)
        },
        _clickRow: function(h) {
            obj = h.data.obj;
            obj._activate(this);
            e(obj.el).find(obj.options.rowSelector).find(obj.options.handle).on("click", {
                obj: obj
            }, obj._clickRowHandle)
        },
        _clickRowHandle: function(h) {
            obj = h.data.obj;
            if (e(this).closest("li").hasClass(obj.options.openClassName)) {
                obj._deactivate();
                h.stopPropagation()
            }
        },
        _activate: function(i) {
            var h = this;
            if (i == this.activeRow) {
                return
            }
            if (this.openDelayId) {
                clearTimeout(this.openDelayId)
            }
            if (parseInt(h.options.activationDelay, 0) > 0 && h.isOnHover) {
                if (h.activeRow) {
                    h._activateWithoutDelay(i)
                } else {
                    this.openDelayId = setTimeout(function() {
                        h._activateWithoutDelay(i)
                    }, h.options.activationDelay)
                }
            } else {
                h._activateWithoutDelay(i)
            }
        },
        _activateWithoutDelay: function(h) {
            if (this.activeRow) {
                this.options.deactivateCallback(this.activeRow)
            }
            this.options.activateCallback(h);
            this.activeRow = h
        },
        _deactivate: function() {
            if (this.openDelayId) {
                clearTimeout(this.openDelayId)
            }
            if (this.activeRow) {
                this.options.deactivateCallback(this.activeRow);
                this.activeRow = null
            }
        },
        _possiblyActivate: function(j) {
            var h = this._activationDelay(),
                i = this;
            if (h) {
                this.timeoutId = setTimeout(function() {
                    i._possiblyActivate(j)
                }, h)
            } else {
                this._activate(j)
            }
        },
        _possiblyDeactivate: function(j) {
            var h = this._activationDelay(),
                i = this;
            if (h) {
                this.timeoutId = setTimeout(function() {
                    i._possiblyDeactivate(j)
                }, h)
            } else {
                this.options.deactivateCallback(j);
                this.activeRow = null
            }
        },
        _activationDelay: function() {
            if (!this.activeRow || !e(this.activeRow).is(this.options.submenuSelector)) {
                return 0
            }
            var l = e(this.el).offset(),
                h = {
                    x: l.left,
                    y: l.top - this.options.tolerance
                },
                s = {
                    x: l.left + e(this.el).outerWidth(),
                    y: h.y
                },
                u = {
                    x: l.left,
                    y: l.top + e(this.el).outerHeight() + this.options.tolerance
                },
                m = {
                    x: l.left + e(this.el).outerWidth(),
                    y: u.y
                },
                n = this.mouseLocs[this.mouseLocs.length - 1],
                r = this.mouseLocs[0];
            if (!n) {
                return 0
            }
            if (!r) {
                r = n
            }
            if (r.x < l.left || r.x > m.x || r.y < l.top || r.y > m.y) {
                return 0
            }
            if (this.lastDelayLoc && n.x == this.lastDelayLoc.x && n.y == this.lastDelayLoc.y) {
                return 0
            }
            function o(w, v) {
                return (v.y - w.y) / (v.x - w.x)
            }
            var q = s,
                i = m;
            if (this.options.submenuDirection == "left") {
                q = u;
                i = h
            } else {
                if (this.options.submenuDirection == "below") {
                    q = m;
                    i = u
                } else {
                    if (this.options.submenuDirection == "above") {
                        q = h;
                        i = s
                    }
                }
            }
            var j = o(n, q),
                p = o(n, i),
                t = o(r, q),
                k = o(r, i);
            if (j < t && p > k) {
                this.lastDelayLoc = n;
                return this.options.defaultDelay
            }
            this.lastDelayLoc = null;
            return 0
        },
        _outsideMenuClick: function(i) {
            var h = i.data.obj;
            if (e(h.el).not(i.target) && e(h.el).has(i.target).length === 0) {
                h.options.deactivateCallback(h.activeRow);
                h.activeRow = null
            }
        },
        _hoverTriggerOn: function() {
            e(this.el).on("mouseleave", {
                obj: this
            }, this._mouseLeaveMenu).find(this.options.rowSelector).on("mouseenter", {
                obj: this
            }, this._mouseEnterRow).on("mouseleave", {
                obj: this
            }, this._mouseLeaveRow);
            e(c).on("blur", {
                obj: this
            }, this._mouseLeaveMenu);
            e(a).on("mousemove", {
                obj: this
            }, this._mouseMoveDocument)
        },
        _hoverTriggerOff: function() {
            e(this.el).off("mouseleave", this._mouseLeaveMenu).find(this.options.rowSelector).off("mouseenter", this._mouseEnterRow).off("mouseleave", this._mouseLeaveRow);
            e(c).off("blur", this._mouseLeaveMenu);
            e(a).off("mousemove", {
                obj: this
            }, this._mouseMoveDocument)
        },
        _clickTriggerOn: function() {
            e(this.el).find(this.options.rowSelector).on("click", {
                obj: this
            }, this._clickRow);
            e(a).on("click", {
                obj: this
            }, this._outsideMenuClick)
        },
        _clickTriggerOff: function() {
            e(this.el).find(this.options.rowSelector).off("click", this._clickRow);
            e(a).off("click", this._outsideMenuClick)
        },
        switchToHover: function() {
            this._clickTriggerOff();
            this._hoverTriggerOn();
            this.isOnHover = true;
            this.isOnClick = false
        },
        switchToClick: function() {
            this._hoverTriggerOff();
            this._clickTriggerOn();
            this.isOnHover = false;
            this.isOnClick = true
        }
    };
    e.fn[d] = function(i) {
        var h = arguments;
        if (i === g || typeof i === "object") {
            return this.each(function() {
                if (!e.data(this, "plugin_" + d)) {
                    e.data(this, "plugin_" + d, new b(this, i))
                }
            })
        } else {
            if (typeof i === "string" && i[0] !== "_" && i !== "init") {
                var j;
                this.each(function() {
                    var k = e.data(this, "plugin_" + d);
                    if (k instanceof b && typeof k[i] === "function") {
                        j = k[i].apply(k, Array.prototype.slice.call(h, 1))
                    }
                    if (i === "destroy") {
                        e.data(this, "plugin_" + d, null)
                    }
                });
                return j !== g ? j : this
            }
        }
    }
}(jQuery, window, document));

//Picture fill
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a) {
    var b = navigator.userAgent;
    a.HTMLPictureElement && /ecko/.test(b) && b.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function() {
        var b,
            c = document.createElement("source"),
            d = function(a) {
                var b,
                    d,
                    e = a.parentNode;
                "PICTURE" === e.nodeName.toUpperCase() ? (b = c.cloneNode(), e.insertBefore(b, e.firstElementChild), setTimeout(function() {
                    e.removeChild(b)
                })) : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) && (a._pfLastSize = a.offsetWidth, d = a.sizes, a.sizes += ",100vw", setTimeout(function() {
                    a.sizes = d
                }))
            },
            e = function() {
                var a,
                    b = document.querySelectorAll("picture > img, img[srcset][sizes]");
                for (a = 0; a < b.length; a++)
                    d(b[a])
            },
            f = function() {
                clearTimeout(b),
                b = setTimeout(e, 99)
            },
            g = a.matchMedia && matchMedia("(orientation: landscape)"),
            h = function() {
                f(),
                g && g.addListener && g.addListener(f)
            };
        return c.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? h() : document.addEventListener("DOMContentLoaded", h), f
    }())
}(window),
function(a, b, c) {
    "use strict";
    function d(a) {
        return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a
    }
    function e(b, c) {
        var d = new a.Image;
        return d.onerror = function() {
            A[b] = !1,
            ba()
        }, d.onload = function() {
            A[b] = 1 === d.width,
            ba()
        }, d.src = c, "pending"
    }
    function f() {
        M = !1,
        P = a.devicePixelRatio,
        N = {},
        O = {},
        s.DPR = P || 1,
        Q.width = Math.max(a.innerWidth || 0, z.clientWidth),
        Q.height = Math.max(a.innerHeight || 0, z.clientHeight),
        Q.vw = Q.width / 100,
        Q.vh = Q.height / 100,
        r = [Q.height, Q.width, P].join("-"),
        Q.em = s.getEmValue(),
        Q.rem = Q.em
    }
    function g(a, b, c, d) {
        var e,
            f,
            g,
            h;
        return "saveData" === B.algorithm ? a > 2.7 ? h = c + 1 : (f = b - c, e = Math.pow(a - .6, 1.5), g = f * e, d && (g += .1 * e), h = a + g) : h = c > 1 ? Math.sqrt(a * b) : a, h > c
    }
    function h(a) {
        var b,
            c = s.getSet(a),
            d = !1;
        "pending" !== c && (d = r, c && (b = s.setRes(c), s.applySetCandidate(b, a))),
        a[s.ns].evaled = d
    }
    function i(a, b) {
        return a.res - b.res
    }
    function j(a, b, c) {
        var d;
        return !c && b && (c = a[s.ns].sets, c = c && c[c.length - 1]), d = k(b, c), d && (b = s.makeUrl(b), a[s.ns].curSrc = b, a[s.ns].curCan = d, d.res || aa(d, d.set.sizes)), d
    }
    function k(a, b) {
        var c,
            d,
            e;
        if (a && b)
            for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++)
                if (a === s.makeUrl(e[c].url)) {
                    d = e[c];
                    break
                }
        return d
    }
    function l(a, b) {
        var c,
            d,
            e,
            f,
            g = a.getElementsByTagName("source");
        for (c = 0, d = g.length; d > c; c++)
            e = g[c],
            e[s.ns] = !0,
            f = e.getAttribute("srcset"),
            f && b.push({
                srcset: f,
                media: e.getAttribute("media"),
                type: e.getAttribute("type"),
                sizes: e.getAttribute("sizes")
            })
    }
    function m(a, b) {
        function c(b) {
            var c,
                d = b.exec(a.substring(m));
            return d ? (c = d[0], m += c.length, c) : void 0
        }
        function e() {
            var a,
                c,
                d,
                e,
                f,
                i,
                j,
                k,
                l,
                m = !1,
                o = {};
            for (e = 0; e < h.length; e++)
                f = h[e],
                i = f[f.length - 1],
                j = f.substring(0, f.length - 1),
                k = parseInt(j, 10),
                l = parseFloat(j),
                X.test(j) && "w" === i ? ((a || c) && (m = !0), 0 === k ? m = !0 : a = k) : Y.test(j) && "x" === i ? ((a || c || d) && (m = !0), 0 > l ? m = !0 : c = l) : X.test(j) && "h" === i ? ((d || c) && (m = !0), 0 === k ? m = !0 : d = k) : m = !0;
            m || (o.url = g, a && (o.w = a), c && (o.d = c), d && (o.h = d), d || c || a || (o.d = 1), 1 === o.d && (b.has1x = !0), o.set = b, n.push(o))
        }
        function f() {
            for (c(T), i = "", j = "in descriptor";;) {
                if (k = a.charAt(m), "in descriptor" === j)
                    if (d(k))
                        i && (h.push(i), i = "", j = "after descriptor");
                    else {
                        if ("," === k)
                            return m += 1, i && h.push(i), void e();
                        if ("(" === k)
                            i += k,
                            j = "in parens";
                        else {
                            if ("" === k)
                                return i && h.push(i), void e();
                            i += k
                        }
                    }
                else if ("in parens" === j)
                    if (")" === k)
                        i += k,
                        j = "in descriptor";
                    else {
                        if ("" === k)
                            return h.push(i), void e();
                        i += k
                    }
                else if ("after descriptor" === j)
                    if (d(k))
                        ;
                    else {
                        if ("" === k)
                            return void e();
                        j = "in descriptor",
                        m -= 1
                    }
                m += 1
            }
        }
        for (var g, h, i, j, k, l = a.length, m = 0, n = [];;) {
            if (c(U), m >= l)
                return n;
            g = c(V),
            h = [],
            "," === g.slice(-1) ? (g = g.replace(W, ""), e()) : f()
        }
    }
    function n(a) {
        function b(a) {
            function b() {
                f && (g.push(f), f = "")
            }
            function c() {
                g[0] && (h.push(g), g = [])
            }
            for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1;;) {
                if (e = a.charAt(j), "" === e)
                    return b(), c(), h;
                if (k) {
                    if ("*" === e && "/" === a[j + 1]) {
                        k = !1,
                        j += 2,
                        b();
                        continue
                    }
                    j += 1
                } else {
                    if (d(e)) {
                        if (a.charAt(j - 1) && d(a.charAt(j - 1)) || !f) {
                            j += 1;
                            continue
                        }
                        if (0 === i) {
                            b(),
                            j += 1;
                            continue
                        }
                        e = " "
                    } else if ("(" === e)
                        i += 1;
                    else if (")" === e)
                        i -= 1;
                    else {
                        if ("," === e) {
                            b(),
                            c(),
                            j += 1;
                            continue
                        }
                        if ("/" === e && "*" === a.charAt(j + 1)) {
                            k = !0,
                            j += 2;
                            continue
                        }
                    }
                    f += e,
                    j += 1
                }
            }
        }
        function c(a) {
            return k.test(a) && parseFloat(a) >= 0 ? !0 : l.test(a) ? !0 : "0" === a || "-0" === a || "+0" === a ? !0 : !1
        }
        var e,
            f,
            g,
            h,
            i,
            j,
            k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
            l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
        for (f = b(a), g = f.length, e = 0; g > e; e++)
            if (h = f[e], i = h[h.length - 1], c(i)) {
                if (j = i, h.pop(), 0 === h.length)
                    return j;
                if (h = h.join(" "), s.matchesMedia(h))
                    return j
            }
        return "100vw"
    }
    b.createElement("picture");
    var o,
        p,
        q,
        r,
        s = {},
        t = !1,
        u = function() {},
        v = b.createElement("img"),
        w = v.getAttribute,
        x = v.setAttribute,
        y = v.removeAttribute,
        z = b.documentElement,
        A = {},
        B = {
            algorithm: ""
        },
        C = "data-pfsrc",
        D = C + "set",
        E = navigator.userAgent,
        F = /rident/.test(E) || /ecko/.test(E) && E.match(/rv\:(\d+)/) && RegExp.$1 > 35,
        G = "currentSrc",
        H = /\s+\+?\d+(e\d+)?w/,
        I = /(\([^)]+\))?\s*(.+)/,
        J = a.picturefillCFG,
        K = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
        L = "font-size:100%!important;",
        M = !0,
        N = {},
        O = {},
        P = a.devicePixelRatio,
        Q = {
            px: 1,
            "in": 96
        },
        R = b.createElement("a"),
        S = !1,
        T = /^[ \t\n\r\u000c]+/,
        U = /^[, \t\n\r\u000c]+/,
        V = /^[^ \t\n\r\u000c]+/,
        W = /[,]+$/,
        X = /^\d+$/,
        Y = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
        Z = function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        $ = function(a) {
            var b = {};
            return function(c) {
                return c in b || (b[c] = a(c)), b[c]
            }
        },
        _ = function() {
            var a = /^([\d\.]+)(em|vw|px)$/,
                b = function() {
                    for (var a = arguments, b = 0, c = a[0]; ++b in a;)
                        c = c.replace(a[b], a[++b]);
                    return c
                },
                c = $(function(a) {
                    return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
                });
            return function(b, d) {
                var e;
                if (!(b in N))
                    if (N[b] = !1, d && (e = b.match(a)))
                        N[b] = e[1] * Q[e[2]];
                    else
                        try {
                            N[b] = new Function("e", c(b))(Q)
                        } catch (f) {}
                return N[b]
            }
        }(),
        aa = function(a, b) {
            return a.w ? (a.cWidth = s.calcListLength(b || "100vw"), a.res = a.w / a.cWidth) : a.res = a.d, a
        },
        ba = function(a) {
            if (t) {
                var c,
                    d,
                    e,
                    f = a || {};
                if (f.elements && 1 === f.elements.nodeType && ("IMG" === f.elements.nodeName.toUpperCase() ? f.elements = [f.elements] : (f.context = f.elements, f.elements = null)), c = f.elements || s.qsa(f.context || b, f.reevaluate || f.reselect ? s.sel : s.selShort), e = c.length) {
                    for (s.setupRun(f), S = !0, d = 0; e > d; d++)
                        s.fillImg(c[d], f);
                    s.teardownRun(f)
                }
            }
        };
    o = a.console && console.warn ? function(a) {
        console.warn(a)
    } : u,
    G in v || (G = "src"),
    A["image/jpeg"] = !0,
    A["image/gif"] = !0,
    A["image/png"] = !0,
    A["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),
    s.ns = ("pf" + (new Date).getTime()).substr(0, 9),
    s.supSrcset = "srcset" in v,
    s.supSizes = "sizes" in v,
    s.supPicture = !!a.HTMLPictureElement,
    s.supSrcset && s.supPicture && !s.supSizes && !function(a) {
        v.srcset = "data:,a",
        a.src = "data:,a",
        s.supSrcset = v.complete === a.complete,
        s.supPicture = s.supSrcset && s.supPicture
    }(b.createElement("img")),
    s.supSrcset && !s.supSizes ? !function() {
        var a = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",
            c = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            d = b.createElement("img"),
            e = function() {
                var a = d.width;
                2 === a && (s.supSizes = !0),
                q = s.supSrcset && !s.supSizes,
                t = !0,
                setTimeout(ba)
            };
        d.onload = e,
        d.onerror = e,
        d.setAttribute("sizes", "9px"),
        d.srcset = c + " 1w," + a + " 9w",
        d.src = c
    }() : t = !0,
    s.selShort = "picture>img,img[srcset]",
    s.sel = s.selShort,
    s.cfg = B,
    s.DPR = P || 1,
    s.u = Q,
    s.types = A,
    s.setSize = u,
    s.makeUrl = $(function(a) {
        return R.href = a, R.href
    }),
    s.qsa = function(a, b) {
        return "querySelector" in a ? a.querySelectorAll(b) : []
    },
    s.matchesMedia = function() {
        return a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? s.matchesMedia = function(a) {
            return !a || matchMedia(a).matches
        } : s.matchesMedia = s.mMQ, s.matchesMedia.apply(this, arguments)
    },
    s.mMQ = function(a) {
        return a ? _(a) : !0
    },
    s.calcLength = function(a) {
        var b = _(a, !0) || !1;
        return 0 > b && (b = !1), b
    },
    s.supportsType = function(a) {
        return a ? A[a] : !0
    },
    s.parseSize = $(function(a) {
        var b = (a || "").match(I);
        return {
            media: b && b[1],
            length: b && b[2]
        }
    }),
    s.parseSet = function(a) {
        return a.cands || (a.cands = m(a.srcset, a)), a.cands
    },
    s.getEmValue = function() {
        var a;
        if (!p && (a = b.body)) {
            var c = b.createElement("div"),
                d = z.style.cssText,
                e = a.style.cssText;
            c.style.cssText = K,
            z.style.cssText = L,
            a.style.cssText = L,
            a.appendChild(c),
            p = c.offsetWidth,
            a.removeChild(c),
            p = parseFloat(p, 10),
            z.style.cssText = d,
            a.style.cssText = e
        }
        return p || 16
    },
    s.calcListLength = function(a) {
        if (!(a in O) || B.uT) {
            var b = s.calcLength(n(a));
            O[a] = b ? b : Q.width
        }
        return O[a]
    },
    s.setRes = function(a) {
        var b;
        if (a) {
            b = s.parseSet(a);
            for (var c = 0, d = b.length; d > c; c++)
                aa(b[c], a.sizes)
        }
        return b
    },
    s.setRes.res = aa,
    s.applySetCandidate = function(a, b) {
        if (a.length) {
            var c,
                d,
                e,
                f,
                h,
                k,
                l,
                m,
                n,
                o = b[s.ns],
                p = s.DPR;
            if (k = o.curSrc || b[G], l = o.curCan || j(b, k, a[0].set), l && l.set === a[0].set && (n = F && !b.complete && l.res - .1 > p, n || (l.cached = !0, l.res >= p && (h = l))), !h)
                for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++)
                    if (c = a[d], c.res >= p) {
                        e = d - 1,
                        h = a[e] && (n || k !== s.makeUrl(c.url)) && g(a[e].res, c.res, p, a[e].cached) ? a[e] : c;
                        break
                    }
            h && (m = s.makeUrl(h.url), o.curSrc = m, o.curCan = h, m !== k && s.setSrc(b, h), s.setSize(b))
        }
    },
    s.setSrc = function(a, b) {
        var c;
        a.src = b.url,
        "image/svg+xml" === b.set.type && (c = a.style.width, a.style.width = a.offsetWidth + 1 + "px", a.offsetWidth + 1 && (a.style.width = c))
    },
    s.getSet = function(a) {
        var b,
            c,
            d,
            e = !1,
            f = a[s.ns].sets;
        for (b = 0; b < f.length && !e; b++)
            if (c = f[b], c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type))) {
                "pending" === d && (c = d),
                e = c;
                break
            }
        return e
    },
    s.parseSets = function(a, b, d) {
        var e,
            f,
            g,
            h,
            i = b && "PICTURE" === b.nodeName.toUpperCase(),
            j = a[s.ns];
        (j.src === c || d.src) && (j.src = w.call(a, "src"), j.src ? x.call(a, C, j.src) : y.call(a, C)),
        (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) && (e = w.call(a, "srcset"), j.srcset = e, h = !0),
        j.sets = [],
        i && (j.pic = !0, l(b, j.sets)),
        j.srcset ? (f = {
            srcset: j.srcset,
            sizes: w.call(a, "sizes")
        }, j.sets.push(f), g = (q || j.src) && H.test(j.srcset || ""), g || !j.src || k(j.src, f) || f.has1x || (f.srcset += ", " + j.src, f.cands.push({
            url: j.src,
            d: 1,
            set: f
        }))) : j.src && j.sets.push({
            srcset: j.src,
            sizes: null
        }),
        j.curCan = null,
        j.curSrc = c,
        j.supported = !(i || f && !s.supSrcset || g && !s.supSizes),
        h && s.supSrcset && !j.supported && (e ? (x.call(a, D, e), a.srcset = "") : y.call(a, D)),
        j.supported && !j.srcset && (!j.src && a.src || a.src !== s.makeUrl(j.src)) && (null === j.src ? a.removeAttribute("src") : a.src = j.src),
        j.parsed = !0
    },
    s.fillImg = function(a, b) {
        var c,
            d = b.reselect || b.reevaluate;
        a[s.ns] || (a[s.ns] = {}),
        c = a[s.ns],
        (d || c.evaled !== r) && ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b), c.supported ? c.evaled = r : h(a))
    },
    s.setupRun = function() {
        (!S || M || P !== a.devicePixelRatio) && f()
    },
    s.supPicture ? (ba = u, s.fillImg = u) : !function() {
        var c,
            d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/,
            e = function() {
                var a = b.readyState || "";
                f = setTimeout(e, "loading" === a ? 200 : 999),
                b.body && (s.fillImgs(), c = c || d.test(a), c && clearTimeout(f))
            },
            f = setTimeout(e, b.body ? 9 : 99),
            g = function(a, b) {
                var c,
                    d,
                    e = function() {
                        var f = new Date - d;
                        b > f ? c = setTimeout(e, b - f) : (c = null, a())
                    };
                return function() {
                    d = new Date,
                    c || (c = setTimeout(e, b))
                }
            },
            h = z.clientHeight,
            i = function() {
                M = Math.max(a.innerWidth || 0, z.clientWidth) !== Q.width || z.clientHeight !== h,
                h = z.clientHeight,
                M && s.fillImgs()
            };
        Z(a, "resize", g(i, 99)),
        Z(b, "readystatechange", e)
    }(),
    s.picturefill = ba,
    s.fillImgs = ba,
    s.teardownRun = u,
    ba._ = s,
    a.picturefillCFG = {
        pf: s,
        push: function(a) {
            var b = a.shift();
            "function" == typeof s[b] ? s[b].apply(s, a) : (B[b] = a[0], S && s.fillImgs({
                reselect: !0
            }))
        }
    };
    for (; J && J.length;)
        a.picturefillCFG.push(J.shift());
    a.picturefill = ba,
    "object" == typeof module && "object" == typeof module.exports ? module.exports = ba : "function" == typeof define && define.amd && define("picturefill", function() {
        return ba
    }),
    s.supPicture || (A["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
}(window, document);

// Pdp dependencies - hammer 
/*! Hammer.JS - v2.0.8 - 2016-04-23 edited
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
    var VENDOR_PREFIXES = ["", "webkit", "Moz", "MS", "ms", "o"];
    var TEST_ELEMENT = document.createElement("div");
    var TYPE_FUNCTION = "function";
    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout)
    }
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true
        }
        return false
    }
    function each(obj, iterator, context) {
        var i;
        if (!obj)
            return;
        if (obj.forEach)
            obj.forEach(iterator, context);
        else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++
            }
        } else
            for (i in obj)
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj)
    }
    function deprecate(method, name, message) {
        var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
        return function() {
            var e = new Error("get-stack-trace");
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm,
            "{anonymous}()@") : "Unknown Stack Trace";
            var log = window.console && (window.console.warn || window.console.log);
            if (log)
                log.call(window.console, deprecationMessage, stack);
            return method.apply(this, arguments)
        }
    }
    var assign;
    if (typeof Object.assign !== "function")
        assign = function assign(target) {
            if (target === undefined || target === null)
                throw new TypeError("Cannot convert undefined or null to object");
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined &&
                source !== null)
                    for (var nextKey in source)
                        if (source.hasOwnProperty(nextKey))
                            output[nextKey] = source[nextKey]
            }
            return output
        };
    else
        assign = Object.assign;
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined)
                dest[keys[i]] = src[keys[i]];
            i++
        }
        return dest
    }, "extend", "Use `assign`.");
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true)
    }, "merge", "Use `assign`.");
    function inherit(child, base, properties) {
        var baseP =
            base.prototype,
            childP;
        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;
        if (properties)
            assign(childP, properties)
    }
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments)
        }
    }
    function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION)
            return val.apply(args ? args[0] || undefined : undefined, args);
        return val
    }
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1
    }
    function addEventListeners(target, types, handler) {
        each(splitStr(types),
        function(type) {
            target.addEventListener(type, handler, false)
        })
    }
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
            target.removeEventListener(type, handler, false)
        })
    }
    function hasParent(node, parent) {
        while (node) {
            if (node == parent)
                return true;
            node = node.parentNode
        }
        return false
    }
    function inStr(str, find) {
        return str.indexOf(find) > -1
    }
    function splitStr(str) {
        return str.trim().split(/\s+/g)
    }
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey)
            return src.indexOf(find);
        else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find)
                    return i;
                i++
            }
            return -1
        }
    }
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0)
    }
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;
        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0)
                results.push(src[i]);
            values[i] = val;
            i++
        }
        if (sort)
            if (!key)
                results = results.sort();
            else
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key]
                });
        return results
    }
    function prefixed(obj, property) {
        var prefix,
            prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);
        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;
            if (prop in obj)
                return prop;
            i++
        }
        return undefined
    }
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++
    }
    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window
    }
    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
    var SUPPORT_TOUCH =
    "ontouchstart" in window;
    var SUPPORT_POINTER_EVENTS = prefixed(window, "PointerEvent") !== undefined && navigator.userAgent.indexOf("SamsungBrowser") == -1;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
    var INPUT_TYPE_TOUCH = "touch";
    var INPUT_TYPE_PEN = "pen";
    var INPUT_TYPE_MOUSE = "mouse";
    var INPUT_TYPE_KINECT = "kinect";
    var COMPUTE_INTERVAL = 25;
    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;
    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP =
    8;
    var DIRECTION_DOWN = 16;
    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
    var PROPS_XY = ["x", "y"];
    var PROPS_CLIENT_XY = ["clientX", "clientY"];
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;
        this.domHandler = function(ev) {
            if (boolOrFn(manager.options.enable, [manager]))
                self.handler(ev)
        };
        this.init()
    }
    Input.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element),
            this.evWin, this.domHandler)
        }
    };
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;
        if (inputClass)
            Type = inputClass;
        else if (SUPPORT_POINTER_EVENTS)
            Type = PointerEventInput;
        else if (SUPPORT_ONLY_TOUCH)
            Type = TouchInput;
        else if (!SUPPORT_TOUCH)
            Type = MouseInput;
        else
            Type = TouchMouseInput;
        return new Type(manager, inputHandler)
    }
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType &
        INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;
        if (isFirst)
            manager.session = {};
        input.eventType = eventType;
        computeInputData(manager, input);
        manager.emit("hammer.input", input);
        manager.recognize(input);
        manager.session.prevInput = input
    }
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;
        if (!session.firstInput)
            session.firstInput =
            simpleCloneInputData(input);
        if (pointersLength > 1 && !session.firstMultiple)
            session.firstMultiple = simpleCloneInputData(input);
        else if (pointersLength === 1)
            session.firstMultiple = false;
        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;
        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter,
        center);
        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);
        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) :
        0;
        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
        computeIntervalInputData(session, input);
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target))
            target = input.srcEvent.target;
        input.target = target
    }
    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};
        if (input.eventType ===
        INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };
            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            }
        }
        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y)
    }
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;
        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity ===
        undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;
            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);
            session.lastInterval = input
        } else {
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction
        }
        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction
    }
    function simpleCloneInputData(input) {
        var pointers =
        [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++
        }
        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        }
    }
    function getCenter(pointers) {
        var pointersLength = pointers.length;
        if (pointersLength === 1)
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++
        }
        return {
            x: round(x /
            pointersLength),
            y: round(y / pointersLength)
        }
    }
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        }
    }
    function getDirection(x, y) {
        if (x === y)
            return DIRECTION_NONE;
        if (abs(x) >= abs(y))
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN
    }
    function getDistance(p1, p2, props) {
        if (!props)
            props = PROPS_XY;
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.sqrt(x * x + y * y)
    }
    function getAngle(p1, p2, props) {
        if (!props)
            props = PROPS_XY;
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI
    }
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY)
    }
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY)
    }
    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };
    var MOUSE_ELEMENT_EVENTS = "mousedown";
    var MOUSE_WINDOW_EVENTS = "mousemove mouseup";
    function MouseInput() {
        this.evEl =
        MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;
        this.pressed = false;
        Input.apply(this, arguments)
    }
    inherit(MouseInput, Input, {
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];
            if (eventType & INPUT_START && ev.button === 0)
                this.pressed = true;
            if (eventType & INPUT_MOVE && ev.which !== 1)
                eventType = INPUT_END;
            if (!this.pressed)
                return;
            if (eventType & INPUT_END)
                this.pressed = false;
            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            })
        }
    });
    var POINTER_INPUT_MAP =
    {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT
    };
    var POINTER_ELEMENT_EVENTS = "pointerdown";
    var POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
    if (window.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = "MSPointerDown";
        POINTER_WINDOW_EVENTS = "MSPointerMove MSPointerUp MSPointerCancel"
    }
    function PointerEventInput() {
        this.evEl =
        POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;
        Input.apply(this, arguments);
        this.store = this.manager.session.pointerEvents = []
    }
    inherit(PointerEventInput, Input, {
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;
            var eventTypeNormalized = ev.type.toLowerCase().replace("ms", "");
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
            var isTouch = pointerType == INPUT_TYPE_TOUCH;
            var storeIndex = inArray(store, ev.pointerId,
            "pointerId");
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL))
                removePointer = true;
            if (storeIndex < 0)
                return;
            store[storeIndex] = ev;
            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });
            if (removePointer)
                store.splice(storeIndex, 1)
        }
    });
    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };
    var SINGLE_TOUCH_TARGET_EVENTS = "touchstart";
    var SINGLE_TOUCH_WINDOW_EVENTS = "touchstart touchmove touchend touchcancel";
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;
        Input.apply(this, arguments)
    }
    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
            if (type === INPUT_START)
                this.started = true;
            if (!this.started)
                return;
            var touches = normalizeSingleTouches.call(this, ev, type);
            if (type &
            (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0)
                this.started = false;
            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            })
        }
    });
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);
        if (type & (INPUT_END | INPUT_CANCEL))
            all = uniqueArray(all.concat(changed), "identifier", true);
        return [all, changed]
    }
    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };
    var TOUCH_TARGET_EVENTS = "touchstart touchmove touchend touchcancel";
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};
        Input.apply(this, arguments)
    }
    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches)
                return;
            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            })
        }
    });
    function getTouches(ev, type) {
        var allTouches =
        toArray(ev.touches);
        var targetIds = this.targetIds;
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches]
        }
        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;
        targetTouches = allTouches.filter(function(touch) {
            return hasParent(touch.target, target)
        });
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++
            }
        }
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier])
                changedTargetTouches.push(changedTouches[i]);
            if (type & (INPUT_END | INPUT_CANCEL))
                delete targetIds[changedTouches[i].identifier];
            i++
        }
        if (!changedTargetTouches.length)
            return;
        return [uniqueArray(targetTouches.concat(changedTargetTouches), "identifier", true), changedTargetTouches]
    }
    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;
    function TouchMouseInput() {
        Input.apply(this, arguments);
        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);
        this.primaryTouch = null;
        this.lastTouches = []
    }
    inherit(TouchMouseInput, Input, {
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents)
                return;
            if (isTouch)
                recordTouches.call(this, inputEvent, inputData);
            else if (isMouse && isSyntheticEvent.call(this, inputData))
                return;
            this.callback(manager, inputEvent, inputData)
        },
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy()
        }
    });
    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData)
        } else if (eventType & (INPUT_END | INPUT_CANCEL))
            setLastTouch.call(this, eventData)
    }
    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];
        if (touch.identifier === this.primaryTouch) {
            var lastTouch = {
                x: touch.clientX,
                y: touch.clientY
            };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function() {
                var i = lts.indexOf(lastTouch);
                if (i > -1)
                    lts.splice(i, 1)
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT)
        }
    }
    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE)
                return true
        }
        return false
    }
    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, "touchAction");
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
    var TOUCH_ACTION_COMPUTE = "compute";
    var TOUCH_ACTION_AUTO = "auto";
    var TOUCH_ACTION_MANIPULATION = "manipulation";
    var TOUCH_ACTION_NONE = "none";
    var TOUCH_ACTION_PAN_X = "pan-x";
    var TOUCH_ACTION_PAN_Y = "pan-y";
    var TOUCH_ACTION_MAP = getTouchActionProps();
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value)
    }
    TouchAction.prototype = {
        set: function(value) {
            if (value == TOUCH_ACTION_COMPUTE)
                value = this.compute();
            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value])
                this.manager.element.style[PREFIXED_TOUCH_ACTION] =
                value;
            this.actions = value.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var actions = [];
            each(this.manager.recognizers, function(recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer]))
                    actions = actions.concat(recognizer.getTouchAction())
            });
            return cleanTouchActions(actions.join(" "))
        },
        preventDefaults: function(input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return
            }
            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
            if (hasNone) {
                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;
                if (isTapPointer && isTapMovement && isTapTouchTime)
                    return
            }
            if (hasPanX && hasPanY)
                return;
            if (hasNone ||
            hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL)
                return this.preventSrc(srcEvent)
        },
        preventSrc: function(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault()
        }
    };
    function cleanTouchActions(actions) {
        if (inStr(actions, TOUCH_ACTION_NONE))
            return TOUCH_ACTION_NONE;
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        if (hasPanX && hasPanY)
            return TOUCH_ACTION_NONE;
        if (hasPanX || hasPanY)
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        if (inStr(actions, TOUCH_ACTION_MANIPULATION))
            return TOUCH_ACTION_MANIPULATION;
        return TOUCH_ACTION_AUTO
    }
    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION)
            return false;
        var touchMap = {};
        var cssSupports = window.CSS && window.CSS.supports;
        ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(val) {
            touchMap[val] = cssSupports ? window.CSS.supports("touch-action", val) : true
        });
        return touchMap
    }
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED =
    STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;
    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});
        this.id = uniqueId();
        this.manager = null;
        this.options.enable = ifUndefined(this.options.enable, true);
        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = []
    }
    Recognizer.prototype = {
        defaults: {},
        set: function(options) {
            assign(this.options, options);
            this.manager && this.manager.touchAction.update();
            return this
        },
        recognizeWith: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer,
            "recognizeWith", this))
                return this;
            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this)
            }
            return this
        },
        dropRecognizeWith: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "dropRecognizeWith", this))
                return this;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this
        },
        requireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "requireFailure", this))
                return this;
            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this)
            }
            return this
        },
        dropRequireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, "dropRequireFailure", this))
                return this;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer,
            this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1)
                this.requireFail.splice(index, 1);
            return this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id]
        },
        emit: function(input) {
            var self = this;
            var state = this.state;
            function emit(event) {
                self.manager.emit(event, input)
            }
            if (state < STATE_ENDED)
                emit(self.options.event + stateStr(state));
            emit(self.options.event);
            if (input.additionalEvent)
                emit(input.additionalEvent);
            if (state >= STATE_ENDED)
                emit(self.options.event + stateStr(state))
        },
        tryEmit: function(input) {
            if (this.canEmit())
                return this.emit(input);
            this.state = STATE_FAILED
        },
        canEmit: function() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE)))
                    return false;
                i++
            }
            return true
        },
        recognize: function(inputData) {
            var inputDataClone = assign({}, inputData);
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return
            }
            if (this.state & (STATE_RECOGNIZED |
            STATE_CANCELLED | STATE_FAILED))
                this.state = STATE_POSSIBLE;
            this.state = this.process(inputDataClone);
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED))
                this.tryEmit(inputDataClone)
        },
        process: function(inputData) {},
        getTouchAction: function() {},
        reset: function() {}
    };
    function stateStr(state) {
        if (state & STATE_CANCELLED)
            return "cancel";
        else if (state & STATE_ENDED)
            return "end";
        else if (state & STATE_CHANGED)
            return "move";
        else if (state & STATE_BEGAN)
            return "start";
        return ""
    }
    function directionStr(direction) {
        if (direction ==
        DIRECTION_DOWN)
            return "down";
        else if (direction == DIRECTION_UP)
            return "up";
        else if (direction == DIRECTION_LEFT)
            return "left";
        else if (direction == DIRECTION_RIGHT)
            return "right";
        return ""
    }
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager)
            return manager.get(otherRecognizer);
        return otherRecognizer
    }
    function AttrRecognizer() {
        Recognizer.apply(this, arguments)
    }
    inherit(AttrRecognizer, Recognizer, {
        defaults: {
            pointers: 1
        },
        attrTest: function(input) {
            var optionPointers =
            this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers
        },
        process: function(input) {
            var state = this.state;
            var eventType = input.eventType;
            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid))
                return state | STATE_CANCELLED;
            else if (isRecognized || isValid) {
                if (eventType & INPUT_END)
                    return state | STATE_ENDED;
                else if (!(state & STATE_BEGAN))
                    return STATE_BEGAN;
                return state | STATE_CHANGED
            }
            return STATE_FAILED
        }
    });
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);
        this.pX = null;
        this.pY = null
    }
    inherit(PanRecognizer, AttrRecognizer, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },
        getTouchAction: function() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL)
                actions.push(TOUCH_ACTION_PAN_Y);
            if (direction & DIRECTION_VERTICAL)
                actions.push(TOUCH_ACTION_PAN_X);
            return actions
        },
        directionTest: function(input) {
            var options = this.options;
            var hasMoved = true;
            var distance =
            input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;
            if (!(direction & options.direction))
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX)
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY)
                }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction
        },
        attrTest: function(input) {
            return AttrRecognizer.prototype.attrTest.call(this,
                input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input))
        },
        emit: function(input) {
            this.pX = input.deltaX;
            this.pY = input.deltaY;
            var direction = directionStr(input.direction);
            if (direction)
                input.additionalEvent = this.options.event + direction;
            this._super.emit.call(this, input)
        }
    });
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments)
    }
    inherit(PinchRecognizer, AttrRecognizer, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_NONE]
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN)
        },
        emit: function(input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? "in" : "out";
                input.additionalEvent = this.options.event + inOut
            }
            this._super.emit.call(this, input)
        }
    });
    function PressRecognizer() {
        Recognizer.apply(this, arguments);
        this._timer = null;
        this._input = null
    }
    inherit(PressRecognizer, Recognizer, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_AUTO]
        },
        process: function(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;
            this._input = input;
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)
                this.reset();
            else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function() {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit()
                }, options.time, this)
            } else if (input.eventType & INPUT_END)
                return STATE_RECOGNIZED;
            return STATE_FAILED
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(input) {
            if (this.state !== STATE_RECOGNIZED)
                return;
            if (input && input.eventType & INPUT_END)
                this.manager.emit(this.options.event + "up", input);
            else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input)
            }
        }
    });
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments)
    }
    inherit(RotateRecognizer, AttrRecognizer, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_NONE]
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN)
        }
    });
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments)
    }
    inherit(SwipeRecognizer, AttrRecognizer, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },
        getTouchAction: function() {
            return PanRecognizer.prototype.getTouchAction.call(this)
        },
        attrTest: function(input) {
            var direction = this.options.direction;
            var velocity;
            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL))
                velocity = input.overallVelocity;
            else if (direction & DIRECTION_HORIZONTAL)
                velocity = input.overallVelocityX;
            else if (direction & DIRECTION_VERTICAL)
                velocity = input.overallVelocityY;
            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END
        },
        emit: function(input) {
            var direction = directionStr(input.offsetDirection);
            if (direction)
                this.manager.emit(this.options.event + direction, input);
            this.manager.emit(this.options.event, input)
        }
    });
    function TapRecognizer() {
        Recognizer.apply(this, arguments);
        this.pTime = false;
        this.pCenter = false;
        this._timer = null;
        this._input = null;
        this.count = 0
    }
    inherit(TapRecognizer, Recognizer, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_MANIPULATION]
        },
        process: function(input) {
            var options = this.options;
            var validPointers =
            input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;
            this.reset();
            if (input.eventType & INPUT_START && this.count === 0)
                return this.failTimeout();
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END)
                    return this.failTimeout();
                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
                this.pTime = input.timeStamp;
                this.pCenter = input.center;
                if (!validMultiTap || !validInterval)
                    this.count = 1;
                else
                    this.count += 1;
                this._input = input;
                var tapCount = this.count % options.taps;
                if (tapCount === 0)
                    if (!this.hasRequireFailures())
                        return STATE_RECOGNIZED;
                    else {
                        this._timer = setTimeoutContext(function() {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit()
                        }, options.interval, this);
                        return STATE_BEGAN
                    }
            }
            return STATE_FAILED
        },
        failTimeout: function() {
            this._timer = setTimeoutContext(function() {
                this.state = STATE_FAILED
            }, this.options.interval,
            this);
            return STATE_FAILED
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input)
            }
        }
    });
    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options)
    }
    Hammer.VERSION = "2.0.8";
    Hammer.defaults = {
        domEvents: false,
        touchAction: TOUCH_ACTION_COMPUTE,
        enable: true,
        inputTarget: null,
        inputClass: null,
        preset: [[RotateRecognizer, {
            enable: false
        }], [PinchRecognizer, {
            enable: false
        }, ["rotate"]], [SwipeRecognizer, {
            direction: DIRECTION_HORIZONTAL
        }], [PanRecognizer, {
            direction: DIRECTION_HORIZONTAL
        }, ["swipe"]], [TapRecognizer], [TapRecognizer, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [PressRecognizer]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var STOP = 1;
    var FORCED_STOP = 2;
    function Manager(element, options) {
        this.options = assign({},
        Hammer.defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(this.options.recognizers, function(item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3])
        }, this)
    }
    Manager.prototype =
    {
        set: function(options) {
            assign(this.options, options);
            if (options.touchAction)
                this.touchAction.update();
            if (options.inputTarget) {
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init()
            }
            return this
        },
        stop: function(force) {
            this.session.stopped = force ? FORCED_STOP : STOP
        },
        recognize: function(inputData) {
            var session = this.session;
            if (session.stopped)
                return;
            this.touchAction.preventDefaults(inputData);
            var recognizer;
            var recognizers = this.recognizers;
            var curRecognizer = session.curRecognizer;
            if (!curRecognizer ||
            curRecognizer && curRecognizer.state & STATE_RECOGNIZED)
                curRecognizer = session.curRecognizer = null;
            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];
                if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer == curRecognizer || recognizer.canRecognizeWith(curRecognizer)))
                    recognizer.recognize(inputData);
                else
                    recognizer.reset();
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED))
                    curRecognizer = session.curRecognizer = recognizer;
                i++
            }
        },
        get: function(recognizer) {
            if (recognizer instanceof
            Recognizer)
                return recognizer;
            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++)
                if (recognizers[i].options.event == recognizer)
                    return recognizers[i];
            return null
        },
        add: function(recognizer) {
            if (invokeArrayArg(recognizer, "add", this))
                return this;
            var existing = this.get(recognizer.options.event);
            if (existing)
                this.remove(existing);
            this.recognizers.push(recognizer);
            recognizer.manager = this;
            this.touchAction.update();
            return recognizer
        },
        remove: function(recognizer) {
            if (invokeArrayArg(recognizer, "remove",
            this))
                return this;
            recognizer = this.get(recognizer);
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);
                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update()
                }
            }
            return this
        },
        on: function(events, handler) {
            if (events === undefined)
                return;
            if (handler === undefined)
                return;
            var handlers = this.handlers;
            each(splitStr(events), function(event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler)
            });
            return this
        },
        off: function(events, handler) {
            if (events === undefined)
                return;
            var handlers = this.handlers;
            each(splitStr(events), function(event) {
                if (!handler)
                    delete handlers[event];
                else
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1)
            });
            return this
        },
        emit: function(event, data) {
            if (this.options.domEvents)
                triggerDomEvent(event, data);
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length)
                return;
            data.type = event;
            data.preventDefault = function() {
                data.srcEvent.preventDefault()
            };
            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++
            }
        },
        destroy: function() {
            this.element && toggleCssProps(this, false);
            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null
        }
    };
    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style)
            return;
        var prop;
        each(manager.options.cssProps, function(value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value
            } else
                element.style[prop] = manager.oldCssProps[prop] || ""
        });
        if (!add)
            manager.oldCssProps = {}
    }
    function triggerDomEvent(event,
    data) {
        var gestureEvent = document.createEvent("Event");
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent)
    }
    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,
        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,
        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,
        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,
        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,
        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,
        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });
    var freeGlobal = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {};
    freeGlobal.Hammer = Hammer;
    if (typeof define === "function" && define.amd)
        define(function() {
            return Hammer
        });
    else if (typeof module != "undefined" && module.exports)
        module.exports = Hammer;
    else
        window[exportName] = Hammer
})(window,
document, "Hammer");

// Pdp dependencies - tweenmax
/*!
* VERSION: 2.1.2
* DATE: 2019-03-01
* UPDATES AND DOCS AT: http://greensock.com
* 
* Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
*
* @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
* This work is subject to the terms at http://greensock.com/standard-license or for
* Club GreenSock members, the software agreement that was issued with your membership.
* 
* @author: Jack Doyle, jack@greensock.com
**/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = function(a) {
                var b,
                    c = [],
                    d = a.length;
                for (b = 0; b !== d; c.push(a[b++]))
                    ;
                return c
            },
            e = function(a, b, c) {
                var d,
                    e,
                    f = a.cycle;
                for (d in f)
                    e = f[d],
                    a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length];
                delete a.cycle
            },
            f = function(a) {
                if ("function" == typeof a)
                    return a;
                var b = "object" == typeof a ? a : {
                        each: a
                    },
                    c = b.ease,
                    d = b.from || 0,
                    e = b.base || 0,
                    f = {},
                    g = isNaN(d),
                    h = b.axis,
                    i = {
                        center: .5,
                        end: 1
                    }[d] || 0;
                return function(a, j, k) {
                    var l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        s,
                        t,
                        u = (k || b).length,
                        v = f[u];
                    if (!v) {
                        if (t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0], !t) {
                            for (r = -(1 / 0); r < (r = k[t++].getBoundingClientRect().left) && u > t;)
                                ;
                            t--
                        }
                        for (v = f[u] = [], l = g ? Math.min(t, u) * i - .5 : d % t, m = g ? u * i / t - .5 : d / t | 0, r = 0, s = 1 / 0, q = 0; u > q; q++)
                            n = q % t - l,
                            o = m - (q / t | 0),
                            v[q] = p = h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o),
                            p > r && (r = p),
                            s > p && (s = p);
                        v.max = r - s,
                        v.min = s,
                        v.v = u = b.amount || b.each * (t > u ? u : h ? "y" === h ? u / t : t : Math.max(t, u / t)) || 0,
                        v.b = 0 > u ? e - u : e
                    }
                    return u = (v[a] - v.min) / v.max, v.b + (c ? c.getRatio(u) : u) * v.v
                }
            },
            g = function(a, b, d) {
                c.call(this, a, b, d),
                this._cycle = 0,
                this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
                this._repeat = this.vars.repeat || 0,
                this._repeatDelay = this.vars.repeatDelay || 0,
                this._repeat && this._uncache(!0),
                this.render = g.prototype.render
            },
            h = 1e-8,
            i = c._internals,
            j = i.isSelector,
            k = i.isArray,
            l = g.prototype = c.to({}, .1, {}),
            m = [];
        g.version = "2.1.2",
        l.constructor = g,
        l.kill()._gc = !1,
        g.killTweensOf = g.killDelayedCallsTo = c.killTweensOf,
        g.getTweensOf = c.getTweensOf,
        g.lagSmoothing = c.lagSmoothing,
        g.ticker = c.ticker,
        g.render = c.render,
        g.distribute = f,
        l.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), c.prototype.invalidate.call(this)
        },
        l.updateTo = function(a, b) {
            var d,
                e = this,
                f = e.ratio,
                g = e.vars.immediateRender || a.immediateRender;
            b && e._startTime < e._timeline._time && (e._startTime = e._timeline._time, e._uncache(!1), e._gc ? e._enabled(!0, !1) : e._timeline.insert(e, e._startTime - e._delay));
            for (d in a)
                e.vars[d] = a[d];
            if (e._initted || g)
                if (b)
                    e._initted = !1,
                    g && e.render(0, !0, !0);
                else if (e._gc && e._enabled(!0, !1), e._notifyPluginsOfEnabled && e._firstPT && c._onPluginEvent("_onDisable", e), e._time / e._duration > .998) {
                    var h = e._totalTime;
                    e.render(0, !0, !1),
                    e._initted = !1,
                    e.render(h, !0, !1)
                } else if (e._initted = !1, e._init(), e._time > 0 || g)
                    for (var i, j = 1 / (1 - f), k = e._firstPT; k;)
                        i = k.s + k.c,
                        k.c *= j,
                        k.s = i - k.c,
                        k = k._next;
            return e
        },
        l.render = function(a, b, d) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var e,
                f,
                g,
                j,
                k,
                l,
                m,
                n,
                o,
                p = this,
                q = p._dirty ? p.totalDuration() : p._totalDuration,
                r = p._time,
                s = p._totalTime,
                t = p._cycle,
                u = p._duration,
                v = p._rawPrevTime;
            if (a >= q - h && a >= 0 ? (p._totalTime = q, p._cycle = p._repeat, p._yoyo && 0 !== (1 & p._cycle) ? (p._time = 0, p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0) : (p._time = u, p.ratio = p._ease._calcEnd ? p._ease.getRatio(1) : 1), p._reversed || (e = !0, f = "onComplete", d = d || p._timeline.autoRemoveChildren), 0 === u && (p._initted || !p.vars.lazy || d) && (p._startTime === p._timeline._duration && (a = 0), (0 > v || 0 >= a && a >= -h || v === h && "isPause" !== p.data) && v !== a && (d = !0, v > h && (f = "onReverseComplete")), p._rawPrevTime = n = !b || a || v === a ? a : h)) : h > a ? (p._totalTime = p._time = p._cycle = 0, p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0, (0 !== s || 0 === u && v > 0) && (f = "onReverseComplete", e = p._reversed), a > -h ? a = 0 : 0 > a && (p._active = !1, 0 === u && (p._initted || !p.vars.lazy || d) && (v >= 0 && (d = !0), p._rawPrevTime = n = !b || a || v === a ? a : h)), p._initted || (d = !0)) : (p._totalTime = p._time = a, 0 !== p._repeat && (j = u + p._repeatDelay, p._cycle = p._totalTime / j >> 0, 0 !== p._cycle && p._cycle === p._totalTime / j && a >= s && p._cycle--, p._time = p._totalTime - p._cycle * j, p._yoyo && 0 !== (1 & p._cycle) && (p._time = u - p._time, o = p._yoyoEase || p.vars.yoyoEase, o && (p._yoyoEase || (o !== !0 || p._initted ? p._yoyoEase = o = o === !0 ? p._ease : o instanceof Ease ? o : Ease.map[o] : (o = p.vars.ease, p._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, p.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)), p.ratio = o ? 1 - o.getRatio((u - p._time) / u) : 0)), p._time > u ? p._time = u : p._time < 0 && (p._time = 0)), p._easeType && !o ? (k = p._time / u, l = p._easeType, m = p._easePower, (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), p.ratio = 1 === l ? 1 - k : 2 === l ? k : p._time / u < .5 ? k / 2 : 1 - k / 2) : o || (p.ratio = p._ease.getRatio(p._time / u))), r === p._time && !d && t === p._cycle)
                return void (s !== p._totalTime && p._onUpdate && (b || p._callback("onUpdate")));
            if (!p._initted) {
                if (p._init(), !p._initted || p._gc)
                    return;
                if (!d && p._firstPT && (p.vars.lazy !== !1 && p._duration || p.vars.lazy && !p._duration))
                    return p._time = r, p._totalTime = s, p._rawPrevTime = v, p._cycle = t, i.lazyTweens.push(p), void (p._lazy = [a, b]);
                !p._time || e || o ? e && this._ease._calcEnd && !o && (p.ratio = p._ease.getRatio(0 === p._time ? 0 : 1)) : p.ratio = p._ease.getRatio(p._time / u)
            }
            for (p._lazy !== !1 && (p._lazy = !1), p._active || !p._paused && p._time !== r && a >= 0 && (p._active = !0), 0 === s && (2 === p._initted && a > 0 && p._init(), p._startAt && (a >= 0 ? p._startAt.render(a, !0, d) : f || (f = "_dummyGS")), p.vars.onStart && (0 !== p._totalTime || 0 === u) && (b || p._callback("onStart"))), g = p._firstPT; g;)
                g.f ? g.t[g.p](g.c * p.ratio + g.s) : g.t[g.p] = g.c * p.ratio + g.s,
                g = g._next;
            p._onUpdate && (0 > a && p._startAt && p._startTime && p._startAt.render(a, !0, d), b || (p._totalTime !== s || f) && p._callback("onUpdate")),
            p._cycle !== t && (b || p._gc || p.vars.onRepeat && p._callback("onRepeat")),
            f && (!p._gc || d) && (0 > a && p._startAt && !p._onUpdate && p._startTime && p._startAt.render(a, !0, d), e && (p._timeline.autoRemoveChildren && p._enabled(!1, !1), p._active = !1), !b && p.vars[f] && p._callback(f), 0 === u && p._rawPrevTime === h && n !== h && (p._rawPrevTime = 0))
        },
        g.to = function(a, b, c) {
            return new g(a, b, c)
        },
        g.from = function(a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new g(a, b, c)
        },
        g.fromTo = function(a, b, c, d) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new g(a, b, d)
        },
        g.staggerTo = g.allTo = function(a, b, h, i, l, n, o) {
            var p,
                q,
                r,
                s,
                t = [],
                u = f(h.stagger || i),
                v = h.cycle,
                w = (h.startAt || m).cycle;
            for (k(a) || ("string" == typeof a && (a = c.selector(a) || a), j(a) && (a = d(a))), a = a || [], p = a.length - 1, r = 0; p >= r; r++) {
                q = {};
                for (s in h)
                    q[s] = h[s];
                if (v && (e(q, a, r), null != q.duration && (b = q.duration, delete q.duration)), w) {
                    w = q.startAt = {};
                    for (s in h.startAt)
                        w[s] = h.startAt[s];
                    e(q.startAt, a, r)
                }
                q.delay = u(r, a[r], a) + (q.delay || 0),
                r === p && l && (q.onComplete = function() {
                    h.onComplete && h.onComplete.apply(h.onCompleteScope || this, arguments),
                    l.apply(o || h.callbackScope || this, n || m)
                }),
                t[r] = new g(a[r], b, q)
            }
            return t
        },
        g.staggerFrom = g.allFrom = function(a, b, c, d, e, f, h) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, g.staggerTo(a, b, c, d, e, f, h)
        },
        g.staggerFromTo = g.allFromTo = function(a, b, c, d, e, f, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, g.staggerTo(a, b, d, e, f, h, i)
        },
        g.delayedCall = function(a, b, c, d, e) {
            return new g(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                useFrames: e,
                overwrite: 0
            })
        },
        g.set = function(a, b) {
            return new g(a, 0, b)
        },
        g.isTweening = function(a) {
            return c.getTweensOf(a, !0).length > 0
        };
        var n = function(a, b) {
                for (var d = [], e = 0, f = a._first; f;)
                    f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(n(f, b)), e = d.length),
                    f = f._next;
                return d
            },
            o = g.getAllTweens = function(b) {
                return n(a._rootTimeline, b).concat(n(a._rootFramesTimeline, b))
            };
        g.killAll = function(a, c, d, e) {
            null == c && (c = !0),
            null == d && (d = !0);
            var f,
                g,
                h,
                i = o(0 != e),
                j = i.length,
                k = c && d && e;
            for (h = 0; j > h; h++)
                g = i[h],
                (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        },
        g.killChildTweensOf = function(a, b) {
            if (null != a) {
                var e,
                    f,
                    h,
                    l,
                    m,
                    n = i.tweenLookup;
                if ("string" == typeof a && (a = c.selector(a) || a), j(a) && (a = d(a)), k(a))
                    for (l = a.length; --l > -1;)
                        g.killChildTweensOf(a[l], b);
                else {
                    e = [];
                    for (h in n)
                        for (f = n[h].target.parentNode; f;)
                            f === a && (e = e.concat(n[h].tweens)),
                            f = f.parentNode;
                    for (m = e.length, l = 0; m > l; l++)
                        b && e[l].totalTime(e[l].totalDuration()),
                        e[l]._enabled(!1, !1)
                }
            }
        };
        var p = function(a, c, d, e) {
            c = c !== !1,
            d = d !== !1,
            e = e !== !1;
            for (var f, g, h = o(e), i = c && d && e, j = h.length; --j > -1;)
                g = h[j],
                (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return g.pauseAll = function(a, b, c) {
            p(!0, a, b, c)
        }, g.resumeAll = function(a, b, c) {
            p(!1, a, b, c)
        }, g.globalTimeScale = function(b) {
            var d = a._rootTimeline,
                e = c.ticker.time;
            return arguments.length ? (b = b || h, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
        }, l.progress = function(a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, l.totalProgress = function(a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, l.time = function(a, b) {
            if (!arguments.length)
                return this._time;
            this._dirty && this.totalDuration();
            var c = this._duration,
                d = this._cycle,
                e = d * (c + this._repeatDelay);
            return a > c && (a = c), this.totalTime(this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a, b)
        }, l.duration = function(b) {
            return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }, l.totalDuration = function(a) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, l.repeat = function(a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, l.repeatDelay = function(a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, l.yoyo = function(a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, g
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
        var d = function(a) {
                b.call(this, a);
                var c,
                    d,
                    e = this,
                    f = e.vars;
                e._labels = {},
                e.autoRemoveChildren = !!f.autoRemoveChildren,
                e.smoothChildTiming = !!f.smoothChildTiming,
                e._sortChildren = !0,
                e._onUpdate = f.onUpdate;
                for (d in f)
                    c = f[d],
                    i(c) && -1 !== c.join("").indexOf("{self}") && (f[d] = e._swapSelfInParams(c));
                i(f.tweens) && e.add(f.tweens, 0, f.align, f.stagger)
            },
            e = 1e-8,
            f = c._internals,
            g = d._internals = {},
            h = f.isSelector,
            i = f.isArray,
            j = f.lazyTweens,
            k = f.lazyRender,
            l = _gsScope._gsDefine.globals,
            m = function(a) {
                var b,
                    c = {};
                for (b in a)
                    c[b] = a[b];
                return c
            },
            n = function(a, b, c) {
                var d,
                    e,
                    f = a.cycle;
                for (d in f)
                    e = f[d],
                    a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length];
                delete a.cycle
            },
            o = g.pauseCallback = function() {},
            p = function(a) {
                var b,
                    c = [],
                    d = a.length;
                for (b = 0; b !== d; c.push(a[b++]))
                    ;
                return c
            },
            q = function(a, b, c, d) {
                var e = "immediateRender";
                return e in b || (b[e] = !(c && c[e] === !1 || d)), b
            },
            r = function(a) {
                if ("function" == typeof a)
                    return a;
                var b = "object" == typeof a ? a : {
                        each: a
                    },
                    c = b.ease,
                    d = b.from || 0,
                    e = b.base || 0,
                    f = {},
                    g = isNaN(d),
                    h = b.axis,
                    i = {
                        center: .5,
                        end: 1
                    }[d] || 0;
                return function(a, j, k) {
                    var l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        s,
                        t,
                        u = (k || b).length,
                        v = f[u];
                    if (!v) {
                        if (t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0], !t) {
                            for (r = -(1 / 0); r < (r = k[t++].getBoundingClientRect().left) && u > t;)
                                ;
                            t--
                        }
                        for (v = f[u] = [], l = g ? Math.min(t, u) * i - .5 : d % t, m = g ? u * i / t - .5 : d / t | 0, r = 0, s = 1 / 0, q = 0; u > q; q++)
                            n = q % t - l,
                            o = m - (q / t | 0),
                            v[q] = p = h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o),
                            p > r && (r = p),
                            s > p && (s = p);
                        v.max = r - s,
                        v.min = s,
                        v.v = u = b.amount || b.each * (t > u ? u : h ? "y" === h ? u / t : t : Math.max(t, u / t)) || 0,
                        v.b = 0 > u ? e - u : e
                    }
                    return u = (v[a] - v.min) / v.max, v.b + (c ? c.getRatio(u) : u) * v.v
                }
            },
            s = d.prototype = new b;
        return d.version = "2.1.2", d.distribute = r, s.constructor = d, s.kill()._gc = s._forcingPlayhead = s._hasPause = !1, s.to = function(a, b, d, e) {
            var f = d.repeat && l.TweenMax || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, s.from = function(a, b, d, e) {
            return this.add((d.repeat && l.TweenMax || c).from(a, b, q(this, d)), e)
        }, s.fromTo = function(a, b, d, e, f) {
            var g = e.repeat && l.TweenMax || c;
            return e = q(this, e, d), b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, s.staggerTo = function(a, b, e, f, g, i, j, k) {
            var l,
                o,
                q = new d({
                    onComplete: i,
                    onCompleteParams: j,
                    callbackScope: k,
                    smoothChildTiming: this.smoothChildTiming
                }),
                s = r(e.stagger || f),
                t = e.startAt,
                u = e.cycle;
            for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), o = 0; o < a.length; o++)
                l = m(e),
                t && (l.startAt = m(t), t.cycle && n(l.startAt, a, o)),
                u && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)),
                q.to(a[o], b, l, s(o, a[o], a));
            return this.add(q, g)
        }, s.staggerFrom = function(a, b, c, d, e, f, g, h) {
            return c.runBackwards = !0, this.staggerTo(a, b, q(this, c), d, e, f, g, h)
        }, s.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
            return d.startAt = c, this.staggerTo(a, b, q(this, d, c), e, f, g, h, i)
        }, s.call = function(a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e)
        }, s.set = function(a, b, d) {
            return this.add(new c(a, 0, q(this, b, null, !0)), d)
        }, d.exportRoot = function(a, b) {
            a = a || {},
            null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e,
                f,
                g,
                h,
                i = new d(a),
                j = i._timeline;
            for (null == b && (b = !0), j._remove(i, !0), i._startTime = 0, i._rawPrevTime = i._time = i._totalTime = j._time, g = j._first; g;)
                h = g._next,
                b && g instanceof c && g.target === g.vars.onComplete || (f = g._startTime - g._delay, 0 > f && (e = 1), i.add(g, f)),
                g = h;
            return j.add(i, 0), e && i.totalDuration(), i
        }, s.add = function(e, f, g, h) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = this;
            if ("number" != typeof f && (f = p._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                if (e instanceof Array || e && e.push && i(e)) {
                    for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++)
                        i(m = e[l]) && (m = new d({
                            tweens: m
                        })),
                        p.add(m, j),
                        "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())),
                        j += h;
                    return p._uncache(!0)
                }
                if ("string" == typeof e)
                    return p.addLabel(e, f);
                if ("function" != typeof e)
                    throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(p, e, f), (e._time || !e._duration && e._initted) && (j = (p.rawTime() - e._startTime) * e._timeScale, (!e._duration || Math.abs(Math.max(0, Math.min(e.totalDuration(), j))) - e._totalTime > 1e-5) && e.render(j, !1, !1)), (p._gc || p._time === p._duration) && !p._paused && p._duration < p.duration())
                for (n = p, o = n.rawTime() > e._startTime; n._timeline;)
                    o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1),
                    n = n._timeline;
            return p
        }, s.remove = function(b) {
            if (b instanceof a) {
                this._remove(b, !1);
                var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
            }
            if (b instanceof Array || b && b.push && i(b)) {
                for (var d = b.length; --d > -1;)
                    this.remove(b[d]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, s._remove = function(a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, s.append = function(a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, s.insert = s.insertMultiple = function(a, b, c, d) {
            return this.add(a, b || 0, c, d)
        }, s.appendMultiple = function(a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, s.addLabel = function(a, b) {
            return this._labels[a] = this._parseTimeOrLabel(b), this
        }, s.addPause = function(a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, s.removeLabel = function(a) {
            return delete this._labels[a], this
        }, s.getLabelTime = function(a) {
            return null != this._labels[a] ? this._labels[a] : -1
        }, s._parseTimeOrLabel = function(b, c, d, e) {
            var f,
                g;
            if (e instanceof a && e.timeline === this)
                this.remove(e);
            else if (e && (e instanceof Array || e.push && i(e)))
                for (g = e.length; --g > -1;)
                    e[g] instanceof a && e[g].timeline === this && this.remove(e[g]);
            if (f = "number" != typeof b || c ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof c)
                return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d);
            if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b])
                null == b && (b = f);
            else {
                if (g = b.indexOf("="), -1 === g)
                    return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)),
                b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f
            }
            return Number(b) + c
        }, s.seek = function(a, b) {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, s.stop = function() {
            return this.paused(!0)
        }, s.gotoAndPlay = function(a, b) {
            return this.play(a, b)
        }, s.gotoAndStop = function(a, b) {
            return this.pause(a, b)
        }, s.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
                f,
                g,
                h,
                i,
                l,
                m,
                n,
                o = this,
                p = o._time,
                q = o._dirty ? o.totalDuration() : o._totalDuration,
                r = o._startTime,
                s = o._timeScale,
                t = o._paused;
            if (p !== o._time && (a += o._time - p), a >= q - e && a >= 0)
                o._totalTime = o._time = q,
                o._reversed || o._hasPausedChild() || (f = !0, h = "onComplete", i = !!o._timeline.autoRemoveChildren, 0 === o._duration && (0 >= a && a >= -e || o._rawPrevTime < 0 || o._rawPrevTime === e) && o._rawPrevTime !== a && o._first && (i = !0, o._rawPrevTime > e && (h = "onReverseComplete"))),
                o._rawPrevTime = o._duration || !b || a || o._rawPrevTime === a ? a : e,
                a = q + 1e-4;
            else if (e > a)
                if (o._totalTime = o._time = 0, a > -e && (a = 0), (0 !== p || 0 === o._duration && o._rawPrevTime !== e && (o._rawPrevTime > 0 || 0 > a && o._rawPrevTime >= 0)) && (h = "onReverseComplete", f = o._reversed), 0 > a)
                    o._active = !1,
                    o._timeline.autoRemoveChildren && o._reversed ? (i = f = !0, h = "onReverseComplete") : o._rawPrevTime >= 0 && o._first && (i = !0),
                    o._rawPrevTime = a;
                else {
                    if (o._rawPrevTime = o._duration || !b || a || o._rawPrevTime === a ? a : e, 0 === a && f)
                        for (d = o._first; d && 0 === d._startTime;)
                            d._duration || (f = !1),
                            d = d._next;
                    a = 0,
                    o._initted || (i = !0)
                }
            else {
                if (o._hasPause && !o._forcingPlayhead && !b) {
                    if (a >= p)
                        for (d = o._first; d && d._startTime <= a && !l;)
                            d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === o._rawPrevTime || (l = d),
                            d = d._next;
                    else
                        for (d = o._last; d && d._startTime >= a && !l;)
                            d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d),
                            d = d._prev;
                    l && (o._time = o._totalTime = a = l._startTime, n = o._startTime + a / o._timeScale)
                }
                o._totalTime = o._time = o._rawPrevTime = a
            }
            if (o._time !== p && o._first || c || i || l) {
                if (o._initted || (o._initted = !0), o._active || !o._paused && o._time !== p && a > 0 && (o._active = !0), 0 === p && o.vars.onStart && (0 === o._time && o._duration || b || o._callback("onStart")), m = o._time, m >= p)
                    for (d = o._first; d && (g = d._next, m === o._time && (!o._paused || t));)
                        (d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && (o.pause(), o._pauseTime = n), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                        d = g;
                else
                    for (d = o._last; d && (g = d._prev, m === o._time && (!o._paused || t));) {
                        if (d._active || d._startTime <= p && !d._paused && !d._gc) {
                            if (l === d) {
                                for (l = d._prev; l && l.endTime() > o._time;)
                                    l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c),
                                    l = l._prev;
                                l = null,
                                o.pause(),
                                o._pauseTime = n
                            }
                            d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                        }
                        d = g
                    }
                o._onUpdate && (b || (j.length && k(), o._callback("onUpdate"))),
                h && (o._gc || (r === o._startTime || s !== o._timeScale) && (0 === o._time || q >= o.totalDuration()) && (f && (j.length && k(), o._timeline.autoRemoveChildren && o._enabled(!1, !1), o._active = !1), !b && o.vars[h] && o._callback(h)))
            }
        }, s._hasPausedChild = function() {
            for (var a = this._first; a;) {
                if (a._paused || a instanceof d && a._hasPausedChild())
                    return !0;
                a = a._next
            }
            return !1
        }, s.getChildren = function(a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g;)
                g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))),
                g = g._next;
            return f
        }, s.getTweensOf = function(a, b) {
            var d,
                e,
                f = this._gc,
                g = [],
                h = 0;
            for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)
                (d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g
        }, s.recent = function() {
            return this._recent
        }, s._contains = function(a) {
            for (var b = a.timeline; b;) {
                if (b === this)
                    return !0;
                b = b.timeline
            }
            return !1
        }, s.shiftChildren = function(a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e;)
                e._startTime >= c && (e._startTime += a),
                e = e._next;
            if (b)
                for (d in f)
                    f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }, s._kill = function(a, b) {
            if (!a && !b)
                return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;)
                c[d]._kill(a, b) && (e = !0);
            return e
        }, s.clear = function(a) {
            var b = this.getChildren(!1, !0, !0),
                c = b.length;
            for (this._time = this._totalTime = 0; --c > -1;)
                b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, s.invalidate = function() {
            for (var b = this._first; b;)
                b.invalidate(),
                b = b._next;
            return a.prototype.invalidate.call(this)
        }, s._enabled = function(a, c) {
            if (a === this._gc)
                for (var d = this._first; d;)
                    d._enabled(a, !0),
                    d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }, s.totalTime = function(b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, s.duration = function(a) {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, s.totalDuration = function(a) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var b, c, d = 0, e = this, f = e._last, g = 999999999999; f;)
                        b = f._prev,
                        f._dirty && f.totalDuration(),
                        f._startTime > g && e._sortChildren && !f._paused && !e._calculatingDuration ? (e._calculatingDuration = 1, e.add(f, f._startTime - f._delay), e._calculatingDuration = 0) : g = f._startTime,
                        f._startTime < 0 && !f._paused && (d -= f._startTime, e._timeline.smoothChildTiming && (e._startTime += f._startTime / e._timeScale, e._time -= f._startTime, e._totalTime -= f._startTime, e._rawPrevTime -= f._startTime), e.shiftChildren(-f._startTime, !1, -9999999999), g = 0),
                        c = f._startTime + f._totalDuration / f._timeScale,
                        c > d && (d = c),
                        f = b;
                    e._duration = e._totalDuration = d,
                    e._dirty = !1
                }
                return this._totalDuration
            }
            return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, s.paused = function(b) {
            if (b === !1 && this._paused)
                for (var c = this._first; c;)
                    c._startTime === this._time && "isPause" === c.data && (c._rawPrevTime = 0),
                    c = c._next;
            return a.prototype.paused.apply(this, arguments)
        }, s.usesFrames = function() {
            for (var b = this._timeline; b._timeline;)
                b = b._timeline;
            return b === a._rootFramesTimeline
        }, s.rawTime = function(a) {
            return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
        }, d
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a, b, c) {
        var d = function(b) {
                a.call(this, b),
                this._repeat = this.vars.repeat || 0,
                this._repeatDelay = this.vars.repeatDelay || 0,
                this._cycle = 0,
                this._yoyo = !!this.vars.yoyo,
                this._dirty = !0
            },
            e = 1e-8,
            f = b._internals,
            g = f.lazyTweens,
            h = f.lazyRender,
            i = _gsScope._gsDefine.globals,
            j = new c(null, null, 1, 0),
            k = d.prototype = new a;
        return k.constructor = d, k.kill()._gc = !1, d.version = "2.1.2", k.invalidate = function() {
            return this._yoyo = !!this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
        }, k.addCallback = function(a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c)
        }, k.removeCallback = function(a, b) {
            if (a)
                if (null == b)
                    this._kill(null, a);
                else
                    for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;)
                        c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this
        }, k.removePause = function(b) {
            return this.removeCallback(a._internals.pauseCallback, b)
        }, k.tweenTo = function(a, c) {
            c = c || {};
            var d,
                e,
                f,
                g = {
                    ease: j,
                    useFrames: this.usesFrames(),
                    immediateRender: !1,
                    lazy: !1
                },
                h = c.repeat && i.TweenMax || b;
            for (e in c)
                g[e] = c[e];
            return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function() {
                f.target.paused(!0),
                f.vars.time === f.target.time() || d !== f.duration() || f.isFromTo || f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale).render(f.time(), !0, !0),
                c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || [])
            }, f
        }, k.tweenFromTo = function(a, b, c) {
            c = c || {},
            a = this._parseTimeOrLabel(a),
            c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this
            },
            c.immediateRender = c.immediateRender !== !1;
            var d = this.tweenTo(b, c);
            return d.isFromTo = 1, d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }, k.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d,
                f,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p = this,
                q = p._time,
                r = p._dirty ? p.totalDuration() : p._totalDuration,
                s = p._duration,
                t = p._totalTime,
                u = p._startTime,
                v = p._timeScale,
                w = p._rawPrevTime,
                x = p._paused,
                y = p._cycle;
            if (q !== p._time && (a += p._time - q), a >= r - e && a >= 0)
                p._locked || (p._totalTime = r, p._cycle = p._repeat),
                p._reversed || p._hasPausedChild() || (f = !0, j = "onComplete", k = !!p._timeline.autoRemoveChildren, 0 === p._duration && (0 >= a && a >= -e || 0 > w || w === e) && w !== a && p._first && (k = !0, w > e && (j = "onReverseComplete"))),
                p._rawPrevTime = p._duration || !b || a || p._rawPrevTime === a ? a : e,
                p._yoyo && 1 & p._cycle ? p._time = a = 0 : (p._time = s, a = s + 1e-4);
            else if (e > a)
                if (p._locked || (p._totalTime = p._cycle = 0), p._time = 0, a > -e && (a = 0), (0 !== q || 0 === s && w !== e && (w > 0 || 0 > a && w >= 0) && !p._locked) && (j = "onReverseComplete", f = p._reversed), 0 > a)
                    p._active = !1,
                    p._timeline.autoRemoveChildren && p._reversed ? (k = f = !0, j = "onReverseComplete") : w >= 0 && p._first && (k = !0),
                    p._rawPrevTime = a;
                else {
                    if (p._rawPrevTime = s || !b || a || p._rawPrevTime === a ? a : e, 0 === a && f)
                        for (d = p._first; d && 0 === d._startTime;)
                            d._duration || (f = !1),
                            d = d._next;
                    a = 0,
                    p._initted || (k = !0)
                }
            else if (0 === s && 0 > w && (k = !0), p._time = p._rawPrevTime = a, p._locked || (p._totalTime = a, 0 !== p._repeat && (l = s + p._repeatDelay, p._cycle = p._totalTime / l >> 0, p._cycle && p._cycle === p._totalTime / l && a >= t && p._cycle--, p._time = p._totalTime - p._cycle * l, p._yoyo && 1 & p._cycle && (p._time = s - p._time), p._time > s ? (p._time = s, a = s + 1e-4) : p._time < 0 ? p._time = a = 0 : a = p._time)), p._hasPause && !p._forcingPlayhead && !b) {
                if (a = p._time, a >= q || p._repeat && y !== p._cycle)
                    for (d = p._first; d && d._startTime <= a && !m;)
                        d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === p._rawPrevTime || (m = d),
                        d = d._next;
                else
                    for (d = p._last; d && d._startTime >= a && !m;)
                        d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d),
                        d = d._prev;
                m && (o = p._startTime + m._startTime / p._timeScale, m._startTime < s && (p._time = p._rawPrevTime = a = m._startTime, p._totalTime = a + p._cycle * (p._totalDuration + p._repeatDelay)))
            }
            if (p._cycle !== y && !p._locked) {
                var z = p._yoyo && 0 !== (1 & y),
                    A = z === (p._yoyo && 0 !== (1 & p._cycle)),
                    B = p._totalTime,
                    C = p._cycle,
                    D = p._rawPrevTime,
                    E = p._time;
                if (p._totalTime = y * s, p._cycle < y ? z = !z : p._totalTime += s, p._time = q, p._rawPrevTime = 0 === s ? w - 1e-4 : w, p._cycle = y, p._locked = !0, q = z ? 0 : s, p.render(q, b, 0 === s), b || p._gc || p.vars.onRepeat && (p._cycle = C, p._locked = !1, p._callback("onRepeat")), q !== p._time)
                    return;
                if (A && (p._cycle = y, p._locked = !0, q = z ? s + 1e-4 : -1e-4, p.render(q, !0, !1)), p._locked = !1, p._paused && !x)
                    return;
                p._time = E,
                p._totalTime = B,
                p._cycle = C,
                p._rawPrevTime = D
            }
            if (!(p._time !== q && p._first || c || k || m))
                return void (t !== p._totalTime && p._onUpdate && (b || p._callback("onUpdate")));
            if (p._initted || (p._initted = !0), p._active || !p._paused && p._totalTime !== t && a > 0 && (p._active = !0), 0 === t && p.vars.onStart && (0 === p._totalTime && p._totalDuration || b || p._callback("onStart")), n = p._time, n >= q)
                for (d = p._first; d && (i = d._next, n === p._time && (!p._paused || x));)
                    (d._active || d._startTime <= p._time && !d._paused && !d._gc) && (m === d && (p.pause(), p._pauseTime = o), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                    d = i;
            else
                for (d = p._last; d && (i = d._prev, n === p._time && (!p._paused || x));) {
                    if (d._active || d._startTime <= q && !d._paused && !d._gc) {
                        if (m === d) {
                            for (m = d._prev; m && m.endTime() > p._time;)
                                m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c),
                                m = m._prev;
                            m = null,
                            p.pause(),
                            p._pauseTime = o
                        }
                        d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                    }
                    d = i
                }
            p._onUpdate && (b || (g.length && h(), p._callback("onUpdate"))),
            j && (p._locked || p._gc || (u === p._startTime || v !== p._timeScale) && (0 === p._time || r >= p.totalDuration()) && (f && (g.length && h(), p._timeline.autoRemoveChildren && p._enabled(!1, !1), p._active = !1), !b && p.vars[j] && p._callback(j)))
        }, k.getActive = function(a, b, c) {
            var d,
                e,
                f = [],
                g = this.getChildren(a || null == a, b || null == a, !!c),
                h = 0,
                i = g.length;
            for (d = 0; i > d; d++)
                e = g[d],
                e.isActive() && (f[h++] = e);
            return f
        }, k.getLabelAfter = function(a) {
            a || 0 !== a && (a = this._time);
            var b,
                c = this.getLabelsArray(),
                d = c.length;
            for (b = 0; d > b; b++)
                if (c[b].time > a)
                    return c[b].name;
            return null
        }, k.getLabelBefore = function(a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                if (b[c].time < a)
                    return b[c].name;
            return null
        }, k.getLabelsArray = function() {
            var a,
                b = [],
                c = 0;
            for (a in this._labels)
                b[c++] = {
                    time: this._labels[a],
                    name: a
                };
            return b.sort(function(a, b) {
                return a.time - b.time
            }), b
        }, k.invalidate = function() {
            return this._locked = !1, a.prototype.invalidate.call(this)
        }, k.progress = function(a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0
        }, k.totalProgress = function(a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0
        }, k.totalDuration = function(b) {
            return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, k.time = function(a, b) {
            if (!arguments.length)
                return this._time;
            this._dirty && this.totalDuration();
            var c = this._duration,
                d = this._cycle,
                e = d * (c + this._repeatDelay);
            return a > c && (a = c), this.totalTime(this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a, b)
        }, k.repeat = function(a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function(a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function(a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, k.currentLabel = function(a) {
            return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + e)
        }, d
    }, !0),
    function() {
        var a = 180 / Math.PI,
            b = [],
            c = [],
            d = [],
            e = {},
            f = _gsScope._gsDefine.globals,
            g = function(a, b, c, d) {
                c === d && (c = d - (d - b) / 1e6),
                a === b && (b = a + (c - a) / 1e6),
                this.a = a,
                this.b = b,
                this.c = c,
                this.d = d,
                this.da = d - a,
                this.ca = c - a,
                this.ba = b - a
            },
            h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            i = function(a, b, c, d) {
                var e = {
                        a: a
                    },
                    f = {},
                    g = {},
                    h = {
                        c: d
                    },
                    i = (a + b) / 2,
                    j = (b + c) / 2,
                    k = (c + d) / 2,
                    l = (i + j) / 2,
                    m = (j + k) / 2,
                    n = (m - l) / 8;
                return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
            },
            j = function(a, e, f, g, h) {
                var j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v,
                    w = a.length - 1,
                    x = 0,
                    y = a[0].a;
                for (j = 0; w > j; j++)
                    n = a[x],
                    k = n.a,
                    l = n.d,
                    m = a[x + 1].d,
                    h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2),
                    o += q,
                    p += q,
                    n.c = r = o,
                    0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a),
                    n.da = l - k,
                    n.ca = r - k,
                    n.ba = y - k,
                    f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++,
                    y = p;
                n = a[x],
                n.b = y,
                n.c = y + .4 * (n.d - y),
                n.da = n.d - n.a,
                n.ca = n.c - n.a,
                n.ba = y - n.a,
                f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
            },
            k = function(a, d, e, f) {
                var h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n = [];
                if (f)
                    for (a = [f].concat(a), i = a.length; --i > -1;)
                        "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                if (h = a.length - 2, 0 > h)
                    return n[0] = new g(a[0][d], 0, 0, a[0][d]), n;
                for (i = 0; h > i; i++)
                    j = a[i][d],
                    k = a[i + 1][d],
                    n[i] = new g(j, 0, 0, k),
                    e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
                return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
            },
            l = function(a, f, g, i, l, m) {
                var n,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v = {},
                    w = [],
                    x = m || a[0];
                l = "string" == typeof l ? "," + l + "," : h,
                null == f && (f = 1);
                for (o in a[0])
                    w.push(o);
                if (a.length > 1) {
                    for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
                        if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                            t = !1;
                            break
                        }
                    t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                }
                for (b.length = c.length = d.length = 0, n = w.length; --n > -1;)
                    o = w[n],
                    e[o] = -1 !== l.indexOf("," + o + ","),
                    v[o] = k(a, o, e[o], m);
                for (n = b.length; --n > -1;)
                    b[n] = Math.sqrt(b[n]),
                    c[n] = Math.sqrt(c[n]);
                if (!i) {
                    for (n = w.length; --n > -1;)
                        if (e[o])
                            for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++)
                                r = p[q + 1].da / c[q] + p[q].da / b[q] || 0,
                                d[q] = (d[q] || 0) + r * r;
                    for (n = d.length; --n > -1;)
                        d[n] = Math.sqrt(d[n]);
                }
                for (n = w.length, q = g ? 4 : 1; --n > -1;)
                    o = w[n],
                    p = v[o],
                    j(p, f, g, i, e[o]),
                    t && (p.splice(0, q), p.splice(p.length - q, q));
                return v
            },
            m = function(a, b, c) {
                b = b || "soft";
                var d,
                    e,
                    f,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p = {},
                    q = "cubic" === b ? 3 : 2,
                    r = "soft" === b,
                    s = [];
                if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1)
                    throw "invalid Bezier data";
                for (m in a[0])
                    s.push(m);
                for (j = s.length; --j > -1;) {
                    for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++)
                        d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o),
                        r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                        i[n++] = d;
                    for (l = n - q + 1, n = 0, k = 0; l > k; k += q)
                        d = i[k],
                        e = i[k + 1],
                        f = i[k + 2],
                        h = 2 === q ? 0 : i[k + 3],
                        i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                    i.length = n
                }
                return p
            },
            n = function(a, b, c) {
                for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
                    for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++)
                        j = o * k,
                        l = 1 - j,
                        d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j),
                        n = p * c + k - 1,
                        b[n] = (b[n] || 0) + d * d
            },
            o = function(a, b) {
                b = b >> 0 || 6;
                var c,
                    d,
                    e,
                    f,
                    g = [],
                    h = [],
                    i = 0,
                    j = 0,
                    k = b - 1,
                    l = [],
                    m = [];
                for (c in a)
                    n(a[c], g, b);
                for (e = g.length, d = 0; e > d; d++)
                    i += Math.sqrt(g[d]),
                    f = d % b,
                    m[f] = i,
                    f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
                return {
                    length: j,
                    lengths: h,
                    segments: l
                }
            },
            p = _gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.8",
                API: 2,
                global: !0,
                init: function(a, b, c) {
                    this._target = a,
                    b instanceof Array && (b = {
                        values: b
                    }),
                    this._func = {},
                    this._mod = {},
                    this._props = [],
                    this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i = b.values || [],
                        j = {},
                        k = i[0],
                        n = b.autoRotate || c.vars.orientToBezier;
                    this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null;
                    for (d in k)
                        this._props.push(d);
                    for (f = this._props.length; --f > -1;)
                        d = this._props[f],
                        this._overwriteProps.push(d),
                        e = this._func[d] = "function" == typeof a[d],
                        j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]),
                        h || j[d] !== i[0][d] && (h = j);
                    if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                        var p = o(this._beziers, this._timeRes);
                        this._length = p.length,
                        this._lengths = p.lengths,
                        this._segments = p.segments,
                        this._l1 = this._li = this._s1 = this._si = 0,
                        this._l2 = this._lengths[0],
                        this._curSeg = this._segments[0],
                        this._s2 = this._curSeg[0],
                        this._prec = 1 / this._curSeg.length
                    }
                    if (n = this._autoRotate)
                        for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                            for (g = 0; 3 > g; g++)
                                d = n[f][g],
                                this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                            d = n[f][2],
                            this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0,
                            this._overwriteProps.push(d)
                        }
                    return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                },
                set: function(b) {
                    var c,
                        d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m = this._segCount,
                        n = this._func,
                        o = this._target,
                        p = b !== this._startRatio;
                    if (this._timeRes) {
                        if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                            for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;)
                                ;
                            this._l1 = k[e - 1],
                            this._li = e,
                            this._curSeg = l = this._segments[e],
                            this._s2 = l[this._s1 = this._si = 0]
                        } else if (b < this._l1 && e > 0) {
                            for (; e > 0 && (this._l1 = k[--e]) >= b;)
                                ;
                            0 === e && b < this._l1 ? this._l1 = 0 : e++,
                            this._l2 = k[e],
                            this._li = e,
                            this._curSeg = l = this._segments[e],
                            this._s1 = l[(this._si = l.length - 1) - 1] || 0,
                            this._s2 = l[this._si]
                        }
                        if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
                            for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;)
                                ;
                            this._s1 = l[e - 1],
                            this._si = e
                        } else if (b < this._s1 && e > 0) {
                            for (; e > 0 && (this._s1 = l[--e]) >= b;)
                                ;
                            0 === e && b < this._s1 ? this._s1 = 0 : e++,
                            this._s2 = l[e],
                            this._si = e
                        }
                        h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else
                        c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0,
                        h = (b - c * (1 / m)) * m;
                    for (d = 1 - h, e = this._props.length; --e > -1;)
                        f = this._props[e],
                        g = this._beziers[f][c],
                        i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a,
                        this._mod[f] && (i = this._mod[f](i, o)),
                        n[f] ? o[f](i) : o[f] = i;
                    if (this._autoRotate) {
                        var q,
                            r,
                            s,
                            t,
                            u,
                            v,
                            w,
                            x = this._autoRotate;
                        for (e = x.length; --e > -1;)
                            f = x[e][2],
                            v = x[e][3] || 0,
                            w = x[e][4] === !0 ? 1 : a,
                            g = this._beziers[x[e][0]],
                            q = this._beziers[x[e][1]],
                            g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
                    }
                }
            }),
            q = p.prototype;
        p.bezierThrough = l,
        p.cubicToQuadratic = i,
        p._autoCSS = !0,
        p.quadraticToCubic = function(a, b, c) {
            return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
        },
        p._cssRegister = function() {
            var a = f.CSSPlugin;
            if (a) {
                var b = a._internals,
                    c = b._parseToProxy,
                    d = b._setPluginRatio,
                    e = b.CSSPropTween;
                b._registerComplexSpecialProp("bezier", {
                    parser: function(a, b, f, g, h, i) {
                        b instanceof Array && (b = {
                            values: b
                        }),
                        i = new p;
                        var j,
                            k,
                            l,
                            m = b.values,
                            n = m.length - 1,
                            o = [],
                            q = {};
                        if (0 > n)
                            return h;
                        for (j = 0; n >= j; j++)
                            l = c(a, m[j], g, h, i, n !== j),
                            o[j] = l.end;
                        for (k in b)
                            q[k] = b[k];
                        return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h
                    }
                })
            }
        },
        q._mod = function(a) {
            for (var b, c = this._overwriteProps, d = c.length; --d > -1;)
                b = a[c[d]],
                b && "function" == typeof b && (this._mod[c[d]] = b)
        },
        q._kill = function(a) {
            var b,
                c,
                d = this._props;
            for (b in this._beziers)
                if (b in a)
                    for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;)
                        d[c] === b && d.splice(c, 1);
            if (d = this._autoRotate)
                for (c = d.length; --c > -1;)
                    a[d[c][2]] && d.splice(c, 1);
            return this._super._kill.call(this, a)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
        var c,
            d,
            e,
            f,
            g = function() {
                a.call(this, "css"),
                this._overwriteProps.length = 0,
                this.setRatio = g.prototype.setRatio
            },
            h = _gsScope._gsDefine.globals,
            i = {},
            j = g.prototype = new a("css");
        j.constructor = g,
        g.version = "2.1.0",
        g.API = 2,
        g.defaultTransformPerspective = 0,
        g.defaultSkewType = "compensated",
        g.defaultSmoothOrigin = !0,
        j = "px",
        g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: ""
        };
        var k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            w = /(?:\d|\-|\+|=|#|\.)*/g,
            x = /opacity *= *([^)]*)/i,
            y = /opacity:([^;]*)/i,
            z = /alpha\(opacity *=.+?\)/i,
            A = /^(rgb|hsl)/,
            B = /([A-Z])/g,
            C = /-([a-z])/gi,
            D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            E = function(a, b) {
                return b.toUpperCase()
            },
            F = /(?:Left|Right|Width)/i,
            G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            I = /,(?=[^\)]*(?:\(|$))/gi,
            J = /[\s,\(]/i,
            K = Math.PI / 180,
            L = 180 / Math.PI,
            M = {},
            N = {
                style: {}
            },
            O = _gsScope.document || {
                createElement: function() {
                    return N
                }
            },
            P = function(a, b) {
                return b && O.createElementNS ? O.createElementNS(b, a) : O.createElement(a)
            },
            Q = P("div"),
            R = P("img"),
            S = g._internals = {
                _specialProps: i
            },
            T = (_gsScope.navigator || {}).userAgent || "",
            U = function() {
                var a = T.indexOf("Android"),
                    b = P("a");
                return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
            }(),
            V = function(a) {
                return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            W = function(a) {
                _gsScope.console && console.log(a)
            },
            X = "",
            Y = "",
            Z = function(a, b) {
                b = b || Q;
                var c,
                    d,
                    e = b.style;
                if (void 0 !== e[a])
                    return a;
                for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];)
                    ;
                return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null
            },
            $ = "undefined" != typeof window ? window : O.defaultView || {
                getComputedStyle: function() {}
            },
            _ = function(a) {
                return $.getComputedStyle(a)
            },
            aa = g.getStyle = function(a, b, c, d, e) {
                var f;
                return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || _(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
            },
            ba = S.convertToPixels = function(a, c, d, e, f) {
                if ("px" === e || !e && "lineHeight" !== c)
                    return d;
                if ("auto" === e || !d)
                    return 0;
                var h,
                    i,
                    j,
                    k = F.test(c),
                    l = a,
                    m = Q.style,
                    n = 0 > d,
                    o = 1 === d;
                if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e)
                    if ("%" === e && -1 !== c.indexOf("border"))
                        h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                    else {
                        if (m.cssText = "border:0 solid red;position:" + aa(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e)
                            m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                        else {
                            if (l = a.parentNode || O.body, -1 !== aa(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j)
                                return i.width * d / 100;
                            m[k ? "width" : "height"] = d + e
                        }
                        l.appendChild(Q),
                        h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]),
                        l.removeChild(Q),
                        k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100),
                        0 !== h || f || (h = ba(a, c, d, e, !0))
                    }
                else
                    i = _(a).lineHeight,
                    a.style.lineHeight = d,
                    h = parseFloat(_(a).lineHeight),
                    a.style.lineHeight = i;
                return o && (h /= 100), n ? -h : h
            },
            ca = S.calculateOffset = function(a, b, c) {
                if ("absolute" !== aa(a, "position", c))
                    return 0;
                var d = "left" === b ? "Left" : "Top",
                    e = aa(a, "margin" + d, c);
                return a["offset" + d] - (ba(a, b, parseFloat(e), e.replace(w, "")) || 0)
            },
            da = function(a, b) {
                var c,
                    d,
                    e,
                    f = {};
                if (b = b || _(a, null))
                    if (c = b.length)
                        for (; --c > -1;)
                            e = b[c],
                            (-1 === e.indexOf("-transform") || Ea === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
                    else
                        for (c in b)
                            (-1 === c.indexOf("Transform") || Da === c) && (f[c] = b[c]);
                else if (b = a.currentStyle || a.style)
                    for (c in b)
                        "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
                return U || (f.opacity = V(a)), d = Sa(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Ga && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
            },
            ea = function(a, b, c, d, e) {
                var f,
                    g,
                    h,
                    i = {},
                    j = a.style;
                for (g in c)
                    "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ca(a, g), void 0 !== j[g] && (h = new ta(j, g, j[g], h)));
                if (d)
                    for (g in d)
                        "className" !== g && (i[g] = d[g]);
                return {
                    difs: i,
                    firstMPT: h
                }
            },
            fa = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            ga = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            ha = function(a, b, c) {
                if ("svg" === (a.nodeName + "").toLowerCase())
                    return (c || _(a))[b] || 0;
                if (a.getCTM && Pa(a))
                    return a.getBBox()[b] || 0;
                var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                    e = fa[b],
                    f = e.length;
                for (c = c || _(a, null); --f > -1;)
                    d -= parseFloat(aa(a, "padding" + e[f], c, !0)) || 0,
                    d -= parseFloat(aa(a, "border" + e[f] + "Width", c, !0)) || 0;
                return d
            },
            ia = function(a, b) {
                if ("contain" === a || "auto" === a || "auto auto" === a)
                    return a + " ";
                (null == a || "" === a) && (a = "0 0");
                var c,
                    d = a.split(" "),
                    e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
                    f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                if (d.length > 3 && !b) {
                    for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++)
                        a.push(ia(d[c]));
                    return a.join(",")
                }
                return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a
            },
            ja = function(a, b) {
                return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
            },
            ka = function(a, b) {
                "function" == typeof a && (a = a(r, q));
                var c = "string" == typeof a && "=" === a.charAt(1);
                return "string" == typeof a && "v" === a.charAt(a.length - 2) && (a = (c ? a.substr(0, 2) : 0) + window["inner" + ("vh" === a.substr(-2) ? "Height" : "Width")] * (parseFloat(c ? a.substr(2) : a) / 100)), null == a ? b : c ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
            },
            la = function(a, b, c, d) {
                var e,
                    f,
                    g,
                    h,
                    i,
                    j = 1e-6;
                return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
            },
            ma = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            na = function(a, b, c) {
                return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
            },
            oa = g.parseColor = function(a, b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m;
                if (a)
                    if ("number" == typeof a)
                        c = [a >> 16, a >> 8 & 255, 255 & a];
                    else {
                        if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ma[a])
                            c = ma[a];
                        else if ("#" === a.charAt(0))
                            4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f),
                            a = parseInt(a.substr(1), 16),
                            c = [a >> 16, a >> 8 & 255, 255 & a];
                        else if ("hsl" === a.substr(0, 3))
                            if (c = m = a.match(s), b) {
                                if (-1 !== a.indexOf("="))
                                    return a.match(t)
                            } else
                                g = Number(c[0]) % 360 / 360,
                                h = Number(c[1]) / 100,
                                i = Number(c[2]) / 100,
                                e = .5 >= i ? i * (h + 1) : i + h - i * h,
                                d = 2 * i - e,
                                c.length > 3 && (c[3] = Number(c[3])),
                                c[0] = na(g + 1 / 3, d, e),
                                c[1] = na(g, d, e),
                                c[2] = na(g - 1 / 3, d, e);
                        else
                            c = a.match(s) || ma.transparent;
                        c[0] = Number(c[0]),
                        c[1] = Number(c[1]),
                        c[2] = Number(c[2]),
                        c.length > 3 && (c[3] = Number(c[3]))
                    }
                else
                    c = ma.black;
                return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
            },
            pa = function(a, b) {
                var c,
                    d,
                    e,
                    f = a.match(qa) || [],
                    g = 0,
                    h = "";
                if (!f.length)
                    return a;
                for (c = 0; c < f.length; c++)
                    d = f[c],
                    e = a.substr(g, a.indexOf(d, g) - g),
                    g += e.length + d.length,
                    d = oa(d, b),
                    3 === d.length && d.push(1),
                    h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                return h + a.substr(g)
            },
            qa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ma)
            qa += "|" + j + "\\b";
        qa = new RegExp(qa + ")", "gi"),
        g.colorStringFilter = function(a) {
            var b,
                c = a[0] + " " + a[1];
            qa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = pa(a[0], b), a[1] = pa(a[1], b)),
            qa.lastIndex = 0
        },
        b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
        var ra = function(a, b, c, d) {
                if (null == a)
                    return function(a) {
                        return a
                    };
                var e,
                    f = b ? (a.match(qa) || [""])[0] : "",
                    g = a.split(f).join("").match(u) || [],
                    h = a.substr(0, a.indexOf(g[0])),
                    i = ")" === a.charAt(a.length - 1) ? ")" : "",
                    j = -1 !== a.indexOf(" ") ? " " : ",",
                    k = g.length,
                    l = k > 0 ? g[0].replace(s, "") : "";
                return k ? e = b ? function(a) {
                    var b,
                        m,
                        n,
                        o;
                    if ("number" == typeof a)
                        a += l;
                    else if (d && I.test(a)) {
                        for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++)
                            o[n] = e(o[n]);
                        return o.join(",")
                    }
                    if (b = (a.match(qa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--)
                        for (; ++n < k;)
                            m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                    return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                } : function(a) {
                    var b,
                        f,
                        m;
                    if ("number" == typeof a)
                        a += l;
                    else if (d && I.test(a)) {
                        for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++)
                            f[m] = e(f[m]);
                        return f.join(",")
                    }
                    if (b = a.match(u) || [], m = b.length, k > m--)
                        for (; ++m < k;)
                            b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                    return h + b.join(j) + i
                } : function(a) {
                    return a
                }
            },
            sa = function(a) {
                return a = a.split(","), function(b, c, d, e, f, g, h) {
                    var i,
                        j = (c + "").split(" ");
                    for (h = {}, i = 0; 4 > i; i++)
                        h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                    return e.parse(b, h, f, g)
                }
            },
            ta = (S._setPluginRatio = function(a) {
                this.plugin.setRatio(a);
                for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)
                    b = h[i.v],
                    i.r ? b = i.r(b) : j > b && b > -j && (b = 0),
                    i.t[i.p] = b,
                    i = i._next;
                if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod.call(this._tween, h.rotation, this.t, this._tween) : h.rotation), 1 === a || 0 === a)
                    for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                        if (c = i.t, c.type) {
                            if (1 === c.type) {
                                for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)
                                    e += c["xn" + d] + c["xs" + (d + 1)];
                                c[f] = e
                            }
                        } else
                            c[f] = c.s + c.xs0;
                        i = i._next
                    }
            }, function(a, b, c, d, e) {
                this.t = a,
                this.p = b,
                this.v = c,
                this.r = e,
                d && (d._prev = this, this._next = d)
            }),
            ua = (S._parseToProxy = function(a, b, c, d, e, f) {
                var g,
                    h,
                    i,
                    j,
                    k,
                    l = d,
                    m = {},
                    n = {},
                    o = c._transform,
                    p = M;
                for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                    if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new ta(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                        for (g = d.l; --g > 0;)
                            i = "xn" + g,
                            h = d.p + "_" + i,
                            n[h] = d.data[i],
                            m[h] = d[i],
                            f || (j = new ta(d, i, h, j, d.rxp[i]));
                    d = d._next
                }
                return {
                    proxy: m,
                    end: n,
                    firstMPT: j,
                    pt: k
                }
            }, S.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
                this.t = a,
                this.p = b,
                this.s = d,
                this.c = e,
                this.n = i || b,
                a instanceof ua || f.push(this.n),
                this.r = j ? "function" == typeof j ? j : Math.round : j,
                this.type = h || 0,
                k && (this.pr = k, c = !0),
                this.b = void 0 === l ? d : l,
                this.e = void 0 === m ? d + e : m,
                g && (this._next = g, g._prev = this)
            }),
            va = function(a, b, c, d, e, f) {
                var g = new ua(a, b, c, d - c, e, -1, f);
                return g.b = c, g.e = g.xs0 = d, g
            },
            wa = g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
                c = c || f || "",
                "function" == typeof d && (d = d(r, q)),
                h = new ua(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d),
                d += "",
                e && qa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
                var m,
                    n,
                    o,
                    p,
                    u,
                    v,
                    w,
                    x,
                    y,
                    z,
                    A,
                    B,
                    C,
                    D = c.split(", ").join(",").split(" "),
                    E = d.split(", ").join(",").split(" "),
                    F = D.length,
                    G = k !== !1;
                for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "), E = E.join(" ").split(",").join(", ").split(" ")), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, qa.lastIndex = 0, m = 0; F > m; m++)
                    if (p = D[m], u = E[m] + "", x = parseFloat(p), x || 0 === x)
                        h.appendXtra("", x, ja(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px") ? Math.round : !1, !0);
                    else if (e && qa.test(p))
                        B = u.indexOf(")") + 1,
                        B = ")" + (B ? u.substr(B) : ""),
                        C = -1 !== u.indexOf("hsl") && U,
                        z = u,
                        p = oa(p, C),
                        u = oa(u, C),
                        y = p.length + u.length > 6,
                        y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ja(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ja(u[1], p[1]), "%,", !1).appendXtra("", p[2], ja(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", Math.round, !0).appendXtra("", p[1], u[1] - p[1], ",", Math.round).appendXtra("", p[2], u[2] - p[2], y ? "," : B, Math.round), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))),
                        qa.lastIndex = 0;
                    else if (v = p.match(s)) {
                        if (w = u.match(t), !w || w.length !== v.length)
                            return h;
                        for (o = 0, n = 0; n < v.length; n++)
                            A = v[n],
                            z = p.indexOf(A, o),
                            h.appendXtra(p.substr(o, z - o), Number(A), ja(w[n], A), "", G && "px" === p.substr(z + A.length, 2) ? Math.round : !1, 0 === n),
                            o = z + A.length;
                        h["xs" + h.l] += p.substr(o)
                    } else
                        h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
                if (-1 !== d.indexOf("=") && h.data) {
                    for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
                        B += h["xs" + m] + h.data["xn" + m];
                    h.e = B + h["xs" + m]
                }
                return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
            },
            xa = 9;
        for (j = ua.prototype, j.l = j.pr = 0; --xa > 0;)
            j["xn" + xa] = 0,
            j["xs" + xa] = "";
        j.xs0 = "",
        j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null,
        j.appendXtra = function(a, b, c, d, e, f) {
            var g = this,
                h = g.l;
            return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ua(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                s: b + c
            }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
        };
        var ya = function(a, b) {
                b = b || {},
                this.p = b.prefix ? Z(a) || a : a,
                i[a] = i[this.p] = this,
                this.format = b.formatter || ra(b.defaultValue, b.color, b.collapsible, b.multi),
                b.parser && (this.parse = b.parser),
                this.clrs = b.color,
                this.multi = b.multi,
                this.keyword = b.keyword,
                this.dflt = b.defaultValue,
                this.allowFunc = b.allowFunc,
                this.pr = b.priority || 0
            },
            za = S._registerComplexSpecialProp = function(a, b, c) {
                "object" != typeof b && (b = {
                    parser: c
                });
                var d,
                    e,
                    f = a.split(","),
                    g = b.defaultValue;
                for (c = c || [g], d = 0; d < f.length; d++)
                    b.prefix = 0 === d && b.prefix,
                    b.defaultValue = c[d] || g,
                    e = new ya(f[d], b)
            },
            Aa = S._registerPluginProp = function(a) {
                if (!i[a]) {
                    var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                    za(a, {
                        parser: function(a, c, d, e, f, g, j) {
                            var k = h.com.greensock.plugins[b];
                            return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f)
                        }
                    })
                }
            };
        j = ya.prototype,
        j.parseComplex = function(a, b, c, d, e, f) {
            var g,
                h,
                i,
                j,
                k,
                l,
                m = this.keyword;
            if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
                for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++)
                    b = h[g] = h[g] || this.dflt,
                    c = i[g] = i[g] || this.dflt,
                    m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                b = h.join(", "),
                c = i.join(", ")
            }
            return wa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        },
        j.parse = function(a, b, c, d, f, g, h) {
            return this.parseComplex(a.style, this.format(aa(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        },
        g.registerSpecialProp = function(a, b, c) {
            za(a, {
                parser: function(a, d, e, f, g, h, i) {
                    var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
                    return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                },
                priority: c
            })
        },
        g.useSVGTransformAttr = !0;
        var Ba,
            Ca = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Da = Z("transform"),
            Ea = X + "transform",
            Fa = Z("transformOrigin"),
            Ga = null !== Z("perspective"),
            Ha = S.Transform = function() {
                this.perspective = parseFloat(g.defaultTransformPerspective) || 0,
                this.force3D = g.defaultForce3D !== !1 && Ga ? g.defaultForce3D || "auto" : !1
            },
            Ia = _gsScope.SVGElement,
            Ja = function(a, b, c) {
                var d,
                    e = O.createElementNS("http://www.w3.org/2000/svg", a),
                    f = /([a-z])([A-Z])/g;
                for (d in c)
                    e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                return b.appendChild(e), e
            },
            Ka = O.documentElement || {},
            La = function() {
                var a,
                    b,
                    c,
                    d = p || /Android/i.test(T) && !_gsScope.chrome;
                return O.createElementNS && !d && (a = Ja("svg", Ka), b = Ja("rect", a, {
                    width: 100,
                    height: 50,
                    x: 100
                }), c = b.getBoundingClientRect().width, b.style[Fa] = "50% 50%", b.style[Da] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Ga), Ka.removeChild(a)), d
            }(),
            Ma = function(a, b, c, d, e, f) {
                var h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v = a._gsTransform,
                    w = Ra(a, !0);
                v && (t = v.xOrigin, u = v.yOrigin),
                (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
                    x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
                    y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
                    width: 0,
                    height: 0
                }), b = ia(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]),
                c.xOrigin = k = parseFloat(h[0]),
                c.yOrigin = l = parseFloat(h[1]),
                d && w !== Qa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)),
                v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0),
                f || a.setAttribute("data-svg-origin", h.join(" "))
            },
            Na = function(a) {
                var b,
                    c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    d = this.parentNode,
                    e = this.nextSibling,
                    f = this.style.cssText;
                if (Ka.appendChild(c), c.appendChild(this), this.style.display = "block", a)
                    try {
                        b = this.getBBox(),
                        this._originalGetBBox = this.getBBox,
                        this.getBBox = Na
                    } catch (g) {}
                else
                    this._originalGetBBox && (b = this._originalGetBBox());
                return e ? d.insertBefore(this, e) : d.appendChild(this), Ka.removeChild(c), this.style.cssText = f, b
            },
            Oa = function(a) {
                try {
                    return a.getBBox()
                } catch (b) {
                    return Na.call(a, !0)
                }
            },
            Pa = function(a) {
                return !(!Ia || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Oa(a))
            },
            Qa = [1, 0, 0, 1, 0, 0],
            Ra = function(a, b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j = a._gsTransform || new Ha,
                    k = 1e5,
                    l = a.style;
                if (Da ? d = aa(a, Ea, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), j.x || 0, j.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, Da && c && !a.offsetParent && (f = l.display, l.display = "block", i = a.parentNode, i && a.offsetParent || (g = 1, h = a.nextSibling, Ka.appendChild(a)), d = aa(a, Ea, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? l.display = f : Wa(l, "display"), g && (h ? i.insertBefore(a, h) : i ? i.appendChild(a) : Ka.removeChild(a))), (j.svg || a.getCTM && Pa(a)) && (c && -1 !== (l[Da] + "").indexOf("matrix") && (d = l[Da], c = 0), e = a.getAttribute("transform"), c && e && (e = a.transform.baseVal.consolidate().matrix, d = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")", c = 0)), c)
                    return Qa;
                for (e = (d || "").match(s) || [], xa = e.length; --xa > -1;)
                    f = Number(e[xa]),
                    e[xa] = (g = f - (f |= 0)) ? (g * k + (0 > g ? -.5 : .5) | 0) / k + f : f;
                return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
            },
            Sa = S.getTransform = function(a, c, d, e) {
                if (a._gsTransform && d && !e)
                    return a._gsTransform;
                var f,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m = d ? a._gsTransform || new Ha : new Ha,
                    n = m.scaleX < 0,
                    o = 2e-5,
                    p = 1e5,
                    q = Ga ? parseFloat(aa(a, Fa, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                    r = parseFloat(g.defaultTransformPerspective) || 0;
                if (m.svg = !(!a.getCTM || !Pa(a)), m.svg && (Ma(a, aa(a, Fa, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Ba = g.useSVGTransformAttr || La), f = Ra(a), f !== Qa) {
                    if (16 === f.length) {
                        var s,
                            t,
                            u,
                            v,
                            w,
                            x = f[0],
                            y = f[1],
                            z = f[2],
                            A = f[3],
                            B = f[4],
                            C = f[5],
                            D = f[6],
                            E = f[7],
                            F = f[8],
                            G = f[9],
                            H = f[10],
                            I = f[12],
                            J = f[13],
                            K = f[14],
                            M = f[11],
                            N = Math.atan2(D, H);
                        m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]),
                        m.rotationX = N * L,
                        N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u),
                        N = Math.atan2(-z, H),
                        m.rotationY = N * L,
                        N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u),
                        N = Math.atan2(y, x),
                        m.rotation = N * L,
                        N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u),
                        m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY),
                        N = Math.atan2(B, C),
                        m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p,
                        m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p,
                        m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p,
                        x /= m.scaleX,
                        B /= m.scaleY,
                        y /= m.scaleX,
                        C /= m.scaleY,
                        Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0,
                        m.perspective = M ? 1 / (0 > M ? -M : M) : 0,
                        m.x = I,
                        m.y = J,
                        m.z = K,
                        m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
                    } else if (!Ga || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                        var O = f.length >= 6,
                            P = O ? f[0] : 1,
                            Q = f[1] || 0,
                            R = f[2] || 0,
                            S = O ? f[3] : 1;
                        m.x = f[4] || 0,
                        m.y = f[5] || 0,
                        i = Math.sqrt(P * P + Q * Q),
                        j = Math.sqrt(S * S + R * R),
                        k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0,
                        l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0,
                        m.scaleX = i,
                        m.scaleY = j,
                        m.rotation = k,
                        m.skewX = l,
                        Ga && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1),
                        m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
                    }
                    Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)),
                    m.zOrigin = q;
                    for (h in m)
                        m[h] < o && m[h] > -o && (m[h] = 0)
                }
                return d && (a._gsTransform = m, m.svg && (Ba && a.style[Da] ? b.delayedCall(.001, function() {
                    Wa(a.style, Da)
                }) : !Ba && a.getAttribute("transform") && b.delayedCall(.001, function() {
                    a.removeAttribute("transform")
                }))), m
            },
            Ta = function(a) {
                var b,
                    c,
                    d = this.data,
                    e = -d.rotation * K,
                    f = e + d.skewX * K,
                    g = 1e5,
                    h = (Math.cos(e) * d.scaleX * g | 0) / g,
                    i = (Math.sin(e) * d.scaleX * g | 0) / g,
                    j = (Math.sin(f) * -d.scaleY * g | 0) / g,
                    k = (Math.cos(f) * d.scaleY * g | 0) / g,
                    l = this.t.style,
                    m = this.t.currentStyle;
                if (m) {
                    c = i,
                    i = -j,
                    j = -c,
                    b = m.filter,
                    l.filter = "";
                    var n,
                        o,
                        q = this.t.offsetWidth,
                        r = this.t.offsetHeight,
                        s = "absolute" !== m.position,
                        t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                        u = d.x + q * d.xPercent / 100,
                        v = d.y + r * d.yPercent / 100;
                    if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                        var y,
                            z,
                            A,
                            B = 8 > p ? 1 : -1;
                        for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), xa = 0; 4 > xa; xa++)
                            z = ga[xa],
                            y = m[z],
                            c = -1 !== y.indexOf("px") ? parseFloat(y) : ba(this.t, z, parseFloat(y), y.replace(w, "")) || 0,
                            A = c !== d[z] ? 2 > xa ? -d.ieOffsetX : -d.ieOffsetY : 2 > xa ? n - d.ieOffsetX : o - d.ieOffsetY,
                            l[z] = (d[z] = Math.round(c - A * (0 === xa || 2 === xa ? 1 : B))) + "px"
                    }
                }
            },
            Ua = S.set3DTransformRatio = S.setTransformRatio = function(a) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v,
                    w,
                    x,
                    y,
                    z = this.data,
                    A = this.t.style,
                    B = z.rotation,
                    C = z.rotationX,
                    D = z.rotationY,
                    E = z.scaleX,
                    F = z.scaleY,
                    G = z.scaleZ,
                    H = z.x,
                    I = z.y,
                    J = z.z,
                    L = z.svg,
                    M = z.perspective,
                    N = z.force3D,
                    O = z.skewY,
                    P = z.skewX;
                if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Ba && L || !Ga)
                    return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Ba && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Ba ? this.t.setAttribute("transform", "matrix(" + u) : A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
                if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P)
                    B *= K,
                    r = c = Math.cos(B),
                    s = f = Math.sin(B),
                    P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))),
                    d = -s,
                    g = r;
                else {
                    if (!(D || C || 1 !== G || M || L))
                        return void (A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                    c = g = 1,
                    d = f = 0
                }
                k = 1,
                e = h = i = j = l = m = 0,
                o = M ? -1 / M : 0,
                p = z.zOrigin,
                q = 1e-6,
                v = ",",
                w = "0",
                B = D * K,
                B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r),
                B = C * K,
                B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t),
                1 !== G && (e *= G, h *= G, k *= G, o *= G),
                1 !== F && (d *= F, g *= F, j *= F, m *= F),
                1 !== E && (c *= E, f *= E, i *= E, l *= E),
                (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)),
                u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(",
                u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i),
                u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g),
                C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,",
                u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")",
                A[Da] = u
            };
        j = Ha.prototype,
        j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0,
        j.scaleX = j.scaleY = j.scaleZ = 1,
        za("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i)
                    return f;
                d._lastParsedTransform = i;
                var j = i.scale && "function" == typeof i.scale ? i.scale : 0;
                j && (i.scale = j(r, a));
                var k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    s,
                    t,
                    u,
                    v = a._gsTransform,
                    w = a.style,
                    x = 1e-6,
                    y = Ca.length,
                    z = i,
                    A = {},
                    B = "transformOrigin",
                    C = Sa(a, e, !0, z.parseTransform),
                    D = z.transform && ("function" == typeof z.transform ? z.transform(r, q) : z.transform);
                if (C.skewType = z.skewType || C.skewType || g.defaultSkewType, d._transform = C, "rotationZ" in z && (z.rotation = z.rotationZ), D && "string" == typeof D && Da)
                    l = Q.style,
                    l[Da] = D,
                    l.display = "block",
                    l.position = "absolute",
                    -1 !== D.indexOf("%") && (l.width = aa(a, "width"), l.height = aa(a, "height")),
                    O.body.appendChild(Q),
                    k = Sa(Q, null, !1),
                    "simple" === C.skewType && (k.scaleY *= Math.cos(k.skewX * K)),
                    C.svg && (p = C.xOrigin, s = C.yOrigin, k.x -= C.xOffset, k.y -= C.yOffset, (z.transformOrigin || z.svgOrigin) && (D = {}, Ma(a, ia(z.transformOrigin), D, z.svgOrigin, z.smoothOrigin, !0), p = D.xOrigin, s = D.yOrigin, k.x -= D.xOffset - C.xOffset, k.y -= D.yOffset - C.yOffset), (p || s) && (t = Ra(Q, !0), k.x -= p - (p * t[0] + s * t[2]), k.y -= s - (p * t[1] + s * t[3]))),
                    O.body.removeChild(Q),
                    k.perspective || (k.perspective = C.perspective),
                    null != z.xPercent && (k.xPercent = ka(z.xPercent, C.xPercent)),
                    null != z.yPercent && (k.yPercent = ka(z.yPercent, C.yPercent));
                else if ("object" == typeof z) {
                    if (k = {
                        scaleX: ka(null != z.scaleX ? z.scaleX : z.scale, C.scaleX),
                        scaleY: ka(null != z.scaleY ? z.scaleY : z.scale, C.scaleY),
                        scaleZ: ka(z.scaleZ, C.scaleZ),
                        x: ka(z.x, C.x),
                        y: ka(z.y, C.y),
                        z: ka(z.z, C.z),
                        xPercent: ka(z.xPercent, C.xPercent),
                        yPercent: ka(z.yPercent, C.yPercent),
                        perspective: ka(z.transformPerspective, C.perspective)
                    }, o = z.directionalRotation, null != o)
                        if ("object" == typeof o)
                            for (l in o)
                                z[l] = o[l];
                        else
                            z.rotation = o;
                    "string" == typeof z.x && -1 !== z.x.indexOf("%") && (k.x = 0, k.xPercent = ka(z.x, C.xPercent)),
                    "string" == typeof z.y && -1 !== z.y.indexOf("%") && (k.y = 0, k.yPercent = ka(z.y, C.yPercent)),
                    k.rotation = la("rotation" in z ? z.rotation : "shortRotation" in z ? z.shortRotation + "_short" : C.rotation, C.rotation, "rotation", A),
                    Ga && (k.rotationX = la("rotationX" in z ? z.rotationX : "shortRotationX" in z ? z.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", A), k.rotationY = la("rotationY" in z ? z.rotationY : "shortRotationY" in z ? z.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", A)),
                    k.skewX = la(z.skewX, C.skewX),
                    k.skewY = la(z.skewY, C.skewY)
                }
                for (Ga && null != z.force3D && (C.force3D = z.force3D, n = !0), m = C.force3D || C.z || C.rotationX || C.rotationY || k.z || k.rotationX || k.rotationY || k.perspective, m || null == z.scale || (k.scaleZ = 1); --y > -1;)
                    u = Ca[y],
                    D = k[u] - C[u],
                    (D > x || -x > D || null != z[u] || null != M[u]) && (n = !0, f = new ua(C, u, C[u], D, f), u in A && (f.e = A[u]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                return D = "function" == typeof z.transformOrigin ? z.transformOrigin(r, q) : z.transformOrigin, C.svg && (D || z.svgOrigin) && (p = C.xOffset, s = C.yOffset, Ma(a, ia(D), k, z.svgOrigin, z.smoothOrigin), f = va(C, "xOrigin", (v ? C : k).xOrigin, k.xOrigin, f, B), f = va(C, "yOrigin", (v ? C : k).yOrigin, k.yOrigin, f, B), (p !== C.xOffset || s !== C.yOffset) && (f = va(C, "xOffset", v ? p : C.xOffset, C.xOffset, f, B), f = va(C, "yOffset", v ? s : C.yOffset, C.yOffset, f, B)), D = "0px 0px"), (D || Ga && m && C.zOrigin) && (Da ? (n = !0, u = Fa, D || (D = (aa(a, u, e, !1, "50% 50%") + "").split(" "), D = D[0] + " " + D[1] + " " + C.zOrigin + "px"), D += "", f = new ua(w, u, 0, 0, f, -1, B), f.b = w[u], f.plugin = h, Ga ? (l = C.zOrigin, D = D.split(" "), C.zOrigin = (D.length > 2 ? parseFloat(D[2]) : l) || 0, f.xs0 = f.e = D[0] + " " + (D[1] || "50%") + " 0px", f = new ua(C, "zOrigin", 0, 0, f, -1, f.n), f.b = l, f.xs0 = f.e = C.zOrigin) : f.xs0 = f.e = D) : ia(D + "", C)), n && (d._transformType = C.svg && Ba || !m && 3 !== this._transformType ? 2 : 3), j && (i.scale = j), f
            },
            allowFunc: !0,
            prefix: !0
        }),
        za("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        za("clipPath", {
            defaultValue: "inset(0px)",
            prefix: !0,
            multi: !0,
            formatter: ra("inset(0px 0px 0px 0px)", !1, !0)
        }),
        za("borderRadius", {
            defaultValue: "0px",
            parser: function(a, b, c, f, g, h) {
                b = this.format(b);
                var i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v,
                    w,
                    x,
                    y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    z = a.style;
                for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++)
                    this.p.indexOf("border") && (y[j] = Z(y[j])),
                    m = l = aa(a, y[j], e, !1, "0px"),
                    -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]),
                    n = k = i[j],
                    o = parseFloat(m),
                    t = m.substr((o + "").length),
                    u = "=" === n.charAt(1),
                    u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)),
                    "" === s && (s = d[c] || t),
                    s !== t && (v = ba(a, "borderLeft", o, t), w = ba(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = ba(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)),
                    g = wa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                return g
            },
            prefix: !0,
            formatter: ra("0px 0px 0px 0px", !1, !0)
        }),
        za("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(a, b, c, d, f, g) {
                return wa(a.style, c, this.format(aa(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
            },
            prefix: !0,
            formatter: ra("0px 0px", !1, !0)
        }),
        za("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(a, b, c, d, f, g) {
                var h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n = "background-position",
                    o = e || _(a, null),
                    q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                    r = this.format(b);
                if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = aa(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
                    for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;)
                        q = h[j],
                        k = -1 !== q.indexOf("%"),
                        k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                    q = h.join(" ")
                }
                return this.parseComplex(a.style, q, r, f, g)
            },
            formatter: ia
        }),
        za("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(a) {
                return a += "", "co" === a.substr(0, 2) ? a : ia(-1 === a.indexOf(" ") ? a + " " + a : a)
            }
        }),
        za("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        za("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        za("transformStyle", {
            prefix: !0
        }),
        za("backfaceVisibility", {
            prefix: !0
        }),
        za("userSelect", {
            prefix: !0
        }),
        za("margin", {
            parser: sa("marginTop,marginRight,marginBottom,marginLeft")
        }),
        za("padding", {
            parser: sa("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        za("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(a, b, c, d, f, g) {
                var h,
                    i,
                    j;
                return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(aa(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
            }
        }),
        za("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        za("autoRound,strictUnits", {
            parser: function(a, b, c, d, e) {
                return e
            }
        }),
        za("border", {
            defaultValue: "0px solid #000",
            parser: function(a, b, c, d, f, g) {
                var h = aa(a, "borderTopWidth", e, !1, "0px"),
                    i = this.format(b).split(" "),
                    j = i[0].replace(w, "");
                return "px" !== j && (h = parseFloat(h) / ba(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + aa(a, "borderTopStyle", e, !1, "solid") + " " + aa(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
            },
            color: !0,
            formatter: function(a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(qa) || ["#000"])[0]
            }
        }),
        za("borderWidth", {
            parser: sa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        za("float,cssFloat,styleFloat", {
            parser: function(a, b, c, d, e, f) {
                var g = a.style,
                    h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
            }
        });
        var Va = function(a) {
            var b,
                c = this.t,
                d = c.filter || aa(this.data, "filter") || "",
                e = this.s + this.c * a | 0;
            100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !aa(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)),
            b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
        };
        za("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(a, b, c, d, f, g) {
                var h = parseFloat(aa(a, "opacity", e, !1, "1")),
                    i = a.style,
                    j = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === aa(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ua(i, "opacity", h, b - h, f) : (f = new ua(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Va), j && (f = new ua(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
            }
        });
        var Wa = function(a, b) {
                b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
            },
            Xa = function(a) {
                if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                    this.t.setAttribute("class", 0 === a ? this.b : this.e);
                    for (var b = this.data, c = this.t.style; b;)
                        b.v ? c[b.p] = b.v : Wa(c, b.p),
                        b = b._next;
                    1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else
                    this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
        za("className", {
            parser: function(a, b, d, f, g, h, i) {
                var j,
                    k,
                    l,
                    m,
                    n,
                    o = a.getAttribute("class") || "",
                    p = a.style.cssText;
                if (g = f._classNamePT = new ua(a, d, 0, 0, g, 2), g.setRatio = Xa, g.pr = -11, c = !0, g.b = o, k = da(a, e), l = a._gsClassPT) {
                    for (m = {}, n = l.data; n;)
                        m[n.p] = 1,
                        n = n._next;
                    l.setRatio(1)
                }
                return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = ea(a, k, da(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
            }
        });
        var Ya = function(a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b,
                    c,
                    d,
                    e,
                    f,
                    g = this.t.style,
                    h = i.transform.parse;
                if ("all" === this.e)
                    g.cssText = "",
                    e = !0;
                else
                    for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;)
                        c = b[d],
                        i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Fa : i[c].p),
                        Wa(g, c);
                e && (Wa(g, Da), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (za("clearProps", {
            parser: function(a, b, d, e, f) {
                return f = new ua(a, d, 0, 0, f, 2), f.setRatio = Ya, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
            }
        }), j = "bezier,throwProps,physicsProps,physics2D".split(","), xa = j.length; xa--;)
            Aa(j[xa]);
        j = g.prototype,
        j._firstPT = j._lastParsedTransform = j._transform = null,
        j._onInitTween = function(a, b, h, j) {
            if (!a.nodeType)
                return !1;
            this._target = q = a,
            this._tween = h,
            this._vars = b,
            r = j,
            k = b.autoRound,
            c = !1,
            d = b.suffixMap || g.suffixMap,
            e = _(a, ""),
            f = this._overwriteProps;
            var n,
                p,
                s,
                t,
                u,
                v,
                w,
                x,
                z,
                A = a.style;
            if (l && "" === A.zIndex && (n = aa(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = da(a, e), A.cssText = t + ";" + b, n = ea(a, n, da(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
                for (z = 3 === this._transformType, Da ? m && (l = !0, "" === A.zIndex && (w = aa(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;)
                    s = s._next;
                x = new ua(a, "transform", 0, 0, null, 2),
                this._linkCSSP(x, null, s),
                x.setRatio = Da ? Ua : Ta,
                x.data = this._transform || Sa(a, e, !0),
                x.tween = h,
                x.pr = -1,
                f.pop()
            }
            if (c) {
                for (; p;) {
                    for (v = p._next, s = t; s && s.pr > p.pr;)
                        s = s._next;
                    (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p,
                    (p._next = s) ? s._prev = p : u = p,
                    p = v
                }
                this._firstPT = t
            }
            return !0
        },
        j.parse = function(a, b, c, f) {
            var g,
                h,
                j,
                l,
                m,
                n,
                o,
                p,
                s,
                t,
                u = a.style;
            for (g in b) {
                if (n = b[g], h = i[g], "function" != typeof n || h && h.allowFunc || (n = n(r, q)), h)
                    c = h.parse(a, n, g, this, c, f, b);
                else {
                    if ("--" === g.substr(0, 2)) {
                        this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", _(a).getPropertyValue(g) + "", n + "", g, !1, g);
                        continue
                    }
                    m = aa(a, g, e) + "",
                    s = "string" == typeof n,
                    "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = oa(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = wa(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = wa(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ha(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ca(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = ba(a, g, j, o), "%" === p ? (j /= ba(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= ba(a, g, 1, p) : "px" !== p && (l = ba(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ua(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ua(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))
                }
                f && c && !c.plugin && (c.plugin = f)
            }
            return c
        },
        j.setRatio = function(a) {
            var b,
                c,
                d,
                e = this._firstPT,
                f = 1e-6;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; e;) {
                        if (b = e.c * a + e.s, e.r ? b = e.r(b) : f > b && b > -f && (b = 0), e.type)
                            if (1 === e.type)
                                if (d = e.l, 2 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                else if (3 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                                        c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                }
                            else
                                -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                        else
                            e.t[e.p] = b + e.xs0;
                        e = e._next
                    }
                else
                    for (; e;)
                        2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a),
                        e = e._next;
            else
                for (; e;) {
                    if (2 !== e.type)
                        if (e.r && -1 !== e.type)
                            if (b = e.r(e.s + e.c), e.type) {
                                if (1 === e.type) {
                                    for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
                                        c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                }
                            } else
                                e.t[e.p] = b + e.xs0;
                        else
                            e.t[e.p] = e.e;
                    else
                        e.setRatio(a);
                    e = e._next
                }
        },
        j._enableTransforms = function(a) {
            this._transform = this._transform || Sa(this._target, e, !0),
            this._transformType = this._transform.svg && Ba || !a && 3 !== this._transformType ? 2 : 3
        };
        var Za = function(a) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        j._addLazySet = function(a, b, c) {
            var d = this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2);
            d.e = c,
            d.setRatio = Za,
            d.data = this
        },
        j._linkCSSP = function(a, b, c, d) {
            return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        },
        j._mod = function(a) {
            for (var b = this._firstPT; b;)
                "function" == typeof a[b.p] && (b.r = a[b.p]),
                b = b._next
        },
        j._kill = function(b) {
            var c,
                d,
                e,
                f = b;
            if (b.autoAlpha || b.alpha) {
                f = {};
                for (d in b)
                    f[d] = b[d];
                f.opacity = 1,
                f.autoAlpha && (f.visibility = 1)
            }
            for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;)
                c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin),
                c = c._next;
            return a.prototype._kill.call(this, f)
        };
        var $a = function(a, b, c) {
            var d,
                e,
                f,
                g;
            if (a.slice)
                for (e = a.length; --e > -1;)
                    $a(a[e], b, c);
            else
                for (d = a.childNodes, e = d.length; --e > -1;)
                    f = d[e],
                    g = f.type,
                    f.style && (b.push(da(f)), c && c.push(f)),
                    1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || $a(f, b, c)
        };
        return g.cascadeTo = function(a, c, d) {
            var e,
                f,
                g,
                h,
                i = b.to(a, c, d),
                j = [i],
                k = [],
                l = [],
                m = [],
                n = b._internals.reservedProps;
            for (a = i._targets || i.target, $a(a, k, m), i.render(c, !0, !0), $a(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
                if (f = ea(m[e], k[e], l[e]), f.firstMPT) {
                    f = f.difs;
                    for (g in d)
                        n[g] && (f[g] = d[g]);
                    h = {};
                    for (g in f)
                        h[g] = k[e][g];
                    j.push(b.fromTo(m[e], c, h, f))
                }
            return j
        }, a.activate([g]), g
    }, !0),
    function() {
        var a = _gsScope._gsDefine.plugin({
                propName: "roundProps",
                version: "1.7.0",
                priority: -1,
                API: 2,
                init: function(a, b, c) {
                    return this._tween = c, !0
                }
            }),
            b = function(a) {
                var b = 1 > a ? Math.pow(10, (a + "").length - 2) : 1;
                return function(c) {
                    return (Math.round(c / a) * a * b | 0) / b
                }
            },
            c = function(a, b) {
                for (; a;)
                    a.f || a.blob || (a.m = b || Math.round),
                    a = a._next
            },
            d = a.prototype;
        d._onInitAllProps = function() {
            var a,
                d,
                e,
                f,
                g = this._tween,
                h = g.vars.roundProps,
                i = {},
                j = g._propLookup.roundProps;
            if ("object" != typeof h || h.push)
                for ("string" == typeof h && (h = h.split(",")), e = h.length; --e > -1;)
                    i[h[e]] = Math.round;
            else
                for (f in h)
                    i[f] = b(h[f]);
            for (f in i)
                for (a = g._firstPT; a;)
                    d = a._next,
                    a.pg ? a.t._mod(i) : a.n === f && (2 === a.f && a.t ? c(a.t._firstPT, i[f]) : (this._add(a.t, f, a.s, a.c, i[f]), d && (d._prev = a._prev), a._prev ? a._prev._next = d : g._firstPT === a && (g._firstPT = d), a._next = a._prev = null, g._propLookup[f] = j)),
                    a = d;
            return !1
        },
        d._add = function(a, b, c, d, e) {
            this._addTween(a, b, c, c + d, b, e || Math.round),
            this._overwriteProps.push(b)
        }
    }(),
    function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(a, b, c, d) {
                var e,
                    f;
                if ("function" != typeof a.setAttribute)
                    return !1;
                for (e in b)
                    f = b[e],
                    "function" == typeof f && (f = f(d, a)),
                    this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e),
                    this._overwriteProps.push(e);
                return !0
            }
        })
    }(),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(a, b, c, d) {
            "object" != typeof b && (b = {
                rotation: b
            }),
            this.finals = {};
            var e,
                f,
                g,
                h,
                i,
                j,
                k = b.useRadians === !0 ? 2 * Math.PI : 360,
                l = 1e-6;
            for (e in b)
                "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
            return !0
        },
        set: function(a) {
            var b;
            if (1 !== a)
                this._super.setRatio.call(this, a);
            else
                for (b = this._firstPT; b;)
                    b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p],
                    b = b._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
        var b,
            c,
            d,
            e,
            f = _gsScope.GreenSockGlobals || _gsScope,
            g = f.com.greensock,
            h = 2 * Math.PI,
            i = Math.PI / 2,
            j = g._class,
            k = function(b, c) {
                var d = j("easing." + b, function() {}, !0),
                    e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, d
            },
            l = a.register || function() {},
            m = function(a, b, c, d, e) {
                var f = j("easing." + a, {
                    easeOut: new b,
                    easeIn: new c,
                    easeInOut: new d
                }, !0);
                return l(f, a), f
            },
            n = function(a, b, c) {
                this.t = a,
                this.v = b,
                c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
            },
            o = function(b, c) {
                var d = j("easing." + b, function(a) {
                        this._p1 = a || 0 === a ? a : 1.70158,
                        this._p2 = 1.525 * this._p1
                    }, !0),
                    e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, e.config = function(a) {
                    return new d(a)
                }, d
            },
            p = m("Back", o("BackOut", function(a) {
                return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
            }), o("BackIn", function(a) {
                return a * a * ((this._p1 + 1) * a - this._p1)
            }), o("BackInOut", function(a) {
                return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
            })),
            q = j("easing.SlowMo", function(a, b, c) {
                b = b || 0 === b ? b : .7,
                null == a ? a = .7 : a > 1 && (a = 1),
                this._p = 1 !== a ? b : 0,
                this._p1 = (1 - a) / 2,
                this._p2 = a,
                this._p3 = this._p1 + this._p2,
                this._calcEnd = c === !0
            }, !0),
            r = q.prototype = new a;
        return r.constructor = q, r.getRatio = function(a) {
            var b = a + (.5 - a) * this._p;
            return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }, q.ease = new q(.7, .7), r.config = q.config = function(a, b, c) {
            return new q(a, b, c)
        }, b = j("easing.SteppedEase", function(a, b) {
            a = a || 1,
            this._p1 = 1 / a,
            this._p2 = a + (b ? 0 : 1),
            this._p3 = b ? 1 : 0
        }, !0), r = b.prototype = new a, r.constructor = b, r.getRatio = function(a) {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1
        }, r.config = b.config = function(a, c) {
            return new b(a, c)
        }, c = j("easing.ExpoScaleEase", function(a, b, c) {
            this._p1 = Math.log(b / a),
            this._p2 = b - a,
            this._p3 = a,
            this._ease = c
        }, !0), r = c.prototype = new a, r.constructor = c, r.getRatio = function(a) {
            return this._ease && (a = this._ease.getRatio(a)), (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
        }, r.config = c.config = function(a, b, d) {
            return new c(a, b, d)
        }, d = j("easing.RoughEase", function(b) {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), m = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --m > -1;)
                c = o ? Math.random() : 1 / l * m,
                d = q ? q.getRatio(c) : c,
                "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r),
                o ? d += Math.random() * e - .5 * e : m % 2 ? d += .5 * e : d -= .5 * e,
                p && (d > 1 ? d = 1 : 0 > d && (d = 0)),
                j[k++] = {
                    x: c,
                    y: d
                };
            for (j.sort(function(a, b) {
                return a.x - b.x
            }), h = new n(1, 1, null), m = l; --m > -1;)
                g = j[m],
                h = new n(g.x, g.y, h);
            this._prev = new n(0, 0, 0 !== h.t ? h : h.next)
        }, !0), r = d.prototype = new a, r.constructor = d, r.getRatio = function(a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t;)
                    b = b.next;
                b = b.prev
            } else
                for (; b.prev && a <= b.t;)
                    b = b.prev;
            return this._prev = b, b.v + (a - b.t) / b.gap * b.c
        }, r.config = function(a) {
            return new d(a)
        }, d.ease = new d, m("Bounce", k("BounceOut", function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), k("BounceIn", function(a) {
            return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), k("BounceInOut", function(a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
        })), m("Circ", k("CircOut", function(a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), k("CircIn", function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), k("CircInOut", function(a) {
            return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), e = function(b, c, d) {
            var e = j("easing." + b, function(a, b) {
                    this._p1 = a >= 1 ? a : 1,
                    this._p2 = (b || d) / (1 > a ? a : 1),
                    this._p3 = this._p2 / h * (Math.asin(1 / this._p1) || 0),
                    this._p2 = h / this._p2
                }, !0),
                f = e.prototype = new a;
            return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
                return new e(a, b)
            }, e
        }, m("Elastic", e("ElasticOut", function(a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), e("ElasticIn", function(a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
        }, .3), e("ElasticInOut", function(a) {
            return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)), m("Expo", k("ExpoOut", function(a) {
            return 1 - Math.pow(2, -10 * a)
        }), k("ExpoIn", function(a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), k("ExpoInOut", function(a) {
            return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), m("Sine", k("SineOut", function(a) {
            return Math.sin(a * i)
        }), k("SineIn", function(a) {
            return -Math.cos(a * i) + 1
        }), k("SineInOut", function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })), j("easing.EaseLookup", {
            find: function(b) {
                return a.map[b]
            }
        }, !0), l(f.SlowMo, "SlowMo", "ease,"), l(d, "RoughEase", "ease,"), l(b, "SteppedEase", "ease,"), p
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(a, b) {
    "use strict";
    var c = {},
        d = a.document,
        e = a.GreenSockGlobals = a.GreenSockGlobals || a,
        f = e[b];
    if (f)
        return "undefined" != typeof module && module.exports && (module.exports = f), f;
    var g,
        h,
        i,
        j,
        k,
        l = function(a) {
            var b,
                c = a.split("."),
                d = e;
            for (b = 0; b < c.length; b++)
                d[c[b]] = d = d[c[b]] || {};
            return d
        },
        m = l("com.greensock"),
        n = 1e-8,
        o = function(a) {
            var b,
                c = [],
                d = a.length;
            for (b = 0; b !== d; c.push(a[b++]))
                ;
            return c
        },
        p = function() {},
        q = function() {
            var a = Object.prototype.toString,
                b = a.call([]);
            return function(c) {
                return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
            }
        }(),
        r = {},
        s = function(d, f, g, h) {
            this.sc = r[d] ? r[d].sc : [],
            r[d] = this,
            this.gsClass = null,
            this.func = g;
            var i = [];
            this.check = function(j) {
                for (var k, m, n, o, p = f.length, q = p; --p > -1;)
                    (k = r[f[p]] || new s(f[p], [])).gsClass ? (i[p] = k.gsClass, q--) : j && k.sc.push(this);
                if (0 === q && g) {
                    if (m = ("com.greensock." + d).split("."), n = m.pop(), o = l(m.join("."))[n] = this.gsClass = g.apply(g, i), h)
                        if (e[n] = c[n] = o, "undefined" != typeof module && module.exports)
                            if (d === b) {
                                module.exports = c[b] = o;
                                for (p in c)
                                    o[p] = c[p]
                            } else
                                c[b] && (c[b][n] = o);
                        else
                            "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
                                return o
                            });
                    for (p = 0; p < this.sc.length; p++)
                        this.sc[p].check()
                }
            },
            this.check(!0)
        },
        t = a._gsDefine = function(a, b, c, d) {
            return new s(a, b, c, d)
        },
        u = m._class = function(a, b, c) {
            return b = b || function() {}, t(a, [], function() {
                return b
            }, c), b
        };
    t.globals = e;
    var v = [0, 0, 1, 1],
        w = u("easing.Ease", function(a, b, c, d) {
            this._func = a,
            this._type = c || 0,
            this._power = d || 0,
            this._params = b ? v.concat(b) : v
        }, !0),
        x = w.map = {},
        y = w.register = function(a, b, c, d) {
            for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)
                for (f = i[j], e = d ? u("easing." + f, null, !0) : m.easing[f] || {}, g = k.length; --g > -1;)
                    h = k[g],
                    x[f + "." + h] = x[h + f] = e[h] = a.getRatio ? a : a[h] || new a
        };
    for (i = w.prototype, i._calcEnd = !1, i.getRatio = function(a) {
        if (this._func)
            return this._params[0] = a, this._func.apply(null, this._params);
        var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
        return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
    }, g = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], h = g.length; --h > -1;)
        i = g[h] + ",Power" + h,
        y(new w(null, null, 1, h), i, "easeOut", !0),
        y(new w(null, null, 2, h), i, "easeIn" + (0 === h ? ",easeNone" : "")),
        y(new w(null, null, 3, h), i, "easeInOut");
    x.linear = m.easing.Linear.easeIn,
    x.swing = m.easing.Quad.easeInOut;
    var z = u("events.EventDispatcher", function(a) {
        this._listeners = {},
        this._eventTarget = a || this
    });
    i = z.prototype,
    i.addEventListener = function(a, b, c, d, e) {
        e = e || 0;
        var f,
            g,
            h = this._listeners[a],
            i = 0;
        for (this !== j || k || j.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;)
            f = h[g],
            f.c === b && f.s === c ? h.splice(g, 1) : 0 === i && f.pr < e && (i = g + 1);
        h.splice(i, 0, {
            c: b,
            s: c,
            up: d,
            pr: e
        })
    },
    i.removeEventListener = function(a, b) {
        var c,
            d = this._listeners[a];
        if (d)
            for (c = d.length; --c > -1;)
                if (d[c].c === b)
                    return void d.splice(c, 1)
    },
    i.dispatchEvent = function(a) {
        var b,
            c,
            d,
            e = this._listeners[a];
        if (e)
            for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;)
                d = e[b],
                d && (d.up ? d.c.call(d.s || c, {
                    type: a,
                    target: c
                }) : d.c.call(d.s || c))
    };
    var A = a.requestAnimationFrame,
        B = a.cancelAnimationFrame,
        C = Date.now || function() {
            return (new Date).getTime()
        },
        D = C();
    for (g = ["ms", "moz", "webkit", "o"], h = g.length; --h > -1 && !A;)
        A = a[g[h] + "RequestAnimationFrame"],
        B = a[g[h] + "CancelAnimationFrame"] || a[g[h] + "CancelRequestAnimationFrame"];
    u("Ticker", function(a, b) {
        var c,
            e,
            f,
            g,
            h,
            i = this,
            l = C(),
            m = b !== !1 && A ? "auto" : !1,
            o = 500,
            q = 33,
            r = "tick",
            s = function(a) {
                var b,
                    d,
                    j = C() - D;
                j > o && (l += j - q),
                D += j,
                i.time = (D - l) / 1e3,
                b = i.time - h,
                (!c || b > 0 || a === !0) && (i.frame++, h += b + (b >= g ? .004 : g - b), d = !0),
                a !== !0 && (f = e(s)),
                d && i.dispatchEvent(r)
            };
        z.call(i),
        i.time = i.frame = 0,
        i.tick = function() {
            s(!0)
        },
        i.lagSmoothing = function(a, b) {
            return arguments.length ? (o = a || 1 / n, void (q = Math.min(b, o, 0))) : 1 / n > o
        },
        i.sleep = function() {
            null != f && (m && B ? B(f) : clearTimeout(f), e = p, f = null, i === j && (k = !1))
        },
        i.wake = function(a) {
            null !== f ? i.sleep() : a ? l += -D + (D = C()) : i.frame > 10 && (D = C() - o + 5),
            e = 0 === c ? p : m && A ? A : function(a) {
                return setTimeout(a, 1e3 * (h - i.time) + 1 | 0)
            },
            i === j && (k = !0),
            s(2)
        },
        i.fps = function(a) {
            return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void i.wake()) : c
        },
        i.useRAF = function(a) {
            return arguments.length ? (i.sleep(), m = a, void i.fps(c)) : m
        },
        i.fps(a),
        setTimeout(function() {
            "auto" === m && i.frame < 5 && "hidden" !== (d || {}).visibilityState && i.useRAF(!1)
        }, 1500)
    }),
    i = m.Ticker.prototype = new m.events.EventDispatcher,
    i.constructor = m.Ticker;
    var E = u("core.Animation", function(a, b) {
        if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = !!b.immediateRender, this.data = b.data, this._reversed = !!b.reversed, Z) {
            k || j.wake();
            var c = this.vars.useFrames ? Y : Z;
            c.add(this, c._time),
            this.vars.paused && this.paused(!0)
        }
    });
    j = E.ticker = new m.Ticker,
    i = E.prototype,
    i._dirty = i._gc = i._initted = i._paused = !1,
    i._totalTime = i._time = 0,
    i._rawPrevTime = -1,
    i._next = i._last = i._onUpdate = i._timeline = i.timeline = null,
    i._paused = !1;
    var F = function() {
        k && C() - D > 2e3 && ("hidden" !== (d || {}).visibilityState || !j.lagSmoothing()) && j.wake();
        var a = setTimeout(F, 2e3);
        a.unref && a.unref()
    };
    F(),
    i.play = function(a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
    },
    i.pause = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!0)
    },
    i.resume = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!1)
    },
    i.seek = function(a, b) {
        return this.totalTime(Number(a), b !== !1)
    },
    i.restart = function(a, b) {
        return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
    },
    i.reverse = function(a, b) {
        return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
    },
    i.render = function(a, b, c) {},
    i.invalidate = function() {
        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
    },
    i.isActive = function() {
        var a,
            b = this._timeline,
            c = this._startTime;
        return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - n
    },
    i._enabled = function(a, b) {
        return k || j.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
    },
    i._kill = function(a, b) {
        return this._enabled(!1, !1)
    },
    i.kill = function(a, b) {
        return this._kill(a, b), this
    },
    i._uncache = function(a) {
        for (var b = a ? this : this.timeline; b;)
            b._dirty = !0,
            b = b.timeline;
        return this
    },
    i._swapSelfInParams = function(a) {
        for (var b = a.length, c = a.concat(); --b > -1;)
            "{self}" === a[b] && (c[b] = this);
        return c
    },
    i._callback = function(a) {
        var b = this.vars,
            c = b[a],
            d = b[a + "Params"],
            e = b[a + "Scope"] || b.callbackScope || this,
            f = d ? d.length : 0;
        switch (f) {
        case 0:
            c.call(e);
            break;
        case 1:
            c.call(e, d[0]);
            break;
        case 2:
            c.call(e, d[0], d[1]);
            break;
        default:
            c.apply(e, d)
        }
    },
    i.eventCallback = function(a, b, c, d) {
        if ("on" === (a || "").substr(0, 2)) {
            var e = this.vars;
            if (1 === arguments.length)
                return e[a];
            null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = q(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d),
            "onUpdate" === a && (this._onUpdate = b)
        }
        return this
    },
    i.delay = function(a) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
    },
    i.duration = function(a) {
        return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
    },
    i.totalDuration = function(a) {
        return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
    },
    i.time = function(a, b) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
    },
    i.totalTime = function(a, b, c) {
        if (k || j.wake(), !arguments.length)
            return this._totalTime;
        if (this._timeline) {
            if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var d = this._totalDuration,
                    e = this._timeline;
                if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                    for (; e._timeline;)
                        e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0),
                        e = e._timeline
            }
            this._gc && this._enabled(!0, !1),
            (this._totalTime !== a || 0 === this._duration) && (K.length && _(), this.render(a, b, !1), K.length && _())
        }
        return this
    },
    i.progress = i.totalProgress = function(a, b) {
        var c = this.duration();
        return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio;
    },
    i.startTime = function(a) {
        return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
    },
    i.endTime = function(a) {
        return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
    },
    i.timeScale = function(a) {
        if (!arguments.length)
            return this._timeScale;
        var b,
            c;
        for (a = a || n, this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(), this._startTime = c - (c - this._startTime) * this._timeScale / a), this._timeScale = a, c = this.timeline; c && c.timeline;)
            c._dirty = !0,
            c.totalDuration(),
            c = c.timeline;
        return this
    },
    i.reversed = function(a) {
        return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
    },
    i.paused = function(a) {
        if (!arguments.length)
            return this._paused;
        var b,
            c,
            d = this._timeline;
        return a != this._paused && d && (k || a || j.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
    };
    var G = u("core.SimpleTimeline", function(a) {
        E.call(this, 0, a),
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    i = G.prototype = new E,
    i.constructor = G,
    i.kill()._gc = !1,
    i._first = i._last = i._recent = null,
    i._sortChildren = !1,
    i.add = i.insert = function(a, b, c, d) {
        var e,
            f;
        if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = this.rawTime() - (a._timeline.rawTime() - a._pauseTime)), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
            for (f = a._startTime; e && e._startTime > f;)
                e = e._prev;
        return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
    },
    i._remove = function(a, b) {
        return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
    },
    i.render = function(a, b, c) {
        var d,
            e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e;)
            d = e._next,
            (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)),
            e = d
    },
    i.rawTime = function() {
        return k || j.wake(), this._totalTime
    };
    var H = u("TweenLite", function(b, c, d) {
            if (E.call(this, c, d), this.render = H.prototype.render, null == b)
                throw "Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : H.selector(b) || b;
            var e,
                f,
                g,
                h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? X[H.defaultOverwrite] : "number" == typeof i ? i >> 0 : X[i], (h || b instanceof Array || b.push && q(b)) && "number" != typeof b[0])
                for (this._targets = g = o(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++)
                    f = g[e],
                    f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(o(f))) : (this._siblings[e] = aa(f, this, !1), 1 === i && this._siblings[e].length > 1 && ca(f, this, null, 1, this._siblings[e])) : (f = g[e--] = H.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
            else
                this._propLookup = {},
                this._siblings = aa(b, this, !1),
                1 === i && this._siblings.length > 1 && ca(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -n, this.render(Math.min(0, -this._delay)))
        }, !0),
        I = function(b) {
            return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
        },
        J = function(a, b) {
            var c,
                d = {};
            for (c in a)
                W[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!T[c] || T[c] && T[c]._autoCSS) || (d[c] = a[c], delete a[c]);
            a.css = d
        };
    i = H.prototype = new E,
    i.constructor = H,
    i.kill()._gc = !1,
    i.ratio = 0,
    i._firstPT = i._targets = i._overwrittenProps = i._startAt = null,
    i._notifyPluginsOfEnabled = i._lazy = !1,
    H.version = "2.1.2",
    H.defaultEase = i._ease = new w(null, null, 1, 1),
    H.defaultOverwrite = "auto",
    H.ticker = j,
    H.autoSleep = 120,
    H.lagSmoothing = function(a, b) {
        j.lagSmoothing(a, b)
    },
    H.selector = a.$ || a.jQuery || function(b) {
        var c = a.$ || a.jQuery;
        return c ? (H.selector = c, c(b)) : (d || (d = a.document), d ? d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b)
    };
    var K = [],
        L = {},
        M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        N = /[\+-]=-?[\.\d]/,
        O = function(a) {
            for (var b, c = this._firstPT, d = 1e-6; c;)
                b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s,
                c.m ? b = c.m.call(this._tween, b, this._target || c.t, this._tween) : d > b && b > -d && !c.blob && (b = 0),
                c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b,
                c = c._next
        },
        P = function(a) {
            return (1e3 * a | 0) / 1e3 + ""
        },
        Q = function(a, b, c, d) {
            var e,
                f,
                g,
                h,
                i,
                j,
                k,
                l = [],
                m = 0,
                n = "",
                o = 0;
            for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(M) || [], f = b.match(M) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++)
                k = f[h],
                j = b.substr(m, b.indexOf(k, m) - m),
                n += j || !h ? j : ",",
                m += j.length,
                o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1),
                k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                    _next: l._firstPT,
                    t: l,
                    p: l.length - 1,
                    s: g,
                    c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                    f: 0,
                    m: o && 4 > o ? Math.round : P
                }),
                m += k.length;
            return n += b.substr(m), n && l.push(n), l.setRatio = O, N.test(b) && (l.end = null), l
        },
        R = function(a, b, c, d, e, f, g, h, i) {
            "function" == typeof d && (d = d(i || 0, a));
            var j,
                k = typeof a[b],
                l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
                m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
                n = "string" == typeof d && "=" === d.charAt(1),
                o = {
                    t: a,
                    p: b,
                    s: m,
                    f: "function" === k,
                    pg: 0,
                    n: e || b,
                    m: f ? "function" == typeof f ? f : Math.round : 0,
                    pr: 0,
                    c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
                };
            return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = Q(m, n ? parseFloat(o.s) + o.c + (o.s + "").replace(/[0-9\-\.]/g, "") : d, h || H.defaultStringFilter, o), o = {
                t: j,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: e || b,
                pr: 0,
                m: 0
            }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
        },
        S = H._internals = {
            isArray: q,
            isSelector: I,
            lazyTweens: K,
            blobDif: Q
        },
        T = H._plugins = {},
        U = S.tweenLookup = {},
        V = 0,
        W = S.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1,
            id: 1,
            yoyoEase: 1,
            stagger: 1
        },
        X = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        Y = E._rootFramesTimeline = new G,
        Z = E._rootTimeline = new G,
        $ = 30,
        _ = S.lazyRender = function() {
            var a,
                b,
                c = K.length;
            for (L = {}, a = 0; c > a; a++)
                b = K[a],
                b && b._lazy !== !1 && (b.render(b._lazy[0], b._lazy[1], !0), b._lazy = !1);
            K.length = 0
        };
    Z._startTime = j.time,
    Y._startTime = j.frame,
    Z._active = Y._active = !0,
    setTimeout(_, 1),
    E._updateRoot = H.render = function() {
        var a,
            b,
            c;
        if (K.length && _(), Z.render((j.time - Z._startTime) * Z._timeScale, !1, !1), Y.render((j.frame - Y._startTime) * Y._timeScale, !1, !1), K.length && _(), j.frame >= $) {
            $ = j.frame + (parseInt(H.autoSleep, 10) || 120);
            for (c in U) {
                for (b = U[c].tweens, a = b.length; --a > -1;)
                    b[a]._gc && b.splice(a, 1);
                0 === b.length && delete U[c]
            }
            if (c = Z._first, (!c || c._paused) && H.autoSleep && !Y._first && 1 === j._listeners.tick.length) {
                for (; c && c._paused;)
                    c = c._next;
                c || j.sleep()
            }
        }
    },
    j.addEventListener("tick", E._updateRoot);
    var aa = function(a, b, c) {
            var d,
                e,
                f = a._gsTweenID;
            if (U[f || (a._gsTweenID = f = "t" + V++)] || (U[f] = {
                target: a,
                tweens: []
            }), b && (d = U[f].tweens, d[e = d.length] = b, c))
                for (; --e > -1;)
                    d[e] === b && d.splice(e, 1);
            return U[f].tweens
        },
        ba = function(a, b, c, d) {
            var e,
                f,
                g = a.vars.onOverwrite;
            return g && (e = g(a, b, c, d)), g = H.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
        },
        ca = function(a, b, c, d, e) {
            var f,
                g,
                h,
                i;
            if (1 === d || d >= 4) {
                for (i = e.length, f = 0; i > f; f++)
                    if ((h = e[f]) !== b)
                        h._gc || h._kill(null, a, b) && (g = !0);
                    else if (5 === d)
                        break;
                return g
            }
            var j,
                k = b._startTime + n,
                l = [],
                m = 0,
                o = 0 === b._duration;
            for (f = e.length; --f > -1;)
                (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || da(b, 0, o), 0 === da(h, j, o) && (l[m++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2 * n || (l[m++] = h)));
            for (f = m; --f > -1;)
                if (h = l[f], i = h._firstPT, 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted && i) {
                    if (2 !== d && !ba(h, b))
                        continue;
                    h._enabled(!1, !1) && (g = !0)
                }
            return g
        },
        da = function(a, b, c) {
            for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                if (f += d._startTime, e *= d._timeScale, d._paused)
                    return -100;
                d = d._timeline
            }
            return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * n > f - b ? n : (f += a.totalDuration() / a._timeScale / e) > b + n ? 0 : f - b - n
        };
    i._init = function() {
        var a,
            b,
            c,
            d,
            e,
            f,
            g = this.vars,
            h = this._overwrittenProps,
            i = this._duration,
            j = !!g.immediateRender,
            k = g.ease,
            l = this._startAt;
        if (g.startAt) {
            l && (l.render(-1, !0), l.kill()),
            e = {};
            for (d in g.startAt)
                e[d] = g.startAt[d];
            if (e.data = "isStart", e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateParams = g.onUpdateParams, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = H.to(this.target || {}, 0, e), j)
                if (this._time > 0)
                    this._startAt = null;
                else if (0 !== i)
                    return
        } else if (g.runBackwards && 0 !== i)
            if (l)
                l.render(-1, !0),
                l.kill(),
                this._startAt = null;
            else {
                0 !== this._time && (j = !1),
                c = {};
                for (d in g)
                    W[d] && "autoCSS" !== d || (c[d] = g[d]);
                if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = H.to(this.target, 0, c), j) {
                    if (0 === this._time)
                        return
                } else
                    this._startAt._init(),
                    this._startAt._enabled(!1),
                    this.vars.immediateRender && (this._startAt = null)
            }
        if (this._ease = k = k ? k instanceof w ? k : "function" == typeof k ? new w(k, g.easeParams) : x[k] || H.defaultEase : H.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
            for (f = this._targets.length, a = 0; f > a; a++)
                this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
        else
            b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
        if (b && H._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards)
            for (c = this._firstPT; c;)
                c.s += c.c,
                c.c = -c.c,
                c = c._next;
        this._onUpdate = g.onUpdate,
        this._initted = !0
    },
    i._initProps = function(b, c, d, e, f) {
        var g,
            h,
            i,
            j,
            k,
            l;
        if (null == b)
            return !1;
        L[b._gsTweenID] && _(),
        this.vars.css || b.style && b !== a && b.nodeType && T.css && this.vars.autoCSS !== !1 && J(this.vars, b);
        for (g in this.vars)
            if (l = this.vars[g], W[g])
                l && (l instanceof Array || l.push && q(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
            else if (T[g] && (j = new T[g])._onInitTween(b, this.vars[g], this, f)) {
                for (this._firstPT = k = {
                    _next: this._firstPT,
                    t: j,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: g,
                    pg: 1,
                    pr: j._priority,
                    m: 0
                }, h = j._overwriteProps.length; --h > -1;)
                    c[j._overwriteProps[h]] = this._firstPT;
                (j._priority || j._onInitAllProps) && (i = !0),
                (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0),
                k._next && (k._next._prev = k)
            } else
                c[g] = R.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
        return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && ca(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[b._gsTweenID] = !0), i)
    },
    i.render = function(a, b, c) {
        var d,
            e,
            f,
            g,
            h = this,
            i = h._time,
            j = h._duration,
            k = h._rawPrevTime;
        if (a >= j - n && a >= 0)
            h._totalTime = h._time = j,
            h.ratio = h._ease._calcEnd ? h._ease.getRatio(1) : 1,
            h._reversed || (d = !0, e = "onComplete", c = c || h._timeline.autoRemoveChildren),
            0 === j && (h._initted || !h.vars.lazy || c) && (h._startTime === h._timeline._duration && (a = 0), (0 > k || 0 >= a && a >= -n || k === n && "isPause" !== h.data) && k !== a && (c = !0, k > n && (e = "onReverseComplete")), h._rawPrevTime = g = !b || a || k === a ? a : n);
        else if (n > a)
            h._totalTime = h._time = 0,
            h.ratio = h._ease._calcEnd ? h._ease.getRatio(0) : 0,
            (0 !== i || 0 === j && k > 0) && (e = "onReverseComplete", d = h._reversed),
            a > -n ? a = 0 : 0 > a && (h._active = !1, 0 === j && (h._initted || !h.vars.lazy || c) && (k >= 0 && (k !== n || "isPause" !== h.data) && (c = !0), h._rawPrevTime = g = !b || a || k === a ? a : n)),
            (!h._initted || h._startAt && h._startAt.progress()) && (c = !0);
        else if (h._totalTime = h._time = a, h._easeType) {
            var l = a / j,
                m = h._easeType,
                o = h._easePower;
            (1 === m || 3 === m && l >= .5) && (l = 1 - l),
            3 === m && (l *= 2),
            1 === o ? l *= l : 2 === o ? l *= l * l : 3 === o ? l *= l * l * l : 4 === o && (l *= l * l * l * l),
            h.ratio = 1 === m ? 1 - l : 2 === m ? l : .5 > a / j ? l / 2 : 1 - l / 2
        } else
            h.ratio = h._ease.getRatio(a / j);
        if (h._time !== i || c) {
            if (!h._initted) {
                if (h._init(), !h._initted || h._gc)
                    return;
                if (!c && h._firstPT && (h.vars.lazy !== !1 && h._duration || h.vars.lazy && !h._duration))
                    return h._time = h._totalTime = i, h._rawPrevTime = k, K.push(h), void (h._lazy = [a, b]);
                h._time && !d ? h.ratio = h._ease.getRatio(h._time / j) : d && h._ease._calcEnd && (h.ratio = h._ease.getRatio(0 === h._time ? 0 : 1))
            }
            for (h._lazy !== !1 && (h._lazy = !1), h._active || !h._paused && h._time !== i && a >= 0 && (h._active = !0), 0 === i && (h._startAt && (a >= 0 ? h._startAt.render(a, !0, c) : e || (e = "_dummyGS")), h.vars.onStart && (0 !== h._time || 0 === j) && (b || h._callback("onStart"))), f = h._firstPT; f;)
                f.f ? f.t[f.p](f.c * h.ratio + f.s) : f.t[f.p] = f.c * h.ratio + f.s,
                f = f._next;
            h._onUpdate && (0 > a && h._startAt && a !== -1e-4 && h._startAt.render(a, !0, c), b || (h._time !== i || d || c) && h._callback("onUpdate")),
            e && (!h._gc || c) && (0 > a && h._startAt && !h._onUpdate && a !== -1e-4 && h._startAt.render(a, !0, c), d && (h._timeline.autoRemoveChildren && h._enabled(!1, !1), h._active = !1), !b && h.vars[e] && h._callback(e), 0 === j && h._rawPrevTime === n && g !== n && (h._rawPrevTime = 0))
        }
    },
    i._kill = function(a, b, c) {
        if ("all" === a && (a = null), null == a && (null == b || b === this.target))
            return this._lazy = !1, this._enabled(!1, !1);
        b = "string" != typeof b ? b || this._targets || this.target : H.selector(b) || b;
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline,
            n = this._firstPT;
        if ((q(b) || I(b)) && "number" != typeof b[0])
            for (d = b.length; --d > -1;)
                this._kill(a, b[d], c) && (i = !0);
        else {
            if (this._targets) {
                for (d = this._targets.length; --d > -1;)
                    if (b === this._targets[d]) {
                        h = this._propLookup[d] || {},
                        this._overwrittenProps = this._overwrittenProps || [],
                        e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                        break
                    }
            } else {
                if (b !== this.target)
                    return !1;
                h = this._propLookup,
                e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
            }
            if (h) {
                if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (H.onOverwrite || this.vars.onOverwrite)) {
                    for (f in j)
                        h[f] && (l || (l = []), l.push(f));
                    if ((l || !a) && !ba(this, c, b, l))
                        return !1
                }
                for (f in j)
                    (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]),
                    k && (e[f] = 1);
                !this._firstPT && this._initted && n && this._enabled(!1, !1)
            }
        }
        return i
    },
    i.invalidate = function() {
        this._notifyPluginsOfEnabled && H._onPluginEvent("_onDisable", this);
        var a = this._time;
        return this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], E.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -n, this.render(a, !1, this.vars.lazy !== !1)), this
    },
    i._enabled = function(a, b) {
        if (k || j.wake(), a && this._gc) {
            var c,
                d = this._targets;
            if (d)
                for (c = d.length; --c > -1;)
                    this._siblings[c] = aa(d[c], this, !0);
            else
                this._siblings = aa(this.target, this, !0)
        }
        return E.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? H._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
    },
    H.to = function(a, b, c) {
        return new H(a, b, c)
    },
    H.from = function(a, b, c) {
        return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new H(a, b, c)
    },
    H.fromTo = function(a, b, c, d) {
        return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new H(a, b, d)
    },
    H.delayedCall = function(a, b, c, d, e) {
        return new H(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            lazy: !1,
            useFrames: e,
            overwrite: 0
        })
    },
    H.set = function(a, b) {
        return new H(a, 0, b)
    },
    H.getTweensOf = function(a, b) {
        if (null == a)
            return [];
        a = "string" != typeof a ? a : H.selector(a) || a;
        var c,
            d,
            e,
            f;
        if ((q(a) || I(a)) && "number" != typeof a[0]) {
            for (c = a.length, d = []; --c > -1;)
                d = d.concat(H.getTweensOf(a[c], b));
            for (c = d.length; --c > -1;)
                for (f = d[c], e = c; --e > -1;)
                    f === d[e] && d.splice(c, 1)
        } else if (a._gsTweenID)
            for (d = aa(a).concat(), c = d.length; --c > -1;)
                (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
        return d || []
    },
    H.killTweensOf = H.killDelayedCallsTo = function(a, b, c) {
        "object" == typeof b && (c = b, b = !1);
        for (var d = H.getTweensOf(a, b), e = d.length; --e > -1;)
            d[e]._kill(c, a)
    };
    var ea = u("plugins.TweenPlugin", function(a, b) {
        this._overwriteProps = (a || "").split(","),
        this._propName = this._overwriteProps[0],
        this._priority = b || 0,
        this._super = ea.prototype
    }, !0);
    if (i = ea.prototype, ea.version = "1.19.0", ea.API = 2, i._firstPT = null, i._addTween = R, i.setRatio = O, i._kill = function(a) {
        var b,
            c = this._overwriteProps,
            d = this._firstPT;
        if (null != a[this._propName])
            this._overwriteProps = [];
        else
            for (b = c.length; --b > -1;)
                null != a[c[b]] && c.splice(b, 1);
        for (; d;)
            null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)),
            d = d._next;
        return !1
    }, i._mod = i._roundProps = function(a) {
        for (var b, c = this._firstPT; c;)
            b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")],
            b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b),
            c = c._next
    }, H._onPluginEvent = function(a, b) {
        var c,
            d,
            e,
            f,
            g,
            h = b._firstPT;
        if ("_onInitAllProps" === a) {
            for (; h;) {
                for (g = h._next, d = e; d && d.pr > h.pr;)
                    d = d._next;
                (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h,
                (h._next = d) ? d._prev = h : f = h,
                h = g
            }
            h = b._firstPT = e
        }
        for (; h;)
            h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
            h = h._next;
        return c
    }, ea.activate = function(a) {
        for (var b = a.length; --b > -1;)
            a[b].API === ea.API && (T[(new a[b])._propName] = a[b]);
        return !0
    }, t.plugin = function(a) {
        if (!(a && a.propName && a.init && a.API))
            throw "illegal plugin definition.";
        var b,
            c = a.propName,
            d = a.priority || 0,
            e = a.overwriteProps,
            f = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_mod",
                mod: "_mod",
                initAll: "_onInitAllProps"
            },
            g = u("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                ea.call(this, c, d),
                this._overwriteProps = e || []
            }, a.global === !0),
            h = g.prototype = new ea(c);
        h.constructor = g,
        g.API = a.API;
        for (b in f)
            "function" == typeof a[b] && (h[f[b]] = a[b]);
        return g.version = a.version, ea.activate([g]), g
    }, g = a._gsQueue) {
        for (h = 0; h < g.length; h++)
            g[h]();
        for (i in r)
            r[i].func || a.console.log("GSAP encountered missing dependency: " + i)
    }
    k = !1
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

// Pdp dependencies - pinchzommer
/*!
 * VERSION: 2.3
 * DATE: 04-07-2019
 * 
 * PinchZoomer (minified)
 *
 * @license Copyright (c) 2018, Ron Feliciano. All rights reserved.
 * This work is subject to the terms at http://codecanyon.net/licenses
 * 
 * @author: Ron Feliciano
 * contact me through http://codecanyon.net/user/ronfeliciano/?ref=ronfeliciano
 **/

var _0x3439 = ['(3(p,b){3 a(){}a.3B=3(){4 a=1R.5k,b=a.6Z(/(86|87|81|83|8e|6e(?=\\/))\\/?\\s*([\\d\\.]+)/i)||[];j(/6e/i.8d(b[1])){4 c=/\\80[ :]+(\\d+(\\.\\d+)?)/g.7M(a)||[];12{1j:"7N",3G:c[1]||""}}b=b[2]?[b[1],b[2]]:[1R.7O,1R.7L,"-?"];7!=(c=a.6Z(/3G\\/([\\.\\d]+)/i))&&(b[2]=c[1]);12 2<b.8?{1j:b[0],3G:b[2]}:{1j:b[0],3G:b[1]}}();a.4C=3(a){4 d=a;18 0!==a&&(1f(6L(a))?18 0===a.3F||"70"!=a.3F()&&"7K"!=a.3F()?(a=b.3H(a),2<=a.8&&"\'"==a.26(0)&&"\'"==a.26(a.8-1)&&(d=a=a.4H(1,a.8-2))):d="70"==a.3F():d=6L(a));12 d};a.6U=3(a){12 a.7H(/-([a-z])/7I,3(a,d){12 d.7J()})};a.1p=3(a){a.1p?a.1p():a.7P=!1};a.7Q=3(a){18 0!==a&&18 0!=a.6Q&&a.6Q.1p()};a.4M=3(a,b){19(4 c=[],d=0,g=0,f=0,n=0,m="",w=0;w<a.8;w++){4 y=a.26(w);"{"==y?d++:"}"==y?g++:"["==y?f++:"]"==y&&n++;d==g&&f==n?y!=b?m+=y:(c.1Y(m),m=""):m+=y}""!=m&&c.1Y(m);12 c};a.1u=3(d){d=b.3H(d);4 m=d.8;j(1<m)j("["==d.26(0)&&"]"==d.26(m-1)){d=d.4H(1,d.8-2);m=[];4 c=a.4M(d,",");19(d=0;d<c.8;d++){4 e=b.3H(c[d]);m.1Y(a.1u(e))}d=m}1k j("{"==d.26(0)&&"}"==d.26(m-1)){d=d.4H(1,d.8-2);m={};c=a.4M(d,";");19(d=0;d<c.8;d++){e=c[d].6P(":");4 g="";4 f=a.6U(b.3H(e[0]));2==e.8?g=a.1u(e[1]):2<e.8&&(e.2F(0,1),g=a.1u(e.73(":")));""!=f&&(m[f]=g)}d=m}1k d=a.4C(d);1k d=a.4C(d);12 d};a.8M=3(a){19(4 b=a.8,c,d;0!==b;)d=1L.8L(1L.8H()*b),--b,c=a[b],a[b]=a[d],a[d]=c;12 a};a.2w=3(b,m){m.36=5r.5j?5r.5j(b.36):a.5X(b.36);12 m.36};a.5X=3(a){3 b(){}b.36=a;12 1I b};a.8r=3(){12"8s"2R p||0<1R.8q||0<1R.4r};a.3I=1;a.8p=3(d,m){m?4u.4i(a.3I+": "+d):b("#8w").5Q(a.3I+":&8y;"+d+"<8z>");a.3I++};a.5J=3(d,m){m=m||{};m.4K=7!=m.4K?m.4K:"1D-7c";j(7!=b.45.1D){4 c=d?b(d).2q("*[o-1X]").3K(".2b"):b("*[o-1X]").3K(".2b"),e=c.8,g=0,f={};"57"==a.3B.1j?f.3J="6Y":(f.3J="6x",f.6t={3A:!0},f.5C={3C:!0});f=b.1x({},f,m);19(g=0;g<e;g++){4 n=c.1n(g),x=b.1x({},f,a.1u("{"+n.o("1X-2e")+"}"));n.2L("75",n.o("1X"));n.1D(x);(1I 2U(n.30(0))).1c("3E 6v",3(a){4 c=b(a.13).4z(".2b");0<c.8&&("3E"==a.14?c.1D("66"):c.1D("4W"))})}c=d?b(d).2q("*[o-1X-4T]").3K(".2b"):b("*[o-1X-4T]").3K(".2b");f={7x:!0};"57"==a.3B.1j?f.3J="6Y":(f.3J="6x",f.6t={3A:!0},f.5C={3C:!0});f=b.1x({},f,m);e=c.8;19(g=0;g<e;g++)n=c.1n(g),x=b.1x({},f,a.1u("{"+c.o("1X-2e")+"}")),n.2L("o-1X-7a",n.2L("o-1X-4T")),n.1D(x),(1I 2U(n.30(0))).1c("3E 6v",3(a){0<b(a.13).4z(".2b").8&&("3E"==a.14?b(a.13).1D("66"):b(a.13).1D("4W"))})}};a.5d=3(a){7!=b.45.1D&&b(a||".2b").1D("4W")};a.56=3(a){7!=b.45.1D&&b(a||".2b").1D("7t")};p.1e=a})(2h,1s);(3(p,b){4 a=3(){};a.17=".1T";a.3y="6T"+a.17;a.4x="7s"+a.17;a.1C={2t:b("<1K 47=\'4f:7k; 3g:1w; 3j:1w; 4J:1w; 4v:1w; 1S:3q; z-7j:7m\'></1K>"),2r:b("<1K></1K>"),2A:"2t",1E:!1,4t:b("4A").2E("1S"),4s:0,4k:0};a.2i=7;a.1E=3(d){12 b.33(a.1C.2t[0],d[0])};a.7n=3(b){a.1q(!a.1C.1E,b)};a.1q=3(d,m){4 c=a.1C;j("3i"===1s.14(d)){4 e=a.2i,g=b(m),f=b("4A"),n=b(p),x=c.1E,w=c.2t;d&&x&&!e.1N(g)?(e.6c(c.2A),c.2r.3D(e),c.2r.3c(),g.3D(c.2r),g.6f(c.2A),w.1m(g),a.2i=g,c.1E=!0,b(a).16({14:a.3y,13:a})):d!=x&&(d?7==e&&0<g.8?(f.1m(w),c.4t=f.2E("1S"),c.4s=n.3M(),c.4k=n.2P(),f.2E("1S","2O"),g.3D(c.2r),g.6f(c.2A),w.1m(g),a.2i=g,c.1E=!0,b(a).16({14:a.3y,13:a})):4u.4i("7r 1N 7q 7p 6N 2R 1q 6M 11 6H 1N 6R."):7!=e&&e.1N(g)?(g.6c(c.2A),c.2r.3D(g),c.2r.3c(),c.2t.3c(),f.2E("1S",c.4t),n.3M(c.4s),n.2P(c.4k),a.2i=7,c.1E=!1,b(a).16({14:a.3y,13:a})):4u.4i("7i 7A 7D 7z 1N 6W 7y 6N 2R 1q 6M 11 6H 1N 6R"))}12 c.1E};b(5Z).7w(3(d){27==d.7E&&7!=a.2i&&(d=a.2i,a.1q(!1,a.2i),b(a).16({14:a.4x,13:a,11:d}))});p.1T=a})(2h,1s);(3(p,b){p.38=3(){4 a=1o,d=b(a);a.1C={};a.1d=3(d){18 0!==d&&b.1x(a.1C,d);12 a.1C};a.1c=3(){d.1c.2a(d,28)};a.1U=3(){d.1U.2a(d,28)};a.1g=3(){d.1g.2a(d,28)};a.o=3(){12 d.o.2a(d,28)}}})(2h,1s);(3(p,b){4 a=3(m,c){d.2d(1o);4 e=1o,g=7,f=e.1C;4 n=e.1d;e.1d=3(a,b){18 0!==a&&(n.2d(e,a),e.1P());12 f};e.11=3(c){18 0!==c&&(7!=g&&g.o("3z",7),g=7,g=b(c),g.o("3z",e),b(e).16({14:a.2k,13:e}),e.1P());12 g};e.6T=3(){f.2o=!f.2o;e.1P()};e.49=3(a,b){18 0==a||a==f.2o&&!b||(f.2o=a,e.1P());12 f.2o};e.1P=3(){7!=g&&(1b.1v(g,f.1r,f.2o?f.53:f.59),b(e).16({14:a.2W,13:e}))};e.1d(b.1x({2o:!0,1r:0,53:{2J:1,1M:!0},59:{2J:.5,1M:!0}},c));e.11(m)},d=38;1e.2w(d,a).2V=a;a.17=".74";a.2W="1P"+a.17;a.2k="4S"+a.17;p.4a=a})(2h,1s);(3(p,b){4 a=3(m,c){3 e(a){a=n(a.13);j(-1!=a){4 b=q[a],c=b.o("32");j(b.o("1A"))b.1i("1V"),b.1i("2I"),b.1i("32"),b.1i("1A"),b.1i("2Y");1k{4 d=b.o("1V");c[0].47.6D="1V("+d+")";b.1O()}q.2F(a,1);w();V||l.1F()}}3 g(a){a=n(a.13);j(-1!=a){4 b=q[a],c=b.o("2Y"),d=b.o("1V");J.5A&&""!=c&&c!=d?b.1g("1F",e).1g("3x",g).1U("1F",e).1U("3x",f).2L("1Q",c):(b.o("1A")?(b.1i("1V"),b.1i("2I"),b.1i("32"),b.1i("1A"),b.1i("2Y")):b.1O(),q.2F(a,1),w(),V||l.1F())}}3 f(a){a=n(a.13);j(-1!=a){4 b=q[a],c=b.o("1A");b.1i("1V");b.1i("2I");b.1i("32");b.1i("1A");b.1i("2Y");c||b.1O();q.2F(a,1);w();V||l.1F()}}3 n(a){4 c=-1;a=b(a);19(4 d=q.8,g=0;g<d;g++){4 f=q[g];a.30(0)==f.30(0)&&(c=g,g=d)}12 c}3 x(c,d){a.52=!1;a.5l();c=b(c);4 g=p(c);7!=g&&(d?q.1Y(g):q.6O(g));g=c.2q("*[o-1Q]");19(4 f=g.8,e=0;e<f;e++){4 l=p(g.1n(e));7!=l&&(d?q.1Y(l):q.6O(l))}}3 w(){K.16({14:a.5S,13:l});7!=q&&0==q.8&&K.16({14:a.2y,13:l})}3 p(c){4 d=7;j(7!=c.o("1Q")&&""!=c.o("1Q")){4 g=c.1N("1A");c.2E("4O-1A");4 f="3i"===b.14(c.o("3w"))?c.o("3w"):J.3w,e="",l="",n=1e.1u(c.o("1Q")),q=!1;b.5t(n)?0<n.8?(f=0,0<=a.1H&&a.1H<n.8&&(f=a.1H),e=n[f],0!=f&&(l=n[0]),"5u"!=1s.14(e)&&(q=!0)):q=!0:f?("1j"==J.5L?(e=n.6P("."),5p=e.7b(),71=e.73("."),e=71+"78"+a.1J[a.1H].1j+"."+5p):(e=n.5n(0,n.5m("/")),l=n.5n(n.5m("/")+1,n.8),e=""!=e?e+"/"+a.1J[a.1H].1j+"/"+l:a.1J[a.1H].1j+"/"+l),l=n):e=c.o("1Q");q||(c.4b("o-1Q"),c.1i("1Q"),g?(d=c,d.4b("1Q")):d=b("<1A/>"),d.o("1V",e),d.o("2I",!1),d.o("32",c),d.o("1A",g),d.o("2Y",l))}12 d}d.2d(1o);4 l=1o,K=b(l),q=[],J=l.1C,V=!0;l.1m=3(a){18 0!==a&&x(a,!0)};l.5Q=3(a){18 0!==a&&x(a,!1)};l.6G=3(){q=[];V=!0};l.1F=3(){V=!1;19(4 a=q.8,b=0;b<J.4X;b++)j(b<a){4 c=q[b];c.o("2I")||(c.o("2I",!0),c.1g("1F",e).1g("3x",g).1U("1F",e).1U("3x",g).2L("1Q",c.o("1V")))}1k b=J.4X;0==a&&w()};l.7l=3(){};l.1d(b.1x({},{5A:!1,5L:"7B",3w:!1,4X:6},c));l.1m(m)},d=38;1e.2w(d,a).2V=a;a.17=".22";a.2y="5V"+a.17;a.5S="7u"+a.17;a.1J=[{1j:"7h",29:7v},{1j:"7f",29:7g},{1j:"7d",29:7e}];a.52=!0;a.1H=-1;a.5v=3(){a.1J.76(3(a,b){12 5s(a.29)-5s(b.29)})};a.6J=3(d){j(a.52&&b.5t(d)&&0<d.8){19(4 c=!0,e=d.8,g=0;g<e;g++){4 f=d[g];j(7==f.1j||7==f.29||"5u"!==77 f.1j||1f(f.29))c=!1,g=e}c&&(a.1J=7,a.1J=d,a.5v())}};a.5l=3(){j(0>a.1H)j(7!=p.5c){4 b=1L.79(5c.2M,5c.2z);a.1H=0;19(4 c=a.1J.8-1;0<=c;c--)b>=a.1J[c].29&&(a.1H=c,c=-1)}1k a.1H=0};p.22=a})(2h,1s);(3(p,b){4 a=3(m,c){3 e(b){l=p>=x.20&&p<=x.1G;7==n||y==l&&!b||(1b.1t(n,l?{2J:1}:{2J:0}),y=l,f.16({14:a.2W,13:g}))}d.2d(1o,m,c);4 g=1o,f=b(g),n=7,x=g.1C,p=1,y=!1,l=!0;4 K=g.1d;g.1d=3(a,b){18 0!==a&&(K.2d(g,a),b&&g.1P());12 x};g.11=3(c){18 0!==c&&(7!=n&&n.o("3z",7),n=7,n=b(c),n.o("3z",g),f.16({14:a.2k,13:g}),g.1P());12 n};g.1P=3(){j(7!=n){4 b=(l=p>=x.20&&p<=x.1G)?{2J:1}:{2J:0};b.x=x.x;b.y=x.y;b.1y=x.1y;b.1M=!0===x.1M;b.4U="2O";x.4V||(b.3k=1);1b.1t(n,b);f.16({14:a.2W,13:g})}};g.1h=3(a,b,c,d){7!=n&&18 0!==a&&(b=b||1,p=x.5q?a*b:a,x.4V&&1b.1v(n,d||0,{3k:1/(a*b)}),e());12 p};g.1d(b.1x({x:0,y:0,1y:"50% 50%",20:0,1G:8x,4V:!0,5q:!1,1M:!1},c));g.11(m);e(!0)},d=38;1e.2w(d,a).2V=a;a.17=".5I";a.2W="1P"+a.17;a.2k="4S"+a.17;p.51=a})(2h,1s);(3(p,b){4 a=3(m,c,e,g){3 f(){7!=1Z&&(1Z.8A(!0),1Z.8B(),1Z=7)}3 n(){7==v||h.34||(l(),1Z=1I 2U.8E(v[0],{5i:3Y?3e:"8D"}),1Z.5K(1I 2U.8C({8v:"5w",8u:2})),1Z.1c("8o.6d",J),1Z.1c("5w",K))}3 x(){7==v||h.34||(v.1g("3A",58),D.1g("5h",4I),D.1g("3C",4R),1b.1t(v,{5g:"8n"}),h.2v&&(v.1c("3A",58),D.1c("5h",4I),D.1c("3C",4R),1b.1t(v,{5g:"1h-2R"})))}3 w(a){h.3o&&(a=b(a.13),k.3o(a))}3 y(a){3Y&&a!=3O&&(3O=a,7!=v&&1b.1t(v,{5i:3O}))}3 l(){3Y&&(3e=r>k.1a||F>A||G>B||h.2f&&h.23?"54":h.2f?"2u-y":h.23?"2u-x":"2u-x 2u-y")}3 K(a){j(P&&!Z){4 b=S,c=!1;b>=h.3p||b>=h.1G?(b=h.20,c=!0):b=h.3p;4 z=h.1G;b>z?b=z:b<k.1a&&(b=k.1a);h.21&&h.62&&(P&&2x(),M=t,N=u,z=a.48,2H=z.x-3a-t,2G=z.y-3b-u,W=F,X=G,E(b),L(!1,c),P=!1,Y(),S=r)}a.2l.1p()}3 q(a){4 c=-a.31.8m;3d=!1;j(0==k.1B&&h.21&&h.3l&&!h.2v){j(P||!3t)2x(),3t=!0;4 z=S,d=h.1G;0<c?(3d=z<d?!0:!1,z+=h.2X):(3d=z>k.1a?!0:!1,z-=h.2X);z>d?z=d:z<k.1a&&(z=k.1a);M=t;N=u;2H=a.31.3V-3a-t;2G=a.31.3v-3b-u;W=F;X=G;E(z);L();P=!1;Y();S=r}z="57"==1e.3B.1j;3d||!h.63?a.31.1p():z&&h.6A&&(z=b(h.3m),0!=z.8&&(d=z.2P(),d=0<c?d-5P:d+5P,p.4Y?1b.1v(z,h.3n,{4Z:{y:d}}):z.2P(d)),a.31.1p())}3 J(c){j(1==c.2B.8)j(h.6s&&!Z&&P){j(1!=k.1B){3S=!1;S=r;W=F;X=G;M=t;N=u;2j=2n=0;2c=7;41=c.2B[0].3V>>0;3Z=c.2B[0].3v>>0;4 d=b(h.3m);0!=d.8&&(3N=d.2P(),3P=d.3M());("5O"==c.5x||F>A||G>B||h.2f&&h.23)&&c.2l.1p()}1k{3U=c.2B[0].3V>>0;3T=c.2B[0].3v>>0;d=3U-41;4 z=3T-3Z,g=1L.3W(d),e=1L.3W(z);"x"==2c?e=z=0:"y"==2c&&(g=d=0);j(3S||5<=g||5<=e)t=M+d,u=N+z,L(!0),2S(0),3S=!0;S>k.1a||F>A||G>B||h.2f&&h.23?c.2l.1p():h.2f!=h.23&&(g>e?(7==2c&&(2c="x"),h.2f&&c.2l.1p()):e>g&&(7==2c&&(2c="y"),h.23&&c.2l.1p()))}c.8l?("5O"!=c.5x&&(2T=!0),T.16({14:a.6E,13:k})):c.3L?(M=t,N=u,k.1B=0,T.16({14:a.39,13:k})):k.1B=1}1k Z?c.2l.1p():c.3L&&(k.1B=0,1b.1v(3Q,.1,{3X:V}),T.16({14:a.39,13:k}));1k 1<c.2B.8?(0==k.1B&&(S=r,W=F,X=G,M=t,N=u),h.21&&h.6a&&(2!=k.1B?(2x(),d=c.48,2H=d.x-3a-M,2G=d.y-3b-N,W=F,X=G,M=t,N=u):(E(S*c.3k),L(),P=!1,Y()),k.1B=2,c.3L&&(M=t,N=u,k.1B=0,T.16({14:a.39,13:k})),c.2l.1p(),y("54"))):c.3L&&(M=t,N=u,k.1B=0,T.16({14:a.39,13:k}));l();y(3e);T.16({14:a.6b,13:k,8t:c})}3 V(){2T=!1}3 E(a){r=a;a=h.1G;r>a?r=a:r<k.1a&&(r=k.1a);F=H*C*r>>0;G=I*C*r>>0;4j=2H/W;4h=2G/X;t=M-(F-W)*4j;u=N-(G-X)*4h}3 L(c,d){4 z=t,g=u,e=C*r,f=H*e;e*=I;h.6r&&!d&&r>k.1a&&!Z?(t>-O+.5*A?t=-O+.5*A:t+F<.5*A-O&&(t=.5*A-F-O),u>-Q+.5*B?u=-Q+.5*B:u+G<.5*B-Q&&(u=.5*B-G-Q)):(f<=A?t=.5*(A-f)-O:t>-O?t=-O:t+f<A-O&&(t=A-f-O),e<=B?u=.5*(B-e)-Q:u>-Q?u=-Q:u+e<B-Q&&(u=B-e-Q));c&&(2n=t-z,2j=u-g,f=b(h.3m),S>k.1a&&0!=f.8&&(h.6y&&0!=2n&&(p.4Y?1b.1v(f,h.3n,{4Z:{x:3P+2n}}):f.3M(3P+2n)),h.6z&&0!=2j&&(p.4Y?1b.1v(f,h.3n,{4Z:{y:3N+2j}}):f.2P(3N+2j))),h.2f&&t!=z&&T.16({14:a.6w,x:2n,13:k}),h.23&&u!=g&&T.16({14:a.61,y:2j,13:k}))}3 U(){P=!0;7!=v&&(1b.1t(v,{5U:"3q",5B:0}),4y&&3u())}3 Y(b){j(7!=v){r=1L.4g(2C*r)/2C;b=1f(b)?h.1r:b;4 c={3k:r*C,x:t,y:u,1M:h.1M,4U:"2O",5U:"-8G-8R-8V",5B:.8U,6V:!1,3X:U};"5y"==h.35?1e.5d():"5F"==h.35&&(c.8W=1e.56);1b.1v(v,b,c);4y||3u(b);T.16({14:a.4B,x:t,y:u,1h:r,13:k})}}3 3u(a){j(0<R.8){a=1f(a)?h.1r:a;19(4 b=1/r,c=0;c<R.8;c++)R[c].1h(r,C,b,a)}}3 2S(b){7!=v&&(b=1f(b)?h.1r:b,1b.1v(v,b,{1y:"1w 1w",x:t,y:u,1M:h.1M,4U:"2O"}),"5y"==h.35?(b=1L.3W(3T-3Z),(5<1L.3W(3U-41)||5<b)&&1e.5d()):"5F"==h.35&&1e.56(),T.16({14:a.69,x:t,y:u,13:k}))}3 2x(){j(7!=v){4 a=v[0].5G();3a=a.3g-t;3b=a.3j-u}}3 58(a){2T||Z||1b.1v(3Q,.1,{3X:5N})}3 5N(){j(h.21&&h.2v){4 a=h.5a||2;Z=!0;k.2Q({1h:a,x:-4G,y:-4F},h.1r)}}3 4I(a){j(h.21&&h.2v&&!2T){4 b=D[0].5G(),c=h.5a||2,d=(a.3V-b.3g-h.3h)/(A-2*h.3h)*A;b=(a.3v-b.3j-h.3h)/(B-2*h.3h)*B;Z?k.2Q({1h:c,x:-d-O,y:-b},h.1r):(4G=d,4F=b)}a.1p()}3 4R(a){1b.1v(3Q,.15,{3X:5E});P=!1;k.1h(h.20,h.1r);Z=!1}3 5E(){h.21&&h.2v&&0==k.1B&&(Z=P=!1,k.1h(h.20,h.1r))}d.2d(1o);4 k=1o,T=b(k),h=k.1C,D=7,v=7,R=[],1Z=7,3Y=1R.4r&&1<1R.4r||!1f(1R.7F),M=0,N=0,t=0,u=0,2n=0,2j=0,r=1,S=1,C=1,4j=0,4h=0,2H=0,2G=0,41=0,3Z=0,3U=0,3T=0,W=0,X=0,F=0,G=0,H=0,I=0,4m=0,4o=0,O=0,Q=0,3a=0,3b=0,A=0,B=0,3r=0,3s=0,3O="",3e="2u-x 2u-y",2c=7,P=!0,3N=0,3P=0,3t=!1,4D="",3d=!0,43=1,Z=!1,3Q={},4G=0,4F=0,2T=!1,4y=-1!=1R.5k.8J("8I/9.0"),3S=!1;4 72=k.1d;k.1a=1;k.1B=0;k.1W=3(c){18 0===c||7!=D&&D[0]==b(c)[0]||(D=b(c).1n(0),4D=D.2E("1S"),h.55&&1b.1t(D,{1S:"2O"}),7!=v&&(D.1m(v),k.2p(!0,!0)),x(),T.16({14:a.4w,13:k}));12 D};k.11=3(c,d){j(7!=c&&7!=D&&(7==v||!b.33(D[0],b(c)[0]))){7!=v&&(f(),v.1g("3R",q),d?v.1O():b.33(D[0],v[0])&&v.3c());v=b(c).1n(0);D.1m(v);k.2p(!0,!0);n();j(h.3l&&!h.34)v.1c("3R",q);T.16({14:a.2k,13:k})}12 v};k.2K=3(a,b){7!=v&&18 0!=a&&(k.6i(b),k.5o(a));12 R};k.5o=3(a){j(7!=v&&18 0!=a){19(4 b=a.8,c=0;c<b;c++){4 d=a[c];v.1N("1A")||(v.1m(d.11()),(1I 2U(d.11()[0])).1c("8Q",w),R.1Y(d))}r>=k.1a&&k.1h(r,0);1e.5J(v,h.6n)}};k.6i=3(a){19(4 b=R.8-1;0<=b;b--)k.6X(b,a);R=[]};k.6X=3(a,b){4 c=R.8;0<=a&&a<c&&(c=R[a],b&&c.11().1O(),R.2F(a,1))};k.1d=3(a){j(18 0!==a){7!=k.11()&&1T.1E(k.11());72.2d(k,a);7!=D&&(h.55?1b.1t(D,{1S:"2O"}):1b.1t(D,{1S:4D}));j(7!=v&&(v.1g("3R",q),h.3l&&!h.34))v.1c("3R",q);k.2p(!0);x();f();n()}12 h};k.8O=3(){12 C};k.1h=3(a,b){j(18 0!==a){4 c=a,d=h.1G;4 e=h.68;4 g=h.67;c>d?c=d:c<k.1a&&(c=k.1a);h.21&&(P&&2x(),M=t,N=u,2H=H*C*k.1a*e-t,2G=I*C*k.1a*g-u,W=F,X=G,E(c),L(),P=!1,Y(b),S=r)}12 r};k.4d=3(a){k.1h(r+h.2X,a)};k.4e=3(a){k.1h(r-h.2X,a)};k.x=3(a,b){18 0!==a&&(t=a,L(!0),2S(b));12 t};k.y=3(a,b){18 0!==a&&(u=a,L(!0),2S(b));12 u};k.2Q=3(a,b,c){7!=a&&(b=1f(b)?h.1r:b,t=1f(a.x)?t:a.x,u=1f(a.y)?u:a.y,r=a.1h||r,F=H*C*r,G=I*C*r,L(c),Y(b),S=r)};k.8N=3(a,b,c,d){7!=a&&7!=b&&(t=a,u=b,L(d),2S(c))};k.8F=3(a){k.x(t-1d.2Z,a)};k.8j=3(a){k.x(t+1d.2Z,a)};k.8k=3(a){k.y(u-1d.2Z,a)};k.7S=3(a){k.y(u+1d.2Z,a)};k.3o=3(a,c,d){j(7!=a){a=a 7R 1s?a:b(a);c=1f(c)?r<=k.1a?h.3p:r:c;d=1f(d)?h.1r:d;19(4 e=0;e<R.8;e++){4 g=R[e],f=g.11();j(0<a.4z(f).8||a.1N(f))e=g.1d(),k.2Q({1h:c,x:-(e.x*c*C-.5*A+O),y:-(e.y*c*C-.5*B+Q)},d,!1),e=R.8}}};k.7U=3(a,b,c){7!=a&&(b=b||r,c=1f(c)?0:c,k.2Q({1h:b,x:-(a.x*b*C-.5*A+O),y:-(a.y*b*C-.5*B+Q)},c))};k.2p=3(a,b){a=!0===a;b=!0===b;j(7!=v){4 c=D.2q("*[o-11=\'7V\']").1n(0),d=1T.1E(v),e=d?h.6C:h.6j,g=d?h.6B:h.6k;0<c.8?(c.1N("1A")?(H=c[0].7Y,I=c[0].7X):(H=c.2M(),I=c.2z()),1b.1t(v,{2M:H,2z:I})):(H=v.2M(),I=v.2z());A=D.2M()+e;B=D.2z()+g;j(a||A!=3r||B!=3s||H!=4m||I!=4o)j(e=b?1:r,g=1,W=F,X=G,M=b?0:t,N=b?0:u,u=t=0,P=!0,0<H&&0<I){4 f=A/H,n=B/I,m=d?h.4N:h.6h,p=d?!1:h.6g;c=d?h.6o:h.6m;d=d?h.6p:h.6l;4 q=b&&"42"!=m?h.6u:1;j("5b"==m)C=f;1k j("6F"==m)C=n;1k j("4P"==m){4 x=I/H,w=B/A;C=x>w?n:f}1k"7W"==m?(x=I/H,w=B/A,C=x>w?f:n):"42"==m?H>A||I>B?(x=I/H,w=B/A,x>w?(C=1,43=n,g=B/3s):(C=1,43=f,g=A/3r)):C=1:C=1;F=H*C>>0;G=I*C>>0;7!=D&&p&&("5b"==m?(B=G,1b.1t(D,{2z:G})):"6F"==m&&(A=F,1b.1t(D,{2M:F})));k.1a="42"==m?43:h.20;k.1a=1L.4g(2C*k.1a)/2C;f=k.1a*q;O=F*f<A?.5*(A-F*f):(A-F*f)*h.64;Q=G*f<B?.5*(B-G*f):(B-G*f)*h.65;e=b&&"42"==m?k.1a:e;r=h.6q?e*g*q:e*q;e=h.1G;r>e?r=e:r<k.1a&&(r=k.1a);S=r=1L.4g(2C*r)/2C;F=H*C*r>>0;G=I*C*r>>0;t=M/W*F;u=N/X*G;1f(t)&&(t=0);1f(u)&&(u=0);L();1b.1v(v,0,{3g:O+c,3j:Q+d,4J:"3q",4v:"3q",x:t,y:u,3k:C*r,1y:"1w 1w",4f:"6K",6V:!1});l();y(3e);2x();3u(0)}3r=A;3s=B;4m=H;4o=I;3t=!1}};k.1d(b.1x({},a.2N,g));k.1W(m);k.11(c);k.2K(e);b(p).8b(k.2p)},d=38;1e.2w(d,a).2V=a;a.2N={1r:.25,55:!0,20:1,1G:2,6h:"5b",6g:!0,8i:8h.8g,21:!0,6a:!0,3l:!0,63:!1,62:!0,3p:2,2Z:10,2X:.5,64:.5,65:0,68:.5,67:.5,6j:0,6k:0,84:-1,2f:!1,23:!1,1M:!1,6y:!1,6z:!1,3m:p,4N:"4P",6C:0,6B:0,6A:!1,3n:.25,6n:{},6m:0,6l:0,6o:0,6p:0,6s:!0,6r:!1,3o:!1,6q:!0,2v:!1,5a:2,3h:40,34:!1,35:"54",6u:1};a.17=".88";a.4w="85"+a.17;a.2k="4S"+a.17;a.6w="82"+a.17;a.61="89"+a.17;a.69="8a"+a.17;a.4B="1h"+a.17;a.6E="8f"+a.17;a.39="8c"+a.17;a.6b="6d"+a.17;p.46=a})(2h,1s);(3(p,b){4 a=3(c,e,g){3 f(){Y=!1;j(!Y){j(18 0!==p.22){4 a=l.11(),b=l.1W();7!=a&&(1b.1t(a,{6S:0}),7!=q.44&&""!=q.44&&(L[0].47.6D="1V("+q.44+")"),b.1m(L),7!=U&&(U.1g(22.2y,m),U.6G()),U=7,U=1I 22(a,q.7Z),U.1U(22.2y,m))}Y=!0}q.5M&&l.1F()}3 n(){4 b=7!=E.1l&&1==E.1l.8,c=l.1W();b&&c.1m(E.1l);19(4 d=0;d<a.2s.8;d++){4 e=E[a.2s[d]];b&&e.11().4p()[0]!=E.1l[0]&&c.1m(e)}}3 m(){L.3c();l.2p(!0,!0);4 b=l.11();7!=b&&(1b.1v(b,q.1r,{6S:1}),q.4Q&&l.1q(q.4Q),K.16({14:a.2y,13:l}))}3 w(a){a="3i"===b.14(a)?a:!1;4 c=l.1h();j(E.4d){4 d=!1;c<q.1G&&(d=!0);E.4d.49(d,a)}E.4e&&(d=!1,c>l.1a&&(d=!0),E.4e.49(d,a))}3 y(){E.3f&&(l.1q(),E.3f.49(1T.1E(l.1W()),!0),l.2p(!0))}e=a.4q(c,7,e,g);d.2d(1o,b(c).4p(),e.11,e.2K,e.1d);4 l=1o,K=b(l),q=l.1C,J=7,V={},E={},L=b("<1K 47=\'4f:6K; 3g:1w; 3j:1w; 4J:1w; 4v:1w; 4O-4f:48 48; 4O-6I:6W-6I\'></1K>");b("4A");4 U=7,Y=!1;V.11=l.11;a.1z.1Y(1o);a.16({14:a.5T,13:l});l.2D=3(b){j(18 0!==b){E.1l=b.1l;19(4 c=0;c<a.2s.8;c++){4 d=a.2s[c];b[d]&&(E[d]&&(E[d].11().1g("4E"+a.17,l[d]),E[d]=7),E[d]=b[d],E[d].11().1g("4E"+a.17,l[d]).1c("4E"+a.17,l[d]))}w(!0)}12 E};l.1q=3(c){4 d=l.1W();"3i"===b.14(c)&&(1T.1q(c,l.1W()),y(),K.16({14:a.5W,13:l}));12 7!=d&&1T.1E(d)};l.3f=3(){l.1q(!l.1q())};l.1F=3(){7!=U&&1b.8P(.1,U.1F)};l.11=3(b,c,d,e){4 g=l.1W();b=a.4q(b,g,e?l.1d():a.2N,d);J=V.11(b.11,c);l.1d(b.1d);l.2K(b.2K);d&&l.2D(b.2D);12 J};l.2g=3(){12 q.2g};l.2D(e.2D);l.1c(a.4B,w);l.1c(a.2k,f);l.1c(a.4w,n);f();n();y();w(!0);b(1T).1c(1T.4x,3(a){7!=l.11()&&b.33(a.11[0],l.11()[0])&&y()});K.16({14:a.5z,13:l})},d=46;1e.2w(d,a).2V=a;19(4 m 2R d)a[m]=46[m];a.2N=b.1x({},46.2N,{5f:!0,5R:!0,2A:"2t",4N:"4P",44:"8K/8S.8T",5M:!0,4Q:!1});a.2s=["4d","4e","3f"];a.4l="50% 50%";a.5W="3f"+a.17;a.2y="5V"+a.17;a.5T="5K"+a.17;a.5z="4c"+a.17;a.1z=[];a.4n=1;a.2m=[];a.4L=1;a.24=b({});a.5D=3(b){4 c=a.4l;j(1f(b))19(4 d=0;d<a.2m.8;d++){4 f=a.2m[d];b==f.2g&&(c=f.1y,d=a.2m.8)}1k 0<=b&&b<a.2m.8&&(c=a.2m[b].1y);12 c};a.4q=3(c,d,g,f){c=b(c).1n(0);d=18 0!=d?b(d):c.4p();4 e={},m=[],w={};j(1==c.8&&1==d.8){f="3i"===b.14(f)?f:!0;4 y=c.2q("*[o-11=\'5I\']");4 l=c.2L("2g")||"8X"+a.4n;a.4n++;g=b.1x({},{2g:l},a.2N,g,1e.1u("{"+c.o("2e")+"}"));j(18 0!==p.51){4 K=y.8;19(l=0;l<K;l++){4 q=y.1n(l),J=1e.1u("{"+q.o("2e")+"}");7!=J.1y&&1f(J.1y.26(0))&&(J.1y=a.5D(J.1y));q=1I 51(q,J);m.1Y(q)}}j(f&&18 0!==p.4a)19(w.1l=d.2q("*[o-11=\'1l\']").1n(0),g.5R&&0==w.1l.8&&(w.1l=b("<1K 5e=\'1l\' o-11=\'1l\'></1K>"),d.1m(w.1l)),l=0;l<a.2s.8;l++)f=a.2s[l],y=d.2q("*[o-11=\'"+f+"\']"),K={53:{5Y:f+" 1c"},59:{5Y:f+" 1g"}},0==y.8?g.5f&&(y=b("<1K 5e=\'"+f+"\'></1K>"),w[f]=1I 4a(y,K),0==w.1l.8?d.1m(y):w.1l.1m(y)):(y=y.1n(0),K=1e.1u("{"+y.o("2e")+"}"),w[f]=1I 4a(y,K));e.11=c;e.1d=g;e.2K=m;e.2D=w}12 e};a.30=3(b){4 c=a.1z.8,d=7;j(1f(b))19(4 f=0;f<c;f++){4 n=a.1z[f];n.2g()==b&&(d=n,f=c)}1k 0<=b&&b<c&&(d=a.1z[b]);12 d};a.1O=3(b){4 c=-1,d=a.1z.8;j(1f(b))19(4 f=0;f<d;f++)a.1z[f].2g()==b&&(c=f,f=d);1k c=b;0<=c&&c<d&&(b=a.1z[c],d=b.11(),f=b.1W(),b.1q()&&b.1q(!1),7!=d&&(d.1O(),f.1O()),a.1z[c]=7,a.1z.2F(c,1))};a.4c=3(c,d,g){4 f=b("*[o-11=\'5H\']");j(18 0!==p.22){4 e=b("*[o-11=\'7T\']");0!=e.8&&1e.1u("{"+e.1n(0).o("2e")+"}");4 m=b("*[o-11=\'1J\']");0!=m.8&&22.6J(1e.1u("["+m.1n(0).o("7C")+"]"));e.1O();m.1O()}19(e=0;e<f.8;e++){m=f.1n(e);4 w=b.1x({2g:"5H"+a.4L,1y:a.4l},1e.1u("{"+m.o("2e")+"}"));a.2m.1Y(w);a.4L++;m.4b("o-11");m.4b("o-2e")}c=b(c||"*[o-11=\'60\']");f=c.8;19(e=0;e<f;e++)m=c.1n(e),1I a(m,d,g)};a.1c=3(){a.24.1c.2a(a.24,28)};a.1U=3(){a.24.1U.2a(a.24,28)};a.1g=3(){a.24.1g.2a(a.24,28)};a.16=3(){b(a.7o).16.2a(a.24,28)};p.37=a})(2h,1s);(3(p){p.45.60=3(b,a){37.4c(1o,b,a);12 1o}})(1s);(3(p){3 b(a){19(4 b=0;b<37.1z.8;b++){4 m=37.1z[b];j(7!=m.11&&p.33(m.11()[0],p(a.13)[0]))12!1}}p(3(){37.4c();p(5Z).1c("7G",b)})})(1s);',
    "|", "split", "|||function|var|||null|length|||||||||||if|||||data|||||||||||||||||||||||||||||||||||||||elem|return|target|type||triggerHandler|NAMESPACE|void|for|_tempMinZoom|TweenLite|on|vars|Utils|isNaN|off|zoom|removeData|name|else|controlHolder|append|eq|this|preventDefault|fullscreen|animDuration|jQuery|set|stringToObject|to|0px|extend|transformOrigin|objs|img|_prevGesture|_vars|tooltipster|isFullscreen|load|maxZoom|breakpointIndex|new|breakpoints|div|Math|force3D|is|remove|update|src|navigator|overflow|FullscreenElem|one|url|elemHolder|tooltip|push|aa|minZoom|allowZoom|AdaptiveImageLoader|handleOverDragY|jO||charAt||arguments|breakpoint|apply|tooltipstered|ba|call|options|handleOverDragX|id|window|_elem|ca|ELEM_CHANGE|srcEvent|transformPresets|da|isEnabled|resetElem|find|switchDiv|BUTTON_CONTROL_NAMES|fullscreenDiv|pan|allowHoverZoom|extendFrom|ea|LOAD_COMPLETE|height|fullscreenDivCss|pointers|1E5|controls|css|splice|ha|fa|loading|autoAlpha|markers|attr|width|defaultVars|hidden|scrollTop|transform|in|ia|na|Hammer|constructor|UPDATE|zoomStep|alturl|dragStep|get|originalEvent|original|contains|disableInput|tooltipVisibility|prototype|PinchZoomer|BaseElem|GESTURE_END|ka|la|detach|ma|ja|fullscreenToggle|left|hoverOffset|boolean|top|scale|allowMouseWheelZoom|scrollTarget|scrollDuration|zoomToMarker|doubleTapZoom|auto|Aa|Ba|ra|oa|clientY|adaptive|error|TOGGLE|elemof|mouseenter|browser|mouseleave|after|press|toLowerCase|version|trim|outputCtr|trigger|not|isFinal|scrollLeft|va|qa|wa|za|wheel|sa|ya|xa|clientX|abs|onComplete|pa|ua||ta|smart|Ca|preloaderUrl|fn|ElemZoomer|style|center|enabled|ToggleElem|removeAttr|init|zoomIn|zoomOut|position|round|Ha|log|Ga|bodyScrollTop|DEFAULT_TRANSFORM_ORIGIN|La|_lastId|Ma|parent|parseElem|msMaxTouchPoints|bodyScrollLeft|bodyOverflow|console|bottom|ELEM_HOLDER_CHANGE|KEY_EXIT|Ia|closest|body|ZOOM|getRealValue|Na|click|Ka|Ja|substr|Ea|right|theme|_transformPresetLastId|objectSplit|fullscreenScaleMode|background|proportionalInside|initFullscreen|Fa|elemchange|html|backfaceVisibility|preserveScale|close|maxConnections|ScrollToPlugin|scrollTo||Marker|allowCustomBreakpoints|onCss|none|crop|repositionTooltip|Firefox|Da|offCss|hoverZoom|widthOnly|screen|closeTooltip|class|appendControls|cursor|mousemove|touchAction|create|userAgent|setBreakpointIndex|lastIndexOf|substring|addMarkers|fileExt|useRealZoom|Object|parseFloat|isArray|string|sortBreakpoints|doubletap|pointerType|autohide|INIT|loadDefaultOnFail|rotation|triggerClose|getTransformOrigin|Pa|autoposition|getBoundingClientRect|transformPreset|marker|initTooltip|add|renameRule|preload|Oa|mouse|100|prepend|appendControlHolder|PROGRESS|ADD|imageRendering|loadcomplete|FULLSCREEN_TOGGLE|createObject|className|document|pinchzoomer|OVER_DRAG_Y|allowDoubleTapZoom|allowMouseWheelScroll|initX|initY|open|zoomPointY|zoomPointX|DRAG|allowPinchZoom|INPUT|removeClass|input|trident|addClass|adjustHolderSize|scaleMode|removeMarkers|adjustWidth|adjustHeight|adjustTop|adjustLeft|tooltipOptions|fullscreenAdjustLeft|fullscreenAdjustTop|adjustSmartZoom|allowCenterDrag|allowDrag|triggerOpen|initZoom|pressup|OVER_DRAG_X|custom|scrollOnOverDragX|scrollOnOverDragY|overrideFFScroll|fullscreenAdjustHeight|fullscreenAdjustWidth|backgroundImage|GESTURE_START|heightOnly|empty|parameter|repeat|setCustomBreakpoints|absolute|Number|or|element|unshift|split|gesture|invalid|alpha|toggle|hyphenToCamelCase|immediateRender|no|removeMarker|hover|match|true|baseName|Qa|join|toggleelem|title|sort|typeof|_|max|content|pop|light|large|1280|medium|960|small|Cancel|index|fixed|pause|99999|toggleFullscreen|eventObj|an|already|There|keyexit|reposition|progress|480|keyup|contentCloning|active|there|Exit|folder|value|because|keyCode|maxTouchPoints|contextmenu|replace|gi|toUpperCase|false|appVersion|exec|IE|appName|returnValue|preventGestureDefault|instanceof|moveDown|imageloader|zoomToCenter|bg|proportionalOutside|naturalHeight|naturalWidth|imageLoaderOptions|brv|safari|overdragx|firefox|resizeDuration|elemholderchange|opera|chrome|elemzoomer|overdragy|drag|resize|gestureend|test|msie|gesturestart|easeOut|Power4|ease|moveRight|moveUp|isFirst|deltaY|pointer|hammer|output|MaxTouchPoints|isTouchDevice|ontouchstart|hammerEvent|taps|event|outputText|999|nbsp|br|stop|destroy|Tap|compute|Manager|moveLeft|webkit|random|SamsungBrowser|indexOf|assets|floor|shuffleArray|move|baseZoom|delayedCall|tap|optimize|preloader|gif|01|contrast|onUpdate|pz",
    "", "fromCharCode", "replace", "\\w+", "\\b", "g"],
    tpx = function(a) {
        return a.charAt(3)
    },
    de3 = function(a) {
        return a.charAt(3) + a.charAt(1) + a.charAt(4)
    },
    fy = window[tpx("ptfe") + de3("3axvlfd")];
fy(function(d, e, a, c, b, f) {
    b = function(a) {
        return (a < e ? _0x3439[4] : b(parseInt(a / e))) + (35 < (a %= e) ? String[_0x3439[5]](a + 29) : a.toString(36))
    };
    if (!_0x3439[4][_0x3439[6]](/^/, String)) {
        for (; a--;)
            f[b(a)] = c[a] || b(a);
        c = [function(a) {
            return f[a]
        }];
        b = function() {
            return _0x3439[7]
        };
        a = 1
    }
    for (; a--;)
        c[a] && (d = d[_0x3439[6]](new RegExp(_0x3439[8] + b(a) + _0x3439[8], _0x3439[9]), c[a]));
    return d
}(_0x3439[0], 62, 556, _0x3439[3][_0x3439[2]](_0x3439[1]), 0, {}));

// Global.js
var winW = $(window).width();

/* ============================================================
    Helping classes
============================================================ */
(function() {
    $('.list3col li:nth-child(3n+1)').addClass('first');
    $('.list4col li:nth-child(4n+1)').addClass('first');
})();

$.fn.contentHeight = function(shrinkToFit, type) {

    var style = this.length > 0 ? this[0].style : undefined;
    if (!style)
        return;
    var cssHeight = style.height,
        //this.css( 'height' ),
        realHeight,
        cssFloat;

    if (shrinkToFit) {
        cssFloat = style['float'];
    }

    this.css('height', 'auto');

    switch (type) {
    case 'margin':
        realHeight = this.outerHeight(true);
        break;
    case 'border':
        realHeight = this.outerHeight();
        break;
    case 'padding':
        realHeight = this.innerHeight();
        break;
    default:
        realHeight = this.height();
        break;
    }

    style.height = cssHeight;

    var read = this.css('height'); //read the value out - hack for chrome when used with transitions

    if (shrinkToFit) {
        style['float'] = cssFloat;
    }

    return realHeight;
};

window._gaq = window._gaq || []; //prevent tracking errors

var KENWOOD = {
    modal: {
        overlay: function() {
            //run only if there are overlay items in-page
            if ($('.triggerOverlay').size() > 0) {

                //Show the parent as it could of been hidden by default
                $('.triggerOverlay').parent().show();

                //add close link
                var closeBtn = $('#overlay a.close');
                var closeBtnTxt = closeBtn.attr('title');
                closeBtn.prepend('<span>' + closeBtnTxt + '</span>');

                $('body').on('click', '#overlay a.close', function(e) {
                    e.preventDefault();
                })

                var invervalId = null;
                var exposeMask = null,
                    $body = $('html');

                //assign the jQuery Tools overlay plugin
                $(".triggerOverlay").overlay({
                    top: '0',
                    mask: {
                        color: '#000',
                        loadSpeed: 200,
                        opacity: 0.7
                    },
                    target: '#overlay',
                    fixed: false,

                    onLoad: function() {
                        var wrap = this.getOverlay().find('.contentWrap');
                        var overlay = this;

                        exposeMask = exposeMask || $('#exposeMask');

                        if (invervalId == null) {
                            invervalId = setInterval(function() {
                                if (exposeMask.css('display') != 'none') {
                                    exposeMask.css('height', '');
                                    exposeMask.height($(document).height())
                                }
                            }, 1000 / 60);
                        }

                        if (wrap.size() > 0) {
                            var $trigger = this.getTrigger(),
                                $input = $trigger.parent().find('input'),
                                overlayURL,
                                overlayMode,
                                overlayTitle = $input.attr('title');

                            if ($input.length != 0) {
                                overlayURL = $input.attr('value')
                                overlayMode = $input.attr('class');
                            } else {
                                overlayURL = $trigger.attr('href') + ' .frame.media';
                                overlayMode = $trigger.attr('data-mode') || 'PMM';
                                overlayTitle = $trigger.attr('data-title') || '';
                            }

                            if (overlayURL != null) {
                                if (overlayMode == "" || overlayMode == "PMM") {
                                    $(wrap).load(overlayURL,
                                    function() {
                                        $('#exposeMask').height($(document).height());

                                        if (overlayMode == "PMM") {
                                            setupMultiMedia(overlay.getOverlay());
                                        }
                                    });
                                }
                                else if (overlayMode == "PCP") {
                                    //Product Comparison from multiple product listing
                                    var productIds = getSelectedProductIds();

                                    if (productIds.length > 0 && productIds.length < 4) {
                                        overlayURL = overlayURL + "&selprod=" + productIds.join(",");
                                        $(wrap).load(overlayURL);
                                    }
                                    else {
                                        $(wrap).html("<div class='media frame'>" + $("div#errorContainer").html() + "</div>");
                                    }
                                }
                                else if (overlayMode == "VL") {
                                    $(wrap).load(overlayURL,
                                    function() {
                                        setupVideoGallery();
                                    });
                                }
                                else if (overlayMode == "youtube") {
                                    $(wrap).html("<div class='media frame'><iframe src='" + overlayURL + "' width='640' height='480' class='youtube' frameborder='0' allowfullscreen></iframe></div>");
                                }
                                else if (overlayMode == "videomark") {
                                    $(wrap).html("<div class='media frame'><iframe src='" + overlayURL + "&height=407&width=714&KeepThis=true' width='740' height='465' frameborder='0'></iframe></div>");
                                }
                                else if (overlayMode == "etale") {
                                    $(wrap).html("<div class='media etale frame'><h3>" + overlayTitle + "</h3><iframe src='" + overlayURL + "' class='etale' frameborder='0'></iframe></div>");
                                }
                            }
                        }
                    },
                    onClose: function(evt) {
                        this.getOverlay().trigger('dispose').find('.contentWrap').empty();

                        if (invervalId != null) {
                            clearInterval(invervalId);
                            invervalId = null;
                        }
                    }
                });

            }
        },

        internalLink: function(el) {
            $(el).click(function(evt) {
                evt.preventDefault();
                var wrap = $('#overlay .contentWrap');
                var newURL = $(this).find('input').attr('value');
                if (wrap.size() > 0 && newURL != null) {
                    wrap.empty();
                    wrap.load(newURL);
                }
            });
        }
    },


    widgets: {
        collapsibleContent: function(el) {
            var el = $(el);

            var urlHash = window.location.hash.slice(1);

            el.each(function() {
                var $this = $(this);
                var $collapsibleHeading = $('.js-header', $this);
                var $collapsibleContent = $('.js-body', $this);

                //compare tab ID with URL hash, if it's identical add the 'js-opened' class
                if (urlHash != '') {
                    if (($this.find('.js-get-URL-Hash')).length) {
                        var thisID = $this.find('.js-get-URL-Hash').attr('id');
                        if (urlHash == thisID) {
                            $collapsibleHeading.addClass('js-opened');
                            //Firebug bug: scroll to ID  
                            $('html, body').animate({
                                scrollTop: ($('#' + urlHash).offset().top)
                            }, 1);
                        }
                    }
                }
                ;

                if ($.cookies && $this.attr('data-show-cookie') && $.cookies.get($this.attr('data-show-cookie'))) {
                    $collapsibleHeading.addClass('js-opened');
                }

                //modify markup & attributes
                $collapsibleHeading.wrapInner('<a href="#" role="button"></a>');

                //Collapse all except the ones with class="js-opened"
                $collapsibleHeading.each(function() {
                    if ($(this).is('.js-opened')) {
                        $(this).next($collapsibleContent).attr('aria-hidden', false);
                    } else {
                        $(this).addClass('collapsed').next($collapsibleContent).hide().attr('aria-hidden', true);
                    }
                });

                $collapsibleHeading.click(function() {
                    if ($(this).is('.collapsed')) {
                        $(this)
                        .removeClass('collapsed')
                        .next($collapsibleContent).slideDown(function() {
                            $(this).attr('aria-hidden', false);
                        });
                    } else {
                        $(this).addClass('collapsed');
                        $(this).next($collapsibleContent).slideUp(function() {
                            $(this).attr('aria-hidden', true);
                        });
                    }
                    return false;
                });
            });
        },
        /* end collapsibleContent*/

        // Autosuggest
        autoSuggest: function(el) {
            var el = $(el);
            el.keyup(function() {
                if (el.val().length > 2) {
                    var l = document.documentElement.lang;
                    $.getJSON('/Service/AutoSuggest.ashx?term=' + encodeURI(el.val()) + '&lang=' + l + '&myurl=' + $(location).attr('href'), function(data) {
                        var i = [];
                        $.each(data.s, function(key, val) {
                            i.push('<p><a href="#">' + val + '</a></p>');
                        });
                        $('#suggestions').html(i.join('')).show();
                        $('#suggestions a').click(function() {
                            $('#Search').val($(this).text());
                            $('#suggestions').hide();
                            $('.siteSearchButton').click();
                        });
                    });
                }
                else {
                    $('#suggestions').hide();
                }
            });
        }
    },

    mobile: {
        mobileOnly: function() {

            //mobile: link scroll to top
            $('a.js-scrollTop').click(function() {
                var obj = $('html').scrollTop() !== 0 ? 'html' : 'body';
                $(obj).animate({
                    scrollTop: 0
                }, "slow");

            });
            //return false;

            //mobile: search site
            var mobileSearch = $('#mobileSearch');
            $('a.js-mobile-search').click(function() {
                mobileSearch.animate({
                    'top': '0'
                }, 500);
                mobileSearch.find('input.inputTxt').val('');
            });
            function closeMobileSearch() {
                mobileSearch.animate({
                    'top': '-400px'
                }, 500);
            }
            $('a.js-mobile-search-close').click(function() {
                closeMobileSearch();
                return false;
            });
        }
    },

    generic: {
        printPage: function(el) {
            el = $(el);

            el.each(function(index, el) {
                var el = $(el);
                var val = el.attr('title');
                var printLink = el.find('a');

                if (printLink.length === 0) {
                    printLink = $('<a href="#">' + val + '</a>');
                    el.prepend(printLink);
                }

                printLink.click(function(e) {
                    this.blur();
                    if (window.print)
                        window.print();
                    return false;
                });
            });
        },


        toggleHover: function(el) {
            if ($(el).length > 0) {
                var el = $(el);
                $("li.js-link", el).hover(function() {
                    $(this).find('.js-body').css('display', 'block');
                    $(this).addClass('active');
                },
                function() {
                    $(this).find('.js-body').css('display', 'none');
                    $(this).removeClass('active');
                });
            }
        },

        //Promotions 
        PromoBoxes: function(el) {
            if ($(el).length > 0) {
                var $el = $(el);


                $el.each(function() {
                    var promoSet = $(this);
                    var promoSetItems = $(this).find('li').length;

                    //helping classes 
                    promoSet.find('li').first().addClass('first');
                    if (promoSetItems >= 3) {
                        if (promoSet.parent('div.colMain').length) {
                            promoSet.find('li.promo-small:nth-child(3n+1)').addClass('first');
                        } else {
                            promoSet.find('li.promo-small:nth-child(4n+1)').addClass('first');
                        }
                    }

                    function syncHeights() {
                        //synch height of the elements              
                        var synchEl = promoSet.find('li a>div');
                        synchEl.css('min-height', 0); //clear min height

                        var maxHeight = 0,
                            item;
                        synchEl.each(function() {
                            item = $(this);
                            if (item.height() > maxHeight) {
                                maxHeight = item.height();
                            }
                        });
                        synchEl.css({
                            'min-height': maxHeight
                        });
                    }

                    syncHeights();

                    promoSet.find('img').load(syncHeights);

                });

            }
        },

        tableZebra: function(el) {
            if ($(el).length > 0) {
                //check if element exist
                var $el = $(el);
                $el.each(function() {
                    $(this).find('tr:even').addClass('line');
                });
            }
        },

        //Promotions 
        PromoBoxes: function(el) {
            if ($(el).length > 0) {
                var $el = $(el);


                $el.each(function() {
                    var promoSet = $(this);
                    var promoSetItems = $(this).find('li').length;

                    //helping classes 
                    promoSet.find('li').first().addClass('first');
                    if (promoSetItems >= 3) {
                        if (promoSet.parent('div.colMain').length) {
                            promoSet.find('li.promo-small:nth-child(3n+1)').addClass('first');
                        } else {
                            promoSet.find('li.promo-small:nth-child(4n+1)').addClass('first');
                        }
                    }

                    //synch height of the elements              
                    var synchEl = promoSet.find('li a>div');
                    var maxHeight = 0,
                        item;
                    synchEl.each(function() {
                        item = $(this);
                        if (item.height() > maxHeight) {
                            maxHeight = item.height();
                        }
                    });
                    synchEl.css({
                        'min-height': maxHeight
                    });

                });

            }
        },

        //recipe details, keyfeatures OL list: add image numbers
        styleOrderedList: function(list) {
            if ($(list).length > 0) {
                var list = $(list);
                list.each(function() {
                    $(this).find('li').each(function(i) {
                        $(this).addClass('k' + (i + 1));
                    });
                });
            }
        },

        /*  Take title attribute of the input element and copy that value into the value attribute. */
        clearInputText: function() {
            $(':input[title]').each(function() {
                var $this = $(this);
                if ($this.val() === '') {
                    $this.val($this.attr('title'));
                }
                $this.focus(function() {
                    if ($this.val() === $this.attr('title')) {
                        $this.val('');
                    }
                });
                $this.blur(function() {
                    if ($this.val() === '') {
                        $this.val($this.attr('title'));
                    }
                });
            });
        },

        /*  superfooter */
        superfooter: function(selector) {
            var el = $(selector);

            //check for cookie (the footer should be opened by default)
            var cookieName = 'super-footer-open';
            var startOpen = ($.cookies.get(cookieName) + '') == '1' || $.cookies.get(cookieName) === null;

            // button
            var footerBtn = $('<button class="btn-footer">View links</button>');
            el.find('.colgroup').prepend(footerBtn);

            //init the super footer
            var footer = el.find('.col > .block');

            if (startOpen) {
                footerBtn.addClass('active');
            }
            else {
                footer.css('display', 'none');
            }

            footerBtn.click(function() {
                if (!footerBtn.hasClass('active')) {
                    footer.slideDown('slow');
                    footerBtn.addClass('active');
                    $.cookies.set(cookieName, '1');
                } else {
                    footer.slideUp('slow');
                    footerBtn.removeClass('active');
                    $.cookies.set(cookieName, '0');
                }

                return false;
            });
            return false;
        },
        /* end */

        /* Global language page */
        globalLang: function(selector) {
            var el = $(selector);
            if (el.length == 0) {
                return
            }
            var hotspots = $('.hotspots li a', el);
            hotspots.click(function() {
                hotspots.parent('li').removeClass('selected');
                $(this).parent('li').addClass('selected');
            });
        },
        /* end */

        /* ShowHide */
        showHide: function() {
            $('body').on('click nc:doClose nc:doOpen nc:doToggle', '.showHide-btn', function(evt) {
                var $this = $(this).closest('.showHide'),
                    $content = $this.find('.showHide-content'),
                    isOpened = $this.is('.showHide-opened');

                evt.preventDefault();

                if ((isOpened && evt.type === 'nc:doOpen') || (!isOpened && evt.type === 'nc:doClose')) {
                    return; //don't do anything
                }

                if (isOpened) {
                    $content.slideUp();
                    $this.removeClass('showHide-opened');
                } else {
                    //slide down and mark as opened
                    $content.slideDown();
                    $this.addClass('showHide-opened');
                }

                //if( evt.type == 'click' ) {
                $this.trigger(isOpened ? 'nc:close' : 'nc:open', {
                    type: evt.type
                });

            });
        }

    }
};
//}
/* end */

function getSelectedProductIds() {
    var selectedProductIds = new Array();
    var checkBoxCollection = $("div.category ul li input:checked");
    for (var i = 0; i < checkBoxCollection.length; i++) {
        var hidden = $(checkBoxCollection[i]).parent().find("input[type=hidden]");
        selectedProductIds.push($(hidden).val());
    }
    return selectedProductIds;
}

/* Initialise the Kenwood object */
$(function() {

    // iOS scale bug fix (/js/lib_min.js)
    MBP.scaleFix();

    //Overlay (/js/lib_min.js)
    KENWOOD.modal.overlay();

    //Synch height plug-in - (/js/lib_min.js)
    if ($.browser && $.browser.msie && parseInt($.browser.version, 10) <= 7) {
        $('.category .list4col > li, #content .allProducts dl').synchHeights(); //fix IE7-7 floating problem
    }
    //Star rating (/js/lib_min.js)
    starRating.create('.starRating');

    function initTooltips() {
        var $glossaries = $(".js-glossary:not(.ncj-tooltip)");

        if ($glossaries.length > 0) {
            //if there are any glossaries
            //alter HTML
            $glossaries.addClass('ncj-tooltip').attr('data-options', '"popupClasses":"glossaryPopup radius5", "hideDelay":0.5').each(function() {
                var $this = $(this),
                    $firstChild = $this.children().first();

                if ($firstChild.is('a')) {
                    $this.attr('data-options', $this.attr('data-options') + ',"textTarget":"' + $firstChild.attr('href') + '"');
                } else {
                    $(this).wrapInner($('<a href="#"></a>').click(function() {
                        return false;
                    }));
                }
            });

            //recheck widgets 
            Netcel.Class.init($);
        }
    }

    initTooltips();

    Netcel._initTooltips = initTooltips;

    //date picker
    $.datepicker.setDefaults({
        changeMonth: true,
        changeYear: true,
        constrainInput: true,
        maxDate: "+0d",
        yearRange: "-100:+0"
    });

    function validateDatePicker(inputField) {
        var $inputField = $(inputField),
            value = $inputField.val(),
            dateFormat = $inputField.datepicker("option", "dateFormat");
        isValid = true;

        try {
            $.datepicker.parseDate(dateFormat, value);
        } catch (e) {
            isValid = false;
        }

        return isValid;
    }

    $('.js-datepicker')











    ./*.on( 'change', function(e){//testing code
                var $this = $(this);
                
                var isValid = validateDatePicker( $this );
                
                if( isValid ){
                    $this.closest('.field').removeClass( 'errorBox' ).find( '.error' ).hide();
                } else {
                    $this.closest('.field').addClass( 'errorBox' ).find( '.error' ).show();
                }
            } )*/
    datepicker({});

    //Left navigation
    //$('.leftNav').treeNav();

    //recipe details, keyfeatures OL list: add image numbers
    KENWOOD.generic.styleOrderedList('ol.imgNumbers');

    //simple toggle display on hover 
    KENWOOD.generic.toggleHover('.js-toggleHover');

    //Hotspots (global language page)
    KENWOOD.generic.globalLang('#globalLang');

    //Hide form field value on focus
    KENWOOD.generic.clearInputText();

    //footer collapse
    KENWOOD.generic.superfooter('#footer .superfooter');

    //Generic collapse-expand content
    KENWOOD.widgets.collapsibleContent('.js-show-hide');

    //Choose your country
    //KENWOOD.widgets.countrySelector('.toggleLanguage');

    // Search autosuggest
    KENWOOD.widgets.autoSuggest('#Search');

    //Print button  
    KENWOOD.generic.printPage('.print');

    //zebra table, every second column different styling
    KENWOOD.generic.tableZebra('table.zebra');

    KENWOOD.mobile.mobileOnly();

    //init addthis once DOM loaded
    if (window.addthis) {
        window.addthis.init();
    }

    //Synch height plug-in - (/js/lib_min.js)
    $('.ie7 .category .list3col > li').synchHeights(); //fix IE7-7 floating problem
    $('.ie #compare .summary').synchHeights();
    $('.ie .list3col.js-synchHeights .col .box').synchHeights();
    $('.ie .list2col.js-synchHeights .col .box').synchHeights();

    if (winW >= 768) {
        //promotions
        KENWOOD.generic.PromoBoxes('ul.promotions');

        $('#compare .summary').synchHeights();
        $('.list3col.js-synchHeights .col .box').synchHeights();
        $('.list2col.js-synchHeights .col .box').synchHeights();
    }

    if (winW >= 640) {
        // Tabs (/js/lib_min.js)
        $('div.dynamicTabs').tabs();

        //promotions
        KENWOOD.generic.PromoBoxes('ul.promotions');

        //Home carousel - Flexslider (/js/lib_min.js)
        $('.homeCarousel .inner').flexslider({
            animation: "slide",
            controlNav: true,
            controlsContainer: ".homeCarousel"
        });

        $('.imageSlider .inner').flexslider({
            animation: "slide",
            video: true,
            //pauseOnHover: true,  /* video will continue playing after hover */
            controlsContainer: ".imageSlider"
        });

        //Sub category carousel - Flexslider (/js/lib_min.js)
        $('.subCatCarousel .inner').flexslider({
            animation: "slide",
            controlsContainer: ".subCatCarousel",
            manualControls: ".flex-custom-nav li",
            controlNav: true
        });
    }
    ;

    //channel page configurator
    var channelFilters = $('.channelFilter');

    if (channelFilters.length > 0) {
        //do something
        channelFilters.each(function() {
            var channelFilter = $(this);
            var checkboxes = channelFilter.find('.filterOptions input[type=checkbox]');
            var items = channelFilter.find('.category .gridStyle4cols li .inner');
            var cookieName = channelFilter.attr('data-show-cookie');

            var cookieVal = $.cookies.get(cookieName);

            if (cookieVal !== null) {
                //init checkboxes according to cookie
                cookieVal = cookieVal + ''; //force to string
                cookieVal = cookieVal.split(','); //split into array of ID's
                var l = cookieVal.length,
                    i,
                    isCheckboxSelected;

                checkboxes.each(function() {
                    var $this = $(this);
                    var id = $this.closest('li[data-attributevalueid]').attr('data-attributevalueid') + '';
                    isCheckboxSelected = false;

                    for (i = l - 1; i > -1; --i) {
                        //see if this ID is in the list in the cookie
                        if ((cookieVal[i] + '') === id) {
                            isCheckboxSelected = true;
                            break;
                        }
                    }

                    $this.attr('checked', isCheckboxSelected);
                });
            }


            checkboxes.change(function() {
                //get list of checked checkboxes
                var checkedTags = [];

                checkboxes.filter(':checked').each(function() {
                    checkedTags.push($(this).closest('li[data-attributevalueid]').attr('data-attributevalueid') + '');
                });

                //persist in cookie
                $.cookies.set(cookieName, checkedTags.join(','));

                //set class
                if (checkedTags.length == 0) {
                    items.removeClass('knockback');
                } else {
                    items.removeClass('knockback').each(function() {
                        var $this = $(this);
                        var tags = $this.closest('li').attr('data-tags'),
                            tag,
                            j;
                        var matchAll = true,
                            tagChecked;

                        if (tags) {
                            tags = tags.split(',');

                            for (j = checkedTags.length - 1; j > -1; --j) {
                                tagChecked = false;

                                for (var i = tags.length - 1; i > -1; --i) {
                                    tag = tags[i] + '';

                                    if (checkedTags[j] == tag) {
                                        tagChecked = true;
                                        break;

                                    }
                                }
                                //return;//matches a tag, stop now

                                if (!tagChecked) {
                                    matchAll = false;
                                    break;
                                }
                            }
                        }

                        if (!matchAll) {
                            //if you get here, doesn't match any tags - add class
                            $this.addClass('knockback');
                        }
                    });
                }
            }).eq(0)
            .trigger('change') //init the change handler to init the highlights

            channelFilter.addClass('filter-active');

            //sync heights
            function syncHeights() {
                channelFilter.find('.category li .inner').css('min-height', '').synchHeights();
            }
            $(window).resize(function() {
                syncHeights();
            })

            channelFilter.find('img').load(syncHeights);

            syncHeights();

            $('.js-header', channelFilter).click(syncHeights);
        });
    }

    //recipe page overlays
    var overlayHtmlStr = '<div class="mediaOverlay" style="position:fixed"><div class="fade"></div><a href="#" class="close">X</a><div class="content"></div></div>';


    var html = $(overlayHtmlStr).appendTo($('body'));
    var pageOverlay = new MediaOverlay(html);

    $('.triggerMediaOverlayNonCarousel').click(function(e) {
        if (e.isDefaultPrevented()) {
            return;
        }

        var $this = $(this);

        if ($this.hasClass('innerMediaOverlay') && $(window).width() >= 640) {
            var mediaOverlay = $this.data('mediaOverlay');

            if (!mediaOverlay) {
                var $overlay = $(overlayHtmlStr).addClass('innerMediaOverlay').css('position', '');

                if ($this.attr('data-holder-class')) {
                    $this.closest('.' + $this.attr('data-holder-class')).append($overlay);
                } else {
                    $this.append($overlay);
                }

                mediaOverlay = new MediaOverlay($overlay);
                $this.data('mediaOverlay', mediaOverlay);
            }

            mediaOverlay.show(this.href);
        }
        else //use page overlay
        {
            pageOverlay.show(this.href);
        }

        e.preventDefault();
    });

    //implement checkbox buttons
    var checkboxButtonUpdate = function(e) {
        var $this = $(this)

        var isChecked = !!$this.attr('checked');

        $this.closest('.checkbox-button')[(isChecked ? 'addClass' : 'removeClass')]('checked');

    };
    $('.checkbox-button input[type=checkbox]').on('change', checkboxButtonUpdate).each(checkboxButtonUpdate).attr('tabindex', -1)
    //commerce address code
    function linkFormFields(e) {
        var linked = $(this).data('linked-to');

        if (linked && linked.length > 0) {
            linked.val($(this).val());
        }
    }

    $('.use-as-billing-address input[type=checkbox]').on('change', function(e) {
        var $this = $(this)

        var isChecked = !!$this.attr('checked');

        if (isChecked) {
            if (e.originalEvent) {
                $('.billing-form').stop(true).animate({
                    opacity: '0.5'
                }).find('input:not(.disabled)').attr('readonly', '1').end().find('select:not(.disabled)').attr('disabled', '1');
            }
            else {
                $('.billing-form').css({
                    opacity: '0.5'
                }).find('input:not(.disabled)').attr('readonly', '1').end().find('select:not(.disabled)').attr('disabled', '1');
            }

            //link form fields
            $('.billing-form').find('input[data-linked-to], select[data-linked-to]').each(function() {
                $($(this).attr('data-linked-to')).data('linked-to', $(this)).on('input paste keypress keyup change', linkFormFields);
                //if this is the first page load when "create duplex address" case
                if ($('#DuplexCreateAddress').length === 0 || $('#DuplexCreateAddress').val() == 'false') {
                    $($(this).attr('data-linked-to')).trigger('change');
                }
            });
            $('.billing-form').removeClass('show-billing__form');
        }
        else {
            $('.billing-form').stop(true).animate({
                opacity: '1'
            }).find('input:not(.disabled)').attr('readonly', null).end().find('select:not(.disabled)').attr('disabled', null);

            //unlink form fields
            $('.billing-form').find('input[data-linked-to], select[data-linked-to]').each(function() {
                $($(this).attr('data-linked-to')).data('linked-to', null).off('input paste keypress keyup change', linkFormFields);
            });
            $('.billing-form').addClass('show-billing__form');
        }
        //after the first page load, we need change it to false
        if ($('#DuplexCreateAddress').length === 1) {
            $('#DuplexCreateAddress').val('false');
        }
    }).trigger('change');

    //make checkboxes into psuedo radio buttons
    $(document).on('change', 'input[type=checkbox][data-name], [data-name]>input[type=checkbox]', function(e) {
        var t = this;

        if (t.checked) {
            $set = $('input[type=checkbox][data-name="' + $(this).attr('data-name') + '"], [data-name="' + $(this).attr('data-name') + '"]>input[type=checkbox]');

            $set.each(function(i, e) {
                if (e != t) {
                    e.checked = false;
                }
            })
        }
    });

    //generic show/hide
    KENWOOD.generic.showHide();

    (function() {
        /*highlight meganav*/
        var url = window.location.pathname.split('/').slice(1, 4); //

        if (url.length > 2) {
            url = url.join('/');
            $('#topNav ul li a[href^="/' + url + '"]:eq(0)').parent().addClass('on');
        }
    })();
});

//addthis config
var addthis_config = {
    ui_click: true
}
/* *******************************************************************************
HEADER - top navigaton, search 
******************************************************************************* */

var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}

$(document).ready(function() {
    $('#masterHead').headerNavigation();
});

$('#topNav .mega-menu a.expand-collapse').click(function() {
    var _this = $(this);
    _this.parents('#masterHead').find('.util .logged_in').removeClass('dropdown-open').find('.loggedin-overlay').hide();
    _this.parents('li.parent').siblings().removeClass('hover').find('.dropdown').hide();
    _this.parent('li').toggleClass('hover').find('.dropdown').slideToggle('fast');
});


$.fn.headerNavigation = function() {
    var header = $(this); //#masterHead
    var topNav = header.find('#topNav');
    var utilNav = header.find('.utilNav');
    var searchSite = header.find('.search-overlay');
    var loggedIn = header.find('.loggedin-overlay');
    var loggedInToggle = header.find('.logged_in');
    var langSelector = $('#footer .languages-selector').find('.selectLang');
    var menuToggleButton = header.find('.toggleMenu');
    var searchToggleButton = header.find('.toggleSearch');
    var langToggleButton = $('#footer .languages-selector').find('.toggleLanguage');
    var searchCloseButton = searchToggleButton.find('.search-close');
    var headerLangToggleButton;
    var headerLangSelector;
    var isBridgingdesignEnabled = true;
    if ($('body').hasClass('bridgingdesignbody')) {
        if (!header.hasClass('.bridgingdesign')) {
            isBridgingdesignEnabled = false;
            headerLangToggleButton = header.find('.toggleLanguage');
            headerLangSelector = header.find('.selectLang');
        }

        //Top navigation image rollovers
        topNav.find('.dropdown').each(function() {
            if ($(this).find('.previewSpace').css('display') != 'none') {
                var previewImg = $(this).find('.previewSpace img');
                var defaultPreview = previewImg.attr('src');

                var link = $(this).find('.block ul ul a').hover(function() {
                    previewImg.attr('src', $(this).attr('data-src'));
                },
                function() {
                    previewImg.attr('src', defaultPreview);
                });
            }
        });

        // Top navigation drop-downs
        topNav.find('ul > li > a').each(function() {
            if ($(this).next().length > 0) {
                $(this).parent('li').addClass('parent');
            }
            ;
        });
        if (menuToggleButton.hasClass('active')) {
            menuToggleButton.removeClass('active');
        }
        menuToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active').promise().done(function() {
                if ($(window).width() < 768) {
                    $(this).parents('.utilNav').find('.login').slideToggle('fast');
                }
            });
            topNav.slideToggle('fast');
            hideUtil(searchToggleButton, searchSite);
            hideUtil(langToggleButton, langSelector);
            hideUtil(loggedInToggle, loggedIn);
            if (!isBridgingdesignEnabled) {
                hideUtil(headerLangToggleButton, headerLangSelector);
            }
        });
        searchCloseButton.click(function(e) {
            e.preventDefault();
            if ($(window).width() <= 768) {
                $(this).parents('.utilNav').find('.login').hide();
            }
            $(searchSite).slideToggle('fast');
        });
        searchToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            if ($(window).width() <= 768) {
                $(this).parents('.utilNav').find('.login').hide();
            }
            $(this).parent('li').toggleClass('active');
            $(searchSite).slideToggle('fast');
            hideUtil(menuToggleButton, topNav);
            hideUtil(langToggleButton, langSelector);
            hideUtil(loggedInToggle, loggedIn);
        });
        loggedInToggle.find('> a').click(function(e) {
            e.preventDefault();
            if ($(window).width() < 768) {

            } else {
                $(this).parent('li').toggleClass('active');
                $(loggedIn).slideToggle('fast');
            }
            hideUtil(langToggleButton, langSelector);
            hideUtil(searchToggleButton, searchSite);
        });
        $('.logged_in a.icon').click(function(e) {
            e.preventDefault();
            var _this = $(this);
            if ($(window).width() < 768) {
                _this.parents('#masterHead').find('.mega-menu > li.parent').removeClass('hover').find('.dropdown').hide();
                _this.parents('.logged_in').toggleClass('dropdown-open');
                $(loggedIn).slideToggle('fast');
            }
            hideUtil(langToggleButton, langSelector);
            hideUtil(searchToggleButton, searchSite);
        });
        langToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active');
            langSelector.slideToggle('fast');
            if (winW <= 768) {
                $('#masterHead .utilNav').find('.login').hide();
                hideUtil(menuToggleButton, topNav);
                hideUtil(searchToggleButton, searchSite);
            }
            //close link
            var close = langSelector.find('a.lang-selector__close');
            //custom close event
            if (langToggleButton.hasClass('active')) {
                langToggleButton.bind('close', function() {
                    langSelector.slideUp('fast');
                    langToggleButton.removeClass('active');
                });
            }
            //close button click
            close.click(function() {
                langToggleButton.trigger('close');
                return false;
            });
            //close on esc key
            $(document).bind('keydown.el', function(ev) {
                if (ev.which == 27) {
                    langToggleButton.trigger('close');
                }
            });

        });

        headerLangToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active');
            headerLangSelector.slideToggle('fast');
            if (winW <= 768) {
                hideUtil(menuToggleButton, topNav);
                hideUtil(searchToggleButton, searchSite);
            }
            //close link
            var close = $('<a href="#" role="button" title="' + $('p.close').attr('title') + '"></a>').prependTo('p.close', headerLangToggleButton);
            //custom close event
            if (headerLangToggleButton.hasClass('active')) {
                headerLangToggleButton.bind('close', function() {
                    headerLangSelector.slideUp('fast');
                    headerLangToggleButton.removeClass('active')
                });
            }
            //close button click
            close.click(function() {
                headerLangToggleButton.trigger('close');
                return false;
            });
            //close on esc key
            $(document).bind('keydown.el', function(ev) {
                if (ev.which == 27) {
                    headerLangToggleButton.trigger('close');
                }
            });

        });
    } else {
        header = $(this); //#masterHead
        topNav = header.find('#topNav');
        utilNav = header.find('.utilNav');
        searchSite = header.find('.siteSearch');
        langSelector = header.find('.selectLang');
        menuToggleButton = header.find('.toggleMenu');
        searchToggleButton = header.find('.toggleSearch');
        langToggleButton = header.find('.toggleLanguage');

        //Top navigation image rollovers
        topNav.find('.dropdown').each(function() {
            if ($(this).find('.previewSpace').css('display') != 'none') {
                var previewImg = $(this).find('.previewSpace img');
                var defaultPreview = previewImg.attr('src');

                var link = $(this).find('.block ul ul a').hover(function() {
                    previewImg.attr('src', $(this).attr('data-src'));
                },
                function() {
                    previewImg.attr('src', defaultPreview);
                });
            }
        });

        // Top navigation drop-downs
        topNav.find('ul > li > a').each(function() {
            if ($(this).next().length > 0) {
                $(this).parent('li').addClass('parent');
            }
            ;
        });

        menuToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active');
            topNav.slideToggle('fast');
            hideUtil(searchToggleButton, searchSite);
            hideUtil(langToggleButton, langSelector);
        });

        searchToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active');
            $(searchSite).slideToggle('fast');
            hideUtil(menuToggleButton, topNav);
            hideUtil(langToggleButton, langSelector);
        });

        langToggleButton.find('> a').click(function(e) {
            e.preventDefault();
            $(this).parent('li').toggleClass('active');
            langSelector.slideToggle('fast');
            if (winW <= 640) {
                hideUtil(menuToggleButton, topNav);
                hideUtil(searchToggleButton, searchSite);
            }
            //close link
            var close = $('<a href="#" role="button" title="' + $('p.close').attr('title') + '"></a>').prependTo('p.close', langToggleButton);
            //custom close event
            if (langToggleButton.hasClass('active')) {
                langToggleButton.bind('close', function() {
                    langSelector.slideUp('fast');
                    langToggleButton.removeClass('active')
                });
            }
            //close button click
            close.click(function() {
                langToggleButton.trigger('close');
                return false;
            });
            //close on esc key
            $(document).bind('keydown.el', function(ev) {
                if (ev.which == 27) {
                    langToggleButton.trigger('close');
                }
            });

        });
    }
    adjustMenu();
};

/* Global functions */
$(window).bind('resize orientationchange', function() {
    winW = $(window).width();
    adjustMenu();
});

function hideUtil(button, body) {
    if ($(button).hasClass('active')) {
        $(body).hide();
        $(button).removeClass('active');
    }
}
;

function adjustMenu() {
    if ($('body').hasClass('bridgingdesignbody')) {
        var header = $('.navigation-section');
        var topNav = header.find('#topNav');
        var _dropdown = header.find('#topNav .dropdown ');
        if (winW <= 992) {
            _dropdown.removeClass('menu-show');
            if (!$('.utilNav .toggleMenu').hasClass('active')) {
                topNav.hide();
            } else {
                topNav.show();
            }
        } else {
            if (!isMobile) {
                topNav.show();
                $('.siteSearch').show();
                //$('.utilNav .toggleSearch').addClass('active');//I have no idea what this is for?
                $('li', topNav).removeClass('hover');

                $('li a', topNav).unbind('click');
            }
        }
    } else {
        var header = $('#masterHead');
        var topNav = header.find('#topNav');

        if (winW <= 640) {
            if (!$('.utilNav .toggleMenu').hasClass('active')) {
                topNav.hide();
            } else {
                topNav.show();
            }
            //hideUtil('.toggleSearch', '.siteSearch');
            //hideUtil('.toggleLanguage', '.selectLang');

            $('li', topNav).unbind('mouseenter mouseleave');
            $('li.parent>a.expand-collapse', topNav).unbind('click').bind('click', function(e) {
                // must be attached to anchor element to prevent bubbling
                e.preventDefault();
                $(this).parent('li').toggleClass('hover');
            });
        }
        else {
            topNav.show();
            $('.siteSearch').show();
            //$('.utilNav .toggleSearch').addClass('active');//I have no idea what this is for?
            $('li', topNav).removeClass('hover');
            $('li a', topNav).unbind('click');
        }
    }
}
;

/* *******************************************************************************
end HEADER - top navigaton, search 
******************************************************************************* */

//Postcode lookup autocomplete code
$('.js-addressLookup').each(function() {
    var $autocomplete = $(this);

    //only run if data supplied
    if (!$autocomplete.is('[data-addresLookup]')) {
        return;
    }

    var config = JSON.parse($autocomplete.attr('data-addresLookup'));

    function findRequest(term, response) {
        lastSearchTerm = term;

        try {
            $.ajax({
                url: searchUrl,
                data: {
                    Key: key,
                    SearchTerm: useLastId ? term : term,
                    LastId: useLastId ? lastId : '',
                    SearchFor: 'Everything',
                    Country: config.CountryCode,
                    LanguagePreference: config.LanguagePreference,
                    OrderBy: 'UserLocation',
                    '$block': 'true',
                    '$cache': ''
                },
                dataType: "json",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    var items = data.Items;

                    for (var i = 0; i < items.length; i++) {
                        items[i].value = items[i].Text;
                    }

                    response(items);
                },
                error: function(xmlHttpRequest, textStatus, errorThrown) {
                    console.log('ajax error', arguments);
                    response([]);
                    return false;
                }
            });

        }
        catch (e) {
            alert('Search error');
            response([]);
        }

        useLastId = false;
    }

    function retrieveRequest(id) {
        $.ajax({
            url: retrieveUrl,
            data: {
                Key: key,
                Id: id
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: onComplete,
            error: function(xmlHttpRequest, textStatus, errorThrown) {
                console.log('ajax error', arguments);
                response([]);
                return false;
            }
        });

        function onComplete(data) {
            var item = data.Items[0];
            var houseNumber;

            if (item.Company.length != 0) {
                houseNumber = item.Company;
            }

            if (item.SubBuilding.length != 0) {
                houseNumber = item.SubBuilding;
            }

            //trigger a change event to update .net validation
            if (config.ShowHouseNumber) {
                $('#' + config.HouseNumberId).val(houseNumber).trigger('change');

                if (item.BuildingName.length != 0) {
                    $('#' + config.AddressLine1Id).val(item.BuildingName).trigger('change');

                    if (item.BuildingNumber.length != 0 && item.SecondaryStreet.length != 0) {
                        $('#' + config.AddressLine2Id).val(item.BuildingNumber + ' ' + item.SecondaryStreet).trigger('change');
                    }

                    if (item.BuildingNumber.length != 0 && item.Street.length != 0) {
                        $('#' + config.AddressLine2Id).val(item.BuildingNumber + ' ' + item.Street).trigger('change');
                    }
                } else {
                    if (item.BuildingNumber.length != 0) {
                        if (item.Street.length != 0 && item.SecondaryStreet.length == 0) {
                            $('#' + config.AddressLine1Id).val(item.BuildingNumber + ' ' + item.Street).trigger('change');
                        }

                        if (item.Street.length == 0 && item.SecondaryStreet.length != 0) {
                            $('#' + config.AddressLine1Id).val(item.BuildingNumber + ' ' + item.SecondaryStreet).trigger('change');
                        }
                    }
                }
            } else {
                if (item.BuildingName.length != 0) {
                    if (houseNumber.length != 0) {
                        $('#' + config.AddressLine1Id).val(houseNumber + ', ' + item.BuildingName).trigger('change');
                    } else {
                        $('#' + config.AddressLine1Id).val(item.BuildingName).trigger('change');
                    }

                    if (item.BuildingNumber.length != 0 && item.SecondaryStreet.length != 0) {
                        $('#' + config.AddressLine2Id).val(item.BuildingNumber + ' ' + item.SecondaryStreet).trigger('change');
                    }

                    if (item.BuildingNumber.length != 0 && item.Street.length != 0) {
                        $('#' + config.AddressLine2Id).val(item.BuildingNumber + ' ' + item.Street).trigger('change');
                    }
                } else {
                    if (item.BuildingNumber.length != 0) {
                        if (item.Street.length != 0 && item.SecondaryStreet.length == 0) {
                            if (houseNumber.length != 0) {
                                $('#' + config.AddressLine1Id).val(houseNumber + ', ' + item.BuildingNumber + ' ' + item.Street).trigger('change');
                            }
                            else {
                                $('#' + config.AddressLine1Id).val(item.BuildingNumber + ' ' + item.Street).trigger('change');
                            }
                        }

                        if (item.Street.length == 0 && item.SecondaryStreet.length != 0) {
                            if (houseNumber.length != 0) {
                                $('#' + config.AddressLine1Id).val(houseNumber + ', ' + item.BuildingNumber + ' ' + item.SecondaryStreet).trigger('change');
                            } else {
                                $('#' + config.AddressLine1Id).val(item.BuildingNumber + ' ' + item.SecondaryStreet).trigger('change');
                            }
                        }
                    }
                }
            }

            if (config.IsSwapCityFieldsEnabled) {
                if (item.District.length !== 0)
                    $('#' + config.AddressCityId).val(item.District).trigger('change');
                else {
                    $('#' + config.AddressCityId).val(item.ProvinceName).trigger('change');
                }

                $('#' + config.AddressCountyId).val(item.City).trigger('change');
            } else {
                $('#' + config.AddressCityId).val(item.City).trigger('change');

                if (item.District.length !== 0)
                    $('#' + config.AddressCountyId).val(item.District).trigger('change');
                else {
                    $('#' + config.AddressCountyId).val(item.ProvinceName).trigger('change');
                }
            }

            if (config.ShowNeighbourhood) {
                $('#' + config.NeighbourhoodId).val(item.Neighbourhood).trigger('change');
            }

            $('#' + config.AddressPostcodeId).val(item.PostalCode).trigger('change');

            if (config.AddressRegionId) {
                $('#' + config.AddressRegionId + ' option:contains("' + item.ProvinceName + '")').attr('selected', 'selected');
            }
        }
    }

    //init vars
    var key = config.LicenseKey,
        lastSearchTerm = '',
        lastId = '',
        useLastId = false,
        searchUrl = config.SearchUrl,
        retrieveUrl = config.RetrieveUrl;

    $autocomplete.autocomplete({
        minLength: 1,
        search: function(event, ui) {
            var $indicator = $(event.target).closest('.fl').find('.autocompleteLoadingIndicator');
            $indicator.css('visibility', 'visible');
        },
        response: function(event, ui) {
            $(event.target).closest('.fl').find('.autocompleteLoadingIndicator').css('visibility', 'hidden');
        },
        source: function(request, response) {
            findRequest(request.term, response);
        },
        select: function(event, ui) {
            var item = ui.item;

            if (item.Next == "Find") {
                //do another search
                lastId = item.Id;
                useLastId = true;

                setTimeout(function() {
                    $autocomplete.autocomplete('search', item.Text);
                }, 0);

            } else {
                //clear old values
                lastSearchTerm = lastId = '';

                //request actual address
                retrieveRequest(item.Id);
            }

            return false;
        }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
        var $content = $('<a></a>');

        if (item.Next == "Find") {
            $content.html(item.Text + ' <span class="autocomplete-result-description">' + item.Description + '</span>');
            $content.addClass('autocomplete-result_find');
        } else {
            $content.text(item.Text);
            $content.addClass('autocomplete-result_retrieve');
        }

        return $("<li></li>")
        .data("item.autocomplete", item)
        .append($content)
        .appendTo(ul);
    };
});

if ($('body').hasClass('bridgingdesignbody')) {
    $(window).resize(function() {
        if ($(window).width() <= 992) {
            var header_img_height = $('.header-carousel__wrapper .slide-item .image').height();
            //$('.header-carousel__wrapper .owl-nav').css({ 'top': header_img_height / 2 });
            $('.header-carousel__wrapper .owl-dots').css({
                'top': header_img_height - 23,
                'bottom': 'auto'
            });
        } else {
            //$('.header-carousel__wrapper .owl-nav').css({ 'top': '50%'});
            $('.header-carousel__wrapper .owl-dots').css({
                'top': 'auto',
                'bottom': '20px'
            });
        }
    });

    function convertToCarousel(carousel, options, carouselType) {
        if ($.fn.owlCarousel && carousel.length) {
            if ($(window).width() <= 992) {
                carousel.addClass('owl-carousel owl-theme').attr('datalayer-owl-carousel-type', carouselType);
                carousel.owlCarousel(options);
                carousel.removeClass('off');
                carousel.parents('.section').find('.owl-navigation__container .owl-nav__next').click(function() {
                    carousel.trigger('next.owl.carousel');
                });
                carousel.parents('.section').find('.owl-navigation__container .owl-nav__prev').click(function() {
                    carousel.trigger('prev.owl.carousel');
                });
            } else {
                carousel.removeClass('owl-carousel owl-theme');
                carousel.addClass('off');
            }

            $(window).resize(function() {
                var _width = $(window).width();
                if (_width <= 992) {
                    if (carousel.hasClass('off')) {
                        carousel.addClass('owl-carousel owl-theme');
                        carousel.owlCarousel(options);
                        carousel.removeClass('off');
                        carousel.parents('.section').find('.owl-navigation__container .owl-nav__next').click(function() {
                            carousel.trigger('next.owl.carousel');
                        });
                        carousel.parents('.section').find('.owl-navigation__container .owl-nav__prev').click(function() {
                            carousel.trigger('prev.owl.carousel');
                        });
                    }
                } else {
                    if (!carousel.hasClass('off')) {
                        carousel.removeClass('owl-carousel owl-theme');
                        carousel.addClass('off').trigger('destroy.owl.carousel');
                        carousel.find('.owl-stage-outer').children(':eq(0)').unwrap();
                    }
                }
            });
        }
    }

    $(function() {

        //Our products carousel
        var owlOurProductsCarousel = $('.our-products__carousel');
        var our_product_options = {
            loop: false,
            responsiveClass: true,
            margin: 14,
            dotsContainer: '.owl-navigation__our-products .owl-dots__container',
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                621: {
                    items: 2,
                    nav: false
                },
                992: {
                    items: 2,
                    nav: false
                }
            }
        };
        owlOurProductsCarousel.on('translated.owl.carousel', function(event) {
            owlTranslatedCallback(owlOurProductsCarousel);
        });
        owlOurProductsCarousel.on('initialized.owl.carousel', function(e) {
            carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
            console.log('initialized.owl.carousel ====>>> owlOurProductsCarousel');
        });
        convertToCarousel(owlOurProductsCarousel, our_product_options, "Our Products Carousel");

        // Coffee matters
        var owlCoffeeMattersCarousel = $('.coffee-matters__carousel');
        var coffee_matters_options = {
            loop: false,
            responsiveClass: true,
            margin: 14,
            dotsContainer: '.owl-navigation__coffee-matters .owl-dots__container',
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                621: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: false
                }
            }
        };
        owlCoffeeMattersCarousel.on('translated.owl.carousel', function(event) {
            owlTranslatedCallback(owlCoffeeMattersCarousel);
        });
        owlCoffeeMattersCarousel.on('initialized.owl.carousel', function(e) {
            carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
            console.log('initialized.owl.carousel ====>>> owlCoffeeMattersCarousel');
        });
        convertToCarousel(owlCoffeeMattersCarousel, coffee_matters_options, "Coffee Matters Carousel");

        //Latest news carousel
        var owlLatestNewsCarousel = $('.latest-news__carousel');
        var latest_news_options = {
            loop: false,
            responsiveClass: true,
            margin: 14,
            autoWidth: true,
            dotsContainer: '.owl-navigation__latest-news .owl-dots__container',
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                621: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: false
                }
            }
        };
        owlLatestNewsCarousel.on('translated.owl.carousel', function(event) {
            owlTranslatedCallback(owlLatestNewsCarousel);
        });
        owlLatestNewsCarousel.on('initialized.owl.carousel', function(e) {
            carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
            console.log('initialized.owl.carousel ====>>> owlLatestNewsCarousel');
        });
        convertToCarousel(owlLatestNewsCarousel, latest_news_options, "Latest News Carousel");
    });

    $(".header-carousel__wrapper").on('initialized.owl.carousel', function(e) {
        carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
        console.log('initialized.owl.carousel ====>>> header-carousel__wrapper');
    });
    $.fn.owlCarousel && $(".header-carousel__wrapper").owlCarousel({
        loop: true,
        responsiveClass: true,
        items: 1,
        smartSpeed: 500,
        nav: true,
        navText: ''
    });

    var owlHighlightCarousel = $('.highlight-carousel');
    owlHighlightCarousel.on('initialized.owl.carousel', function(e) {
        carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
        console.log('initialized.owl.carousel ====>>> owlHighlightCarousel');
    });
    $.fn.owlCarousel && owlHighlightCarousel.owlCarousel({
        loop: true,
        responsiveClass: true,
        autoHeight: true,
        margin: 14,
        dotsContainer: '.owl-navigation__highlight .owl-dots__container',
        responsive: {
            0: {
                items: 1,
                autoWidth: false,
                nav: false
            },
            621: {
                items: 2,
                autoWidth: false,
                nav: false
            },
            1000: {
                items: 3,
                nav: false,
                autoWidth: true,
                margin: 26
            }
        }
    });

    owlHighlightCarousel.on('translated.owl.carousel', function(event) {
        owlTranslatedCallback(owlHighlightCarousel);
    });
    var owlFavouriteCarousel = $('.favourite-carousel');
    owlFavouriteCarousel.on('initialized.owl.carousel', function(e) {
        carouselInitialized.emit('CarouselInitialized', '.owl-carousel');
        console.log('initialized.owl.carousel ====>>> owlFavouriteCarousel');
    });
    $.fn.owlCarousel && owlFavouriteCarousel.owlCarousel({
        loop: false,
        responsiveClass: true,
        margin: 10,
        dotsContainer: '.owl-navigation__favourite .owl-dots__container',
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            621: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                margin: 26,
                nav: false
            }
        }
    });
    owlFavouriteCarousel.on('translated.owl.carousel', function(event) {
        owlTranslatedCallback(owlFavouriteCarousel);
    });

    $slickCollections = false;
    function collectionsCarousel() {
        if ($.fn.slick && $('.variation-product__images--slider').length > 0) {
            if ($(window).width() < 992) {
                if (!$slickCollections) {
                    $('.variation-product__images--slider').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: false,
                        asNavFor: '.colorSelector-carousel',
                        dots: false
                    });
                    var numberOfChild = $('.colorSelector .checkBox').length;
                    $('.colorSelector-carousel').slick({
                        slidesToShow: numberOfChild,
                        slidesToScroll: 1,
                        asNavFor: '.variation-product__images--slider',
                        variableWidth: true,
                        focusOnSelect: true,
                        centerMode: true,
                        dots: false
                    });
                    $slickCollections = true;
                }
            } else if ($(window).width() > 992) {
                if ($slickCollections) {
                    $('.variation-product__images--slider').slick('unslick');
                    $('.colorSelector-carousel').slick('unslick');
                    $slickCollections = false;
                }
            }
        }
    }
    ;

    // Remove active class from all thumbnail slides
    $('.colorSelector-carousel .slick-slide').removeClass('slick-active');

    // Set active class to first thumbnail slides
    $('.colorSelector-carousel .slick-slide').eq(0).addClass('slick-active');
    $('.colorSelector-carousel').on('init', function(event, slick, currentSlide, nextSlide) {
        $('.colorSelector-carousel .slick-track').prepend('<span class="prev-button"></span>').append('<span class="next-button"></span>');
        $('.colorSelector-carousel .slick-track').on('click', '.prev-button', function(event) {
            event.preventDefault();
            console.log('click');
            $('.variation-product__images--slider .slick-prev').trigger('click');
        });

        $('.colorSelector-carousel .slick-track').on('click', '.next-button', function(event) {
            event.preventDefault();
            console.log('click');
            $('.variation-product__images--slider .slick-next').trigger('click');
        });
    });
    // On before slide change match active thumbnail to current slide
    $('.colorSelector-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $('.colorSelector-carousel .slick-slide').removeClass('slick-active');
        $('.colorSelector-carousel .slick-slide').eq(mySlideNumber).addClass('slick-active');
    });
    $('.colorSelector-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        console.log(currentSlide);
        if (currentSlide == 0) {
            $('.colorSelector-carousel .prev-button').addClass('disabled');
            $('.colorSelector-carousel .next-button').removeClass('disabled');
        } else if (currentSlide == slick.slideCount - 1) {
            $('.colorSelector-carousel .next-button').addClass('disabled');
            $('.colorSelector-carousel .prev-button').removeClass('disabled');
        } else {
            $('.colorSelector-carousel .next-button').removeClass('disabled');
            $('.colorSelector-carousel .prev-button').removeClass('disabled');
        }
    });

    owlHighlightCarousel.on('translated.owl.carousel', function(event) {
        owlTranslatedCallback(owlHighlightCarousel);
    });

    function owlTranslatedCallback($carousel) {
        if ($carousel.find('.owl-item').last().hasClass('active')) {
            $carousel.parents('.section').find('.owl-navigation__container .owl-nav__next').addClass('disabled');
            $carousel.parents('.section').find('.owl-navigation__container .owl-nav__prev').removeClass('disabled');
            console.log('true');
        } else if ($carousel.find('.owl-item').first().hasClass('active')) {
            $carousel.parents('.section').find('.owl-navigation__container .owl-nav__prev').addClass('disabled');
            $carousel.parents('.section').find('.owl-navigation__container .owl-nav__next').removeClass('disabled');
        }
        return true;
    }

    // Custom Navigation Events
    $('.owl-navigation__favourite .owl-nav__next').click(function() {
        owlFavouriteCarousel.trigger('next.owl.carousel');
    });
    $('.owl-navigation__favourite .owl-nav__prev').click(function() {
        owlFavouriteCarousel.trigger('prev.owl.carousel');
    });

    $('.owl-navigation__highlight .owl-nav__next').click(function() {
        owlHighlightCarousel.trigger('next.owl.carousel');
    });
    $('.owl-navigation__highlight .owl-nav__prev').click(function() {
        owlHighlightCarousel.trigger('prev.owl.carousel');
    });

    $('.owl-navigation__container .owl-nav__prev').addClass('disabled');

    $('.checkBox').click(function() {
        var _this = $(this);
        _this.siblings().removeClass('slick-current');
        _this.addClass('slick-current');
        if ($(window).width() >= 992) {
            var _img_target_id = _this.attr('img-target');
            _this.parents('.collections').find('.variation-product__images .image').hide();
            var _img_target = _this.parents('.collections').find('.variation-product__images .image[id="' + _img_target_id + '"]');
            if (_img_target.length) {
                _img_target.fadeIn();
            }
        }
    });
}
// Product detail
var productDetail = function() {
    var currentQuantity = 1;
    var $productDetail = $('.cart-items__list .inputContainer');
    var $textBoxQuantity = $('.inputContainer').find('.quantity');
    var $productQuantity = $productDetail.find('.js-quantity-display');

    var updateQuantity = function($textbox, $label, number) {
        $label.text(number);
        $textbox.val(number);
    }

    $productDetail.on('click', '.js-plus', function(event) {
        event.preventDefault();
        var _parents = $(this).parents('.inputContainer');
        var _textbox = _parents.find('.quantity');
        currentQuantity = _textbox.val();
        currentQuantity = parseInt(currentQuantity) + 1;
        var _label_quatity = _parents.find('.js-quantity-display');
        _parents.parents('.cart-item__quantity').addClass('show-update__button');
        updateQuantity(_textbox, _label_quatity, currentQuantity);
    });

    $productDetail.on('click', '.js-minus', function(event) {
        event.preventDefault();
        var _parents = $(this).parents('.inputContainer');
        var _textbox = _parents.find('.quantity');
        currentQuantity = _textbox.val();
        currentQuantity = parseInt(currentQuantity) - 1;
        if (currentQuantity < 1)
            currentQuantity = 1;
        var _label_quatity = _parents.find('.js-quantity-display');
        _parents.parents('.cart-item__quantity').addClass('show-update__button');
        updateQuantity(_textbox, _label_quatity, currentQuantity);
    });
};

// Related product
var relatedProduct = function() {
    var $container = $('.dlProductRelated');
    var $relatedProduct = $container.find('.productRelated');
    var $productItems = $container.find('.slideItem');
    var productItemLength = $productItems.length;

    if (productItemLength <= 4) {
        $container.addClass('is-not-show-navigator');
    } else {
        $container.removeClass('is-not-show-navigator');
    }

    $container.addClass('it-has-' + productItemLength + '-items');

    var $relatedProductSlider;
    if ($.fn.slick && $relatedProduct.length > 0) {
        $relatedProduct.on('init', function(event, slick) {
            carouselInitialized.emit('CarouselInitialized', '.slick-slider');
        });
        var $relatedProductSlider = $relatedProduct.slick({
            infinite: false,
            prevArrow: true,
            nextArrow: true,
            dots: true,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            appendDots: $('.dlProductRelated .slickDotsContainer'),
            responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    adaptiveHeight: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    adaptiveHeight: true
                }
            }
            ]
        });
    }

    $container.on('click', '.js-prev-slide', function(event) {
        event.preventDefault();

        $relatedProductSlider.slick('slickPrev');
    });

    $container.on('click', '.js-next-slide', function(event) {
        event.preventDefault();

        $relatedProductSlider.slick('slickNext');
    })
}

function activateSubmenu(row) {
    var $row = $(row),
        $submenu = $row.children('.dropdown');

    $submenu.addClass('menu-show');
}

function deactivateSubmenu(row) {
    var $row = $(row),
        $submenu = $row.children('.dropdown');
    $submenu.removeClass('menu-show');
}

var stickyHeader = function() {
    var $body = $('body');
    var $window = $(window);
    var $menuContainer = $('#masterHead.bridgingdesign');
    var $mobileMenuToogle = $('.mobile.toggleMenu.hamburger');
    var $menuUtilsContainer = $('.utilContainer');
    var $mobileMenu = $('#topNav');

    var lastScrollTop = 0;
    var isScrollDown = false;
    var menuHeight = $menuContainer.height();
    var timeOutRemoveSafeZone;

    var inSafezone = function(pos, isScrollDown) {
        const subNumber = isScrollDown ? menuHeight : 2;
        if (pos <= subNumber) {
            return true;
        } else {
            return false;
        }
    }

    var addStickyMenu = function() {
        $body.removeClass('sticky-out-animation');
    }

    var removeStickyMenu = function() {
        $body.addClass('sticky-out-animation');
    }

    if ($body.hasClass('new-bridging-design-header')) {
        $body.addClass('is-sticky-header');
    }

    $window.on('scroll', function(event) {
        var st = $(this).scrollTop();
        var windowHeight = $window.height();
        var menuUtilsContainerHeight = $menuUtilsContainer.height();
        var menuMobileHeight = windowHeight - menuUtilsContainerHeight;
        var isMobileMenuActive = $mobileMenuToogle.hasClass('active');

        if (isMobileMenuActive) {
            addStickyMenu();
            $mobileMenu.css({
                'max-height': menuMobileHeight + 'px'
            });
            $body.addClass('is-stop-body-scrolling');
            return;
        } else {
            $body.removeClass('is-stop-body-scrolling');
        }

        $mobileMenu.css({
            'max-height': 'inherit'
        })

        if (st > lastScrollTop) {
            //Scroll down
            removeStickyMenu();
            isScrollDown = true;
        } else if (st == lastScrollTop) {


        } else {
            //Scroll up
            addStickyMenu();
            isScrollDown = false;
        }

        lastScrollTop = st;

        if (inSafezone(st, isScrollDown)) {
            $body.addClass('is-in-safezone');
            timeOutRemoveSafeZone && clearTimeout(timeOutRemoveSafeZone);

            addStickyMenu();
        } else {
            timeOutRemoveSafeZone = setTimeout(function() {
                if (!inSafezone(st, isScrollDown)) {
                    $body.removeClass('is-in-safezone');
                }
            })
        }
    });

    $mobileMenuToogle.on('click', function() {
        var isMobileMenuActive = $mobileMenuToogle.hasClass('active');

        if (!isMobileMenuActive) {
            $body.removeClass('is-stop-body-scrolling');
        }
    })
};

$(document).ready(function() {
    var $menu = $('#topNav .mega-menu');

    $menu.menuAim({
        triggerEvent: 'hover',
        activateCallback: activateSubmenu,
        deactivateCallback: deactivateSubmenu,
        submenuDirection: 'below',
        openClassName: 'menu-show',
        activationDelay: 200
    });
    productDetail();
    relatedProduct();
    stickyHeader();

    $('.shipping-tooltip__label').click(function() {
        var _this = $(this);
        _this.parents('li.shipping-restrictions').toggleClass('is-show__tooltip');
    });

    $('.close-restrictions').click(function() {
        var _this = $(this);
        _this.parents('li.shipping-restrictions').removeClass('is-show__tooltip');
    });

    $('.next-section').on('click', function() {
        var _this = $(this);
        if (_this.parents('.section').next('.section').length > 0) {
            $('html, body').animate({
                scrollTop: _this.parents('.section').next('.section').offset().top
            }, 1000);
        }
    });
    $('img.svg').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    $('.footer-navigation__container h3 a.expand-collapse').click(function() {
        var _this = $(this);
        _this.parents('.col').siblings().find('h3').removeClass('dropdown-open');
        _this.parent().toggleClass('dropdown-open');
        _this.parents('.col').siblings().find('.footer-navigation').each(function() {
            if (!$(this).hasClass('about-delonghi__navigation')) {
                $(this).slideUp();
            }
        });
        _this.parents('.col').find('.footer-navigation').slideToggle();
    });

    //$('.has-code__label').click(function () {
    //    $(this).toggleClass('input-code__box--open');
    //    $(this).next().slideToggle();
    //});

    $(".code-input__textbox").on("propertychange change keyup paste input", function() {
        var _this = $(this);
        if (_this.val().length > 0) {
            _this.parent().find('input[type="submit"]').removeClass('disabled');
        } else {
            _this.parent().find('input[type="submit"]').addClass('disabled');
        }
    });

    var _width = $(window).width();
    columnSynchHeight(_width);
    footerSynchHeight(_width);
    $(window).resize(function() {
        var _width = $(window).width();
        columnSynchHeight(_width);
        footerSynchHeight(_width);
    });

    function columnSynchHeight(windowW) {
        if (windowW >= 768) {
            $('.js-synchHeights').each(function() {
                var _this = $(this);
                _this.parents('.section').find('.col').synchHeights();
            });
        } else {
            $('.section .js-synchHeights .col').css('min-height', 0);
        }
    }
    function footerSynchHeight(windowW) {
        if (windowW >= 768) {
            $('.js-synchHeights').parents('#footer').find('.col').synchHeights();
        } else {
            $('.js-synchHeights').parents('#footer').find('.col').css('min-height', 0);
        }
    }
    scroll_to_top();
    collectionsCarousel && collectionsCarousel();
    $(window).resize(function() {
        collectionsCarousel && collectionsCarousel();
    });
});

function scroll_to_top() {
    if ($('#back-to-top').length) {

        var backToTop = function() {
            var scrollTop = $(window).scrollTop();
            var scrollTrigger = $(document).height() - $("#footer").outerHeight() + 100;
            var to_position = scrollTop + $(window).height();
            if (to_position > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };

        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
        });
    }
}

