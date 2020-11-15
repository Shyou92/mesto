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
  profileImage,
  profileEdit,
  profileEditButton,
  editInput,
} from "./utils/constants.js";
import { Card } from "./components/card.js";
import { FormValidator } from "./components/formValidator.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import Section from "./components/section.js";
import UserInfo from "./components/userInfo.js";
import Api from "./components/api.js";
import PopupConfirm from "./components/popupConfirm.js";

const api = new Api(
  "https://mesto.nomoreparties.co/",
  "cohort-17",
  "a3d68f30-ff26-46e5-95a8-5a60641ab807"
);

let myUserId;

const cardList = new Section(
  {
    renderer: (item) => {
      const card = renderCard(item);
      const cardElement = card.generateCard();
      cardElements.append(cardElement);
    },
  },
  cardElements
);

const userInfo = new UserInfo(userData);

const popupConfirm = new PopupConfirm("#js-confirm");

popupConfirm.setEventListeners();

const popupWithImg = new PopupWithImage("#js-image", popupImageWithConfig);
popupWithImg.setEventListeners();

const editPopup = new PopupWithForm("#js-edit", (data) => {
  console.log(data);
  api
    .setUserInfo(data)
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      editPopup.closePopup();
    });
});

editPopup.setEventListeners();

const editProfile = new PopupWithForm("#js-update", (data) => {
  api
    .setAvatar(data.update)
    .then(() => {
      profileImage.src = data.update;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editProfile.closePopup();
    });
});

editProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  editProfile.openPopup();
});

function renderCard(item) {
  return new Card({
    options: item,
    template: ".element-template",
    handlecardClick: popupWithImg.openPopup.bind(popupWithImg),
    myId: myUserId,
    handleDeleteCard: (card) => {
      popupConfirm.openPopup();
      popupConfirm.setSubmitCallback(() => {
        api.deleteCard(card.id).then(() => {
          popupConfirm.closePopup();
          card.deleteCard();
        });
      });
    },
    handleLikeCard: (card) => {
      api
        .setLikeInfo(card.id, card.isLiked)
        .then((res) => card.updateLikes(res));
    },
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
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formEditValidator.clearValidation();
});

const formEditValidator = new FormValidator(config.formEdit, config);
formEditValidator.enableValidation();

const formCreateValidator = new FormValidator(config.formCreate, config);
formCreateValidator.enableValidation();

const formEditAva = new FormValidator(config.formEditAvatar, config);
formEditAva.enableValidation();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, receivedCards]) => {
    myUserId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(receivedCards);
  })
  .catch((error) => console.log(error));
