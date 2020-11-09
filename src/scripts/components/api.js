export default class Api {
  constructor(config) {
    this.baseUrl = config.url;
    this.headers = config.headers;
    this.token = this.headers.authorization;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status} - ${res.statusText}`);
        }
      })
      .then((result) => {
        return result;
      });
  }

  setUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });
  }
}
