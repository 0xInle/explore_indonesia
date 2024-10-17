const swiper = new Swiper('.swiper', {
  loop: true,
  parallax: true,
  speed: 1000,
  keyboard: {
    enabled: true
  },


  pagination: {
    el: '.header__counter-count',
    type: 'fraction'
  },

  navigation: {
    nextEl: '#headerNext',
    prevEl: '#headerPrev',
  },

  scrollbar: {
    el: '.header__scrollbar',
  },
});