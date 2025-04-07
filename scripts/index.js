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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//*----------------Wrappers---------*/
const cardListElement = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-editModal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = document.forms["profile__Edit-form"];
//add card
const addCardForm = document.forms["add__card-form"];
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");
//preview
const previewImageModal = document.querySelector("#preview-imageModal");
const imagePreview = previewImageModal.querySelector(".modal__imagePreview");
const previewImageCaption = previewImageModal.querySelector(
  ".modal__imageCaption"
);
//-------------buttons-and Other Dom---------------//
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModalCloseButton = document.querySelector("#add-CardButton");
const profileTitle = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__bio");
const closeButtons = document.querySelectorAll(".modal__close");
//from data
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-bio-input");

//----------Functions -----------------------------//
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__button-like");
  //like card
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button-like_active");
  });
  //delete card
  const deleteButton = cardElement.querySelector(".card__button-delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  cardImageElement.addEventListener("click", () => {
    imagePreview.src = cardData.link;
    imagePreview.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

function renderCard(cardData, cardListElement) {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape); //Pressing Esc first add
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape); //Pressing Esc second remove
}

//---------------Event Handlers -------------------------//
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageLinkInput.value;
  renderCard({ name, link }, cardListElement);
  e.target.reset();
  closeModal(addCardModal);
}

//---------------Event Listeners ------------------------//
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileBio.textContent;
  openModal(editProfileModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Closing the Popup by Clicking on the Overlay
const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

//Closing the Popup by Pressing Esc
function handleEscape(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");

    if (openModal) {
      closeModal(openModal);
    }
  }
}
