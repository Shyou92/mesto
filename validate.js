

const showInputError = (formElement, inputItem, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
  errorElement.textContent = errorMessage;

  errorElement.classList.add('popup__input_error_active');
};

const hideInputErrror = (formElement, inputItem) => {
  const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
  errorElement.textContent = '';

  errorElement.classList.remove('popup__input_error_active');
};

const checkInputValidity = (formElement, inputItem) => {
  const isInputNotValid = !inputItem.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputItem.validationMessage
    inputItem.classList.add('popup__input_invalid');
    showInputError(formElement, inputItem, errorMessage);
  } else {
    hideInputErrror(formElement, inputItem);
    inputItem.classList.remove('popup__input_invalid');
  }
}

const toggleButtonState = function (inputList, buttonElements) {
  const hasValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if (hasValidInput) {
    buttonElements.forEach((buttonElement) => {
      buttonElement.classList.add('popup__submit_inactive');
      buttonElement.setAttribute('disabled', true);
    })
  } else {
    buttonElements.forEach((buttonElement) => {
      buttonElement.classList.remove('popup__submit_inactive');
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
      toggleButtonState(inputList, buttonElements)
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
  errorClass: 'popup__input_error_active'
});