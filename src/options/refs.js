const refs = {
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  searchInfo: document.querySelector("#notify-text"),
  searchIconRef: document.querySelector(".search-icon"),
  listFilms: document.querySelector(".list-film"),
  pageHomeRef: document.querySelector(`[data-nav-choice="home"]`),
  pageMyLibraryRef: document.querySelector(`[data-nav-choice="my-library"]`),
  buttonListRef: document.querySelector(
    `[data-button-list-header="watched-and-queue"]`
  ),
  inputSearchRef: document.querySelector(".input-search"),
  sortBtn: document.querySelector(".sort-button.first"),
  paginationRef: document.querySelector(`[data-pagination-value="2"]`),
  paginationRef3: document.querySelector(`[data-pagination-value="3"]`),
  notFoundText: document.querySelector(".not-found-text"),
  notFoundContainer: document.querySelector(".not-found-container"),
  yearsRef: document.querySelector("#years"),
  treilerTitle: document.querySelectorAll(".btn-youtube-text"),
};

export default refs;
