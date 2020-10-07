import refs from "../options/refs.js";
import years from "../template/years.hbs";
import { drawHtml } from "./services/services.js";

let arr;
export function sortByYear() {
  arr = JSON.parse(localStorage.getItem("searchFilms"));
  let arrYears = arr.results.map((el) =>
    el.release_date.slice(0, el.release_date.length - 6)
  );

  let filteredArrYears = arrYears.filter((el) => el !== "");
  let sortedfilteredArrYears = filteredArrYears.sort((a, b) => b - a);
  let arrayRemoveDublicate = new Set(sortedfilteredArrYears);
  let arrayPerfect = [...arrayRemoveDublicate];

  if (filteredArrYears) {
    refs.yearsRef.classList.remove("is-not-visible");

    refs.yearsRef.innerHTML = `<option value="0" selected="selected">Select year</option>${years(
      arrayPerfect
    )}`;
  } else return;
}

// function getYear(event) {
//   refs.paginationRef.classList.add("is-hidden");
//   if (event.target.value === "0") {
//     drawHtml(arr.results);
//     refs.paginationRef.classList.remove("is-hidden");
//   } else {
//     const res = arr.results.filter((el) => {
//       return (
//         el.release_date.slice(0, el.release_date.length - 6) ===
//         event.target.value
//       );
//     });
//     drawHtml(res);
//     refs.paginationRef.classList.add("is-hidden");
//   }
// }

function getYear(event) {
  refs.paginationRef.classList.add("is-hidden");
  if (event.target.value === "0") {
    drawHtml(arr.results);
    refs.paginationRef.classList.remove("is-hidden");
  } else {
    const res = arr.results.filter((el) => {
      return (
        el.release_date.slice(0, el.release_date.length - 6) ===
        event.target.value
      );
    });
    const yearD = getGenres().then((g) =>
      res
        .map((el) => ({
          ...el,
          genre_ids: el.genre_ids.flatMap((num) =>
            g.filter((el) => el.id === num)
          ),
        }))
        .sort((a, b) => b.vote_average - a.vote_average)
    );

    yearD.then(drawHtml);

    refs.paginationRef.classList.add("is-hidden");
  }
}

refs.yearsRef.addEventListener("change", getYear);

refs.yearsRef.addEventListener("change", getYear);
