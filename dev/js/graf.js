(function($) {
	var GRAF = (function() {

		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);

		return {
			common: {
				go: function(topPos, speed, callback) {
					var curTopPos = $sel.window.scrollTop(),
						diffTopPos = Math.abs(topPos - curTopPos);
					$sel.body.add($sel.html).animate({
						"scrollTop": topPos
					}, speed, function() {
						if(callback) {
							callback();
						}
					});
				}
			},

			header: {
				init: function() {
					var self = this;

					self.scroll.init();
					self.menu.init();
				},
				scroll: {
					init: function() {
						$sel.window.on("scroll", function() {
							var hh = $(".page-header").outerHeight(),
								sTop = $sel.window.scrollTop();
							if(sTop > hh) {
								$sel.body.addClass("fixed-header");
								setTimeout(function() {
									$sel.body.addClass("fixed-header--show");
								}, 100);
							} else {
								$sel.body.removeClass("fixed-header--show");
								$sel.body.removeClass("fixed-header");
							}
						});
					}
				},
				menu: {
					isOpen: false,
					$panel: null,
					$burger: null,
					init: function() {
						var self = this;

						self.$panel = $(".header-panel", $sel.body);
						self.$burger = $(".header-burger", $sel.body);

						self.$burger.on("click", function() {
							if(self.isOpen) {
								self.hide();
							} else {
								self.show();
							}
						});

						/*$sel.window.on("scroll", function() {
							if(self.isOpen) {
								self.hide();
							}
						});*/
					},
					show: function() {
						var self = this;

						self.$panel.css("display", "block");
						$sel.html.addClass("menu-open-html");
						setTimeout(function() {
							$sel.body.addClass("menu-open");
							self.isOpen = true;
						}, 100);
						self.$burger.addClass("active");
					},
					hide: function() {
						var self = this;

						$sel.body.removeClass("menu-open");
						$sel.html.removeClass("menu-open-html");
						setTimeout(function() {
							self.$panel.css("display", "none");
							self.isOpen = false;
						}, 350);
						self.$burger.removeClass("active");
					}
				}
			},

			maps: {
				init: function() {
			    	$(".map", $sel.body).each(function() {
			            var $map = $(this),
			            	lng = parseFloat($map.data("lng"), 10) || 0,
			            	lat = parseFloat($map.data("lat"), 10) || 0,
			            	zoom = parseInt($map.data("zoom"));

			            var options = {
							center: new google.maps.LatLng(lat, lng),
							zoom: zoom,
							mapTypeControl: false,
							panControl: false,
							zoomControl: true,
							zoomControlOptions: {
								style: google.maps.ZoomControlStyle.LARGE,
								position: google.maps.ControlPosition.TOP_RIGHT
							},
							scaleControl: true,
							streetViewControl: true,
							streetViewControlOptions: {
								position: google.maps.ControlPosition.TOP_RIGHT
							},
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							styles: [
								{"featureType": "landscape", "stylers": [
				                    {"saturation": -100},
				                    {"lightness": 0},
				                    {"visibility": "on"}
				                ]},
				                {"featureType": "poi", "stylers": [
				                    {"saturation": -300},
				                    {"lightness": -10},
				                    {"visibility": "simplified"}
				                ]},
				                {"featureType": "road.highway", "stylers": [
				                    {"saturation": -100},
				                    {"visibility": "simplified"}
				                ]},
				                {"featureType": "road.arterial", "stylers": [
				                    {"saturation": -100},
				                    {"lightness": 0},
				                    {"visibility": "on"}
				                ]},
				                {"featureType": "road.local", "stylers": [
				                    {"saturation": -100},
				                    {"lightness": 0},
				                    {"visibility": "on"}
				                ]},
				                {"featureType": "transit", "stylers": [
				                    {"saturation": -100},
				                    {"visibility": "simplified"}
				                ]},
				                {"featureType": "administrative.province", "stylers": [
				                    {"visibility": "off"}
				                ]},
				                {"featureType": "water", "elementType": "labels", "stylers": [
				                    {"visibility": "on"},
				                    {"lightness": -25},
				                    {"saturation": -100}
				                ]},
				                {"featureType": "water", "elementType": "geometry", "stylers": [
				                    {"hue": "#ffff00"},
				                    {"lightness": -25},
				                    {"saturation": -97}
				                ]}
				            ]
				        };

			            var api = new google.maps.Map($map[0], options);
			            var point = new google.maps.Marker({
			            	position: new google.maps.LatLng(lat, lng),
			            	map: api,
			                icon: $map.data("icon")
			            });

			        });
			    }
			},

			sliders: {
				promo: {
					init: function() {
						$(".promo-items", $sel.body).on("fotorama:ready", function(e, fotorama) {
							$(".promo-nav-item--prev", $sel.body).on("click", function() {
								fotorama.show("<");
							});
							$(".promo-nav-item--next", $sel.body).on("click", function() {
								fotorama.show(">");
							});
							$(".promo-nav-counter-all", $sel.body).text(fotorama.size);
							$(".promo-nav-counter-current", $sel.body).text(fotorama.activeIndex + 1);

							if($sel.window.width() < 800) {
								fotorama.setOptions({
									ratio: 1
								});
							}

						}).fotorama().on("fotorama:show", function(e, fotorama) {
							$(".promo-nav-counter-current", $sel.body).text(fotorama.activeIndex + 1);
						});
					}
				},

				restaurant: {
					init: function() {
						$(".restaurant-items", $sel.body).on("fotorama:ready", function(e, fotorama) {
							(function(f) {
								$(".restaurant-nav-item--prev", $sel.body).on("click", function() {
									f.show("<");
								});
								$(".restaurant-nav-item--next", $sel.body).on("click", function() {
									f.show(">");
								});
							})(fotorama);
						}).fotorama();
					}
				},

				big: {
					init: function() {
						$(".slider-items", $sel.body).on("fotorama:ready", function(e, fotorama) {
							(function(f) {
								$(".slider-items-arr--left", $sel.body).on("click", function() {
									f.show("<");
								});
								$(".slider-items-arr--right", $sel.body).on("click", function() {
									f.show(">");
								});

								if($sel.window.width() < 800) {
									fotorama.setOptions({
										ratio: 2/1,
										glimpse: 0
									});
								}

							})(fotorama);
						}).fotorama();
					}
				},

				serviceSlider: {
					init: function() {
						var sliders = $(".service-slider-list", $sel.body);

						sliders.each(function() {
							(function(elSlider) {
								var itemSlider = $(".service-slider-item", elSlider),
									navContainer = elSlider.parent(".service-slider").find(".service-slider-nav"),
									numberSlide = navContainer.find(".service-slider-nav-counter-current"),
									countAllSlide = navContainer.find(".service-slider-nav-counter-all");

								elSlider.on("init", function(event, slick){
									countAllSlide.text(slick.slideCount);
								});

								elSlider.slick({
									arrows: true,
									appendArrows: navContainer,
									prevArrow: $(".service-slider-nav-item--prev", navContainer),
									nextArrow: $(".service-slider-nav-item--next", navContainer),
									infinite: true,
									speed: 400,
									slidesToShow: 1,
									autoplaySpeed: 6000
								});

								itemSlider.on("mousedown", function() {
									item = $(this);
									item.css("cursor", "-webkit-grab");
								})

								itemSlider.on("mouseup", function() {
									item = $(this);
									item.css("cursor", "pointer");
								})

								elSlider.on("afterChange", function(event, slick, currentSlide, nextSlide){
									var i = (currentSlide ? currentSlide : 0) + 1;
									numberSlide.text(i);
									countAllSlide.text(slick.slideCount);
								});


							})($(this));
						})
					}
				},

				init: function() {
					var self = this;

					self.big.init();
					self.promo.init();
					self.restaurant.init();
					self.serviceSlider.init();
				}
			},

			icons: {
				$items: null,
				init: function() {
					var self = this;

					self.build();
					self.check();
					$sel.window.on("scroll", function() {
						self.check();
						self.move();
					});
				},
				build: function() {
					var self = this;

					self.$items = $(".back-icon-item", $sel.body);
					self.$items.each(function() {
						var $item = $(this);
						$item.data({
							"top": parseInt($item.position().top)
						});
					});
				},
				check: function() {
					var self = this;
						sTop = $sel.window.scrollTop(),
						wh = $sel.window.height();

					self.$items.each(function() {
						var $item = $(this);
						if((sTop + wh * 0.6) > $item.data("top")) {
							$item.addClass("show");
						}
					});

				},
				move: function() {
					var self = this;

					self.$items.each(function() {
						var $item = $(this);

					});
				}
			},

			page: {

				ajaxLoader: function() {
					$sel.body.on("click", ".load-more", function(event) {
						var $linkAddress = $(this),
							href = $linkAddress.attr("href"),
							$container = $($linkAddress.data("container"));

						$linkAddress.addClass("loading");

						(function(href, $container) {
							$.ajax({
								url: href,
								success: function(data) {
									var $data = $(data).addClass("load-events-item");
										$container.append($data);
									setTimeout(function() {
										GRAF.common.go($container.find(".load-events-item").offset().top-90, 600);
										$container.find(".load-events-item").removeClass("load-events-item");
										$linkAddress.removeClass("loading");
									}, 600);
									GRAF.reload();
								}
							})
						})(href, $container);
						event.preventDefault();
					})

				},

				accordion: {

					init: function() {
						var self = this,
							$accordion = $(".accordion"),
							$accordionItem = $(".accordion-header", $accordion);

						$accordionItem.on("click", function() {
							var $el = $(this).parent(),
								$elHide = $accordion.find(".accordion-item.active");

							if (!$el.hasClass("active")) {
								self.show($el);
								self.hide($elHide);
							} else {
								self.hide($el);
							}
						});

					},

					show: function(el) {
						el.addClass("active");
						setTimeout(function() {
							el.addClass("show-content");
							setTimeout(function() {
								GRAF.common.go(el.offset().top-90, 500);
							}, 100);
						}, 300);
					},

					hide: function(el) {
						el.removeClass("show-content");
						setTimeout(function() {
							el.removeClass("active");
						}, 300);
					}

				},

				form: {

					init: function() {
						var self = this;

					},

				},

				transformIcons: function() {
					var self = this,
						counter = $(window).scrollTop();

					$sel.window.scroll(function() {
						var top  = $(window).scrollTop(),
							$icon = $(".bcg-icon");

						if (top >= counter) {

							var randomTransition = Math.floor(Math.random() * 50) + 1;

							$icon.each(function() {
								(function(i) {
									i.css("transform", "translateY(-"+randomTransition+"px)");
								})($(this));
							});
							counter = top;

						} else {
							var randomTransition = Math.floor(Math.random() * 50) + 1;

							$icon.each(function() {
								(function(i) {
									i.css("transform", "translateY("+randomTransition+"px)");
								})($(this));
							});
							counter = top;

						}


						if($(window).scrollTop() == 0) {
							$icon.each(function() {
								(function(i) {
									i.css("transform", "translateY(0px)");
								})($(this));
							});
							return;
					   	}
					});
				}

			},


		};

	})();

	GRAF.header.init();
	GRAF.maps.init();
	GRAF.sliders.init();

	GRAF.icons.init();

	GRAF.page.accordion.init();
	GRAF.page.ajaxLoader();
	GRAF.page.transformIcons();

	GRAF.reload = function() {
		GRAF.maps.init();
		GRAF.sliders.init();
	}

})(jQuery);
