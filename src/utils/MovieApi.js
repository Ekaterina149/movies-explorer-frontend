import { MOVIE_BASEURL, getMovieHeaders } from './constants';




class MovieApi {
  constructor(baseUrl, headers) {
    this._baseUrl=baseUrl;
    this._headers=headers;
  }
   //Метод возвращает промисс из ответа сервера
  //в случае ошибки возвращает ее код и текст ошибки
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }
  //метод загружает фильмы
 getMovies() {
  return fetch(this._baseUrl, {method: 'GET', headers: this._headers} )
  .then(this._checkRes)
 }
}
 const movieApi = new MovieApi( MOVIE_BASEURL, getMovieHeaders);
 export default movieApi;
