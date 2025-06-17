import Swiper from "./hero-carousel.min.js";
export default function decorate(block) {
  console.log(block);
  // Add swiper class to block
  block.classList.add("swiper");

  // create swiper-wrapper
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");

  // class add to every children and inner children
  Array.from(block.children).forEach((el, i) => {
    el.classList.add(`inner-${i + 1}`,"inner-content", "swiper-slide");
    Array.from(el.children).forEach((el, i) => {
      el.classList.add(`inner-subinner-${i}`);
    });
  });

  // Store the custom pagination content (e.g., image or text elements)
  const paginationTexts = [];
  Array.from(block.children).forEach((el) => {
    console.log(el);
    const paginationContent = el?.firstElementChild?.firstElementChild;
    if (paginationContent) {
      paginationTexts.push(paginationContent);
    }
    swiperWrapper.append(el);
  });
  // after storing custom pagination text to paginationTexts array now remove that element fromm dom
  swiperWrapper
    .querySelectorAll(".inner-subinner-0")
    .forEach((el) => el.remove());

  block.innerHTML = "";
  block.appendChild(swiperWrapper);

  // Create navigation & pagination container
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btnWrapper");

  const divPagination = document.createElement("div");
  divPagination.classList.add("swiper-pagination");
  btnWrapper.appendChild(divPagination);

  const leftArrow = document.createElement("div");
  leftArrow.classList.add("swiper-button-prev");
  btnWrapper.appendChild(leftArrow);

  const rightArrow = document.createElement("div");
  rightArrow.classList.add("swiper-button-next");
  btnWrapper.appendChild(rightArrow);

  block.appendChild(btnWrapper);

  // Initialize Swiper
  Swiper(block, {
    // loop: true,
    navigation: {
      nextEl: rightArrow,
      prevEl: leftArrow,
    },
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
    freeMode: true,
    scrollOnFocus: true,
  });
}
