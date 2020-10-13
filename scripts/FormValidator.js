const showInputError = (formElement, inputItem, errorMessage, allClasses) => {
  const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
  errorElement.textContent = errorMessage;

  errorElement.classList.add(allClasses.errorClass);
};

const hideInputErrror = (formElement, inputItem, allClasses) => {
  const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
  errorElement.textContent = '';

  errorElement.classList.remove(allClasses.errorClass);
};

const checkInputValidity = (formElement, inputItem, allClasses) => {
  const isInputNotValid = !inputItem.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputItem.validationMessage
    inputItem.classList.add(allClasses.inputInvalid);
    showInputError(formElement, inputItem, errorMessage, allClasses);
  } else {
    hideInputErrror(formElement, inputItem, allClasses);
    inputItem.classList.remove(allClasses.inputInvalid);
  }
}

const toggleButtonState = function (inputList, buttonElements, allClasses) {
  const hasValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if (hasValidInput) {
    buttonElements.forEach((buttonElement) => {
      buttonElement.classList.add(allClasses.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    })
  } else {
    buttonElements.forEach((buttonElement) => {
      buttonElement.classList.remove(allClasses.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    })
  }
}

const setEventListeners = (formElement, allClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
  const buttonElements = Array.from(document.querySelectorAll(allClasses.submitButtonSelector));

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formElement, inputItem, allClasses)
      toggleButtonState(inputList, buttonElements, allClasses)
    })
  })
}

const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    setEventListeners(formElement, allClasses)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  inputInvalid: 'popup__input_invalid',
  errorClass: 'popup__input_error_active'
});