jQuery(document).ready(function ($) {
    $('.selection .action').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.selection .slider-for',
        dots: false,
        focusOnSelect: true
    });

    $('.selection .slider-for').slick({
        arrows: true,
        centerMode: true,
        centerPadding: '140px',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        dot: false,
        asNavFor: '.selection .action',
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    centerMode: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    centerMode: false
                }
            },
        ]
    });

    $('.slider-for').on('afterChange', function (event, slick) {
        $('.action .slick-active:eq(' + slick.currentSlide + ')').addClass('slick-current').siblings().removeClass('slick-current');
    });

    $('.swiper-container').slick({
        autoplay: true,
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '50px'
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    centerMode: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            }
        ]
    });

    // Sticky menu - scroll up
    var position = $(window).scrollTop();

    $(window).scroll(function () {
        var header = $('.del-stickyHeader');
        var scroll = $(window).scrollTop();
        if (scroll > position) {
            if (!header.hasClass('del-stickyHeader--fixed')) {
                header.addClass('del-stickyHeader--fixed');
            }
        } else {
            header.removeClass('del-stickyHeader--fixed')
        }
        position = scroll;
    });

    $('.tap-start').click(function () {
        $('.discovery').addClass('hide');
        $('.discovery-carousel').toggleClass('visible');
        $('.discovery-carousel .items').slick(getSliderSettings());
    });

    // $('.discovery-carousel .items').slick(getSliderSettings());

    $('.discovery-carousel .items').on('afterChange', function (event, slick) {
        $('.discovery-carousel .slick-dots li:eq(' + slick.currentSlide + ')').addClass('pass').prev().addClass('pass');
    });

    $('.discovery-carousel .close').on('click', function (e) {
        e.preventDefault();
        $('.discovery').removeClass('hide');
        $('.discovery-carousel').toggleClass('visible');
        $('.discovery-carousel .items').slick('unslick');
    });

    function getSliderSettings() {
        return {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            dots: true,
            infinite: false,
            draggable: false
        }
    }
});// JavaScript Document