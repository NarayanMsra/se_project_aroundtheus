// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (
  form,
  inputEls,
  errorMessage,
  { errorClass, inputErrorClass }
) => {
  console.log(`#${inputEls.id}-error`);

  const errorEls = form.querySelector(`#${inputEls.id}-error`);

  inputEls.classList.add(inputErrorClass);
  errorEls.textContent = errorMessage;
  errorEls.classList.add(errorClass); //for error class
};

//hide the error
const hideInputError = (form, inputEls, { errorClass, inputErrorClass }) => {
  const errorEls = form.querySelector(`#${inputEls.id}-error`);
  inputEls.classList.remove(inputErrorClass);
  errorEls.classList.remove(errorClass); //for error class
  errorEls.textContent = "";
};

const hasInvalideInput = (inputList) => {
  return inputList.some((inputEls) => !inputEls.validity.valid);
};

const checkInputValidity = (form, inputEls, config) => {
  if (!inputEls.validity.valid) {
    showInputError(form, inputEls, inputEls.validationMessage, config);
  } else {
    hideInputError(form, inputEls, config);
  }
};

const disableSubmitButton = (buttonEls, inactiveButtonClass) => {
  buttonEls.classList.add(inactiveButtonClass);
  buttonEls.disabled = true;
};

const enableSubmitButton = (buttonEls, inactiveButtonClass) => {
  buttonEls.classList.remove(inactiveButtonClass);
  buttonEls.disabled = false;
};

const toggleButtonState = (inputList, buttonEls, { inactiveButtonClass }) => {
  if (hasInvalideInput(inputList)) {
    disableSubmitButton(buttonEls, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonEls, inactiveButtonClass);
  }
};

const setEventListeners = (form, config) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = config;
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonEls = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEls, config);

  inputList.forEach((inputEls) => {
    inputEls.addEventListener("input", () => {
      checkInputValidity(form, inputEls, config);
      toggleButtonState(inputList, buttonEls, config);
    });
  });
};

const enableValidation = (config) => {
  const { formSelector } = config;
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, config);
  });
};

//last part
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error-visible",
});


