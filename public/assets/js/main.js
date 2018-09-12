(function($, undefined) {
	'use strict';
 
	//==== Selector Cache Object ====
	var cache = {}
	var cacheByContext = {}
	var tmp, tmp2

	var $$ = function(selector, context) {
		if(context) {
			if(tmp=context.selector) context = tmp

			tmp2 = cacheByContext[context]
			if(tmp2 === undefined) {
				tmp2 = cacheByContext[context] = {}
			}

			tmp = tmp2[selector]
			if(tmp !== undefined) return tmp

			return tmp2[selector] = $(selector, $$(context))
		}

		tmp = cache[selector]
		if(tmp !== undefined) return tmp

		return cache[selector] = $(selector)
	}

	var $$clear = function(selector, context) {
		if(context) {
			if(tmp=context.selector) context = tmp

			if(selector) {
				if(tmp = cacheByContext[context]) tmp[selector] = undefined
			}
			cacheByContext[context] = undefined
		} else {
			if(selector) {
				cache[selector] = undefined
				cacheByContext[selector] = undefined
			} else {
				cache = {}
				cacheByContext = {}
			}
		}
	}

	var $$fresh = function(selector, context) {
		$$clear(selector, context)
		return $$(selector, context)
	}

	$.fn.$$ = function(selector) {
		return $$(selector, this)
	}
	$.fn.$$clear = function(selector) {
		$$clear(selector, this)
	}
	$.fn.$$fresh = function(selector) {
		return $$fresh(selector, this)
	}

	//=============================================
	//Usage:
	//---------------------------------------------
	//$('#element') becomes $$('#element');
	//=============================================

	//==== Cache Selectors ====
	var win 			= $$(window),
		portfolio		= $$(".portfolio").find(".img-thumbnail"),
		body			= $$("html, body"),
		scrollup		= $$(".scrollup"),
		topMenu 		= $$(".nav"),
		topMenuHeight 	= topMenu.outerHeight()+15,
		mainMenu		= $$(".main-menu"),
		mainMenuScroll	= $$(".main-menu a, .scroll-to"),
		mainMenuItems	= mainMenu.find("a"),
		menuItems 		= topMenu.find("a");
		
	$(document).ready(function(){


		//==== Viewport variants ====
		if (navigator.userAgent.match(/iPhone/i)) {
			var meta = $('meta[name="viewport"]');
			win.on('orientationchange', function(event) {
				if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
					meta.attr('content', 'height=device-width,width=device-height,initial-scale=1.0,maximum-scale=1.0');
				} else {
					meta.attr('content', 'height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0');
				}
			}).trigger('orientationchange');
		}


		//==== Home Scene ====
		function homeSize() {
			$$('#home').css({height: win.height()});
		}

		homeSize();


		//==== Split ====
		function splitSize() {
			var wh = $( window ).height();
			var dh = $( '.footer' ).height();
			$$('.split').css({height: wh-dh});
		}

		splitSize();

		//==== Sticky Navigation ====
		if ( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			mainMenu.sticky({topSpacing: 0});
		} else {}



		var lastId,
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

		win.on('scroll', function (){
			var fromTop = $(this).scrollTop()+topMenuHeight;
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
				return this;
			});

			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
				lastId = id;
				menuItems
				.parent().removeClass("active")
				.end().filter("[href=\\#"+id+"]").parent().addClass("active");
			}
		});

		win.on('resize', function () {
			homeSize();
			splitSize();
		});

		//==== Scrolling ====
		mainMenuScroll.on('click', function() {
			var headerH = mainMenu.outerHeight();
			mainMenuItems.parent().removeClass('active');
			$(this).parent().addClass('active');
				body.animate({
				scrollTop: $($(this).attr("href")).offset().top - headerH+1 + "px"
			}, {
				duration: 1200,
				easing: "easeInOutExpo"
			});
			return false;
		});
	})
}(jQuery))