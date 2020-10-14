import { imageClickHandler, likeCard, deleteCard } from './index.js'

export class Card {
  constructor(options, template) {
    this._name = options.name,
      this._link = options.link,
      this._like = likeCard,
      this._delete = deleteCard,
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
    this._element.querySelector('.element__like').toggle = this._like;
    this._element.querySelector('.element__delete').toggle = this._delete;

    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', imageClickHandler);
    this._element.querySelector('.element__like').addEventListener('click', likeCard);
    this._element.querySelector('.element__delete').addEventListener('click', deleteCard);
  }
}
