import Swiper from "../carousel/swiper-bundle.min.js"

export default function decorate(block) {
    console.log(block)
    block.classList.add('swiper')
    const Div = document.createElement('div')
    Div.classList.add('swiper-wrapper')
    Array.from(block.children).forEach((item) => {
        item.classList.add('swiper-slide')
        Div.append(item)
    })
    block.append(Div)
    Swiper(block, {
        direction: 'horizontal',
        // loop: true,
        // autoplay: {
        //     delay: 1000,
        // },
    })




}