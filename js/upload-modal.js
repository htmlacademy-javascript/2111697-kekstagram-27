import {isEscapeKey} from './utils.js';
/** @type {HTMLFormElement} */
const uploadForm = document.querySelector('.img-upload__form');

/** @type {HTMLInputElement} поле загрузки нового изображения */
const imgUploadStart = uploadForm.querySelector('#upload-file');
// находим форму редактирования изображения
const editFormImage = uploadForm.querySelector('.img-upload__overlay');

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
};

imgUploadStart.addEventListener('change', toggleModalState(true));
uploadForm.addEventListener('reset', toggleModalState(false));
