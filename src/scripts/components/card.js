export class Card {
  constructor({ options, template, handlecardClick }) {
    this._name = options.name;
    this._link = options.link;
    this._template = template;
    this._handlecardClick = handlecardClick;
    this._isLiked = options.likes;
    this._cardID = options._id;
    this._ownerID = options.owner._id;
    // console.log(options);
    // console.log(this._obtainPersonalId);
    // console.log(options);
    // console.log(this._cardID);
    // console.log(this._ownerID);
  }

  _getTemplate() {
    return document.querySelector(this._template).content.cloneNode(true)
      .children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    // console.log(this._element.querySelector(".element__delete"));
    this._setEventListeners();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__heading").textContent = this._name;
    this._element.querySelector(
      ".element__like-counter"
    ).textContent = this._isLiked.length;
    if (this._checkCardId)
      this._element
        .querySelector(".element__delete")
        .classList.add("element__delete_isHidden");
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._like();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handlecardClick(this._name, this._link);
      });
  }

  _like() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_state_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
