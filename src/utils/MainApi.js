import { getToken } from './token';

class MainApi {
    constructor({ address }) {
      this._address = address;
    }
  
    getInitialInfo() {
      return Promise.all([this.getUserInfo(), this.getCardList()]);
    }
  
    getUserInfo() {
      const token = getToken();
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    getCardList() {
      const token = getToken();
      return fetch(`${this._address}/articles`, {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    createCard({ keyword, title, text, date, source, link, image }) {
      const token = getToken();
      return fetch(`${this._address}/articles`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword, title, text, date, source, link, image
        }),
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    deleteCard(articleId) {
      const token = getToken();
      return fetch(`${this._address}/articles/${articleId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
}

  export const mainApi = new MainApi({
    address: 'http://localhost:3000',
  
  });
