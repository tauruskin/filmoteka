import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import {filmsSearch} from "./services/services.js";
import {totalResults, showPopular} from "./services/services.js";
import {getGenres} from "./services/services.js";
import {sortByPopularity} from "./sortByPopularity.js";
import {sortByYear} from "./sortByYears.js";
import {drawHtml, myNewTotalPage} from "./services/services.js";
import {createPaginator} from "./paginator.js";

const popularTitle = document.querySelector(".popular-title");
let inputValue;
export const checkInput = function (e) {
  if (!e.target.value) {
    console.log('here');
    refs.yearsRef.classList.add("is-not-visible");
    refs.notFoundContainer.classList.add("is-not-visible");
    popularTitle.classList.add("is-not-visible");
    showPopular(1);
  } else {
    e.preventDefault();
    let reg = /[^\d\sA-Zа-яА-ЯЁё]/gi;
    inputValue = e.target.value.match(reg);

    popularTitle.textContent = `Results on your request: ${e.target.value}`;
    const d = filmsSearch(e.target.value).then((f) => {
      return getGenres().then((g) => f.map((el) => ({
        ...el,
        genre_ids: el.genre_ids.flatMap((num) => g.filter((el) => el.id === num))
      })).sort((a, b) => b.vote_average - a.vote_average));
    });
    d.then(drawHtml);
    
  }

  
  if (! inputValue) {
    setTimeout(() => {
      refs.yearsRef.classList.remove("is-not-visible");
      refs.notFoundContainer.classList.add("is-not-visible");
      refs.searchInfo.classList.remove("unSuccessful");
      refs.searchInfo.classList.add("successful");
      refs.searchInfo.style.textAlign = "left";
      refs.searchInfo.textContent = `Found ${totalResults} movie(s) by your request`;
      refs.paginationRef.classList.remove("is-not-visible");
      sortByYear();
      sortByPopularity();
      createPaginator(myNewTotalPage);

      if (totalResults === 0) {
        refs.notFoundContainer.classList.remove("is-not-visible");
        refs.searchInfo.classList.remove("successful");
        refs.searchInfo.classList.add("unSuccessful");
        refs.searchInfo.textContent = `Found ${totalResults} movie(s) by your request`;
        refs.paginationRef.classList.add("is-not-visible");
        refs.yearsRef.classList.add("is-not-visible");
        if (!e.target.value) {
          refs.searchInfo.textContent = '';
          refs.notFoundContainer.classList.add("is-not-visible");
          popularTitle.textContent = 'Popular Movies';
        }

      } else if (e.target.value === "") {
        refs.yearsRef.classList.add("is-not-visible");
        console.log(e.target.value);
        refs.searchInfo.textContent = "";
        refs.notFoundContainer.classList.add("is-not-visible");
      }
    }, 1000);
  } else {
    refs.searchInfo.classList.remove("successful");
    refs.searchInfo.classList.add("unSuccessful");
    refs.yearsRef.classList.add("is-not-visible");
    refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
    refs.paginationRef.classList.add("is-not-visible");
    refs.searchInfo.style.textAlign = "center";
    refs.notFoundContainer.classList.add("is-not-visible");
  }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 500));
