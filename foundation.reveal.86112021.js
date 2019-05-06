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
})({"bower_components/foundation/js/foundation/foundation.reveal.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  var openModals = [];
  Foundation.libs.reveal = {
    name: 'reveal',
    version: '5.5.3',
    locked: false,
    settings: {
      animation: 'fadeAndPop',
      animation_speed: 250,
      close_on_background_click: true,
      close_on_esc: true,
      dismiss_modal_class: 'close-reveal-modal',
      multiple_opened: false,
      bg_class: 'reveal-modal-bg',
      root_element: 'body',
      open: function open() {},
      opened: function opened() {},
      close: function close() {},
      closed: function closed() {},
      on_ajax_error: $.noop,
      bg: $('.reveal-modal-bg'),
      css: {
        open: {
          'opacity': 0,
          'visibility': 'visible',
          'display': 'block'
        },
        close: {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },
    init: function init(scope, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },
    events: function events(scope) {
      var self = this,
          S = self.S;
      S(this.scope).off('.reveal').on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
        e.preventDefault();

        if (!self.locked) {
          var element = S(this),
              ajax = element.data(self.data_attr('reveal-ajax')),
              replaceContentSel = element.data(self.data_attr('reveal-replace-content'));
          self.locked = true;

          if (typeof ajax === 'undefined') {
            self.open.call(self, element);
          } else {
            var url = ajax === true ? element.attr('href') : ajax;
            self.open.call(self, element, {
              url: url
            }, {
              replaceContentSel: replaceContentSel
            });
          }
        }
      });
      S(document).on('click.fndtn.reveal', this.close_targets(), function (e) {
        e.preventDefault();

        if (!self.locked) {
          var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
              bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

          if (bg_clicked) {
            if (settings.close_on_background_click) {
              e.stopPropagation();
            } else {
              return;
            }
          }

          self.locked = true;
          self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'));
        }
      });

      if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope) // .off('.reveal')
        .on('open.fndtn.reveal', this.settings.open).on('opened.fndtn.reveal', this.settings.opened).on('opened.fndtn.reveal', this.open_video).on('close.fndtn.reveal', this.settings.close).on('closed.fndtn.reveal', this.settings.closed).on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope) // .off('.reveal')
        .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open).on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened).on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video).on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close).on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed).on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },
    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on: function key_up_on(scope) {
      var self = this; // PATCH #1: fixing multiple keyup event trigger from single key press

      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function (event) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init') || self.settings; // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.

        if (settings && event.which === 27 && settings.close_on_esc && !self.locked) {
          // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });
      return true;
    },
    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off: function key_up_off(scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },
    open: function open(target, ajax_settings) {
      var self = this,
          modal;

      if (target) {
        if (typeof target.selector !== 'undefined') {
          // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
          modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
        } else {
          modal = self.S(this.scope);
          ajax_settings = target;
        }
      } else {
        modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');
      settings = settings || this.settings;

      if (modal.hasClass('open') && target !== undefined && target.attr('data-reveal-id') == modal.attr('id')) {
        return self.close(modal);
      }

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10)).data('offset', this.cache_offset(modal));
        }

        modal.attr('tabindex', '0').attr('aria-hidden', 'false');
        this.key_up_on(modal); // PATCH #3: turning on key up capture only when a reveal window is open
        // Prevent namespace event from triggering twice

        modal.on('open.fndtn.reveal', function (e) {
          if (e.namespace !== 'fndtn.reveal') return;
        });
        modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');

        if (open_modal.length < 1) {
          this.toggle_bg(modal, true);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url: ajax_settings
          };
        }

        var openModal = function openModal() {
          if (open_modal.length > 0) {
            if (settings.multiple_opened) {
              self.to_back(open_modal);
            } else {
              self.hide(open_modal, settings.css.close);
            }
          } // bl: add the open_modal that isn't already in the background to the openModals array


          if (settings.multiple_opened) {
            openModals.push(modal);
          }

          self.show(modal, settings.css.open);
        };

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          openModal();
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
          $.extend(ajax_settings, {
            success: function success(data, textStatus, jqXHR) {
              if ($.isFunction(old_success)) {
                var result = old_success(data, textStatus, jqXHR);

                if (typeof result == 'string') {
                  data = result;
                }
              }

              if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
                modal.find(options.replaceContentSel).html(data);
              } else {
                modal.html(data);
              }

              self.S(modal).foundation('section', 'reflow');
              self.S(modal).children().foundation();
              openModal();
            }
          }); // check for if user initalized with error callback

          if (settings.on_ajax_error !== $.noop) {
            $.extend(ajax_settings, {
              error: settings.on_ajax_error
            });
          }

          $.ajax(ajax_settings);
        }
      }

      self.S(window).trigger('resize');
    },
    close: function close(modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init') || this.settings,
          self = this;

      if (open_modals.length > 0) {
        modal.removeAttr('tabindex', '0').attr('aria-hidden', 'true');
        this.locked = true;
        this.key_up_off(modal); // PATCH #3: turning on key up capture only when a reveal window is open

        modal.trigger('close.fndtn.reveal');

        if (settings.multiple_opened && open_modals.length === 1 || !settings.multiple_opened || modal.length > 1) {
          self.toggle_bg(modal, false);
          self.to_front(modal);
        }

        if (settings.multiple_opened) {
          var isCurrent = modal.is(':not(.toback)');
          self.hide(modal, settings.css.close, settings);

          if (isCurrent) {
            // remove the last modal since it is now closed
            openModals.pop();
          } else {
            // if this isn't the current modal, then find it in the array and remove it
            openModals = $.grep(openModals, function (elt) {
              var isThis = elt[0] === modal[0];

              if (isThis) {
                // since it's not currently in the front, put it in the front now that it is hidden
                // so that if it's re-opened, it won't be .toback
                self.to_front(modal);
              }

              return !isThis;
            });
          } // finally, show the next modal in the stack, if there is one


          if (openModals.length > 0) {
            self.to_front(openModals[openModals.length - 1]);
          }
        } else {
          self.hide(open_modals, settings.css.close, settings);
        }
      }
    },
    close_targets: function close_targets() {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },
    toggle_bg: function toggle_bg(modal, state) {
      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {
          'class': this.settings.bg_class
        }).appendTo('body').hide();
      }

      var visible = this.settings.bg.filter(':visible').length > 0;

      if (state != visible) {
        if (state == undefined ? visible : !state) {
          this.hide(this.settings.bg);
        } else {
          this.show(this.settings.bg);
        }
      }
    },
    show: function show(el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init') || this.settings,
            root_element = settings.root_element,
            context = this;

        if (el.parent(root_element).length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent();
          el.on('closed.fndtn.reveal.wrapped', function () {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });
          el.detach().appendTo(root_element);
        }

        var animData = getAnimationData(settings.animation);

        if (!animData.animate) {
          this.locked = false;
        }

        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };
          return setTimeout(function () {
            return el.css(css).animate(end_css, settings.animation_speed, 'linear', function () {
              context.locked = false;
              el.trigger('opened.fndtn.reveal');
            }).addClass('open');
          }, settings.animation_speed / 2);
        }

        css.top = $(window).scrollTop() + el.data('css-top') + 'px';

        if (animData.fade) {
          var end_css = {
            opacity: 1
          };
          return setTimeout(function () {
            return el.css(css).animate(end_css, settings.animation_speed, 'linear', function () {
              context.locked = false;
              el.trigger('opened.fndtn.reveal');
            }).addClass('open');
          }, settings.animation_speed / 2);
        }

        return el.css(css).show().css({
          opacity: 1
        }).addClass('open').trigger('opened.fndtn.reveal');
      }

      var settings = this.settings; // should we animate the background?

      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;
      return el.show();
    },
    to_back: function to_back(el) {
      el.addClass('toback');
    },
    to_front: function to_front(el) {
      el.removeClass('toback');
    },
    hide: function hide(el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init'),
            context = this;
        settings = settings || this.settings;
        var animData = getAnimationData(settings.animation);

        if (!animData.animate) {
          this.locked = false;
        }

        if (animData.pop) {
          var end_css = {
            top: -$(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };
          return setTimeout(function () {
            return el.animate(end_css, settings.animation_speed, 'linear', function () {
              context.locked = false;
              el.css(css).trigger('closed.fndtn.reveal');
            }).removeClass('open');
          }, settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {
            opacity: 0
          };
          return setTimeout(function () {
            return el.animate(end_css, settings.animation_speed, 'linear', function () {
              context.locked = false;
              el.css(css).trigger('closed.fndtn.reveal');
            }).removeClass('open');
          }, settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');
      }

      var settings = this.settings; // should we animate the background?

      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },
    close_video: function close_video(e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', iframe.attr('src'));
        video.hide();
      }
    },
    open_video: function open_video(e) {
      var video = $('.flex-video', e.target),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');

        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }

        video.show();
      }
    },
    data_attr: function data_attr(str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },
    cache_offset: function cache_offset(modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;
      modal.hide();
      return offset;
    },
    off: function off() {
      $(this.scope).off('.fndtn.reveal');
    },
    reflow: function reflow() {}
  };
  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */

  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate: fade || pop,
      pop: pop,
      fade: fade
    };
  }
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.reveal.js"], null)
//# sourceMappingURL=/foundation.reveal.86112021.js.map