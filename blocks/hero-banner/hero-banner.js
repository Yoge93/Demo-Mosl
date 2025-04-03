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