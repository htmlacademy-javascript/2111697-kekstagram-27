import {getPhotosFromServer} from './api.js';

/** контейнер для изображений от других пользователей */
const imgContainer = document.querySelector('.pictures');

/** шаблон миниатюр
 * @type {HTMLAnchorElement}
 */
const photoTemplate = document.querySelector('#picture').content.firstElementChild;

//функция отрисовки фото
const renderPhotos = (photos) => {
  /** создаем пустой фрагмент(предварительная обёртка)
   */
  const photoBox = document.createDocumentFragment();

  //на основе шаблона создаем клон который нашли выше
  for (const photo of photos) {
    //клонируем элемент со всеми внутренностями
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoBox.append(photoElement);
  }
  //после всей сделаной разметки ,вызываем в самом конце
  imgContainer.append(photoBox);
};

getPhotosFromServer(renderPhotos);
