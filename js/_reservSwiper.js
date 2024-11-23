const reservSwiper = new Swiper('.reserv-swiper', {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 10,
    keyboard: {
        enabled: true
    },
    speed: 600,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});