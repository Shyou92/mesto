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
// import PopupConfirm from "./components/popupConfirm.js";

const api = new Api(
  "https://mesto.nomoreparties.co/",
  "cohort-17",
  "a3d68f30-ff26-46e5-95a8-5a60641ab807"
);
const userInfo = new UserInfo(userData);

const popupWithImg = new PopupWithImage("#js-image", popupImageWithConfig);
popupWithImg.setEventListeners();

const editPopup = new PopupWithForm("#js-edit", (data) => {
  api
    .setUserInfo(data)
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .finally(() => {
      editPopup.closePopup();
    });
});

editPopup.setEventListeners();

function renderCard(item) {
  return new Card({
    options: item,
    template: ".element-template",
    handlecardClick: popupWithImg.openPopup.bind(popupWithImg),
  });
}

const createPopup = new PopupWithForm("#js-create", (data) => {
  api.addCard(data.name, data.link).then((res) => {
    const card = renderCard(res);
    const cardElement = card.generateCard();
    cardElements.prepend(cardElement);
  });
});

createPopup.setEventListeners();

addButton.addEventListener("click", () => {
  createPopup.openPopup();
  formCreateValidator.clearValidation();
});

popupOpen.addEventListener("click", () => {
  editPopup.openPopup();
  const userData = userInfo.getUserInfo();
  console.log(userData);
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formEditValidator.clearValidation();
});

const formEditValidator = new FormValidator(config.formEdit, config);
formEditValidator.enableValidation();

const formCreateValidator = new FormValidator(config.formCreate, config);
formCreateValidator.enableValidation();

// const popupConfirm = new PopupConfirm("#js-confirm");

// function deleteCard(card) {
//   popupConfirm.openPopup();
//   popupConfirm.setSubmitCallback(() => {
//     api.deleteCard(card._id).then(() => {
//       card.remove();
//       popupConfirm.closePopup();
//     });
//   });
// }

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, receivedCards]) => [
    userInfo.setUserInfo(userData),
    new Section(
      {
        items: receivedCards,
        renderer: (item) => {
          const card = renderCard(item);
          const cardElement = card.generateCard();
          cardElements.append(cardElement);
        },
      },
      cardElements
    ),
  ])
  .then((data) => data[1].renderItems());
// console.log(
//   userData._id,
//   receivedCards.forEach((item) => {
//     console.log(item.owner._id);
//   })
// )
