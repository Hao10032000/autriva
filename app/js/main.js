/**
  * Retina Logos
  * Ajax Contact Form
  * Header Fixed
  * Ajax Loan Calculator
  * Clear Filters
  * Ajax Subscribe

*/

(function ($) {
    "use strict";

    var themesflatTheme = {
        init: function () {
            this.config();
            this.events();
        },
        config: function () {
            this.config = {
                $window: $(window),
                $document: $(document),
            };
        },
        events: function () {
            var self = this;
            self.config.$document.on('ready', function () {
                self.retinaLogo();
            });
            self.config.$window.on('load', function () {
            });
        },
    };

    themesflatTheme.init();

    /* Retina Logos
    ----------------------------------------------------------------------------*/
    var retinaLogos = function () {
        var retina = window.devicePixelRatio > 1 ? true : false;
        if (retina) {
            $('#site-logo-inner').find('img').attr({ src: 'assets/images/logo/logo@2x.png', width: '197', height: '48' });
            $('#logo-footer.style').find('img').attr({ src: 'assets/images/logo/logo-footer@2x.png', width: '197', height: '48' });
        }
    };
    /* Ajax Contact Form
    ----------------------------------------------------------------------------*/
    var ajaxContactForm = function () {
        $('#contact-form').on('submit', function (e) {
            e.preventDefault();
            var $btn = $('#btn-send-contact');
            var formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: 'contact-form.php',
                data: formData,
                dataType: 'json',
                beforeSend: function () {
                    $btn.find('span').text('Sending...');
                    $btn.prop('disabled', true);
                },
                success: function (response) {
                    if (response.success) {
                        $('#contact-response').html('<p style="color: green;">' + response.message + '</p>');
                        $('#contact-form')[0].reset();
                    } else {
                        $('#contact-response').html('<p style="color: red;">' + response.message + '</p>');
                    }
                },
                error: function () {
                    $('#contact-response').html('<p style="color: red;">Something went wrong. Please try again.</p>');
                },
                complete: function () {
                    $btn.find('span').text('Send now');
                    $btn.prop('disabled', false);
                }
            });
        });
    };
    /* Header Fixed
    ----------------------------------------------------------------------------*/
    var headerFixed = function () {
        if ($('body').hasClass('header-fixed')) {
            var nav = $('.header-lower');
            if (nav.length) {
                var
                    offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $("<div>", {
                        height: headerHeight
                    }).insertAfter(nav);
                injectSpace.hide();

                $(window).on('load scroll', function () {
                    if ($(window).scrollTop() > offsetTop + headerHeight) {
                        nav.addClass('is-fixed');
                        injectSpace.show();
                    } else {
                        nav.removeClass('is-fixed');
                        injectSpace.hide();
                    }

                    if ($(window).scrollTop() > 100) {
                        nav.addClass('is-small');
                    } else {
                        nav.removeClass('is-small');
                    }
                })
            }
        }
    };
    /* Ajax Loan Calculator
    ----------------------------------------------------------------------------*/
    var ajaxloancalculator = function () {
        $('#loan-calculator').on('submit', function (e) {
            e.preventDefault();
            var cleanTotal = $('#total_price').val().replace(/[^0-9.]/g, '');
            var cleanDown = $('#down_payment').val().replace(/[^0-9.]/g, '');
            var cleanInterest = $('#interest_rate').val().replace(/[^0-9.]/g, '');
            var terms = $('#period-select .current').text().replace(/[^0-9]/g, '');
            var formData = {
                total_price: cleanTotal,
                down_payment: cleanDown,
                interest_rate: cleanInterest,
                terms: terms
            };
            $.ajax({
                type: 'POST',
                url: 'loan-calculator.php',
                data: formData,
                dataType: 'json',
                beforeSend: function () {
                    $('#submit-loan span').text('Calculating...');
                },
                success: function (response) {
                    if (response.success) {
                        $('#res_down_payment').text(response.down_payment_amt);
                        $('#res_amount_financed').text(response.amount_financed);
                        $('#res_monthly_payment').text(response.monthly_payment);
                    }
                },
                error: function () {
                    alert("Calculation error. Please check your inputs.");
                },
                complete: function () {
                    $('#submit-loan span').text('Apply for a loan');
                }
            });
        });
    };
    /* Clear Filters
    ----------------------------------------------------------------------------*/
    var clearFilters = function () {
        $(document).on('click', '.claer', function (e) {
            e.preventDefault();
            var $form = $(this).closest('.sidebar-right-listing').find('form');
            $form[0].reset();
            if ($().niceSelect) {
                $form.find('select').niceSelect('update');
                $form.find('.nice-select .current').text('Choose');
            }
            $form.find('.range-slider-wrapper').each(function () {
                var $sliderContainer = $(this);
                var $slider = $sliderContainer.find('.slider-target');
                var startValue = $sliderContainer.data('start');
                if ($slider[0] && $slider[0].noUiSlider) {
                    $slider[0].noUiSlider.set(startValue);
                }
            });
            $form.find('input[type="hidden"]').val('');
            console.log('Filters have been reset.');
        });
    };

    $('.select_js').niceSelect();
    if ($('.main-header li.dropdown2 ul').length) {
        $('.main-header li.dropdown2').append('<div class="dropdown2-btn"></div>');
        $('.main-header li.dropdown2 .dropdown2-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });
        $('.navigation li.dropdown2 > a').on('click', function (e) {
            e.preventDefault();
        });
        $('.main-header .navigation li.dropdown2 > a,.hidden-bar .side-menu li.dropdown2 > a').on('click', function (e) {
            e.preventDefault();
        });
        $('.price-block .features .arrow').on('click', function (e) {
            $(e.target.offsetParent.offsetParent.offsetParent).toggleClass('active-show-hidden')
        });
    }

    $(document).ready(function () {
        if ($('.mobile-menu').length && $('.main-header .nav-outer .main-menu').length) {
            var menuContent = $('.main-header .nav-outer .main-menu').html();
            if ($('.mobile-menu .menu-box .menu-outer').contents().length === 0) {
                $('.mobile-menu .menu-box .menu-outer').append(menuContent);
            }
        }
        $('.navigation li.dropdown2 > .dropdown2-btn').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $currentLi = $(this).parent('li');
            var $currentUl = $currentLi.children('ul');
            if ($currentLi.hasClass('open')) {
                $currentLi.removeClass('open');
                $currentUl.slideUp(500);
            }
            else {
                $currentLi.siblings('li.dropdown2').removeClass('open').children('ul').slideUp(500);
                $currentLi.addClass('open');
                $currentUl.slideDown(500);
            }
        });

        $('.mobile-nav-toggler').on('click', function (e) {
            e.preventDefault();
            $('body').addClass('mobile-menu-visible');
        });

        $('.mobile-menu .menu-backdrop, .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
            resetMenu();
        });

        function resetMenu() {
            $('.navigation li').removeClass('open');
            $('.navigation li ul').slideUp(0);
        }
    });
    /* Ajax Subscribe
    ----------------------------------------------------------------------------*/
    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $('#subscribe-email'),
            subscribeButton: $('#subscribe-button'),
            subscribeMsg: $('#subscribe-msg'),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $('#subscribe-form').attr('data-mailchimp'),
            success_message: '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message: '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: 'mail/subscribe.php',
            mailChimpAction: 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function () {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function () {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if (isMailchimp) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                    subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    // Dom Ready
    $(function () {
        $(window).on('load resize', function () {
            retinaLogos();
        });
        headerFixed();
        ajaxContactForm();
        ajaxloancalculator();
        clearFilters();
        ajaxSubscribe.eventLoad();

    });

})(jQuery);

