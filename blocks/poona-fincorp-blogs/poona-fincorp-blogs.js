import SwiperBlock from "../swiper/swiper.js"

export default function decorate(block) {
    Array.from(block.children).forEach((el=>{
        el.classList.add('blogs-content');
        Array.from(el.children).forEach((el,i)=>{
            el.classList.add(`blog-item-${i+1}`)
        })
    }))
    if (window.innerWidth < 768) {
        SwiperBlock(block)
    }
}