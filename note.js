class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _makeRequest(url, method, data) {
    const requestOptions = {
      method,
      headers: {
        ...this.headers,
        authorization: localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      },
      ...(data ? { body: JSON.stringify(data) } : {})
    };

    return fetch(`${this.baseUrl}${url}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfoApi() {
    return this._makeRequest('users/me', 'GET');
  }

  patchUserInfo(data) {
    return this._makeRequest('users/me', 'PATCH', data);
  }

  register(data) {
    return this._makeRequest('signup', 'POST', data);
  }

  login(data) {
    return this._makeRequest('signin', 'POST', data);
  }

  checkToken(data) {
    // Обновите заголовки для этого запроса, так как токен передается вручную
    const requestOptions = {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${data}`,
      },
    };

    return fetch(`${this.baseUrl}users/me`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

const apiConfig = new Api({
  baseUrl: 'https://api.yambikov-diploma.nomoredomainsmonster.ru',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

export default apiConfig;
