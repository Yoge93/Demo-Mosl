Array.from(document.querySelector(".fund-manager-card").children).forEach(
  (e, i) => {
    e.classList.add("manager-card");
    Array.from(e.children).forEach((e, i) => {
      e.classList.add(`card-content-${i + 1}`);
    });
  }
);
