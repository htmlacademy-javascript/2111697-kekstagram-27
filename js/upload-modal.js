import {isEscapeKey} from './utils.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];

/** @type {HTMLFormElement} */
const uploadForm = document.querySelector('.img-upload__form');

/** @type {HTMLInputElement} поле загрузки нового изображения */
const uploadInput = uploadForm.querySelector('#upload-file');

// находим форму редактирования изображения
const editFormImage = uploadForm.querySelector('.img-upload__overlay');

const selectedPhoto = uploadForm.querySelector('.img-upload__preview img');

const fileChooser = uploadForm.querySelector('.img-upload__input');

//находим кнопку отправки данных на сервер
const submitButton = uploadForm.querySelector('.img-upload__submit');
/**
 * функцию закрытия на клавишу ESC
 * @param {KeyboardEvent} evt
 */
const onKeydownCloseModal = (evt) => {

  if(isEscapeKey(evt)) {
    evt.preventDefault();
    const {tagName} = evt.target;

    /** Если инпут или текстареа в активном состоянии, то мы не реагируем на `Esc` */
    if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
      uploadForm.reset();
    }
  }
};

const changeModalState = (toOpen = true) => {
  editFormImage.classList.toggle('hidden', !toOpen);
  document.body.classList.toggle('modal-open', toOpen);

  //закрытие происходит по нажатию клавиши ESC
  if (toOpen) {
    document.addEventListener('keydown', onKeydownCloseModal);
  } else{
    document.removeEventListener('keydown', onKeydownCloseModal);
  }
};

const updateImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PHOTO_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    selectedPhoto.src = URL.createObjectURL(file);
  }
};

const onUploadInputChange = () => {
  changeModalState(true);
  updateImage();
};

const onUploadFormReset = () => {
  changeModalState(false);
  resetScale();
  resetEffects();
};


uploadInput.addEventListener('change', onUploadInputChange);
uploadForm.addEventListener('reset', onUploadFormReset);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const closeAndResetModal = () => uploadForm.reset();

export {blockSubmitButton, unblockSubmitButton, onKeydownCloseModal as closeModalOnEscape, closeAndResetModal};
