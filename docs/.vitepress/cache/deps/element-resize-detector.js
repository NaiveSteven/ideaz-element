import {
  __commonJS
} from "./chunk-5WWUZCGV.js";

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/collection-utils.js
var require_collection_utils = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/collection-utils.js"(exports, module) {
    "use strict";
    var utils = module.exports = {};
    utils.forEach = function(collection, callback) {
      for (var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if (result) {
          return result;
        }
      }
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/element-utils.js
var require_element_utils = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/element-utils.js"(exports, module) {
    "use strict";
    module.exports = function(options) {
      var getState = options.stateHandler.getState;
      function isDetectable(element) {
        var state = getState(element);
        return state && !!state.isDetectable;
      }
      function markAsDetectable(element) {
        getState(element).isDetectable = true;
      }
      function isBusy(element) {
        return !!getState(element).busy;
      }
      function markBusy(element, busy) {
        getState(element).busy = !!busy;
      }
      return {
        isDetectable,
        markAsDetectable,
        isBusy,
        markBusy
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/listener-handler.js
var require_listener_handler = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/listener-handler.js"(exports, module) {
    "use strict";
    module.exports = function(idHandler) {
      var eventListeners = {};
      function getListeners(element) {
        var id = idHandler.get(element);
        if (id === void 0) {
          return [];
        }
        return eventListeners[id] || [];
      }
      function addListener(element, listener) {
        var id = idHandler.get(element);
        if (!eventListeners[id]) {
          eventListeners[id] = [];
        }
        eventListeners[id].push(listener);
      }
      function removeListener(element, listener) {
        var listeners = getListeners(element);
        for (var i = 0, len = listeners.length; i < len; ++i) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
      function removeAllListeners(element) {
        var listeners = getListeners(element);
        if (!listeners) {
          return;
        }
        listeners.length = 0;
      }
      return {
        get: getListeners,
        add: addListener,
        removeListener,
        removeAllListeners
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/id-generator.js
var require_id_generator = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/id-generator.js"(exports, module) {
    "use strict";
    module.exports = function() {
      var idCount = 1;
      function generate() {
        return idCount++;
      }
      return {
        generate
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/id-handler.js
var require_id_handler = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/id-handler.js"(exports, module) {
    "use strict";
    module.exports = function(options) {
      var idGenerator = options.idGenerator;
      var getState = options.stateHandler.getState;
      function getId(element) {
        var state = getState(element);
        if (state && state.id !== void 0) {
          return state.id;
        }
        return null;
      }
      function setId(element) {
        var state = getState(element);
        if (!state) {
          throw new Error("setId required the element to have a resize detection state.");
        }
        var id = idGenerator.generate();
        state.id = id;
        return id;
      }
      return {
        get: getId,
        set: setId
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/reporter.js
var require_reporter = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/reporter.js"(exports, module) {
    "use strict";
    module.exports = function(quiet) {
      function noop() {
      }
      var reporter = {
        log: noop,
        warn: noop,
        error: noop
      };
      if (!quiet && window.console) {
        var attachFunction = function(reporter2, name) {
          reporter2[name] = function reporterProxy() {
            var f = console[name];
            if (f.apply) {
              f.apply(console, arguments);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                f(arguments[i]);
              }
            }
          };
        };
        attachFunction(reporter, "log");
        attachFunction(reporter, "warn");
        attachFunction(reporter, "error");
      }
      return reporter;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/browser-detector.js
var require_browser_detector = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/browser-detector.js"(exports, module) {
    "use strict";
    var detector = module.exports = {};
    detector.isIE = function(version) {
      function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
      }
      if (!isAnyIeVersion()) {
        return false;
      }
      if (!version) {
        return true;
      }
      var ieVersion = function() {
        var undef, v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i");
        do {
          div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
        } while (all[0]);
        return v > 4 ? v : undef;
      }();
      return version === ieVersion;
    };
    detector.isLegacyOpera = function() {
      return !!window.opera;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+batch-processor@1.0.0/node_modules/batch-processor/src/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+batch-processor@1.0.0/node_modules/batch-processor/src/utils.js"(exports, module) {
    "use strict";
    var utils = module.exports = {};
    utils.getOption = getOption;
    function getOption(options, name, defaultValue) {
      var value = options[name];
      if ((value === void 0 || value === null) && defaultValue !== void 0) {
        return defaultValue;
      }
      return value;
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+batch-processor@1.0.0/node_modules/batch-processor/src/batch-processor.js
var require_batch_processor = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+batch-processor@1.0.0/node_modules/batch-processor/src/batch-processor.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function batchProcessorMaker(options) {
      options = options || {};
      var reporter = options.reporter;
      var asyncProcess = utils.getOption(options, "async", true);
      var autoProcess = utils.getOption(options, "auto", true);
      if (autoProcess && !asyncProcess) {
        reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
        asyncProcess = true;
      }
      var batch = Batch();
      var asyncFrameHandler;
      var isProcessing = false;
      function addFunction(level, fn) {
        if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
          processBatchAsync();
        }
        batch.add(level, fn);
      }
      function processBatch() {
        isProcessing = true;
        while (batch.size()) {
          var processingBatch = batch;
          batch = Batch();
          processingBatch.process();
        }
        isProcessing = false;
      }
      function forceProcessBatch(localAsyncProcess) {
        if (isProcessing) {
          return;
        }
        if (localAsyncProcess === void 0) {
          localAsyncProcess = asyncProcess;
        }
        if (asyncFrameHandler) {
          cancelFrame(asyncFrameHandler);
          asyncFrameHandler = null;
        }
        if (localAsyncProcess) {
          processBatchAsync();
        } else {
          processBatch();
        }
      }
      function processBatchAsync() {
        asyncFrameHandler = requestFrame(processBatch);
      }
      function clearBatch() {
        batch = {};
        batchSize = 0;
        topLevel = 0;
        bottomLevel = 0;
      }
      function cancelFrame(listener) {
        var cancel = clearTimeout;
        return cancel(listener);
      }
      function requestFrame(callback) {
        var raf = function(fn) {
          return setTimeout(fn, 0);
        };
        return raf(callback);
      }
      return {
        add: addFunction,
        force: forceProcessBatch
      };
    };
    function Batch() {
      var batch = {};
      var size = 0;
      var topLevel2 = 0;
      var bottomLevel2 = 0;
      function add(level, fn) {
        if (!fn) {
          fn = level;
          level = 0;
        }
        if (level > topLevel2) {
          topLevel2 = level;
        } else if (level < bottomLevel2) {
          bottomLevel2 = level;
        }
        if (!batch[level]) {
          batch[level] = [];
        }
        batch[level].push(fn);
        size++;
      }
      function process() {
        for (var level = bottomLevel2; level <= topLevel2; level++) {
          var fns = batch[level];
          for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            fn();
          }
        }
      }
      function getSize() {
        return size;
      }
      return {
        add,
        process,
        size: getSize
      };
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/state-handler.js
var require_state_handler = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/state-handler.js"(exports, module) {
    "use strict";
    var prop = "_erd";
    function initState(element) {
      element[prop] = {};
      return getState(element);
    }
    function getState(element) {
      return element[prop];
    }
    function cleanState(element) {
      delete element[prop];
    }
    module.exports = {
      initState,
      getState,
      cleanState
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/detection-strategy/object.js
var require_object = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/detection-strategy/object.js"(exports, module) {
    "use strict";
    var browserDetector = require_browser_detector();
    module.exports = function(options) {
      options = options || {};
      var reporter = options.reporter;
      var batchProcessor = options.batchProcessor;
      var getState = options.stateHandler.getState;
      if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
      }
      function addListener(element, listener) {
        function listenerProxy() {
          listener(element);
        }
        if (browserDetector.isIE(8)) {
          getState(element).object = {
            proxy: listenerProxy
          };
          element.attachEvent("onresize", listenerProxy);
        } else {
          var object = getObject(element);
          if (!object) {
            throw new Error("Element is not detectable by this strategy.");
          }
          object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
        }
      }
      function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
      }
      function makeDetectable(options2, element, callback) {
        if (!callback) {
          callback = element;
          element = options2;
          options2 = null;
        }
        options2 = options2 || {};
        var debug = options2.debug;
        function injectObject(element2, callback2) {
          var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);
          var positionCheckPerformed = false;
          var style = window.getComputedStyle(element2);
          var width = element2.offsetWidth;
          var height = element2.offsetHeight;
          getState(element2).startSize = {
            width,
            height
          };
          function mutateDom() {
            function alterPositionStyles() {
              if (style.position === "static") {
                element2.style.setProperty("position", "relative", options2.important ? "important" : "");
                var removeRelativeStyles = function(reporter2, element3, style2, property) {
                  function getNumericalValue(value2) {
                    return value2.replace(/[^-\d\.]/g, "");
                  }
                  var value = style2[property];
                  if (value !== "auto" && getNumericalValue(value) !== "0") {
                    reporter2.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element3);
                    element3.style.setProperty(property, "0", options2.important ? "important" : "");
                  }
                };
                removeRelativeStyles(reporter, element2, style, "top");
                removeRelativeStyles(reporter, element2, style, "right");
                removeRelativeStyles(reporter, element2, style, "bottom");
                removeRelativeStyles(reporter, element2, style, "left");
              }
            }
            function onObjectLoad() {
              if (!positionCheckPerformed) {
                alterPositionStyles();
              }
              function getDocument(element3, callback3) {
                if (!element3.contentDocument) {
                  var state = getState(element3);
                  if (state.checkForObjectDocumentTimeoutId) {
                    window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                  }
                  state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                    state.checkForObjectDocumentTimeoutId = 0;
                    getDocument(element3, callback3);
                  }, 100);
                  return;
                }
                callback3(element3.contentDocument);
              }
              var objectElement = this;
              getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                callback2(element2);
              });
            }
            if (style.position !== "") {
              alterPositionStyles(style);
              positionCheckPerformed = true;
            }
            var object = document.createElement("object");
            object.style.cssText = OBJECT_STYLE;
            object.tabIndex = -1;
            object.type = "text/html";
            object.setAttribute("aria-hidden", "true");
            object.onload = onObjectLoad;
            if (!browserDetector.isIE()) {
              object.data = "about:blank";
            }
            if (!getState(element2)) {
              return;
            }
            element2.appendChild(object);
            getState(element2).object = object;
            if (browserDetector.isIE()) {
              object.data = "about:blank";
            }
          }
          if (batchProcessor) {
            batchProcessor.add(mutateDom);
          } else {
            mutateDom();
          }
        }
        if (browserDetector.isIE(8)) {
          callback(element);
        } else {
          injectObject(element, callback);
        }
      }
      function getObject(element) {
        return getState(element).object;
      }
      function uninstall(element) {
        if (!getState(element)) {
          return;
        }
        var object = getObject(element);
        if (!object) {
          return;
        }
        if (browserDetector.isIE(8)) {
          element.detachEvent("onresize", object.proxy);
        } else {
          element.removeChild(object);
        }
        if (getState(element).checkForObjectDocumentTimeoutId) {
          window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
        }
        delete getState(element).object;
      }
      return {
        makeDetectable,
        addListener,
        uninstall
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/detection-strategy/scroll.js
var require_scroll = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/detection-strategy/scroll.js"(exports, module) {
    "use strict";
    var forEach = require_collection_utils().forEach;
    module.exports = function(options) {
      options = options || {};
      var reporter = options.reporter;
      var batchProcessor = options.batchProcessor;
      var getState = options.stateHandler.getState;
      var hasState = options.stateHandler.hasState;
      var idHandler = options.idHandler;
      if (!batchProcessor) {
        throw new Error("Missing required dependency: batchProcessor");
      }
      if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
      }
      var scrollbarSizes = getScrollbarSizes();
      var styleId = "erd_scroll_detection_scrollbar_style";
      var detectionContainerClass = "erd_scroll_detection_container";
      function initDocument(targetDocument) {
        injectScrollStyle(targetDocument, styleId, detectionContainerClass);
      }
      initDocument(window.document);
      function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
      }
      function getScrollbarSizes() {
        var width = 500;
        var height = 500;
        var child = document.createElement("div");
        child.style.cssText = buildCssTextString(["position: absolute", "width: " + width * 2 + "px", "height: " + height * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
        var container = document.createElement("div");
        container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width * 3 + "px", "left: " + -height * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
        container.appendChild(child);
        document.body.insertBefore(container, document.body.firstChild);
        var widthSize = width - container.clientWidth;
        var heightSize = height - container.clientHeight;
        document.body.removeChild(container);
        return {
          width: widthSize,
          height: heightSize
        };
      }
      function injectScrollStyle(targetDocument, styleId2, containerClass) {
        function injectStyle(style2, method) {
          method = method || function(element) {
            targetDocument.head.appendChild(element);
          };
          var styleElement = targetDocument.createElement("style");
          styleElement.innerHTML = style2;
          styleElement.id = styleId2;
          method(styleElement);
          return styleElement;
        }
        if (!targetDocument.getElementById(styleId2)) {
          var containerAnimationClass = containerClass + "_animation";
          var containerAnimationActiveClass = containerClass + "_animation_active";
          var style = "/* Created by the element-resize-detector library. */\n";
          style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
          style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
          style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
          style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
          injectStyle(style);
        }
      }
      function addAnimationClass(element) {
        element.className += " " + detectionContainerClass + "_animation_active";
      }
      function addEvent(el, name, cb) {
        if (el.addEventListener) {
          el.addEventListener(name, cb);
        } else if (el.attachEvent) {
          el.attachEvent("on" + name, cb);
        } else {
          return reporter.error("[scroll] Don't know how to add event listeners.");
        }
      }
      function removeEvent(el, name, cb) {
        if (el.removeEventListener) {
          el.removeEventListener(name, cb);
        } else if (el.detachEvent) {
          el.detachEvent("on" + name, cb);
        } else {
          return reporter.error("[scroll] Don't know how to remove event listeners.");
        }
      }
      function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
      }
      function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
      }
      function addListener(element, listener) {
        var listeners = getState(element).listeners;
        if (!listeners.push) {
          throw new Error("Cannot add listener to an element that is not detectable.");
        }
        getState(element).listeners.push(listener);
      }
      function makeDetectable(options2, element, callback) {
        if (!callback) {
          callback = element;
          element = options2;
          options2 = null;
        }
        options2 = options2 || {};
        function debug() {
          if (options2.debug) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(idHandler.get(element), "Scroll: ");
            if (reporter.log.apply) {
              reporter.log.apply(null, args);
            } else {
              for (var i = 0; i < args.length; i++) {
                reporter.log(args[i]);
              }
            }
          }
        }
        function isDetached(element2) {
          function isInDocument(element3) {
            var isInShadowRoot = element3.getRootNode && element3.getRootNode().contains(element3);
            return element3 === element3.ownerDocument.body || element3.ownerDocument.body.contains(element3) || isInShadowRoot;
          }
          if (!isInDocument(element2)) {
            return true;
          }
          if (window.getComputedStyle(element2) === null) {
            return true;
          }
          return false;
        }
        function isUnrendered(element2) {
          var container = getState(element2).container.childNodes[0];
          var style = window.getComputedStyle(container);
          return !style.width || style.width.indexOf("px") === -1;
        }
        function getStyle() {
          var elementStyle = window.getComputedStyle(element);
          var style = {};
          style.position = elementStyle.position;
          style.width = element.offsetWidth;
          style.height = element.offsetHeight;
          style.top = elementStyle.top;
          style.right = elementStyle.right;
          style.bottom = elementStyle.bottom;
          style.left = elementStyle.left;
          style.widthCSS = elementStyle.width;
          style.heightCSS = elementStyle.height;
          return style;
        }
        function storeStartSize() {
          var style = getStyle();
          getState(element).startSize = {
            width: style.width,
            height: style.height
          };
          debug("Element start size", getState(element).startSize);
        }
        function initListeners() {
          getState(element).listeners = [];
        }
        function storeStyle() {
          debug("storeStyle invoked.");
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }
          var style = getStyle();
          getState(element).style = style;
        }
        function storeCurrentSize(element2, width, height) {
          getState(element2).lastWidth = width;
          getState(element2).lastHeight = height;
        }
        function getExpandChildElement(element2) {
          return getExpandElement(element2).childNodes[0];
        }
        function getWidthOffset() {
          return 2 * scrollbarSizes.width + 1;
        }
        function getHeightOffset() {
          return 2 * scrollbarSizes.height + 1;
        }
        function getExpandWidth(width) {
          return width + 10 + getWidthOffset();
        }
        function getExpandHeight(height) {
          return height + 10 + getHeightOffset();
        }
        function getShrinkWidth(width) {
          return width * 2 + getWidthOffset();
        }
        function getShrinkHeight(height) {
          return height * 2 + getHeightOffset();
        }
        function positionScrollbars(element2, width, height) {
          var expand = getExpandElement(element2);
          var shrink = getShrinkElement(element2);
          var expandWidth = getExpandWidth(width);
          var expandHeight = getExpandHeight(height);
          var shrinkWidth = getShrinkWidth(width);
          var shrinkHeight = getShrinkHeight(height);
          expand.scrollLeft = expandWidth;
          expand.scrollTop = expandHeight;
          shrink.scrollLeft = shrinkWidth;
          shrink.scrollTop = shrinkHeight;
        }
        function injectContainerElement() {
          var container = getState(element).container;
          if (!container) {
            container = document.createElement("div");
            container.className = detectionContainerClass;
            container.style.cssText = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
            getState(element).container = container;
            addAnimationClass(container);
            element.appendChild(container);
            var onAnimationStart = function() {
              getState(element).onRendered && getState(element).onRendered();
            };
            addEvent(container, "animationstart", onAnimationStart);
            getState(element).onAnimationStart = onAnimationStart;
          }
          return container;
        }
        function injectScrollElements() {
          function alterPositionStyles() {
            var style = getState(element).style;
            if (style.position === "static") {
              element.style.setProperty("position", "relative", options2.important ? "important" : "");
              var removeRelativeStyles = function(reporter2, element2, style2, property) {
                function getNumericalValue(value2) {
                  return value2.replace(/[^-\d\.]/g, "");
                }
                var value = style2[property];
                if (value !== "auto" && getNumericalValue(value) !== "0") {
                  reporter2.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element2);
                  element2.style[property] = 0;
                }
              };
              removeRelativeStyles(reporter, element, style, "top");
              removeRelativeStyles(reporter, element, style, "right");
              removeRelativeStyles(reporter, element, style, "bottom");
              removeRelativeStyles(reporter, element, style, "left");
            }
          }
          function getLeftTopBottomRightCssText(left, top, bottom, right) {
            left = !left ? "0" : left + "px";
            top = !top ? "0" : top + "px";
            bottom = !bottom ? "0" : bottom + "px";
            right = !right ? "0" : right + "px";
            return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
          }
          debug("Injecting elements");
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }
          alterPositionStyles();
          var rootContainer = getState(element).container;
          if (!rootContainer) {
            rootContainer = injectContainerElement();
          }
          var scrollbarWidth = scrollbarSizes.width;
          var scrollbarHeight = scrollbarSizes.height;
          var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
          var containerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
          var expandStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
          var shrinkStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
          var expandChildStyle = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
          var shrinkChildStyle = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);
          var containerContainer = document.createElement("div");
          var container = document.createElement("div");
          var expand = document.createElement("div");
          var expandChild = document.createElement("div");
          var shrink = document.createElement("div");
          var shrinkChild = document.createElement("div");
          containerContainer.dir = "ltr";
          containerContainer.style.cssText = containerContainerStyle;
          containerContainer.className = detectionContainerClass;
          container.className = detectionContainerClass;
          container.style.cssText = containerStyle;
          expand.style.cssText = expandStyle;
          expandChild.style.cssText = expandChildStyle;
          shrink.style.cssText = shrinkStyle;
          shrinkChild.style.cssText = shrinkChildStyle;
          expand.appendChild(expandChild);
          shrink.appendChild(shrinkChild);
          container.appendChild(expand);
          container.appendChild(shrink);
          containerContainer.appendChild(container);
          rootContainer.appendChild(containerContainer);
          function onExpandScroll() {
            var state = getState(element);
            if (state && state.onExpand) {
              state.onExpand();
            } else {
              debug("Aborting expand scroll handler: element has been uninstalled");
            }
          }
          function onShrinkScroll() {
            var state = getState(element);
            if (state && state.onShrink) {
              state.onShrink();
            } else {
              debug("Aborting shrink scroll handler: element has been uninstalled");
            }
          }
          addEvent(expand, "scroll", onExpandScroll);
          addEvent(shrink, "scroll", onShrinkScroll);
          getState(element).onExpandScroll = onExpandScroll;
          getState(element).onShrinkScroll = onShrinkScroll;
        }
        function registerListenersAndPositionElements() {
          function updateChildSizes(element2, width, height) {
            var expandChild = getExpandChildElement(element2);
            var expandWidth = getExpandWidth(width);
            var expandHeight = getExpandHeight(height);
            expandChild.style.setProperty("width", expandWidth + "px", options2.important ? "important" : "");
            expandChild.style.setProperty("height", expandHeight + "px", options2.important ? "important" : "");
          }
          function updateDetectorElements(done) {
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;
            debug("Storing current size", width, height);
            storeCurrentSize(element, width, height);
            batchProcessor.add(0, function performUpdateChildSizes() {
              if (!sizeChanged) {
                return;
              }
              if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
              }
              if (!areElementsInjected()) {
                debug("Aborting because element container has not been initialized");
                return;
              }
              if (options2.debug) {
                var w = element.offsetWidth;
                var h = element.offsetHeight;
                if (w !== width || h !== height) {
                  reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                }
              }
              updateChildSizes(element, width, height);
            });
            batchProcessor.add(1, function updateScrollbars() {
              if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
              }
              if (!areElementsInjected()) {
                debug("Aborting because element container has not been initialized");
                return;
              }
              positionScrollbars(element, width, height);
            });
            if (sizeChanged && done) {
              batchProcessor.add(2, function() {
                if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
                }
                if (!areElementsInjected()) {
                  debug("Aborting because element container has not been initialized");
                  return;
                }
                done();
              });
            }
          }
          function areElementsInjected() {
            return !!getState(element).container;
          }
          function notifyListenersIfNeeded() {
            function isFirstNotify() {
              return getState(element).lastNotifiedWidth === void 0;
            }
            debug("notifyListenersIfNeeded invoked");
            var state = getState(element);
            if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
              return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
            }
            if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
              return debug("Not notifying: Size already notified");
            }
            debug("Current size not notified, notifying...");
            state.lastNotifiedWidth = state.lastWidth;
            state.lastNotifiedHeight = state.lastHeight;
            forEach(getState(element).listeners, function(listener) {
              listener(element);
            });
          }
          function handleRender() {
            debug("startanimation triggered.");
            if (isUnrendered(element)) {
              debug("Ignoring since element is still unrendered...");
              return;
            }
            debug("Element rendered.");
            var expand = getExpandElement(element);
            var shrink = getShrinkElement(element);
            if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
              debug("Scrollbars out of sync. Updating detector elements...");
              updateDetectorElements(notifyListenersIfNeeded);
            }
          }
          function handleScroll() {
            debug("Scroll detected.");
            if (isUnrendered(element)) {
              debug("Scroll event fired while unrendered. Ignoring...");
              return;
            }
            updateDetectorElements(notifyListenersIfNeeded);
          }
          debug("registerListenersAndPositionElements invoked.");
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }
          getState(element).onRendered = handleRender;
          getState(element).onExpand = handleScroll;
          getState(element).onShrink = handleScroll;
          var style = getState(element).style;
          updateChildSizes(element, style.width, style.height);
        }
        function finalizeDomMutation() {
          debug("finalizeDomMutation invoked.");
          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }
          var style = getState(element).style;
          storeCurrentSize(element, style.width, style.height);
          positionScrollbars(element, style.width, style.height);
        }
        function ready() {
          callback(element);
        }
        function install() {
          debug("Installing...");
          initListeners();
          storeStartSize();
          batchProcessor.add(0, storeStyle);
          batchProcessor.add(1, injectScrollElements);
          batchProcessor.add(2, registerListenersAndPositionElements);
          batchProcessor.add(3, finalizeDomMutation);
          batchProcessor.add(4, ready);
        }
        debug("Making detectable...");
        if (isDetached(element)) {
          debug("Element is detached");
          injectContainerElement();
          debug("Waiting until element is attached...");
          getState(element).onRendered = function() {
            debug("Element is now attached");
            install();
          };
        } else {
          install();
        }
      }
      function uninstall(element) {
        var state = getState(element);
        if (!state) {
          return;
        }
        state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
        state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
        state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);
        state.container && element.removeChild(state.container);
      }
      return {
        makeDetectable,
        addListener,
        uninstall,
        initDocument
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/element-resize-detector.js
var require_element_resize_detector = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+element-resize-detector@1.2.4/node_modules/element-resize-detector/src/element-resize-detector.js"(exports, module) {
    var forEach = require_collection_utils().forEach;
    var elementUtilsMaker = require_element_utils();
    var listenerHandlerMaker = require_listener_handler();
    var idGeneratorMaker = require_id_generator();
    var idHandlerMaker = require_id_handler();
    var reporterMaker = require_reporter();
    var browserDetector = require_browser_detector();
    var batchProcessorMaker = require_batch_processor();
    var stateHandler = require_state_handler();
    var objectStrategyMaker = require_object();
    var scrollStrategyMaker = require_scroll();
    function isCollection(obj) {
      return Array.isArray(obj) || obj.length !== void 0;
    }
    function toArray(collection) {
      if (!Array.isArray(collection)) {
        var array = [];
        forEach(collection, function(obj) {
          array.push(obj);
        });
        return array;
      } else {
        return collection;
      }
    }
    function isElement(obj) {
      return obj && obj.nodeType === 1;
    }
    module.exports = function(options) {
      options = options || {};
      var idHandler;
      if (options.idHandler) {
        idHandler = {
          get: function(element) {
            return options.idHandler.get(element, true);
          },
          set: options.idHandler.set
        };
      } else {
        var idGenerator = idGeneratorMaker();
        var defaultIdHandler = idHandlerMaker({
          idGenerator,
          stateHandler
        });
        idHandler = defaultIdHandler;
      }
      var reporter = options.reporter;
      if (!reporter) {
        var quiet = reporter === false;
        reporter = reporterMaker(quiet);
      }
      var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({ reporter }));
      var globalOptions = {};
      globalOptions.callOnAdd = !!getOption(options, "callOnAdd", true);
      globalOptions.debug = !!getOption(options, "debug", false);
      var eventListenerHandler = listenerHandlerMaker(idHandler);
      var elementUtils = elementUtilsMaker({
        stateHandler
      });
      var detectionStrategy;
      var desiredStrategy = getOption(options, "strategy", "object");
      var importantCssRules = getOption(options, "important", false);
      var strategyOptions = {
        reporter,
        batchProcessor,
        stateHandler,
        idHandler,
        important: importantCssRules
      };
      if (desiredStrategy === "scroll") {
        if (browserDetector.isLegacyOpera()) {
          reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
          desiredStrategy = "object";
        } else if (browserDetector.isIE(9)) {
          reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
          desiredStrategy = "object";
        }
      }
      if (desiredStrategy === "scroll") {
        detectionStrategy = scrollStrategyMaker(strategyOptions);
      } else if (desiredStrategy === "object") {
        detectionStrategy = objectStrategyMaker(strategyOptions);
      } else {
        throw new Error("Invalid strategy name: " + desiredStrategy);
      }
      var onReadyCallbacks = {};
      function listenTo(options2, elements, listener) {
        function onResizeCallback(element) {
          var listeners = eventListenerHandler.get(element);
          forEach(listeners, function callListenerProxy(listener2) {
            listener2(element);
          });
        }
        function addListener(callOnAdd2, element, listener2) {
          eventListenerHandler.add(element, listener2);
          if (callOnAdd2) {
            listener2(element);
          }
        }
        if (!listener) {
          listener = elements;
          elements = options2;
          options2 = {};
        }
        if (!elements) {
          throw new Error("At least one element required.");
        }
        if (!listener) {
          throw new Error("Listener required.");
        }
        if (isElement(elements)) {
          elements = [elements];
        } else if (isCollection(elements)) {
          elements = toArray(elements);
        } else {
          return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }
        var elementsReady = 0;
        var callOnAdd = getOption(options2, "callOnAdd", globalOptions.callOnAdd);
        var onReadyCallback = getOption(options2, "onReady", function noop() {
        });
        var debug = getOption(options2, "debug", globalOptions.debug);
        forEach(elements, function attachListenerToElement(element) {
          if (!stateHandler.getState(element)) {
            stateHandler.initState(element);
            idHandler.set(element);
          }
          var id = idHandler.get(element);
          debug && reporter.log("Attaching listener to element", id, element);
          if (!elementUtils.isDetectable(element)) {
            debug && reporter.log(id, "Not detectable.");
            if (elementUtils.isBusy(element)) {
              debug && reporter.log(id, "System busy making it detectable");
              addListener(callOnAdd, element, listener);
              onReadyCallbacks[id] = onReadyCallbacks[id] || [];
              onReadyCallbacks[id].push(function onReady() {
                elementsReady++;
                if (elementsReady === elements.length) {
                  onReadyCallback();
                }
              });
              return;
            }
            debug && reporter.log(id, "Making detectable...");
            elementUtils.markBusy(element, true);
            return detectionStrategy.makeDetectable({ debug, important: importantCssRules }, element, function onElementDetectable(element2) {
              debug && reporter.log(id, "onElementDetectable");
              if (stateHandler.getState(element2)) {
                elementUtils.markAsDetectable(element2);
                elementUtils.markBusy(element2, false);
                detectionStrategy.addListener(element2, onResizeCallback);
                addListener(callOnAdd, element2, listener);
                var state = stateHandler.getState(element2);
                if (state && state.startSize) {
                  var width = element2.offsetWidth;
                  var height = element2.offsetHeight;
                  if (state.startSize.width !== width || state.startSize.height !== height) {
                    onResizeCallback(element2);
                  }
                }
                if (onReadyCallbacks[id]) {
                  forEach(onReadyCallbacks[id], function(callback) {
                    callback();
                  });
                }
              } else {
                debug && reporter.log(id, "Element uninstalled before being detectable.");
              }
              delete onReadyCallbacks[id];
              elementsReady++;
              if (elementsReady === elements.length) {
                onReadyCallback();
              }
            });
          }
          debug && reporter.log(id, "Already detecable, adding listener.");
          addListener(callOnAdd, element, listener);
          elementsReady++;
        });
        if (elementsReady === elements.length) {
          onReadyCallback();
        }
      }
      function uninstall(elements) {
        if (!elements) {
          return reporter.error("At least one element is required.");
        }
        if (isElement(elements)) {
          elements = [elements];
        } else if (isCollection(elements)) {
          elements = toArray(elements);
        } else {
          return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }
        forEach(elements, function(element) {
          eventListenerHandler.removeAllListeners(element);
          detectionStrategy.uninstall(element);
          stateHandler.cleanState(element);
        });
      }
      function initDocument(targetDocument) {
        detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
      }
      return {
        listenTo,
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall,
        initDocument
      };
    };
    function getOption(options, name, defaultValue) {
      var value = options[name];
      if ((value === void 0 || value === null) && defaultValue !== void 0) {
        return defaultValue;
      }
      return value;
    }
  }
});
export default require_element_resize_detector();
//# sourceMappingURL=element-resize-detector.js.map
