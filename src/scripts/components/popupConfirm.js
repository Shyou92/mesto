import Popup from "./popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submit = this._form.querySelector(".popup__submit");
    this._defaultSubmitText = this._submit.textContent;
  }

  setSubmitCallback(callback) {
    this._submitCallback = callback;
  }

  isLoading(text) {
    this._submit.textContent = text;
  }

  isLoaded() {
    this._submit.textContent = this._defaultSubmitText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback();
    });
  }
}
