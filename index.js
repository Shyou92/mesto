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
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__submit');
const cardElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const addButton = document.querySelector('.profile__add-button')
const formCreate = document.querySelector('#form-create');
const likeButtons = document.querySelectorAll('.element__like')
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');


const addCard = function (card) {
  const cardName = card.name;
  const cardLink = card.link;
  const templateClone = elementTemplate.cloneNode(true);
  templateClone.querySelector('.element__photo').src = cardLink;
  templateClone.querySelector('.element__heading').textContent = cardName;
  templateClone.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_state_active');
  })
  cardElements.append(templateClone);
}

const renderCards = function () {
  initialCards.forEach(addCard)
}

renderCards();

const createCard = function (e) {
  e.preventDefault();

  const cardTitle = document.querySelector('.popup__input_title').value;
  const cardImage = document.querySelector('.popup__input_link').value;

  const initializeCard = {
    name: cardTitle,
    link: cardImage,
  }
  addCard(initializeCard);
  formCreate.reset();
  closePopup(e);
}

const popupOpened = function (e) {
  if (e.target === popupOpen) {
    document.getElementById('js-edit').classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else if (e.target === addButton) {
    document.getElementById('js-create').classList.add('popup_is-opened');
  }
}

const closePopup = (e) => {
  let popupElement = e.target.closest('.popup');

  if (!popupElement) { return };

  popupElement.classList.remove('popup_is-opened')
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
formElement.addEventListener('submit', formSubmitHandler);
popupSave.addEventListener('click', closePopup);
formCreate.addEventListener('submit', createCard);