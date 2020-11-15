import Popup from "./popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
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
