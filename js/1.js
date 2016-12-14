! function(t) {
    var e = function() {};
    e.prototype.widgetVersion = "20161206124533", e.prototype.staticPrefix = t.location.protocol + "//widget.sender.mobi/build/", e.prototype.disposed = !1, e.prototype.hasInvite = !1, e.prototype.minHeight = 400, e.prototype.minWidth = 360, e.prototype.defaultOptions = {
        embedTo: "",
        draggable: !0,
        resizeable: !0,
        showButton: !0,
        autostart: !1,
        showBar: !0,
        showContactCard: !0,
        location: t.location.href,
        showPreloader: !1,
        showControls: !0
    }, e.prototype.checkWidgetExist = function(e) {
        return t["_" + e.companyId] === e.companyId
    }, e.prototype.setCompanyIdToStorage = function(e) {
        t["_" + e.companyId] = e.companyId
    }, e.prototype.init = function(t) {
        return this.disposed = !1, !this.checkWidgetExist(t) && (this.addStyleFile(document, "link", this.staticPrefix + "styles/button.min.css"), this.loadFont(), this.addOptions(t), this.addStorageObject(), this.initElement(), this.createWrapper(document, "div"), this.initHandlers(), this.initAnalytics(document, "iframe", "sender-analytics"), this.setCompanyIdToStorage(t), void 0)
    }, e.prototype.restart = function(t, e) {
        e || this.dispose(), this.init(Object.assign({}, this.configOptions, t))
    }, e.prototype.initElement = function() {
        var t;
        if (this.options.embedTo.length) try {
            t = document.querySelector(this.options.embedTo), this.el = t ? t : null
        }
        catch (t) {}
    }, e.prototype.initHandlers = function() {
        this.onPageShowEvent = this.onPageShowEvent.bind(this), this.onResize = this.onResize.bind(this), t.addEventListener("pageshow", this.onPageShowEvent), t.addEventListener("beforeunload", this.beforeUnload), this.options.draggable && !this.el && this.addListener(this.wrapper.querySelector(".sender-widget-drag"), "mousedown", this.initDrag), this.options.resizeable && this.addListener(this.wrapper.querySelector(".sender-widget-resize"), "mousedown", this.initResize), this.el || t.addEventListener("resize", this.onResize), this.initPostMessageHandler()
    }, e.prototype.initAnalytics = function(t, e, i) {
        var s, o = t.getElementsByTagName("body")[0];
        s = t.createElement(e), s.id = i, s.src = this.staticPrefix + this.widgetVersion + "/analytics.html", s.setAttribute("style", "position: absolute; height: 1px; width: 1px; top:-1000px; background-color: transparent;"), s.setAttribute("scrolling", "no"), s.setAttribute("frameborder", 0), o.appendChild(s)
    }, e.prototype.createIframe = function(t, e, i, s) {
        var o, n = this.wrapper;
        o = t.createElement(e), o.className = "sender-widget-frame", o.id = i, o.onload = function() {
            this.postOptions(Object.assign({}, this.options, {
                defaultOptions: this.defaultOptions,
                configOptions: this.configOptions
            }))
        }.bind(this), o.src = this.staticPrefix + "index.html", o.setAttribute("frameborder", 0), o.setAttribute("scrolling", "no"), o.style.backgroundColor = "transparent", n.appendChild(o), this.iframe = o
    }, e.prototype.postOptions = function(e) {
        var i, s = ["embedTo", "draggable", "resizeable", "auth"],
            o = e;
        i = this.parseGetParams(t.location.search);
        for (var n in o) s.indexOf(o[n]) !== -1 && delete o.key;
        i && (o = Object.assign(o, i)), this.postMessage({
            title: "initOptions",
            options: o
        })
    }, e.prototype.parseGetParams = function(t) {
        return t.replace(/^\?/, "").split("&").reduce(function(t, e) {
            var i = e.split("=");
            return i[0] && "auth" !== i[0] && (t[i[0]] = decodeURIComponent(i[1])), t
        }, {})
    }, e.prototype.addStyleFile = function(t, e, i) {
        var s, o = t.getElementsByTagName("head")[0];
        s = t.createElement(e), s.href = i, s.rel = "stylesheet", s.type = "text/css", o.appendChild(s)
    }, e.prototype.createWrapper = function(t, e) {
        var i, s = t.getElementsByTagName("body")[0];
        i = t.createElement(e), i.className = "sender-wrapper sender-wrapper-" + this.options.companyId + " sender-hidden", this.el && (s = this.el, i.style.width = "100%", i.style.height = "100%", i.classList.add("sender-embed")), s.appendChild(i), this.wrapper = i, this.options.height ? this.setDefaultSizeParam("height", this.options.height) : this.storage.getStateItem("height") || this.storage.setState({
            height: 570
        }), this.options.width ? this.setDefaultSizeParam("width", this.options.width) : this.storage.getStateItem("width") || this.storage.setState({
            width: 360
        }), this.options.draggable && !this.el && this.addDragControl(i), this.createIframe(document, "iframe", "widget-frame-" + this.options.companyId, this.options), this.options.resizeable && this.addResizeControl(i), this.setWrapperSize()
    }, e.prototype.setDefaultSizeParam = function(t, e) {
        var i = {},
            s = "height" === t ? this.minHeight : this.minWidth,
            o = e >= s ? e : s;
        this.wrapper.style[t] = o + "px", i[t] = o, this.storage.getStateItem(t) || this.storage.setState(i)
    }, e.prototype.compareWrapperHeight = function() {
        var e, i = t.innerHeight,
            s = this.storage.getStateItem("height");
        this.el || (s > i && (e = i < this.minHeight ? this.minHeight : i), e && (this.wrapper.style.height = e + "px", this.storage.setState({
            height: e
        }), this.onWindowResize()))
    }, e.prototype.setWrapperSize = function() {
        this.el || (this.storage.getStateItem("height") && (this.wrapper.style.height = this.storage.getStateItem("height") + "px"), this.storage.getStateItem("width") && (this.wrapper.style.width = this.storage.getStateItem("width") + "px"))
    }, e.prototype.setWrapperPosition = function() {
        this.el || (this.storage.getStateItem("top") >= 0 && (this.wrapper.style.top = this.storage.getStateItem("top") + "px"), this.storage.getStateItem("left") >= 0 && (this.wrapper.style.left = this.storage.getStateItem("left") + "px"))
    }, e.prototype.addDragControl = function(t) {
        var e = document.createElement("div");
        e.className = "sender-widget-drag", t.appendChild(e)
    }, e.prototype.addResizeControl = function(t) {
        var e = document.createElement("div");
        e.className = "sender-widget-resize", e.style.background = "url(" + this.staticPrefix + "images/resize.png) no-repeat", t.appendChild(e)
    }, e.prototype.addOptions = function(t) {
        this.configOptions = t, this.options = Object.assign({}, this.defaultOptions, t)
    }, e.prototype.addStorageObject = function() {
        this.storage = new i({
            companyId: this.options.companyId
        }), this.storage.setDefaultState()
    }, e.prototype.addListener = function(t, e, i) {
        t.addEventListener(e, i.bind(this), !1)
    }, e.prototype.initResize = function(t) {
        t.preventDefault(), t.stopPropagation(), this.createInvisibleLayer();
        var e = this.wrapper,
            i = t.clientX,
            s = t.clientY,
            o = e.offsetWidth,
            n = e.offsetHeight;
        this.minWidth, this.minHeight;
        setTimeout(function() {
            this.onresizeMouseMove({
                startX: i,
                startY: s,
                element: e,
                elementWidth: o,
                elementHeight: n
            })
        }.bind(this), 0), e.onmouseup = function() {
            document.onmousemove = null, e.onmouseup = null, this.removeInvisibleLayer()
        }.bind(this)
    }, e.prototype.initDrag = function(e) {
        e.preventDefault(), e.stopPropagation(), this.createInvisibleLayer();
        var i = this.wrapper,
            s = i.querySelector(".sender-widget-drag"),
            o = i.getBoundingClientRect(),
            n = e.pageX - o.left,
            r = e.pageY - o.top,
            a = function(t) {
                i.style.left = t.pageX - n + "px", this.storage.setState({
                    left: t.pageX - n
                }), i.style.top = t.pageY - r + "px", this.storage.setState({
                    top: t.pageY - r
                })
            }.bind(this);
        document.onmouseout = function(e) {
            e = e ? e : t.event;
            var i = e.relatedTarget || e.toElement,
                o = e.target || e.srcElement;
            i && "HTML" != i.nodeName || "IFRAME" === o.nodeName || this.onDragFinish(s)
        }.bind(this), i.ondragstart = function() {
            return !1
        }, a(e), document.onmousemove = function(t) {
            t.preventDefault(), t.stopPropagation(), a(t)
        }, s.onmouseup = function() {
            this.onDragFinish(s)
        }.bind(this)
    }, e.prototype.onDragFinish = function(t) {
        document.onmousemove = null, document.onmouseout = null, this.removeInvisibleLayer(), t.onmouseup = null, this.moveAfterDrag()
    }, e.prototype.onWindowResize = function() {
        if (this.wrapper) {
            var e = this.wrapper.getBoundingClientRect();
            t.outerWidth - e.left - e.width < 0 && (this.wrapper.style.left = t.outerWidth - e.width - 15 + "px", this.storage.setState({
                left: t.outerWidth - e.width - 15
            })), e.top + e.height > t.innerHeight && (this.wrapper.style.top = "0px", this.storage.setState({
                top: 0
            }))
        }
    }, e.prototype.moveAfterDrag = function() {
        var e = this.wrapper,
            i = this.wrapper.getBoundingClientRect();
        if (i.top < 0 && (e.style.top = "0px", this.storage.setState({
                top: 0
            })), i.left < 0 && (e.style.left = "0px", this.storage.setState({
                left: 0
            })), t.outerWidth - i.left - i.width < 0 && (e.style.left = t.outerWidth - i.width - 15 + "px", this.storage.setState({
                left: t.outerWidth - i.width - 15
            })), t.outerHeight - i.top - i.height < 0) {
            var s = t.innerHeight - i.height;
            e.style.top = s < 0 ? "0px" : s + "px", this.storage.setState({
                top: s < 0 ? 0 : s
            })
        }
    }, e.prototype.onresizeMouseMove = function(e) {
        document.onmousemove = function(i) {
            var s, o, n, r;
            i.preventDefault(), i.stopPropagation(), e.elementWidth + (i.clientX - e.startX) < 360 && e.elementHeight + (i.clientY - e.startY) < this.minHeight || t.innerWidth - i.clientX < 5 || t.innerHeight - i.clientY < 5 || (s = e.elementWidth + (i.clientX - e.startX), o = e.elementHeight + (i.clientY - e.startY), n = s > this.minWidth ? s : this.minWidth, r = o > this.minHeight ? o : this.minHeight, e.element.style.width = n + "px", e.element.style.height = r + "px", this.storage.setState({
                width: n
            }), this.storage.setState({
                height: r
            }))
        }.bind(this)
    }, e.prototype.renderButton = function(t) {
        if (!this.button && (this.el || this.wrapper.classList.add(t.className), t.hasOwnProperty("showButton") && (this.options = Object.assign({}, this.options, {
                showButton: t.showButton
            })), this.options.showButton && t.showButton)) {
            var e = document.createElement("div"),
                i = document.createElement("div"),
                s = document.createElement("span"),
                o = document.createElement("a"),
                n = document.createElement("div"),
                r = t.header.split(""),
                a = ["left-bottom", "left-center", "left-top", "right-bottom", "right-center", "right-top"];
            if (e.className = "widget-button widget-button-" + this.options.companyId, i.className = "widget-button-logo-wrapper", s.className = "widget-button-logo", n.className = "widget-button-text", e.classList.add(t.className), t.color && (e.setAttribute("style", "background-color:" + t.color + "!important;"), this.createArrowButtonStyle(t.color, t.className)), t.companyLogo ? (s.style.backgroundImage = "url(" + t.companyLogo + ")", s.style.backgroundSize = "cover", s.style.backgroundColor = "#fff") : s.style.backgroundImage = "url(" + this.staticPrefix + "images/company-logo.png)", a.indexOf(t.className) !== -1) r.forEach(function(e) {
                var i = document.createElement("span"),
                    s = document.createTextNode(e);
                i.className = "widget-button-text-char " + t.charClass, i.appendChild(s), n.appendChild(i)
            });
            else {
                var d = document.createTextNode(t.header);
                n.appendChild(d)
            }(this.options.autostart || this.storage.getStateItem("opened")) && (e.classList.add("sender-hidden"), this.storage.setState({
                opened: !0
            })), i.appendChild(s), this.isMobile() ? (o.setAttribute("target", "_blank"), o.setAttribute("href", this.makeMobileLink()), o.setAttribute("style", "display: inline-block!important; text-decoration: none!important;"), o.classList.add("sender-mobile-link"), o.appendChild(i), o.appendChild(n), e.appendChild(o)) : (e.appendChild(i), e.appendChild(n)), document.body.appendChild(e), this.button = e, this.addListener(this.button, "click", this.toggleButton), this.isMobile() && this.initMobileLinkHandler(".sender-mobile-link")
        }
    }, e.prototype.createArrowButtonStyle = function(t, e) {
        var i = document.createElement("style"),
            s = {
                top: "border-bottom-color: ",
                left: "border-right-color: ",
                right: "border-left-color: ",
                bottom: "border-top-color: "
            },
            o = e.split("-")[0],
            n = "";
        i.type = "text/css", n += ".widget-button." + e + ":after { " + s[o] + t + "!important; }.sender-invite-container." + e + ":after { " + s[o] + "#fff!important;}", i.appendChild(document.createTextNode(n)), document.body.appendChild(i)
    }, e.prototype.loadFont = function() {
        var t = document.createElement("link");
        t.setAttribute("type", "text/css"), t.setAttribute("rel", "stylesheet"), t.setAttribute("href", "https://fonts.googleapis.com/css?family=Roboto"), document.getElementsByTagName("head")[0].appendChild(t)
    }, e.prototype.loadInviteStyle = function() {
        this.addStyleFile(document, "link", this.staticPrefix + this.widgetVersion + "/invite.min.css")
    }, e.prototype.onLoadInviteFont = function() {
        this.addStyleFile(document, "link", this.staticPrefix + "styles/invite.min.css")
    }, e.prototype.renderInvite = function(t) {
        if (t && this.options.showButton) {
            var e = "",
                i = document.createElement("div");
            i.classList.add("sender-invite-container"), i.classList.add(t.invite_className), i.setAttribute("data-el", "invite-container"), e += this.renderInviteAvatar(t.invite_image), e += this.renderTextWrapper(t), e += '<div class="sender-invite-close" data-el="sender-close"></div>', e += this.renderTextareaWrapper(t), i.innerHTML = e, document.body.appendChild(i), this.addInviteHandlers(), this.isMobile() && this.initMobileLinkHandler(".sender-mobile-invite-link"), this.hasInvite = !0
        }
    }, e.prototype.onDialogFinish = function() {
        this.pubsub.publish("dialogFinish")
    }, e.prototype.renderTextWrapper = function(t) {
        return '<div class="sender-invite-text-wrapper">' + this.renderInviteNick(t.invite_nick) + this.renderInviteText(t.invite_text) + "</div>"
    }, e.prototype.renderTextareaWrapper = function(t) {
        var e = '<div class="sender-invite-textarea-wrapper">',
            i = '<div class="sender-invite-textarea"><textarea rows="1" data-el="sender-textarea" placeholder="' + t.invite_placeholder + '"></textarea></div>';
        return this.isMobile() && (e += '<a target="_blank" href="' + this.makeMobileLink() + '" style="display: inline-block!important; text-decoration: none!important;" class="sender-mobile-invite-link">'), e += i + this.renderInviteSend(t.color) + "</div>"
    }, e.prototype.renderInviteNick = function(t) {
        return '<div class="sender-invite-nick">' + t + "</div>"
    }, e.prototype.renderInviteAvatar = function(t) {
        return '<div class="sender-invite-avatar" style="background-image: url(' + t + ');"></div>'
    }, e.prototype.renderInviteText = function(t) {
        return '<div class="sender-invite-text">' + t + "</div>"
    }, e.prototype.renderInviteSend = function(t) {
        return '<div class="sender-invite-send" data-el="sender-send"><?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="22px" height="45px" viewBox="0 0 22 18"  style="display: inline-block; vertical-align: middle;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="button_close" transform="translate(-1198.000000, -843.000000)" fill="' + t + '"><g id="button3" transform="translate(917.000000, 756.000000)"><g id="Send-Bar" transform="translate(0.000000, 74.000000)"><g id="text" transform="translate(14.370370, 0.000000)"><polygon id="Shape" points="288 22 267 13 267 20 282 22 267 24 267 31"></polygon></g></g></g></g></g></svg></div>'
    }, e.prototype.addInviteHandlers = function() {
        var t = document.querySelector('[data-el="sender-send"]'),
            e = document.querySelector('[data-el="sender-close"]'),
            i = document.querySelector('[data-el="sender-textarea"]');
        this.inviteSendHandler = this.onInviteSendClick.bind(this), this.inviteCloseHandler = this.onInviteCloseClick.bind(this), this.inviteKeydownHandler = this.onInviteKeydown.bind(this), this.addListener(t, "click", this.inviteSendHandler), this.addListener(e, "click", this.inviteCloseHandler), this.addListener(i, "keydown", this.inviteKeydownHandler)
    }, e.prototype.onInviteSendClick = function() {
        var t = document.querySelector('[data-el="sender-textarea"]'),
            e = "";
        e = t.value, e && e.trim() && (this.sendTextMessage(e.trim()), this.disposeInvite())
    }, e.prototype.onInviteCloseClick = function() {
        this.disposeInvite(), this.postMessage({
            title: "inviteClosed"
        })
    }, e.prototype.onInviteKeydown = function(t) {
        t && 13 === t.keyCode && this.onInviteSendClick()
    }, e.prototype.disposeInvite = function() {
        var t = document.querySelector('[data-el="invite-container"]');
        this.hasInvite && t && (this.removeInviteHandlers(), document.body.removeChild(t), this.hasInvite = !1)
    }, e.prototype.removeInviteHandlers = function() {
        var t = document.querySelector('[data-el="sender-send"]'),
            e = document.querySelector('[data-el="sender-close"]'),
            i = document.querySelector('[data-el="sender-textarea"]');
        t && t.removeEventListener("click", this.inviteSendHandler), e && e.removeEventListener("click", this.inviteCloseHandler), i && i.removeEventListener("keydown", this.inviteKeydownHandler)
    }, e.prototype.toggleButton = function(t) {
        if (t && t.forceOpen) return this.disposeInvite(), this.toggleWidget(!0), void(this.options.showButton && this.button.classList.add("sender-hidden"));
        if (!this.options.showButton) return void this.toggleWidget();
        var e = this.button.classList.contains("sender-hidden");
        e ? this.showButton() : (this.disposeInvite(), this.hideButton())
    }, e.prototype.postWidgetShow = function() {
        this.configOptions.welcomeRobotId || this.postMessage({
            title: "postWidgetShow",
            page: t.location.href
        })
    }, e.prototype.postWidgetVisible = function() {
        this.postMessage({
            title: "widgetVisible"
        })
    }, e.prototype.handleWidgetReadyEvent = function() {
        this.pubsub.publish("widgetIsReady"), setTimeout(function() {
            this.toggleWrapper(), this.compareWrapperHeight()
        }.bind(this), 500), this.onFocusEvent = this.onFocusEvent.bind(this), t.addEventListener("focus", this.onFocusEvent)
    }, e.prototype.onPageShowEvent = function(e) {
        e && e.persisted && t.location.reload()
    }, e.prototype.onResize = function() {
        this.onWindowResize(), this.compareWrapperHeight()
    }, e.prototype.onFocusEvent = function() {
        setTimeout(function() {
            this.disposed || this.onInitStreams()
        }.bind(this), 1e3), this.disposed && this.isMobile() && this.restart({}, !0)
    }, e.prototype.onInitStreams = function() {
        this.postMessage({
            title: "initStreams"
        })
    }, e.prototype.sendTextMessage = function(t) {
        if (t) {
            var e = t.trim();
            this.postMessage({
                title: "sendTextMessage",
                text: e
            }), this.isMobile() || this.showWidget()
        }
    }, e.prototype.handleNewMessageReceived = function() {
        this.pubsub.publish("newMessageReceived")
    }, e.prototype.handleUpdateHeight = function(t) {
        t && t.heightToSet && (this.wrapper.style.height = t.heightToSet + "px", this.iframe.style.height = t.heightToSet + "px")
    }, e.prototype.handleResetState = function() {
        this.storage.cleanState(), this.resetWrapperStyle()
    }, e.prototype.disposeWidgetHandler = function() {
        this.dispose()
    }, e.prototype.makeMobileLink = function() {
        var t = this.staticPrefix + "popup.html?",
            e = Object.keys(this.options);
        return e.forEach(function(e) {
            this.options[e] && (t += e + "=" + encodeURIComponent(this.options[e]) + "&")
        }.bind(this)), t
    }, e.prototype.resetWrapperStyle = function() {
        this.wrapper.style.height = this.options.height || "", this.wrapper.style.width = this.options.width || "", this.wrapper.style.left = "", this.wrapper.style.top = ""
    }, e.prototype.toggleWidget = function(t) {
        var e = this.wrapper.classList.contains("sender-hidden");
        e || t ? this.showWidget(t) : this.hideWidget()
    }, e.prototype.hideWidget = function() {
        this.wrapper.classList.add("sender-hidden"), this.pubsub.publish("widgetIsHidden"), this.button && this.button.classList.remove("sender-hidden")
    }, e.prototype.showWidget = function(t) {
        this.wrapper.classList.remove("sender-hidden"), this.onInitStreams(), this.postWidgetVisible(), this.button && this.button.classList.add("sender-hidden"), this.storage.setState({
            opened: !0
        }), t || this.postWidgetShow()
    }, e.prototype.showButton = function() {
        this.wrapper.classList.add("sender-hidden"), this.button.classList.remove("sender-hidden")
    }, e.prototype.hideButton = function() {
        this.wrapper.classList.remove("sender-hidden"), this.button.classList.add("sender-hidden"), this.storage.setState({
            opened: !0
        }), this.onInitStreams(), this.postWidgetVisible(), this.postWidgetShow()
    }, e.prototype.toggleWrapper = function() {
        (this.options.autostart || this.storage.getStateItem("opened")) && (this.wrapper.classList.remove("sender-hidden"), this.postWidgetVisible()), this.options.autostart && this.postWidgetShow(), this.setWrapperPosition()
    }, e.prototype.createInvisibleLayer = function() {
        var t = document.createElement("div");
        t.className = "sender-widget-layer", this.wrapper.querySelector(".sender-widget-layer") || this.wrapper.appendChild(t)
    }, e.prototype.removeInvisibleLayer = function() {
        var t = this.wrapper.querySelector(".sender-widget-layer");
        t.parentNode.removeChild(t)
    }, e.prototype.initPostMessageHandler = function() {
        this.postMessageFunction = this.postMessageHandler.bind(this), t.addEventListener("message", this.postMessageFunction)
    }, e.prototype.initMobileLinkHandler = function(t) {
        this.mobileLinkHandler = this.dispose.bind(this), this.addListener(document.querySelector(t), "click", function(t) {
            t.stopPropagation(), this.mobileLinkHandler()
        }.bind(this))
    }, e.prototype.postSiteEvent = function(t) {
        this.postMessage({
            title: "siteEvent",
            actionData: t
        })
    }, e.prototype.postMessageHandler = function(t) {
        if (t.data && t.data.title && t.data.companyId === this.options.companyId) switch (t.data.title) {
            case "renderButton":
                this.renderButton(t.data);
                break;
            case "toggleButton":
                this.toggleButton(t.data);
                break;
            case "widgetIsReady":
                this.handleWidgetReadyEvent();
                break;
            case "newMessageReceived":
                this.handleNewMessageReceived();
                break;
            case "updateHeight":
                this.handleUpdateHeight(t.data);
                break;
            case "resetState":
                this.handleResetState();
                break;
            case "restartWidget":
                this.restart({}, !1);
                break;
            case "loadInviteFont":
                this.onLoadInviteFont();
                break;
            case "renderInvite":
                this.renderInvite(t.data);
                break;
            case "dialogFinish":
                this.onDialogFinish();
                break;
            case "hideWidget":
                this.hideWidget()
        }
    }, e.prototype.postMessage = function(t) {
        if (t.companyId = this.options.companyId, this.iframe) {
            if (this.disposed) return;
            this.iframe.contentWindow.postMessage(t, "*")
        }
    }, e.prototype.isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, e.prototype.callRobot = function(t) {
        this.postMessage({
            title: "callRobot",
            model: t
        })
    }, e.prototype.showContactCard = function() {
        this.postMessage({
            title: "showContactCard"
        })
    }, e.prototype.hideContactCard = function() {
        this.postMessage({
            title: "hideContactCard"
        })
    }, e.prototype.resetWidget = function() {
        this.postMessage({
            title: "resetWidget"
        })
    }, e.prototype.dispose = function() {
        this.disposed = !0, this.mobileLinkHandler && document.querySelector(".sender-mobile-link").removeEventListener("click", this.mobileLinkHandler), this.button && (document.body.removeChild(this.button), this.button = null), this.storage && (this.storage.cleanState(), this.storage = null), this.el ? this.el.removeChild(this.wrapper) : document.body.removeChild(this.wrapper), this.wrapper = null, this.iframe = null, document.body.removeChild(document.querySelector("#sender-analytics")), this.postMessageFunction && t.removeEventListener("message", this.postMessageFunction), this.onFocusEvent && !this.isMobile() && t.removeEventListener("focus", this.onFocusEvent), this.onPageShowEvent && t.removeEventListener("pageshow", this.onPageShowEvent), this.onResize && t.removeEventListener("resize", this.onResize), this.hasInvite && this.disposeInvite(), t["_" + this.options.companyId] = null
    }, e.prototype.on = function(t, e) {
        this.pubsub.subscribe(t, e.bind(this))
    }, e.prototype.off = function(t, e) {
        this.pubsub.unsubscribe(t, e.bind(this))
    }, e.prototype.trigger = function(t) {
        this.pubsub.publish(t)
    }, e.prototype.pubsub = function(t) {
        var e = {},
            i = -1;
        return t.subscribe = function(t, s) {
            e[t] || (e[t] = []);
            var o = (++i).toString();
            return e[t].push({
                token: o,
                func: s
            }), o
        }, t.publish = function(t, i) {
            return !!e[t] && (setTimeout(function() {
                for (var s = e[t], o = s ? s.length : 0; o--;) s[o].func(t, i)
            }, 0), !0)
        }, t.unsubscribe = function(t) {
            for (var i in e)
                if (e[i])
                    for (var s = 0, o = e[i].length; s < o; s++)
                        if (e[i][s].token === t) return e[i].splice(s, 1), t;
            return !1
        }, t
    }({});
    var i = function(t) {
        this.companyId = t.companyId
    };
    i.prototype.setState = function(t) {
        var e = JSON.parse(sessionStorage.getItem(this.companyId + "_state")) || {};
        sessionStorage.setItem(this.companyId + "_state", JSON.stringify(Object.assign(e, t)))
    }, i.prototype.setDefaultState = function() {
        this.getState() || sessionStorage.setItem(this.companyId + "_state", JSON.stringify({}))
    }, i.prototype.getState = function() {
        try {
            return JSON.parse(sessionStorage.getItem(this.companyId + "_state"))
        }
        catch (t) {}
    }, i.prototype.cleanState = function() {
        sessionStorage.setItem(this.companyId + "_state", JSON.stringify({}))
    }, i.prototype.getStateItem = function(t) {
        var e;
        return this.getState() && (e = this.getState()[t]), e
    }, Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(t, e) {
            "use strict";
            if (void 0 === t || null === t) throw new TypeError("Cannot convert first argument to object");
            for (var i = Object(t), s = 1; s < arguments.length; s++) {
                var o = arguments[s];
                if (void 0 !== o && null !== o)
                    for (var n = Object.keys(Object(o)), r = 0, a = n.length; r < a; r++) {
                        var d = n[r],
                            h = Object.getOwnPropertyDescriptor(o, d);
                        void 0 !== h && h.enumerable && (i[d] = o[d])
                    }
            }
            return i
        }
    }), t.SenderWidget = new e, t.senderCallback && t.senderCallback()
}(window);