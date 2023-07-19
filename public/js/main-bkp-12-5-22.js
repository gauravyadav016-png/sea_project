(function ($) {
    'use strict';
	// Input Box Placeholder
	// function fnremove(arg,val)	{
	// 	if (arg.value == '') {arg.value = val}
	// }	
	// function fnshow(arg,val)	{
	// 	if (arg.value == val) {arg.value = ''}
	// }
	


    /*------------- preloader js --------------*/
	// function loader() {
	// 	$(window).on('load', function () {
	// 		$('#ctn-preloader').addClass('loaded');
	// 		$("#loading").fadeOut(500);
	// 		// Una vez haya terminado el preloader aparezca el scroll

	// 		if ($('#ctn-preloader').hasClass('loaded')) {
	// 			// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
	// 			$('#preloader').delay(900).queue(function () {
	// 				$(this).remove();
	// 			});
	// 		}
	// 	});
	// }
	// loader();


	/*=========================================
    =            Preloader active            =
    ===========================================*/

    jQuery(window).on('load', function(){
        $(".preloader-activate").removeClass('preloader-active');
    });
    
    
    jQuery(window).on('load', function(){
		setTimeout(function(){
        jQuery('.open_tm_preloader').addClass('loaded');
        }, 500);
	});
    /*=========================================
    =            Preloader active            =
    ===========================================*/


	// $(window).on('load', function() {
	// 	$('.preloader').addClass('loaded');
	// 	if ($('.preloader').hasClass('loaded')) {
	// 	  $('.spinner').delay(1000).queue(function () {
	// 		$(this).remove();
	// 	  });
	// 	}
	// });

	

	$(document).ready(function() {

		$(window).scroll(function(e){
			var scrollTop = $(window).scrollTop();
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var scrollPercent = (scrollTop) / (docHeight - winHeight);
			var scrollPercentRounded = Math.round(scrollPercent*100);

			$('#scrollPercentLabel>span').html(scrollPercentRounded);
			repositionLabel();
		});

		$(window).resize(function(){
			repositionLabel();
		});

		function repositionLabel() {
			$('#scrollPercentLabel').css({
				// position:'fixed',
				// left: ($(window).width() - $('#scrollPercentLabel').outerWidth()) / 2,
				// top: (($(window).height() - $('#scrollPercentLabel').outerHeight()) / 2) - $('#scrollPercentLabel').height()
			});
		}

		repositionLabel();

	});



	// //scroll to top 
	// $(document).ready(function() {
	// 	$(window).scroll(function(e){
	// 		var scrollTop = $(window).scrollTop();
	// 		var docHeight = $(document).height();
	// 		var winHeight = $(window).height();
	// 		var scrollPercent = (scrollTop) / (docHeight - winHeight);
	// 		var scrollPercentRounded = Math.round(scrollPercent*100);

	// 		$('#scrollPercentLabel>span').html(scrollPercentRounded);
	// 		repositionLabel();
	// 	});

	// 	$(window).resize(function(){
	// 		repositionLabel();
	// 	});

	// 	function repositionLabel() {
	// 		$('#scrollPercentLabel').css({
	// 			//position:'fixed',
	// 			//left: ($(window).width() - $('#scrollPercentLabel').outerWidth()) / 2,
	// 			//top: (($(window).height() - $('#scrollPercentLabel').outerHeight()) / 2) - $('#scrollPercentLabel').height()
	// 		});
	// 	}
	// 	repositionLabel();
	// });

	// window.onscroll = function () {
	// 	scrollRotate();
	// };
	
	// function scrollRotate() {
	// 	let image = document.getElementById(".img-rotate");
	// 	image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
	// }






	/*=============================================
    =       Menu sticky & Scroll to top          =
    =============================================*/
	var windows = $(window);
	var screenSize = windows.width();
	var sticky = $('.header-sticky');
	//var $html = $('html');
	//var $body = $('body');

	windows.on('scroll', function () {
		var scroll = windows.scrollTop();
		var headerHeight = sticky.height();

		if (screenSize >= 120) {
			if (scroll < headerHeight) {
				sticky.removeClass('is-sticky');
			} else {
				sticky.addClass('is-sticky');
            }
		}

    });

	// $(window).on("load", function () {
	// 	background();
	// });
	

    // // background image js
	// function background() {
	// 		var img=$('.bg_img');
	// 		img.css('background-image', function () {
	// 		var bg = ('url(' + $(this).data('background') + ')');
	// 		return bg;
	// 	});
	// }


	// Parallax background
    // function bgParallax() {
    //     if ($(".parallax").length) {
    //         $(".parallax").each(function() {
    //             var height = $(this).position().top;
    //             var resize     = height - $(window).scrollTop();
    //             var doParallax = -(resize/5);
    //             var positionValue   = doParallax + "px";
    //             var img = $(this).data("bg-image");

    //             $(this).css({
    //                 backgroundImage: "url(" + img + ")",
    //                 backgroundPosition: "50%" + positionValue,
    //                 backgroundSize: "cover"
    //             });
    //         });
    //     }
    // }

	$(function(){
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
          //$('#ios-notice').removeClass('hidden');
          $('.parallax-container').height( $(window).height() * 0.5 | 0 );
        } else {
          $(window).resize(function(){
            var parallaxHeight = Math.max($(window).height() * 0.88, 100) | 0;
            $('.parallax-container').height(parallaxHeight) + 20 + 'px';
          }).trigger('resize');
        }
    });


    // // Hero slider background setting
    // function sliderBgSetting() {
    //     if ($(".hero-slider .slide").length) {
    //         $(".hero-slider .slide").each(function() {
    //             var $this = $(this);
    //             var img = ($this.find(".slider-bg").attr("src")) ? $this.find(".slider-bg").attr("src") : false;

    //             if(img) {
    //                 $this.css({
    //                     backgroundImage: "url("+ img +")",
    //                     backgroundSize: "cover",
    //                     backgroundPosition: "center center"
    //                 })
    //             }
    //         });
    //     }
    // }

    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear',
            });
        }
    }

    //Active heor slider
    heroSlider();

    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each( function(index){
        menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }      
            },

            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

	// bannerSlide 
	// var slider = $('.hero');
	// slider.owlCarousel({
	// 	items: 1,
	// 	loop: true,
	// 	margin: 0,
	// 	smartSpeed: 800,
	// 	animateIn: 'fadeIn',
	// 	animateOut: 'fadeOut',
	// 	loop: true,
	// 	slideSpeed: 3000,
	// 	nav: true,
	// 	dots: false,
	// 	navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
	// 	//autoplay: true,
	// });

	// slider.on('translate.owl.carousel', function () {
	// 	var layer = $("[data-animation]");
	// 	layer.each(function () {
	// 		var s_animation = $(this).data('animation');
	// 		$(this).removeClass('animated ' + s_animation).css('opacity', '0');
	// 	});
	// });

	// $("[data-delay]").each(function () {
	// 	var animation_del = $(this).data('delay');
	// 	$(this).css('animation-delay', animation_del);
	// });

	// $("[data-duration]").each(function () {
	// 	var animation_dur = $(this).data('duration');
	// 	$(this).css('animation-duration', animation_dur);
	// });

	// slider.on('translated.owl.carousel', function () {
	// 	var layer = slider.find('.owl-item.active').find("[data-animation]");
	// 	layer.each(function () {
	// 		var s_animation = $(this).data('animation');
	// 		$(this).addClass('animated ' + s_animation).css("opacity", "1");
	// 	});
	// });

	// Testimonial js
	// var testimonial = $('.testimonial');
	// testimonial.owlCarousel({
	// 	items: 1,
	// 	loop: true,
	// 	margin: 0,
	// 	loop: true,
	// 	slideSpeed: 3000,
	// 	nav: false,
	// 	dots: false,
	// });

	// var testimonial2 = $('.testimonial__2');
	// testimonial2.owlCarousel({
	// 	items: 1,
	// 	loop: true,
	// 	margin: 0,
	// 	loop: true,
	// 	slideSpeed: 3000,
	// 	dots: false,
	// 	nav: true,
	// 	navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
	// });

	// var testimonial3 = $('.testimonial__3');
	// testimonial3.owlCarousel({
	// 	items: 1,
	// 	loop: true,
	// 	margin: 0,
	// 	loop: true,
	// 	slideSpeed: 3000,
	// 	dots: false,
	// 	nav: true,
	// 	navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
	// });



	// apps carousel
	var brand = $('#app-carousel');
	brand.owlCarousel({
		loop: true,
		margin: 20,
		loop: false,
		slideSpeed: 3000,
		nav: false,
		dots: false,
		autoplay : false,
		smartSpeed: 500,
		responsiveClass:true,
		responsive: {
			0: {
				items: 1,
				margin: 10,
				dots: true,
				loop: true,
			},

			480: {
				items: 1,
				margin: 20,
				dots: true,
				loop: true
			},

			640: {
				items: 2,
				margin: 20,
				dots: true,
				loop: true
			},
			768: {
				items: 3
			},
			1024: {
				items: 3
			},
			1200: {
				items: 3
			},
			1500: {
				items: 3
			}
		}
	});


	// testimonial
	var brand = $('.test-carousel');
	brand.owlCarousel({
		loop: true,
		margin: 30,
		items: 1,
		slideSpeed: 3000,
		nav: true,
		navText: ["<i class='icon ion-android-arrow-back'></i>", "<i class='icon ion-android-arrow-forward'></i>"],
		dots: false,
		smartSpeed:1000,
		responsiveClass:true		
	});


	// grid carousel
	var brand = $('.grid-carousel');
	brand.owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		slideSpeed: 20000,
		autoplay : true,
		nav: false,
		navText: ["<i class='icon ion-android-arrow-back'></i>", "<i class='icon ion-android-arrow-forward'></i>"],
		dots: true,
		smartSpeed:1000,
		responsiveClass:true		
	});

    
	// partner
	var brand = $('.partner-car');
	brand.owlCarousel({
		loop: true,
		margin: 20,
		slideSpeed: 3000,
		nav: false,
		dots: false,
		autoplay : true,
		smartSpeed: 500,
		responsiveClass:true,
		responsive: {
			0: {
				items: 2,
				margin: 0
			},

			480: {
				items: 2,
				margin: 0
			},

			640: {
				items: 3,
				margin: 0
			},
			768: {
				items: 3
			},
			1024: {
				items: 4
			},
			1200: {
				items: 4
			},
			1500: {
				items: 4
			}
		}
	});





	// case studies
var brand = $('.case-carousel');
brand.owlCarousel({
	loop: true,
	margin: 0,
	items: 1,
	loop: true,
	slideSpeed: 3000,
	nav: true,	
	dots: false,
	smartSpeed:1000,
	responsiveClass:true		
});

// app-portfolio
var brand = $('.process-carousel');
	brand.owlCarousel({
		loop: true,
		margin: 30,
		items: 3,
		loop: true,
		slideSpeed: 3000,
		nav: true,
		navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
		dots: false,
		smartSpeed:1000,
		responsiveClass:true,
		responsive: {
			0: {
				items: 1,
				margin: 0
			},
			450: {
				items: 2,
				margin: 0
			},
			768: {
				items: 3,
				margin: 20
			},
			1200: {
				items: 3
			},
			1500: {
				items: 3
			}
		}		
	});


	var brand = $('.screens-app');
	brand.owlCarousel({
		loop: true,
		margin: 30,
		items: 3,
		loop: true,
		slideSpeed: 3000,
		nav: true,
		navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
		dots: false,
		smartSpeed:1000,
		responsiveClass:true,
		responsive: {
			0: {
				items: 1,
				margin: 0
			},
			450: {
				items: 2,
				margin: 0
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			},
			1500: {
				items: 4
			}
		}
	});
	


	// postbox_gallery active
	// var gallery = $('.post_gallery');
	// gallery.owlCarousel({
	// 	items: 1,
	// 	loop: true,
	// 	smartSpeed: 800,
	// 	nav: false,
	// 	animateIn: 'fadeIn',
	// 	animateOut: 'fadeOut',
	// 	dots: false,
	// 	nav: true,
	// 	navText: ["<i class='fal fa-arrow-left'></i>", "<i class='fal fa-arrow-right'></i>"],
	// 	dots: false,
	// });

	// js - tilt
	// if ($(".js-tilt").length) {
	// 	$('.js-tilt').tilt();
	// }

	// Activate lightcase
	//$('a[data-rel^=lightcase]').lightcase();

	// Nice select js
	$('select').niceSelect();

	// Active Odometer Counter 
	jQuery('.odometer').appear(function (e) {
		var odo = jQuery(".odometer");
		odo.each(function () {
			var countNumber = jQuery(this).attr("data-count");
			jQuery(this).html(countNumber);
		});
	});

	// // remove faq active class
	// $(".card__header").on("click", function () {
	// 	$(".btn-link").removeClass("active");
	// });

	
	/* Search Js
    -----------------------------------*/
	// var $searchWrap = $('.search-wrap');
	// var $navSearch = $('.search-btn');
	// var $searchClose = $('#search-close');

	$('.search-icon').on('click', function (e) {
		e.preventDefault();
		$('.search-wrap').animate({ opacity: 'toggle' }, 500);
		$('#search-close').add($('#search-close')).addClass("open");

		$('.menu-drawer').removeClass("open");
		$(".toggle-menu").removeClass("active");

	});

	$('#search-close').on('click', function (e) {
		e.preventDefault();
		$('.search-wrap').animate({ opacity: 'toggle' }, 500);
		$('.search-btn').add($('#search-close')).removeClass("open");
	});

	// function closeSearch() {
	// 	$('.search-wrap').fadeOut(200);
	// 	$('.search-btn').add($('#search-close')).removeClass("open");
	// }

	// $(document.body).on('click', function (e) {
	// 	closeSearch();
	// });

	$(".search-icon, .main-search-input").on('click', function (e) {
		e.stopPropagation();
	});


	//form

	$(document).ready(function(){
		var formInputs = $('input[type="email"],input[type="password"], input[type="text"], textarea');
		formInputs.focus(function() {
		   $(this).parent().children('p.formLabel').addClass('formTop');
		   //$('div#formWrapper').addClass('darken-bg');
		   //$('div.logo').addClass('logo-active');
		});
		formInputs.focusout(function() {
			if ($.trim($(this).val()).length == 0){
			$(this).parent().children('p.formLabel').removeClass('formTop');
			}
			//$('div#formWrapper').removeClass('darken-bg');
			//$('div.logo').removeClass('logo-active');
		});
		$('p.formLabel').click(function(){
			 $(this).parent().children('.form-style').focus();
		});
	});


	// masonry layout - start
	// --------------------------------------------------
	var $grid = $('.grid').imagesLoaded( function() {
		$grid.masonry({
		itemSelector: '.grid-item',
		percentPosition: false,
		columnWidth: '.grid-sizer',
		gutter: 5
		}); 
	});	


	var $grid_case = $('.case-studies-sec .grid').imagesLoaded( function() {
		$grid_case.masonry({
		itemSelector: '.case-studies-sec .grid-item',
		percentPosition: false,
		columnWidth: '.case-studies-sec .grid-sizer',
		gutter: 20
		}); 
	});	
	// masonry layout - end
	// --------------------------------------------------




	var btn = $('.scroll-to-top');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 200) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});



	$(function() {
		//to set the dimensions of images
		var i;
		for (i = 1; i <= 2; i++) {
			$(".scroll-to-top").eq(i - 1).height(160 * (i / 2));
			$(".scroll-to-top").eq(i - 1).width(160 * (i / 2));
		}
	
		$(window).scroll(function() {
			var theta  = $(window).scrollTop();
			$(".scroll-to-top img").css({ transform: "rotate(" + theta + "deg)" });
			//$("#reload").css({ transform: "rotate(-" + theta + "deg)" });
		});
	});


	// $(function() {
	// 	var header = $('.scroll');
	// 	//var menu = $('#menu');
	// 	var hieghtThreshold = $(".parallax-container").offset().top / 1.25;
	// 	var hieghtThreshold_end  = $(".parallax-container").offset().top + $(".parallax-container").height() ;
	// 	$(window).scroll(function() {
	// 		var scroll = $(window).scrollTop();
	
	// 		if (scroll >= hieghtThreshold && scroll <=  hieghtThreshold_end ) {
	// 			header.addClass('dark');
	// 			//menu.addClass('dark');
	// 		} else {
	// 			header.removeClass('dark');
	// 			//menu.removeClass('dark');
	// 		}
	// 	});

	
		
	// 	var footer = $('html');
	// 	var hieghtThreshold_1 = $(".footer").offset().top / 1.1 - 100;
	// 	//var hieghtThreshold_end1 = $(".footer").offset().top + $(".footer").height() ;
	// 	$(window).scroll(function() {
	// 		var scroll_1 = $(window).scrollTop();
	
	// 		if (scroll_1 >= hieghtThreshold_1) {
	// 			footer.addClass('dark');
	// 			//menu.addClass('dark');
	// 		} else {
	// 			footer.removeClass('dark');
	// 			//menu.removeClass('dark');
	// 		}
	// 	});

	// })


	// $(document).ready(function() {
	// 	menu_width()
	// });

	// $(window).resize(function(){ 
	// 	menu_width()
	// });

	// function menu_width() {
	// 	var w = $(window).width();
	// 	$('.megamenu--mega').css('max-width', w);
	// }
})(jQuery);



(function ($) {
	"use strict";
	var cursor = document.querySelector(".cursor");
	var cursorinner = document.querySelector(".cursor2");
	var a = document.querySelectorAll("a, button, #search-close, .swiper-button-next, .swiper-button-prev, .owl-nav");
	document.addEventListener("mousemove", function (e) {
		var x = e.clientX;
		var y = e.clientY;
		cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
	});
	$("a, button, #search-close,  .swiper-button-next, .swiper-button-prev, .owl-nav").hover(
		function () {
			$(".cursor2").css({ "background-color": "transparent" });
		},
		function () {
			$(".cursor2").css({ "background-color": "#ef5e1f" });
		}
	);
	document.addEventListener("mousemove", function (e) {
		var x = e.clientX;
		var y = e.clientY;
		cursorinner.style.left = x + "px";
		cursorinner.style.top = y + "px";
	});
	document.addEventListener("mousedown", function () {
		cursor.classList.add("click");
		cursorinner.classList.add("cursorinnerhover");
	});
	document.addEventListener("mouseup", function () {
		cursor.classList.remove("click");
		cursorinner.classList.remove("cursorinnerhover");
	});
	a.forEach((item) => {
		item.addEventListener("mouseover", () => {
			cursor.classList.add("hover");
		});
		item.addEventListener("mouseleave", () => {
			cursor.classList.remove("hover");
		});
	});

})(jQuery);




// FAQ Accordion JS
$('.accordion').find('.accordion-title').on('click', function(){
	// Adds Active Class
	$(this).toggleClass('active');
	// Expand or Collapse This Panel
	$(this).next().slideToggle('fast');
	// Hide The Other Panels
	$('.accordion-content').not($(this).next()).slideUp('fast');
	// Removes Active Class From Other Titles
	$('.accordion-title').not($(this)).removeClass('active');		
});

// Tabs JS
$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
$('.tab ul.tabs li').on('click', function (g) {
	var tab = $(this).closest('.tab'), 
	index = $(this).closest('li').index();
	tab.find('ul.tabs > li').removeClass('current');
	$(this).closest('li').addClass('current');
	tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
	tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
	g.preventDefault();
});

// case studies
var brand = $('.case-carousel');
brand.owlCarousel({
	loop: true,
	margin: 0,
	items: 1,
	loop: true,
	slideSpeed: 3000,
	nav: true,	
	dots: false,
	smartSpeed:1000,
	responsiveClass:true		
});



$(document).ready(function() {
	footermenu();
});

// $(window).resize(function(){	  
// });

function footermenu()
{ 
	//var width = $(window).width();
   // var height = $(window).height();	
	
	$('h4.widget-title').click(function(e) {
	
	if( width = $(window).width() <= 767)
	{
		// footer accordion script
		//$('.f-nav h2').addClass('toggle');
		
		e.preventDefault();  
		var $this = $(this);			
	  
		if ($this.next().hasClass('show')) {
			$this.next().removeClass('show');
			$this.next().slideUp(350);	  
			$this.removeClass('act');			
		} else {
			$this.parent().parent().parent().find('.footer-widget ul').removeClass('show');
			$this.parent().parent().parent().find('.footer-widget ul').slideUp(350);				
			$this.parent().parent().parent().find('.widget-title').removeClass('act'); // active 				
			$this.next().toggleClass('show');
			$this.next().slideToggle(350);					
			$this.toggleClass('act')
		}		
	}		
  })
  
  
}

$(function() {
	$(".toggle-menu").click(function() {
		$(this).toggleClass("active");
		$('.menu-drawer').toggleClass("open");
		$('body').toggleClass('scroll-hidden');
	});
});