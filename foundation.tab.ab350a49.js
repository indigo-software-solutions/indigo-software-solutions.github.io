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
})({"bower_components/foundation/js/foundation/foundation.tab.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name: 'tab',
    version: '5.5.3',
    settings: {
      active_class: 'active',
      callback: function callback() {},
      deep_linking: false,
      scroll_to_content: true,
      is_hover: false
    },
    default_tab_hashes: [],
    init: function init(scope, method, options) {
      var self = this,
          S = this.S; // Store the default active tabs which will be referenced when the
      // location hash is absent, as in the case of navigating the tabs and
      // returning to the first viewing via the browser Back button.

      S('[' + this.attr_name() + '] > .active > a', this.scope).each(function () {
        self.default_tab_hashes.push(this.hash);
      });
      this.bindings(method, options);
      this.handle_location_hash_change();
    },
    events: function events() {
      var self = this,
          S = this.S;

      var usual_tab_behavior = function usual_tab_behavior(e, target) {
        var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');

        if (!settings.is_hover || Modernizr.touch) {
          // if user did not pressed tab key, prevent default action
          var keyCode = e.keyCode || e.which;

          if (keyCode !== 9) {
            e.preventDefault();
            e.stopPropagation();
          }

          self.toggle_active_tab(S(target).parent());
        }
      };

      S(this.scope).off('.tab') // Key event: focus/tab key
      .on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
        var keyCode = e.keyCode || e.which; // if user pressed tab key

        if (keyCode === 13 || keyCode === 32) {
          // enter or space
          var el = this;
          usual_tab_behavior(e, el);
        }
      }) // Click event: tab title
      .on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
        var el = this;
        usual_tab_behavior(e, el);
      }) // Hover event: tab title
      .on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
        var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');

        if (settings.is_hover) {
          self.toggle_active_tab(S(this).parent());
        }
      }); // Location hash change event

      S(window).on('hashchange.fndtn.tab', function (e) {
        e.preventDefault();
        self.handle_location_hash_change();
      });
    },
    handle_location_hash_change: function handle_location_hash_change() {
      var self = this,
          S = this.S;
      S('[' + this.attr_name() + ']', this.scope).each(function () {
        var settings = S(this).data(self.attr_name(true) + '-init');

        if (settings.deep_linking) {
          // Match the location hash to a label
          var hash;

          if (settings.scroll_to_content) {
            hash = self.scope.location.hash;
          } else {
            // prefix the hash to prevent anchor scrolling
            hash = self.scope.location.hash.replace('fndtn-', '');
          }

          if (hash != '') {
            // Check whether the location hash references a tab content div or
            // another element on the page (inside or outside the tab content div)
            var hash_element = S(hash);

            if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
              // Tab content div
              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + hash + ']').parent());
            } else {
              // Not the tab content div. If inside the tab content, find the
              // containing tab and toggle it as active.
              var hash_tab_container_id = hash_element.closest('.content').attr('id');

              if (hash_tab_container_id != undefined) {
                self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=#' + hash_tab_container_id + ']').parent(), hash);
              }
            }
          } else {
            // Reference the default tab hashes which were initialized in the init function
            for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + self.default_tab_hashes[ind] + ']').parent());
            }
          }
        }
      });
    },
    toggle_active_tab: function toggle_active_tab(tab, location_hash) {
      var self = this,
          S = self.S,
          tabs = tab.closest('[' + this.attr_name() + ']'),
          tab_link = tab.find('a'),
          anchor = tab.children('a').first(),
          target_hash = '#' + anchor.attr('href').split('#')[1],
          target = S(target_hash),
          siblings = tab.siblings(),
          settings = tabs.data(this.attr_name(true) + '-init'),
          interpret_keyup_action = function interpret_keyup_action(e) {
        // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js
        // define current, previous and next (possible) tabs
        var $original = $(this);
        var $prev = $(this).parents('li').prev().children('[role="tab"]');
        var $next = $(this).parents('li').next().children('[role="tab"]');
        var $target; // find the direction (prev or next)

        switch (e.keyCode) {
          case 37:
            $target = $prev;
            break;

          case 39:
            $target = $next;
            break;

          default:
            $target = false;
            break;
        }

        if ($target.length) {
          $original.attr({
            'tabindex': '-1',
            'aria-selected': null
          });
          $target.attr({
            'tabindex': '0',
            'aria-selected': true
          }).focus();
        } // Hide panels


        $('[role="tabpanel"]').attr('aria-hidden', 'true'); // Show panel which corresponds to target

        $('#' + $(document.activeElement).attr('href').substring(1)).attr('aria-hidden', null);
      },
          go_to_hash = function go_to_hash(hash) {
        // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
        // the user would get continually redirected to the default hash.
        var default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : 'fndtn-' + self.default_tab_hashes[0].replace('#', '');

        if (hash !== default_hash || window.location.hash) {
          window.location.hash = hash;
        }
      }; // allow usage of data-tab-content attribute instead of href


      if (anchor.data('tab-content')) {
        target_hash = '#' + anchor.data('tab-content').split('#')[1];
        target = S(target_hash);
      }

      if (settings.deep_linking) {
        if (settings.scroll_to_content) {
          // retain current hash to scroll to content
          go_to_hash(location_hash || target_hash);

          if (location_hash == undefined || location_hash == target_hash) {
            tab.parent()[0].scrollIntoView();
          } else {
            S(target_hash)[0].scrollIntoView();
          }
        } else {
          // prefix the hashes so that the browser doesn't scroll down
          if (location_hash != undefined) {
            go_to_hash('fndtn-' + location_hash.replace('#', ''));
          } else {
            go_to_hash('fndtn-' + target_hash.replace('#', ''));
          }
        }
      } // WARNING: The activation and deactivation of the tab content must
      // occur after the deep linking in order to properly refresh the browser
      // window (notably in Chrome).
      // Clean up multiple attr instances to done once


      tab.addClass(settings.active_class).triggerHandler('opened');
      tab_link.attr({
        'aria-selected': 'true',
        tabindex: 0
      });
      siblings.removeClass(settings.active_class);
      siblings.find('a').attr({
        'aria-selected': 'false'
        /*,  tabindex : -1*/

      });
      target.siblings().removeClass(settings.active_class).attr({
        'aria-hidden': 'true'
        /*,  tabindex : -1*/

      });
      target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
      settings.callback(tab);
      target.triggerHandler('toggled', [target]);
      tabs.triggerHandler('toggled', [tab]);
      tab_link.off('keydown').on('keydown', interpret_keyup_action);
    },
    data_attr: function data_attr(str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },
    off: function off() {},
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.tab.js"], null)
//# sourceMappingURL=/foundation.tab.ab350a49.js.map