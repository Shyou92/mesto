export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
