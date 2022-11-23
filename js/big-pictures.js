import { isEscapeKey } from './utils.js';
import { initComments } from './comments.js';

const body = document.body;
const fullPicture = document.querySelector('.big-picture');

//Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
const imageElement = fullPicture.querySelector('.big-picture__img img');
//Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
const likesCount = fullPicture.querySelector('.likes-count');
//Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
const comment = fullPicture.querySelector('.comments-count');
//Описание фотографии description вставьте строкой в блок .social__caption.
const descriptionPhoto = fullPicture.querySelector('.social__caption');
const cancelButton = fullPicture.querySelector('.big-picture__cancel');

const initCommentsOnOpen = initComments(fullPicture);

const toggleClasses = (toOpen = true) => {
  fullPicture.classList.toggle('hidden', !toOpen);
  body.classList.add('modal-open', toOpen);
};

const showBigPicture = ({ url, likes, comments, description }) => {

  toggleClasses(true);

  const resetComments = initCommentsOnOpen(comments);

  const closeBigPicture = () => {
    toggleClasses(false);
    resetComments();
  };

  cancelButton.addEventListener('click', () => {
    closeBigPicture();
    document.removeEventListener('keydown', onEscapeClose);
  });

  document.addEventListener('keydown', onEscapeClose);

  function onEscapeClose(evt) {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  }

  imageElement.src = url;

  likesCount.textContent = likes;

  comment.textContent = comments.length;

  descriptionPhoto.textContent = description;
};

export { showBigPicture };
