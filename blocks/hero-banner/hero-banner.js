<<<<<<< HEAD
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

//document.getElementsByClassName('img-click')[0].addEventListener("click", function() {
//   location.href='www.google.com'
// },false); 
=======
import Swiper1 from './swiper-bundle.min.js';
export default function decorate(block) {
    block.classList.add('swiper');
    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    swiperWrapper.classList.add('swiper-wrapper');
    Array.from(block.children).forEach(function (row) {
        row.classList.add('swiper-slide');
        swiperWrapper.appendChild(row);
    })
    block.appendChild(swiperWrapper);
    block.appendChild(swiperPagination);
    Swiper1(block , {
        autoplay : true,
        pagination: {
            el: swiperPagination,
            clickable : true
        },
    });
}
>>>>>>> 48e18617783d4b7f736308fd9ace39356bb44868
