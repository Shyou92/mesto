export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
    this._profileImage = document.querySelector(data.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._profileImage.src,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._profileImage.src = data.avatar;
  }

  getUserId(data) {
    return data._id;
  }
}
