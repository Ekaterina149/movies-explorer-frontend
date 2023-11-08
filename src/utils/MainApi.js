import {BASEURL, setDataHeaders, authDataHeaders } from "./constants.js"
class MainApi {
  constructor(baseUrl, dataheaders) {
    this._baseUrl=baseUrl;
    this._headers=dataheaders;
    this._userUrl=this._baseUrl+'/users/me';
    this._moviesUrl=this._baseUrl+'/movies';
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
  getUserInfo() {
    return fetch(this._userUrl,
      {  method: 'GET',
        credentials: 'include',
        headers:
         this._headers,

    })
    .then(
      this._checkRes
    );
  }

  updateUserInfo(name, email) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, email}) ,
    }).then(res => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    });
  }
   register ( { name, email, password })  {
    const href = this._baseUrl + "/signup";
    return fetch(href, {
      method: "POST",
      credentials: 'include',
      headers: authDataHeaders,
      body: JSON.stringify({ name, email, password }),
    }).then(res => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    });
  };

  authorize  ({email, password})  {
    const href = this._baseUrl + "/signin";
    return fetch(href, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(res => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    });
  };
   unauthorize () {
    const href = this._baseUrl + "/signout";
    return fetch(href, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkRes);
  };

  //  добавление нового фильма в избранное
  saveNewMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return fetch(this._moviesUrl, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: country || 'страна неизвестна',
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU: nameRU || 'без названия',
        nameEN: nameEN || 'без названия',
        thumbnail,
        movieId

      })
    })
    .then(this._checkRes)
  };
//метод удаления карточки пользователя с сервера
deleteMovie(movieId) {
  return fetch(`${this._moviesUrl}/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: this._headers,
  })
  .then(this._checkRes)
};
getUserMovies() {
  return fetch(this._moviesUrl, {
    method: 'GET',
    credentials: 'include',
    headers: this._headers,
  })
  .then(this._checkRes)
};

}// это для запросов,  защищенных авторизацией
const mainApiAuth = new MainApi(BASEURL, authDataHeaders);
// это для запросов,  не защищенных авторизацией
const mainApi = new MainApi(BASEURL, setDataHeaders);
export {mainApiAuth, mainApi}
