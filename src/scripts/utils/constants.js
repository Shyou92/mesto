const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const popupOpen = document.querySelector(".profile__info-edit");
const formElement = document.querySelector(".popup__form");
const cardElements = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const nameInput = formElement.querySelector(".popup__input_name");
const jobInput = formElement.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");
const profileImage = document.querySelector(".profile__image");
const config = {
  formSelector: ".popup__form",
  formEdit: "#js-edit",
  formCreate: "#js-create",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: ".popup__input_error",
  inputInvalid: "popup__input_invalid",
  errorClass: "popup__input_error_active",
};
const popupImageWithConfig = {
  title: ".popup__title_content-heading",
  image: ".popup__image",
};
const userData = {
  name: ".profile__info-name",
  about: ".profile__info-job",
};

export {
  initialCards,
  popupOpen,
  formElement,
  cardElements,
  addButton,
  nameInput,
  jobInput,
  config,
  popupImageWithConfig,
  userData,
  profileImage,
  profileName,
  profileJob,
};
