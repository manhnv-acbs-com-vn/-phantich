document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    loadMainMenu();
    loadMainMobileMenu();
    headerHideAuto();
    loadSimpleScroll();
    loadSwiperJS();
    loadCounterUp();
    loadDatepicker();
    loadDatepickerMonth();
    loadDatepickerQuarter();
    $(window).scroll(function (event) {
        hideContactWhenScrollToFooter();
    });

    $('bs-select').selectpicker();
});



function loadMainMenu() {
    var menuItem = $(".nav-item.has-dropdown");
    var menuTimeout;
    menuItem.hover(
        function () {
            var $this = $(this);
            menuTimeout = setTimeout(function () {
                $this.addClass("is-active");
            }, 100);
        },
        function () {
            clearTimeout(menuTimeout);
            $(this).removeClass("is-active");
        }
    );
}

function loadMainMobileMenu() {
    var myOffcanvas = document.getElementById('offcanvasRight')
    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        document.body.classList.remove("menu-mobile-active");
        document.querySelector(".main-menu-hamburger").classList.remove("is-active");
    })

    myOffcanvas.addEventListener('show.bs.offcanvas', function () {
        document.body.classList.add("menu-mobile-active");
        document.querySelector(".main-menu-hamburger").classList.add("is-active");
    })
}

function loadSimpleScroll() {
    var el = document.querySelector('.new-widget-ss');
    if (el) {
        SimpleScrollbar.initEl(el);

    }
}

var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//DATE PICKER DMY
function loadDatepicker() {
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        language: "vi",
        autoclose: true,
        orientation: "bottom left"
    }).datepicker("setDate", today);

}
//DATE PICKER MONTH
function loadDatepickerMonth() {
    $('.datepicker-month').datepicker({
        format: 'mm-yyyy',
        language: "vi",
        autoclose: true,
        orientation: "bottom left",
        startView: "months",
        minViewMode: "months"
    }).datepicker("setDate", today);

}
//DATE PICKER YEAR
function loadDatepickerQuarter() {
    var numberQuarter;
    $('.datepicker-quarter').on('changeDate', function (e) {

        var pickedMonth = new Date(e.date).getMonth() + 1;
        var pickedYear = new Date(e.date).getFullYear();

        console.log(pickedMonth);
        console.log(pickedYear);


        if (pickedMonth <= 3 && pickedMonth > 0) {
            numberQuarter = 1;
            $('#date-picker-quarter').val(numberQuarter + '-' + pickedYear);
        }
        if (pickedMonth > 3 && pickedMonth <= 6) {
            numberQuarter = 2;
            $('#date-picker-quarter').val(numberQuarter + '-' + pickedYear);
        }
        if (pickedMonth > 6 && pickedMonth <= 9) {
            numberQuarter = 3;
            $('#date-picker-quarter').val(numberQuarter + '-' + pickedYear);
        }
        if (pickedMonth > 9 && pickedMonth <= 12) {
            numberQuarter = 4;
            $('#date-picker-quarter').val(numberQuarter + '-' + pickedYear);
        }

        console.log('Quarter number =' + numberQuarter);

    });

}

function loadCounterUp() {

    const counterUp = window.counterUp.default;

    const callback = entries => {
        entries.forEach(entry => {
            const el = entry.target
            if (entry.isIntersecting && !el.classList.contains('is-visible')) {
                counterUp(el, {
                    duration: 2000,
                    delay: 16,
                })
                el.classList.add('is-visible')
            }
        })
    }

    const IO = new IntersectionObserver(callback, { threshold: 1 })

    const elAll = document.querySelectorAll('.counter-up');

    for (let i = 0; i < elAll.length; i++) {
        IO.observe(elAll[i]);
    }

}


function loadSwiperJS() {
    var swiperBanner = new Swiper(".swiper-banner", {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        // cssMode:true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            }
        }
    });


    var swiperNews = new Swiper('.swiper-news', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });

    var swiperLocation = new Swiper('.swiper-location', {
        // Optional parameters
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });

}

var headerHideAuto = function () {
    var mainHeader = $(".main-nav-wrap");
    var menuMobile = $(".fixed-menu-mobile");
    var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    function autoHideHeader() {
        var currentTop = $("html").scrollTop();
        // SCROLL TOP OR BOTTOM
        if (previousTop - currentTop > scrollDelta) {
            mainHeader.removeClass("is-hidden");
            menuMobile.removeClass("is-hidden");
        } else if (
            currentTop - previousTop > scrollDelta &&
            currentTop > scrollOffset
        ) {
            mainHeader.addClass("is-hidden");
            menuMobile.addClass("is-hidden");
        }

        previousTop = currentTop;
        scrolling = false;
    }

    $(window).on("scroll", function () {
        if (!scrolling) {
            scrolling = true;
            !window.requestAnimationFrame
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });
};

function hideContactWhenScrollToFooter() {
    //CONTACT HIDE WHEN SCROLL TO FOOTER
    var footer = $('.acbs-footer');
    var contactPopup = $('.acbs-direct-message');
    var hT = footer.offset().top,
        // hH = footer.outerHeight(),
        hH = 0,
        wH = $(window).height(),
        wS = $(this).scrollTop();
    if (wS > (hT + hH - wH)) {
        contactPopup.fadeOut();
    } else {
        contactPopup.fadeIn();
    }
}



if (!!window.IntersectionObserver) {
    let observer = new IntersectionObserver(
        (entries, item) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.contains("reveal-auto-hide") &&
                        entry.target.classList.remove("show");
                }
            });
        },
        { threshold: 0 }
    );

    document.querySelectorAll(".reveal").forEach((item) => {
        setTimeout(function () {
            observer ? observer.observe(item) : item.classList.add("show");
        }, Number(item.dataset.revealDelay) || 300);
    });
}


// INPUT FILE UPLOAD
$('#file-upload').bind('change', function () {
    var fileName = '';
    fileName = $(this).val();
    $('#file-selected').html(fileName.replace(/^.*[\\\/]/, ''));
})


$('.nav-sidebar .nav-item').on('click', function () {
    $('.nav-sidebar .nav-item').removeClass('active');
    $(this).addClass('active');
})


$('.sidebar-first-link').on('click', function () {
    $('.sidebar-first-link').removeClass('active');
    $(this).addClass('active');
})



//PADDING TOP IF HAVE MOBILE MENU VISIBLE
checkMarginMenuMobile();
function checkMarginMenuMobile() {
    // CHECK IF MOBILE MENU IS VISIBLE
    var navBarHeight = $('header').height();
    var menuBarHeight = $('.fixed-menu-mobile').height();
    var totalHeight = menuBarHeight + navBarHeight;
    if ($('.fixed-menu-mobile').is(':visible')) {
        $('body').css('padding-top', totalHeight);
    } else {
        $('body').css('padding-top', navBarHeight);
    }

}

$(window).resize(function () {
    checkMarginMenuMobile();
});




$('.map-navigate').each(function () {
    var mapNavigate = $(this);
    var iFrame = $('#map-iframe');
    var sourceMap = $(this).data('src');
    $(this).on('click', function () {
        $('.map-location').removeClass('active');
        mapNavigate.parent(".map-location").addClass('active');
        iFrame.attr('src', sourceMap);
    })
})

