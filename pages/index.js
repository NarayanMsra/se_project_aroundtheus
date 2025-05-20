import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers
const cardListElement = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-editModal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-imageModal");

const profileEditForm = document.forms["profile__Edit-form"];
const addCardForm = document.forms["add__card-form"];
// const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardTitleInput = addCardForm.elements["title"];
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");
// const cardImageLinkInput = addCardForm.elements["link"];

const imagePreview = previewImageModal.querySelector(".modal__imagePreview");
const previewImageCaption = previewImageModal.querySelector(
  ".modal__imageCaption"
);

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModalButton = document.querySelector("#add-CardButton");
const profileTitle = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__bio");
const closeButtons = document.querySelectorAll(".modal__close");// need to check

const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-bio-input");

// Preview image handler
const handlePreviewPicture = (cardData) => {
  imagePreview.src = cardData.link;
  imagePreview.alt = cardData.name;
  previewImageCaption.textContent = cardData.name;
  openModal(previewImageModal);
};

// Render card to list
const renderCard = (cardData, cardListElement) => {
  const card = new Card(cardData, "#card-template", handlePreviewPicture); // instantiate Card class
  const cardElement = card.getView(); // call its geView() method
  cardListElement.prepend(cardElement);
};

// Render all initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

// Open modal
const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
};

// Close modal
const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
};

// Profile form submit
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeModal(editProfileModal);
};

// Add card form submit
const handleAddCardFormSubmit = (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageLinkInput.value;
  renderCard({ name, link }, cardListElement);
  e.target.reset();
  closeModal(addCardModal);
 
  // addFormValidator.disableSubmitButton();
  formValidators["add__card-form"].disableSubmitButton();
};

// Profile Edit Button
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileBio.textContent;
  // editFormValidator.resetValidation();
  formValidators["profile__Edit-form"].resetValidation();
  openModal(editProfileModal);
});

// Add Card Button
addCardModalButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// Form Event Listeners
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

// Escape key handler
const handleEscape = (e) => {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
};

// Form validation setup
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error-visible",
};

const editFormElement = editProfileModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

// Define an object to store all form validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    
    // Ensure each form has a unique `name` attribute in index.html
    const formName = formElement.getAttribute('name');

    // Store the validator using the form's name as the key
    formValidators[formName] = validator;

    validator.enableValidation();
  });
};
enableValidation(validationSettings);
