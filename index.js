import initialCards from './data.js';

const popupEdit = document.querySelector('#js-edit');
const popupCreate = document.querySelector('#js-create');
const popupImage = document.querySelector('#js-image');
const popupOpen = document.querySelector('.profile__info-edit');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__submit');
const cardElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const addButton = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('#form-create');
const cardTitle = document.querySelector('.popup__input_title').value;
const cardImage = document.querySelector('.popup__input_link').value;
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');
let popupImageOpened = document.querySelector('.popup__image');
let popupTitle = document.querySelector('#js__title');

const deleteCard = function (e) {
  const deleteCard = e.target.closest('.element');
  deleteCard.remove();
}

const popupOpened = function (popup) {
  popup.classList.add('popup_is-opened');
};

const fillingText = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const fillingCard = function (e) {
  popupTitle.textContent = '';
  let imageOpened = e.target.src;
  let imagePopup = e.target.closest('.element');
  let imageText = imagePopup.querySelector('.element__heading');
  let imageTextContent = imageText.textContent;
  popupImageOpened.src = imageOpened;
  popupTitle.append(imageTextContent);
}

function imageClickHandler(e) {
  fillingCard(e);
  popupOpened(popupImage);
}

const likeCard = function (e) {
  e.target.classList.toggle('element__like_state_active');
}

const addCard = function (card) {
  const cardName = card.name;
  const cardLink = card.link;
  const templateClone = elementTemplate.cloneNode(true);
  templateClone.querySelector('.element__photo').src = cardLink;
  templateClone.querySelector('.element__heading').textContent = cardName;
  templateClone.querySelector('.element__like').addEventListener('click', likeCard);
  templateClone.querySelector('.element__delete').addEventListener('click', deleteCard);
  templateClone.querySelector('.element__photo').addEventListener('click', imageClickHandler);
  return templateClone;
}

const renderCards = function (item) {
  const cardElem = addCard(item);
  cardElements.append(cardElem);
}

initialCards.forEach((item) => {
  renderCards(item)
});

const createCard = function (e) {
  e.preventDefault();

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

const formSubmitHandler = function (e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

addButton.addEventListener('click', () => {
  popupOpened(popupCreate);
});
popupOpen.addEventListener('click', () => {
  fillingText();
  popupOpened(popupEdit);
});
closeButtons.forEach(function (item) {
  item.addEventListener('click', closePopup)
});
formElement.addEventListener('submit', formSubmitHandler);
popupSave.addEventListener('click', closePopup);
formCreate.addEventListener('submit', createCard);