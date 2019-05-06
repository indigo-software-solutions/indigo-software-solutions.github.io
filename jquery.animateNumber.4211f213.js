// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"bower_components/jquery-animatenumber/jquery.animateNumber.js":[function(require,module,exports) {
/** @preserve jQuery animateNumber plugin v0.0.14
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */
// ['...'] notation using to avoid names minification by Google Closure Compiler
(function ($) {
  var reverse = function reverse(value) {
    return value.split('').reverse().join('');
  };

  var defaults = {
    numberStep: function numberStep(now, tween) {
      var floored_number = Math.floor(now),
          target = $(tween.elem);
      target.text(floored_number);
    }
  };

  var handle = function handle(tween) {
    var elem = tween.elem;

    if (elem.nodeType && elem.parentNode) {
      var handler = elem._animateNumberSetter;

      if (!handler) {
        handler = defaults.numberStep;
      }

      handler(tween.now, tween);
    }
  };

  if (!$.Tween || !$.Tween.propHooks) {
    $.fx.step.number = handle;
  } else {
    $.Tween.propHooks.number = {
      set: handle
    };
  }

  var extract_number_parts = function extract_number_parts(separated_number, group_length) {
    var numbers = separated_number.split('').reverse(),
        number_parts = [],
        current_number_part,
        current_index,
        q;

    for (var i = 0, l = Math.ceil(separated_number.length / group_length); i < l; i++) {
      current_number_part = '';

      for (q = 0; q < group_length; q++) {
        current_index = i * group_length + q;

        if (current_index === separated_number.length) {
          break;
        }

        current_number_part = current_number_part + numbers[current_index];
      }

      number_parts.push(current_number_part);
    }

    return number_parts;
  };

  var remove_precending_zeros = function remove_precending_zeros(number_parts) {
    var last_index = number_parts.length - 1,
        last = reverse(number_parts[last_index]);
    number_parts[last_index] = reverse(parseInt(last, 10).toString());
    return number_parts;
  };

  $.animateNumber = {
    numberStepFactories: {
      /**
       * Creates numberStep handler, which appends string to floored animated number on each step.
       *
       * @example
       * // will animate to 100 with "1 %", "2 %", "3 %", ...
       * $('#someid').animateNumber({
       *   number: 100,
       *   numberStep: $.animateNumber.numberStepFactories.append(' %')
       * });
       *
       * @params {String} suffix string to append to animated number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      append: function append(suffix) {
        return function (now, tween) {
          var floored_number = Math.floor(now),
              target = $(tween.elem);
          target.prop('number', now).text(floored_number + suffix);
        };
      },

      /**
       * Creates numberStep handler, which format floored numbers by separating them to groups.
       *
       * @example
       * // will animate with 1 ... 217,980 ... 95,217,980 ... 7,095,217,980
       * $('#world-population').animateNumber({
       *    number: 7095217980,
       *    numberStep: $.animateNumber.numberStepFactories.separator(',')
       * });
       * @example
       * // will animate with 1% ... 217,980% ... 95,217,980% ... 7,095,217,980%
       * $('#salesIncrease').animateNumber({
       *   number: 7095217980,
       *   numberStep: $.animateNumber.numberStepFactories.separator(',', 3, '%')
       * });
       *
       * @params {String} [separator=' '] string to separate number groups
       * @params {String} [group_length=3] number group length
       * @params {String} [suffix=''] suffix to append to number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      separator: function separator(_separator, group_length, suffix) {
        _separator = _separator || ' ';
        group_length = group_length || 3;
        suffix = suffix || '';
        return function (now, tween) {
          var negative = now < 0,
              floored_number = Math.floor((negative ? -1 : 1) * now),
              separated_number = floored_number.toString(),
              target = $(tween.elem);

          if (separated_number.length > group_length) {
            var number_parts = extract_number_parts(separated_number, group_length);
            separated_number = remove_precending_zeros(number_parts).join(_separator);
            separated_number = reverse(separated_number);
          }

          target.prop('number', now).text((negative ? '-' : '') + separated_number + suffix);
        };
      }
    }
  };

  $.fn.animateNumber = function () {
    var options = arguments[0],
        settings = $.extend({}, defaults, options),
        target = $(this),
        args = [settings];

    for (var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    } // needs of custom step function usage


    if (options.numberStep) {
      // assigns custom step functions
      var items = this.each(function () {
        this._animateNumberSetter = options.numberStep;
      }); // cleanup of custom step functions after animation

      var generic_complete = settings.complete;

      settings.complete = function () {
        items.each(function () {
          delete this._animateNumberSetter;
        });

        if (generic_complete) {
          generic_complete.apply(this, arguments);
        }
      };
    }

    return target.animate.apply(target, args);
  };
})(jQuery);
},{}],"../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58611" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/jquery-animatenumber/jquery.animateNumber.js"], null)
//# sourceMappingURL=/jquery.animateNumber.4211f213.js.map