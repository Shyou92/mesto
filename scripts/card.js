export class Card {
  constructor(options, template, openPopup) {
    this._name = options.name,
      this._link = options.link,
      this._template = template,
      this._openPopup = openPopup
  }

  _getTemplate() {
    return document.querySelector(this._template).content.cloneNode(true).children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;
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
      this._openPopup(this._name, this._link);
    })
  }

  _like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_state_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null
  }
}

