import Swiper from "../pms-strategies-carousel/swiper-bundle.min.js";
// adding class
Array.from(
document.querySelector(".pms-strategies-carousel").children
).forEach((e, i) => {
e.classList.add("pms-card");
Array.from(e.children).forEach((e, i) => {
  e.classList.add(`card-item-${i + 1}`);
});
});
export default function decorate(block) {
//   swiper conf
  block.classList.add("swiper");
  const swipperWrapper = document.createElement("div");
  swipperWrapper.classList.add("swiper-wrapper");
  Array.from(block.children).forEach((row) => {
    row.classList.add("swiper-slide");
    swipperWrapper.append(row);
  });
  block.append(swipperWrapper);

  const prevBtn = document.createElement("div");
  const nextBtn = document.createElement("div");
  prevBtn.classList.add("swiper-button-prev");
  nextBtn.classList.add("swiper-button-next");
  block.append(prevBtn);
  block.append(nextBtn);

  Swiper(block, {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 30,
  });
}
