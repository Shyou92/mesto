const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горы Архыза'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Озеро в Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Дома в Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Гора на Камчатке'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога сквозь лес в Холмогорском районе'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Скалы на Байкале'
  }
];

const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__info-edit');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupSave = document.querySelector('.popup__submit');
const cardElements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button')
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');

function render() {
  for (let i = 0; i < initialCards.length; i++) {
    const elementTemplate = document.querySelector('.element-template').content;
    const templateClone = elementTemplate.cloneNode(true);

    templateClone.querySelector('.element__photo').src = initialCards[i].link;
    templateClone.querySelector('.element__heading').textContent = initialCards[i].name;
    templateClone.querySelector('.element__photo').alt = initialCards[i].alt;
    cardElements.append(templateClone);
  }
}

render();

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

  if (!popupElement) return;

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
})
formElement.addEventListener('submit', formSubmitHandler);
popupSave.addEventListener('click', closePopup);