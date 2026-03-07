/**
  * Go Top
  * Accordion
  * Toggle Menu
  * No Link
  * Click Search Form
  * Tabs
  * Preloader
  * Footer
  * Sidebar Mobile
  * On Click View Listing Type
  * Check View Listing
  * Infinite Slide
  * Init Loan Fields
  * Flat Counter
  * Video Popup
  * Flat Star Rating
*/

; (function ($) {

    "use strict";

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    /* Go Top
    ----------------------------------------------------------------------------*/
    var gotop = function () {
        var $goTop = $("#goTop");
        var $borderProgress = $(".border-progress");

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var scrollPercent = (scrollTop / docHeight) * 100;
            var progressAngle = (scrollPercent / 100) * 360;

            $borderProgress.css("--progress-angle", progressAngle + "deg");

            if (scrollTop > 100) {
                $goTop.addClass("show");
            } else {
                $goTop.removeClass("show");
            }
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    };
    /* Accordion
    ----------------------------------------------------------------------------*/
    var flatAccordion = function () {
        var args = { duration: 300 };
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();
        $('.flat-toggle.enable .toggle-title').on('click', function () {
            $(this).closest('.flat-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        });

        $('.flat-accordion .toggle-title').on('click', function () {
            if (!$(this).is('.active')) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });

        $('.flat-accordion .flat-toggle').on('click', function () {
            if (!$(this).is('.activ')) {
                $(this).find('.flat-toggle.activ').toggleClass('activ').next();
                $(this).toggleClass('activ');
            } else {
                $(this).toggleClass('activ');

            }
        });

    };
    new WOW().init();

    /* Toggle Menu
    ----------------------------------------------------------------------------*/
    var toggleMenu = function () {
        $(".header-menu").on("click", function () {
            $(".side-menu__block").addClass("active");
        });

        $(".side-menu__block-overlay,.side-menu__toggler, .scrollToLink").on(
            "click",
            function (e) {
                $(".side-menu__block").removeClass("active");
                e.preventDefault();
            }
        );
    }
    /* No Link
    ----------------------------------------------------------------------------*/
    var no_link = function () {
        $('a.nolink').on('click', function (e) {
            e.preventDefault();
        });
        $('.icon_menu .icon a').on('click', function (e) {
            e.preventDefault();
        });
    }
    /* Click Search Form
    ----------------------------------------------------------------------------*/
    var clickSearchForm = function () {
        const widgetSearchForm = $(".wd-search-form");
        if (widgetSearchForm.length) {
            $(".pull-right").on("click", function () {
                widgetSearchForm.toggleClass("show");
                $(".pull-right").toggleClass("active");
            });
            $(document).on(
                "click.pull-right, click.offcanvas-backdrop",
                function (a) {
                    if (
                        $(a.target).closest(".pull-right, .wd-search-form").length === 0
                    ) {
                        widgetSearchForm.removeClass("show");
                        $(".pull-right").removeClass("active")
                    }
                }
            );
        }
    };
    /* Tabs
    ----------------------------------------------------------------------------*/
    var tabs = function () {
        $('.flat-tabs').each(function () {
            $(this).find('.content-tab').children().hide();
            $(this).find('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function () {
                var liActive = $(this).index();
                var contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').find('.content-tab').children().eq(liActive);
                contentActive.addClass('active').fadeIn("slow");
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').find('.content-tab').children().eq(liActive).siblings().hide();
            });
        });
    };
    /* Preloader
    ----------------------------------------------------------------------------*/
    var Preloader = function () {
        setTimeout(function () {
            $(".preload").fadeOut("slow", function () {
                $(this).remove();
            });
        }, 200);
    };
    /* Footer
    ----------------------------------------------------------------------------*/
    var footer = function () {
        var args = { duration: 250 };
        $(".footer-heading-mobie").on("click", function () {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp(args);
            } else {
                $(this).next().slideDown(args);
            }
        });
    };
    /* Sidebar Mobile
    ----------------------------------------------------------------------------*/
    var sidebar_mobile = function () {
    const $sidebar = $(".listing-sidebar, .dealer-sidebar");
    const $overlay = $(".overlay-siderbar-mobie");
    const $triggers = $(".btn-siderbar-mobie-filter, .overlay-siderbar-mobie, .icon-close-listing");

    $triggers.on("click", function () {
        $sidebar.toggleClass("open");
        $overlay.toggleClass("open");
    });
    };
    /* On Click View Listing Type
    ----------------------------------------------------------------------------*/
    var onClickViewListingType = function () {
        if ($('.category-filter').length > 0) {
            $('.btn-view.grid').click(function (event) {
                event.preventDefault();
                localStorage.setItem('VIEW_LISTING_TYPE', 'grid');
                checkViewListing();
            });
            $('.btn-view.list').click(function (event) {
                event.preventDefault();
                localStorage.setItem('VIEW_LISTING_TYPE', 'list');
                checkViewListing();
            });
        }
    };
    /* Check View Listing
    ----------------------------------------------------------------------------*/
    var checkViewListing = function () {
        if ($('.category-filter').length > 0) {
            var type = localStorage.getItem('VIEW_LISTING_TYPE');
            switch (type) {
                case 'grid':
                    $('.listing-list-car-wrap').find('.list-car-list-1').addClass('list-car-grid-1');
                    $('.btn-view.grid').addClass('active');
                    $('.btn-view.list').removeClass('active');
                    break;
                case 'list':
                    $('.listing-list-car-wrap').find('.list-car-list-1').removeClass('list-car-grid-1');
                    $('.btn-view.list').addClass('active');
                    $('.btn-view.grid').removeClass('active');
                    break;
                default:
                    break;
            }
        }
    }
    /* Infinite Slide
    ----------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        $(".infiniteslide").each(function () {
            var $this = $(this);
            var style = $this.data("style") || "left";
            var clone = parseInt($this.data("clone")) || 2;
            var speed = parseInt($this.data("speed")) || 100;

            if ($("body").hasClass("rtl")) {
                style = style === "left" ? "right" : "left";
            }

            $this.infiniteslide({
                speed: speed,
                direction: style,
                clone: clone,
            });
        });
    };
    /* Init Loan Fields
    ----------------------------------------------------------------------------*/
    var initLoanFields = function () {

        $(".format-currency").on("input", function () {
            let value = this.value.replace(/\D/g, "");
            if (value) {

                let formattedValue = new Intl.NumberFormat('en-US').format(value);
                this.value = "$" + formattedValue;
            } else {
                this.value = "";
            }
        });


        $(".format-percent").on("input", function () {
            let value = this.value.replace(/\D/g, "");
            if (value) {

                if (parseInt(value) > 100) value = "100";
                this.value = value + "%";
            } else {
                this.value = "";
            }
        });


        $(".format-currency, .format-percent").on("click", function () {
            const val = this.value;

            if (this.classList.contains('format-currency') && val === "$") {
                this.setSelectionRange(1, 1);
            }
        });
    };
    /* Flat Counter
    ----------------------------------------------------------------------------*/
    var flatCounter = function () {
        const counters = document.querySelectorAll('.number');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-to'));
                    const duration = parseInt(el.getAttribute('data-speed')) || 2000;

                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                        el.innerText = Math.floor(progress * target).toLocaleString();

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            el.innerText = target.toLocaleString();
                        }
                    };

                    window.requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };
    /* Video Popup
    -------------------------------------------------------------------------*/
    var videoPopup = function () {
        if ($("div").hasClass("video-wrap")) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
    };
    $(document).ready(function () {
        $('.features-wrap h2, .features-wrap h4').on('click', function () {
            const $this = $(this);

            const contentBox = $this.next('.box2');
            if (contentBox.length) {
                contentBox.toggleClass('content-hidden');
            }
            if ($this.is('h5,h4')) {
                $this.toggleClass('active');
            }
        });
    });
    jQuery(function ($) {
        const $icon = $('.header-search-icon'),
            $input = $('#search-terms'),
            $sel = $('.wd-find-selects'),
            open = 'opened', closed = 'closed';

        $icon.addClass(closed);

        $icon.find('.search-icon').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($icon.hasClass(closed)) {
                $icon.removeClass(closed).addClass(open);
                $icon.add($sel).addClass(open);
                $input.focus();
                $(document).on('click.searchEsc', outside).on('keydown.searchEsc', esc);
            } else {
                close();
            }
        });

        $sel.on('click', close);

        function outside(e) {
            if (!$(e.target).closest($icon).length && !$(e.target).closest($sel).length) close();
        }

        function esc(e) {
            if (e.key === 'Escape' || e.keyCode === 27) close();
        }

        function close() {
            $icon.removeClass(open).addClass(closed);
            $icon.add($sel).removeClass(open);
            $('body').removeClass('search-active');
            $(document).off('.searchEsc');
        }
    });
    /* Flat Star Rating
    -------------------------------------------------------------------------*/
    var flatStarRating = function () {
        const stars = document.querySelectorAll('.icon-carus-star');

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    s.style.color = (i <= index) ? '#405FF2' : 'rgba(64, 95, 242, 0.2)';
                });

                console.log(`Rating: ${index + 1}`);
            });
        });
    };

    // Dom Ready
    $(function () {
        gotop();
        flatAccordion();
        toggleMenu();
        no_link();
        clickSearchForm();
        tabs();
        Preloader();
        footer();
        sidebar_mobile();
        onClickViewListingType();
        infiniteSlide();
        initLoanFields();
        flatCounter();
        flatStarRating();
        videoPopup();
    });

})(jQuery);

