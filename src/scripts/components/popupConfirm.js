import Popup from "./popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this.formSubmit = this._popupSelector.querySelector(".popup__submit");
  }

  setSubmitCallback(callback) {
    this._submitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback();
    });
  }
}
