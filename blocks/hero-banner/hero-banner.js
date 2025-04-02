import Swiper from '../hero-banner/swiper-bundal.min.js'

export default function decorate(block){
    console.log(block)
    block.classList.add("swiper")
    const swipperwrapper = document.createElement('div');
  swipperwrapper.classList.add('swiper-wrapper');
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swipperwrapper.append(row);
  });
  block.append(swipperwrapper);

   Swiper(block, {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay:true,
  
    // // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}