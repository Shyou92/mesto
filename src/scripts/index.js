import "../pages/index.css";
import {
  popupOpen,
  cardElements,
  addButton,
  nameInput,
  jobInput,
  config,
  popupImageWithConfig,
  userData,
  profileName,
  profileJob,
  profileImage,
} from "./utils/constants.js";
import { Card } from "./components/card.js";
import { FormValidator } from "./components/formValidator.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import Section from "./components/section.js";
import UserInfo from "./components/userInfo.js";
import Api from "./components/api.js";

const apiUser = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  method: "GET",
  headers: {
    authorization: "a3d68f30-ff26-46e5-95a8-5a60641ab807",
    "Content-Type": "application/json",
  },
});

const popupWithImg = new PopupWithImage("#js-image", popupImageWithConfig);
popupWithImg.setEventListeners();

const apiGallery = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  method: "GET",
  headers: {
    authorization: "a3d68f30-ff26-46e5-95a8-5a60641ab807",
    "Content-Type": "application/json",
  },
});

const apiEditUser = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  method: "PATCH",
  headers: {
    authorization: "a3d68f30-ff26-46e5-95a8-5a60641ab807",
    "Content-Type": "application/json",
  },
});

const getInfo = new UserInfo(userData);

const editPopup = new PopupWithForm("#js-edit", (data) => {
  console.log(data);
  apiEditUser
    .setUserInfo({
      name: data.name,
      about: data.about,
    })
    .then((info) => {
      profileName.textContent = info.name;
      profileJob.textContent = info.about;
    })
    .finally(() => {
      editPopup.closePopup();
    });
});

editPopup.setEventListeners();

const createPopup = new PopupWithForm("#js-create", (data) => {
  const card = new Card(
    data,
    ".element-template",
    popupWithImg.openPopup.bind(popupWithImg)
  );
  const cardElement = card.generateCard();
  cardElements.prepend(cardElement);
});

createPopup.setEventListeners();

addButton.addEventListener("click", () => {
  createPopup.openPopup();
  formCreateValidator.clearValidation();
});

popupOpen.addEventListener("click", () => {
  editPopup.openPopup();
  const userData = getInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formEditValidator.clearValidation();
});

const formEditValidator = new FormValidator(config.formEdit, config);
formEditValidator.enableValidation();

const formCreateValidator = new FormValidator(config.formCreate, config);
formCreateValidator.enableValidation();

apiUser.getUserInfo().then((result) => {
  profileName.textContent = result.name;
  profileJob.textContent = result.about;
  profileImage.src = result.avatar;
});

apiGallery
  .getCards()
  .then((result) => {
    const initialGallery = new Section(
      {
        items: result,
        renderer: (item) => {
          const card = new Card(
            item,
            ".element-template",
            popupWithImg.openPopup.bind(popupWithImg)
          );
          const cardElement = card.generateCard();
          initialGallery.addItem(cardElement);
        },
      },
      cardElements
    );
    return initialGallery;
  })
  .then((data) => data.renderItems());
