import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputObj = {};

    this._inputList.forEach((item) => {
      this._inputObj[item.name] = item.value;
    });
    return this._inputObj;
  }

  closePopup() {
    super.closePopup();

    this._inputList.forEach((item) => {
      return item.textContent = '';
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', () => {
      this.closePopup();
      this._formSubmit(this._getInputValues());
    })
  }
}