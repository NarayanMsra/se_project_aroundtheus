import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationSettings } from "../utils/constants.js";
import PopupWithConfirmation from "../components/ PopupWithConfirmation.js";

// -----------------DOM Element ----------------------//
const addCardForm = document.forms["add__card-form"];
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector("#add-CardButton");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-bio-input");
const changeAvatarButton = document.querySelector(
  ".profile__avatar-edit-button"
);
const changeAvatarForm = document.forms["change-avatar-form"];

let userId = null;
let cardToDelete = null;

//------------------Instantiate API-----------------------//
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d45ada81-688d-4756-9cef-ccb3bb1d1307",
    "Content-Type": "application/json",
  },
});

//--------userInfo----------//
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__bio",
  avatarSelector: ".profile__image",
});

const confirmDeletePopup = new PopupWithConfirmation({
  popupSelector: "#confirm-delete-modal",
});
confirmDeletePopup.setEventListeners();

//--------------Section -----------//
let cardSection;

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.changeAvatarImage(userData.avatar);
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => renderCard(item),
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("Failed to load app info:", err));

//--------Handle Like----------//
const handleLikeClick = (card) => {
  const cardId = card.getId();
  const isLiked = card.isLiked();
  const request = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

  request
    .then((cardData) => {
      card.handleLikes({
        likes: cardData.likes,
        isLiked: !isLiked,
      });
    })
    .catch((err) => console.error(`Like error  ${cardId}:`, err));
};

// Preview image handler
const handlePreviewPicture = (cardData) => {
  imagePopup.open(cardData);
};

const handleDeleteClick = (cardData) => {
  cardToDelete = cardData;
  confirmDeletePopup.open();
};

//---------------Delete Button-----------------------------//
confirmDeletePopup.setSubmitAction(() => {
  const deleteButton = document.querySelector(
    "#confirm-delete-modal .modal__button-save"
  );
  const originalButtonText = deleteButton.textContent;

  deleteButton.textContent = "Deleting...";
  deleteButton.disabled = true;

  api
    .deleteCard(cardToDelete._id)
    .then(() => {
      cardToDelete.removeCard();
      cardToDelete = null;
      confirmDeletePopup.close();
    })
    .catch((err) => console.error("Failed to delete card:", err))
    .finally(() => {
      deleteButton.textContent = originalButtonText;
      deleteButton.disabled = false;
    });
});

//--------Create Card----------//
const createCard = (cardData) => {
  const card = new Card(
    {
      cardData: { ...cardData, currentUserId: userId },
      handleLikeClick: () => handleLikeClick(card),
      handlePreviewPicture: () => imagePopup.open(cardData),
      handleDeleteClick: () => handleDeleteClick(card),
    },
    "#card-template"
  );
  return card.getView();
};

const renderCard = (item) => {
  const card = createCard(item);
  cardSection.addItem(card);
};

//-----------add card modal-------------//
const addSubmitButton = document.querySelector(
  "#add-card-modal .modal__button-save"
);

const newCardPopup = new PopupWithForm("#add-card-modal", ({ title, url }) => {
  const originalButtonText = addSubmitButton.textContent;

  // Change button text to show loading state
  addSubmitButton.textContent = "Saving...";
  addSubmitButton.disabled = true;

  api
    .addCard({ name: title, link: url })
    .then((card) => {
      renderCard(card);
      newCardPopup.close();
    })
    .catch((err) => console.error("Failed to add card:", err))
    .finally(() => {
      // Reset button text and state regardless of success/failure
      addSubmitButton.textContent = originalButtonText;
      addSubmitButton.disabled = false;
    });
});
newCardPopup.setEventListeners();

//------------Edit Profile Modal ------------//
const profilePopup = new PopupWithForm("#profile-editModal", (formData) => {
  const { title, bio } = formData;

  api
    .setUserInfo({ name: title, about: bio })
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        job: updatedData.about,
      });
      profilePopup.close();
    })
    .catch((err) => console.error("Failed to update profile:", err));
});
profilePopup.setEventListeners();

//------------------Change Avatar Modal-------------//
const changeAvatarModal = new PopupWithForm(
  "#change-avatar-modal",
  ({ link }) => {
    api
      .setUserAvatar({ avatar: link })
      .then((userData) => {
        userInfo.changeAvatarImage(userData.avatar);
        changeAvatarModal.close();
      })
      .catch((err) => console.error("Failed to change avatar:", err));
  }
);
changeAvatarModal.setEventListeners();

//----------preview Image-PopupWithImage-----------//
const imagePopup = new PopupWithImage("#preview-imageModal");
imagePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  
  formValidators["profile__Edit-form"].resetValidation();
  profilePopup.open();
});

// Add Card Button
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  formValidators["add__card-form"].resetValidation();
});

changeAvatarButton.addEventListener("click", () => {
  changeAvatarModal.open();
  formValidators["change-avatar-form"].resetValidation();
});

// Define an object to store all form validators
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name"); // Ensure each form has a unique `name` attribute in index.html
    formValidators[formName] = validator; //store the validator using the form's name as the key
    validator.enableValidation();
  });
};
enableValidation(validationSettings);
