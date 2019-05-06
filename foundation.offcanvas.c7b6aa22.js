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
})({"bower_components/foundation/js/foundation/foundation.offcanvas.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name: 'offcanvas',
    version: '5.5.3',
    settings: {
      open_method: 'move',
      close_on_click: false
    },
    init: function init(scope, method, options) {
      this.bindings(method, options);
    },
    events: function events() {
      var self = this,
          S = self.S,
          move_class = '',
          right_postfix = '',
          left_postfix = '',
          top_postfix = '',
          bottom_postfix = '';

      if (this.settings.open_method === 'move') {
        move_class = 'move-';
        right_postfix = 'right';
        left_postfix = 'left';
        top_postfix = 'top';
        bottom_postfix = 'bottom';
      } else if (this.settings.open_method === 'overlap_single') {
        move_class = 'offcanvas-overlap-';
        right_postfix = 'right';
        left_postfix = 'left';
        top_postfix = 'top';
        bottom_postfix = 'bottom';
      } else if (this.settings.open_method === 'overlap') {
        move_class = 'offcanvas-overlap';
      }

      S(this.scope).off('.offcanvas').on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
        self.click_toggle_class(e, move_class + right_postfix);

        if (self.settings.open_method !== 'overlap') {
          S('.left-submenu').removeClass(move_class + right_postfix);
        }

        $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();

        if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
          self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + right_postfix);
        } else if (S(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
          S(this).siblings('.left-submenu').toggleClass(move_class + right_postfix);
        } else if (parent.hasClass('back')) {
          e.preventDefault();
          parent.parent().removeClass(move_class + right_postfix);
        }

        $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
      }) //end of left canvas
      .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
        self.click_toggle_class(e, move_class + left_postfix);

        if (self.settings.open_method !== 'overlap') {
          S('.right-submenu').removeClass(move_class + left_postfix);
        }

        $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();

        if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
          self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + left_postfix);
        } else if (S(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
          S(this).siblings('.right-submenu').toggleClass(move_class + left_postfix);
        } else if (parent.hasClass('back')) {
          e.preventDefault();
          parent.parent().removeClass(move_class + left_postfix);
        }

        $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
      }) //end of right canvas
      .on('click.fndtn.offcanvas', '.top-off-canvas-toggle', function (e) {
        self.click_toggle_class(e, move_class + bottom_postfix);

        if (self.settings.open_method !== 'overlap') {
          S('.top-submenu').removeClass(move_class + bottom_postfix);
        }

        $('.top-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.top-off-canvas-menu a', function (e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();

        if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
          self.hide.call(self, move_class + bottom_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + bottom_postfix);
        } else if (S(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
          S(this).siblings('.top-submenu').toggleClass(move_class + bottom_postfix);
        } else if (parent.hasClass('back')) {
          e.preventDefault();
          parent.parent().removeClass(move_class + bottom_postfix);
        }

        $('.top-off-canvas-toggle').attr('aria-expanded', 'true');
      }) //end of top canvas
      .on('click.fndtn.offcanvas', '.bottom-off-canvas-toggle', function (e) {
        self.click_toggle_class(e, move_class + top_postfix);

        if (self.settings.open_method !== 'overlap') {
          S('.bottom-submenu').removeClass(move_class + top_postfix);
        }

        $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.bottom-off-canvas-menu a', function (e) {
        var settings = self.get_settings(e);
        var parent = S(this).parent();

        if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
          self.hide.call(self, move_class + top_postfix, self.get_wrapper(e));
          parent.parent().removeClass(move_class + top_postfix);
        } else if (S(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
          S(this).siblings('.bottom-submenu').toggleClass(move_class + top_postfix);
        } else if (parent.hasClass('back')) {
          e.preventDefault();
          parent.parent().removeClass(move_class + top_postfix);
        }

        $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
      }) //end of bottom
      .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
        self.click_remove_class(e, move_class + left_postfix);
        S('.right-submenu').removeClass(move_class + left_postfix);

        if (right_postfix) {
          self.click_remove_class(e, move_class + right_postfix);
          S('.left-submenu').removeClass(move_class + left_postfix);
        }

        $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
        self.click_remove_class(e, move_class + left_postfix);
        $('.left-off-canvas-toggle').attr('aria-expanded', 'false');

        if (right_postfix) {
          self.click_remove_class(e, move_class + right_postfix);
          $('.right-off-canvas-toggle').attr('aria-expanded', 'false');
        }
      }).on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
        self.click_remove_class(e, move_class + top_postfix);
        S('.bottom-submenu').removeClass(move_class + top_postfix);

        if (bottom_postfix) {
          self.click_remove_class(e, move_class + bottom_postfix);
          S('.top-submenu').removeClass(move_class + top_postfix);
        }

        $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
      }).on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
        self.click_remove_class(e, move_class + top_postfix);
        $('.top-off-canvas-toggle').attr('aria-expanded', 'false');

        if (bottom_postfix) {
          self.click_remove_class(e, move_class + bottom_postfix);
          $('.bottom-off-canvas-toggle').attr('aria-expanded', 'false');
        }
      });
    },
    toggle: function toggle(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();

      if ($off_canvas.is('.' + class_name)) {
        this.hide(class_name, $off_canvas);
      } else {
        this.show(class_name, $off_canvas);
      }
    },
    show: function show(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('open.fndtn.offcanvas');
      $off_canvas.addClass(class_name);
    },
    hide: function hide(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('close.fndtn.offcanvas');
      $off_canvas.removeClass(class_name);
    },
    click_toggle_class: function click_toggle_class(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(class_name, $off_canvas);
    },
    click_remove_class: function click_remove_class(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(class_name, $off_canvas);
    },
    get_settings: function get_settings(e) {
      var offcanvas = this.S(e.target).closest('[' + this.attr_name() + ']');
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },
    get_wrapper: function get_wrapper(e) {
      var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');

      if ($off_canvas.length === 0) {
        $off_canvas = this.S('.off-canvas-wrap');
      }

      return $off_canvas;
    },
    reflow: function reflow() {}
  };
})(jQuery, window, window.document);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57299" + '/');

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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.offcanvas.js"], null)
//# sourceMappingURL=/foundation.offcanvas.c7b6aa22.js.map