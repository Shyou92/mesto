const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.js-open__info-edit');
const popupClose = document.querySelector('.js-popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.js-popup__submit');
let nameInput = formElement.querySelector('.js-popup__form-name');
let jobInput = formElement.querySelector('.js-popup__form-job');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');

const popupOpened = function () {
  popup.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const popupClosed = function () {
  popup.classList.remove('popup_is-opened')
}

const formSubmitHandler = function (event) {

  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

popupOpen.addEventListener('click', popupOpened);
popupClose.addEventListener('click', popupClosed);
formElement.addEventListener('submit', formSubmitHandler);
popupSave.addEventListener('click', popupClosed);