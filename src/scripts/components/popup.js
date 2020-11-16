export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.closePopup();
    });
    this._popup.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) {
        return;
      } else {
        this.closePopup();
      }
    });
  }
}
