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
})({"bower_components/foundation/js/foundation/foundation.dropdown.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name: 'dropdown',
    version: '5.5.3',
    settings: {
      active_class: 'open',
      disabled_class: 'disabled',
      mega_class: 'mega',
      align: 'bottom',
      is_hover: false,
      hover_timeout: 150,
      opened: function opened() {},
      closed: function closed() {}
    },
    init: function init(scope, method, options) {
      Foundation.inherit(this, 'throttle');
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },
    events: function events(scope) {
      var self = this,
          S = self.S;
      S(this.scope).off('.dropdown').on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
        var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;

        if (!settings.is_hover || Modernizr.touch) {
          e.preventDefault();

          if (S(this).parent('[data-reveal-id]').length) {
            e.stopPropagation();
          }

          self.toggle($(this));
        }
      }).on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
        var $this = S(this),
            dropdown,
            target;
        clearTimeout(self.timeout);

        if ($this.data(self.data_attr())) {
          dropdown = S('#' + $this.data(self.data_attr()));
          target = $this;
        } else {
          dropdown = $this;
          target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]');
        }

        var settings = target.data(self.attr_name(true) + '-init') || self.settings;

        if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
          self.closeall.call(self);
        }

        if (settings.is_hover) {
          self.open.apply(self, [dropdown, target]);
        }
      }).on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
        var $this = S(this);
        var settings;

        if ($this.data(self.data_attr())) {
          settings = $this.data(self.data_attr(true) + '-init') || self.settings;
        } else {
          var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
              settings = target.data(self.attr_name(true) + '-init') || self.settings;
        }

        self.timeout = setTimeout(function () {
          if ($this.data(self.data_attr())) {
            if (settings.is_hover) {
              self.close.call(self, S('#' + $this.data(self.data_attr())));
            }
          } else {
            if (settings.is_hover) {
              self.close.call(self, $this);
            }
          }
        }.bind(this), settings.hover_timeout);
      }).on('click.fndtn.dropdown', function (e) {
        var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
        var links = parent.find('a');

        if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') {
          self.close.call(self, S('[' + self.attr_name() + '-content]'));
        }

        if (e.target !== document && !$.contains(document.documentElement, e.target)) {
          return;
        }

        if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
          return;
        }

        if (!S(e.target).data('revealId') && parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') || $.contains(parent.first()[0], e.target))) {
          e.stopPropagation();
          return;
        }

        self.close.call(self, S('[' + self.attr_name() + '-content]'));
      }).on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
        self.settings.opened.call(this);
      }).on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
        self.settings.closed.call(this);
      });
      S(window).off('.dropdown').on('resize.fndtn.dropdown', self.throttle(function () {
        self.resize.call(self);
      }, 50));
      this.resize();
    },
    close: function close(dropdown) {
      var self = this;
      dropdown.each(function (idx) {
        var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
        original_target.attr('aria-expanded', 'false');

        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this).css(Foundation.rtl ? 'right' : 'left', '-99999px').attr('aria-hidden', 'true').removeClass(self.settings.active_class).prev('[' + self.attr_name() + ']').removeClass(self.settings.active_class).removeData('target');
          self.S(this).trigger('closed.fndtn.dropdown', [dropdown]);
        }
      });
      dropdown.removeClass('f-open-' + this.attr_name(true));
    },
    closeall: function closeall() {
      var self = this;
      $.each(self.S('.f-open-' + this.attr_name(true)), function () {
        self.close.call(self, self.S(this));
      });
    },
    open: function open(dropdown, target) {
      this.css(dropdown.addClass(this.settings.active_class), target);
      dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
      dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
      dropdown.attr('aria-hidden', 'false');
      target.attr('aria-expanded', 'true');
      dropdown.focus();
      dropdown.addClass('f-open-' + this.attr_name(true));
    },
    data_attr: function data_attr() {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },
    toggle: function toggle(target) {
      if (target.hasClass(this.settings.disabled_class)) {
        return;
      }

      var dropdown = this.S('#' + target.data(this.data_attr()));

      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);

        if (dropdown.data('target') !== target.get(0)) {
          this.open.call(this, dropdown, target);
        }
      } else {
        this.open.call(this, dropdown, target);
      }
    },
    resize: function resize() {
      var dropdown = this.S('[' + this.attr_name() + '-content].open');
      var target = $(dropdown.data("target"));

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },
    css: function css(dropdown, target) {
      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
          settings = target.data(this.attr_name(true) + '-init') || this.settings,
          parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');
      this.clear_idx();

      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target, settings);
        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position: 'absolute',
          width: '95%',
          'max-width': 'none',
          top: p.top
        });
        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
      } // detect if dropdown is in an overflow container
      else if (parentOverflow !== 'visible') {
          var offset = target[0].offsetTop + target[0].offsetHeight;
          dropdown.attr('style', '').css({
            position: 'absolute',
            top: offset
          });
          dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
        } else {
          this.style(dropdown, target, settings);
        }

      return dropdown;
    },
    style: function style(dropdown, target, settings) {
      var css = $.extend({
        position: 'absolute'
      }, this.dirs[settings.align].call(dropdown, target, settings));
      dropdown.attr('style', '').css(css);
    },
    // return CSS property object
    // `this` is the dropdown
    dirs: {
      // Calculate target offset
      _base: function _base(t, s) {
        var o_p = this.offsetParent(),
            o = o_p.offset(),
            p = t.offset();
        p.top -= o.top;
        p.left -= o.left; //set some flags on the p object to pass along

        p.missRight = false;
        p.missTop = false;
        p.missLeft = false;
        p.leftRightFlag = false; //lets see if the panel will be off the screen
        //get the actual width of the page and store it

        var actualBodyWidth;
        var windowWidth = window.innerWidth;

        if (document.getElementsByClassName('row')[0]) {
          actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth;
        } else {
          actualBodyWidth = windowWidth;
        }

        var actualMarginWidth = (windowWidth - actualBodyWidth) / 2;
        var actualBoundary = actualBodyWidth;

        if (!this.hasClass('mega') && !s.ignore_repositioning) {
          var outerWidth = this.outerWidth();
          var o_left = t.offset().left; //miss top

          if (t.offset().top <= this.outerHeight()) {
            p.missTop = true;
            actualBoundary = windowWidth - actualMarginWidth;
            p.leftRightFlag = true;
          } //miss right


          if (o_left + outerWidth > o_left + actualMarginWidth && o_left - actualMarginWidth > outerWidth) {
            p.missRight = true;
            p.missLeft = false;
          } //miss left


          if (o_left - outerWidth <= 0) {
            p.missLeft = true;
            p.missRight = false;
          }
        }

        return p;
      },
      top: function top(t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t, s);

        this.addClass('drop-top');

        if (p.missTop == true) {
          p.top = p.top + t.outerHeight() + this.outerHeight();
          this.removeClass('drop-top');
        }

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (Foundation.rtl) {
          return {
            left: p.left - this.outerWidth() + t.outerWidth(),
            top: p.top - this.outerHeight()
          };
        }

        return {
          left: p.left,
          top: p.top - this.outerHeight()
        };
      },
      bottom: function bottom(t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t, s);

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (self.rtl) {
          return {
            left: p.left - this.outerWidth() + t.outerWidth(),
            top: p.top + t.outerHeight()
          };
        }

        return {
          left: p.left,
          top: p.top + t.outerHeight()
        };
      },
      left: function left(t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

        this.addClass('drop-left');

        if (p.missLeft == true) {
          p.left = p.left + this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-left');
        }

        return {
          left: p.left - this.outerWidth(),
          top: p.top
        };
      },
      right: function right(t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

        this.addClass('drop-right');

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-right');
        } else {
          p.triggeredRight = true;
        }

        var self = Foundation.libs.dropdown;

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        return {
          left: p.left + t.outerWidth(),
          top: p.top
        };
      }
    },
    // Insert rule to style psuedo elements
    adjust_pip: function adjust_pip(dropdown, target, settings, position) {
      var sheet = Foundation.stylesheet,
          pip_offset_base = 8;

      if (dropdown.hasClass(settings.mega_class)) {
        pip_offset_base = position.left + target.outerWidth() / 2 - 8;
      } else if (this.small()) {
        pip_offset_base += position.left - 8;
      }

      this.rule_idx = sheet.cssRules.length; //default

      var sel_before = '.f-dropdown.open:before',
          sel_after = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (position.missRight == true) {
        pip_offset_base = dropdown.outerWidth() - 23;
        sel_before = '.f-dropdown.open:before', sel_after = '.f-dropdown.open:after', css_before = 'left: ' + pip_offset_base + 'px;', css_after = 'left: ' + (pip_offset_base - 1) + 'px;';
      } //just a case where right is fired, but its not missing right


      if (position.triggeredRight == true) {
        sel_before = '.f-dropdown.open:before', sel_after = '.f-dropdown.open:after', css_before = 'left:-12px;', css_after = 'left:-14px;';
      }

      if (sheet.insertRule) {
        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },
    // Remove old dropdown rule index
    clear_idx: function clear_idx() {
      var sheet = Foundation.stylesheet;

      if (typeof this.rule_idx !== 'undefined') {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },
    small: function small() {
      return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
    },
    off: function off() {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.dropdown.js"], null)
//# sourceMappingURL=/foundation.dropdown.3d04c1b1.js.map