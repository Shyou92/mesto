export class FormValidator {
  constructor(formSelector, config) {
    this._formSelector = config.formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButtonSelector = config.submitButtonSelector;
    this._submit = this._formElement.querySelector(this._submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputInvalid = config.inputInvalid;
    this._errorClass = config.errorClass;
  }
  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputItem.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputItem) {
    const errorElement = this._formElement.querySelector(
      `#${inputItem.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputItem) {
    const isInputNotValid = !inputItem.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputItem.validationMessage;
      inputItem.classList.add(this._inputInvalid);
      this._showInputError(inputItem, errorMessage);
    } else {
      this._hideInputError(inputItem);
      inputItem.classList.remove(this._inputInvalid);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submit.classList.add(this._inactiveButtonClass);
      this._submit.setAttribute("disabled", true);
    } else {
      this._submit.classList.remove(this._inactiveButtonClass);
      this._submit.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    return hasInvalidInput;
  }

  clearValidation() {
    this._toggleButtonState();
    if (this._hasInvalidInput()) {
      this._formElement.querySelector(this._inputErrorClass).textContent = "";
    }

    this._inputList.forEach((inputItem) => {
      inputItem.classList.remove(this._inputInvalid);
    });
    const errorList = Array.from(
      this._formElement.querySelectorAll(this._inputErrorClass)
    );
    errorList.forEach((errorItem) => {
      errorItem.classList.remove(this._errorClass);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
