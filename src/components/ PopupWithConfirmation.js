import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
