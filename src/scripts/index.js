import '../pages/index.css';
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
  profileEditButton,
  profileEdit,
  confirmPopup,
  imagePopup,
  editUserInfo,
  popupCreateCard,
} from './utils/constants.js';
import { isLoading, isLoaded } from './utils/utils.js';
import { Card } from './components/card.js';
import { FormValidator } from './components/formValidator.js';
import PopupWithForm from './components/popupWithForm.js';
import PopupWithImage from './components/popupWithImage.js';
import Section from './components/section.js';
import UserInfo from './components/userInfo.js';
import Api from './components/api.js';
import PopupConfirm from './components/popupConfirm.js';

const api = new Api(
  'https://mesto.nomoreparties.co/',
  'cohort-17',
  'a3d68f30-ff26-46e5-95a8-5a60641ab807'
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

const popupConfirm = new PopupConfirm(confirmPopup);

popupConfirm.setEventListeners();

const popupWithImg = new PopupWithImage(imagePopup, popupImageWithConfig);
popupWithImg.setEventListeners();

const editUserProfilePopup = new PopupWithForm(editUserInfo, (data) => {
  isLoading(editUserInfo, 'Сохранение...');
  api
    .setUserInfo(data)
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      editUserProfilePopup.closePopup();
      isLoaded(editUserInfo, 'Сохранить');
    });
});

editUserProfilePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(profileEdit, (data) => {
  isLoading(profileEdit, 'Сохранение...');
  api
    .setAvatar(data.update)
    .then(() => {
      profileImage.src = data.update;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      changeAvatarPopup.closePopup();
      isLoaded(profileEdit, 'Сохранить');
    });
});

changeAvatarPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  formEditAvatarValidator.clearValidation();
  changeAvatarPopup.openPopup();
});

function renderCard(item) {
  return new Card({
    options: item,
    template: '.element-template',
    handleCardClick: popupWithImg.openPopup.bind(popupWithImg),
    myId: myUserId,
    handleDeleteCard: (card) => {
      popupConfirm.openPopup();
      popupConfirm.setSubmitCallback(() => {
        isLoading(confirmPopup, 'Удаление...');
        api
          .deleteCard(card.id)
          .then(() => {
            popupConfirm.closePopup();
            card.deleteCard();
          })
          .catch((error) => console.log(error))
          .finally(() => {
            popupConfirm.closePopup();
            isLoaded(confirmPopup, 'Удалить');
          });
      });
    },
    handleLikeCard: (card) => {
      api
        .setLike(card.id, card.isLiked)
        .then((res) => card.updateLikes(res))
        .catch((error) => console.log(error));
    },
  });
}

const createCardPopup = new PopupWithForm(popupCreateCard, (data) => {
  isLoading(popupCreateCard, 'Создание...');
  api
    .addCard(data.name, data.link)
    .then((res) => {
      const card = renderCard(res);
      const cardElement = card.generateCard();
      cardElements.prepend(cardElement);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      createCardPopup.closePopup();
      isLoaded(popupCreateCard, 'Создать');
    });
});

createCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  createCardPopup.openPopup();
  formCreateValidator.clearValidation();
});

popupOpen.addEventListener('click', () => {
  editUserProfilePopup.openPopup();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formEditValidator.clearValidation();
});

const formEditValidator = new FormValidator(config.formEdit, config);
formEditValidator.enableValidation();

const formCreateValidator = new FormValidator(config.formCreate, config);
formCreateValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(
  config.formEditAvatar,
  config
);
formEditAvatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, receivedCards]) => {
    myUserId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(receivedCards);
  })
  .catch((error) => console.log(error));
