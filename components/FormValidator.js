class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector; //
    this._submitButtonSelector = settings.submitButtonSelector; //
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = form;
    this._buttonEls = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(inputEls) {
    const errorMessage = this._form.querySelector("#" + inputEls.id + "-error");
    inputEls.classList.add(this._inputErrorClass); //add red border
    errorMessage.textContent = inputEls.validationMessage; //show error message
    errorMessage.classList.add(this._errorClass); //make error message visible
  }

  _hideInputError(inputEls) {
    const errorEls = this._form.querySelector(`#${inputEls.id}-error`);
    inputEls.classList.remove(this._inputErrorClass); //remove red border
    errorEls.classList.remove(this._errorClass); //hide error message
    errorEls.textContent = ""; //clear the text
  }

  _hasInvalideInput() {
    return this._inputList.some((inputEls) => !inputEls.validity.valid);
  }

  _checkInputValidity(inputEls) {
    if (!inputEls.validity.valid) {
      this._showInputError(inputEls);
    } else {
      this._hideInputError(inputEls);
    }
  }

  _disableSubmitButton() {
    this._buttonEls.classList.add(this._inactiveButtonClass);
    this._buttonEls.disabled = true;
  }

  _toggleButtonState() {
    const hasInvalideInput = this._hasInvalideInput();

    if (this._hasInvalideInput()) {
      this._disableSubmitButton();
    } else {
      this._buttonEls.classList.remove(this._inactiveButtonClass);
      this._buttonEls.disabled = false;
    }
  }

  _setEventListeners() {
    this._buttonEls = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(); //set initial button state

    this._inputList.forEach((inputEls) => {
      inputEls.addEventListener("input", () => {
        this._checkInputValidity(inputEls); //check this input
        this._toggleButtonState(); //check all input
      });
    });
  }

  //need more look on
  resetValidation() {
    this._inputList.forEach((inputEls) => {
      this._hideInputError(inputEls);
    });
    this._disableSubmitButton();
  }

  reset() {
    this._form.reset();
    this.resetValidation();
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
