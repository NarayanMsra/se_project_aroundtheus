export default class Card {
  constructor({ name, link }, cardSelector, handlePreviewPicture) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    //card__button-like
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //card__button-delete
    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //card__image --for preview picture
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture({ name: this._name, link: this._link }); //using to pass the handler
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const image = this._cardElement.querySelector(".card__image");
    image.src = this._link;
    image.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
