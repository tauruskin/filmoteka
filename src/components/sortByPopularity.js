import { totalResults } from "./services/services.js";

export function sortByPopularity() {
    if (totalResults >= 2) {
        let films = JSON.parse(localStorage.getItem("searchFilms"));
        let sortedFilms = films.results.sort(
            (a, b) => b.vote_average - a.vote_average
        );
    } else return;
}