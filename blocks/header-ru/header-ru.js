export default function decorate(block) {
    console.log(block)
    block.children[0].classList.add('header-ru-mycontainer')
    Array.from(document.getElementsByClassName('header-ru-mycontainer')[0].children).forEach(function (item, index) {
        item.classList.add('header-ru-mycontainer-' + index)
    })
    // clear UI div
    document.querySelector('.header-ru-mycontainer-1').innerHTML = ""

    // Option Select Menu 1
    const optionDiv = document.querySelector('.header-ru-mycontainer-1')
    const select = document.createElement('select')
    optionDiv.appendChild(select)
    const Menu1 = ["Mutual Funds", "PMS", "AIF"]
    for (let i = 0; i < 3; i++) {
        const option = document.createElement('option')
        option.textContent = Menu1[i]
        select.appendChild(option)
    }

    // div P Menu 2
    const Div1 = document.querySelector('.header-ru-mycontainer-1')
    const div = document.createElement('div')
    Div1.appendChild(div)
    const Menu2 = ["Our Funds", "Investor Services", "Partner Services"]
    for (let i = 0; i < 3; i++) {
        const p = document.createElement('p')
        p.textContent = Menu2[i]
        div.appendChild(p)
    }

    // Menu 3
    // const Div2 = document.querySelector('.header-ru-mycontainer-2')
    // const div2 = document.createElement('div')
    // Div2.appendChild(div2)

    // Menu 3
    const Div3 = document.querySelector('.header-ru-mycontainer-2')

    const div3_one = document.createElement('div')
    const div3_two = document.createElement('div')
    div3_one.classList.add('header-ru-mycontainer-2-1')
    div3_two.classList.add('header-ru-mycontainer-2-2')

    Div3.appendChild(div3_one)
    Div3.appendChild(div3_two)

    Array.from(Div3.children).forEach(function (item, index) {
        if (index < 2) {
            div3_one.appendChild(item)
        } else if (index < 4) {
            div3_two.appendChild(item)
        }
    })







}