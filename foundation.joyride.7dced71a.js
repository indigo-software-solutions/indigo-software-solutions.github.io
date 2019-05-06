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
})({"bower_components/foundation/js/foundation/foundation.joyride.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function ($, window, document, undefined) {
  'use strict';

  var Modernizr = Modernizr || false;
  Foundation.libs.joyride = {
    name: 'joyride',
    version: '5.5.3',
    defaults: {
      expose: false,
      // turn on or off the expose feature
      modal: true,
      // Whether to cover page with modal during the tour
      keyboard: true,
      // enable left, right and esc keystrokes
      tip_location: 'bottom',
      // 'top', 'bottom', 'left' or 'right' in relation to parent
      nub_position: 'auto',
      // override on a per tooltip bases
      scroll_speed: 1500,
      // Page scrolling speed in milliseconds, 0 = no scroll animation
      scroll_animation: 'linear',
      // supports 'swing' and 'linear', extend with jQuery UI.
      timer: 0,
      // 0 = no timer , all other numbers = timer in milliseconds
      start_timer_on_click: true,
      // true or false - true requires clicking the first button start the timer
      start_offset: 0,
      // the index of the tooltip you want to start on (index of the li)
      next_button: true,
      // true or false to control whether a next button is used
      prev_button: true,
      // true or false to control whether a prev button is used
      tip_animation: 'fade',
      // 'pop' or 'fade' in each tip
      pause_after: [],
      // array of indexes where to pause the tour after
      exposed: [],
      // array of expose elements
      tip_animation_fade_speed: 300,
      // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookie_monster: false,
      // true or false to control whether cookies are used
      cookie_name: 'joyride',
      // Name the cookie you'll use
      cookie_domain: false,
      // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookie_expires: 365,
      // set when you would like the cookie to expire.
      tip_container: 'body',
      // Where will the tip be attached
      abort_on_close: true,
      // When true, the close event will not fire any callback
      tip_location_patterns: {
        top: ['bottom'],
        bottom: [],
        // bottom should not need to be repositioned
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom']
      },
      post_ride_callback: function post_ride_callback() {},
      // A method to call once the tour closes (canceled or complete)
      post_step_callback: function post_step_callback() {},
      // A method to call after each step
      pre_step_callback: function pre_step_callback() {},
      // A method to call before each step
      pre_ride_callback: function pre_ride_callback() {},
      // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      post_expose_callback: function post_expose_callback() {},
      // A method to call after an element has been exposed
      template: {
        // HTML segments for tip layout
        link: '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper: '<div class="joyride-content-wrapper"></div>',
        button: '<a href="#" class="small button joyride-next-tip"></a>',
        prev_button: '<a href="#" class="small button joyride-prev-tip"></a>',
        modal: '<div class="joyride-modal-bg"></div>',
        expose: '<div class="joyride-expose-wrapper"></div>',
        expose_cover: '<div class="joyride-expose-cover"></div>'
      },
      expose_add_class: '' // One or more space-separated class names to be added to exposed element

    },
    init: function init(scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');
      this.settings = this.settings || $.extend({}, this.defaults, options || method);
      this.bindings(method, options);
    },
    go_next: function go_next() {
      if (this.settings.$li.next().length < 1) {
        this.end();
      } else if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
        this.hide();
        this.show();
        this.startTimer();
      } else {
        this.hide();
        this.show();
      }
    },
    go_prev: function go_prev() {
      if (this.settings.$li.prev().length < 1) {// Do nothing if there are no prev element
      } else if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
        this.hide();
        this.show(null, true);
        this.startTimer();
      } else {
        this.hide();
        this.show(null, true);
      }
    },
    events: function events() {
      var self = this;
      $(this.scope).off('.joyride').on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
        e.preventDefault();
        this.go_next();
      }.bind(this)).on('click.fndtn.joyride', '.joyride-prev-tip', function (e) {
        e.preventDefault();
        this.go_prev();
      }.bind(this)).on('click.fndtn.joyride', '.joyride-close-tip', function (e) {
        e.preventDefault();
        this.end(this.settings.abort_on_close);
      }.bind(this)).on('keyup.fndtn.joyride', function (e) {
        // Don't do anything if keystrokes are disabled
        // or if the joyride is not being shown
        if (!this.settings.keyboard || !this.settings.riding) {
          return;
        }

        switch (e.which) {
          case 39:
            // right arrow
            e.preventDefault();
            this.go_next();
            break;

          case 37:
            // left arrow
            e.preventDefault();
            this.go_prev();
            break;

          case 27:
            // escape
            e.preventDefault();
            this.end(this.settings.abort_on_close);
        }
      }.bind(this));
      $(window).off('.joyride').on('resize.fndtn.joyride', self.throttle(function () {
        if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip && self.settings.riding) {
          if (self.settings.exposed.length > 0) {
            var $els = $(self.settings.exposed);
            $els.each(function () {
              var $this = $(this);
              self.un_expose($this);
              self.expose($this);
            });
          }

          if (self.is_phone()) {
            self.pos_phone();
          } else {
            self.pos_default(false);
          }
        }
      }, 100));
    },
    start: function start() {
      var self = this,
          $this = $('[' + this.attr_name() + ']', this.scope),
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!$this.length > 0) {
        return;
      }

      if (!this.settings.init) {
        this.events();
      }

      this.settings = $this.data(this.attr_name(true) + '-init'); // non configureable settings

      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tip_container);
      this.settings.body_offset = $(this.settings.tip_container).position();
      this.settings.$tip_content = this.settings.$content_el.find('> li');
      this.settings.paused = false;
      this.settings.attempts = 0;
      this.settings.riding = true; // can we create cookies?

      if (typeof $.cookie !== 'function') {
        this.settings.cookie_monster = false;
      } // generate the tips and insert into dom.


      if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
        this.settings.$tip_content.each(function (index) {
          var $this = $(this);
          this.settings = $.extend({}, self.defaults, self.data_options($this)); // Make sure that settings parsed from data_options are integers where necessary

          var i = int_settings_count;

          while (i--) {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
          }

          self.create({
            $li: $this,
            index: index
          });
        }); // show first tip

        if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
          this.show('init');
          this.startTimer();
        } else {
          this.show('init');
        }
      }
    },
    resume: function resume() {
      this.set_li();
      this.show();
    },
    tip_template: function tip_template(opts) {
      var $blank, content;
      opts.tip_class = opts.tip_class || '';
      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
      content = $.trim($(opts.li).html()) + this.prev_button_text(opts.prev_button_text, opts.index) + this.button_text(opts.button_text) + this.settings.template.link + this.timer_instance(opts.index);
      $blank.append($(this.settings.template.wrapper));
      $blank.first().attr(this.add_namespace('data-index'), opts.index);
      $('.joyride-content-wrapper', $blank).append(content);
      return $blank[0];
    },
    timer_instance: function timer_instance(index) {
      var txt;

      if (index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0 || this.settings.timer === 0) {
        txt = '';
      } else {
        txt = $(this.settings.template.timer)[0].outerHTML;
      }

      return txt;
    },
    button_text: function button_text(txt) {
      if (this.settings.tip_settings.next_button) {
        txt = $.trim(txt) || 'Next';
        txt = $(this.settings.template.button).append(txt)[0].outerHTML;
      } else {
        txt = '';
      }

      return txt;
    },
    prev_button_text: function prev_button_text(txt, idx) {
      if (this.settings.tip_settings.prev_button) {
        txt = $.trim(txt) || 'Previous'; // Add the disabled class to the button if it's the first element

        if (idx == 0) {
          txt = $(this.settings.template.prev_button).append(txt).addClass('disabled')[0].outerHTML;
        } else {
          txt = $(this.settings.template.prev_button).append(txt)[0].outerHTML;
        }
      } else {
        txt = '';
      }

      return txt;
    },
    create: function create(opts) {
      this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
      var buttonText = opts.$li.attr(this.add_namespace('data-button')) || opts.$li.attr(this.add_namespace('data-text')),
          prevButtonText = opts.$li.attr(this.add_namespace('data-button-prev')) || opts.$li.attr(this.add_namespace('data-prev-text')),
          tipClass = opts.$li.attr('class'),
          $tip_content = $(this.tip_template({
        tip_class: tipClass,
        index: opts.index,
        button_text: buttonText,
        prev_button_text: prevButtonText,
        li: opts.$li
      }));
      $(this.settings.tip_container).append($tip_content);
    },
    show: function show(init, is_prev) {
      var $timer = null; // are we paused?

      if (this.settings.$li === undefined || $.inArray(this.settings.$li.index(), this.settings.pause_after) === -1) {
        // don't go to the next li if the tour was paused
        if (this.settings.paused) {
          this.settings.paused = false;
        } else {
          this.set_li(init, is_prev);
        }

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0) {
          if (init) {
            //run when we first start
            this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);

            if (this.settings.modal) {
              this.show_modal();
            }
          }

          this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);

          if (this.settings.modal && this.settings.expose) {
            this.expose();
          }

          this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));
          this.settings.timer = parseInt(this.settings.timer, 10);
          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location]; // scroll and hide bg if not modal and not expose

          if (!/body/i.test(this.settings.$target.selector) && !this.settings.expose) {
            var joyridemodalbg = $('.joyride-modal-bg');

            if (/pop/i.test(this.settings.tipAnimation)) {
              joyridemodalbg.hide();
            } else {
              joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);
            }

            this.scroll_to();
          }

          if (this.is_phone()) {
            this.pos_phone(true);
          } else {
            this.pos_default(true);
          }

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

          if (/pop/i.test(this.settings.tip_animation)) {
            $timer.width(0);

            if (this.settings.timer > 0) {
              this.settings.$next_tip.show();
              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);
            } else {
              this.settings.$next_tip.show();
            }
          } else if (/fade/i.test(this.settings.tip_animation)) {
            $timer.width(0);

            if (this.settings.timer > 0) {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();
              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);
            } else {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
            }
          }

          this.settings.$current_tip = this.settings.$next_tip; // skip non-existant targets
        } else if (this.settings.$li && this.settings.$target.length < 1) {
          this.show(init, is_prev);
        } else {
          this.end();
        }
      } else {
        this.settings.paused = true;
      }
    },
    is_phone: function is_phone() {
      return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
    },
    hide: function hide() {
      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      if (!this.settings.modal) {
        $('.joyride-modal-bg').hide();
      } // Prevent scroll bouncing...wait to remove from layout


      this.settings.$current_tip.css('visibility', 'hidden');
      setTimeout($.proxy(function () {
        this.hide();
        this.css('visibility', 'visible');
      }, this.settings.$current_tip), 0);
      this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
    },
    set_li: function set_li(init, is_prev) {
      if (init) {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
        this.set_next_tip();
        this.settings.$current_tip = this.settings.$next_tip;
      } else {
        if (is_prev) {
          this.settings.$li = this.settings.$li.prev();
        } else {
          this.settings.$li = this.settings.$li.next();
        }

        this.set_next_tip();
      }

      this.set_target();
    },
    set_next_tip: function set_next_tip() {
      this.settings.$next_tip = $('.joyride-tip-guide').eq(this.settings.$li.index());
      this.settings.$next_tip.data('closed', '');
    },
    set_target: function set_target() {
      var cl = this.settings.$li.attr(this.add_namespace('data-class')),
          id = this.settings.$li.attr(this.add_namespace('data-id')),
          $sel = function $sel() {
        if (id) {
          return $(document.getElementById(id));
        } else if (cl) {
          return $('.' + cl).first();
        } else {
          return $('body');
        }
      };

      this.settings.$target = $sel();
    },
    scroll_to: function scroll_to() {
      var window_half, tipOffset;
      window_half = $(window).height() / 2;
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());

      if (tipOffset != 0) {
        $('html, body').stop().animate({
          scrollTop: tipOffset
        }, this.settings.scroll_speed, 'swing');
      }
    },
    paused: function paused() {
      return $.inArray(this.settings.$li.index() + 1, this.settings.pause_after) === -1;
    },
    restart: function restart() {
      this.hide();
      this.settings.$li = undefined;
      this.show('init');
    },
    pos_default: function pos_default(init) {
      var $nub = this.settings.$next_tip.find('.joyride-nub'),
          nub_width = Math.ceil($nub.outerWidth() / 2),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false; // tip must not be "display: none" to calculate position

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {
        var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0,
            leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;

        if (this.bottom()) {
          if (this.rtl) {
            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
              left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment
            });
          } else {
            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
              left: this.settings.$target.offset().left + leftAdjustment
            });
          }

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'top');
        } else if (this.top()) {
          if (this.rtl) {
            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
              left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
            });
          } else {
            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
              left: this.settings.$target.offset().left + leftAdjustment
            });
          }

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom');
        } else if (this.right()) {
          this.settings.$next_tip.css({
            top: this.settings.$target.offset().top + topAdjustment,
            left: this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment
          });
          this.nub_position($nub, this.settings.tip_settings.nub_position, 'left');
        } else if (this.left()) {
          this.settings.$next_tip.css({
            top: this.settings.$target.offset().top + topAdjustment,
            left: this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment
          });
          this.nub_position($nub, this.settings.tip_settings.nub_position, 'right');
        }

        if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {
          $nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');
          this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];
          this.settings.attempts++;
          this.pos_default();
        }
      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },
    pos_phone: function pos_phone(init) {
      var tip_height = this.settings.$next_tip.outerHeight(),
          tip_offset = this.settings.$next_tip.offset(),
          target_height = this.settings.$target.outerHeight(),
          $nub = $('.joyride-nub', this.settings.$next_tip),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;
      $nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {
        if (this.top()) {
          this.settings.$next_tip.offset({
            top: this.settings.$target.offset().top - tip_height - nub_height
          });
          $nub.addClass('bottom');
        } else {
          this.settings.$next_tip.offset({
            top: this.settings.$target.offset().top + target_height + nub_height
          });
          $nub.addClass('top');
        }
      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },
    pos_modal: function pos_modal($nub) {
      this.center();
      $nub.hide();
      this.show_modal();
    },
    show_modal: function show_modal() {
      if (!this.settings.$next_tip.data('closed')) {
        var joyridemodalbg = $('.joyride-modal-bg');

        if (joyridemodalbg.length < 1) {
          var joyridemodalbg = $(this.settings.template.modal);
          joyridemodalbg.appendTo('body');
        }

        if (/pop/i.test(this.settings.tip_animation)) {
          joyridemodalbg.show();
        } else {
          joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
        }
      }
    },
    expose: function expose() {
      var expose,
          exposeCover,
          el,
          origCSS,
          origClasses,
          randId = 'expose-' + this.random_str(6);

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
        el = this.settings.$target;
      } else {
        return false;
      }

      if (el.length < 1) {
        if (window.console) {
          console.error('element not valid', el);
        }

        return false;
      }

      expose = $(this.settings.template.expose);
      this.settings.$body.append(expose);
      expose.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });
      exposeCover = $(this.settings.template.expose_cover);
      origCSS = {
        zIndex: el.css('z-index'),
        position: el.css('position')
      };
      origClasses = el.attr('class') == null ? '' : el.attr('class');
      el.css('z-index', parseInt(expose.css('z-index')) + 1);

      if (origCSS.position == 'static') {
        el.css('position', 'relative');
      }

      el.data('expose-css', origCSS);
      el.data('orig-class', origClasses);
      el.attr('class', origClasses + ' ' + this.settings.expose_add_class);
      exposeCover.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });

      if (this.settings.modal) {
        this.show_modal();
      }

      this.settings.$body.append(exposeCover);
      expose.addClass(randId);
      exposeCover.addClass(randId);
      el.data('expose', randId);
      this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
      this.add_exposed(el);
    },
    un_expose: function un_expose() {
      var exposeId,
          el,
          expose,
          origCSS,
          origClasses,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
        el = this.settings.$target;
      } else {
        return false;
      }

      if (el.length < 1) {
        if (window.console) {
          console.error('element not valid', el);
        }

        return false;
      }

      exposeId = el.data('expose');
      expose = $('.' + exposeId);

      if (arguments.length > 1) {
        clearAll = arguments[1];
      }

      if (clearAll === true) {
        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
      } else {
        expose.remove();
      }

      origCSS = el.data('expose-css');

      if (origCSS.zIndex == 'auto') {
        el.css('z-index', '');
      } else {
        el.css('z-index', origCSS.zIndex);
      }

      if (origCSS.position != el.css('position')) {
        if (origCSS.position == 'static') {
          // this is default, no need to set it.
          el.css('position', '');
        } else {
          el.css('position', origCSS.position);
        }
      }

      origClasses = el.data('orig-class');
      el.attr('class', origClasses);
      el.removeData('orig-classes');
      el.removeData('expose');
      el.removeData('expose-z-index');
      this.remove_exposed(el);
    },
    add_exposed: function add_exposed(el) {
      this.settings.exposed = this.settings.exposed || [];

      if (el instanceof $ || _typeof(el) === 'object') {
        this.settings.exposed.push(el[0]);
      } else if (typeof el == 'string') {
        this.settings.exposed.push(el);
      }
    },
    remove_exposed: function remove_exposed(el) {
      var search, i;

      if (el instanceof $) {
        search = el[0];
      } else if (typeof el == 'string') {
        search = el;
      }

      this.settings.exposed = this.settings.exposed || [];
      i = this.settings.exposed.length;

      while (i--) {
        if (this.settings.exposed[i] == search) {
          this.settings.exposed.splice(i, 1);
          return;
        }
      }
    },
    center: function center() {
      var $w = $(window);
      this.settings.$next_tip.css({
        top: ($w.height() - this.settings.$next_tip.outerHeight()) / 2 + $w.scrollTop(),
        left: ($w.width() - this.settings.$next_tip.outerWidth()) / 2 + $w.scrollLeft()
      });
      return true;
    },
    bottom: function bottom() {
      return /bottom/i.test(this.settings.tip_settings.tip_location);
    },
    top: function top() {
      return /top/i.test(this.settings.tip_settings.tip_location);
    },
    right: function right() {
      return /right/i.test(this.settings.tip_settings.tip_location);
    },
    left: function left() {
      return /left/i.test(this.settings.tip_settings.tip_location);
    },
    corners: function corners(el) {
      if (el.length === 0) {
        return [false, false, false, false];
      }

      var w = $(window),
          window_half = w.height() / 2,
          //using this to calculate since scroll may not have finished yet.
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
          right = w.width() + w.scrollLeft(),
          offsetBottom = w.height() + tipOffset,
          bottom = w.height() + w.scrollTop(),
          top = w.scrollTop();

      if (tipOffset < top) {
        if (tipOffset < 0) {
          top = 0;
        } else {
          top = tipOffset;
        }
      }

      if (offsetBottom > bottom) {
        bottom = offsetBottom;
      }

      return [el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left];
    },
    visible: function visible(hidden_corners) {
      var i = hidden_corners.length;

      while (i--) {
        if (hidden_corners[i]) {
          return false;
        }
      }

      return true;
    },
    nub_position: function nub_position(nub, pos, def) {
      if (pos === 'auto') {
        nub.addClass(def);
      } else {
        nub.addClass(pos);
      }
    },
    startTimer: function startTimer() {
      if (this.settings.$li.length) {
        this.settings.automate = setTimeout(function () {
          this.hide();
          this.show();
          this.startTimer();
        }.bind(this), this.settings.timer);
      } else {
        clearTimeout(this.settings.automate);
      }
    },
    end: function end(abort) {
      if (this.settings.cookie_monster) {
        $.cookie(this.settings.cookie_name, 'ridden', {
          expires: this.settings.cookie_expires,
          domain: this.settings.cookie_domain
        });
      }

      if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
      }

      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      } // Unplug keystrokes listener


      $(this.scope).off('keyup.joyride');
      this.settings.$next_tip.data('closed', true);
      this.settings.riding = false;
      $('.joyride-modal-bg').hide();
      this.settings.$current_tip.hide();

      if (typeof abort === 'undefined' || abort === false) {
        this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
        this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
      }

      $('.joyride-tip-guide').remove();
    },
    off: function off() {
      $(this.scope).off('.joyride');
      $(window).off('.joyride');
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
      $('.joyride-tip-guide, .joyride-modal-bg').remove();
      clearTimeout(this.settings.automate);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55537" + '/');

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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.joyride.js"], null)
//# sourceMappingURL=/foundation.joyride.7dced71a.js.map