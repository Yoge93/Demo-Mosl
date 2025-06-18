import Swiper from "../why-flexicap/swiper.min.js";
export default function decorate(block) {
  block.classList.add("swiper-wrapper");
  block.closest(".why-flexicap-wrapper").classList.add("swiper");
  Array.from(block.children).forEach((el, i) => {
    el.classList.add("flexicap-inner-content", "swiper-slide");
    Array.from(el.children).forEach((el, i) => {
      el.classList.add(`flexicap-subinner-${i}`);
      Array.from(el.children).forEach((el) => {
        el.classList.add("subinner-content");
      });
    });
  });

  // Initialize Swiper
  Swiper("block.why-flexicap", {
    // loop: true,
    direction: "vertical"
    //   navigation: {
    //     nextEl: rightArrow,
    //     prevEl: leftArrow,
    //   },
    //   pagination: {
    //     // el: divPagination,
    //     clickable: true,
    //   },
    // freeMode: true,
    // scrollOnFocus: true,
  });
}
