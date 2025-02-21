// variables
const accordionBtnToggle = document.querySelectorAll(".accordion-card__header");
// Adding event listener to the accordion toggle button
for (i of accordionBtnToggle) {
    i.addEventListener("click", accordionToggleFunction);
  }
// function to open an accordion
function accordionToggleFunction() {
    this.nextElementSibling.classList.toggle("active");
    this.children[0].classList.toggle("toggleIcon");
  }

  var StackCards = function(element) {
    this.element = element;
    this.items = this.element.getElementsByClassName('js-stack-cards__item');
    this.scrollingListener = false;
    this.scrolling = false;
    initStackCardsEffect(this);
  };
  
  function initStackCardsEffect(element) {
    // we'll create the effect here
  };
  
  var stackCards = document.getElementsByClassName('js-stack-cards'),
    intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();
    
  if(stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) { 
    for(var i = 0; i < stackCards.length; i++) {
      new StackCards(stackCards[i]);
    }
  }

  function initStackCardsEffect(element) { // use Intersection Observer to trigger animation
    var observer = new IntersectionObserver(stackCardsCallback.bind(element));
    observer.observe(element.element);
  };
   
  function stackCardsCallback(entries) { // Intersection Observer callback
    if(entries[0].isIntersecting) { // cards inside viewport - add scroll listener
      if(this.scrollingListener) return; // listener for scroll event already added
      stackCardsInitEvent(this);
    } else { // cards not inside viewport - remove scroll listener
      if(!this.scrollingListener) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingListener);
      this.scrollingListener = false;
    }
  };
   
  function stackCardsInitEvent(element) {
    element.scrollingListener = stackCardsScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingListener);
  };
   
  function stackCardsScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  };
   
  function animateStackCards() {
    // apply transform values to different card elements
  };

  function animateStackCards() {
    var top = this.element.getBoundingClientRect().top;
    
    for(var i = 0; i < this.items.length; i++) {
    // cardTop/cardHeight/marginY are the css values for the card top position/height/Y offset
      var scrolling = this.cardTop - top - i*(this.cardHeight+this.marginY);
      if(scrolling > 0) { // card is fixed - we can scale it down
      this.items[i].setAttribute('style', 'transform: translateY('+this.marginY*i+'px) scale('+(this.cardHeight - scrolling*0.05)/this.cardHeight+');');
      }
    }
   
    this.scrolling = false;
  };


  "use strict";
( () => {
    var c = class extends Event {
        oldState;
        newState;
        constructor(t, {oldState: o="", newState: r="", ...i}={}) {
            super(t, i),
            this.oldState = String(o || ""),
            this.newState = String(r || "")
        }
    }
      , N = new WeakMap;
    function P(e, t, o) {
        N.set(e, setTimeout( () => {
            N.has(e) && e.dispatchEvent(new c("toggle",{
                cancelable: !1,
                oldState: t,
                newState: o
            }))
        }
        , 0))
    }
    var D = globalThis.ShadowRoot || function() {}
      , U = globalThis.HTMLDialogElement || function() {}
      , M = new WeakMap
      , p = new WeakMap
      , h = new WeakMap;
    function L(e) {
        return h.get(e) || "hidden"
    }
    var b = new WeakMap;
    function B(e) {
        let t = e.popoverTargetElement;
        if (!(t instanceof HTMLElement))
            return;
        let o = L(t);
        e.popoverTargetAction === "show" && o === "showing" || e.popoverTargetAction === "hide" && o === "hidden" || (o === "showing" ? m(t, !0, !0) : d(t, !1) && (b.set(t, e),
        S(t)))
    }
    function d(e, t) {
        return !(e.popover !== "auto" && e.popover !== "manual" || !e.isConnected || t && L(e) !== "showing" || !t && L(e) !== "hidden" || e instanceof U && e.hasAttribute("open") || document.fullscreenElement === e)
    }
    function F(e) {
        return e ? Array.from(p.get(e.ownerDocument) || []).indexOf(e) + 1 : 0
    }
    function G(e) {
        let t = W(e)
          , o = Q(e);
        return F(t) > F(o) ? t : o
    }
    function y(e) {
        let t = p.get(e);
        for (let o of t || [])
            if (!o.isConnected)
                t.delete(o);
            else
                return o;
        return null
    }
    function v(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.parentNode ? v(e.parentNode) : e
    }
    function W(e) {
        for (; e; ) {
            if (e instanceof HTMLElement && e.popover === "auto" && h.get(e) === "showing")
                return e;
            if (e = e.parentElement || v(e),
            e instanceof D && (e = e.host),
            e instanceof Document)
                return
        }
    }
    function Q(e) {
        for (; e; ) {
            let t = e.popoverTargetElement;
            if (t instanceof HTMLElement)
                return t;
            if (e = e.parentElement || v(e),
            e instanceof D && (e = e.host),
            e instanceof Document)
                return
        }
    }
    function _(e) {
        let t = new Map
          , o = 0
          , r = e.ownerDocument;
        for (let a of p.get(r) || [])
            t.set(a, o),
            o += 1;
        t.set(e, o),
        o += 1;
        let i = null;
        function l(a) {
            let g = W(a);
            if (g === null)
                return null;
            let n = t.get(g);
            (i === null || t.get(i) < n) && (i = g)
        }
        return l(e?.parentElement),
        i
    }
    function J(e) {
        return e.hidden || e instanceof D || (e instanceof HTMLButtonElement || e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement || e instanceof HTMLOptGroupElement || e instanceof HTMLOptionElement || e instanceof HTMLFieldSetElement) && e.disabled || e instanceof HTMLInputElement && e.type === "hidden" || e instanceof HTMLAnchorElement && e.href === "" ? !1 : typeof e.tabIndex == "number" && e.tabIndex !== -1
    }
    function X(e) {
        if (e.shadowRoot && e.shadowRoot.delegatesFocus !== !0)
            return null;
        let t = e;
        t.shadowRoot && (t = t.shadowRoot);
        let o = t.querySelector("[autofocus]");
        if (o)
            return o;
        {
            let l = t.querySelectorAll("slot");
            for (let a of l) {
                let g = a.assignedElements({
                    flatten: !0
                });
                for (let n of g) {
                    if (n.hasAttribute("autofocus"))
                        return n;
                    if (o = n.querySelector("[autofocus]"),
                    o)
                        return o
                }
            }
        }
        let r = e.ownerDocument.createTreeWalker(t, NodeFilter.SHOW_ELEMENT)
          , i = r.currentNode;
        for (; i; ) {
            if (J(i))
                return i;
            i = r.nextNode()
        }
    }
    function Y(e) {
        X(e)?.focus()
    }
    var H = new WeakMap;
    function S(e) {
        if (!d(e, !1))
            return;
        let t = e.ownerDocument;
        if (!e.dispatchEvent(new c("beforetoggle",{
            cancelable: !0,
            oldState: "closed",
            newState: "open"
        })) || !d(e, !1))
            return;
        let o = !1;
        if (e.popover === "auto") {
            let i = e.getAttribute("popover")
              , l = _(e) || t;
            if (T(l, !1, !0),
            i !== e.getAttribute("popover") || !d(e, !1))
                return
        }
        y(t) || (o = !0),
        H.delete(e);
        let r = t.activeElement;
        e.classList.add(":popover-open"),
        h.set(e, "showing"),
        M.has(t) || M.set(t, new Set),
        M.get(t).add(e),
        Y(e),
        e.popover === "auto" && (p.has(t) || p.set(t, new Set),
        p.get(t).add(e),
        q(b.get(e), !0)),
        o && r && e.popover === "auto" && H.set(e, r),
        P(e, "closed", "open")
    }
    function m(e, t=!1, o=!1) {
        if (!d(e, !0))
            return;
        let r = e.ownerDocument;
        if (e.popover === "auto" && (T(e, t, o),
        !d(e, !0)) || (q(b.get(e), !1),
        b.delete(e),
        o && (e.dispatchEvent(new c("beforetoggle",{
            oldState: "open",
            newState: "closed"
        })),
        !d(e, !0))))
            return;
        M.get(r)?.delete(e),
        p.get(r)?.delete(e),
        e.classList.remove(":popover-open"),
        h.set(e, "hidden"),
        o && P(e, "open", "closed");
        let i = H.get(e);
        i && (H.delete(e),
        t && i.focus())
    }
    function O(e, t=!1, o=!1) {
        let r = y(e);
        for (; r; )
            m(r, t, o),
            r = y(e)
    }
    function T(e, t, o) {
        let r = e.ownerDocument || e;
        if (e instanceof Document)
            return O(r, t, o);
        let i = null
          , l = !1;
        for (let a of p.get(r) || [])
            if (a === e)
                l = !0;
            else if (l) {
                i = a;
                break
            }
        if (!l)
            return O(r, t, o);
        for (; i && L(i) === "showing" && p.get(r)?.size; )
            m(i, t, o)
    }
    var A = new WeakMap;
    function x(e) {
        if (!e.isTrusted)
            return;
        let t = e.composedPath()[0];
        if (!t)
            return;
        let o = t.ownerDocument;
        if (!y(o))
            return;
        let i = G(t);
        if (i && e.type === "pointerdown")
            A.set(o, i);
        else if (e.type === "pointerup") {
            let l = A.get(o) === i;
            A.delete(o),
            l && T(i || o, !1, !0)
        }
    }
    var k = new WeakMap;
    function q(e, t=!1) {
        if (!e)
            return;
        k.has(e) || k.set(e, e.getAttribute("aria-expanded"));
        let o = e.popoverTargetElement;
        if (o instanceof HTMLElement && o.popover === "auto")
            e.setAttribute("aria-expanded", String(t));
        else {
            let r = k.get(e);
            r ? e.setAttribute("aria-expanded", r) : e.removeAttribute("aria-expanded")
        }
    }
    var C = globalThis.ShadowRoot || function() {}
    ;
    function z() {
        return typeof HTMLElement < "u" && typeof HTMLElement.prototype == "object" && "popover"in HTMLElement.prototype
    }
    function f(e, t, o) {
        let r = e[t];
        Object.defineProperty(e, t, {
            value(i) {
                return r.call(this, o(i))
            }
        })
    }
    var Z = /(^|[^\\]):popover-open\b/g
      , j = typeof window.CSSLayerBlockRule == "function"
      , K = `
${j ? "@layer popover-polyfill {" : ""}
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }
${j ? "}" : ""}
`
      , E = null;
    function I(e) {
        if (E === null)
            try {
                E = new CSSStyleSheet,
                E.replaceSync(K)
            } catch {
                E = !1
            }
        if (E === !1) {
            let t = document.createElement("style");
            t.textContent = K,
            e instanceof Document ? e.head.prepend(t) : e.prepend(t)
        } else
            e.adoptedStyleSheets = [E, ...e.adoptedStyleSheets]
    }
    function V() {
        window.ToggleEvent = window.ToggleEvent || c;
        function e(n) {
            return n?.includes(":popover-open") && (n = n.replace(Z, "$1.\\:popover-open")),
            n
        }
        f(Document.prototype, "querySelector", e),
        f(Document.prototype, "querySelectorAll", e),
        f(Element.prototype, "querySelector", e),
        f(Element.prototype, "querySelectorAll", e),
        f(Element.prototype, "matches", e),
        f(Element.prototype, "closest", e),
        f(DocumentFragment.prototype, "querySelectorAll", e),
        f(DocumentFragment.prototype, "querySelectorAll", e),
        Object.defineProperties(HTMLElement.prototype, {
            popover: {
                enumerable: !0,
                configurable: !0,
                get() {
                    if (!this.hasAttribute("popover"))
                        return null;
                    let n = (this.getAttribute("popover") || "").toLowerCase();
                    return n === "" || n == "auto" ? "auto" : "manual"
                },
                set(n) {
                    this.setAttribute("popover", n)
                }
            },
            showPopover: {
                enumerable: !0,
                configurable: !0,
                value() {
                    S(this)
                }
            },
            hidePopover: {
                enumerable: !0,
                configurable: !0,
                value() {
                    m(this, !0, !0)
                }
            },
            togglePopover: {
                enumerable: !0,
                configurable: !0,
                value(n) {
                    h.get(this) === "showing" && n === void 0 || n === !1 ? m(this, !0, !0) : (n === void 0 || n === !0) && S(this)
                }
            }
        });
        let t = Element.prototype.attachShadow;
        t && Object.defineProperties(Element.prototype, {
            attachShadow: {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value(n) {
                    let s = t.call(this, n);
                    return I(s),
                    s
                }
            }
        });
        let o = HTMLElement.prototype.attachInternals;
        o && Object.defineProperties(HTMLElement.prototype, {
            attachInternals: {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value() {
                    let n = o.call(this);
                    return n.shadowRoot && I(n.shadowRoot),
                    n
                }
            }
        });
        let r = new WeakMap;
        function i(n) {
            Object.defineProperties(n.prototype, {
                popoverTargetElement: {
                    enumerable: !0,
                    configurable: !0,
                    set(s) {
                        if (s === null)
                            this.removeAttribute("popovertarget"),
                            r.delete(this);
                        else if (s instanceof Element)
                            this.setAttribute("popovertarget", ""),
                            r.set(this, s);
                        else
                            throw new TypeError("popoverTargetElement must be an element or null")
                    },
                    get() {
                        if (this.localName !== "button" && this.localName !== "input" || this.localName === "input" && this.type !== "reset" && this.type !== "image" && this.type !== "button" || this.disabled || this.form && this.type === "submit")
                            return null;
                        let s = r.get(this);
                        if (s && s.isConnected)
                            return s;
                        if (s && !s.isConnected)
                            return r.delete(this),
                            null;
                        let u = v(this)
                          , w = this.getAttribute("popovertarget");
                        return (u instanceof Document || u instanceof C) && w && u.getElementById(w) || null
                    }
                },
                popoverTargetAction: {
                    enumerable: !0,
                    configurable: !0,
                    get() {
                        let s = (this.getAttribute("popovertargetaction") || "").toLowerCase();
                        return s === "show" || s === "hide" ? s : "toggle"
                    },
                    set(s) {
                        this.setAttribute("popovertargetaction", s)
                    }
                }
            })
        }
        i(HTMLButtonElement),
        i(HTMLInputElement);
        let l = n => {
            let s = n.composedPath()
              , u = s[0];
            if (!(u instanceof Element) || u?.shadowRoot)
                return;
            let w = v(u);
            if (!(w instanceof C || w instanceof Document))
                return;
            let R = s.find($ => $.matches?.("[popovertargetaction],[popovertarget]"));
            if (R) {
                B(R),
                n.preventDefault();
                return
            }
        }
          , a = n => {
            let s = n.key
              , u = n.target;
            !n.defaultPrevented && u && (s === "Escape" || s === "Esc") && T(u.ownerDocument, !0, !0)
        }
        ;
        (n => {
            n.addEventListener("click", l),
            n.addEventListener("keydown", a),
            n.addEventListener("pointerdown", x),
            n.addEventListener("pointerup", x)
        }
        )(document),
        I(document)
    }
    z() || V();
}
)();
//# sourceMappingURL=popover.iife.min.js.map
