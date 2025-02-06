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

//*----------------ELEMENT---------*/
const profileEditButton = document.querySelector("#profile__editButton");
const profileEditModal = document.querySelector("#profile-editModal");
const profileEditCloseButtons = document.querySelector(".modal__close");
const profileBio = document.querySelector(".profile__bio");
const profileTitle = document.querySelector(".profile__title");
const profileBioInput = document.querySelector("#profile-bio-input");
const profileNameInput = document.querySelector("#profile-name-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//--------------------------Functions ---------------------------------//
function closePopop() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  return cardElement;
}

//---------------Event Handlers -------------------------//
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closePopop();
}

//---------------------Event Listeners --------------------------//
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileBioInput.value = profileBio.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButtons.addEventListener("click", closePopop);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
