import {isEscapeKey} from './utils.js';
import {resetScale} from './scale.js';

/** @type {HTMLFormElement} */
const uploadForm = document.querySelector('.img-upload__form');

/** @type {HTMLInputElement} поле загрузки нового изображения */
const imgUploadStart = uploadForm.querySelector('#upload-file');
// находим форму редактирования изображения
const editFormImage = uploadForm.querySelector('.img-upload__overlay');

//находим кнопку отправки данных на сервер
const submitButton = uploadForm.querySelector('.img-upload__submit');
/**
 * функцию закрытия на клавишу ESC
 * @param {KeyboardEvent} evt
 */
const closeModalOnEscape = (evt) => {

  if(isEscapeKey(evt)) {
    evt.preventDefault();
    const {tagName} = evt.target;

    /** Если инпут или текстареа в активном состоянии, то мы не реагируем на `Esc` */
    if (tagName !== 'INPUT' || tagName !== 'TEXTAREA') {
      uploadForm.reset();
    }
  }
};

const toggleModalState = (toOpen = true) => () => {
  editFormImage.classList.toggle('hidden', !toOpen);
  document.body.classList.toggle('modal-open', toOpen);

  //закрытие происходит по нажатию клавиши ESC
  if (toOpen) {
    document.addEventListener('keydown', closeModalOnEscape);
  } else{
    document.removeEventListener('keydown', closeModalOnEscape);
  }
  resetScale();
};

imgUploadStart.addEventListener('change', toggleModalState(true));
uploadForm.addEventListener('reset', toggleModalState(false));

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const closeAndResetModal = () => uploadForm.reset();

export {blockSubmitButton, unblockSubmitButton, closeModalOnEscape, closeAndResetModal};
