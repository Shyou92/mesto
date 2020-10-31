export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // this._closeButton = this._popup.querySelector('.popup__close');
  }

  openPopup() {
    this._popup.classList.add('popup_is-opened');
    // this.setEventListeners();
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  }

  // _closeByClickOnOverlay(e) {
  //   if (e.target !== e.currentTarget) {
  //     return
  //   } else {
  //     this.closePopup();
  //   }
  // }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose.bind(this));
    // this._closeButton.addEventListener('click', this.closePopup.bind(this));
    // this._popup.addEventListener('click', this._closeByClickOnOverlay.bind(this));
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.closePopup();
    })
    this._popup.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) {
        return
      } else {
        this.closePopup();
      }
    });
  }
}
