export default function decorate(block){
    console.log(block);
    const carousel = document.createElement("div");
    carousel.classList.add("carrousel")
    Array.from(block.children).forEach((element)=>{
        element.classList.add("card")
        carousel.append(element)
    })
    block.append(carousel);
}