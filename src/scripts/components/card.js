export class Card {
  constructor({
    options,
    template,
    handlecardClick,
    myId,
    handleDeleteCard,
    handleLikeCard,
  }) {
    this._name = options.name;
    this._link = options.link;
    this._template = template;
    this._handlecardClick = handlecardClick;
    this._likes = options.likes;
    this._myId = myId;
    this._handleDeleteCard = handleDeleteCard;
    this._cardID = options._id;
    this._ownerID = options.owner._id;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    return document.querySelector(this._template).content.cloneNode(true)
      .children[0];
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__heading").textContent = this._name;
    if (!this._checkCardId())
      this._element
        .querySelector(".element__delete")
        .classList.add("element__delete_isHidden");
    this._likeElement = this._element.querySelector(".element__like");
    this.renderLike();
    this._setEventListeners();
    return this._element;
  }

  _checkCardId() {
    return this._ownerID === this._myId;
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._handleLikeCard(this);
    });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handlecardClick(this._name, this._link);
      });
  }

  get isLiked() {
    return this._likes.some((item) => item._id === this._myId);
  }

  renderLike() {
    this._element.querySelector(
      ".element__like-counter"
    ).textContent = this._likes.length;
    if (this.isLiked) {
      this._likeElement.classList.add("element__like_state_active");
    } else {
      this._likeElement.classList.remove("element__like_state_active");
    }
  }

  updateLikes(updatedLikes) {
    this._likes = updatedLikes.likes;
    this.renderLike();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  get id() {
    return this._cardID;
  }
}
