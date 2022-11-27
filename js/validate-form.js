import { unblockSubmitButton, blockSubmitButton, closeAndResetModal } from './upload-modal.js';
import { createFormModalMessage } from './utils.js';
import { sendData } from './api.js';

const HASTAG_REGEXP = /^#[a-zа-яё0-9]{1,20}$/i;

/** @type {HTMLFormElement} */
const uploadForm = document.querySelector('.img-upload__form');
const { hashtags: hashtagsInput, description: descriptionTextarea } = uploadForm.elements;

descriptionTextarea.dataset.pristineMaxlengthMessage = `Длина комментария не может составлять больше ${descriptionTextarea.maxLength} символов`;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

/**
 *
 * @param {string} value
 */
const validateHashtags = (value) => {
  const hashTags = value.toLowerCase().split(' ').filter((hashtag) => hashtag.length);

  if (hashTags.length > 5) {
    hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    return false;
  }

  const hashTagsSet = new Set(hashTags);

  if (hashTagsSet.size !== hashTags.length) {
    hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    return false;
  }

  return hashTags.every((hashtag) => {
    if (hashtag[0] !== '#') {
      hashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      return false;
    }

    if (hashtag.length === 1) {
      hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки;');
      return false;
    }

    if (hashtag.length > 20) {
      hashtagsInput.setCustomValidity(
        'максимальная длина одного хэш-тега 20 символов, включая решётку'
      );
      return false;
    }
    if (!HASTAG_REGEXP.test(hashtag)) {
      hashtagsInput.setCustomValidity(
        'должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;'
      );
      return false;
    }

    hashtagsInput.setCustomValidity('');
    return true;
  });
};

pristine.addValidator(hashtagsInput, validateHashtags, () => hashtagsInput.validationMessage);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();

    const data = new FormData(uploadForm);

    sendData(
      () => {
        unblockSubmitButton();
        createFormModalMessage('success');
        closeAndResetModal();
      },
      () => {
        unblockSubmitButton();
        createFormModalMessage('error');
      },
      data);
  }
});
