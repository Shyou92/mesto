const popupOpen = document.querySelector(".profile__info-edit");
const formElement = document.querySelector(".popup__form");
const cardElements = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const nameInput = formElement.querySelector(".popup__input_name");
const jobInput = formElement.querySelector(".popup__input_job");
const editInput = document.querySelector("#edit-ava-popup");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");
const profileImage = document.querySelector(".profile__image");
const profileEdit = document.querySelector("#js-update");
const profileEditButton = document.querySelector(".profile__edit");
const config = {
  formSelector: ".popup__form",
  formEdit: "#js-edit",
  formCreate: "#js-create",
  formEditAvatar: "#js-update",
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
  avatar: ".profile__image",
};

export {
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
  profileEdit,
  profileEditButton,
  editInput,
};
