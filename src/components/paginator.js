import Pagination from "tui-pagination";
import "../../src/tui-pagination.css";
import {
  filmsSearch,
  showPopular,
  myNewTotalPage,
  myNewInput,
  myNewTotalAmountOfFilms,
  getGenres,
  drawHtml,
} from "./services/services.js";

import refs from "../options/refs.js";

let globalCheckPaginattor = 0;

let globalCheckPaginattorForSearch = 0;

const visiblePaginator = document.querySelector('[data-input="input"]');

if (visiblePaginator.classList.contains(".input-search .is-not-visible")) {
  // console.log("yes");
}

export function checkCreatePuginator(totalPages) {
  if (globalCheckPaginattor === 0) {
    createPaginator(totalPages);
    globalCheckPaginattor = totalPages;
  } else {
    return;
  }
}

export function checkCreatePuginatorForSearch(totalPages) {
  if (globalCheckPaginattorForSearch === totalPages) {
    return;
  } else {
    createPaginator(totalPages);
    globalCheckPaginattorForSearch = totalPages;
  }
}

export const createPaginator = function (pageForStartPaginator) {
  const paginatorOptions = {
    totalItems: myNewTotalAmountOfFilms,
    itemsPerPage: 20,
    visiblePages: getVisiblePagesCount(),
    centerAlign: true,
    totalPage: pageForStartPaginator,
  };

  new Pagination(document.getElementById("pagination2"), paginatorOptions);
  let page = 1;
  refs.paginationRef.addEventListener("click", (event) => {
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
    page = 1;
    const text = event.target.textContent;
    if (text === "next") {
      page += 1;
    } else if (text === "prev") {
      page -= 1;
    } else if (text === "first") {
      page = 1;
    } else if (text === "last") {
      page = myNewTotalPage;
    } else {
      page = text;
    }

    if (typeof myNewInput === "undefined") {
      showPopular(page);
    } else if (myNewInput.length > 0) {
      const newD = filmsSearch(myNewInput, page).then((f) => {
        return getGenres().then((g) =>
          f
            .map((el) => ({
              ...el,
              genre_ids: el.genre_ids.flatMap((num) =>
                g.filter((el) => el.id === num)
              ),
            }))
            .sort((a, b) => b.vote_average - a.vote_average)
        );
      });

      newD.then(drawHtml);
    } else {
      return;
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

function backToTop() {
  window.scroll({
    top: 500,
    behavior: "auto",
  });
}
function backToTopMob() {
  window.scroll({
    top: 260,
    behavior: "auto",
  });
}

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add("back_to_top-show");
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove("back_to_top-show");
  }
}

let goTopBtn = document.querySelector(".back_to_top");
window.addEventListener("scroll", trackScroll);
goTopBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
