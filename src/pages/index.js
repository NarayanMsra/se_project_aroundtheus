import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";

// -----------------DOM Element ----------------------//
const addCardForm = document.forms["add__card-form"]; 

const cardTitleInput = addCardForm.elements["title"]; 
const cardImageLinkInput = addCardForm.elements["link"]; 

const profileEditButton = document.querySelector(".profile__edit-button"); 
const addNewCardButton = document.querySelector("#add-CardButton"); 

const nameInput = document.querySelector("#profile-name-input"); 
const jobInput = document.querySelector("#profile-bio-input"); 

// Preview image handler
const handlePreviewPicture = (cardData) => {
  imagePopup.open(cardData);
};

// Render card to list
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handlePreviewPicture); // instantiate Card class
  return card.getView();
};

//--------------Section -----------//
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

//----------PopupWithForm-----------//
const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const cardElement = createCard({
    name: inputValues.title,
    link: inputValues.url,
  });
  // const card = createCard(cardData);
  cardSection.addItem(cardElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

//--------userInfo----------//
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__bio",
});

//------------Edit Profile Modal ------------//
const profilePopup = new PopupWithForm("#profile-editModal", (inputValues) => {
  userInfo.setUserInfo({
    title: inputValues.title,
    bio: inputValues.bio,
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

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
