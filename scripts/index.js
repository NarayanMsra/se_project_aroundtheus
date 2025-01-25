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
const profileTitle = document.querySelector(".profile__title");
const profile__addButton = document.querySelector("#profile__add-CardButton");
const profileBio = document.querySelector(".profile__bio");
const cardList = document.querySelector(".cards__list");
const closeButtons = document.querySelector(".modal__close");

//----------------Modal section-----------/
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileEdit_name = document.querySelector["profile__EditModal"];
const cardAdd = document.querySelector["add__cardModal"];
const profileNameInput = document.querySelector("#profile-NameModal");
const profileBioInput = document.querySelector("#profile-bioModal");
const modalAddCard = document.querySelector("#modal-add-card");
const addCardModalForm = document.querySelector["add__cardModal"];
const modalInputForm = document.querySelector("#modal-InputForm");
const modalFormLink = document.querySelector("#Input-LinkModal");
const modalImagePreview = document.querySelector("#modal-image-preview");
const modalImageCaption = document.querySelector(".modal__image-caption");

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

closeButtons.addEventListener("click", () => {
  console.log("clicked");
  closeModal(profileEditModal);
});

// /*
// profileEditButton.onclick = () =>
//   profileEditModal.classList.add("modal_opened");

// closeButtons.onclick = () => {
//   console.log("clicked");
//   profileEditModal.classList.remove("modal_opened");
// }; */

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });
