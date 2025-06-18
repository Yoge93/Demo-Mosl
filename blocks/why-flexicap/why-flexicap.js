export default function (block) {
  console.log(block);
  Array.from(block.children).forEach((el, i) => {
    el.classList.add("flexicap-inner-content");
    Array.from(el.children).forEach((el, i) => {
      el.classList.add(`flexicap-subinner-${i}`);
      Array.from(el.children).forEach((el) => {
        el.classList.add("subinner-content");
      });
    });
  });
}
