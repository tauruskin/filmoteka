import { drawHtml } from "./services/services.js";
import refs from "../options/refs.js";
import Pagination from "tui-pagination";

const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const massegeWatched = document.querySelector(".is-massege-watched-hidden");
const massegeQueue = document.querySelector(".is-massege-queue-hidden");
const libraryRef = document.querySelector('[data-nav-choice="my-library"]');
const body = document.querySelector(".list-film");
const listFilmRef = document.querySelector(".js-name");
const popularTitle = document.querySelector(".popular-title");

let amountOfPages;
let lengthWatched;
let lengthQueue;
let perPage = 20;
let newArrWitnWatched = [];
let newArrWitnQueue = [];
let switcher;

export const drawLibraryWatched = function () {
  switcher = 1;
  let arrLibraryWatched;
  listFilmRef.textContent = "Your library watched";
  massegeWatched.style.display = "none";
  massegeQueue.style.display = "none";
  popularTitle.style.display = "none";
  if ((arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched")))) {
    lengthWatched = arrLibraryWatched.length;
    if (lengthWatched > 20) {
      amountOfPages = Math.ceil(arrLibraryWatched.length / 20);
      for (let i = 0; i <= amountOfPages; i++) {
        newArrWitnWatched.push(arrLibraryWatched.splice(0, perPage));
      }
      drawHtml(newArrWitnWatched[0]);
      createPaginatorForLibrary(amountOfPages, lengthWatched);
    } else if (lengthWatched === 0) {
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
      body.innerHTML = "";
      massegeWatched.style.display = "block";
    } else if (lengthWatched < 20) {
      drawHtml(arrLibraryWatched);
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
    }
  } else {
    document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
    body.innerHTML = "";
    massegeWatched.style.display = "block";
  }
};

export const drawLibraryQueue = function () {
  switcher = 0;
  refs.paginationRef3.classList.add("is-hidden-paginator");
  listFilmRef.textContent = "Your library queue";
  let arrLibraryQueue;
  massegeQueue.style.display = "none";
  massegeWatched.style.display = "none";
  if ((arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue")))) {
    lengthQueue = arrLibraryQueue.length;
    if (lengthQueue > 20) {
      amountOfPages = Math.ceil(arrLibraryQueue.length / 20);
      for (let i = 0; i <= amountOfPages; i++) {
        newArrWitnQueue.push(arrLibraryQueue.splice(0, perPage));
      }
      drawHtml(newArrWitnQueue[0]);
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
      refs.paginationRef3.classList.remove("is-hidden-paginator");
      createPaginatorForLibrary(amountOfPages, lengthQueue);
    } else if (lengthQueue === 0) {
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
      body.innerHTML = "";
      massegeQueue.style.display = "block";
    } else if (lengthQueue < 20) {
      drawHtml(arrLibraryQueue);
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
    }
  } else {
    document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
    body.innerHTML = "";
    massegeQueue.style.display = "block";
  }
};

function backToTop() {
  window.scroll({ top: 700, behavior: "auto" });
}
function backToTopMob() {
  window.scroll({
    top: 260,
    behavior: "auto",
  });
}

export const createPaginatorForLibrary = function (
  pageForStartPaginator,
  lengthVal
) {
  const paginatorOptions = {
    totalItems: lengthVal,
    itemsPerPage: 20,
    visiblePages: getVisiblePagesCount(),
    centerAlign: true,
    totalPage: pageForStartPaginator,
  };

  new Pagination(document.getElementById("pagination3"), paginatorOptions);
  let page = 0;
  refs.paginationRef3.addEventListener("click", (event) => {
    isEnabled(event);
  });

  function isEnabled(event) {
    const arr = Array.from(event.target.classList);
    if (!arr.includes("tui-pagination")) {
      setPaginator(event);
      document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
    }
  }

  function setPaginator(event) {
    const text = event.target.textContent;
    if (text === "next") {
      page += 1;
      if (switcher) {
        drawHtml(newArrWitnWatched[page]);
      }
      drawHtml(newArrWitnQueue[page]);
    } else if (text === "prev") {
      page -= 1;
      if (switcher) {
        drawHtml(newArrWitnWatched[page]);
      }
      drawHtml(newArrWitnQueue[page]);
    } else if (text === "first") {
      page = 0;
      if (switcher) {
        drawHtml(newArrWitnWatched[page]);
      }
      drawHtml(newArrWitnQueue[page]);
    } else if (text === "last") {
      if (switcher) {
        page = amountOfPages - 1;
        console.log(page);
        drawHtml(newArrWitnWatched[page]);
      }
      page = amountOfPages - 1;
      drawHtml(newArrWitnQueue[page]);
    } else {
      page = Number(text) - 1;
      if (switcher) {
        drawHtml(newArrWitnWatched[page]);
      }
      drawHtml(newArrWitnQueue[page]);
    }
  }

  function getVisiblePagesCount() {
    if (document.body.clientWidth <= 767) {
      return 5;
    } else {
      return 7;
    }
  }
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener("click", drawLibraryQueue);
libraryRef.addEventListener("click", () => {
  drawLibraryWatched();
  document.body.clientWidth <= 767 ? backToTopMob() : backToTop();
  localStorage.setItem("myLibrary", "true");
  refs.paginationRef.classList.add("is-hidden-paginator");
});
