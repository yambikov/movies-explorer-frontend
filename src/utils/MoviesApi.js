class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
    }).then(this._handleResponse);
  }
}

const moviesApi = new MoviesApi({ baseUrl: 'https://api.nomoreparties.co' });

export default moviesApi;
