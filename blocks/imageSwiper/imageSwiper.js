import Swiper from "../imageSwiper/swiper-bundle-min.js";

export default function decorate(block) {
  block.classList.add("swiper");
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  Array.from(block.children).forEach((e) => {
    e.classList.add("swiper-slide");
    swiperWrapper.appendChild(e);
    block.appendChild(swiperWrapper);
  });
  Swiper(block);
}
