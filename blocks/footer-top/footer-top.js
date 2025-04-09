const classNames = ["footer-content-left", "footer-content-right"];

const footerContent = document.querySelector(".footer-content").children;
[...footerContent].forEach((e, i) => {
  e.classList.add(classNames[i], "footer-content");
  Array.from(e.children).forEach((e) => {
    e.classList.add("footer-list");
  });
});