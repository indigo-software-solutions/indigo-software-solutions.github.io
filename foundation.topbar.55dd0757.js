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
})({"bower_components/foundation/js/foundation/foundation.topbar.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name: 'topbar',
    version: '5.5.3',
    settings: {
      index: 0,
      start_offset: 0,
      sticky_class: 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      mobile_show_parent_link: true,
      is_hover: true,
      scrolltop: true,
      // jump to top when sticky nav menu toggle is clicked
      sticky_on: 'all',
      dropdown_autoclose: true
    },
    init: function init(section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;
      self.register_media('topbar', 'foundation-mq-topbar');
      this.bindings(method, options);
      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section, .top-bar-section', this);
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();

        if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings)) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) {
          self.assemble(topbar);
        }

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        } // Pad body when sticky (scrolled) or fixed.


        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });
    },
    is_sticky: function is_sticky(topbar, topbarContainer, settings) {
      var sticky = topbarContainer.hasClass(settings.sticky_class);
      var smallMatch = matchMedia(Foundation.media_queries.small).matches;
      var medMatch = matchMedia(Foundation.media_queries.medium).matches;
      var lrgMatch = matchMedia(Foundation.media_queries.large).matches;

      if (sticky && settings.sticky_on === 'all') {
        return true;
      }

      if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1) {
        if (smallMatch && !medMatch && !lrgMatch) {
          return true;
        }
      }

      if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1) {
        if (smallMatch && medMatch && !lrgMatch) {
          return true;
        }
      }

      if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1) {
        if (smallMatch && medMatch && lrgMatch) {
          return true;
        }
      }

      return false;
    },
    toggle: function toggle(toggleEl) {
      var self = this,
          topbar;

      if (toggleEl) {
        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');
      var section = self.S('section, .top-bar-section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({
            left: '0%'
          });
          $('>.name', section).css({
            left: '100%'
          });
        } else {
          section.css({
            right: '0%'
          });
          $('>.name', section).css({
            right: '100%'
          });
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);
        topbar.toggleClass('expanded').css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');
            window.scrollTo(0, 0);
          } else {
            topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if (self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if (topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },
    timer: null,
    events: function events(bar) {
      var self = this,
          S = this.S;
      S(this.scope).off('.topbar').on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
        e.preventDefault();
        self.toggle(this);
      }).on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function (e) {
        var li = $(this).closest('li'),
            topbar = li.closest('[' + self.attr_name() + ']'),
            settings = topbar.data(self.attr_name(true) + '-init');

        if (settings.dropdown_autoclose && settings.is_hover) {
          var hoverLi = $(this).closest('.hover');
          hoverLi.removeClass('hover');
        }

        if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) {
          self.toggle();
        }
      }).on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
        var li = S(this),
            target = S(e.target),
            topbar = li.closest('[' + self.attr_name() + ']'),
            settings = topbar.data(self.attr_name(true) + '-init');

        if (target.data('revealId')) {
          self.toggle();
          return;
        }

        if (self.breakpoint()) {
          return;
        }

        if (settings.is_hover && !Modernizr.touch) {
          return;
        }

        e.stopImmediatePropagation();

        if (li.hasClass('hover')) {
          li.removeClass('hover').find('li').removeClass('hover');
          li.parents('li.hover').removeClass('hover');
        } else {
          li.addClass('hover');
          $(li).siblings().removeClass('hover');

          if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
            e.preventDefault();
          }
        }
      }).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
        if (self.breakpoint()) {
          e.preventDefault();
          var $this = S(this),
              topbar = $this.closest('[' + self.attr_name() + ']'),
              section = topbar.find('section, .top-bar-section'),
              dropdownHeight = $this.next('.dropdown').outerHeight(),
              $selectedLi = $this.closest('li');
          topbar.data('index', topbar.data('index') + 1);
          $selectedLi.addClass('moved');

          if (!self.rtl) {
            section.css({
              left: -(100 * topbar.data('index')) + '%'
            });
            section.find('>.name').css({
              left: 100 * topbar.data('index') + '%'
            });
          } else {
            section.css({
              right: -(100 * topbar.data('index')) + '%'
            });
            section.find('>.name').css({
              right: 100 * topbar.data('index') + '%'
            });
          }

          topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
        }
      });
      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize.fndtn.topbar').load(function () {
        // Ensure that the offset is calculated after all of the pages resources have loaded
        S(this).trigger('resize.fndtn.topbar');
      });
      S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li.hover').removeClass('hover');
      }); // Go up a level on Click

      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();
        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .top-bar-section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();
        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({
            left: -(100 * topbar.data('index')) + '%'
          });
          section.find('>.name').css({
            left: 100 * topbar.data('index') + '%'
          });
        } else {
          section.css({
            right: -(100 * topbar.data('index')) + '%'
          });
          section.find('>.name').css({
            right: 100 * topbar.data('index') + '%'
          });
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      }); // Show dropdown menus when their items are focused

      S(this.scope).find('.dropdown a').focus(function () {
        $(this).parents('.has-dropdown').addClass('hover');
      }).blur(function () {
        $(this).parents('.has-dropdown').removeClass('hover');
      });
    },
    resize: function resize() {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');
        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar.css('height', '').removeClass('expanded').find('li').removeClass('hover');

          if (doToggle) {
            self.toggle(topbar);
          }
        }

        if (self.is_sticky(topbar, stickyContainer, settings)) {
          if (stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');
            stickyOffset = stickyContainer.offset().top;

            if (self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }
      });
    },
    breakpoint: function breakpoint() {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },
    small: function small() {
      return matchMedia(Foundation.media_queries['small']).matches;
    },
    medium: function medium() {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },
    large: function large() {
      return matchMedia(Foundation.media_queries['large']).matches;
    },
    assemble: function assemble(topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section, .top-bar-section', topbar); // Pull element out of the DOM for manipulation

      section.detach();
      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href'),
            $titleLi;

        if (!$dropdown.find('.title.back').length) {
          if (settings.mobile_show_parent_link == true && url) {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() + '</a></li>');
          } else {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
          } // Copy link to subnav


          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
          }

          $dropdown.prepend($titleLi);
        }
      }); // Put element back in the DOM

      section.appendTo(topbar); // check for sticky

      this.sticky();
      this.assembled(topbar);
    },
    assembled: function assembled(topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {
        assembled: true
      }));
    },
    height: function height(ul) {
      var total = 0,
          self = this;
      $('> li', ul).each(function () {
        total += self.S(this).outerHeight(true);
      });
      return total;
    },
    sticky: function sticky() {
      var self = this;
      this.S(window).on('scroll', function () {
        self.update_sticky_positioning();
      });
    },
    update_sticky_positioning: function update_sticky_positioning() {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window),
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;

        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > distance) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },
    off: function off() {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.topbar.js"], null)
//# sourceMappingURL=/foundation.topbar.55dd0757.js.map