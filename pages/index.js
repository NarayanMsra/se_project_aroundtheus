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

//------------------------------card link------------------------------------------------------//
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

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
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");

const imagePreview = previewImageModal.querySelector(".modal__imagePreview");
const previewImageCaption = previewImageModal.querySelector(
  ".modal__imageCaption"
);

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModalCloseButton = document.querySelector("#add-CardButton");
const profileTitle = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__bio");
const closeButtons = document.querySelectorAll(".modal__close");

const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-bio-input");

// Preview image handler
const handlePreviewPicture = (cardData) => {
  imagePreview.src = cardData.link;
  imagePreview.alt = cardData.name;
  previewImageCaption.textContent = cardData.name;
  openModal(previewImageModal);
};

// Create card DOM element
const getCardElement = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__button-like");
  const deleteButton = cardElement.querySelector(".card__button-delete");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
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
};

// Profile Edit Button
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileBio.textContent;
  openModal(editProfileModal);
});

// Add Card Button
addCardModalCloseButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// Form Event Listeners
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Overlay click to close
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
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
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error-visible",
};

const editformEl = editProfileModal.querySelector(".modal__form");
const addformEl = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editformEl);
const addFormValidator = new FormValidator(validationSettings, addformEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
