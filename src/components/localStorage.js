import {drawHtml} from "./services/services";

let idMovie;
const massegeWatched = document.querySelector(".is-massege-watched-hidden");
const massegeQueue = document.querySelector(".is-massege-queue-hidden");
const body = document.querySelector(".list-film");

const saveMovie = (value, id) => {
  let arr = JSON.parse(localStorage.getItem(value)) || [];
  arr.push(id);
  localStorage.setItem(value, JSON.stringify(arr));
};

const saveMovieQueue = (value, id) => {
  let arr = JSON.parse(localStorage.getItem(value)) || [];
  arr.unshift(id);
  localStorage.setItem(value, JSON.stringify(arr));
};

const checkDelete = function (value, id) {
  let arr = JSON.parse(localStorage.getItem(value)) || [];
  let checkPage = JSON.parse(localStorage.getItem('myLibrary'));
  console.log(checkPage);

  arr.forEach((el) => {
    if (JSON.stringify(el) === JSON.stringify(id)) {
      const findIndex = arr.indexOf(el);
      arr.splice(findIndex, 1);
      localStorage.setItem(value, JSON.stringify(arr));
      if (checkPage) {
        drawHtml(arr);
        console.log(arr.length);

        if (arr.length === 0) {
          localStorage.removeItem(value);
          body.innerHTML = "";
          if (value === 'arrWatched') {
            massegeWatched.style.display = "block";
          } else {
            massegeQueue.style.display = "block";
          }
        }
      }
    } else {
      return;
    }
  });
};

export function write(some) {
  idMovie = some;
  const allBtn = document.querySelector(".card-button__wrapper");
  allBtn.addEventListener("click", checkClickBtn);
}

const checkClickBtn = (ev) => { // console.log(ev.target);
  const btnWatched = document.querySelector(".card-button__watched");
  const btnDelWatched = document.querySelector(".card-button__del-watched");
  const btnQueue = document.querySelector(".card-button__queue");
  const btnDelQueue = document.querySelector(".card-button__del-queue");

  if (ev.target === btnWatched && btnWatched.textContent === "add to watched") {
    saveMovie("arrWatched", idMovie);
    btnWatched.textContent = "delete from watched";
    console.log(btnWatched.textContent);
  } else if (ev.target === btnWatched && btnWatched.textContent === "delete from watched") {
    checkDelete("arrWatched", idMovie);
    btnWatched.textContent = "add to watched";
  } else if (ev.target === btnDelWatched && btnDelWatched.textContent === "delete from watched") {
    checkDelete("arrWatched", idMovie);
    btnDelWatched.textContent = "add to watched";
  } else if (ev.target === btnDelWatched && btnDelWatched.textContent === "add to watched") {
    saveMovie("arrWatched", idMovie);
    btnWatched.textContent = "delete from watched";
  } else if (ev.target === btnQueue && btnQueue.textContent === "add to queue") {
    saveMovieQueue("arrQueue", idMovie);
    btnQueue.textContent = "delete from queue";
  } else if (ev.target === btnQueue && btnQueue.textContent === "delete from queue") {
    checkDelete("arrQueue", idMovie);
    btnQueue.textContent = "add to queue";
  } else if (ev.target === btnDelQueue && btnDelQueue.textContent === "delete from queue") {
    checkDelete("arrQueue", idMovie);
    btnDelQueue.textContent = "add to queue";
  } else if (ev.target === btnDelQueue && btnDelQueue.textContent === "add to queue") {
    saveMovieQueue("arrQueue", idMovie);
    btnDelQueue.textContent = "delete from queue";
  }
};
