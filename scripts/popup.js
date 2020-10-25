export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {
    this._popupSelector.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('click', this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this._closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener('click', this._handleEscClose.bind(this));
  }
}