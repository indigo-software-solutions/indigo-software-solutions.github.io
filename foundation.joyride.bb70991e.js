parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"6ran":[function(require,module,exports) {
function t(s){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(s)}!function(s,i,e,n){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.5.3",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(t,i,e){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||s.extend({},this.defaults,e||i),this.bindings(i,e)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var t=this;s(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(t){t.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(t){t.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(t){t.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(t){if(this.settings.keyboard&&this.settings.riding)switch(t.which){case 39:t.preventDefault(),this.go_next();break;case 37:t.preventDefault(),this.go_prev();break;case 27:t.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),s(i).off(".joyride").on("resize.fndtn.joyride",t.throttle(function(){if(s("["+t.attr_name()+"]").length>0&&t.settings.$next_tip&&t.settings.riding){if(t.settings.exposed.length>0)s(t.settings.exposed).each(function(){var i=s(this);t.un_expose(i),t.expose(i)});t.is_phone()?t.pos_phone():t.pos_default(!1)}},100))},start:function(){var t=this,i=s("["+this.attr_name()+"]",this.scope),e=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],n=e.length;!i.length>0||(this.settings.init||this.events(),this.settings=i.data(this.attr_name(!0)+"-init"),this.settings.$content_el=i,this.settings.$body=s(this.settings.tip_container),this.settings.body_offset=s(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof s.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!s.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(i){var o=s(this);this.settings=s.extend({},t.defaults,t.data_options(o));for(var h=n;h--;)t.settings[e[h]]=parseInt(t.settings[e[h]],10);t.create({$li:o,index:i})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(t){var i,e;return t.tip_class=t.tip_class||"",i=s(this.settings.template.tip).addClass(t.tip_class),e=s.trim(s(t.li).html())+this.prev_button_text(t.prev_button_text,t.index)+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),i.append(s(this.settings.template.wrapper)),i.first().attr(this.add_namespace("data-index"),t.index),s(".joyride-content-wrapper",i).append(e),i[0]},timer_instance:function(t){return 0===t&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":s(this.settings.template.timer)[0].outerHTML},button_text:function(t){return this.settings.tip_settings.next_button?(t=s.trim(t)||"Next",t=s(this.settings.template.button).append(t)[0].outerHTML):t="",t},prev_button_text:function(t,i){return this.settings.tip_settings.prev_button?(t=s.trim(t)||"Previous",t=0==i?s(this.settings.template.prev_button).append(t).addClass("disabled")[0].outerHTML:s(this.settings.template.prev_button).append(t)[0].outerHTML):t="",t},create:function(t){this.settings.tip_settings=s.extend({},this.settings,this.data_options(t.$li));var i=t.$li.attr(this.add_namespace("data-button"))||t.$li.attr(this.add_namespace("data-text")),e=t.$li.attr(this.add_namespace("data-button-prev"))||t.$li.attr(this.add_namespace("data-prev-text")),n=t.$li.attr("class"),o=s(this.tip_template({tip_class:n,index:t.index,button_text:i,prev_button_text:e,li:t.$li}));s(this.settings.tip_container).append(o)},show:function(t,i){var e=null;if(void 0===this.settings.$li||-1===s.inArray(this.settings.$li.index(),this.settings.pause_after))if(this.settings.paused?this.settings.paused=!1:this.set_li(t,i),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0){if(t&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=s.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],!/body/i.test(this.settings.$target.selector)&&!this.settings.expose){var n=s(".joyride-modal-bg");/pop/i.test(this.settings.tipAnimation)?n.hide():n.fadeOut(this.settings.tipAnimationFadeSpeed),this.scroll_to()}this.is_phone()?this.pos_phone(!0):this.pos_default(!0),e=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(e.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(e.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(t,i):this.end();else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||s(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(s.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(t,s){t?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=s?this.settings.$li.prev():this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=s(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr(this.add_namespace("data-class")),i=this.settings.$li.attr(this.add_namespace("data-id"));this.settings.$target=i?s(e.getElementById(i)):t?s("."+t).first():s("body")},scroll_to:function(){var t,e;t=s(i).height()/2,0!=(e=Math.ceil(this.settings.$target.offset().top-t+this.settings.$next_tip.outerHeight()))&&s("html, body").stop().animate({scrollTop:e},this.settings.scroll_speed,"swing")},paused:function(){return-1===s.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=void 0,this.show("init")},pos_default:function(t){var s=this.settings.$next_tip.find(".joyride-nub"),i=Math.ceil(s.outerWidth()/2),e=Math.ceil(s.outerHeight()/2),n=t||!1;if(n&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(s);else{var o=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,h=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top+e+this.settings.$target.outerHeight()+o,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+h}):this.settings.$next_tip.css({top:this.settings.$target.offset().top+e+this.settings.$target.outerHeight()+o,left:this.settings.$target.offset().left+h}),this.nub_position(s,this.settings.tip_settings.nub_position,"top")):this.top()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-e+o,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-e+o,left:this.settings.$target.offset().left+h}),this.nub_position(s,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+o,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+i+h}),this.nub_position(s,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+o,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-i+h}),this.nub_position(s,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}n&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var i=this.settings.$next_tip.outerHeight(),e=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),n=s(".joyride-nub",this.settings.$next_tip),o=Math.ceil(n.outerHeight()/2),h=t||!1;n.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),h&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(n):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-i-o}),n.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+e+o}),n.addClass("top")),h&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(t){this.center(),t.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t;if((t=s(".joyride-modal-bg")).length<1)(t=s(this.settings.template.modal)).appendTo("body");/pop/i.test(this.settings.tip_animation)?t.show():t.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var t,e,n,o,h,a="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof s)n=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;n=this.settings.$target}if(n.length<1)return i.console&&console.error("element not valid",n),!1;t=s(this.settings.template.expose),this.settings.$body.append(t),t.css({top:n.offset().top,left:n.offset().left,width:n.outerWidth(!0),height:n.outerHeight(!0)}),e=s(this.settings.template.expose_cover),o={zIndex:n.css("z-index"),position:n.css("position")},h=null==n.attr("class")?"":n.attr("class"),n.css("z-index",parseInt(t.css("z-index"))+1),"static"==o.position&&n.css("position","relative"),n.data("expose-css",o),n.data("orig-class",h),n.attr("class",h+" "+this.settings.expose_add_class),e.css({top:n.offset().top,left:n.offset().left,width:n.outerWidth(!0),height:n.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(e),t.addClass(a),e.addClass(a),n.data("expose",a),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,n),this.add_exposed(n)},un_expose:function(){var t,e,n,o,h,a=!1;if(arguments.length>0&&arguments[0]instanceof s)e=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;e=this.settings.$target}if(e.length<1)return i.console&&console.error("element not valid",e),!1;t=e.data("expose"),n=s("."+t),arguments.length>1&&(a=arguments[1]),!0===a?s(".joyride-expose-wrapper,.joyride-expose-cover").remove():n.remove(),"auto"==(o=e.data("expose-css")).zIndex?e.css("z-index",""):e.css("z-index",o.zIndex),o.position!=e.css("position")&&("static"==o.position?e.css("position",""):e.css("position",o.position)),h=e.data("orig-class"),e.attr("class",h),e.removeData("orig-classes"),e.removeData("expose"),e.removeData("expose-z-index"),this.remove_exposed(e)},add_exposed:function(i){this.settings.exposed=this.settings.exposed||[],i instanceof s||"object"===t(i)?this.settings.exposed.push(i[0]):"string"==typeof i&&this.settings.exposed.push(i)},remove_exposed:function(t){var i,e;for(t instanceof s?i=t[0]:"string"==typeof t&&(i=t),this.settings.exposed=this.settings.exposed||[],e=this.settings.exposed.length;e--;)if(this.settings.exposed[e]==i)return void this.settings.exposed.splice(e,1)},center:function(){var t=s(i);return this.settings.$next_tip.css({top:(t.height()-this.settings.$next_tip.outerHeight())/2+t.scrollTop(),left:(t.width()-this.settings.$next_tip.outerWidth())/2+t.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(t){if(0===t.length)return[!1,!1,!1,!1];var e=s(i),n=e.height()/2,o=Math.ceil(this.settings.$target.offset().top-n+this.settings.$next_tip.outerHeight()),h=e.width()+e.scrollLeft(),a=e.height()+o,r=e.height()+e.scrollTop(),p=e.scrollTop();return o<p&&(p=o<0?0:o),a>r&&(r=a),[t.offset().top<p,h<t.offset().left+t.outerWidth(),r<t.offset().top+t.outerHeight(),e.scrollLeft()>t.offset().left]},visible:function(t){for(var s=t.length;s--;)if(t[s])return!1;return!0},nub_position:function(t,s,i){"auto"===s?t.addClass(i):t.addClass(s)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(t){this.settings.cookie_monster&&s.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),s(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,s(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),void 0!==t&&!1!==t||(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),s(".joyride-tip-guide").remove()},off:function(){s(this.scope).off(".joyride"),s(i).off(".joyride"),s(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),s(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate)},reflow:function(){}}}(jQuery,window,window.document);
},{}]},{},["6ran"], null)
//# sourceMappingURL=/foundation.joyride.bb70991e.js.map