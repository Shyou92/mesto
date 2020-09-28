const setEventlisteners = (formElement) => {
  const inputList = Array.from(inputSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      console.log('1');
    })
  })
}

const enableValidation = ({ formSelector }) => {
  const formList = Array.from(formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  })
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export default enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})