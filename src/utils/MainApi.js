class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  _makeRequest(url, method, data) {
    const requestOptions = {
      method,
      headers: {
        ...this.headers,
        authorization: localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    }

    return fetch(`${this.baseUrl}${url}`, requestOptions).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return res.json()
          .then((err) => {
            // throw new Error(errorData.message || `Ошибка: ${res.status}`);
            throw new Error(err.message);
          });
      }
    })
  }

  getUserInfoApi() {
    return this._makeRequest("users/me", "GET")
  }

  patchUserInfo(data) {
    return this._makeRequest("users/me", "PATCH", data)
  }

  register(data) {
    return this._makeRequest("signup", "POST", data)
  }

  login(data) {
    return this._makeRequest("signin", "POST", data)
  }


  // putLike(data) {
  //   return this._makeRequest(`cards/${data}/likes`, 'PUT');
  // }

  postMovie(data) {
    return this._makeRequest('movies', 'POST', data);
  }

  deleteMovie(data) {
    console.log(data._id);
    return this._makeRequest(`movies/${data._id}`, 'DELETE');
  }

  // Получить список начальных карточек
  getSavedMovies() {
    return this._makeRequest('movies', 'GET'); // возвращает массив карточек
  }

  checkToken(data) {
    const requestOptions = {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${data}`,
      },
    }

    return fetch(`${this.baseUrl}users/me`, requestOptions).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}

export const MainApi = new Api({
  baseUrl: "https://api.yambikov-diploma.nomoredomainsmonster.ru/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export default MainApi

export const checkToken = (token) => {
  const BASE_URL = "https://api.yambikov-diploma.nomoredomainsmonster.ru"
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  })
}
