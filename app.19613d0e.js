parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QdeU":[function(require,module,exports) {
"use strict";var t=function(t,o){var e=t.documentElement;return{init:function(){o(t).foundation(),o(t).on("click","#start-jr",function(){o(t).foundation("joyride","start")}),e.setAttribute("data-useragent",navigator.userAgent),void 0===window.getComputedStyle(t.body).backgroundBlendMode&&(t.documentElement.className+=" no-background-blend-mode"),o(".portfolio").mixItUp();var n=o(".jumbotron__arrow-down, .top-bar-section a");n.on("click",function(){var t=o(this).attr("href");return o("html, body").animate({scrollTop:o(t).offset().top},800),!1});var a=o("#scroll-to-top"),i=o("#site-intro").offset().top;o(window).scroll(function(){o(this).scrollTop()>i?a.addClass("is-visible"):a.removeClass("is-visible")}),a.on("click",function(){return o("html, body").animate({scrollTop:0},800),!1}),new WOW({mobile:!1,offset:100}).init();var s=o("#skills"),r=o("#funfact"),c=function(t){t.find(".counter").each(function(){var t=o(this);t.waypoint({handler:function(o){"down"===o&&t.hasClass("counter")&&(t.closest("div").find(".meter").css("width",t.data("number")+"%"),t.animateNumber({number:t.data("number")},2e3),t.removeClass("counter"))},offset:"bottom-in-view"})})};c(s),c(r);var l=o("#contact-form"),u=l.closest(".content-wrap");l.submit(function(){return o.ajax({url:"//formspree.io/nguyenmanh1507@gmail.com",method:"POST",data:{name:o("#cf-name").val(),email:o("#cf-email").val(),message:o("#cf-message").val()},beforeSend:function(){u.addClass("is-submit")},success:function(){u.removeClass("is-submit"),l.hide(),o("#modalTitle").text("Thank you! I'll reply you soon."),window.setTimeout(function(){o(".close-reveal-modal").click()},2e3)},dataType:"json"}),!1})}}}(document,jQuery);t.init();
},{}]},{},["QdeU"], null)
//# sourceMappingURL=/app.19613d0e.js.map