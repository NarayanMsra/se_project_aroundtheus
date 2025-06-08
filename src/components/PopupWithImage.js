import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    this._imageElement = this._popupElement.querySelector(
      ".modal__imagePreview"
    );
    this._captionElement = this._popupElement.querySelector(
      ".modal__imageCaption"
    );
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}



