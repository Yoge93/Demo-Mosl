let objClassSwipper = {
  "default": {
    loop: true,
    autoplay: true
  },
  "navigation": {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  },
  "pagination": {
    loop: true,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  },
  "slidepreview": {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  },
  "slidepreviewauto": {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  },
  "breakpointswipper": {
    slidesPerView: 1.5,
    spaceBetween: 10,
    breakpoints: {
      480: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        }
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
    },
  }
}

export default objClassSwipper;