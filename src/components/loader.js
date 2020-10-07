const spinner = {
  load: document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("body > .spinner-border").classList.add("d-none");
    document.querySelector(".header").classList.remove("d-none");
    document.querySelector(".main").classList.remove("d-none");
    document.querySelector(".footer").classList.remove("d-none");
  }),
};
