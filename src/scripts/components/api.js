export default class Api {
  constructor(baseUrl, group, token) {
    this.baseUrl = baseUrl;
    this.group = group;
    this.token = token;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  getCards() {
    return fetch(`${this.baseUrl}v1/${this.group}/cards`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}v1/${this.group}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  setLikeInfo(cardID, likeState) {
    const method = likeState ? "DELETE" : "PUT";

    return fetch(`${this.baseUrl}v1/${this.group}/cards/likes/${cardID}`, {
      method,
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  setAvatar(data) {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}v1/${this.group}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status} - ${res.statusText}`);
      }
    });
  }
}
