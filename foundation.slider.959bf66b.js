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
})({"bower_components/foundation/js/foundation/foundation.slider.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.slider = {
    name: 'slider',
    version: '5.5.3',
    settings: {
      start: 0,
      end: 100,
      step: 1,
      precision: 2,
      initial: null,
      display_selector: '',
      vertical: false,
      trigger_input_change: false,
      on_change: function on_change() {}
    },
    cache: {},
    init: function init(scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
      this.reflow();
    },
    events: function events() {
      var self = this;
      $(this.scope).off('.slider').on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider', '[' + self.attr_name() + ']:not(.disabled, [disabled]) .range-slider-handle', function (e) {
        if (!self.cache.active) {
          e.preventDefault();
          self.set_active_slider($(e.target));
        }
      }).on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider', function (e) {
        if (!!self.cache.active) {
          e.preventDefault();

          if ($.data(self.cache.active[0], 'settings').vertical) {
            var scroll_offset = 0;

            if (!e.pageY) {
              scroll_offset = window.scrollY;
            }

            self.calculate_position(self.cache.active, self.get_cursor_position(e, 'y') + scroll_offset);
          } else {
            self.calculate_position(self.cache.active, self.get_cursor_position(e, 'x'));
          }
        }
      }).on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function (e) {
        if (!self.cache.active) {
          // if the user has just clicked into the slider without starting to drag the handle
          var slider = $(e.target).attr('role') === 'slider' ? $(e.target) : $(e.target).closest('.range-slider').find("[role='slider']");

          if (slider.length && !slider.parent().hasClass('disabled') && !slider.parent().attr('disabled')) {
            self.set_active_slider(slider);

            if ($.data(self.cache.active[0], 'settings').vertical) {
              var scroll_offset = 0;

              if (!e.pageY) {
                scroll_offset = window.scrollY;
              }

              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'y') + scroll_offset);
            } else {
              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'x'));
            }
          }
        }

        self.remove_active_slider();
      }).on('change.fndtn.slider', function (e) {
        self.settings.on_change();
      });
      self.S(window).on('resize.fndtn.slider', self.throttle(function (e) {
        self.reflow();
      }, 300)); // update slider value as users change input value

      this.S('[' + this.attr_name() + ']').each(function () {
        var slider = $(this),
            handle = slider.children('.range-slider-handle')[0],
            settings = self.initialize_settings(handle);

        if (settings.display_selector != '') {
          $(settings.display_selector).each(function () {
            if ($(this).attr('value')) {
              $(this).off('change').on('change', function () {
                slider.foundation("slider", "set_value", $(this).val());
              });
            }
          });
        }
      });
    },
    get_cursor_position: function get_cursor_position(e, xy) {
      var pageXY = 'page' + xy.toUpperCase(),
          clientXY = 'client' + xy.toUpperCase(),
          position;

      if (typeof e[pageXY] !== 'undefined') {
        position = e[pageXY];
      } else if (typeof e.originalEvent[clientXY] !== 'undefined') {
        position = e.originalEvent[clientXY];
      } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0][clientXY] !== 'undefined') {
        position = e.originalEvent.touches[0][clientXY];
      } else if (e.currentPoint && typeof e.currentPoint[xy] !== 'undefined') {
        position = e.currentPoint[xy];
      }

      return position;
    },
    set_active_slider: function set_active_slider($handle) {
      this.cache.active = $handle;
    },
    remove_active_slider: function remove_active_slider() {
      this.cache.active = null;
    },
    calculate_position: function calculate_position($handle, cursor_x) {
      var self = this,
          settings = $.data($handle[0], 'settings'),
          handle_l = $.data($handle[0], 'handle_l'),
          handle_o = $.data($handle[0], 'handle_o'),
          bar_l = $.data($handle[0], 'bar_l'),
          bar_o = $.data($handle[0], 'bar_o');
      requestAnimationFrame(function () {
        var pct;

        if (Foundation.rtl && !settings.vertical) {
          pct = self.limit_to((bar_o + bar_l - cursor_x) / bar_l, 0, 1);
        } else {
          pct = self.limit_to((cursor_x - bar_o) / bar_l, 0, 1);
        }

        pct = settings.vertical ? 1 - pct : pct;
        var norm = self.normalized_value(pct, settings.start, settings.end, settings.step, settings.precision);
        self.set_ui($handle, norm);
      });
    },
    set_ui: function set_ui($handle, value) {
      var settings = $.data($handle[0], 'settings'),
          handle_l = $.data($handle[0], 'handle_l'),
          bar_l = $.data($handle[0], 'bar_l'),
          norm_pct = this.normalized_percentage(value, settings.start, settings.end),
          handle_offset = norm_pct * (bar_l - handle_l) - 1,
          progress_bar_length = norm_pct * 100,
          $handle_parent = $handle.parent(),
          $hidden_inputs = $handle.parent().children('input[type=hidden]');

      if (Foundation.rtl && !settings.vertical) {
        handle_offset = -handle_offset;
      }

      handle_offset = settings.vertical ? -handle_offset + bar_l - handle_l + 1 : handle_offset;
      this.set_translate($handle, handle_offset, settings.vertical);

      if (settings.vertical) {
        $handle.siblings('.range-slider-active-segment').css('height', progress_bar_length + '%');
      } else {
        $handle.siblings('.range-slider-active-segment').css('width', progress_bar_length + '%');
      }

      $handle_parent.attr(this.attr_name(), value).trigger('change.fndtn.slider');
      $hidden_inputs.val(value);

      if (settings.trigger_input_change) {
        $hidden_inputs.trigger('change.fndtn.slider');
      }

      if (!$handle[0].hasAttribute('aria-valuemin')) {
        $handle.attr({
          'aria-valuemin': settings.start,
          'aria-valuemax': settings.end
        });
      }

      $handle.attr('aria-valuenow', value);

      if (settings.display_selector != '') {
        $(settings.display_selector).each(function () {
          if (this.hasAttribute('value')) {
            $(this).val(value);
          } else {
            $(this).text(value);
          }
        });
      }
    },
    normalized_percentage: function normalized_percentage(val, start, end) {
      return Math.min(1, (val - start) / (end - start));
    },
    normalized_value: function normalized_value(val, start, end, step, precision) {
      var range = end - start,
          point = val * range,
          mod = (point - point % step) / step,
          rem = point % step,
          round = rem >= step * 0.5 ? step : 0;
      return (mod * step + round + start).toFixed(precision);
    },
    set_translate: function set_translate(ele, offset, vertical) {
      if (vertical) {
        $(ele).css('-webkit-transform', 'translateY(' + offset + 'px)').css('-moz-transform', 'translateY(' + offset + 'px)').css('-ms-transform', 'translateY(' + offset + 'px)').css('-o-transform', 'translateY(' + offset + 'px)').css('transform', 'translateY(' + offset + 'px)');
      } else {
        $(ele).css('-webkit-transform', 'translateX(' + offset + 'px)').css('-moz-transform', 'translateX(' + offset + 'px)').css('-ms-transform', 'translateX(' + offset + 'px)').css('-o-transform', 'translateX(' + offset + 'px)').css('transform', 'translateX(' + offset + 'px)');
      }
    },
    limit_to: function limit_to(val, min, max) {
      return Math.min(Math.max(val, min), max);
    },
    initialize_settings: function initialize_settings(handle) {
      var settings = $.extend({}, this.settings, this.data_options($(handle).parent())),
          decimal_places_match_result;

      if (settings.precision === null) {
        decimal_places_match_result = ('' + settings.step).match(/\.([\d]*)/);
        settings.precision = decimal_places_match_result && decimal_places_match_result[1] ? decimal_places_match_result[1].length : 0;
      }

      if (settings.vertical) {
        $.data(handle, 'bar_o', $(handle).parent().offset().top);
        $.data(handle, 'bar_l', $(handle).parent().outerHeight());
        $.data(handle, 'handle_o', $(handle).offset().top);
        $.data(handle, 'handle_l', $(handle).outerHeight());
      } else {
        $.data(handle, 'bar_o', $(handle).parent().offset().left);
        $.data(handle, 'bar_l', $(handle).parent().outerWidth());
        $.data(handle, 'handle_o', $(handle).offset().left);
        $.data(handle, 'handle_l', $(handle).outerWidth());
      }

      $.data(handle, 'bar', $(handle).parent());
      return $.data(handle, 'settings', settings);
    },
    set_initial_position: function set_initial_position($ele) {
      var settings = $.data($ele.children('.range-slider-handle')[0], 'settings'),
          initial = typeof settings.initial == 'number' && !isNaN(settings.initial) ? settings.initial : Math.floor((settings.end - settings.start) * 0.5 / settings.step) * settings.step + settings.start,
          $handle = $ele.children('.range-slider-handle');
      this.set_ui($handle, initial);
    },
    set_value: function set_value(value) {
      var self = this;
      $('[' + self.attr_name() + ']', this.scope).each(function () {
        $(this).attr(self.attr_name(), value);
      });

      if (!!$(this.scope).attr(self.attr_name())) {
        $(this.scope).attr(self.attr_name(), value);
      }

      self.reflow();
    },
    reflow: function reflow() {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var handle = $(this).children('.range-slider-handle')[0],
            val = $(this).attr(self.attr_name());
        self.initialize_settings(handle);

        if (val) {
          self.set_ui($(handle), parseFloat(val));
        } else {
          self.set_initial_position($(this));
        }
      });
    }
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.slider.js"], null)
//# sourceMappingURL=/foundation.slider.959bf66b.js.map