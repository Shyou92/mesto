import { openPopup, popupImage, popupImageOpened, popupTitle, closePopup } from './index.js'

export class Card {
  constructor(options, template) {
    this._name = options.name,
      this._link = options.link,
      this._template = template
  }

  _getTemplate() {
    const cardElem = document
      .querySelector('.element-template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElem
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__heading').textContent = this._name;

    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    popupImage.querySelector('.popup__close').addEventListener('click', () => {
      this._handleClosePopup();
    })
  }

  _like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_state_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleOpenPopup() {
    openPopup(popupImage);

    const cardImage = this._element.querySelector('.element__photo');
    const cardTitle = this._element.querySelector('.element__heading');
    popupImageOpened.src = cardImage.src;
    popupTitle.textContent = cardTitle.textContent;
  }

  _handleClosePopup() {
    closePopup(popupImage);
  }
}
