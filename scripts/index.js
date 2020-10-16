import { Card } from './card.js';
import { FormValidator } from './formValidator.js'
export { openPopup, popupImage, popupImageOpened, popupTitle, closePopup, config }

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];
const popupEdit = document.querySelector('#js-edit');
const popupCreate = document.querySelector('#js-create');
const popupImage = document.querySelector('#js-image');
const popupOpen = document.querySelector('.profile__info-edit');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__submit');
const cardElements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('#form-create');
const cardTitle = document.querySelector('.popup__input_title');
const cardImage = document.querySelector('.popup__input_link');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');
const popupImageOpened = document.querySelector('.popup__image');
const popupTitle = document.querySelector('#js__title');
const popupErrors = Array.from(document.querySelectorAll('.popup__input_error'));
const popupInputs = Array.from(document.querySelectorAll('.popup__input'));
const popups = Array.from(document.querySelectorAll('.popup'));
const popupSaveElems = Array.from(document.querySelectorAll('.popup__submit'))
const submitInCreateForm = document.querySelector('#js-submit-disabled');
const config = {
  formSelector: '.popup__form',
  formEdit: '#js-edit',
  formCreate: '#js-create',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  inputInvalid: 'popup__input_invalid',
  errorClass: 'popup__input_error_active'
}

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc)
}

const fillingText = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const createCard = function (e) {
  e.preventDefault();

  const initializeCard = {
    name: cardTitle.value,
    link: cardImage.value,
  }

  const card = new Card(initializeCard, '.element-template');
  const cardElement = card.generateCard();

  cardElements.prepend(cardElement);
  formCreate.reset();
  popupInputs.forEach((popupInput) => {
    if (popupInput.value == '') {
      submitInCreateForm.classList.add('popup__submit_inactive')
    }
  })
  closePopup(popupCreate);
}

const closePopup = function (popup) {
  const hasValidInput = popupInputs.some((inputElement) => !inputElement.validity.valid);

  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc)

  if (hasValidInput) {
    popupErrors.forEach((popupError) => {
      popupError.textContent = '';
    })
  }

  popupInputs.forEach((popupInput) => {
    popupInput.classList.remove('popup__input_invalid');
  })

  popupSave.classList.remove('popup__input_error_active');
  popupSave.disabled = false;
}

const closePopupByEsc = function (e) {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
}

const closeByClickOnOverlay = function (e) {
  popups.forEach((popupElement) => {
    if (e.target !== e.currentTarget) {
      return
    }
    if (popupElement.classList.contains('popup_is-opened')) {
      closePopup(popupElement);
    }
  })
}

const formSubmitHandler = function (e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

addButton.addEventListener('click', () => {
  openPopup(popupCreate);
});
popupOpen.addEventListener('click', () => {
  fillingText();
  openPopup(popupEdit);
});
formElement.addEventListener('submit', formSubmitHandler);
formCreate.addEventListener('submit', createCard);
closeButtons.forEach(function (item) {
  item.addEventListener('click', () => {
    popups.forEach((popup) => {
      closePopup(popup)
    })
  })
});
popupSaveElems.forEach((item) => {
  item.addEventListener('click', () => {
    popups.forEach((popup) => {
      closePopup(popup)
    });
  })
})
popups.forEach((popupElement) => {
  popupElement.addEventListener('click', closeByClickOnOverlay)
})

initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
})

const formEditValidator = new FormValidator(config.formEdit, config);
formEditValidator.enableValidation();

const formCreateValidator = new FormValidator(config.formCreate, config);
formCreateValidator.enableValidation();