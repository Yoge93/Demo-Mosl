import SwiperText from '../carousel-hero/swiper-bundle.min.js'

export default function decorate(block) {
    block.classList.add("swiper");
    const div = document.createElement("div");
    div.classList.add("swiper-wrapper");
    Array.from(block.children).forEach((element) => {
        element.classList.add("swiper-slide")
        div.append(element);
    })
    block.append(div);
    // swiper-pagination
    const divPagination = document.createElement("div");
    divPagination.classList.add("swiper-pagination");
    block.append(divPagination);

    SwiperText(block, {
        loop: true,
        autoplay: true,
        pagination: {
            el: divPagination,
            clickable:true
        },
    })
}