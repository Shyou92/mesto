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

const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__info-edit');
const popupImage = document.querySelector('.popup-image');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__submit');
const cardElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const addButton = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('#form-create');
const likeButtons = document.querySelectorAll('.element__like');
const closePopupImageButton = document.querySelector('.popup-image__close');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');
let popupImageOpened = document.querySelector('.popup-image__image');
let popupImageHeading = document.querySelector('.popup-image__heading');

const deleteCard = function (e) {
  const deleteCard = e.target.closest('.element');
  deleteCard.remove();
}

const popupOpened = function (e) {
  if (e.target === popupOpen) {
    document.getElementById('js-edit').classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else if (e.target === addButton) {
    document.getElementById('js-create').classList.add('popup_is-opened');
  } else {
    popupImage.classList.add('popup-image_is-opened');
    let imageOpened = e.target.src;
    let imagePopup = e.target.closest('.element');
    let imageText = imagePopup.querySelector('.element__heading');
    let imageTextContent = imageText.textContent;
    popupImageOpened.src = imageOpened;
    popupImageHeading.append(imageTextContent);
  };
}


const addCard = function (card) {
  const cardName = card.name;
  const cardLink = card.link;
  const templateClone = elementTemplate.cloneNode(true);
  templateClone.querySelector('.element__photo').src = cardLink;
  templateClone.querySelector('.element__heading').textContent = cardName;
  templateClone.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_state_active');
  })
  templateClone.querySelector('.element__delete').addEventListener('click', deleteCard);
  templateClone.querySelector('.element__photo').addEventListener('click', popupOpened);
  return templateClone;
}

const renderCards = function () {
  initialCards.forEach((item) => {
    const cardElem = addCard(item);
    cardElements.append(cardElem);
  });
}

renderCards()

const createCard = function (e) {
  e.preventDefault();

  const cardTitle = document.querySelector('.popup__input_title').value;
  const cardImage = document.querySelector('.popup__input_link').value;

  const initializeCard = {
    name: cardTitle,
    link: cardImage,
  }

  addCard(initializeCard);
  cardElements.prepend(addCard(initializeCard));
  formCreate.reset();
  closePopup(e);
}

const closePopup = (e) => {
  let popupElement = e.target.closest('.popup');

  if (!popupElement) { return };

  popupElement.classList.remove('popup_is-opened');
}

const closePopupImage = function (e) {
  let popupImageElem = e.target.closest('.popup-image');

  if (!popupImageElem) { return };

  popupImageElem.classList.remove('popup-image_is-opened');
  popupImageHeading.textContent = '';
}

const formSubmitHandler = function (e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

addButton.addEventListener('click', popupOpened);
popupOpen.addEventListener('click', popupOpened);
closeButtons.forEach(function (item) {
  item.addEventListener('click', closePopup)
});
closePopupImageButton.addEventListener('click', closePopupImage);
formElement.addEventListener('submit', formSubmitHandler);
popupSave.addEventListener('click', closePopup);
formCreate.addEventListener('submit', createCard);