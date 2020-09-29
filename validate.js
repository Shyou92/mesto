const allSelectorsClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
console.log(allSelectorsClasses.formSelector);

const showInputError = (formElement, inputItem, allClasses, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputItem.id}-error`);
  console.log(errorElement);  // добавь в css показать и скрыть ошибку и допиши ф-ции
};

const hideInputErrror = (formElement, inputItem, allClasses) => { };

const checkInputValidity = (formElement, inputItem, allClasses) => {
  console.log(inputItem.validity);
  const isInputNotValid = inputItem.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputItem.validationMessage;

    showInputError(formElement, inputItem, allClasses, errorMessage)
  } else {
    hideInputErrror(formElement, inputItem, allClasses)
  }
}

const setEventListeners = (formElement, allClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', (e) => {
      console.log(e.target.name);
      checkInputValidity(formElement, inputItem, allSelectorsClasses)
    })
  })
}


const enableValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    setEventListeners(formElement, allSelectorsClasses)
  })
}

enableValidation(allSelectorsClasses);