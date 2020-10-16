export class FormValidator {
  constructor(formSelector, config) {
    this._formSelector = config.formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputInvalid = config.inputInvalid;
    this._errorClass = config.errorClass;
  }
  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputItem.id}-error`);
    errorElement.textContent = errorMessage;

    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputItem) {
    const errorElement = this._formElement.querySelector(`#${inputItem.id}-error`);
    errorElement.textContent = '';

    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputItem) {
    const isInputNotValid = !inputItem.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputItem.validationMessage
      inputItem.classList.add(this._inputInvalid);
      this._showInputError(inputItem, errorMessage);
    } else {
      this._hideInputError(inputItem);
      inputItem.classList.remove(this._inputInvalid);
    }
  }

  _toggleButtonState(inputList, buttonElements) {
    const hasValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasValidInput) {
      buttonElements.forEach((buttonElement) => {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
      })
    } else {
      buttonElements.forEach((buttonElement) => {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      })
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElements = Array.from(this._formElement.querySelectorAll(this._submitButtonSelector));

    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState(inputList, buttonElements);
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    this._setEventListeners()
  }
}