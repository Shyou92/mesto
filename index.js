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
const cardTitle = document.querySelector('.popup__input_title');
const cardImage = document.querySelector('.popup__input_link');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');
const popupImageOpened = document.querySelector('.popup__image');
const popupTitle = document.querySelector('#js__title');
const popupErrors = Array.from(document.querySelectorAll('.popup__input_error'));
const popupInputs = Array.from(document.querySelectorAll('.popup__input'));
const popups = Array.from(document.querySelectorAll('.popup'));
const popupSaveElems = Array.from(document.querySelectorAll('.popup__submit'))
const submitInCreateForm = document.querySelector('#js-submit-disabled');

const deleteCard = function (e) {
  const deleteCard = e.target.closest('.element');
  deleteCard.remove();
}

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc)
}

const fillingText = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const fillingCard = function (e) {
  popupTitle.textContent = '';
  const imageOpened = e.target.src;
  const imagePopup = e.target.closest('.element');
  const imageText = imagePopup.querySelector('.element__heading');
  const imageTextContent = imageText.textContent;
  popupImageOpened.src = imageOpened;
  popupTitle.append(imageTextContent);
}

const imageClickHandler = function (e) {
  fillingCard(e);
  openPopup(popupImage);
}

const likeCard = function (e) {
  e.target.classList.toggle('element__like_state_active');
}

const getCardElement = function (card) {
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
  const cardElem = getCardElement(item);
  cardElements.append(cardElem);
}

initialCards.forEach((item) => {
  renderCards(item)
});

const createCard = function (e) {
  e.preventDefault();

  const initializeCard = {
    name: cardTitle.value,
    link: cardImage.value,
  }

  cardElements.prepend(getCardElement(initializeCard));
  formCreate.reset();
  popupInputs.forEach((popupInput) => {
    if (popupInput.value == '') {
      submitInCreateForm.classList.add('popup__submit_inactive')
    }
  })
  closePopup(popupCreate);
}

const closePopup = function (popup) {
  const hasValidInput = popupInputs.some((inputElement) => !inputElement.validity.valid);

  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc)

  if (hasValidInput) {
    popupErrors.forEach((popupError) => {
      popupError.textContent = '';
    })
  }

  popupInputs.forEach((popupInput) => {
    popupInput.classList.remove('popup__input_invalid');
  })

  popupSave.classList.remove('popup__input_error_active');
  popupSave.disabled = false;
}

const closePopupByEsc = function (e) {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
}

const closeByClickOnOverlay = function (e) {
  popups.forEach((popupElement) => {
    if (e.target !== e.currentTarget) {
      return
    }
    if (popupElement.classList.contains('popup_is-opened')) {
      closePopup(popupElement);
    }
  })
}

const formSubmitHandler = function (e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

addButton.addEventListener('click', () => {
  openPopup(popupCreate);
});
popupOpen.addEventListener('click', () => {
  fillingText();
  openPopup(popupEdit);
});
formElement.addEventListener('submit', formSubmitHandler);
formCreate.addEventListener('submit', createCard);
closeButtons.forEach(function (item) {
  item.addEventListener('click', () => {
    popups.forEach((popup) => {
      closePopup(popup)
    })
  })
});
popupSaveElems.forEach((item) => {
  item.addEventListener('click', () => {
    popups.forEach((popup) => {
      closePopup(popup)
    });
  })
})
popups.forEach((popupElement) => {
  popupElement.addEventListener('click', closeByClickOnOverlay)
})