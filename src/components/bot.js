// import { getGenres } from "./services/services.js";

// // const api_Code = "1367655246:AAHepZIwts-bvZak-XRO66L8Y935ReGkwyw";
// const API_KEY = "1381841014:AAHJaRYZQIqPUy-x482AWH3XqUhAsHFwauM";

// const CHAT_ID = "436835672";
// const getData = function (key) {
//   fetch(`https://api.telegram.org/bot${key}/getUpdates`)
//     .then((data) => data.json())

//     .then((data) => data.result.map((el) => el.message.text));
// };

// getData(API_KEY);
// const helloMsg = "https://kateryna-vyshnevetska.github.io/JS-team-project/";
// const chooseMsg =
//   "Choose one topic of film: Action,Dramma,Comedy,Music,Mystery";
// const options = {
//   method: "POST",
//   chat_id: "@testFilmoteka_bot",
//   text: "test",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//   },
// };

// const postData = function (data, key, id) {
//   fetch(
//     `https://api.telegram.org/bot${key}/sendMessage?chat_id=${id}&text=${data}`,
//     options
//   );
// };
// // postData(helloMsg, API_KEY, CHAT_ID);
