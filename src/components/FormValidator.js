class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector; //
    this._submitButtonSelector = settings.submitButtonSelector; //
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(inputElement) {
    const errorMessage = this._form.querySelector(
      "#" + inputElement.id + "-error"
    );
    inputElement.classList.add(this._inputErrorClass); //add red border
    errorMessage.textContent = inputElement.validationMessage; //show error message
    errorMessage.classList.add(this._errorClass); //make error message visible
  }

  _hideInputError(inputElement) {
    const errorEls = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass); //remove red border
    errorEls.classList.remove(this._errorClass); //hide error message
    errorEls.textContent = ""; //clear the text
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _toggleButtonState() {
    const hasInvalidInput = this._hasInvalidInput();
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    // this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(); //set initial button state
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); //check this input
        this._toggleButtonState(); //check all input
      });
    });
  }

  //need more look on
  resetValidation() {
    // this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.disableSubmitButton();
  }

  reset() {
    this._form.reset();
    this.resetValidation();
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.reset();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
