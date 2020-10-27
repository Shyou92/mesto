import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._title = document.querySelector(data.title);
    this._image = document.querySelector(data.image);
  }

  openPopup(title, image) {
    super.openPopup();

    this._title.textContent = title;
    this._image.alt = title;
    this._image.src = image;
  }
}


