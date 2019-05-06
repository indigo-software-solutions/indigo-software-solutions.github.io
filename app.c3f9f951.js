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
})({"js/app.js":[function(require,module,exports) {
'use strict';
/*global google */

var app = function (document, $) {
  var docElem = document.documentElement,
      _userAgentInit = function _userAgentInit() {
    docElem.setAttribute('data-useragent', navigator.userAgent);
  },
      _init = function _init() {
    $(document).foundation(); // needed to use joyride
    // doc: http://foundation.zurb.com/docs/components/joyride.html

    $(document).on('click', '#start-jr', function () {
      $(document).foundation('joyride', 'start');
    });

    _userAgentInit();
    /*
    Custom JS
    */
    // Detect browser unsupport css blend mode


    if (typeof window.getComputedStyle(document.body).backgroundBlendMode === 'undefined') {
      document.documentElement.className += ' no-background-blend-mode';
    } // Filter portfolio


    $('.portfolio').mixItUp(); // Simple Smooth scroll

    var link = $('.jumbotron__arrow-down, .top-bar-section a');
    var duration = 800;
    link.on('click', function () {
      var target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, duration);
      return false;
    }); // Scroll to top

    var scrollToTop = $('#scroll-to-top');
    var checkPoint = $('#site-intro').offset().top;
    $(window).scroll(function () {
      if ($(this).scrollTop() > checkPoint) {
        scrollToTop.addClass('is-visible');
      } else {
        scrollToTop.removeClass('is-visible');
      }
    });
    scrollToTop.on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, duration);
      return false;
    }); // Wow!!!

    var wow = new WOW({
      mobile: false,
      offset: 100
    });
    wow.init(); // animate skill

    var skill = $('#skills'); // animate funfact number

    var funfact = $('#funfact');

    var countUp = function countUp(selector) {
      selector.find('.counter').each(function () {
        var $t = $(this);
        var waypoint = $t.waypoint({
          handler: function handler(direction) {
            if (direction === 'down' && $t.hasClass('counter')) {
              $t.closest('div').find('.meter').css('width', $t.data('number') + '%');
              $t.animateNumber({
                number: $t.data('number')
              }, 2000);
              $t.removeClass('counter');
            }
          },
          offset: 'bottom-in-view'
        });
      });
    };

    countUp(skill);
    countUp(funfact); // Ajax contact form

    var contactForm = $('#contact-form');
    var formWrap = contactForm.closest('.content-wrap');
    contactForm.submit(function () {
      $.ajax({
        url: '//formspree.io/nguyenmanh1507@gmail.com',
        method: 'POST',
        data: {
          name: $('#cf-name').val(),
          email: $('#cf-email').val(),
          message: $('#cf-message').val()
        },
        beforeSend: function beforeSend() {
          formWrap.addClass('is-submit');
        },
        success: function success() {
          formWrap.removeClass('is-submit');
          contactForm.hide();
          $('#modalTitle').text('Thank you! I\'ll reply you soon.');
          window.setTimeout(function () {
            $('.close-reveal-modal').click();
          }, 2000);
        },
        dataType: 'json'
      });
      return false;
    });
    /*
    End Custom JS
    */
  };

  return {
    init: _init
  };
}(document, jQuery);

(function () {
  app.init();
})();
/*

Google Map

*/
// function initialize() {
// 	// Create array of styler
// 	var styles = [{'featureType':'all','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':'-100'},{'invert_lightness':true},{'lightness':'11'},{'gamma':'1.27'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'landscape.man_made','elementType':'all','stylers':[{'hue':'#ff0000'},{'visibility':'simplified'},{'invert_lightness':true},{'lightness':'-10'},{'gamma':'0.54'},{'saturation':'45'}]},{'featureType':'poi.business','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'saturation':'75'},{'lightness':'24'},{'gamma':'0.70'},{'invert_lightness':true}]},{'featureType':'poi.government','elementType':'all','stylers':[{'hue':'#ff0000'},{'visibility':'simplified'},{'invert_lightness':true},{'lightness':'-24'},{'gamma':'0.59'},{'saturation':'59'}]},{'featureType':'poi.medical','elementType':'all','stylers':[{'visibility':'simplified'},{'invert_lightness':true},{'hue':'#ff0000'},{'saturation':'73'},{'lightness':'-24'},{'gamma':'0.59'}]},{'featureType':'poi.park','elementType':'all','stylers':[{'lightness':'-41'}]},{'featureType':'poi.school','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'invert_lightness':true},{'saturation':'43'},{'lightness':'-16'},{'gamma':'0.73'}]},{'featureType':'poi.sports_complex','elementType':'all','stylers':[{'hue':'#ff0000'},{'saturation':'43'},{'lightness':'-11'},{'gamma':'0.73'},{'invert_lightness':true}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':'45'},{'lightness':'53'},{'gamma':'0.67'},{'invert_lightness':true},{'hue':'#ff0000'},{'visibility':'simplified'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#ff0000'},{'saturation':'38'},{'lightness':'-16'},{'gamma':'0.86'}]}];
// 	var styledMap = new google.maps.StyledMapType(styles, {name: 'Styled Map'});
//   var mapOptions = {
//     zoom: 16,
//     scrollwheel: false,
//     // draggable: false,
//     center: {lat: 45.478135, lng: 9.123812},
//     mapTypeContronlOptions: {
//     	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
//     }
//   };
//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//     mapOptions);
//   //Associate the styled map with the MapTypeId and set it to display.
//   map.mapTypes.set('map_style', styledMap);
//   map.setMapTypeId('map_style');
//   infowindow = new google.maps.InfoWindow();
//   var marker = new google.maps.Marker({
//     map: map,
//     // Define the place with a location, and a query string.
//     place: {
//       location: {lat: 45.478135, lng: 9.123812},
//       query: 'San Siro Stadium'
//     },
//     // Attributions help users find your site again.
//     attribution: {
//       source: 'Google Maps JavaScript API',
//       webUrl: 'https://developers.google.com/maps/'
//     }
//   });
//   // Construct a new InfoWindow.
//   var infowindow = new google.maps.InfoWindow({
//     content: 'Creative Company'
//   });
//   infowindow.open(map, marker);
// }
// google.maps.event.addDomListener(window, 'load', initialize);
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
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map