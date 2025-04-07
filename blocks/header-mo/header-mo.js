export default function decorate(block) {
    Array.from(block.children).forEach((row) => {
        row.classList.add("header-container")
        Array.from(row.children).forEach((column) => {
            column.classList.add("header-container-column")
        })
    })
    const blockdrop = block.querySelectorAll(".header-container-column ul")
    Array.from(blockdrop).forEach((column, index) => {
        column.classList.add("header-container-ul-" + (index + 1))
    })

    const selectDiv = document.createElement("select");
    selectDiv.classList.add("selectDrowpDown");
    const ul = block.querySelectorAll(".header-container-ul-1 li");
    ul.forEach(li => {
        const option = document.createElement('option');
        option.value = li.textContent; // Use the text as the value
        option.textContent = li.textContent; // Display the text in the option
        selectDiv.appendChild(option); // Append the option to the <select>
    });
    block.querySelector(".header-container-ul-1").innerHTML = "";
    block.querySelector(".header-container-ul-1").appendChild(selectDiv)

    window.setTimeout(() => import('../tabs/tabs.js'), 500);
    // block.querySelector(".header-container-ul-1 ul li").style.display = "none"
}