import pic_33_word from "../images/33_words_design.png";
import pic_100_years from "../images/100_years_design.png";
import pic_Banksy from "../images/Bancksy.png";
import pic_Baskiya from "../images/Baskiya.png";
import pic_run from "../images/Run_is_liberty.png";
import pic_booksellers from "../images/Booksellers.png";
import pic_germany from "../images/Thoughts_about_Germany.png";
import pic_gimme from "../images/Gimme_danger.png";
import pic_janice from "../images/Janice_little_girl.png";
import pic_jump from "../images/brace_before_jump.png";
import pic_pj from "../images/PJ_Hurvy.png";
import pic_cinema from "../images/cinema_sound_art.png";

const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "MobgoDB"];
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
const movieList = [
  { name: "33 слова о дизайне", duration: "1ч 47м", image: pic_33_word },
  {
    name: "Киноальманах «100 лет дизайна»",
    duration: "1ч 3м",
    image: pic_100_years,
  },
  { name: "В погоне за Бенкси", duration: "1ч 42м", image: pic_Banksy },
  { name: "Баския: Взрыв реальности", duration: "1ч 21м", image: pic_Baskiya },
  { name: "Бег это свобода", duration: "1ч 44м", image: pic_run },
  { name: "Книготорговцы", duration: "1ч 37м", image: pic_booksellers },
  {
    name: "Когда я думаю о Германии ночью",
    duration: "1ч 56м",
    image: pic_germany,
  },
  {
    name: "Gimme Danger: История Игги и The Stooge...",
    duration: "1ч 59м",
    image: pic_gimme,
  },
  {
    name: "Дженис: Маленькая девочка грустит",
    duration: "1ч 42м",
    image: pic_janice,
  },
  {
    name: "Соберись перед прыжком",
    duration: "1ч 42м",
    image: pic_jump,
  },
  {
    name: "Пи Джей Харви: A dog called money",
    duration: "1ч 4м",
    image: pic_pj,
  },
  {
    name: "По волнам: Искусство звука в кино",
    duration: "1ч 7м",
    image: pic_cinema,
  },
];

const savedlist = [
  { name: "33 слова о дизайне", duration: "1ч 47м", image: pic_33_word },
  {
    name: "Киноальманах «100 лет дизайна»",
    duration: "1ч 3м",
    image: pic_100_years,
  },
  { name: "В погоне за Бенкси", duration: "1ч 42м", image: pic_Banksy },
];
export { techs, portfolioLinks, movieList, savedlist };
