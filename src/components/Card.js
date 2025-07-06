export default class Card {
  constructor(
    { cardData, handleLikeClick, handlePreviewPicture, handleDeleteClick },
    cardSelector
  ) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes || [];
    this._isLiked = cardData.isLiked || false;
    this._userId = cardData.currentUserId;
    this._handleLikeClick = handleLikeClick;
    this._handlePreviewPicture = handlePreviewPicture;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__button-like_active");
    } else {
      this._likeButton.classList.remove("card__button-like_active");
    }
  }

  handleLikes({ likes, isLiked }) {
    this._likes = likes || [];
    this._isLiked = isLiked;
    // if (this._likeCounter) {
    //   this._likeCounter.textContent = this._likes.length;
    // }
    this._handleLikeIcon();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._likeCounter = this._cardElement.querySelector(".card__like-count");

    this._deleteButton = this._cardElement.querySelector(
      ".card__button-delete"
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );

    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.addEventListener("click", () =>
      this._handlePreviewPicture({ name: this._name, link: this._link })
    );
  }

  removeCard() {
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

    // this._likeCounter = this._cardElement.querySelector(".card__like-count");
    // this._likeCounter.textContent = Array.isArray(this._likes)
    //   ? this._likes.length
    //   : 0;

    this._setEventListeners();
    this._handleLikeIcon();

    return this._cardElement;
  }
}
