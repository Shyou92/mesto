import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._title = document.querySelector(data.title);
    this._image = document.querySelector(data.image);
  }

  openPopup(title, image) {
    this._popup.classList.add('popup_is-opened');
    this.setEventListeners();

    this._title.textContent = title;
    this._image.alt = title;
    this._image.src = image;
  }
}


