const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "MongoDB"];

const portfolioLinks = [
  {
    name: "Статичный сайт",
    path: "https://ekaterina149.github.io/how-to-learn/",
  },
  {
    name: "Адаптивный сайт",
    path: "https://ekaterina149.github.io/russian-travel/",
  },
  {
    name: "Одностраничное приложение",
    path: "https://ekaterina149.github.io/react-mesto-auth/",
  },
];
const MAX_WIDTH_QUANTITY = 16;
const BRAKEPOINT_WIDTH_QUANTITY_1280 = 12;
const BRAKEPOINT_WIDTH_QUANTITY_760 = 8;
const BRAKEPOINT_WIDTH_QUANTITY_320 = 5;
const MAX_WIDTH_ADD_QUANTITY = 4;
const BRAKEPOINT_WIDTH_ADD_QUANTITY_1280 = 3;
const BRAKEPOINT_WIDTH_ADD_QUANTITY_760 = 2;
const BRAKEPOINT_WIDTH_ADD_QUANTITY_320 = 2;
const MAX_WIDTH = 1331;
const MID_WIDTH = 940;
const MIN_WIDTH = 620;
const SHORT_FILM_DUR = 40;

const MOVIE_BASEURL = "https://api.nomoreparties.co/beatfilm-movies";
const MOVIE_BASEURL_PIC = "https://api.nomoreparties.co";
const BASEURL = "https://api.hexediploma.nomoredomains.rocks";
// const BASEURL = "http://localhost:3000";
const getMovieHeaders = {
  "Content-Type": "application/json",
};
const getdataHeaders = {};
const setDataHeaders = {
  "Content-Type": "application/json",
};
const authDataHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export {
  techs,
  portfolioLinks,
  BASEURL,
  getdataHeaders,
  setDataHeaders,
  authDataHeaders,
  MOVIE_BASEURL,
  getMovieHeaders,
  MAX_WIDTH_QUANTITY,
  BRAKEPOINT_WIDTH_QUANTITY_1280,
  BRAKEPOINT_WIDTH_QUANTITY_760,
  BRAKEPOINT_WIDTH_QUANTITY_320,
  MAX_WIDTH_ADD_QUANTITY,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_1280,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_760,
  BRAKEPOINT_WIDTH_ADD_QUANTITY_320,
  MAX_WIDTH,
  MID_WIDTH,
  MIN_WIDTH,
  SHORT_FILM_DUR,
  MOVIE_BASEURL_PIC,
};
