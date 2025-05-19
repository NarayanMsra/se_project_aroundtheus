//Show input error
const showInputError = (
  form,
  inputEls,
  errorMessage,
  { errorClass, inputErrorClass }
) => {
  console.log(`#${inputEls.id}-error`);

  const errorEls = form.querySelector(`#${inputEls.id}-error`);

  inputEls.classList.add(inputErrorClass); //add red border
  errorEls.textContent = errorMessage; //show error message
  errorEls.classList.add(errorClass); //make error message visible
};

//hide input error
const hideInputError = (form, inputEls, { errorClass, inputErrorClass }) => {
  const errorEls = form.querySelector(`#${inputEls.id}-error`);
  inputEls.classList.remove(inputErrorClass); //remove red border
  errorEls.classList.remove(errorClass); //hide error message
  errorEls.textContent = ""; //clear the text
};

//hasInvalideInput
const hasInvalideInput = (inputList) => {
  return inputList.some((inputEls) => !inputEls.validity.valid);
};

//checkInputValidity
const checkInputValidity = (form, inputEls, config) => {
  if (!inputEls.validity.valid) {
    showInputError(form, inputEls, inputEls.validationMessage, config);
  } else {
    hideInputError(form, inputEls, config);
  }
};

//disableSubmitButton
const disableSubmitButton = (buttonEls, inactiveButtonClass) => {
  buttonEls.classList.add(inactiveButtonClass);
  buttonEls.disabled = true;
};

//enableSubmitButton
const enableSubmitButton = (buttonEls, inactiveButtonClass) => {
  buttonEls.classList.remove(inactiveButtonClass);
  buttonEls.disabled = false;
};

//toggleButtonState
const toggleButtonState = (inputList, buttonEls, { inactiveButtonClass }) => {
  if (hasInvalideInput(inputList)) {
    disableSubmitButton(buttonEls, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonEls, inactiveButtonClass);
  }
};

//setEventListeners
const setEventListeners = (form, config) => {
  const { inputSelector, submitButtonSelector } = config;
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonEls = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonEls, config); //set initial button state

  inputList.forEach((inputEls) => {
    inputEls.addEventListener("input", () => {
      checkInputValidity(form, inputEls, config); //check this input
      toggleButtonState(inputList, buttonEls, config); //check all input
    });
  });
};

//enableValidation
const enableValidation = (config) => {
  const { formSelector } = config;
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); //for submissionb
    });
    setEventListeners(form, config); //add input validation
  });
};

//last part
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error-visible",
});
