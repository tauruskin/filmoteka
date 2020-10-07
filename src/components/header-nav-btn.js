import refs from "../options/refs.js";

refs.pageMyLibraryRef.addEventListener("click", (event) => {
  refs.pageMyLibraryRef.classList.add("is-active-btn");
  refs.pageHomeRef.classList.remove("is-active-btn");

  refs.searchInfo.textContent = "";

  refs.buttonListRef.classList.remove("is-not-visible");
  refs.header.className = "new-bcg";
  refs.inputSearchRef.classList.add("is-not-visible");
  refs.searchIconRef.classList.add("is-not-visible");
});

refs.pageHomeRef.addEventListener("click", (event) => {
  refs.pageHomeRef.classList.add("is-active-btn");
  refs.pageMyLibraryRef.classList.remove("is-active-btn");

  refs.buttonListRef.classList.add("is-not-visible");
  refs.header.className = "header";

  refs.inputSearchRef.classList.remove("is-not-visible");
  refs.searchIconRef.classList.remove("is-not-visible");
});
