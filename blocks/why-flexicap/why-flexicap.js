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
  // Create navigation & pagination container
  const flexicapWrapper = document.querySelector(".why-flexicap-wrapper");

  const divPagination = document.createElement("div");
  divPagination.classList.add("swiper-pagination");
  flexicapWrapper.appendChild(divPagination);

//   const leftArrow = document.createElement("div");
//   leftArrow.classList.add("swiper-button-prev");
//   flexicapWrapper.appendChild(leftArrow);

//   const rightArrow = document.createElement("div");
//   rightArrow.classList.add("swiper-button-next");
//   flexicapWrapper.appendChild(rightArrow);

  // Store the custom pagination content (e.g., image or text elements)
  const paginationTexts = [];
  Array.from(block.children).forEach((el) => {
    console.log(el);
    const paginationContent = el?.firstElementChild?.firstElementChild;
    if (paginationContent) {
      paginationTexts.push(paginationContent);
    }
  });

  //  Now remove that pagination title from dom
  block.querySelectorAll(".flexicap-subinner-0").forEach((el) => el.remove());
  // Initialize Swiper
  Swiper(".why-flexicap-wrapper", {
    // loop: true,
     direction: "vertical",
    navigation: false,
    pagination: {
      el: divPagination,
      clickable: true,
      renderBullet: function (index, className) {
        const el = paginationTexts[index];
        if (!el) return `<span class="${className}">•</span>`; // fallback

        const clone = el.cloneNode(true); // safe clone
        clone.classList.add("swiper-pagination-bullet");
        return clone.outerHTML;
      },
    },
    // freeMode: true,
    // scrollOnFocus: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });
}
