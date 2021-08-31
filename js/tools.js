jQuery(function ($) {

    var handlers = [
        tabs,
        sliders,
        types,
        totop,
        header,
        lesson,
        handwriting,
        filters,
        favorites,
        message,
        cards,
        cardswiper,
        favor,
        sage,
        modes,
        mobilemenu,

        menu,
        selects,
        accordion,
        map,
        cleaning,
        popups,
        slider,
        flip,
        questions,
        hieroglyphswitch,
        mock,
        dialogue,
        inputfill,
        verify,
        lang,
        programs,
        search,
        grammar,
        translate
    ];

    $.each(handlers, function (i, handler) {
        try {
            handler.call();
        } catch (e) {
            console.log('Error! ' + e.stack);
        }
    });

    var utms = {};

    function tabs($ctx) {
        if (typeof $ctx == "undefined") {
            $ctx = $('body');
        }

        $('.tabs-block', $ctx).each(function () {
            var $tabs = $('> .tabs > .tab', this);
            var $tabsContent = $('> .tabs-content > .tab', this);

            var $active = $tabs.filter('.active');

            if ($active.length) {
                $tabsContent.eq($tabs.index($active)).addClass('active');
            } else {
                $tabs
                    .removeClass('active')
                    .first()
                    .addClass('active');

                $tabsContent
                    .removeClass('active')
                    .first()
                    .addClass('active');
            }

            const $current = $tabs.filter('.active');
            const $activeBg = $('.tabs .active-bg', this);


            $(window).on('ready load resize', function () {
                $activeBg.css({
                    left: $current.position().left,
                    width: $current.outerWidth()
                })
            });

            $tabs.find('a').on('click', function (e) {
                e.preventDefault();
            });

            $tabs.on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('active')) return;

                $tabs.removeClass('active');
                $(this).addClass('active');

                $tabsContent.removeClass('active');
                var $tabContent = $tabsContent.eq($tabs.index(this));
                $tabContent.addClass('active');

                const $current = $(this);

                $activeBg.css({
                    left: $current.position().left,
                    width: $current.outerWidth()
                })
            });
        });
    }

    function sliders() {
        var reviewsSlider = new Swiper('.reviews-slider .swiper-container', {
            slidesPerView: '1',
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.reviews-slider-button-next',
                prevEl: '.reviews-slider-button-prev',
            },
            pagination: {
                el: '.reviews-slider-pagination',
            }
        });

        var cardSlider;

        var enableCardSlider = function () {
            cardSlider = new Swiper('.card-slider .swiper-container', {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: false,
                navigation: {
                    nextEl: '.card-slider-button-next',
                    prevEl: '.card-slider-button-prev',
                }
            });
        };

        var breakpoint = window.matchMedia('(max-width: 767px)');

        var checker = function () {
            if (breakpoint.matches) {
                if (cardSlider !== undefined) cardSlider.destroy(true, true);

                $('.card-slider-item').appendTo('.card-slider');
            } else {
                $('.card-slider-item').appendTo('.card-slider .swiper-wrapper');

                enableCardSlider();
            }
        }

        breakpoint.addListener(checker);
        checker();
    }

    function types() {
        var typesSlider = new Swiper('.types-slider .swiper-container', {
            slidesPerView: '1',
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            simulateTouch: false,
            autoHeight: true,
            breakpoints: {
                767: {
                    autoHeight: false
                }
            }
        });

        const $typesTabs = $('.types-menu__item');
        const $active = $('.types-menu .active-bg');

        function selectCurrent() {
            let idx = typesSlider.realIndex;

            if (idx < 0) {
                idx = 0;
            }

            const $current = $typesTabs.eq(idx);

            $typesTabs.removeClass('active');
            $current.addClass('active');

            $active.css({
                left: $current.position().left,
                width: $current.outerWidth()
            })
        }

        selectCurrent();

        $(window).on('ready load resize', selectCurrent);
        typesSlider.on('slideChange', selectCurrent);

        $typesTabs.on('click', e => {
            e.preventDefault();

            typesSlider.slideTo($(e.currentTarget).index());
        })

        $typesTabs.removeClass('active').eq(typesSlider.realIndex).addClass('active');
    }

    function menu() {
        $('.menu-study-mobile__btn').on('click', function (e) {
            e.preventDefault();

            $('.menu-study-mobile__block').slideToggle();
            $(this).closest('.menu').toggleClass('open');
        });

        $('.one-thematic-dictionary-list-block .thematic-dictionary-list-block__menu-btn').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('open');
            $('.one-thematic-dictionary-list-block .thematic-dictionary-list-block__menu_one').slideToggle();
        });

        let $menu = $('.menu:not(.menu-study-mobile) .menu-block');
        let $btn = $('.menu:not(.menu-study-mobile) .menu-btn');

        $btn.on('click', function (e) {
            e.preventDefault();

            $btn.toggleClass('is-active');

            if ($btn.hasClass('is-active')) {
                $menu.show();

                //const width = $menu.width();
                $menu.css('width', '');
                const width = $menu.css('width');

                $menu.css({width: 0});

                $menu.animate({
                    width: width
                });
            } else {
                $menu.animate({
                    width: 0
                }, () => {
                    $menu.hide();
                    $menu.css({width: ''});
                })
            }
        });

        $('.lesson-summary__menu-btn-mobile').on('click', function () {
            $menu.hide();
        });

        $(document).on('click', function (e) {
            if ($(e.target).is('.menu-btn, .menu-block') || $('.menu-block, .menu-btn').find(e.target).length) {
                return;
            }

            $btn.removeClass('is-active');
            $menu.animate({
                width: 0
            }, () => {
                $menu.hide();
            });
        });

    }

    $('.menu-dictionary').on('click', function (e) {
        $('.block-category__mobile-block').toggleClass('block-category__show');
        $('.menu-block').hide();
    })

    function mobilemenu() {
        $('.mobile-menu-btn').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('is-active');
            $('.menu-mobile').toggleClass('open');

            if ($('.menu-mobile').hasClass('open')) {
                bodyScrollLock.disableBodyScroll(document.querySelector('.menu-mobile'));
            } else {
                bodyScrollLock.clearAllBodyScrollLocks();
            }
        });

        $('.header__search-btn').on('click', function (e) {
            e.preventDefault();

            $('.header-search-block').toggleClass('open');
        });

        $('.header-search-block__close').on('click', function (e) {
            e.preventDefault();

            $('.header-search-block').removeClass('open');
        })

        $('.menu-mobile-item_sub > a').on('click', function (e) {
            e.preventDefault();

            $(this).siblings('.menu-mobile-submenu').addClass('open');

            $('.menu-mobile').addClass('lock-scroll')

            bodyScrollLock.disableBodyScroll($(this).siblings('.menu-mobile-submenu')[0]);
        });

        $('.menu-mobile-submenu__title').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.menu-mobile-submenu').removeClass('open');

            $('.menu-mobile').removeClass('lock-scroll')
        })
    }

    function header() {
        const $header = $('header');

        $(window).on('scroll', () => {
            if (window.scrollY > 0) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
    }

    function selects() {
        $('select').replaceSelect();
    }

    function accordion() {
        $('.accordion .item.open .content').show();

        $('.accordion .item .title').on('click', function (e) {
            e.preventDefault();


            $(this)
                .siblings('.content').slideToggle();

            $(this).parent().toggleClass('open').siblings()
                .removeClass('open').find('.content').slideUp();

        })
    }

    function map() {
        var $mapBlock = $('.map');

        new Scheduler(function () {
            var map = new Maps();

            map.show($mapBlock, false);

            map.setFocus($mapBlock.data('coords'));
            map.setZoom(16);

            map.addPoint($mapBlock.data('coords'));

            this.run();
        });
    }

    function cleaning() {
        $('.cleaning-list__content-item').each(function () {
            var $parent = $(this);

            var $points = $('.cleaning-list__image-point', $parent);

            $('.cleaning-list-points__list li', $parent)
                .on('mouseover', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    $points.removeClass('active').eq($(this).index()).addClass('active');
                })
                .on('mouseleave', function () {
                    $(this).removeClass('active');
                    $points.eq($(this).index()).removeClass('active');
                });
        });

        $('.cleaning-list-block__btn').on('click', function () {
            $('.cleaning-list-block__btn').hide();

            $('.cleaning-list-full').addClass('open');
        })
    }

    function popups() {
        $('[data-popup]').on('click', function (e) {
            e.preventDefault();

            var popup = '.' + $(this).data('popup');

            $.fancybox.open({
                type: 'inline',
                src: popup,
                opts: {
                    touch: false
                }
            });
        });

        $('.btn-popup-close, .popup-learn__close, .popup-word-menu__close').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.popup-open').removeClass('popup-open');

            $.fancybox.close();

            bodyScrollLock.clearAllBodyScrollLocks();
        });

        $('.search-result__example').on('click', function (e) {
            e.preventDefault();

            let $popup = $(this).siblings('.popup-sample');

            if (!$popup.length) {
                $popup = $('.popup-sample').first();
            }

            $.fancybox.open({
                type: 'inline',
                src: $popup,
                opts: {
                    touch: false
                }
            });
        });

        $('.word__example').on('click', function (e) {
            e.preventDefault();

            let $popup = $(this).siblings('.popup-sample');

            if (!$popup.length) {
                $popup = $('.popup-sample').first();
            }

            $.fancybox.open({
                type: 'inline',
                src: $popup,
                opts: {
                    touch: false
                }
            });
        })

        $('.thematic-dictionary-card__setting--btn').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-settings',
                opts: {
                    touch: false
                }
            });
        })

        $('.test-block__setting--btn, .lesson-summary-block__setting--btn').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.lesson-summary__popup-settings',
                opts: {
                    touch: false
                }
            });
        })

        $('.filter__buttons-learn').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-learn',
                opts: {
                    touch: false
                }
            });
        })

        $('.lesson-help').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-tip',
                opts: {
                    touch: false
                }
            });
        })

        $('.lesson-study-dialogs-item__info').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-info',
                opts: {
                    touch: false
                }
            });
        })

        $('.header__link_registr, .main-block__btn, .popup-auth__btn-register, .menu-mobile__register, .popup-auth__btn-other').on('click', function (e) {
            e.preventDefault();

            openPopup('.popup-register');
        })

        $('.header__link_login, .popup-auth__btn-login, .menu-mobile__login').on('click', function (e) {
            e.preventDefault();

            openPopup('.popup-login');

            openPopup('.popup-login-en', true);
        })

        $('.popup-auth__recover').on('click', function (e) {
            e.preventDefault();

            openPopup('.popup-forgot');
        })

        $('.popup-register .btn-register').on('click', function (e) {
            e.preventDefault();

            openPopup('.popup-verify');
        })

        $('.one-thematic-dictionary__item--full-mobile').on('click', function (e) {
            e.preventDefault();

            openPopup('.popup-word-menu');
            bodyScrollLock.enableBodyScroll(document.querySelector('.popup-word-menu'));
        })

        function openPopup(selector, dontclose) {
            if (!dontclose) {
                $.fancybox.close();
                $('.popup-open').removeClass('popup-open')
            }

            if (window.matchMedia('(max-width: 767px)').matches) {
                $(selector).addClass('popup-open');
                bodyScrollLock.disableBodyScroll(document.querySelector(selector));
            } else {
                $.fancybox.open({
                    type: 'inline',
                    src: selector
                });
            }
        }

        $('.translated').on('click', function (e) {
            if (e.target.classList.contains('translated')) {
                e.preventDefault();

                this.classList.add('open');
            }
        })
    }

    function totop() {
        const $tt = $('.totop');

        $tt.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({scrollTop: 0});
        });

        $(window).on('scroll', () => {
            if (window.scrollY > 300) {
                $tt.fadeIn();
            } else {
                $tt.fadeOut();
            }
        });
    }

    function lesson() {
        $('.lesson .btn').on('click', (e) => {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-lesson'
            });
        })

        $('.btn-open-popup-lesson-about').on('click', (e) => {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-lesson-about'
            });
        })

        $('.popup-lesson-about__btn-back').on('click', () => {
            $.fancybox.close();
        });
    }

    function handwriting() {
        $('.btn-handwriting').on('click', function (e) {
            e.preventDefault();

            $('.popup-handwriting').fadeIn();
            $('.shadow').fadeIn();

            bodyScrollLock.disableBodyScroll(document.querySelector('.popup-handwriting'));
        });

        $('.popup-handwriting .btn-popup-close').on('click', function (e) {
            e.preventDefault();

            $('.popup-handwriting').fadeOut();
            $('.shadow').fadeOut();

            bodyScrollLock.clearAllBodyScrollLocks();
        })

        $('.popup-handwriting + .shadow').on('click', function (e) {
            e.preventDefault();

            $('.popup-handwriting').fadeOut();
            $('.shadow').fadeOut();

            bodyScrollLock.clearAllBodyScrollLocks();
        });
    }

    function filters() {
        $('.filters__categories').each(function () {
            const $filters = $('span', this);
            const $active = $('.active-bg', this);

            // $active.css({
            //     left: $('.active',this).position().left,
            //     width: $('.active',this).outerWidth()
            // })

            $filters.on('click', function (e) {
                e.preventDefault();

                const $current = $(this);

                $filters.removeClass('active');
                $current.addClass('active');

                $active.css({
                    left: $current.position().left,
                    width: $current.outerWidth()
                })
            });

            $filters.first().trigger('click');

            $(window).on('ready load resize', function () {
                $active.css({
                    left: $('.active', this).position().left,
                    width: $('.active', this).outerWidth()
                })
            });
        });

        $('.filters-btn-mobile').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('open');
            $('.filters__group').toggleClass('open');
            $('.universities-list__standalone').toggleClass('universities-list__standalone_more-margin');
        });
    }

    function favorites() {
        $('.favor').on('click', function (e) {
            if ($('.favor-popup', this).length) {
                return;
            }

            e.preventDefault();

            $(this).toggleClass('active');
        });
    }

    function message() {
        $('.massage__link').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(this).addClass('open');
        });

        $('.message__close').on('click', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(this).closest('.massage__link').removeClass('open');
        });

        $('body').on('click', function () {
            $('.massage__link').removeClass('open');
        })
    }

    function cards() {
        $('.game2-card').on('click', function () {
            $(this).toggleClass('active');
        });

        $('.thematic-dictionary-card__word-variant--item').on('click', function () {
            $(this).toggleClass('active');
        });

        $('.lesson-summary-select-card').on('click', function () {
            $(this).toggleClass('active');
        })
    }

    function cardswiper() {
        $(window).on('keypress', function (e) {
            if (e.which === 32) {
                $('.thematic-dictionary-word-card__content').toggleClass('swap');
            }
        });
    }

    function favor() {
        const $popup = $('.popup-favor');

        if ($popup.length) {
            $('.favor, .filter__buttons-favorite').on('click', function (e) {
                e.preventDefault();

                $popup.fadeIn();
            })

            $('.popup-favor__close').on('click', function (e) {
                e.preventDefault();

                $popup.fadeOut();
            });

            $(document).on('click', function (e) {
                if ($popup.find(e.target).length || $popup.is(e.target) || $(e.target).is('.favor')) {
                    return;
                }

                $popup.fadeOut();
            });
        }
    }

    function slider() {
        const slider = document.querySelector('.popup-settings__range--slider');

        function initSlider() {
            noUiSlider.create(slider, {
                start: [0, 70000],
                step: 1000,
                connect: true,
                range: {
                    'min': 0,
                    'max': 100000
                },
                tooltips: [true, true],
            });
        }

        if (slider) {
            if (typeof noUiSlider == "undefined") {
                var head = document.getElementsByTagName('HEAD')[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = '../css/nouislider.min.css';

                // Append link element to HTML head
                $(head).prepend(link);

                var script = document.createElement('script');
                script.src = '../js/nouislider.min.js';

                script.onload = function () {
                    initSlider();
                }

                head.appendChild(script);
            } else {
                initSlider();
            }
        }
    }

    function flip() {
        $('.lesson-flip, .thematic-dictionary-word-card__content').on('click', function () {
            $(this).toggleClass('open');
        })
    }

    function sage() {
        $('.lesson-notice__close').on('click', function (e) {
            $('.popup-close-sage').fadeIn();
        });

        $('.popup-close-sage__close, .popup-close-sage__no, .popup-close-sage__btn').on('click', function (e) {
            $('.popup-close-sage').fadeOut();
        });

        $('.popup-close-sage__btn').on('click', function () {
            $('.lesson-notice').hide();
        })
    }

    function questions() {
        $('.lesson-questions__title--btn, .lesson-comments__title--btn, .btn-comment').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $('.comments-form').last().offset().top - 100
            })
        });

        $('.comment-type1-content__open').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.comment-type1-content').toggleClass('open').find('.comment-type1__answers').slideToggle();
        })

        $('.question-content__open').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.question-content').toggleClass('open').find('.question__answers').slideToggle();
        })

        $('.comment-type1-content__reply, .comment-text__answer').on('click', function (e) {
            e.preventDefault();

            var $form = $('.answer-form').eq(0);
            $form.hide();

            var $comment = $(this).closest('.comment, .comment-type1');

            var $bottom = $comment.find('.comment-text').eq(0);

            if ($bottom.length) {
                $bottom.after($form);
            } else {
                $comment.find('.comment-type1-content__bottom').after($form);
            }

            $form.slideDown();
        })
    }

    function hieroglyphswitch() {
        $('.lesson-hieroglyph-switch-variants').each(function () {
            const $filters = $('.lesson-hieroglyph-switch-variants__item', this);
            const $active = $('.active-bg', this);

            $filters.on('click', function (e) {
                e.preventDefault();

                const $current = $(this);

                $filters.removeClass('lesson-hieroglyph-switch-variants__item_active');
                $current.addClass('lesson-hieroglyph-switch-variants__item_active');

                $active.css({
                    left: $current.position().left
                })
            });

            $filters.first().trigger('click');

            $(window).on('ready load resize', function () {
                $filters.first().trigger('click');
            });
        });
    }

    function mock() {
        $('.card-typing-btn').on('click', function () {
            $(this).toggleClass('card-typing-btn_stop').toggleClass('card-typing-btn_play');
        })
    }

    function dialogue() {
        $('.lesson-study-dialogs-item__help').css('display', 'flex');
        $('.lesson-study-dialogs-item__help *').hide();

        $('.lesson-study-dialogs-item__button').on('click', function (e) {
            e.preventDefault();

            var $item = $(this).closest('.lesson-study-dialogs-item');

            $(this).toggleClass('active');


            if (this.parentElement.querySelector('.lesson-study-dialogs-item__buttons-answer') !== null) {
                $item.find('.lesson-study-dialogs-item__help > *').eq($(this).index() - 1).slideToggle();
            } else {
                $item.find('.lesson-study-dialogs-item__help > *').eq($(this).index()).slideToggle();
            }
        })
    }

    function modes() {
        if ($('.writing-decomposition-writing-item.card-main').length) {
            $('.writing-decomposition-area').hide();
        }

        $('.writing-decomposition-mode').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');

            if ($(this).is('.writing-decomposition-mode1')) {
                $('.writing-decomposition-area').hide();
                $('.writing-decomposition-writing-item').show();
            } else {
                $('.writing-decomposition-area').show();
                $('.writing-decomposition-writing-item').hide();
            }
        })

        $('.writing-decomposition-tools__view').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('inactive');
        })
    }

    function inputfill() {
        $('input[type=text], input[type=password]').on('change  focusout', function () {
            if (this.value.length) {
                this.classList.add('filled');
                this.parentElement.classList.add('filled');
            } else {
                this.classList.remove('filled');
                this.parentElement.classList.remove('filled');
            }
        });

        $('input[type=text], input[type=password]').each(function () {
            if (this.value.length > 0) {
                this.classList.add('filled');
                this.parentElement.classList.add('filled');
            }
        })

        $('.popup-auth-label__passwordmask').on('click', function () {
            var $el = $(this).siblings('input');

            changeType($el, $el.prop('type') === 'password' ? 'text' : 'password');
        });

    }

    function changeType(x, type) {
        if (x.prop('type') == type)
            return x; //That was easy.
        try {
            return x.prop('type', type); //Stupid IE security will not allow this
        } catch (e) {
            //Try re-creating the element (yep... this sucks)
            //jQuery has no html() method for the element, so we have to put into a div first
            var html = $("<div>").append(x.clone()).html();
            var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
            //If no match, we add the type attribute to the end; otherwise, we replace
            var tmp = $(html.match(regex) == null ?
                html.replace(">", ' type="' + type + '">') :
                html.replace(regex, 'type="' + type + '"'));
            //Copy data from old element
            tmp.data('type', x.data('type'));
            var events = x.data('events');
            var cb = function (events) {
                return function () {
                    //Bind all prior events
                    for (i in events) {
                        var y = events[i];
                        for (j in y)
                            tmp.bind(i, y[j].handler);
                    }
                }
            }(events);
            x.replaceWith(tmp);
            setTimeout(cb, 10); //Wait a bit to call function
            return tmp;
        }
    }

    function verify() {
        $('.popup-verify__inputs input').on('keypress', function (e) {
            if (e.keyCode >= '0'.charCodeAt(0) && e.keyCode <= '9'.charCodeAt(0)) {
                this.value = String.fromCharCode(e.keyCode);
                $(this).next().focus();
            } else {
                this.value = '';
            }

            e.preventDefault();
        });
    }

    function lang() {
        $('.lang-selector').on('click', function () {
            $(this).toggleClass('lang-selector_en');
        })
    }

    function programs() {
        $('.program-item').on('click', function () {
            $(this).addClass('open').siblings().removeClass('open');
        })

        $('.footer__menu > p > a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.footer__menu').toggleClass('open');
        });
    }

    function search() {
        $('.header-search-block_input').on('focus', function () {
            $('.header-search-block__content').slideDown();
        })
    }

    function grammar() {
        $('.grammar-toc__title').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.grammar-toc').toggleClass('open').siblings('.grammar-toc').removeClass('open')
        })
    }

    function translate() {
        $('.song-text-title__translate input').on('change', function (e) {
            if (this.checked) {
                $(this).closest('.song-text').removeClass('notranslate');
            } else {
                $(this).closest('.song-text').addClass('notranslate');
            }
        });
    }

    if (document.querySelector('.buttons-conversion-row') !== null) {
        let btnConversionList = document.querySelector('.buttons-conversion-row').querySelectorAll('.change-conversion');

        $('.buttons-conversion-row').on('click', event => {
            if (event.target.classList.contains('change-conversion') && event.target) {
                btnConversionList.forEach(btn => {
                    btn.classList.remove('change-conversion__active');
                })
                event.target.classList.add('change-conversion__active');
            }
        })
    }

    if ($('.popup-close-sage__close') !== null) {

        $('.game6-content').on('click', event => {
            if (event.target.classList.contains('game6-item') && event.target) {
                $('.popup-game-failure').css('display', 'none');
            }
        })

        $('.popup-close-sage__close').on('click', event => {
            if (event.target.classList.contains('popup-close-sage__close') && event.target) {
                $('.popup-game-failure').css('display', 'none');
            }
        })
    }

    if (document.querySelector('.lesson-listen-text-do-task__variants_padding') !== null) {
        let variantsAnswersList = document.querySelector('.lesson-listen-text-do-task__variants_padding').querySelectorAll('.lesson-listen-text-do-task__variants--item_full-image');

        $('.lesson-listen-text-do-task__variants_padding').on('click', event => {
            variantsAnswersList.forEach(variant => {
                variant.classList.remove('lesson-listen-text-do-task__variants--item_active');
            });

            event.target.parentElement.classList.add('lesson-listen-text-do-task__variants--item_active');
        })
    }

    if (document.querySelector('.swap-view-buttons-row') !== null) {
        let swapButtonsList = document.querySelector('.swap-view-buttons-row').querySelectorAll('.swap-button');

        $('.swap-view-buttons-row').on('click', event => {
            swapButtonsList.forEach(btn => {
                btn.classList.remove('swap-button_active');
            });

            event.target.classList.add('swap-button_active');
            if (event.target.classList.contains('swap-button_table')) {
                document.querySelector('.chinese-key-hieroglyph__list').classList.add('chinese-key-hieroglyph__list_row');
            } else {
                document.querySelector('.chinese-key-hieroglyph__list').classList.remove('chinese-key-hieroglyph__list_row');
            }
        })
    }

    if (document.querySelector('.chinese-key-hieroglyph__list') !== null && window.matchMedia('(max-width: 767px)').matches) {
        $('.chinese-key-hieroglyph__list').on('click touchend', event => {
            if (event.target && (event.target.classList.contains('chinese-key-hieroglyph__item') || event.target.classList.contains('chinese-key-hieroglyph__item-wrap'))) {
                $('.popup-card').fadeIn();
                $('.popup-card').css('display', 'flex');
                document.querySelector('.popup-card').querySelector('.chinese-key-hieroglyph__hieroglyph').innerHTML = event.target.querySelector('.chinese-key-hieroglyph__hieroglyph').innerHTML;
                document.querySelector('.popup-card').querySelector('.chinese-key-hieroglyph__pin').textContent = event.target.querySelector('.chinese-key-hieroglyph__pin').textContent;
                document.querySelector('.popup-card').querySelector('.chinese-key-hieroglyph__description').textContent = event.target.querySelector('.chinese-key-hieroglyph__description').textContent;
                document.querySelector('.popup-card').querySelector('.chinese-key-hieroglyph__grey-text_top').textContent = event.target.querySelector('.chinese-key-hieroglyph__grey-text_top').textContent;
                document.querySelector('.popup-card').querySelector('.chinese-key-hieroglyph__grey-text_bottom').innerHTML = event.target.querySelector('.chinese-key-hieroglyph__grey-text_bottom').innerHTML;
                document.querySelector('.popup-card').querySelector('.hieroglyph-list__text-chinese').innerHTML = event.target.querySelector('.hieroglyph-list__text-chinese').innerHTML;
            }
        })

        $('.popup-favor__close').on('click', function (e) {
            e.preventDefault();
            $('.popup-card').fadeOut();
        });
    }

    if (document.querySelector('.translate-saying-block') !== null) {
        let allButtons = document.querySelector('.translate-saying-block__buttons-row').querySelectorAll('.button-with-text-block');
        let allTranslateBlocks = document.querySelector('.translate-saying-block_translation').querySelectorAll('.translate-saying-block_text-block')

        $('.translate-saying-block__buttons-row').on('click', event => {
            if (event.target && event.target.classList.contains('button-with-text-block')) {
                event.target.classList.toggle('button-with-text-block_closed');
            }
            if (event.target && (event.target.classList.contains('btn__translate-saying-block') || event.target.classList.contains('button-with-text-block_text'))) {
                event.target.parentElement.classList.toggle('button-with-text-block_closed');
            }

            if (event.target && event.target.classList.contains('btn_image')) {
                event.target.parentElement.parentElement.classList.toggle('button-with-text-block_closed');
            }

            if (allButtons[0].classList.contains('button-with-text-block_closed')) {
                allTranslateBlocks[1].classList.add('translate-saying-block_text-block__hidden');
                allTranslateBlocks[0].classList.add('translate-saying-block_text-block__half-width');
                allTranslateBlocks[2].classList.add('translate-saying-block_text-block__half-width');
            } else {
                allTranslateBlocks[1].classList.remove('translate-saying-block_text-block__hidden');
                allTranslateBlocks[0].classList.remove('translate-saying-block_text-block__half-width');
                allTranslateBlocks[2].classList.remove('translate-saying-block_text-block__half-width');
            }

            if (allButtons[1].classList.contains('button-with-text-block_closed')) {
                allTranslateBlocks[2].classList.add('translate-saying-block_text-block__hidden');
                allTranslateBlocks[0].classList.add('translate-saying-block_text-block__half-width');
                allTranslateBlocks[1].classList.add('translate-saying-block_text-block__half-width');
            } else {
                allTranslateBlocks[2].classList.remove('translate-saying-block_text-block__hidden');
                allTranslateBlocks[1].classList.remove('translate-saying-block_text-block__half-width');
            }

            if (allButtons[1].classList.contains('button-with-text-block_closed') && allButtons[0].classList.contains('button-with-text-block_closed')) {
                allTranslateBlocks[0].classList.add('translate-saying-block_text-block__full-width');
            } else {
                allTranslateBlocks[0].classList.remove('translate-saying-block_text-block__full-width');
            }
        })

        $('.popup-favor__close').on('click', function (e) {
            e.preventDefault();
            $('.popup-card').fadeOut();
        });
    }

    if (document.querySelector('.lesson-study-dialogs-items') !== null) {
        let indexOfPhrase = 0
        let allPhrase = document.querySelector('.lesson-study-dialogs-items').querySelectorAll('.lesson-study-dialogs-item')

        allPhrase.forEach((phrase, i) => {
            if (i !== indexOfPhrase) {
                allPhrase[i].classList.add('lesson-study-dialogs-item__hidden')
            }
        })

        $('.lesson-study-dialogs__buttons').on('click', event => {
            if (event.target && event.target.classList.contains('lesson-study-dialogs__button-prev') && indexOfPhrase < allPhrase.length - 1) {
                indexOfPhrase++
            }

            if (event.target && event.target.classList.contains('lesson-study-dialogs__button-next') && indexOfPhrase > 0) {
                indexOfPhrase--
            }

            let lastPhrase = allPhrase[0]

            allPhrase.forEach((phrase, i) => {
                if (i <= indexOfPhrase) {
                    allPhrase[i].classList.remove('lesson-study-dialogs-item__hidden')
                    lastPhrase = allPhrase[i]

                } else {
                    allPhrase[i].classList.add('lesson-study-dialogs-item__hidden')
                }
            })

            $('html, body').animate({
                scrollTop: $(lastPhrase).offset().top - 150
            }, 2000);
        })


    }

    if (document.querySelector('.writing-decomposition') !== null) {
        let writingArea = document.querySelector('.writing-decomposition-area');
        let allDecompositionModes = document.querySelector('.writing-decomposition-modes').querySelectorAll('.writing-decomposition-mode')

        $('.writing-decomposition-modes').on('click', event => {
                allDecompositionModes.forEach(mode => {
                    if (mode.classList.contains('writing-decomposition-mode2') && mode.classList.contains('active')) {
                        writingArea.firstElementChild.src = 'images/writing.png'
                    }
                    if (mode.classList.contains('writing-decomposition-mode3') && mode.classList.contains('active')) {
                        writingArea.firstElementChild.src = 'images/content/university/writing2.png'
                    }
                    if (mode.classList.contains('writing-decomposition-mode4') && mode.classList.contains('active')) {
                        writingArea.firstElementChild.src = 'images/content/university/writing3.png'
                    }
                })
            }
        )

        $('.writing-decomposition-tools__view').on('click', event => {
            if (event.target.classList.contains('inactive')) {
                writingArea.firstElementChild.classList.add('writing-decomposition-area__clear-area')
            } else {
                writingArea.firstElementChild.classList.remove('writing-decomposition-area__clear-area')
            }
        })
    }

    if (document.querySelector('.btn-paid-popup') !== null) {
        $('.btn-paid-popup').on('click', function (e) {
            e.preventDefault();

            $.fancybox.open({
                type: 'inline',
                src: '.popup-paid-content',
                opts: {
                    touch: false
                }
            });

            bodyScrollLock.disableBodyScroll();

            $(document.querySelector('.popup-paid-content').querySelector('.popup-paid-content__back-button')).on('click', event => {
                $.fancybox.close();
                bodyScrollLock.clearAllBodyScrollLocks();
            })

            if (window.matchMedia('(max-width: 767px)').matches) {
                document.querySelector('.fancybox-container').style = 'z-index: 2999';
                document.querySelector('.fancybox-container').querySelector('.fancybox-bg').style = 'background: #ffffff'
            }
        })
    }

    if (document.querySelector('.lesson-attention') !== null) {
        $('.lesson-attention').on('click', event => {
            $('.popup-attention').fadeIn();
            $('.popup-attention').css('display', 'flex')
        })

        $(document.querySelector('.popup-attention').querySelector('.popup-close-sage__close')).on('click', event => {
            $('.popup-attention').fadeOut();
        })
        $(document.querySelector('.popup-attention').querySelector('.popup-attention__button')).on('click', event => {
            $('.popup-attention').fadeOut();
        })
    }

    if (document.querySelector('.lesson-help-listen-and-do-exercise') !== null) {
        $('.lesson-help-listen-and-do-exercise').on('click', event => {
            $('.popup-listen-and-do-exercise').fadeIn();
            $('.popup-listen-and-do-exercise').css('display', 'flex')
        })

        document.querySelectorAll('.popup-listen-and-do-exercise').forEach(popup => {
            $(popup.querySelector('.popup-close-sage__close')).on('click', event => {
                $(popup).fadeOut();
            })
        })

        let allTranslateTexts = document.querySelector('.popup-tip__list').querySelectorAll('.popup-tip__list-item-text_translate')
        let allPininTexts = document.querySelector('.popup-tip__list').querySelectorAll('.popup-tip__list-item-text_pin')
        let allButtons = document.querySelector('.popup-tip__buttons-row').querySelectorAll('.popup-tip-button')

        $(allButtons[0]).on('click', event => {
            allPininTexts.forEach(textBlock => {
                textBlock.classList.toggle('popup-tip__list-item-text_active')
            })
        })
        $(allButtons[1]).on('click', event => {
            allTranslateTexts.forEach(textBlock => {
                textBlock.classList.toggle('popup-tip__list-item-text_active')
            })
        })
    }

    if (document.querySelector('.combine-sentences-block') !== null) {
        const ans = {
            '坐飞机去北京很贵但是坐飞机去去北京很贵但是坐飞机去北京很贵': '但是里面有很多衣服', //1c 2e 3d 4a 5h 6j 7i 8b 9f 10g
            '虽然这件衣服是在意大利做的这件衣服是在意大利做的': '但是质量很好但是质量很好但是质量很好',
            '虽然我的房间很小我的房间很小我的房间很': '但是坐飞机去北京很贵但是坐飞机去坐飞机去北京很贵但是坐飞机去北京很贵',
            '虽然外边下雨': '但是很好吃',
            '虽然房子前边没有花园': '但是我不看电影',
            '虽然饭馆有咖啡': '但是他们不要去外面',
            '虽然这个衣柜很小': '但是我很喜欢我的房间',
            '虽然苹果很贵': '但是房子里边很舒服',
            '虽然外面不冷也不热，天气很好': '但是他没带雨伞。',
            '虽然我有电视': '但是我想喝茶'
        }
        let allLeftSentences = document.querySelector('.combine-sentences-block__column_main').querySelectorAll('.combine-sentences-block__column-item')
        let allRightSentences = document.querySelector('.combine-sentences-block__column_sub').querySelectorAll('.combine-sentences-block__column-item')
        let currentLeft = ''
        let currentRight = ''

        allLeftSentences.forEach(currentCard => {
            currentCard.addEventListener('click', function () {
                if (currentCard.getAttribute('data-disabled') === null) {
                    allLeftSentences.forEach((card, i) => {
                        card.classList.remove('combine-sentences-block__column-item_active')
                    })
                    currentCard.classList.add('combine-sentences-block__column-item_active')
                    currentLeft = currentCard.querySelector('.combine-sentences-block__text').textContent
                }
            })
        })

        allRightSentences.forEach(currentCard => {
            if (currentCard.getAttribute('data-disabled') === null) {
                currentCard.addEventListener('click', function () {
                    allRightSentences.forEach((card, i) => {
                        card.classList.remove('combine-sentences-block__column-item_active')
                    })
                    currentCard.classList.add('combine-sentences-block__column-item_active')
                    currentRight = currentCard.querySelector('.combine-sentences-block__text').textContent
                })
            }
        })

        document.querySelector('.combine-sentences-block').addEventListener('click', () => {
            if (currentLeft !== '' && currentRight !== '') {
                if (ans[currentLeft] === currentRight) {
                    allLeftSentences.forEach(leftCard => {
                        if (leftCard.classList.contains('combine-sentences-block__column-item_active')) {
                            leftCard.setAttribute('data-disabled', '')
                            leftCard.classList.add('combine-sentences-block__column-item_blocked')
                            leftCard.classList.remove('combine-sentences-block__column-item_active')
                        }
                    })
                    allRightSentences.forEach(rightCard => {
                        if (rightCard.classList.contains('combine-sentences-block__column-item_active')) {
                            rightCard.setAttribute('data-disabled', '')
                            rightCard.classList.add('combine-sentences-block__column-item_done')
                        }
                    })
                } else {
                    allRightSentences.forEach(rightCard => {
                        if (rightCard.classList.contains('combine-sentences-block__column-item_active')) {
                            rightCard.classList.add('combine-sentences-block__column-item_wrong')
                        }
                    })
                }
                currentLeft = ''
                currentRight = ''
                const clearAfterChoosing = setTimeout(function () {
                    allLeftSentences.forEach(leftCard => {
                        leftCard.classList.remove('combine-sentences-block__column-item_active')
                    })
                    allRightSentences.forEach(rightCard => {
                        rightCard.classList.remove('combine-sentences-block__column-item_wrong')
                        rightCard.classList.remove('combine-sentences-block__column-item_active')
                    })
                    if (window.matchMedia('(max-width: 767px)').matches) {
                        $('.combine-sentences-block__column_sub').fadeOut();
                    }
                }, 1000)
            }
        })

        document.querySelectorAll('.combine-sentences-block__button').forEach(btn => {
            $(btn).on('click', event => {
                $('.combine-sentences-block__column_sub').fadeIn();
                $('.combine-sentences-block__column_sub').css('display', 'flex')
            })
        })
        $(document.querySelector('.combine-sentences-block__column_sub').querySelector('.popup-close-sage__close')).on('click', event => {
            $('.combine-sentences-block__column_sub').fadeOut();
        })

        $(window).resize(function () {
            if ($(window).width() > 767) {
                $('.combine-sentences-block__column_sub').css('display', 'flex')
            }
        });
    }

    if (document.querySelector('.thematic-dictionary-card__word-variant_game-writing') !== null) {
        document.querySelector('.thematic-dictionary-card__word-variant').querySelectorAll('.thematic-dictionary-card__word-variant--item').forEach(card => {
            card.addEventListener('click', event => {
                if (event.target && event.target.classList.contains('thematic-dictionary-card__listen')) {
                    card.classList.add('active')
                }
            })
        })
    }

    if (document.querySelector('.lesson-hieroglyph-view_position-relative') !== null) {
        document.querySelectorAll('.lesson-hieroglyph-view__answer-container').forEach(block => {
            $(block).on('click', event => {
                block.classList.toggle('lesson-hieroglyph-view__answer-container_active')
            })
        })
    }

    if (document.querySelector('.header__user-info') !== null) {
        $('.header__user-info-element_notifications').on('click', event => {
            if (event.target && event.target.classList.contains('header__user-info-element_notifications')) {

                document.querySelector('.header__user-info-element_notifications').classList.remove('header__user-info-element_notifications-active')

                if (document.querySelector('.header__user-info-notification-block').style.display !== 'flex') {
                    $('.header__user-info-notification-block').fadeIn()
                    $('.header__user-info-notification-block').css('display', 'flex')
                } else {
                    $('.header__user-info-notification-block').fadeOut()
                }
            }
        })
        $('.header__user-info-main-text').on('click', event => {
            if (document.querySelector('.user-profile-block').style.display !== 'flex') {
                $('.user-profile-block').fadeIn()
                $('.user-profile-block').css('display', 'flex')
            } else {
                $('.user-profile-block').fadeOut()
            }
        })
    }

    if (document.querySelector('.personal-account-menu') !== null) {
        $('.personal-account-menu__list-item_menu').on('click', event => {
            document.querySelector('.personal-account-menu__list-item_menu').classList.toggle('personal-account-menu__list-item_menu-active')
            document.querySelector('.personal-account-menu_mobile-column').classList.toggle('personal-account-menu_mobile-column_open')
        })
    }

    if (document.querySelector('.filters_personal-account') !== null && window.matchMedia('(max-width: 767px)').matches) {
        $(document.querySelector('.personal-account-input-wrapper').querySelector('.personal-account-input__search-button')).on('click', event => {
            document.querySelector('.personal-account-input-wrapper').classList.add('personal-account-input-wrapper_active')
        })
        document.querySelector('.personal-account-input-wrapper').querySelector('.popup-favor__close').addEventListener('click', event => {
            document.querySelector('.personal-account-input-wrapper').classList.remove('personal-account-input-wrapper_active')
        })
        window.addEventListener('click', event => {
            if (!event.target.closest('.personal-account-input-wrapper')) {
                document.querySelector('.personal-account-input-wrapper').classList.remove('personal-account-input-wrapper_active')
            }
        })
    }

    if (document.querySelector('.cookies-popup') !== null) {
        document.querySelectorAll('.cookies-popup').forEach(cookiePopup => {
            cookiePopup.querySelector('.popup-favor__close').addEventListener('click', event => {
                $('.cookies-popup').fadeOut()
            })
            cookiePopup.querySelector('.btn-next__cookies').addEventListener('click', event => {
                $('.cookies-popup').fadeOut()
            })
        })
    }

    if (document.querySelector('.personal-account-favorites__list') !== null) {
        document.querySelector('.personal-account-favorites__list').querySelectorAll('.personal-account-favorites__list-item').forEach(favorItem => {
            $(favorItem.querySelector('.personal-account-favorites__list-item-close')).on('click', event => {
                $(favorItem).fadeOut()
            })
        })
    }

    if (document.querySelector('.filters-date-sort') !== null) {
        document.querySelectorAll('.filters-date-sort').forEach(filterBlock => {
            filterBlock.querySelectorAll('.filters-date-sort__date-item').forEach(dateItem => {
                dateItem.addEventListener('click', event => {
                    filterBlock.querySelectorAll('.filters-date-sort__date-item').forEach(filterItem => {
                        filterItem.classList.remove('filters-date-sort__date-item_active')
                        if (dateItem === filterItem) filterItem.classList.add('filters-date-sort__date-item_active')
                    })

                })
            })
        })
    }

    if (document.querySelector('.personal-account-start__slider') !== null && window.matchMedia('(min-width: 767px)').matches) {
        let lengthSlides = document.querySelectorAll('.personal-account-start__slide').length
        document.querySelectorAll('.personal-account-start__slide').forEach((currentSlide, i) => {
            currentSlide.style.zIndex = lengthSlides - i
            currentSlide.style.bottom = 10 * (lengthSlides - i) + 'px'
        })

        document.querySelector('.standalone-btn__left-start').addEventListener('click', event => {
            let currentSlide = document.querySelectorAll('.personal-account-start__slide')[document.querySelectorAll('.personal-account-start__slide').length - 1]
            currentSlide.style.animation = 'changeCardLeft 1.5s'

            setTimeout(() => {
                currentSlide.style.animation = 'changeCardLeft 1.5s reverse'
                document.querySelector('.personal-account-start__slider').prepend(currentSlide)

                document.querySelectorAll('.personal-account-start__slide').forEach((currentSlide) => {
                    currentSlide.style.zIndex = ''
                    currentSlide.style.bottom = ''
                })

                document.querySelectorAll('.personal-account-start__slide').forEach((currentSlide, i) => {
                    currentSlide.style.zIndex = lengthSlides - i
                    currentSlide.style.bottom = 10 * (lengthSlides - i) + 'px'
                })
            }, 1400)
            setTimeout(() => {
                currentSlide.style.animation = ''
            }, 3000)
        })

        document.querySelector('.standalone-btn__right-start').addEventListener('click', event => {
            let currentSlide = document.querySelectorAll('.personal-account-start__slide')[0]
            currentSlide.style.animation = 'changeCardRight 1.5s'
            setTimeout(() => {
                currentSlide.style.animation = 'changeCardRight 1.5s reverse'
                document.querySelector('.personal-account-start__slider').append(currentSlide)

                document.querySelectorAll('.personal-account-start__slide').forEach((currentSlide) => {
                    currentSlide.style.zIndex = ''
                    currentSlide.style.bottom = ''
                })

                document.querySelectorAll('.personal-account-start__slide').forEach((currentSlide, i) => {
                    currentSlide.style.zIndex = lengthSlides - i
                    currentSlide.style.bottom = 10 * (lengthSlides - i) + 'px'
                })
            }, 1400)

            setTimeout(() => {
                currentSlide.style.animation = ''
            }, 3000)
        })

    }

    if (document.querySelector('.personal-account-start__slider') !== null && window.matchMedia('(max-width: 767px)').matches) {
        document.querySelector('.personal-account-start__slider-button-row').remove()
        $('.personal-account-start__slider').slick({
            arrows: false,
            infinite: false,
            variableWidth: true
        });
    }

    if (document.querySelector('.children-card-block') !== null) {
        let allChildrenNames = document.querySelectorAll('.children-card-block__choose-children'),
            allChildrenCard = document.querySelectorAll('.children-card')

        allChildrenNames.forEach((childName, i) => {
            childName.addEventListener('click', event => {
                document.querySelector('.children-card-block__add-children-button').classList.remove('children-card-block__add-children-button_active')
                document.querySelector('.add-children-block').style.display = 'none'

                allChildrenNames.forEach(currentChildName => {
                    currentChildName.classList.remove('children-card-block__choose-children_active')
                })
                childName.classList.add('children-card-block__choose-children_active')
                allChildrenCard.forEach(currentChildCard => {
                    currentChildCard.classList.remove('children-card_active')
                })
                allChildrenCard[i].classList.add('children-card_active')
            })
        })

        document.querySelector('.children-card-block__add-children-button').addEventListener('click', event => {
            allChildrenNames.forEach(childName => {
                childName.classList.remove('children-card-block__choose-children_active')
            })
            allChildrenCard.forEach(childCard => {
                childCard.classList.remove('children-card_active')
            })

            document.querySelector('.add-children-block').style.display = 'flex'
            document.querySelector('.children-card-block__add-children-button').classList.add('children-card-block__add-children-button_active')
        })
    }

    if (document.querySelector('.popup-photo-slider-block') !== null) {
        let sliderBlock = document.querySelector('.popup-photo-slider-block'),
            allSlides = sliderBlock.querySelectorAll('.popup-photo-slider-item'),
            currentSlideIndex = 0

        allSlides.forEach((slide, i) => {
            $(slide).on('click', function (e) {
                e.preventDefault();

                $.fancybox.open({
                    type: 'inline',
                    src: '.popup-photo-slider',
                    opts: {
                        touch: false
                    }
                });

                bodyScrollLock.disableBodyScroll();

                document.querySelector('.popup-photo-slider').style.display = 'flex'
                document.querySelector('.fancybox-close-small').style.display = 'none'

                document.querySelector('.fancybox-slide').style.display = 'flex'
                document.querySelector('.fancybox-slide').style.justifyContent = 'center'
                document.querySelector('.fancybox-slide').style.alignItems = 'center'

                document.querySelector('.popup-photo-slider__slide').style.backgroundImage = this.style.backgroundImage
                currentSlideIndex = i

                $(document.querySelector('.popup-photo-slider').querySelector('.popup-photo-slider__close')).on('click', event => {
                    $.fancybox.close();
                    bodyScrollLock.clearAllBodyScrollLocks();
                })
            })
        })

        $(document.querySelector('.popup-photo-slider').querySelector('.slider_arrow_popup')).on('click', function (e) {
            currentSlideIndex++
            if (currentSlideIndex === allSlides.length) currentSlideIndex = 0
            document.querySelector('.popup-photo-slider__slide').style.backgroundImage = allSlides[currentSlideIndex].style.backgroundImage
        })

        $(document.querySelector('.popup-photo-slider').querySelector('.slider_arrow_popup_left')).on('click', function (e) {
            currentSlideIndex--
            if (currentSlideIndex < 0) currentSlideIndex = allSlides.length - 1
            document.querySelector('.popup-photo-slider__slide').style.backgroundImage = allSlides[currentSlideIndex].style.backgroundImage
        })
    }

    if (document.querySelector('.block-blog-slider') !== null) {
        let sliderBlock = document.querySelector('.block-blog-slider'),
            allSlides = sliderBlock.querySelectorAll('.block-slider__slide-wrapper'),
            activeSlide = sliderBlock.querySelector('.block-slider__active-slide-img'),
            currentSlideIndex = 0

        allSlides.forEach((slide, i) => {
            slide.addEventListener('click', event => {
                activeSlide.src = slide.querySelector('.block-slider__slide').src

                currentSlideIndex = i
                allSlides.forEach(currentSlide => {
                    currentSlide.classList.remove('block-slider__slide-wrapper_active')
                })
                slide.classList.add('block-slider__slide-wrapper_active')
            })
        })

        sliderBlock.querySelector('.slider_arrow').addEventListener('click', event => {
            currentSlideIndex++
            if (currentSlideIndex === allSlides.length) currentSlideIndex = 0
            activeSlide.src = allSlides[currentSlideIndex].querySelector('.block-slider__slide').src

            allSlides.forEach(currentSlide => {
                currentSlide.classList.remove('block-slider__slide-wrapper_active')
            })
            allSlides[currentSlideIndex].classList.add('block-slider__slide-wrapper_active')
        })

        sliderBlock.querySelector('.slider_arrow_left').addEventListener('click', event => {
            currentSlideIndex--
            if (currentSlideIndex < 0) currentSlideIndex = allSlides.length - 1
            activeSlide.src = allSlides[currentSlideIndex].querySelector('.block-slider__slide').src

            allSlides.forEach(currentSlide => {
                currentSlide.classList.remove('block-slider__slide-wrapper_active')
            })
            allSlides[currentSlideIndex].classList.add('block-slider__slide-wrapper_active')
        })
    }

    if (document.querySelector('.alphabet-block_buttons') !== null) {
        let allButtons = document.querySelector('.alphabet-block_buttons').querySelectorAll('.alphabet-block_button')
        allButtons.forEach(btn => {
            btn.addEventListener('click', event => {
                allButtons.forEach(currentBtn => {
                    currentBtn.classList.remove('alphabet-block_button_active')
                })
                btn.classList.add('alphabet-block_button_active')
            })
        })
    }

    if (document.querySelector('.alphabet-block__row') !== null) {
        let allLetters = document.querySelector('.alphabet-block__row').querySelectorAll('.alphabet-block__letter')

        allLetters.forEach(letter => {
            letter.addEventListener('click', evt => {
                allLetters.forEach(currentLetter => {
                    currentLetter.classList.remove('alphabet-block__letter_active')
                })
                letter.classList.add('alphabet-block__letter_active')
            })
        })
    }

    if (document.querySelector('.personal-account-menu__active-line') !== null) {
        let menu = document.querySelector('.personal-account-menu__active-line').parentElement,
            activeLine = document.querySelector('.personal-account-menu__active-line')

        activeLine.style.left = menu.querySelector('.personal-account-menu__list-item_active').offsetLeft + 5 + 'px'
        activeLine.style.width = getComputedStyle(menu.querySelector('.personal-account-menu__list-item_active')).width

        menu.querySelectorAll('.personal-account-menu__list-item').forEach(menuElement => {
            if (!menuElement.classList.contains('nonactive')) {
                menuElement.addEventListener('mouseenter', event => {
                    activeLine.style.width = getComputedStyle(menuElement).width
                    activeLine.style.left = menuElement.offsetLeft + 5 + 'px'
                })

                menuElement.addEventListener('click', event => {
                    menu.querySelectorAll('.personal-account-menu__list-item').forEach(currentMenuElement => {
                        currentMenuElement.classList.remove('personal-account-menu__list-item_active')
                    })
                    menuElement.classList.add('personal-account-menu__list-item_active')
                    activeLine.style.left = menuElement.offsetLeft + 'px'
                })
            }
        })
        menu.addEventListener('mouseleave', event => {
            activeLine.style.left = menu.querySelector('.personal-account-menu__list-item_active').offsetLeft + 'px'
            activeLine.style.width = getComputedStyle(menu.querySelector('.personal-account-menu__list-item_active')).width
        })
    }

    if (document.querySelector('.choose-category-popup') !== null) {
        document.querySelectorAll('.choose-category-popup').forEach(openPopupBtn => {
            $(openPopupBtn).on('click', function (e) {
                e.preventDefault()

                $.fancybox.open({
                    type: 'inline',
                    src: '.popup-choose-category',
                    opts: {
                        touch: false
                    }
                });
            })
        })
    }

    if (document.querySelector('.notification-block__button-show-more') !== null) {
        let showMoreButtons = document.querySelectorAll('.notification-block__button-show-more')

        showMoreButtons.forEach(currentButton => {
            currentButton.addEventListener('click', event => {
                currentButton.previousElementSibling.querySelectorAll('.notification-block__list-item_hidden').forEach(listItem => {
                    listItem.classList.remove('notification-block__list-item_hidden')
                })
                currentButton.remove()
            })
        })
    }

    if (document.querySelector('.find-teachers-popup') !== null) {
        document.querySelector('.find-teachers-popup-button').addEventListener('click', event => {
            event.preventDefault()
            $.fancybox.open({
                type: 'inline',
                src: '.find-teachers-popup',
                opts: {
                    touch: false
                }
            });
            document.querySelector('.fancybox-content').style.display = 'inline-flex'
        })
        document.querySelector('.find-teachers-popup').querySelector('.close-popup-button_large-cross').addEventListener('click', event => {
            $.fancybox.close()
        })

        document.querySelector('.find-teachers-popup').querySelectorAll('.filters-personal-account__filter').forEach(filter => {
            filter.addEventListener('click', event => {
                let newList = []
                document.querySelector('.find-teachers-popup').querySelectorAll('.choose-teacher-list__item').forEach(listItem => {
                    newList.push(listItem)
                })

                newList.sort()

                document.querySelector('.find-teachers-popup').querySelector('.choose-teacher-list').innerHTML = ''
                newList.forEach(listItem => {
                    document.querySelector('.find-teachers-popup').querySelector('.choose-teacher-list').insertAdjacentElement('afterbegin', listItem)
                })
            })
        })
        document.querySelector('.find-teachers-popup').querySelector('.checkbox-block').addEventListener('click', event => {
            let newList = []
            document.querySelector('.find-teachers-popup').querySelectorAll('.choose-teacher-list__item').forEach(listItem => {
                newList.push(listItem)
            })

            newList.sort()
            document.querySelector('.find-teachers-popup').querySelector('.choose-teacher-list').innerHTML = ''
            newList.forEach(listItem => {
                document.querySelector('.find-teachers-popup').querySelector('.choose-teacher-list').insertAdjacentElement('afterbegin', listItem)
            })
        })

        document.querySelector('.active-checkbox-span').addEventListener('click', event => {

            document.querySelector('.active-checkbox-span').previousElementSibling.toggleAttribute('checked')
        })

    }

    if (document.querySelector('.show-more-text-button') !== null) {
        document.querySelectorAll('.show-more-text-button').forEach(currentButton => {
            let textBlockToResize = currentButton.previousElementSibling,
                maxHeight = window.getComputedStyle(textBlockToResize).maxHeight,
                buttonShowMore = currentButton,
                buttonText = buttonShowMore.textContent
            buttonShowMore.addEventListener('click', event => {
                if (buttonShowMore.classList.contains('active')) {
                    textBlockToResize.style.maxHeight = maxHeight
                    buttonShowMore.classList.remove('active')
                    buttonShowMore.textContent = buttonText
                } else {
                    textBlockToResize.style.maxHeight = 'max-content'
                    buttonShowMore.classList.add('active')
                    buttonShowMore.textContent = 'скрыть'
                }
            })
        })
    }

    if (document.querySelector('.achievements-filters') !== null) {
        let allFiltersButtons = document.querySelector('.achievements-filters').querySelectorAll('.achievements-filters__item')
        allFiltersButtons.forEach(filter => {
            filter.addEventListener('click', event => {
                allFiltersButtons.forEach(currentFilter => {
                    currentFilter.classList.remove('achievements-filters__item_active')
                })
                filter.classList.add('achievements-filters__item_active')

                if (document.querySelector('.popup-all-achievements') !== null) {
                    let newList = []
                    document.querySelector('.popup-all-achievements').querySelector('.personal-account-achievements__list_popup').querySelectorAll('.personal-account-achievements__item').forEach(listItem => {
                        newList.push(listItem)
                    })

                    newList.sort()

                    document.querySelector('.popup-all-achievements').querySelector('.personal-account-achievements__list_popup').innerHTML = ''
                    newList.forEach(listItem => {
                        document.querySelector('.popup-all-achievements').querySelector('.personal-account-achievements__list_popup').insertAdjacentElement('afterbegin', listItem)
                    })
                }
            })
        })
    }

    if (document.querySelector('.open-search-button') !== null) {
        $('.open-search-button').on('click', event => {
            $('.header-search-block').toggleClass('open');
            $('.header-search-block_input').focus()
        })
    }

    if (document.querySelector('.lessons-found__show') !== null) {
        document.querySelectorAll('.lessons-found__show').forEach(btn => {
            btn.addEventListener('click', event => {
                btn.parentElement.querySelectorAll('.hidden-list-item').forEach(hiddenElement => {
                    hiddenElement.classList.remove('hidden-list-item')
                })
                btn.remove()
            })
        })
    }

    if (document.querySelector('.personal-account__button_show-more') !== null) {
        document.querySelectorAll('.personal-account__button_show-more').forEach(btn => {
            btn.addEventListener('click', event => {
                btn.parentElement.querySelectorAll('.hidden-in-mobile').forEach(hiddenElement => {
                    hiddenElement.classList.remove('hidden-in-mobile')
                })
                btn.remove()
            })
        })
    }

    if (document.querySelector('.circle-statistics') !== null) {
        setTimeout(() => {
            document.querySelectorAll('.circle-statistics').forEach(circle => {
                circle.classList.add('circle-statistics_paused')
            })
        }, 1500)
    }

    if (document.querySelector('.personal-account__list_statistics-graph') !== null) {
        let graphAllList = document.querySelectorAll('.personal-account__list_statistics-graph')
        graphAllList.forEach(graphList => {
            graphList.querySelectorAll('.personal-account-statistics-graph__list-item').forEach(currentListItem => {
                currentListItem.addEventListener('click', event => {
                    graphList.querySelectorAll('.personal-account-statistics-graph__list-item').forEach(listItem => {
                        listItem.classList.remove('personal-account-statistics-graph__list-item_active')
                    })
                    currentListItem.classList.add('personal-account-statistics-graph__list-item_active')
                })
            })
        })
    }

    if (document.querySelector('.personal-account-graph_statistics-graph') !== null) {
        let graphBlock = document.querySelector('.personal-account-graph_statistics-graph')
        graphBlock.querySelectorAll('.personal-account-graph__dot').forEach(currentDot => {
            currentDot.addEventListener('click', event => {
                graphBlock.querySelectorAll('.personal-account-graph__dot').forEach(dot => {
                    dot.classList.remove('personal-account-graph__dot_large')
                })
                currentDot.classList.add('personal-account-graph__dot_large')
            })
        })
    }

    if (document.querySelector('.block-invite__search') !== null) {
        document.querySelector('.block-invite__search').addEventListener('click', event => {
            document.querySelector('.block-invite__search-row-img').classList.add('block-invite__search-row-img_animation')
            setTimeout(() => {
                document.querySelector('.block-invite__search-row-img').classList.remove('block-invite__search-row-img_animation')
            }, 700)
        })
    }

    if (document.querySelector('.menu_statistics-graph-menu') !== null) {
        let graphMenu = document.querySelector('.menu_statistics-graph-menu')

        graphMenu.querySelector('.personal-account__list_statistics-graph').querySelectorAll('.personal-account-statistics-graph__list-item').forEach(listItem => {
            listItem.addEventListener('click', event => {
                listItem.classList.remove('personal-account-statistics-graph__list-item_active')
                graphMenu.querySelector('.menu-btn').innerHTML = listItem.outerHTML
                graphMenu.querySelector('.menu-btn').classList.remove('is-active');

                $('.menu-block_statistics-graph-menu').animate({
                    width: 0,
                }, () => {
                    $('.menu-block_statistics-graph-menu').hide();
                });

            })
        })
    }

    if (document.querySelector('[data-popup-name]') !== null) {
        let openPopupElements = document.querySelectorAll('[data-popup-name]')

        openPopupElements.forEach(currentOpenPopupElement => {
            let popupName = currentOpenPopupElement.getAttribute('data-popup-name'),
                popup = document.querySelector(`.${popupName}`),
                popupCloseAll = popup.querySelectorAll('[data-popup-close]')

            popupCloseAll.forEach(popupClose => {
                popupClose.addEventListener('click', event => {
                    event.preventDefault()
                    $(popup).fadeOut()
                    popup.classList.remove('popup-active')
                })
            })


            currentOpenPopupElement.addEventListener('click', event => {
                event.preventDefault()
                $(popup).fadeIn()
                $(popup).css('display', 'flex')
                popup.classList.add('popup-active')
            })

        })

        document.addEventListener('mouseup', event => {
            if (document.querySelector('.popup.popup-active') !== null) {
                let openPopup = document.querySelector('.popup.popup-active')

                if (!event.target.closest('.popup-active') && !event.target.closest('[data-popup-name]')) {
                    $(openPopup).fadeOut()
                    openPopup.classList.remove('popup-active')
                }
            }
            if (document.querySelector('.filters-choose-category-popup') !== null) {
                let openPopups = document.querySelectorAll('.filters-choose-category-popup')

                openPopups.forEach(popup => {
                    if (!event.target.closest('.filters-choose-category-popup.popup-active') && !event.target.closest('[data-popup-name]')) {
                        $(popup).fadeOut()
                        popup.classList.remove('popup-active')
                    }
                })
            }
        })
    }

    function showPopup(popupElement, openPopupElement, isInBlock = false, offsetX = 0, offsetY = 0, mOffsetX = 0, mOffsetY = 0) {
        if (isInBlock) {
            if (window.matchMedia('(max-width: 767px)').matches) {
                popupElement.style.top = openPopupElement.getBoundingClientRect().y + pageYOffset + offsetY + mOffsetY + 'px'
                popupElement.style.left = openPopupElement.getBoundingClientRect().x + pageXOffset + offsetX + mOffsetX + 'px'
                $(window).on('scroll resize', event => {
                    popupElement.style.top = openPopupElement.getBoundingClientRect().y + pageYOffset + offsetY + mOffsetY + 'px'
                    popupElement.style.left = openPopupElement.getBoundingClientRect().x + pageXOffset + offsetX + mOffsetX + 'px'
                })
            } else {
                popupElement.style.top = openPopupElement.getBoundingClientRect().y + pageYOffset + offsetY + 'px'
                popupElement.style.left = openPopupElement.getBoundingClientRect().x + pageXOffset + offsetX + 'px'
                $(window).on('scroll resize', event => {
                    popupElement.style.top = openPopupElement.getBoundingClientRect().y + pageYOffset + offsetY + 'px'
                    popupElement.style.left = openPopupElement.getBoundingClientRect().x + pageXOffset + offsetX + 'px'
                })
            }
        }
    }

    if (document.querySelector('.popup_add-to-friends') !== null) {
        let openPopupElements = document.querySelectorAll('[data-popup-name="popup_add-to-friends"]'),
            popup = document.querySelector('.popup_add-to-friends'),
            openPopupElement

        if (popup.classList.contains('popup_add-to-friends_only-photo')) {
            openPopupElements.forEach(currentPopupElement => {
                currentPopupElement.addEventListener('click', event => {
                    openPopupElement = currentPopupElement
                    popup.querySelector('.header__user-info-avatar-img').src = currentPopupElement.querySelector('.header__user-info-avatar-img').src
                    showPopup(popup, currentPopupElement, true, -55, 40, 15)
                })
            })
        } else {
            openPopupElements.forEach(currentPopupElement => {
                currentPopupElement.addEventListener('click', event => {
                    openPopupElement = currentPopupElement

                    popup.querySelector('.header__user-info-avatar-img').src = currentPopupElement.querySelector('.header__user-info-avatar-img').src
                    popup.querySelector('.popup__text_name').textContent = currentPopupElement.querySelector('.choose-item-list__item-title').textContent
                    showPopup(popup, currentPopupElement, true, -55, 40, 15)

                    if (currentPopupElement.classList.contains('already-friends')) {
                        popup.querySelector('.personal-account-profile__button-add-friends').classList.add('personal-account-profile__button-add-friends_already-friends')
                        popup.querySelector('.personal-account-profile__button-add-friends').textContent = 'В друзьях'
                    } else {
                        popup.querySelector('.personal-account-profile__button-add-friends').classList.remove('personal-account-profile__button-add-friends_already-friends')
                        popup.querySelector('.personal-account-profile__button-add-friends').textContent = 'В друзья'
                    }
                })
            })

            popup.querySelector('.personal-account-profile__button-add-friends').addEventListener('click', event => {
                if (!openPopupElement.classList.contains('already-friends')) {
                    openPopupElement.classList.add('already-friends')
                    popup.querySelector('.personal-account-profile__button-add-friends').classList.add('personal-account-profile__button-add-friends_already-friends')
                    popup.querySelector('.personal-account-profile__button-add-friends').textContent = 'В друзьях'
                }
            })
        }
    }

    if (document.querySelector('.popup_show-friends-statistics') !== null) {
        let openPopupElements = document.querySelectorAll('[data-popup-name="popup_show-friends-statistics"]'),
            popup = document.querySelector('.popup_show-friends-statistics')

        openPopupElements.forEach(currentPopupElement => {
            currentPopupElement.addEventListener('click', event => {
                popup.querySelector('.header__user-info-avatar-img').src = currentPopupElement.querySelector('.personal-account-graph__user-img').src
                popup.querySelector('.popup__text_stats-purple').textContent = currentPopupElement.querySelector('.personal-account-graph__user-progress').textContent
                showPopup(popup, currentPopupElement, true, -55, 30)
            })
        })
    }

    if (document.querySelector('.community-block__filters') !== null) {
        document.querySelector('.community-block__filters').querySelectorAll('.community-block__filters-item').forEach(filter => {
            filter.addEventListener('click', event => {
                document.querySelector('.community-block__filters').querySelectorAll('.community-block__filters-item').forEach(currentFilter => {
                    currentFilter.classList.remove('community-block__filters-item_active')
                })
                filter.classList.add('community-block__filters-item_active')
            })
        })
    }

    if (document.querySelector('.tariff_cost') !== null) {
        let tariffBlock = document.querySelector('.tariff_cost'),
            allTariffs = tariffBlock.querySelectorAll('.tariff_cost__column'),
            tariffInfoBlock = document.querySelector('.tariff_you-get.no-mobile'),
            isWasOffset = false

        allTariffs.forEach((tariffItem, i) => {
            tariffItem.addEventListener('click', event => {
                $(tariffInfoBlock.querySelector('.tariff_you-get__left-section')).fadeIn()
                if (i === 0) {
                    $(tariffInfoBlock.querySelector('.tariff_you-get__right-section')).fadeOut()
                }
                if (i > 0 && tariffInfoBlock.querySelector('.tariff_you-get__right-section').style.display !== 'block') {
                    $(tariffInfoBlock.querySelector('.tariff_you-get__right-section')).fadeIn()
                }
                if (!isWasOffset) {
                    $('html, body').animate({
                        scrollTop: $(tariffInfoBlock).offset().top - 150
                    }, 1500);
                    isWasOffset = true
                }
            })
        })
    }

    if (document.querySelector('.tariff_choice') !== null) {
        let tariffPopup = document.querySelector('.tariff_choice'),
            tariffPopupAllParameters = tariffPopup.querySelector('.tariff-choice_parameters').querySelectorAll('.tariff-choice_parameters__panda'),
            tariffPopupAllTeachers = tariffPopup.querySelector('.tariff-choice_teacher').querySelectorAll('.tariff-choice_teacher__panda'),
            tariffPopupAllLessons = tariffPopup.querySelector('.tariff-choice_lessons').querySelectorAll('.tariff-choice_lessons-cell__number'),
            isChanged = false

        let ageMultiplier = 1, languageMultiplier = 1, months = 6, lessonsPerMonth = 10, costPerLesson = 312,
            accessToSiteFunctions = 1250


        document.querySelectorAll(".tariff_cost__column-button").forEach(button => {
            button.addEventListener("click", evt => {
                document.querySelectorAll(".tariff-popup").forEach(popup => {
                    $(popup).fadeOut()
                })

                $(button.previousElementSibling).fadeIn()
                $(button.previousElementSibling).css("display", "flex")
                $('html, body').animate({
                    scrollTop: $(button.previousElementSibling).offset().top - 250
                }, 1000);
            })
            button.previousElementSibling.querySelectorAll(".tariff-popup_button-cancel").forEach(closeButton => {
                closeButton.addEventListener("click", evt => {
                    $(button.previousElementSibling).fadeOut()
                })
            })

            button.previousElementSibling.querySelectorAll(".tariff-popup_button").forEach(nextPopup => {
                nextPopup.addEventListener("click", evt => {
                    $.fancybox.open({
                        type: 'inline',
                        src: tariffPopup,
                        opts: {
                            touch: false,
                            afterLoad: function () {
                                document.querySelector('.fancybox-content').style.display = 'inline-flex'
                            }
                        },
                    });
                    $(button.previousElementSibling).fadeOut()
                })
            })
            tariffPopup.querySelector(".popup-close-sage__close").addEventListener("click", evt => {
                $.fancybox.close()
            })
        })

        tariffPopupAllParameters.forEach(parameter => {
            parameter.addEventListener('click', event => {
                tariffPopupAllParameters.forEach(currentParameter => {
                    currentParameter.classList.remove('tariff-choice_parameters__panda_active')
                })
                parameter.classList.add('tariff-choice_parameters__panda_active')
                ageMultiplier = parameter.getAttribute('data-cost')
                isChanged = true
            })
        })
        tariffPopupAllTeachers.forEach(teacher => {
            teacher.addEventListener('click', event => {
                tariffPopupAllTeachers.forEach(currentTeacher => {
                    currentTeacher.classList.remove('tariff-choice_teacher__panda_active')
                })
                teacher.classList.add('tariff-choice_teacher__panda_active')
                languageMultiplier = teacher.getAttribute('data-cost')
                isChanged = true
            })
        })
        tariffPopupAllLessons.forEach(lesson => {
            lesson.addEventListener('click', event => {
                tariffPopupAllLessons.forEach(currentLesson => {
                    currentLesson.classList.remove('tariff-choice_lessons-cell__number_active')
                })
                lesson.classList.add('tariff-choice_lessons-cell__number_active')
                lessonsPerMonth = +lesson.textContent
                isChanged = true
            })
        })
        tariffPopup.addEventListener('click', event => {
            if (isChanged) {
                tariffPopup.querySelector('.tariff-choice_footer__element-result span').textContent = calculator(true) + '₽'
                tariffPopup.querySelector('.tariff-choice_footer__element-lessons span').textContent = calculator() + '₽'
            }
        })

        function calculator(result) {
            let answer, answerString = ''
            isChanged = false
            if (result) {
                answer = `${accessToSiteFunctions + costPerLesson * ageMultiplier * languageMultiplier * months * lessonsPerMonth}`
            } else {
                answer = `${costPerLesson * ageMultiplier * languageMultiplier * months * lessonsPerMonth}`
            }
            answerString = answer.split('').reverse().join('')
            answerString = answerString.replace(/\d{3}/g, "$& ")
            return answerString.split('').reverse().join('')
        }
    }

    if (document.querySelector('.help-links') !== null) {
        let linksBlock = document.querySelector('.help-links'),
            allLinks = linksBlock.querySelectorAll('.help-links__link')

        allLinks.forEach(link => {
            link.addEventListener('click', event => {
                allLinks.forEach(currentLink => {
                    currentLink.classList.remove('help-links__link_active')
                })
                link.classList.add('help-links__link_active')

                let list = []
                document.querySelector('.help-popular-question__list_sort').querySelectorAll('.help-popular-question__list-item').forEach(listItem => {
                    list.push(listItem)
                })
                list.sort()

                document.querySelector('.help-popular-question__list_sort').innerHTML = ''
                list.forEach(listItem => {
                    document.querySelector('.help-popular-question__list').insertAdjacentElement('afterbegin', listItem)
                })
            })
        })
    }

    if (document.querySelector('.personal-account-block__message-attachment') !== null) {
        let sliderBlock = document.querySelector('.personal-account-block__message-attachment'),
            allSlides = sliderBlock.querySelectorAll('.personal-account-block__message-attachment-img'),
            currentSlideIndex = 0

        allSlides.forEach((slide, i) => {
            $(slide).on('click', function (e) {
                e.preventDefault();

                $.fancybox.open({
                    type: 'inline',
                    src: '.popup-photo-slider',
                    opts: {
                        touch: false
                    }
                });

                bodyScrollLock.disableBodyScroll();

                document.querySelector('.popup-photo-slider').style.display = 'flex'
                document.querySelector('.fancybox-close-small').style.display = 'none'

                document.querySelector('.fancybox-slide').style.display = 'flex'
                document.querySelector('.fancybox-slide').style.justifyContent = 'center'
                document.querySelector('.fancybox-slide').style.alignItems = 'center'

                document.querySelector('.popup-photo-slider__slide').style.backgroundImage = `url(${this.src})`
                currentSlideIndex = i

                $(document.querySelector('.popup-photo-slider').querySelector('.popup-photo-slider__close')).on('click', event => {
                    $.fancybox.close();
                    bodyScrollLock.clearAllBodyScrollLocks();
                })
            })
        })

        $(document.querySelector('.popup-photo-slider').querySelector('.slider_arrow_popup')).on('click', function (e) {
            currentSlideIndex++
            if (currentSlideIndex === allSlides.length) currentSlideIndex = 0
            document.querySelector('.popup-photo-slider__slide').style.backgroundImage = `url(${allSlides[currentSlideIndex].src})`
        })

        $(document.querySelector('.popup-photo-slider').querySelector('.slider_arrow_popup_left')).on('click', function (e) {
            currentSlideIndex--
            if (currentSlideIndex < 0) currentSlideIndex = allSlides.length - 1
            document.querySelector('.popup-photo-slider__slide').style.backgroundImage = `url(${allSlides[currentSlideIndex].src})`
        })
    }

    if (document.querySelector('.popup-all-achievements') !== null) {
        let popup = document.querySelector('.popup-all-achievements'),
            achievementsList = document.querySelector('.personal-account-achievements')

        popup.style.top = achievementsList.getBoundingClientRect().y + pageYOffset - 150 + 'px'
    }

    if (document.querySelector('.personal-account-block_hieroglyph-block') !== null) {
        let hieroglyphBlock = document.querySelector('.personal-account-block_hieroglyph-block'),
            hieroglyphList = hieroglyphBlock.querySelector('.one-thematic-dictionary__items_full-width-with-counter'),
            allHieroglyphs = hieroglyphList.querySelectorAll('.one-thematic-dictionary__item')

        allHieroglyphs.forEach((hieroglyphLine, i) => {
            hieroglyphLine.querySelector('.filters__label').querySelector('.checkbox').checked = false
            if (i > 9) {
                hieroglyphLine.classList.add('one-thematic-dictionary__item_hidden')
            }
        })

        allHieroglyphs.forEach(hieroglyphLine => {
            hieroglyphLine.querySelector('.filters__label').addEventListener('click', event => {
                let counterChecked = 0
                allHieroglyphs.forEach(currentHieroglyphLine => {
                    if (currentHieroglyphLine.querySelector('.filters__label').querySelector('.checkbox').checked) {
                        counterChecked++
                        hieroglyphBlock.querySelector('.personal-account__text_counter-in-header').textContent = `Выбрано: ${counterChecked}`
                    }
                })
                if (counterChecked > 1) {
                    allHieroglyphs.forEach(currentHieroglyphLine => {
                        currentHieroglyphLine.querySelector('.btn.btn-next.btn-next__blue.btn-next__tests').classList.add('btn-next_disabled')
                        currentHieroglyphLine.querySelector('.btn.btn-next.btn-next__blue.btn-next__tests').disabled = true
                    })
                } else {
                    allHieroglyphs.forEach(currentHieroglyphLine => {
                        currentHieroglyphLine.querySelector('.btn.btn-next.btn-next__blue.btn-next__tests').classList.remove('btn-next_disabled')
                        currentHieroglyphLine.querySelector('.btn.btn-next.btn-next__blue.btn-next__tests').disabled = false
                    })
                }
            })
        })

        hieroglyphBlock.querySelector('.personal-account__dotted-link').addEventListener('click', event => {
            hieroglyphBlock.querySelector('.personal-account__dotted-link').classList.add('personal-account__dotted-link_in-header_active')
            hieroglyphBlock.querySelector('.personal-account__text_in-header-grey-block').classList.add('personal-account__text_in-header-grey-block_non-active')
            allHieroglyphs.forEach(hieroglyphLine => {
                hieroglyphLine.classList.remove('one-thematic-dictionary__item_hidden')
            })
        })

        hieroglyphBlock.querySelector('.personal-account__text_in-header-grey-block').addEventListener('click', event => {
            hieroglyphBlock.querySelector('.personal-account__text_in-header-grey-block').classList.remove('personal-account__text_in-header-grey-block_non-active')
            hieroglyphBlock.querySelector('.personal-account__dotted-link').classList.remove('personal-account__dotted-link_in-header_active')
            allHieroglyphs.forEach((hieroglyphLine, i) => {
                if (i > 9) {
                    hieroglyphLine.querySelector('.filters__label').querySelector('.checkbox').checked = false
                    hieroglyphLine.classList.add('one-thematic-dictionary__item_hidden')
                }
            })
        })
    }

    if (document.querySelector('.personal-account-filter-wrapper') !== null) {
        let allFilters = document.querySelectorAll('.personal-account-filter-wrapper')
        allFilters.forEach(filter => {
            if (filter.querySelector('.personal-account-filter__main') !== null) {
                let defaultValue = filter.querySelector('.personal-account-filter__main').innerHTML
                filter.querySelector('.notification-block-wrapper').querySelectorAll('.filters-choose-category-popup__text').forEach(filterOption => {
                    filterOption.addEventListener('click', event => {
                        filter.querySelector('.notification-block-wrapper').querySelectorAll('.filters-choose-category-popup__text').forEach(currentFilterOption => {
                            currentFilterOption.classList.remove('filters-choose-category-popup__text_bold')
                        })
                        filterOption.classList.add('filters-choose-category-popup__text_bold')
                        filter.querySelector('.personal-account-filter__main').innerHTML = filterOption.innerHTML
                    })
                })
                filter.querySelector('.personal-account__button_popup-reset').addEventListener('click', event => {
                    filter.querySelector('.personal-account-filter__main').innerHTML = defaultValue
                })
            }
        })
    }

    if (document.querySelector('.personal-account-block_route-list') !== null) {
        let routeBlock = document.querySelector('.personal-account-block_route-list'),
            height = 0,
            titleHeight = 0,
            popup = document.querySelector('.popup_closed-step')

        let popupStep = document.querySelector('.route-list-step__list-item_popup'),
            progressBar = new ProgressBar.Circle(popupStep, {
                color: window.getComputedStyle(popupStep).borderColor,
                strokeWidth: 5,
                trailWidth: 5,
                trailColor: '#FFFFFF'
            })
        progressBar.animate(popupStep.getAttribute('data-progress'), {
            duration: 800
        })
        popupStep.querySelector('svg').classList.add('progress-bar')

        $(window).on('ready load resize', function () {
            height = window.getComputedStyle(routeBlock.querySelector('.route-list-step__list-item')).width
            titleHeight = window.getComputedStyle(routeBlock.querySelector('.route-list-step__title')).width
        });

        routeBlock.querySelectorAll('.route-list-step__title').forEach(title => {
            $(window).on('ready load resize', function () {
                title.style.height = titleHeight
            })
        })

        routeBlock.querySelectorAll('.route-list-step__list-item').forEach(step => {
            let colorProgressBar = window.getComputedStyle(step).borderColor,
                percentProgress = step.getAttribute('data-progress')

            $(window).on('ready load resize', function () {
                step.style.height = height
            })

            let progressBar = new ProgressBar.Circle(step, {
                color: colorProgressBar,
                strokeWidth: 5,
                trailWidth: 5,
                trailColor: '#FFFFFF'
            })
            progressBar.animate(percentProgress, {
                duration: 800
            })
            step.querySelector('svg').classList.add('progress-bar')

            if (step.classList.contains('route-list-step__list-item_closed')) {
                step.addEventListener('click', evt => {
                    showPopup(popup, step, true, -15, 80)
                    if (window.matchMedia('(max-width: 767px)').matches) {
                        let left = +window.getComputedStyle(popup).left.replace(/[^0-9,.]/g, ''),
                            width = +window.getComputedStyle(popup).width.replace(/[^0-9,.]/g, '')
                        if (left + width > document.documentElement.clientWidth) {
                            popup.style.left = 'calc((100% - 320px)/2)'
                        }
                        $(window).on('scroll resize', event => {
                            let left = +window.getComputedStyle(popup).left.replace(/[^0-9,.]/g, ''),
                                width = +window.getComputedStyle(popup).width.replace(/[^0-9,.]/g, '')
                            if (left + width > document.documentElement.clientWidth) {
                                popup.style.left = 'calc((100% - 320px)/2)'
                            }
                        })
                    }
                })
            }
        })

    }

    if (document.querySelector('.tariff-check-out__changing-block') !== null) {
        let indexBlock = 0, allElements = document.querySelectorAll(".tariff-check-out__row-element")
        document.querySelectorAll(".tariff-check-out__changing-block").forEach((changingBlock, i) => {
            changeBlock()

            let nextButton = changingBlock.querySelector(".tariff-check-out__button_right"),
                previousButton = changingBlock.querySelector(".tariff-check-out__button_left"), isButtonPressed = false
            let isBackButtonPressed = false
            nextButton.addEventListener("click", evt => {
                if (!isButtonPressed && indexBlock < 2) {
                    indexBlock++

                    changeBlock()
                    allElements[indexBlock].classList.add("tariff-check-out__row-element_green")
                    allElements[indexBlock].classList.remove("tariff-check-out__row-element_black")
                    allElements[indexBlock + 1].classList.add("tariff-check-out__row-element_black")
                    isButtonPressed = true
                    isBackButtonPressed = true
                    setTimeout(function () {
                        isButtonPressed = false
                        isBackButtonPressed = false
                    }, 400)
                }
            })
            if (previousButton !== null) {
                previousButton.addEventListener("click", evt => {
                    if (!isBackButtonPressed && indexBlock > 0) {
                        indexBlock--

                        changeBlock()
                        allElements[indexBlock + 1].classList.remove("tariff-check-out__row-element_green")
                        allElements[indexBlock + 1].classList.add("tariff-check-out__row-element_black")
                        allElements[indexBlock + 2].classList.remove("tariff-check-out__row-element_black")
                        isBackButtonPressed = true
                        isButtonPressed = true

                        setTimeout(function () {
                            isBackButtonPressed = false
                            isButtonPressed = false
                        }, 400)
                    }
                })
            }
        })
        document.querySelector(".tariff-check-out__button-open-popup").addEventListener("click", evt => {
            let popup = document.querySelector(".tariff-check-out__popup")

            $(popup).fadeIn()
            popup.querySelector(".popup-close-sage__close").addEventListener("click", evt1 => {
                $(popup).fadeOut()
            })

            popup.querySelector(".tariff-check-out__help").addEventListener("click", evt1 => {
                $(document.querySelector(".tariff-check-out__info-popup")).fadeIn()
                popup.querySelector(".tariff-check-out__help").style.background = "#954090"
                setTimeout(function () {
                    $(document.querySelector(".tariff-check-out__info-popup")).fadeOut()
                    popup.querySelector(".tariff-check-out__help").style.background = ""
                }, 3000)

            })
            let input1 = popup.querySelector('[name="usercard"]'),
                input2 = popup.querySelector('[name="numbercard"]'),
                input3 = popup.querySelector('[name="datacard"]'),
                input4 = popup.querySelector('[name="cvvcard"]'),
                input5 = popup.querySelector('[name="codeforcard"]')

            popup.querySelector(".tariff-check-out__button-popup").addEventListener("click", evt1 => {
                evt1.preventDefault()
                if (input1.checkValidity() && input2.checkValidity() && input3.checkValidity() && input4.checkValidity() && input5.checkValidity()) {

                    $(popup).fadeOut()
                    indexBlock++
                    changeBlock()
                    if (indexBlock === 3) {
                        document.querySelector(".tariff-check-out__blue-block").classList.add("tariff-check-out__blue-block_last")
                        allElements[4].classList.add("tariff-check-out__row-element_green")
                        allElements[4].classList.remove("tariff-check-out__row-element_black")
                        allElements[3].classList.add("tariff-check-out__row-element_green")
                        allElements[3].classList.remove("tariff-check-out__row-element_black")
                    }
                } else {
                    $(popup.querySelector(".tariff-check-out_popup-notice-wrapper")).fadeIn()
                    popup.querySelector(".tariff-check-out_popup-notice-wrapper").style.display = "flex"
                    popup.querySelector(".tariff-check-out__button-popup").classList.add("tariff-check-out__button-popup_blocked")
                    popup.querySelector(".tariff-check-out__form-subtitle").style.display = "none"
                    $(popup.querySelector(".tariff-check-out__form-subtitle_blocked")).fadeIn()

                    setTimeout(function () {
                        $(popup.querySelector(".tariff-check-out_popup-notice-wrapper")).fadeOut()
                        popup.querySelector(".tariff-check-out__button-popup").classList.remove("tariff-check-out__button-popup_blocked")
                        $(popup.querySelector(".tariff-check-out__form-subtitle")).fadeIn()
                        popup.querySelector(".tariff-check-out__form-subtitle_blocked").style.display = ""
                    }, 3000)
                }
            })
        })
        document.querySelector(".tariff-check-out__redaction-button").addEventListener("click", evt => {
            let tariffPopup = document.querySelector(".tariff_choice")
            $.fancybox.open({
                type: 'inline',
                src: tariffPopup,
                opts: {
                    touch: false
                }
            });
            document.querySelector('.fancybox-content').style.display = 'inline-flex'
            document.querySelector(".tariff_choice").querySelector(".popup-close-sage__close").addEventListener("click", evt => {
                $.fancybox.close()
            })
        })

        function changeBlock() {
            document.querySelectorAll(".tariff-check-out__changing-block").forEach((changingBlock, i) => {
                if (i === indexBlock) {
                    changingBlock.classList.add("tariff-check-out__changing-block_open")
                    setTimeout(function () {
                        $(changingBlock).fadeIn()
                        if (window.matchMedia('(max-width: 767px)').matches) {
                            $('html, body').animate({
                                scrollTop: $(changingBlock).offset().top - 800
                            }, 400);
                        } else {
                            $('html, body').animate({
                                scrollTop: $(changingBlock).offset().top - 150
                            }, 400);
                        }
                    }, 400)

                } else {
                    changingBlock.classList.remove("tariff-check-out__changing-block_open")
                    $(changingBlock).fadeOut()
                }
            })

        }
    }

    if (document.querySelector('[data-popup-name=popup_route-block-info]') !== null) {
        let allOpenTitles = document.querySelectorAll('[data-popup-name=popup_route-block-info]'),
            popup = document.querySelector('.popup_route-block-info')
        allOpenTitles.forEach((openTitle, i) => {
            openTitle.addEventListener('click', event => {
                popup.querySelector('.popup__text_route-block-info-title').style.color = window.getComputedStyle(openTitle.querySelector('.personal-account__text_route-list-step-title')).color
                popup.querySelector('.popup__text_route-block-info-title').textContent = `${i + 1}. ${openTitle.querySelector('.personal-account__text_route-list-step-title').textContent}`
                popup.style.top = openTitle.getBoundingClientRect().y + pageYOffset + 'px'
            })
        })
    }

    if (document.querySelector('[data-popup-name=popup_route-block-info-closed]') !== null) {
        let allOpenTitles = document.querySelectorAll('[data-popup-name=popup_route-block-info-closed]'),
            popup = document.querySelector('.popup_route-block-info-closed')
        allOpenTitles.forEach((openTitle, i) => {
            openTitle.addEventListener('click', event => {
                popup.querySelector('.popup__text_route-block-info-title').style.color = window.getComputedStyle(openTitle.querySelector('.personal-account__text_route-list-step-title')).color
                popup.style.top = openTitle.getBoundingClientRect().y + pageYOffset + 'px'
            })
        })

    }

    if (document.querySelector('.achievements-filters_communication') !== null) {
        let allCommunicationFilters = document.querySelector('.achievements-filters_communication').querySelectorAll('.achievements-filters__item')

        allCommunicationFilters.forEach(filter => {
            filter.addEventListener('click', event => {
                let list = []
                document.querySelector('.personal-account-block_communication-main').querySelector('.personal-account__list_communication').querySelectorAll('.questions-list-item').forEach(listItem => {
                    list.push(listItem)
                })
                list.sort()

                document.querySelector('.personal-account-block_communication-main').querySelector('.personal-account__list_communication').innerHTML = ''
                list.forEach(listItem => {
                    document.querySelector('.personal-account-block_communication-main').querySelector('.personal-account__list_communication').insertAdjacentElement('afterbegin', listItem)
                })
            })
        })
    }

    if (document.querySelector('.personal-account-block_communication-subscribe') !== null) {
        let communicationBlock = document.querySelector('.personal-account-block_communication-subscribe')
        communicationBlock.querySelector('.personal-account__text_communication-subscribe-title').addEventListener('click', event => {
            if (window.matchMedia('(max-width: 767px)').matches) {
                communicationBlock.classList.add('personal-account-block_communication-subscribe_active')
                $(communicationBlock.querySelector('.personal-account__list_communication-subscribe')).slideDown()
                $(communicationBlock.querySelector('.communication-subscribe__hide-button')).slideDown()
            }
        })
        if (communicationBlock.querySelector('.communication-subscribe__hide-button') !== null) {
            communicationBlock.querySelector('.communication-subscribe__hide-button').addEventListener('click', event => {
                communicationBlock.classList.remove('personal-account-block_communication-subscribe_active')
                $(communicationBlock.querySelector('.personal-account__list_communication-subscribe')).slideUp()
                $(communicationBlock.querySelector('.communication-subscribe__hide-button')).slideUp()

            })
        }
    }

    if (document.querySelector('.questions-list-item') !== null) {
        let allItems = document.querySelectorAll('.questions-list-item'),
            allForms = document.querySelectorAll('.comments-form.answer-form')

        if (document.querySelector('.comments-form.answer-form') !== null) {
            allItems.forEach(currentItem => {
                currentItem.querySelector('.questions-list-item__button.questions-list-item__button_answer').addEventListener('click', event => {
                    if (currentItem.querySelector('.comments-form.answer-form').style.display !== 'block') {
                        allForms.forEach(currentForm => {
                            $(currentForm).slideUp()
                        })
                        $(currentItem.querySelector('.comments-form.answer-form')).slideDown()
                    }
                })
            })
        }
    }

    if (document.querySelector('.questions-list-item__button_more-answers') !== null) {
        let allButtons = document.querySelectorAll('.questions-list-item__button_more-answers')

        allButtons.forEach(button => {
            let parentElement = button.closest('.questions-list-item_answer'),
                initialTextInButton = button.textContent,
                editedTextInButton = `скрыть ${initialTextInButton.replace(/\D/g, '')} ответов в этой ветке`
            button.addEventListener('click', event => {
                if (button.textContent === initialTextInButton) {
                    button.classList.add('questions-list-item__button_more-answers_active')
                    button.textContent = editedTextInButton
                    parentElement.parentElement.querySelectorAll('.questions-list-item_hidden').forEach(hiddenComment => {
                        hiddenComment.style.display = 'flex'
                    })
                } else {
                    button.classList.remove('questions-list-item__button_more-answers_active')
                    button.textContent = initialTextInButton
                    parentElement.parentElement.querySelectorAll('.questions-list-item_hidden').forEach(hiddenComment => {
                        hiddenComment.style.display = ''
                    })
                }
            })
        })
    }

    if (document.querySelector('.show-more-comments-button') !== null) {
        let button = document.querySelector('.show-more-comments-button')
        button.addEventListener('click', event => {
            button.parentElement.querySelectorAll('.questions-list-item_hidden.questions-list-item_hidden-show-more').forEach(comment => {
                comment.classList.remove('questions-list-item_hidden', 'questions-list-item_hidden-show-more')
            })
        })
    }

    if (document.querySelector('.personal-account-profile__button-add-friends') !== null) {
        let friendsBlocks = document.querySelectorAll('.personal-account-block_friends')

        friendsBlocks.forEach(friendsBlock => {
            let buttonText = friendsBlock.querySelector('.personal-account-profile__button-add-friends_disabled').textContent
            let allAddToFriendsButtons = friendsBlock.querySelectorAll('.personal-account-profile__button-add-friends')

            allAddToFriendsButtons.forEach(button => {
                if (button.classList.contains('personal-account-profile__button-add-friends_reverse')) {

                } else {
                    button.addEventListener('click', event => {
                        if (!button.classList.contains('personal-account-profile__button-add-friends_disabled')) {
                            button.classList.add('personal-account-profile__button-add-friends_disabled')
                            button.textContent = buttonText
                        }
                    })
                }
            })
        })
    }

    if (document.querySelector('.popup_ask-question') !== null) {
        let openPopupElement = document.querySelector('[data-popup-name="popup_ask-question"]')

        openPopupElement.addEventListener('click', event => {
            $('html, body').animate({
                scrollTop: $(document.querySelector('.popup_ask-question')).offset().top - 150
            }, 1500);
        })
    }
});
