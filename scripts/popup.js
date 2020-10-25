export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }
}