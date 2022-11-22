import { createDOMElement } from './utils.js';
import { isEscapeKey } from './utils.js';

const body = document.body;
const fullPicture = document.querySelector('.big-picture');
const socialComments = fullPicture.querySelector('.social__comments');
//Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
const imageElement = fullPicture.querySelector('.big-picture__img img');
//Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
const likesCount = fullPicture.querySelector('.likes-count');
//Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
const comment = fullPicture.querySelector('.comments-count');
//Описание фотографии description вставьте строкой в блок .social__caption.
const descriptionPhoto = fullPicture.querySelector('.social__caption');
const commentCount = fullPicture.querySelector('.social__comment-count');
const newComment = fullPicture.querySelector('.comments-loader');
const cancelButton = fullPicture.querySelector('.big-picture__cancel');


const renderComments = (comments) => {
  //создаём фрагмент
  const commentFragments = document.createDocumentFragment();

  //переберем список методом forEach и создадим функцию с комментарием
  comments.forEach(({ avatar, name, message }) => {
    const commentContainer = createDOMElement('li', 'social__comment');

    const avatarUser = createDOMElement('img', 'social__picture');
    avatarUser.src = avatar;
    avatarUser.alt = name;

    avatarUser.width = 35;
    avatarUser.height = 35;
    commentContainer.append(avatarUser);

    const commentText = createDOMElement('p', 'social__text');
    commentText.textContent = message;
    commentContainer.append(commentText);
    commentFragments.append(commentContainer);
  });
  return socialComments.append(commentFragments);
};
/**
 * находим .big-picture и удаляем класс у элемента .big-picture
 * После открытия окна добавьте тегу <body> класс modal-open
 * чтобы контейнер с фотографиями позади не прокручивался при скролле.
 */
const toggleClasses = (toOpen = true) => {
  fullPicture.classList.toggle('hidden', !toOpen);
  body.classList.add('modal-open', toOpen);
};

//обернем все в одну функцию
const showBigPicture = ({ url, likes, comments, description }) => {
  toggleClasses(true);

  /**При закрытии окна не забудьте удалить этот класс. */
  const closeBigPicture = () => toggleClasses(false);

  //находим .big-picture__cancel и при клике
  //вызывааем функцию закрытия окна
  cancelButton.addEventListener('click', () => {
    closeBigPicture();
    document.removeEventListener('keydown', onEscapeClose);
  });

  //Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
  //импортировал функцию закрытия по ESC из utils.js
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


  //После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и
  //загрузки новых комментариев .comments-loader, добавив им класс hidden
  commentCount.classList.add('hidden');
  newComment.classList.add('hidden');
  socialComments.innerHTML = '';
  renderComments(comments);
};

export { showBigPicture };
